import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Svg, { Circle } from 'react-native-svg';
import * as Notifications from 'expo-notifications';
import { formatTime } from '../../../utils/formatTime';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 3;

const PickerColumn = ({ data, selectedIndex, onValueChange, resetTrigger }) => {
  const scrollRef = useRef(null);
  const isUserScrollingRef = useRef(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        y: selectedIndex * ITEM_HEIGHT,
        animated: true,
      });
    }
  }, [selectedIndex, resetTrigger]);

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.column}
      showsVerticalScrollIndicator={false}
      snapToInterval={ITEM_HEIGHT}
      decelerationRate="fast"
      onScrollBeginDrag={() => {
        isUserScrollingRef.current = true;
      }}
      onMomentumScrollEnd={(event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / ITEM_HEIGHT);
        if (isUserScrollingRef.current && index !== selectedIndex) {
          onValueChange(index);
        }
        isUserScrollingRef.current = false;
      }}
      contentContainerStyle={{
        paddingVertical: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2),
      }}
    >
      {data.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.itemText}>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const Timer = forwardRef(({ initialDuration = 900, onStatusChange }, ref) => {
  const [resetTrigger, setResetTrigger] = useState(0);
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [notificationId, setNotificationId] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  // New state: store the full duration (set when timer starts)
  const [fullDuration, setFullDuration] = useState(initialDuration);

  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedSecond, setSelectedSecond] = useState(0);

  const timerIntervalRef = useRef(null);

  // Notify parent about status changes
  useEffect(() => {
    if (!isRunning) {
      const newTime =
        selectedHour * 3600 + selectedMinute * 60 + selectedSecond;
      setTimeLeft(newTime);
    }
    if (typeof onStatusChange === 'function') {
      onStatusChange({ isRunning, isPaused });
    }
  }, [
    selectedHour,
    selectedMinute,
    selectedSecond,
    isRunning,
    isPaused,
    onStatusChange,
  ]);

  // Load persisted timer data (end time, start time and full duration) on mount
  useEffect(() => {
    const loadTimer = async () => {
      try {
        const storedEndTime = await AsyncStorage.getItem('timer_endTime');
        const storedFullDuration =
          await AsyncStorage.getItem('timer_fullDuration');
        if (storedEndTime && storedFullDuration) {
          const _endTime = parseInt(storedEndTime, 10);
          const _fullDuration = parseInt(storedFullDuration, 10);
          const newTimeLeft = Math.max(
            0,
            Math.round((_endTime - Date.now()) / 1000),
          );
          if (newTimeLeft > 0) {
            setTimeLeft(newTimeLeft);
            setEndTime(_endTime);
            setFullDuration(_fullDuration);
            setIsRunning(true);
            timerIntervalRef.current = setInterval(async () => {
              const updatedTimeLeft = Math.max(
                0,
                Math.round((_endTime - Date.now()) / 1000),
              );
              setTimeLeft(updatedTimeLeft);
              if (updatedTimeLeft === 0) {
                clearInterval(timerIntervalRef.current);
                setIsRunning(false);
                await AsyncStorage.multiRemove([
                  'timer_endTime',
                  'timer_startTime',
                  'timer_fullDuration',
                ]);
                Notifications.scheduleNotificationAsync({
                  content: {
                    title: "Time's up!",
                    body: 'Your session is over. Great job staying focused!',
                    sound: Platform.OS === 'android' ? 'default' : undefined,
                  },
                  trigger: null,
                });
              }
            }, 1000);
          } else {
            // Timer expired during unmount
            await AsyncStorage.multiRemove([
              'timer_endTime',
              'timer_startTime',
              'timer_fullDuration',
            ]);
          }
        }
      } catch (error) {
        console.error('Error loading persisted timer:', error);
      }
    };

    loadTimer();
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const pauseTimer = () => {
    if (isRunning && !isPaused) {
      clearInterval(timerIntervalRef.current);
      setIsPaused(true);
    }
  };

  const resumeTimer = () => {
    if (isRunning && isPaused) {
      const _endTime = Date.now() + timeLeft * 1000;
      setEndTime(_endTime);
      // Update persisted endTime (the fullDuration remains the same)
      AsyncStorage.setItem('timer_endTime', _endTime.toString());
      setIsPaused(false);
      timerIntervalRef.current = setInterval(() => {
        const newTimeLeft = Math.max(
          0,
          Math.round((_endTime - Date.now()) / 1000),
        );
        setTimeLeft(newTimeLeft);
        if (newTimeLeft === 0) {
          clearInterval(timerIntervalRef.current);
          setIsRunning(false);
          AsyncStorage.multiRemove([
            'timer_endTime',
            'timer_startTime',
            'timer_fullDuration',
          ]);
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Time's up!",
              body: 'Your session is over. Great job staying focused!',
              sound: Platform.OS === 'android' ? 'default' : undefined,
            },
            trigger: null,
          });
        }
      }, 1000);
    }
  };

  const updateTime = (newDuration) => {
    if (!isRunning) {
      setTimeLeft(newDuration);
      setSelectedHour(Math.floor(newDuration / 3600));
      setSelectedMinute(Math.floor((newDuration % 3600) / 60));
      setSelectedSecond(newDuration % 60);
    }
  };

  const startTimer = async () => {
    if (isRunning) return;
    if (selectedSecond === 0 && selectedMinute === 0 && selectedHour === 0) {
      Alert.alert('Error', 'Please enter a valid time');
      return;
    }
    const _endTime = Date.now() + timeLeft * 1000;
    const _startTime = Date.now();
    setEndTime(_endTime);
    // Store the full timer duration
    setFullDuration(timeLeft);
    // Persist end time, start time, and full duration
    await AsyncStorage.multiSet([
      ['timer_endTime', _endTime.toString()],
      ['timer_startTime', _startTime.toString()],
      ['timer_fullDuration', timeLeft.toString()],
    ]);
    setIsRunning(true);

    timerIntervalRef.current = setInterval(() => {
      const newTimeLeft = Math.max(
        0,
        Math.round((_endTime - Date.now()) / 1000),
      );
      setTimeLeft(newTimeLeft);
      if (newTimeLeft === 0) {
        clearInterval(timerIntervalRef.current);
        setIsRunning(false);
        AsyncStorage.multiRemove([
          'timer_endTime',
          'timer_startTime',
          'timer_fullDuration',
        ]);
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Time's up!",
            body: 'Your session is over. Great job staying focused!',
            sound: Platform.OS === 'android' ? 'default' : undefined,
          },
          trigger: null,
        });
      }
    }, 1000);
  };

  const cancelTimer = async () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    // Reset state and remove persisted values
    setTimeLeft(selectedHour * 3600 + selectedMinute * 60 + selectedSecond);
    setIsRunning(false);
    setIsPaused(false);
    setEndTime(null);
    await AsyncStorage.multiRemove([
      'timer_endTime',
      'timer_startTime',
      'timer_fullDuration',
    ]);
    if (notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      setNotificationId(null);
    }
    setResetTrigger((prev) => prev + 1);
    setSelectedSecond(0);
    setSelectedMinute(15);
    setSelectedHour(0);
  };

  // Expose timer functions via ref
  useImperativeHandle(ref, () => ({
    startTimer,
    cancelTimer,
    updateTime,
    pauseTimer,
    resumeTimer,
  }));

  const hoursData = Array.from({ length: 100 }, (_, i) =>
    i.toString().padStart(2, '0'),
  );
  const minutesData = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0'),
  );
  const secondsData = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0'),
  );

  const radius = wp(30);
  const circumference = 2 * Math.PI * radius;
  // Use the stored full duration (original duration) to compute the progress fill
  const strokeDashoffset =
    fullDuration > 0
      ? circumference - (timeLeft / fullDuration) * circumference
      : 0;

  return (
    <View style={styles.container}>
      {isRunning ? (
        <View style={styles.timerCircle}>
          <Svg
            height={wp(66)}
            width={wp(66)}
            viewBox={`0 0 ${wp(66)} ${wp(66)}`}
          >
            <Circle
              stroke="#3D5875"
              fill="none"
              cx={wp(33)}
              cy={wp(33)}
              r={radius}
              strokeWidth={10}
            />
            <Circle
              stroke="#739CEF"
              fill="none"
              cx={wp(33)}
              cy={wp(33)}
              r={radius}
              strokeWidth={10}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </Svg>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
      ) : (
        <View>
          <View style={styles.labelsContainer}>
            <Text style={styles.label}>Hour</Text>
            <Text style={styles.label}>Minute</Text>
            <Text style={styles.label}>Second</Text>
          </View>
          <View style={styles.columnsContainer}>
            <PickerColumn
              resetTrigger={resetTrigger}
              data={hoursData}
              selectedIndex={selectedHour}
              onValueChange={setSelectedHour}
            />
            <Text style={styles.separator}>:</Text>
            <PickerColumn
              resetTrigger={resetTrigger}
              data={minutesData}
              selectedIndex={selectedMinute}
              onValueChange={setSelectedMinute}
            />
            <Text style={styles.separator}>:</Text>
            <PickerColumn
              resetTrigger={resetTrigger}
              data={secondsData}
              selectedIndex={selectedSecond}
              onValueChange={setSelectedSecond}
            />
          </View>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  timerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
    position: 'absolute',
  },
  labelsContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#4A4A4A',
  },
  columnsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  column: {
    width: 60,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 24,
    color: '#4A4A4A',
  },
  separator: {
    fontSize: 24,
    marginHorizontal: 10,
    color: '#4A4A4A',
  },
});

export default Timer;
