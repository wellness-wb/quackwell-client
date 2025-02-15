import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Calendar = () => {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [currentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Store selected day

  useEffect(() => {
    // Calculate the dates for the current week
    const startOfWeek = new Date(
      currentDate.setDate(
        currentDate.getDate() -
          (currentDate.getDay() === 0 ? 6 : currentDate.getDay()),
      ),
    );
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(startOfWeek);
      newDate.setDate(startOfWeek.getDate() + i);
      dates.push(newDate);
    }
    setWeekDates(dates);
  }, [currentDate]);

  return (
    <View style={styles.container}>
      {/* Month and Icons */}
      <View style={styles.header}>
        <Text style={styles.month}>
          {weekDates[0]?.toLocaleString('default', { month: 'short' })}
        </Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Text style={styles.icon}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.icon}>☀️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Days and Dates */}
      <View style={styles.weekContainer}>
        {weekDates.map((date, index) => {
          const isToday = new Date().toDateString() === date.toDateString();
          const isSelected =
            selectedDate.toDateString() === date.toDateString();
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayContainer,
                isSelected && styles.selectedDay, // Highlight selected day
                isToday && !isSelected && styles.todayIndicator, // If it's today and NOT selected
              ]}
              onPress={() => setSelectedDate(date)} // Update selected day
            >
              <Text
                style={[
                  styles.day,
                  isSelected && styles.selectedText, // Selected day text
                  isToday && !isSelected && styles.todayText, // Today text if NOT selected
                ]}
              >
                {daysOfWeek[index]}
              </Text>
              <Text
                style={[
                  styles.date,
                  isSelected && styles.selectedText, // Selected day text
                  isToday && !isSelected && styles.todayText, // Today text if NOT selected
                ]}
              >
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 140,
  },
  icon: {
    fontSize: 18,
    marginHorizontal: 15,
    color: '#739CEF',
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
    borderRadius: 10,
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
    borderColor: '#153CE6', // Blue circular outline for today
    borderRadius: 50, // Fully rounded
    padding: 8,
  },
  todayText: {
    color: '#153CE6',
    fontWeight: 'bold',
  },
});

export default Calendar;
