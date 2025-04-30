import React, { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const TaskForm = ({
  name,
  setName,
  date,
  setDate,
  displayDate,
  setDisplayDate,
  dueTime,
  setDueTime,
  isLoading,
  onSubmit,
  onCancel,
}) => {
  const [isDueTimePickerVisible, setDueTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTaskNameFocused, setIsTaskNameFocused] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    date: false,
    dueTime: false,
  });

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsTaskNameFocused(false);
  };

  const handleSubmit = () => {
    const newErrors = {
      name: !name,
      date: date === 'Set Date',
      dueTime: dueTime === 'Due Time',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      return;
    }

    onSubmit();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.formContainer}>
        <TouchableOpacity
          style={[styles.planTabButton, { right: 10 }]}
          onPress={() => {
            dismissKeyboard();
            onCancel();
          }}
        >
          <FontAwesome5
            name="plus"
            size={18}
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

        <TouchableOpacity
          style={[styles.selectDate, errors.date && styles.errorInput]}
          onPress={() => {
            dismissKeyboard();
            setDatePickerVisibility(true);
          }}
        >
          <FontAwesome5 name="calendar-alt" solid size={20} color={'#e2baa1'} />
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    alignItems: 'center',
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
  errorInput: {
    borderWidth: 1,
    borderColor: '#e34060',
  },
});

export default TaskForm;
