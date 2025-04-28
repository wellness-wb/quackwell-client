import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SOCIAL_CONSTANTS } from '../social/constants/socialConstants';
import PlansTabHeader from './components/PlansTabHeader';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useTabAnimation } from './hooks/useTabAnimation';
import { useTodos } from './hooks/useTodos';

const PlansTab = ({ selectedDate }) => {
  const {
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
  } = useTodos(selectedDate);

  const { menuHeight, expandMenu, collapseMenu, onLayout, panResponder } =
    useTabAnimation();

  useEffect(() => {
    expandMenu();
  }, []);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.tabContainer,
        {
          height: menuHeight,
          bottom: Platform.OS === 'android' ? -10 : -30,
        },
      ]}
      onLayout={onLayout}
    >
      <LinearGradient
        colors={SOCIAL_CONSTANTS.GRADIENTS.MAIN}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {showForm ? (
          <TaskForm
            name={name}
            setName={setName}
            date={date}
            setDate={setDate}
            displayDate={displayDate}
            setDisplayDate={setDisplayDate}
            dueTime={dueTime}
            setDueTime={setDueTime}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        ) : (
          <>
            <PlansTabHeader
              showCompletedTasks={showCompletedTasks}
              selectedOption={selectedOption}
              selectedDate={selectedDate}
              onToggleCompleted={toggleCompletedTasks}
              onAddTask={() => setShowForm(true)}
              onSelectDate={() =>
                setSelectedOption(selectedDate.toISOString().split('T')[0])
              }
              onSelectAll={() => setSelectedOption('all')}
              expandMenu={expandMenu}
            />

            <TaskList
              tasks={tasks}
              showCompletedTasks={showCompletedTasks}
              isLoading={isLoading}
              onDelete={handleDeleteTask}
              onComplete={handleCompleteTask}
            />
          </>
        )}
      </LinearGradient>
      {showDeleteGif && (
        <Animated.Image
          source={require('../../assets/planner_angry.gif')}
          style={{
            position: 'absolute',
            bottom: hp('11%'),
            right: wp('50%'),
            width: wp('50%'),
            height: hp('27%'),
            zIndex: 0,
            opacity: fadeAnim,
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
  sliderHandle: {
    position: 'absolute',
    top: 8,
    alignSelf: 'center',
    height: 10,
    width: 80,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
});

export default PlansTab;
