import React, { useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import MenuBar from '../components/MenuBar';
import CalendarTab from './CalendarTab';
import PlansTab from './PlansTab';

const PlannerMain = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Add the calendar at the top */}
      <CalendarTab
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Other planner content goes here */}
      <PlansTab selectedDate={selectedDate} />

      <MenuBar navigation={navigation} activeScreen="PlannerMain" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start', // Start content from the top
    alignItems: 'center', // Center everything horizontally
  },
});

export default PlannerMain;
