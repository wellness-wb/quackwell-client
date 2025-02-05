import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const BottomMenu = () => {
  const [menuHeight] = useState(new Animated.Value(50)); // Initial collapsed height
  const [selectedOption, setSelectedOption] = useState("today"); // "today" is selected by default
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [name, setName] = useState("");
  // We'll store date, start time, and end time as Date objects
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  // Picker visibility state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dy: menuHeight }], // Adjust height based on swipe direction
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (_, gestureState) => {
      const threshold = 20; // Minimum swipe distance to trigger expansion/collapse
      if (gestureState.dy < -threshold) {
        // Swiping UP expands the menu
        Animated.timing(menuHeight, {
          toValue: 600, // Expanded height
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else {
        // Swiping DOWN collapses the menu
        Animated.timing(menuHeight, {
          toValue: 50, // Collapsed height
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  // Define colors for selected and unselected states
  const selectedBackground = "#153CE6";
  const selectedTextColor = "#e2baa1";
  const unselectedBackground = "#e2baa1";
  const unselectedTextColor = "#153CE6";

  // Helper: Expand the menu immediately
  const expandMenu = () => {
    Animated.timing(menuHeight, {
      toValue: 600,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Format Date object into a readable string
  const formatDate = (d) => {
    if (!d) return "Select Date";
    return d.toLocaleDateString();
  };

  // Format Time object into a readable time string
  const formatTime = (t) => {
    if (!t) return "Select Time";
    return t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate mandatory fields: name, date, start time, and end time.
    if (!name || !date || !startTime || !endTime) {
      Alert.alert(
        "Missing Input",
        "Name, Date, Start Time, and End Time are mandatory!"
      );
      return;
    }
    // For demonstration, we create a string summary for the task.
    const newTask = `Name: ${name} | Date: ${formatDate(date)} | ${formatTime(
      startTime
    )} - ${formatTime(endTime)} | Location: ${location} | Category: ${category}`;
    setTasks([...tasks, newTask]);

    // Reset form fields and hide form
    setName("");
    setDate(null);
    setStartTime(null);
    setEndTime(null);
    setLocation("");
    setCategory("");
    setShowForm(false);
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.menuBar, { height: menuHeight }]}
    >
      {/* "+" Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowForm(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <LinearGradient
        colors={["#9bddff", "#F3CAAF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {showForm ? (
          // Form for new task input
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Title *"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            {/* Date Picker */}
            <TouchableOpacity
              style={styles.input}
              onPress={() => {
                expandMenu();
                setShowDatePicker(true);
              }}
            >
              {showDatePicker && (
                <DateTimePicker
                  value={date || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setDate(selectedDate);
                    }
                  }}
                />
              )}
              <Text
                style={{
                  fontFamily: "Inter",
                  fontSize: 16,
                  color: date ? "#000" : "#888",
                }}
              >
                {formatDate(date)}
              </Text>
            </TouchableOpacity>
            {/* Start Time Picker */}
            <TouchableOpacity
              style={styles.input}
              onPress={() => {
                expandMenu();
                setShowStartTimePicker(true);
              }}
            >
              {showStartTimePicker && (
                <DateTimePicker
                  value={startTime || new Date()}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowStartTimePicker(false);
                    if (selectedTime) {
                      setStartTime(selectedTime);
                    }
                  }}
                />
              )}
              <Text
                style={{
                  fontFamily: "Inter",
                  fontSize: 16,
                  color: startTime ? "#000" : "#888",
                }}
              >
                {formatTime(startTime)}
              </Text>
            </TouchableOpacity>
            {/* End Time Picker */}
            <TouchableOpacity
              style={styles.input}
              onPress={() => {
                expandMenu();
                setShowEndTimePicker(true);
              }}
            >
              {showEndTimePicker && (
                <DateTimePicker
                  value={endTime || new Date()}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowEndTimePicker(false);
                    if (selectedTime) {
                      setEndTime(selectedTime);
                    }
                  }}
                />
              )}
              <Text
                style={{
                  fontFamily: "Inter",
                  fontSize: 16,
                  color: endTime ? "#000" : "#888",
                }}
              >
                {formatTime(endTime)}
              </Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Location"
              style={styles.input}
              value={location}
              onChangeText={setLocation}
            />
            <TextInput
              placeholder="Category"
              style={styles.input}
              value={category}
              onChangeText={setCategory}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Calendar Content (Buttons) */}
            <View style={styles.calendarContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      selectedOption === "today"
                        ? selectedBackground
                        : unselectedBackground,
                  },
                ]}
                onPress={() => setSelectedOption("today")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color:
                        selectedOption === "today"
                          ? selectedTextColor
                          : unselectedTextColor,
                    },
                  ]}
                >
                  today
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      selectedOption === "all"
                        ? selectedBackground
                        : unselectedBackground,
                  },
                ]}
                onPress={() => setSelectedOption("all")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color:
                        selectedOption === "all"
                          ? selectedTextColor
                          : unselectedTextColor,
                    },
                  ]}
                >
                  all
                </Text>
              </TouchableOpacity>
            </View>

            {/* Tasks Container */}
            <View style={styles.tasksContainer}>
              {tasks.length === 0 ? (
                <Text style={styles.noTasksText}>
                  nothing planned for today
                </Text>
              ) : (
                tasks.map((task, index) => (
                  <View key={index} style={styles.taskItem}>
                    <Text style={styles.taskText}>{task}</Text>
                  </View>
                ))
              )}
            </View>
          </>
        )}

        {/* Date Picker Modal */}
        {/* {showDatePicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )} */}

        {/* Start Time Picker Modal */}
        {/* {showStartTimePicker && (
          <DateTimePicker
            value={startTime || new Date()}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowStartTimePicker(false);
              if (selectedTime) {
                setStartTime(selectedTime);
              }
            }}
          />
        )} */}

        {/* End Time Picker Modal */}
        {/* {showEndTimePicker && (
          <DateTimePicker
            value={endTime || new Date()}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowEndTimePicker(false);
              if (selectedTime) {
                setEndTime(selectedTime);
              }
            }}
          />
        )} */}
      </LinearGradient>

      {/* Slider Handle */}
      <View style={styles.sliderHandle} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menuBar: {
    width: "100%",
    position: "absolute",
    bottom: -30,
    opacity: 0.77,
    borderTopLeftRadius: 20, // Rounded corners at the top
    borderTopRightRadius: 20,
    overflow: "hidden",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Android shadow
    minHeight: 250, // Ensure it starts small
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-start", // Push content upwards when expanded
  },
  addButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: "#153CE6",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  addButtonText: {
    color: "#e2baa1",
    fontSize: 24,
    fontWeight: "bold",
  },
  calendarContainer: {
    marginTop: 50, // Give space for the slider handle and header
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    bottom: 25,
  },
  buttonText: {
    fontSize: 16,
    textTransform: "capitalize",
    fontFamily: "Inter",
    fontWeight: "bold",
  },
  tasksContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  noTasksText: {
    fontSize: 18,
    color: "#333",
    fontFamily: "Inter",
  },
  taskItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    width: "100%",
  },
  taskText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Inter",
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 60, // Leave space for the "+" button and any header
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    fontSize: 16,
    fontFamily: "Inter",
  },
  submitButton: {
    backgroundColor: "#153CE6",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#e2baa1",
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "bold",
  },
  sliderHandle: {
    position: "absolute",
    top: 8, // Position the handle near the top
    alignSelf: "center",
    height: 10,
    width: 80,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
});

export default BottomMenu;
