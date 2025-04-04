import React, { useEffect, useState, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const translateX = useRef(new Animated.Value(0)).current;
  const animationDuration = 250; // Speed of swipe animation

  // Calculate week dates
  const getWeekDates = (startDate) => {
    const startOfWeek = new Date(startDate);
    startOfWeek.setDate(startDate.getDate() - (startDate.getDay() || 7) + 1);

    return Array.from({ length: 7 }, (_, i) => {
      const newDate = new Date(startOfWeek);
      newDate.setDate(startOfWeek.getDate() + i);
      return newDate;
    });
  };

  useEffect(() => {
    setWeekDates(getWeekDates(currentWeekStart));
  }, [currentWeekStart]);

  // Animate dates when swiping
  const changeWeek = (direction) => {
    const swipeDistance = direction === 'next' ? -100 : 100; // Move left or right

    Animated.timing(translateX, {
      toValue: swipeDistance,
      duration: animationDuration,
      useNativeDriver: true,
    }).start(() => {
      setCurrentWeekStart((prev) => {
        const newDate = new Date(prev);
        newDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
        return newDate;
      });

      translateX.setValue(0); // Reset for next swipe
    });
  };

  return (
    <GestureRecognizer
      onSwipeLeft={() => changeWeek('next')}
      onSwipeRight={() => changeWeek('prev')}
      config={config}
      style={styles.container}
    >
      {/* Static Header (Does NOT move) */}
      <View style={styles.header}>
        <Text style={styles.month}>
          {weekDates[0]?.toLocaleString('default', { month: 'short' })}
        </Text>
      </View>

      {/* Animated Dates Only */}
      <Animated.View
        style={[styles.weekContainer, { transform: [{ translateX }] }]}
      >
        {weekDates.map((date, index) => {
          const isToday = new Date().toDateString() === date.toDateString();
          const isSelected =
            selectedDate.toDateString() === date.toDateString();
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayContainer,
                isSelected && styles.selectedDay,
                isToday && !isSelected && styles.todayIndicator,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                style={[
                  styles.day,
                  isSelected && styles.selectedText,
                  isToday && !isSelected && styles.todayText,
                ]}
              >
                {daysOfWeek[index]}
              </Text>
              <Text
                style={[
                  styles.date,
                  isSelected && styles.selectedText,
                  isToday && !isSelected && styles.todayText,
                ]}
              >
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    top: 0,
    opacity: 0.77,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 95,
  },
  month: {
    fontFamily: 'Inter',
    fontSize: 23,
    fontWeight: 'bold',
    color: '#153CE6',
    marginTop: 140,
    marginLeft: 19,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  dayContainer: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
  },
  selectedDay: {
    backgroundColor: '#739CEF',
  },
  day: {
    fontSize: 20,
    color: '#153CE6',
  },
  date: {
    fontSize: 14,
    color: '#153CE6',
  },
  todayIndicator: {
    borderWidth: 2,
    borderColor: '#153CE6',
    borderRadius: 50,
    padding: 8,
  },
  todayText: {
    color: '#153CE6',
    fontWeight: 'bold',
  },
});

export default Calendar;
