import React, { useCallback, useRef, useState } from 'react';
import { Button, ImageBackground, StyleSheet, View } from 'react-native';
import MenuBar from '../components/MenuBar';
import Timer from './components/Timer';
import TimerQuickOption from './components/TimerQuickOption';

const CalmMain = ({ navigation }) => {
  const [sound, setSound] = useState(null);
  const [selectedSound, setSelectedSound] = useState('Raining for power nap');

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

  const handleStartTimer = async () => {
    if (timerRef.current) {
      timerRef.current.startTimer(); // Also check for typos here ("startTimer")
    }

    if (sound) {
      await sound.stopAsync(); // Stop the current sound if it's playing
      await sound.unloadAsync(); // Unload the current sound
      setSound(null); // Reset the sound state to null
    }

    // Use SoundFunction.getSoundFile to get the file based on selectedSound
    const soundFile = SoundFunction.getSoundFile(selectedSound);
    const { sound: newSound } = await Audio.Sound.createAsync(soundFile, {
      shouldPlay: true,
      isLooping: true,
    });

    setSound(newSound); // Set the new sound to state
  };

  const handleCancelTimer = async () => {
    if (timerRef.current) {
      timerRef.current.cancelTimer();
    }
    if (sound) {
      await sound.stopAsync(); // Stop the current sound if it's playing
      await sound.unloadAsync(); // Unload the current sound
      setSound(null); // Reset the sound state to null
    }
  };

  const handlePauseTimer = async () => {
    if (timerRef.current) {
      timerRef.current.pauseTimer();
    }
    if (sound) {
      await sound.pauseAsync();
    }
  };

  const handleResumeTimer = async () => {
    if (timerRef.current) {
      timerRef.current.resumeTimer();
    }
    if (sound) {
      await sound.playAsync(); // Resume playing the sound
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

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ marginHorizontal: 10 }}>
            <Button
              title="Rain"
              onPress={() => setSelectedSound('Raining for power nap')}
            />
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Button
              title="Stress"
              onPress={() =>
                setSelectedSound('Ocean Waves to reduce your stress')
              }
            />
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Button
              title="Ocean"
              onPress={() =>
                setSelectedSound('Suzume Soundtrack to Calm Yourself')
              }
            />
          </View>
        </View>

        <View style={styles.soundButtonsContainer}>
          <Button
            title="Rain"
            onPress={() => setSelectedSound('Raining for power nap')}
            color={
              selectedSound === 'Raining for power nap' ? '#2E86AB' : '#888'
            }
          />
          <Button
            title="Stress"
            onPress={() =>
              setSelectedSound('Ocean Waves to reduce your stress')
            }
            color={
              selectedSound === 'Ocean Waves to reduce your stress'
                ? '#2E86AB'
                : '#888'
            }
          />
          <Button
            title="Ocean"
            onPress={() =>
              setSelectedSound('Suzume Soundtrack to Calm Yourself')
            }
            color={
              selectedSound === 'Suzume Soundtrack to Calm Yourself'
                ? '#2E86AB'
                : '#888'
            }
          />
        </View>

        <View style={styles.controlButtonsContainer}>
          {!timerStatus.isRunning && (
            <Button title="Start Timer" onPress={handleStartTimer} />
          )}
          {timerStatus.isRunning && !timerStatus.isPaused && (
            <>
              <Button title="Cancel" onPress={handleCancelTimer} />
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
