import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TaskItem = ({ item, isCompleted }) => {
  return (
    <LinearGradient
      colors={isCompleted ? ['#1b3fe0', '#4c68e5'] : ['#f5eedf', '#f2b58c']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.taskItem}
    >
      <View style={styles.taskHeader}>
        <View>
          <Text
            style={[
              styles.nameText,
              { color: isCompleted ? '#e2baa1' : '#153CE6' },
            ]}
          >
            {item.name}
          </Text>
        </View>
        <View>
          <Text
            style={[
              styles.timeText,
              { color: isCompleted ? '#e2baa1' : '#153CE6' },
            ]}
          >
            {item.dueTime}
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.dateText,
          { color: isCompleted ? '#e2baa1' : '#153CE6' },
        ]}
      >
        {item.displayDate}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 15,
    height: 120,
    marginBottom: 15,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
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
});

export default TaskItem;
