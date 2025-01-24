import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Calendar = () => {
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"]; // Days of the week
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date
  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    // Calculate the dates for the current week
    const startOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() - (currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1))
    );
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(startOfWeek);
      newDate.setDate(startOfWeek.getDate() + i);
      dates.push(newDate);
    }
    setWeekDates(dates);
  }, [currentDate]);

  // Highlight the current day
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // Adjust index for Monday start

  return (
    <View style={styles.container}>
      {/* Month and Icons */}
      <View style={styles.header}>
        <Text style={styles.month}>{weekDates[0]?.toLocaleString("default", { month: "short" })}</Text>
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
        {weekDates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayContainer,
              todayIndex === index && styles.selectedDay, // Highlight today
            ]}
            onPress={() => setCurrentDate(date)} // Optional: set this date as active
          >
            <Text style={styles.day}>{daysOfWeek[index]}</Text>
            <Text style={styles.date}>{date.getDate()}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    top: 5,
    opacity: 0.77,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  month: {
    fontFamily: "Inter",
    fontSize: 23,
    fontWeight: "bold",
    color: "#153CE6",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
    marginHorizontal: 10,
    color: "#739CEF",
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayContainer: {
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },
  selectedDay: {
    backgroundColor: "#739CEF",
  },
  day: {
    fontSize: 16,
    color: "#153CE6",
  },
  date: {
    fontSize: 14,
    color: "#153CE6",
  },
});

export default Calendar;
