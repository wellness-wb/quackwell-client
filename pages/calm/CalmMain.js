import React, { useCallback, useRef, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
      timerRef.current.startTimer();
    }
  };

  const handleCancelTimer = () => {
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
            <TouchableOpacity style={styles.button} onPress={handleStartTimer}>
              <Text style={styles.buttonText}>Start Timer</Text>
            </TouchableOpacity>
          )}
          {timerStatus.isRunning && !timerStatus.isPaused && (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={handleCancelTimer}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handlePauseTimer}
              >
                <Text style={styles.buttonText}>Pause</Text>
              </TouchableOpacity>
            </>
          )}
          {timerStatus.isRunning && timerStatus.isPaused && (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={handleCancelTimer}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleResumeTimer}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
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
  button: {
    backgroundColor: '#739CEF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CalmMain;
