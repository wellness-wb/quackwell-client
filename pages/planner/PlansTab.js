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
  Button,
  Icon,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PlansTab = () => {
  const [menuHeight] = useState(new Animated.Value(50)); // Initial collapsed height

  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [name, setName] = useState("");
  // We'll store date, start time, and end time as Date objects
  const [date, setDate] = useState("Set Date");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  // Picker visibility state
  const [startTime, setStartTime] = useState("Start Time");
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [endTime, setEndTime] = useState("End Time");
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [errors, setErrors] = useState({ name: false, date: false, startTime: false, endTime: false });

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


  // Helper: Expand the menu immediately
  const expandMenu = () => {
    Animated.timing(menuHeight, {
      toValue: 600,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate mandatory fields: name, date, start time, and end time.
    const newErrors = {
      name: !name,
      date: date === "Set Date",
      startTime: (startTime === "Start Time" || startTime > endTime),
      endTime: (endTime === "End Time" || startTime > endTime),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      return;
    }

    // For demonstration, we create a string summary for the task.
    const newTask = `${name}\n
    ${date}\n
    ${startTime} - ${endTime}\n
    ${location}\n
    ${category}`;
    setTasks([...tasks, newTask]);

    // Reset form fields and hide form
    setName("");
    setDate("Set Date");
    setStartTime("Start Time");
    setEndTime("End Time");
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
        onPress={() => {
          expandMenu();
          setShowForm(true);
        }}
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
            {/* Close new task form */}
            <TouchableOpacity
              style={styles.closeMenuButton}
              onPress={() => {
                setShowForm(false);
              }}
            >
              <Text style={styles.closeMenuButtonText}>x</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="(Task Name)"
              style={styles.titleInput}
              value={name}
              onChangeText={setName}
              placeholderTextColor={errors.name ? "#e34060" : "#4462e3"}
            />

            <TextInput
              placeholder="Category"
              style={styles.pickCategory}
              value={category}
              onChangeText={setCategory}
              placeholderTextColor="#e2baa1"
            />

            {/* Date Picker */}
            <TouchableOpacity style={[styles.selectDate, errors.date && styles.errorInput]} onPress={() => setDatePickerVisibility(true)}>
              <FontAwesome5
                        name="calendar-day"
                        solid size = {20}
                        color={"#e2baa1"}
                        />
              <Text style={[styles.dateTimeText, { color: errors.date ? "#e34060" : "#e2baa1" }]}>{date}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              themeVariant="light"
              onConfirm={(date) => {
                setDate(date.toDateString());
                setDatePickerVisibility(false);
              }}
              onCancel={() => setDatePickerVisibility(false)}
            />

            <View style={styles.timeContainer}>
              {/* Start Time Picker */}
              <TouchableOpacity 
                style={[styles.selectTime, errors.endTime && styles.errorInput]}
                onPress={() => setStartTimePickerVisibility(true)}
              >
                <Text style={[styles.dateTimeText, { color: errors.startTime ? "#e34060" : "#e2baa1" }]}>{startTime}</Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="time"
                themeVariant="light"
                onConfirm={(startTime) => {
                  setStartTime(startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
                  setStartTimePickerVisibility(false);
                }}
                onCancel={() => setStartTimePickerVisibility(false)}
              />

              {/* End Time Picker */}
              <TouchableOpacity
                style={[styles.selectTime, errors.endTime && styles.errorInput]}
                onPress={() => setEndTimePickerVisibility(true)}
              >
                <Text style={[styles.dateTimeText, { color: errors.endTime ? "#e34060" : "#e2baa1" }]}>{endTime}</Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                themeVariant="light"
                onConfirm={(endTime) => {
                  setEndTime(endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
                  setEndTimePickerVisibility(false);
                }}
                onCancel={() => setEndTimePickerVisibility(false)}
              />
            </View>

            <TextInput
              placeholder="📍 Location"
              style={styles.pickLocation}
              value={location}
              onChangeText={setLocation}
              placeholderTextColor="#e2baa1"
            />

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            {/* Error Message */}
            {Object.values(errors).some((error) => error) && (
              <Text style={styles.errorMessage}>Invalid Input</Text>
            )}
          </View>
        ) : (
          <>
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
    top: -1,
  },
  closeMenuButton: {
    position: "absolute",
    top: -50,
    left: 10,
    zIndex: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    borderWidth: 2,
    borderColor: "#153CE6", // Blue circular outline for today
    borderRadius: 50, // Fully rounded
  },
  closeMenuButtonText: {
    color: "#153CE6",
    fontSize: 24,
    height: 32,
    fontFamily: "Inter",
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
  tasksContainer: {
    flex: 1,
    paddingHorizontal: 50,
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
    backgroundColor: "#F0A26F",
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
    marginTop: 60, // Leave space for the "+" button and any header
    alignItems: "center",
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
  timeContainer: {
    flexDirection: "row", // Places elements in a row
    width: "90%", // Ensures it takes the full width
    paddingHorizontal: 10, // Optional: Padding for spacing
  },
  selectTime: {
    height: 40,
    flex: 1,
    backgroundColor: "#3657c1",
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 5,
    fontSize: 16,
    fontFamily: "Inter",
    alignItems: "center",
    flexDirection: "row",
    padding: 7,
  },
  selectDate: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3657c1",
    borderRadius: 20,
    padding: 10,
    height: 52,
    width: 290,
    marginVertical: 5,
  },
  dateTimeText: {
    fontSize: 20,
    fontFamily: "Inter",
    marginHorizontal: 5,
  },
  titleInput: {
    textAlign: "center",
    color: "#153CE6",
    padding: 10,
    fontSize: 30,
    fontFamily: "Inter",
    fontWeight: "bold",
    bottom: 25,
  },
  pickCategory: {
    textAlign: "center",
    color: "#e2baa1",
    backgroundColor: "#3657c1",
    bottom: 25,
    width: 86,
    height: 30,
    borderRadius: 20,
    padding: 10,
    fontSize: 14,
    fontFamily: "Inter",
  },
  pickLocation: {
    backgroundColor: "#3657c1",
    borderRadius: 20,
    padding: 10,
    height: 52,
    width: 290,
    marginVertical: 5,
    fontSize: 20,
    fontFamily: "Inter",
    color: "#e2baa1",
  },
  errorMessage: {
    color: "#e34060",
    marginTop: 10,
    textAlign: "center",
  },
});

export default PlansTab;
