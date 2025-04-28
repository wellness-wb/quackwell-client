import { useEffect, useRef, useState } from 'react';
import { Alert, Animated } from 'react-native';
import { useAuth } from '../../../utils/authContext';
import {
  addTodo,
  completeTodo,
  deleteTodo,
  fetchTodos,
  fetchTodosByDate,
} from '../../../utils/todos';

export const useTodos = (selectedDate) => {
  const { session } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    selectedDate.toLocaleDateString(),
  );
  const [showDeleteGif, setShowDeleteGif] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('Set Date');
  const [displayDate, setDisplayDate] = useState('Set Date');
  const [dueTime, setDueTime] = useState('Due Time');
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  useEffect(() => {
    setSelectedOption(selectedDate.toISOString().split('T')[0]);
  }, [selectedDate]);

  useEffect(() => {
    loadTodos();
  }, [session, selectedOption]);

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
    } catch (error) {
      console.error('Error occurred while loading todos:', error);
      Alert.alert('Error', 'There was a problem loading your todos.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
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
          displayDate: (() => {
            const [year, month, day] = newTodo.date.split('-').map(Number);
            const localDate = new Date(year, month - 1, day);
            return localDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
          })(),
        },
        ...prevTasks,
      ]);

      resetForm();
    } catch (error) {
      console.error('Error occurred while adding a todo:', error);
      Alert.alert('Error', 'There was a problem adding your todo.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDate('Set Date');
    setDisplayDate('Set Date');
    setDueTime('Due Time');
    setShowForm(false);
  };

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
          setShowDeleteGif(false);
        });
      }, 2000);
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

      const taskToToggle = tasks.find((task) => task.id === id);
      if (!taskToToggle) return;

      const newStatus = !taskToToggle.isCompleted;

      await completeTodo(id, newStatus);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isCompleted: newStatus } : task,
        ),
      );
    } catch (error) {
      console.error('Error occurred while updating task status:', error);
      Alert.alert('Error', 'There was a problem updating your task status.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCompletedTasks = () => {
    setShowCompletedTasks((prevState) => !prevState);
  };

  return {
    tasks,
    isLoading,
    showForm,
    setShowForm,
    name,
    setName,
    date,
    setDate,
    displayDate,
    setDisplayDate,
    dueTime,
    setDueTime,
    showCompletedTasks,
    selectedOption,
    setSelectedOption,
    showDeleteGif,
    fadeAnim,
    handleSubmit,
    handleDeleteTask,
    handleCompleteTask,
    resetForm,
    toggleCompletedTasks,
  };
};
