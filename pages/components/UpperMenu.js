import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchTodosByDate } from '../../utils/todos';

const STORAGE_KEYS = {
  GOAL: 'hydration_goal',
  CURRENT: 'currentHydration',
};

const DEFAULT_HYDRATION_GOAL = 2000;

const HydrationPill = memo(({ percent, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.hydrationAndTaskPill}>
      <LinearGradient
        colors={['#F3CAAF', '#A4CDF1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.percentageBubble}
      >
        <Text style={styles.percentageText}>{percent}%</Text>
      </LinearGradient>
      <FontAwesome5 name="tint" size={24} color="#F3CAAF" />
    </View>
  </TouchableOpacity>
));

const TaskPill = memo(({ task, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.hydrationAndTaskPill}>
      <Text style={styles.taskText}>📌 {task}</Text>
    </View>
  </TouchableOpacity>
));

const UpperMenu = ({ navigation }) => {
  const [currentHydration, setCurrentHydration] = useState(0);
  const [hydrationGoal, setHydrationGoal] = useState(DEFAULT_HYDRATION_GOAL);
  const [todayTask, setTodayTask] = useState(null);
  const insets = useSafeAreaInsets();

  const hydrationPercent = useCallback(() => {
    return hydrationGoal > 0
      ? Math.round((currentHydration / hydrationGoal) * 100)
      : 0;
  }, [currentHydration, hydrationGoal]);

  const handleHydrationPress = useCallback(() => {
    if (navigation?.navigate) {
      navigation.navigate('HydrationMain');
    }
  }, [navigation]);

  const handlePlannerPress = useCallback(() => {
    if (navigation?.navigate) {
      navigation.navigate('PlannerMain');
    }
  }, [navigation]);

  const loadHydrationData = useCallback(async () => {
    try {
      const [savedData, storedCurrent] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.GOAL),
        AsyncStorage.getItem(STORAGE_KEYS.CURRENT),
      ]);

      if (savedData) {
        const parsed = JSON.parse(savedData);
        setHydrationGoal(parsed.goal);
      }

      const today = new Date().toISOString().split('T')[0];
      if (storedCurrent) {
        const parsedCurrent = JSON.parse(storedCurrent);
        if (parsedCurrent.date === today) {
          setCurrentHydration(parsedCurrent.value);
        } else {
          setCurrentHydration(0);
          await AsyncStorage.setItem(
            STORAGE_KEYS.CURRENT,
            JSON.stringify({ value: 0, date: today }),
          );
        }
      } else {
        setCurrentHydration(0);
      }
    } catch (error) {
      console.error('Error loading hydration data:', error);
    }
  }, []);

  const loadTodayTask = useCallback(async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const todos = await fetchTodosByDate(today);
      if (todos.length > 0 && !todos[0].is_completed) {
        console.log(todos[0]);
        setTodayTask(todos[0].name);
      } else {
        setTodayTask('Create Task');
      }
    } catch (error) {
      console.error('Error loading today task:', error);
    }
  }, []);

  useEffect(() => {
    loadHydrationData();
    loadTodayTask();
  }, [loadHydrationData, loadTodayTask]);

  return (
    <View
      style={[
        styles.menu,
        {
          height:
            Platform.OS === 'ios'
              ? 90 + insets.top / 2
              : Platform.isPad
                ? 100
                : 90,
        },
      ]}
    >
      <LinearGradient
        colors={['#A4CDF1', '#F3CAAF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradient,
          { paddingTop: insets.top > 0 ? insets.top / 2 : 10 },
        ]}
      >
        <HydrationPill
          percent={hydrationPercent()}
          onPress={handleHydrationPress}
        />
        {todayTask && (
          <TaskPill task={todayTask} onPress={handlePlannerPress} />
        )}
      </LinearGradient>
    </View>
  );
};

UpperMenu.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

HydrationPill.propTypes = {
  percent: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

TaskPill.propTypes = {
  task: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  menu: {
    width: '100%',
    position: 'absolute',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradient: {
    height: '100%',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 15,
    justifyContent: 'space-around',
  },
  hydrationAndTaskPill: {
    opacity: 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    width: wp('35%'),
    height: hp('4%'),
    borderRadius: 30,
    backgroundColor: '#153CE6',
  },
  percentageBubble: {
    width: wp('16%'),
    height: hp('3.5%'),
    right: wp('3%'),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('7%'),
  },
  percentageText: {
    fontWeight: 'bold',
    color: '#153CE6',
    fontSize: hp('1.8%'),
  },
  taskText: {
    color: '#F3CAAF',
    fontWeight: 'bold',
    fontSize: hp('1.65%'),
    textAlign: 'center',
  },
});

export default memo(UpperMenu);
