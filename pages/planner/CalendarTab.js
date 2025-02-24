import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Calendar from './Calendar.js';

const CalendarTab = ({ selectedDate, setSelectedDate }) => {
  return (
    <View style={styles.menuBar}>
      <LinearGradient
        colors={['#e6f1fb', '#F3CAAF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Calendar inside Tab */}
        <View style={styles.calendarContainer}>
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  menuBar: {
    width: '100%',
    height: 175,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center', // Center the content inside
    alignItems: 'center', // Align items horizontally
  },
  calendarContainer: {
    width: '100%',
    height: 500,
  },
});

export default CalendarTab;
