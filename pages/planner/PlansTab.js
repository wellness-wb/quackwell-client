import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Keyboard,
  PanResponder,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SwipeListView } from 'react-native-swipe-list-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../utils/authContext';
import {
  addTodo,
  completeTodo,
  deleteTodo,
  fetchTodos,
  fetchTodosByDate,
} from '../../utils/todos';
import { SOCIAL_CONSTANTS } from '../social/constants/socialConstants';

const PlansTab = ({ selectedDate }) => {
  const { session } = useAuth();
  const [menuHeight] = useState(new Animated.Value(375)); // Initial collapsed height

  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [isTaskNameFocused, setIsTaskNameFocused] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [date, setDate] = useState('Set Date');
  const [displayDate, setDisplayDate] = useState('Set Date');

  // Picker visibility state
  const [dueTime, setDueTime] = useState('Due Time');
  const [isDueTimePickerVisible, setDueTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
    dueTime: false,
  });

  const [menuPosition, setMenuPosition] = useState(0);

  // Update selectedOption when selectedDate changes
  useEffect(() => {
    setSelectedOption(selectedDate.toISOString().split('T')[0]);
  }, [selectedDate]);

  // Load todo data
  const loadTodos = async () => {
    if (!session) return;

    setIsLoading(true);
    try {
      let data;
      if (selectedOption === 'all') {
        data = await fetchTodos();
      } else {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        data = await fetchTodosByDate(formattedDate);
      }

      const formattedTasks = data.map((task) => {
        const [year, month, day] = task.date.split('-').map(Number);
        const localDate = new Date(year, month - 1, day);

        return {
          id: task.id,
          name: task.name,
          date: task.date,
          dueTime: task.due_time,
          isCompleted: task.is_completed,

          displayDate: localDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
        };
      });
      setTasks(formattedTasks);
      const todaysTasks = formattedTasks.filter(
        (task) => task.date === new Date().toISOString().split('T')[0],
      );

      // latest task will be the first in your array since you're unshifting new ones
      const latestTask = todaysTasks.length > 0 ? todaysTasks[0] : null;
    } catch (error) {
      console.error('Error occurred while loading todos:', error);
      Alert.alert('Error', 'There was a problem loading your todos.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load todos on component mount and when selectedOption changes
  useEffect(() => {
    loadTodos();
  }, [session, selectedOption]);

  // Auto-expand menu on mount
  useEffect(() => {
    expandMenu();
  }, []);

  const onLayout = (event) => {
    const { y } = event.nativeEvent.layout;
    setMenuPosition(y);
  };

  //handles movement of the tab when swiping up or down
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => {
      const touchY = evt.nativeEvent.pageY;
      const menuTop = menuPosition;
      return touchY >= menuTop && touchY <= menuTop + 50;
    },
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dy) > 10;
    },
    onPanResponderMove: (_, gestureState) => {
      let newHeight = menuHeight._value - gestureState.dy;
      newHeight = Math.max(50, Math.min(600, newHeight));
      menuHeight.setValue(newHeight);
    },
    onPanResponderRelease: (_, gestureState) => {
      const threshold = 100;

      if (gestureState.dy < -threshold) {
        expandMenu();
      } else if (gestureState.dy > threshold) {
        collapseMenu();
      } else {
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

  // Handle form submission with Supabase integration
  const handleSubmit = async () => {
    const newErrors = {
      name: !name,
      date: date === 'Set Date',
      dueTime: dueTime === 'Due Time',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      return;
    }

    try {
      setIsLoading(true);
      const newTodo = await addTodo(name, date, dueTime);

      setTasks((prevTasks) => [
        {
          id: newTodo.id,
          name: newTodo.name,
          date: newTodo.date,
          dueTime: newTodo.due_time,
          isCompleted: newTodo.is_completed,
        },
        ...prevTasks,
      ]);

      setName('');
      setDate('Set Date');
      setDisplayDate('Set Date');
      setDueTime('Due Time');
      setShowForm(false);

      setErrors({
        name: false,
        date: false,
        dueTime: false,
      });
    } catch (error) {
      console.error('Error occurred while adding a todo:', error);
      Alert.alert('Error', 'There was a problem adding your todo.');
    } finally {
      setIsLoading(false);
    }
  };

  const [showDeleteGif, setShowDeleteGif] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleDeleteTask = async (id) => {
    try {
      setIsLoading(true);
      setShowDeleteGif(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      await deleteTodo(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowDeleteGif(false); // fully hide after animation finishes
        });
      }, 2000);
    } catch (error) {
      console.error('Error occurred while deleting a todo:', error);
      Alert.alert('Error', 'There was a problem deleting your todo.');
    } finally {
      setIsLoading(false);
    }
  };

  // modified to toggle a task completed or uncompleted
  const handleCompleteTask = async (id) => {
    try {
      setIsLoading(true);

      const taskToToggle = tasks.find((task) => task.id === id);
      if (!taskToToggle) return;

      const newStatus = !taskToToggle.isCompleted;

      await completeTodo(id, true);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isCompleted: newStatus } : task,
        ),
      );
    } catch (error) {
      console.error('Error occurred while completing a todo:', error);
      Alert.alert('Error', 'There was a problem completing your todo.');
    } finally {
      setIsLoading(false);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsTaskNameFocused(false);
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.tabContainer, { height: menuHeight }]}
      onLayout={onLayout}
    >
      <LinearGradient
        colors={SOCIAL_CONSTANTS.GRADIENTS.MAIN}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {showForm ? (
          // Form for new task input
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.formContainer}>
              {/* cancel task input */}
              <TouchableOpacity
                style={[styles.planTabButton, { right: 10 }]}
                onPress={() => {
                  dismissKeyboard();
                  setShowForm(false);
                  setErrors({
                    name: false,
                    date: false,
                    dueTime: false,
                  });
                }}
              >
                <FontAwesome5
                  name="plus"
                  size="18"
                  color="#e2baa1"
                  style={{ transform: [{ rotate: '45deg' }] }}
                />
              </TouchableOpacity>

              {/* task name input */}
              <TextInput
                placeholder="Task Name"
                style={[
                  styles.titleInput,
                  isTaskNameFocused && styles.titleInputFocused,
                ]}
                value={name}
                onChangeText={setName}
                placeholderTextColor={errors.name ? '#e34060' : '#4462e3'}
                onFocus={() => setIsTaskNameFocused(true)}
                onBlur={() => setIsTaskNameFocused(false)}
              />

              {/* date input */}
              <TouchableOpacity
                style={[styles.selectDate, errors.date && styles.errorInput]}
                onPress={() => {
                  dismissKeyboard();
                  setDatePickerVisibility(true);
                }}
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
                  {displayDate}
                </Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                themeVariant="light"
                minimumDate={new Date()}
                onConfirm={(date) => {
                  setDate(date.toISOString().split('T')[0]);
                  setDisplayDate(
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

              {/* time picker */}
              <View style={styles.timeContainer}>
                <TouchableOpacity
                  style={[
                    styles.selectDate,
                    errors.dueTime && styles.errorInput,
                  ]}
                  onPress={() => setDueTimePickerVisibility(true)}
                >
                  <FontAwesome5
                    name="clock"
                    solid
                    size={20}
                    color={'#e2baa1'}
                  />
                  <Text
                    style={[
                      styles.dateTimeText,
                      {
                        color: errors.dueTime ? '#e34060' : '#e2baa1',
                      },
                    ]}
                  >
                    {dueTime !== 'Due Time' ? dueTime : 'Due Time'}
                  </Text>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={isDueTimePickerVisible}
                  mode="time"
                  themeVariant="light"
                  onConfirm={(selectedTime) => {
                    setDueTime(
                      selectedTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      }),
                    );
                    setDueTimePickerVisibility(false);
                  }}
                  onCancel={() => setDueTimePickerVisibility(false)}
                />
              </View>

              {/* submit button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text style={styles.submitButtonText}>
                  {isLoading ? 'Saving...' : 'Submit'}
                </Text>
              </TouchableOpacity>

              {Object.values(errors).some((error) => error) && (
                <Text style={styles.errorMessage}>Invalid Input</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <>
            {/* task view  */}
            {/* add task button */}
            <View>
              <TouchableOpacity
                style={[styles.planTabButton, { right: 10 }]}
                onPress={() => {
                  expandMenu();
                  setShowForm(true);
                  setErrors({
                    name: false,
                    date: false,
                    dueTime: false,
                  });
                }}
              >
                <FontAwesome5 name="plus" size="15" color="#e2baa1" />
              </TouchableOpacity>
            </View>
            {/* toggle completed task view button */}
            <View>
              <TouchableOpacity
                style={[
                  styles.planTabButton,
                  {
                    left: 10,
                    backgroundColor: showCompletedTasks ? '#e2baa1' : '#3657c1',
                  },
                ]}
                onPress={() => {
                  setShowCompletedTasks((prevState) => !prevState);
                }}
              >
                <FontAwesome5
                  name="check"
                  size="15"
                  color={showCompletedTasks ? '#3657c1' : '#e2baa1'}
                />
              </TouchableOpacity>
            </View>
            {/* task view by date button */}
            <View style={[styles.taskViewButtons, { left: 10 }]}>
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
            {/* task item display */}
            <SwipeListView
              data={
                showCompletedTasks
                  ? tasks.filter((task) => task.isCompleted)
                  : tasks.filter((task) => !task.isCompleted)
              }
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <LinearGradient
                  colors={
                    showCompletedTasks
                      ? ['#1b3fe0', '#4c68e5']
                      : ['#f5eedf', '#f2b58c']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.taskItem}
                >
                  <View style={styles.taskHeader}>
                    <View>
                      <Text
                        style={[
                          styles.nameText,
                          { color: showCompletedTasks ? '#e2baa1' : '#153CE6' },
                        ]}
                      >
                        {item.name}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.timeText,
                          { color: showCompletedTasks ? '#e2baa1' : '#153CE6' },
                        ]}
                      >
                        {item.dueTime}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={[
                      styles.dateText,
                      { color: showCompletedTasks ? '#e2baa1' : '#153CE6' },
                    ]}
                  >
                    {item.displayDate}
                  </Text>
                </LinearGradient>
              )}
              renderHiddenItem={({ item }) => (
                <View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() =>
                      Alert.alert(
                        'Are you sure you want to delete this task?',
                        'This action cannot be undone',
                        [
                          {
                            text: 'Delete',
                            onPress: () => handleDeleteTask(item.id),
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
                  <TouchableOpacity
                    style={[
                      styles.completeButton,
                      {
                        backgroundColor: showCompletedTasks
                          ? '#e2baa1'
                          : 'blue',
                      },
                    ]}
                    onPress={
                      showCompletedTasks
                        ? () =>
                            Alert.alert(
                              'Would you like to mark this task as not completed?',
                              ' ',
                              [
                                {
                                  text: 'Confirm',
                                  onPress: () => handleCompleteTask(item.id),
                                },
                                { text: 'Cancel' },
                              ],
                            )
                        : () =>
                            Alert.alert(
                              'Would you like to mark this task as completed?',
                              ' ',
                              [
                                {
                                  text: 'Confirm',
                                  onPress: () => handleCompleteTask(item.id),
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
                      color={showCompletedTasks ? 'blue' : '#e2baa1'}
                    />
                  </TouchableOpacity>
                </View>
              )}
              rightOpenValue={-100}
              leftOpenValue={100}
              contentContainerStyle={{ paddingBottom: 200 }}
              ListEmptyComponent={() => (
                <Text style={styles.emptyText}>
                  {isLoading
                    ? 'Loading todos...'
                    : 'Nothing planned for this day'}
                </Text>
              )}
            />
          </>
        )}
      </LinearGradient>
      {showDeleteGif && (
        <Animated.Image
          source={require('../../assets/planner_angry.gif')} // 🔁 your animation path
          style={{
            position: 'absolute',
            bottom: hp('11%'),
            right: wp('50%'),
            width: wp('50%'),
            height: hp('27%'),
            zIndex: 0,
          }}
        />
      )}

      <View style={styles.sliderHandle} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    width: '100%',
    position: 'absolute',
    bottom: -30,
    opacity: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    shadowOpacity: 0.3,
    elevation: 5,
    minHeight: 250,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  planTabButton: {
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: '#3657c1',
    paddingVertical: 4,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    width: 40,
    height: 40,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#3657c1',
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
    top: 8,
    alignSelf: 'center',
    height: 10,
    width: 80,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  timeContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 10,
  },
  titleInputFocused: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: '#3657c1',
    shadowColor: '#3657c1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
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
  },
  timeText: {
    fontWeight: 'medium',
    fontSize: 20,
  },
  dateText: {
    fontSize: 16,
  },
  dateContainer: {
    alignItems: 'center',
    padding: 25,
  },
  emptyText: {
    color: '#153CE6',
    alignSelf: 'center',
    fontWeight: '700',
  },
});

export default PlansTab;
