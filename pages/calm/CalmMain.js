// CalmMain.js
import React, { useCallback, useRef, useState } from "react";
import { Button, ImageBackground, StyleSheet, View } from "react-native";
import MenuBar from "../components/MenuBar";
import Timer from "./components/Timer";
import TimerQuickOption from "./components/TimerQuickOption";

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
      source={require("../../assets/background.png")}
      style={styles.bgContainer}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <Timer
          ref={timerRef}
          initialDuration={900}
          onStatusChange={handleStatusChange}
        />

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
    justifyContent: "flex-start",
    alignItems: "center",
  },
  content: {
    marginTop: 100,
    alignItems: "center",
  },
  quickOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "80%",
  },
  controlButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "80%",
  },
});

export default CalmMain;
