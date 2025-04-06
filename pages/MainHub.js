import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { fetchTodosByDate } from '../utils/todos';
import MainHubDay from './components/MainHubDay';
import MainHubNight from './components/MainHubNight';
import MenuBar from './components/MenuBar';
import UpperMenu from './components/UpperMenu';
import VirtualPet from './components/VirtualPet';

const MainHub = ({ navigation }) => {
  const [isDayTime, setIsDayTime] = useState(true);
  const [currentHydration, setCurrentHydration] = useState(0);
  const [hydrationGoal, setHydrationGoal] = useState(2000);
  const [latestTask, setLatestTask] = useState(null);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 7 && currentHour <= 19) {
      setIsDayTime(true);
    } else {
      setIsDayTime(false);
    }
  }, []);
  useEffect(() => {
    const loadHydration = async () => {
      const storedHydration = await AsyncStorage.getItem('currentHydration');
      const storedGoal = await AsyncStorage.getItem('hydrationGoal');
      setCurrentHydration(Number(storedHydration) || 0);
      setHydrationGoal(Number(storedGoal) || 2000);
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
        setLatestTask(latest.name);
      }
    };

    loadHydration();
    loadTodayTask();
  }, []);

  return (
    <View style={styles.background}>
      {isDayTime ? <MainHubDay /> : <MainHubNight />}

      <UpperMenu
        navigation={navigation}
        currentHydration={currentHydration}
        hydrationGoal={hydrationGoal}
        todayTask={latestTask}
      />

      <View style={styles.animationBox}>
        <VirtualPet />
      </View>

      <MenuBar navigation={navigation} activeScreen="MainHub" />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  animationBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('70%'),
    height: hp('35%'),
    top: hp('30%'),
    left: wp('20%'),
  },
});

export default MainHub;
