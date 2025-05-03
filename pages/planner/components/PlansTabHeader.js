import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PlansTabHeader = ({
  showCompletedTasks,
  selectedOption,
  selectedDate,
  onToggleCompleted,
  onAddTask,
  onSelectDate,
  onSelectAll,
  expandMenu,
}) => {
  const selectedBackground = '#3657c1';
  const selectedTextColor = '#e2baa1';
  const unselectedBackground = '#e2baa1';
  const unselectedTextColor = '#3657c1';

  return (
    <>
      <View>
        <TouchableOpacity
          style={[styles.planTabButton, { right: 10 }]}
          onPress={() => {
            expandMenu();
            onAddTask();
          }}
        >
          <FontAwesome5 name="plus" size={15} color="#e2baa1" />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={[
            styles.planTabButton,
            {
              left: 10,
              backgroundColor: showCompletedTasks ? '#e2baa1' : '#3657c1',
            },
          ]}
          onPress={onToggleCompleted}
        >
          <FontAwesome5
            name="check"
            size={15}
            color={showCompletedTasks ? '#3657c1' : '#e2baa1'}
          />
        </TouchableOpacity>
      </View>

      <View
        style={[styles.taskViewButtons, { left: 10 }]}
        pointerEvents="box-none"
      >
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
          onPress={onSelectDate}
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
          onPress={onSelectAll}
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
    </>
  );
};

const styles = StyleSheet.create({
  planTabButton: {
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    backgroundColor: '#3657c1',
    paddingVertical: 4,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    width: 40,
    height: 40,
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
});

export default PlansTabHeader;
