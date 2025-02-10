import * as Notifications from "expo-notifications";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { formatTime } from "../../../utils/formatTime";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 3;

const PickerColumn = ({ data, selectedIndex, onValueChange }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        y: selectedIndex * ITEM_HEIGHT,
        animated: true,
      });
    }
  }, [selectedIndex]);

  const handleMomentumScrollEnd = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    onValueChange(index);
  };

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.column}
      showsVerticalScrollIndicator={false}
      snapToInterval={ITEM_HEIGHT}
      decelerationRate="fast"
      onMomentumScrollEnd={handleMomentumScrollEnd}
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
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [notificationId, setNotificationId] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const [selectedHour, setSelectedHour] = useState(
    Math.floor(initialDuration / 3600)
  );
  const [selectedMinute, setSelectedMinute] = useState(
    Math.floor((initialDuration % 3600) / 60)
  );
  const [selectedSecond, setSelectedSecond] = useState(initialDuration % 60);

  useEffect(() => {
    if (!isRunning) {
      const newTime =
        selectedHour * 3600 + selectedMinute * 60 + selectedSecond;
      setTimeLeft(newTime);
    }

    if (typeof onStatusChange === "function") {
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
      setIsPaused(false);
      timerIntervalRef.current = setInterval(() => {
        const newTimeLeft = Math.max(
          0,
          Math.round((_endTime - Date.now()) / 1000)
        );
        setTimeLeft(newTimeLeft);
        if (newTimeLeft === 0) {
          clearInterval(timerIntervalRef.current);
          setIsRunning(false);
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

  const timerIntervalRef = useRef(null);

  const startTimer = async () => {
    if (isRunning) return;
    const _endTime = Date.now() + timeLeft * 1000;
    setEndTime(_endTime);

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time's up!",
        body: "Your session is over. Great job staying focused!",
        sound: Platform.OS === "android" ? "default" : undefined,
      },
      trigger: { seconds: timeLeft },
    });
    setNotificationId(id);
    setIsRunning(true);

    timerIntervalRef.current = setInterval(() => {
      const newTimeLeft = Math.max(
        0,
        Math.round((_endTime - Date.now()) / 1000)
      );
      setTimeLeft(newTimeLeft);
      if (newTimeLeft === 0) {
        clearInterval(timerIntervalRef.current);
        setIsRunning(false);
      }
    }, 1000);
  };

  const cancelTimer = async () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setIsRunning(false);
    setIsPaused(false);
    setEndTime(null);
    if (notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      setNotificationId(null);
    }
  };

  useImperativeHandle(ref, () => ({
    startTimer,
    cancelTimer,
    updateTime,
    pauseTimer,
    resumeTimer,
  }));

  const hoursData = Array.from({ length: 100 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutesData = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const secondsData = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  return (
    <View style={styles.container}>
      {isRunning ? (
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      ) : (
        <View>
          <View style={styles.labelsContainer}>
            <Text style={styles.label}>Hour</Text>
            <Text style={styles.label}>Minute</Text>
            <Text style={styles.label}>Second</Text>
          </View>
          <View style={styles.columnsContainer}>
            <PickerColumn
              data={hoursData}
              selectedIndex={selectedHour}
              onValueChange={setSelectedHour}
            />
            <Text style={styles.separator}>:</Text>
            <PickerColumn
              data={minutesData}
              selectedIndex={selectedMinute}
              onValueChange={setSelectedMinute}
            />
            <Text style={styles.separator}>:</Text>
            <PickerColumn
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
    alignItems: "center",
    padding: 20,
  },
  timerText: {
    fontSize: 48,
    marginVertical: 20,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 24,
    color: "gray",
  },
  columnsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    width: 60,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 24,
    color: "gray",
  },
  separator: {
    fontSize: 24,
    marginHorizontal: 10,
  },
});

export default Timer;
