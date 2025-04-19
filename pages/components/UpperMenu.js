import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { fetchTodosByDate } from '../../utils/todos';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpperMenu = ({ navigation }) => {
  const [currentHydration, setCurrentHydration] = useState(0);
  const [hydrationGoal, setHydrationGoal] = useState(2000);
  const [todayTask, setTodayTask] = useState(null);

  const GOAL_STORAGE_KEY = 'hydration_goal';
  const CURRENT_STORAGE_KEY = 'currentHydration';

  const percent =
    hydrationGoal > 0
      ? Math.round((currentHydration / hydrationGoal) * 100)
      : 0;

  useEffect(() => {
    const loadHydrationData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(GOAL_STORAGE_KEY);
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setHydrationGoal(parsed.goal);
        }

        const storedCurrent = await AsyncStorage.getItem(CURRENT_STORAGE_KEY);
        const today = new Date().toISOString().split('T')[0];
        if (storedCurrent) {
          const parsedCurrent = JSON.parse(storedCurrent);
          // Compare the saved date with today's date
          if (parsedCurrent.date === today) {
            setCurrentHydration(parsedCurrent.value);
          } else {
            // reset current hydration on a new day
            setCurrentHydration(0);
            await AsyncStorage.setItem(
              CURRENT_STORAGE_KEY,
              JSON.stringify({ value: 0, date: today }),
            );
          }
        } else {
          setCurrentHydration(0);
        }
      } catch (error) {
        console.error('Error loading hydration data', error);
      }
    };

    const loadTodayTask = async () => {
      const today = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      const todos = await fetchTodosByDate(today);
      if (todos.length > 0) {
        const latest = todos[0]; // Assuming the latest is first
        setTodayTask(latest.name);
      }
    };

    loadHydrationData();
    loadTodayTask();
  }, []);

  return (
    <View style={styles.menu}>
      <LinearGradient
        colors={['#A4CDF1', '#F3CAAF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <TouchableOpacity onPress={() => navigation.replace('HydrationMain')}>
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

        {todayTask && (
          <TouchableOpacity onPress={() => navigation.replace('PlannerMain')}>
            <View style={styles.hydrationAndTaskPill}>
              <Text style={styles.taskText}>📌 {todayTask}</Text>
            </View>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    width: '100%',
    height: 130,
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
    //flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    padding: 20,
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
    fontSize: hp('1.8%'),
    textAlign: 'center',
  },
});

export default UpperMenu;
