import React, { useCallback, useRef, useState } from 'react';
import { Button, ImageBackground, StyleSheet, View } from 'react-native';
import MenuBar from '../components/MenuBar';
import Timer from './components/Timer';
import TimerQuickOption from './components/TimerQuickOption';

const CalmMain = ({ navigation }) => {
  const timerRef = useRef(null);
  const [timerStatus, setTimerStatus] = useState({
    isRunning: false,
    isPaused: false,
  });

  const handleStatusChange = useCallback((status) => {
    setTimerStatus(status);
  }, []);

  const handleQuickOptionPress = (duration) => {
    if (timerRef.current) {
      timerRef.current.updateTime(duration);
    }
  };

  const handleStartTimer = () => {
    if (timerRef.current) {
      timerRef.current.startTimer(); // Also check for typos here ("startTimer")
    }

    if (sound) {
      // Instead of calling SoundFunction.unloadAsync() which doesn’t exist,
      // consider stopping/unloading the current sound:
      await sound.unloadAsync();
    }

    // Use SoundFunction.getSoundFile to get the file based on selectedSound
    const { sound: newSound } = await Audio.Sound
      .createAsync
      // SoundFunction.getSoundFile(selectedSound),
      // { shouldPlay: true },
      ();

    setSound(newSound); // Set the new sound to state
  };

  // When you cancel timer, the sound should also be canceled**
  const handleCancelTimer = async () => {
    if (timerRef.current) {
      timerRef.current.cancelTimer();
    }
  };

  const handlePauseTimer = () => {
    if (timerRef.current) {
      timerRef.current.pauseTimer();
    }
  };

  const handleResumeTimer = () => {
    if (timerRef.current) {
      timerRef.current.resumeTimer();
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.bgContainer}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <Timer
          ref={timerRef}
          initialDuration={900}
          onStatusChange={handleStatusChange}
        />

        {!timerStatus.isRunning && (
          <View style={styles.quickOptionsContainer}>
            <TimerQuickOption
              label="10:00"
              duration={600}
              onPress={handleQuickOptionPress}
            />
            <TimerQuickOption
              label="15:00"
              duration={900}
              onPress={handleQuickOptionPress}
            />
            <TimerQuickOption
              label="30:00"
              duration={1800}
              onPress={handleQuickOptionPress}
            />
          </View>
        )}

        <View style={styles.controlButtonsContainer}>
          {!timerStatus.isRunning && (
            <Button title="Start Timer" onPress={handleStartTimer} />
          )}
          {timerStatus.isRunning && !timerStatus.isPaused && (
            <>
              <Button title="Delete" onPress={handleCancelTimer} />
              <Button title="Pause" onPress={handlePauseTimer} />
            </>
          )}
          {timerStatus.isRunning && timerStatus.isPaused && (
            <>
              <Button title="Delete" onPress={handleCancelTimer} />
              <Button title="Continue" onPress={handleResumeTimer} />
            </>
          )}
        </View>
      </View>
      <MenuBar navigation={navigation} activeScreen="CalmMain" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
  },
  content: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingTop: 100,
  },
  controlButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 80,
  },
});

export default CalmMain;
