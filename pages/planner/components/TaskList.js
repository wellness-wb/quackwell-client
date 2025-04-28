import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TaskItem from './TaskItem';

const TaskList = ({
  tasks,
  showCompletedTasks,
  isLoading,
  onDelete,
  onComplete,
}) => {
  return (
    <SwipeListView
      data={
        showCompletedTasks
          ? tasks.filter((task) => task.isCompleted)
          : tasks.filter((task) => !task.isCompleted)
      }
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TaskItem item={item} isCompleted={showCompletedTasks} />
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
                    onPress: () => onDelete(item.id),
                  },
                  { text: 'Cancel' },
                ],
              )
            }
          >
            <FontAwesome5 name="trash-alt" solid size={20} color={'#e2baa1'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.completeButton,
              {
                backgroundColor: showCompletedTasks ? '#e2baa1' : 'blue',
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
                          onPress: () => onComplete(item.id),
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
                          onPress: () => onComplete(item.id),
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
          {isLoading ? 'Loading todos...' : 'Nothing planned for this day'}
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
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
  emptyText: {
    color: '#153CE6',
    alignSelf: 'center',
    fontWeight: '700',
  },
});

export default TaskList;
