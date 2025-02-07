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

  const dateTimeColor = "#F3CAAF"

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
              onPress={() => {setShowForm(false);}}
            >
              <Text style={styles.closeMenuButtonText}>x</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="(Task Name)"
              style={styles.titleInput}
              value={name}
              onChangeText={setName}
              placeholderTextColor = "#153CE6" //plan on changing to a color diff from when the title is input
            />

            <TextInput
              placeholder="Category"
              style={styles.pickCategory}
              value={category}
              onChangeText={setCategory}
              placeholderTextColor = "#e2baa1"
            />

            {/* Date Picker */}
            
            <DateTimePicker
              style={styles.selectDate}
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

          <View style={styles.timeContainer}>
            {/* Start Time Picker */}
            <DateTimePicker
              style={styles.selectTime}
              value={startTime || new Date()}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
              if (selectedTime) {
                  setStartTime(selectedTime);
                }
              }}
            />

            {/* End Time Picker */}
            <DateTimePicker
              style={styles.selectTime}
              value={endTime || new Date()}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                if (selectedTime) {
                  setEndTime(selectedTime);
                }
              }}
                />

          </View>

            <TextInput
              placeholder="📍 Location"
              style={styles.pickLocation}
              value={location}
              onChangeText={setLocation}
              placeholderTextColor = "#e2baa1"
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
    top: -1
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
  closeMenuButtonText:  {
    color: "#153CE6",
    fontSize: 24,
    height: 32,
    fontFamily: "Inter",
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
    color: "white"
    
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
  timeContainer:  {
    flexDirection: "row", // Places elements in a row
    width: "90%", // Ensures it takes the full width
    paddingHorizontal: 10, // Optional: Padding for spacing
  },
  selectTime: {
    flex: 1,
    backgroundColor: "#3657c1",
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 5,
    fontSize: 16,
    fontFamily: "Inter",
  },
  selectDate: {
    backgroundColor: "#3657c1",
    borderRadius: 20, 
    height: 52,
    width: 290,
  },
  titleInput:{
    textAlign: "center",
    color: "#153CE6",
    padding: 10,
    fontSize: 30,
    fontFamily: "Inter",
    fontWeight: "bold",
    placeholderTextColor: "black",
    bottom: 25
  },
  pickCategory:{
    textAlign: "center",
    color: "#e2baa1",
    backgroundColor: "#3657c1",
    bottom: 25,
    width: 86,
    height: 25,
    borderRadius: 20,
    padding: 10,
    fontSize: 14,
    fontFamily: "Inter",
  },
  pickLocation:{
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

});

export default BottomMenu;
