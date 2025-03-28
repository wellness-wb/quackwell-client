import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
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

const PlansTab = ({ selectedDate }) => {
  const { session } = useAuth();
  const [menuHeight] = useState(new Animated.Value(375)); // Initial collapsed height

  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [date, setDate] = useState('Set Date');

  // Picker visibility state
  const [dueTime, setDueTime] = useState('Due Time');
  const [isDueTimePickerVisible, setDueTimePickerVisibility] = useState(false);
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
    dueTime: false,
  });

  const [menuPosition, setMenuPosition] = useState(0);

  // Update selectedOption when selectedDate changes
  useEffect(() => {
    setSelectedOption(selectedDate.toLocaleDateString());
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
        const formattedDate = selectedDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
        data = await fetchTodosByDate(formattedDate);
      }

      const formattedTasks = data.map((task) => ({
        id: task.id,
        name: task.name,
        date: task.date,
        dueTime: task.due_time,
        isCompleted: task.is_completed,
      }));

      setTasks(formattedTasks);
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
      setDueTime('Due Time');
      setShowForm(false);
      setIsCompleted(false);

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

  const handleDeleteTask = async (id) => {
    try {
      setIsLoading(true);
      await deleteTodo(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error occurred while deleting a todo:', error);
      Alert.alert('Error', 'There was a problem deleting your todo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      setIsLoading(true);
      await completeTodo(id, true);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isCompleted: true } : task,
        ),
      );
    } catch (error) {
      console.error('Error occurred while completing a todo:', error);
      Alert.alert('Error', 'There was a problem completing your todo.');
    } finally {
      setIsLoading(false);
    }
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
            <TouchableOpacity
              style={styles.closeMenuButton}
              onPress={() => {
                setShowForm(false);
                setErrors({
                  name: false,
                  date: false,
                  dueTime: false,
                });
              }}
            >
              <Text style={styles.closeMenuButtonText}>x</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="(Task Name)"
              style={styles.titleInput}
              value={name}
              onChangeText={setName}
              placeholderTextColor={errors.name ? '#e34060' : '#4462e3'}
            />

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
              <TouchableOpacity
                style={[styles.selectDate, errors.dueTime && styles.errorInput]}
                onPress={() => setDueTimePickerVisibility(true)}
              >
                <FontAwesome5 name="clock" solid size={20} color={'#e2baa1'} />
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
        ) : (
          <>
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.addButton}
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
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>

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

            <SwipeListView
              data={tasks.filter((task) => !task.isCompleted)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <LinearGradient
                  colors={['#f5eedf', '#f2b58c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.taskItem}
                >
                  <View style={styles.taskHeader}>
                    <View>
                      <Text style={styles.nameText}>{item.name}</Text>
                    </View>
                    <View>
                      <Text style={styles.timeText}>{item.dueTime}</Text>
                    </View>
                  </View>

                  <Text style={styles.dateText}>{item.date}</Text>
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
                    style={styles.completeButton}
                    onPress={() =>
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
                      color={'#e2baa1'}
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
    justifyContent: 'flex-start',
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
    borderColor: '#153CE6',
    borderRadius: 50,
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
  timeText: {
    fontWeight: 'medium',
    color: '#153CE6',
    fontSize: 20,
  },
  dateText: {},
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
