import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SwipeListView } from 'react-native-swipe-list-view';

const PlansTab = ({ selectedDate }) => {
  const [menuHeight] = useState(new Animated.Value(375)); // Initial collapsed height

  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [name, setName] = useState('');
  // We'll store date, start time, and end time as Date objects
  const [date, setDate] = useState('Set Date');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  // Picker visibility state
  const [startTime, setStartTime] = useState('Start Time');
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [endTime, setEndTime] = useState('End Time');
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [selectedOption, setSelectedOption] = useState(
    selectedDate.toLocaleDateString(),
  );

  const selectedBackground = '#3657c1';
  const selectedTextColor = '#e2baa1';
  const unselectedBackground = '#e2baa1';
  const unselectedTextColor = '#3657c1';

  const [errors, setErrors] = useState({
    name: false,
    date: false,
    startTime: false,
    endTime: false,
  });

  const [menuPosition, setMenuPosition] = useState(0);

  const onLayout = (event) => {
    const { y } = event.nativeEvent.layout; // Get the y-position of the menu
    setMenuPosition(y); // Save the menu's position
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => {
      // Get the touch location relative to the screen (pageY)
      const touchY = evt.nativeEvent.pageY;

      // Get the position of the menu (you may need to calculate this or get it dynamically)
      const menuTop = menuPosition; // This should be the top position of your menu on the screen

      // Only allow movement if the touch starts at the top 50px of the menu
      return touchY >= menuTop && touchY <= menuTop + 50;
    },
    onMoveShouldSetPanResponder: (_, gestureState) => {
      // Only react if swipe is significant
      return Math.abs(gestureState.dy) > 10;
    },
    onPanResponderMove: (_, gestureState) => {
      let newHeight = menuHeight._value - gestureState.dy; // Calculate new height

      // Ensure the height stays within the bounds (50 - 600)
      newHeight = Math.max(50, Math.min(600, newHeight));

      menuHeight.setValue(newHeight);
    },
    onPanResponderRelease: (_, gestureState) => {
      const threshold = 100; // Minimum swipe distance to trigger expansion/collapse

      if (gestureState.dy < -threshold) {
        expandMenu(); // Swiping up -> expand
      } else if (gestureState.dy > threshold) {
        collapseMenu(); // Swiping down -> collapse
      } else {
        // Snap to closest state if not past threshold
        if (menuHeight._value > 300) {
          expandMenu();
        } else {
          collapseMenu();
        }
      }
    },
  });

  const expandMenu = () => {
    Animated.timing(menuHeight, {
      toValue: 600,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const collapseMenu = () => {
    Animated.timing(menuHeight, {
      toValue: 375,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate mandatory fields: name, date, start time, and end time.
    const newErrors = {
      name: !name,
      date: date === 'Set Date',
      startTime: startTime === 'Start Time' || startTime > endTime,
      endTime: endTime === 'End Time' || startTime > endTime,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      //return; ***disabled so i can easily test task display without having to input a new task ever time***
    }

    // Create a task object with individual properties
    const newTask = {
      id: Date.now(),
      name,
      date,
      startTime,
      endTime,
      location,
      category,
      isCompleted,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Reset form fields and hide form
    setName('');
    setDate('Set Date');
    setStartTime('Start Time');
    setEndTime('End Time');
    setLocation('');
    setCategory('');
    setShowForm(false);
    setIsCompleted(false);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, isCompleted: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.menuBar, { height: menuHeight }]}
      onLayout={onLayout}
    >
      <LinearGradient
        colors={['#9bddff', '#F3CAAF']}
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

            {/* Task Name Input */}
            <TextInput
              placeholder="(Task Name)"
              style={styles.titleInput}
              value={name}
              onChangeText={setName}
              placeholderTextColor={errors.name ? '#e34060' : '#4462e3'}
            />

            {/* Category Picker */}
            <TextInput
              placeholder="Category"
              style={styles.pickCategory}
              value={category}
              onChangeText={setCategory}
              placeholderTextColor="#e2baa1"
            />

            {/* Date Picker */}
            <TouchableOpacity
              style={[styles.selectDate, errors.date && styles.errorInput]}
              onPress={() => setDatePickerVisibility(true)}
            >
              <FontAwesome5
                name="calendar-alt"
                solid
                size={20}
                color={'#e2baa1'}
              />
              <Text
                style={[
                  styles.dateTimeText,
                  { color: errors.date ? '#e34060' : '#e2baa1' },
                ]}
              >
                {date}
              </Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              themeVariant="light"
              onConfirm={(date) => {
                setDate(
                  date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }),
                );
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
                <Text
                  style={[
                    styles.dateTimeText,
                    { color: errors.startTime ? '#e34060' : '#e2baa1' },
                  ]}
                >
                  {startTime}
                </Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="time"
                themeVariant="light"
                onConfirm={(startTime) => {
                  setStartTime(
                    startTime.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
                  );
                  setStartTimePickerVisibility(false);
                }}
                onCancel={() => setStartTimePickerVisibility(false)}
              />

              {/* End Time Picker */}
              <TouchableOpacity
                style={[styles.selectTime, errors.endTime && styles.errorInput]}
                onPress={() => setEndTimePickerVisibility(true)}
              >
                <Text
                  style={[
                    styles.dateTimeText,
                    { color: errors.endTime ? '#e34060' : '#e2baa1' },
                  ]}
                >
                  {endTime}
                </Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                themeVariant="light"
                onConfirm={(endTime) => {
                  setEndTime(
                    endTime.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
                  );
                  setEndTimePickerVisibility(false);
                }}
                onCancel={() => setEndTimePickerVisibility(false)}
              />
            </View>

            {/* Location Picker */}
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
            {/* "+" Button */}
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  expandMenu();
                  setShowForm(true);
                }}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Buttons for all / individual day task view*/}
            <View style={styles.taskViewButtons}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      selectedOption !== 'all'
                        ? selectedBackground
                        : unselectedBackground,
                  },
                ]}
                onPress={() =>
                  setSelectedOption(selectedDate.toLocaleDateString())
                }
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color:
                        selectedOption !== 'all'
                          ? selectedTextColor
                          : unselectedTextColor,
                    },
                  ]}
                >
                  {selectedDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      selectedOption === 'all'
                        ? selectedBackground
                        : unselectedBackground,
                  },
                ]}
                onPress={() => setSelectedOption('all')}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color:
                        selectedOption === 'all'
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
            <SwipeListView
              data={
                selectedOption === 'all'
                  ? tasks.filter((task) => !task.isCompleted)
                  : tasks.filter(
                      (task) =>
                        task.date ===
                          selectedDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }) && !task.isCompleted,
                    )
              }
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <LinearGradient
                  colors={['#f5eedf', '#f2b58c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.taskItem}
                >
                  <View style={styles.taskHeader}>
                    {/* Task Name */}
                    <View>
                      <Text style={styles.nameText}>{item.name}</Text>
                      <Text style={styles.catText}>({item.category})</Text>
                    </View>
                    {/* Start Time and End Time aligned to the right */}
                    <View>
                      <Text style={styles.timeText}>{item.startTime}</Text>
                      <Text style={styles.timeText}>{item.endTime}</Text>
                    </View>
                  </View>

                  <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.locText}>📍 {item.location}</Text>
                </LinearGradient>
              )}
              renderHiddenItem={({ index }) => (
                <View>
                  {/* Delete Button */}
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() =>
                      Alert.alert(
                        'Are you sure you want to delete this task?',
                        'This action cannot be undone',
                        [
                          {
                            text: 'Delete',
                            onPress: () => handleDeleteTask(index),
                          },
                          { text: 'Cancel' },
                        ],
                      )
                    }
                  >
                    <FontAwesome5
                      name="trash-alt"
                      solid
                      size={20}
                      color={'#e2baa1'}
                    />
                  </TouchableOpacity>
                  {/* Complete Button */}
                  <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() =>
                      Alert.alert(
                        'Would you like to mark this task as completed?',
                        ' ',
                        [
                          {
                            text: 'Confirm',
                            onPress: () => handleCompleteTask(index),
                          },
                          { text: 'Cancel' },
                        ],
                      )
                    }
                  >
                    <FontAwesome5
                      name="check"
                      solid
                      size={20}
                      color={'#e2baa1'}
                    />
                  </TouchableOpacity>
                </View>
              )}
              rightOpenValue={-100} // Controls how much the item swipes left
              leftOpenValue={100}
              contentContainerStyle={{ paddingBottom: 200 }}
              ListEmptyComponent={() => (
                <Text style={styles.emptyText}>
                  Nothing planned for this day
                </Text>
              )}
            />
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
    width: '100%',
    position: 'absolute',
    bottom: -30,
    opacity: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    minHeight: 250,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-start', // Push content upwards when expanded
  },
  addButton: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#3657c1',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  addButtonText: {
    color: '#e2baa1',
    fontSize: 24,
    top: -1,
  },
  closeMenuButton: {
    position: 'absolute',
    top: -50,
    right: 10,
    zIndex: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    borderWidth: 2,
    borderColor: '#153CE6', // Blue circular outline for today
    borderRadius: 50, // Fully rounded
  },
  closeMenuButtonText: {
    color: '#153CE6',
    fontSize: 24,
    height: 32,
    fontFamily: 'Inter',
  },
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 60,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#153CE6',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#e2baa1',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
  sliderHandle: {
    position: 'absolute',
    top: 8, // Position the handle near the top
    alignSelf: 'center',
    height: 10,
    width: 80,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  timeContainer: {
    flexDirection: 'row', // Places elements in a row
    width: '90%', // Ensures it takes the full width
    paddingHorizontal: 10, // Optional: Padding for spacing
  },
  selectTime: {
    height: 40,
    flex: 1,
    backgroundColor: '#3657c1',
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 5,
    fontSize: 16,
    fontFamily: 'Inter',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 7,
  },
  selectDate: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3657c1',
    borderRadius: 20,
    padding: 10,
    height: 52,
    width: 290,
    marginVertical: 5,
  },
  dateTimeText: {
    fontSize: 20,
    fontFamily: 'Inter',
    marginHorizontal: 5,
  },
  titleInput: {
    textAlign: 'center',
    color: '#153CE6',
    padding: 10,
    fontSize: 30,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    bottom: 25,
  },
  pickCategory: {
    textAlign: 'center',
    color: '#e2baa1',
    backgroundColor: '#3657c1',
    bottom: 25,
    width: 86,
    height: 30,
    borderRadius: 20,
    padding: 10,
    fontSize: 14,
    fontFamily: 'Inter',
  },
  pickLocation: {
    backgroundColor: '#3657c1',
    borderRadius: 20,
    padding: 10,
    height: 52,
    width: 290,
    marginVertical: 5,
    fontSize: 20,
    fontFamily: 'Inter',
    color: '#e2baa1',
  },
  errorMessage: {
    color: '#e34060',
    marginTop: 10,
    textAlign: 'center',
  },
  noTasksText: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Inter',
  },
  taskViewButtons: {
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
  },
  buttonText: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  taskItem: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 15,
    height: 120,
    marginBottom: 15,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  deleteButton: {
    position: 'absolute',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    right: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  completeButton: {
    position: 'absolute',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    left: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#153CE6',
  },
  catText: {
    color: '#153CE6',
  },
  timeText: {
    fontWeight: 'medium',
    color: '#153CE6',
    fontSize: 20,
  },
  dateText: {},
  locText: {
    fontWeight: 'light',
    fontSize: 20,
    color: '#153CE6',
  },
  dateContainer: {
    alignItems: 'center',
    padding: 25,
  },
  dateStyle: {
    color: '#153CE6',
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#153CE6',
    alignSelf: 'center',
    fontWeight: '700',
  },
});

export default PlansTab;
