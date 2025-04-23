import { Audio } from 'expo-av';
import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MenuBar from '../components/MenuBar';
import SoundFunction from './components/SoundFunction';
import Timer from './components/Timer';
import TimerQuickOption from './components/TimerQuickOption';

const CalmMain = ({ navigation }) => {
  const timerRef = useRef(null);
  const [timerStatus, setTimerStatus] = useState({
    isRunning: false,
    isPaused: false,
  });

  const [showSadGif, setShowSadGif] = useState(false);
  const fadeSadAnim = useRef(new Animated.Value(1)).current;

  const [sound, setSound] = useState(null);
  const [selectedSound, setSelectedSound] = useState(null);
  const [showSoundOptions, setShowSoundOptions] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  const handleStatusChange = useCallback((status) => {
    setTimerStatus(status);
  }, []);

  const handleQuickOptionPress = (duration) => {
    if (timerRef.current) {
      timerRef.current.updateTime(duration);
      if (!timerStatus.isRunning) {
        setTimeout(() => {
          timerRef.current.startTimer();
        }, 50); // short delay to allow state update
      }
    }
  };

  const handleStartTimer = () => {
    if (timerRef.current) {
      timerRef.current.startTimer();
    }
  };

  const handleCancelTimer = async () => {
    if (timerRef.current) {
      timerRef.current.cancelTimer();
    }
    setShowSadGif(true);
    if (sound) {
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setIsSoundPlaying(false); // ✅ important to reflect stopped state
      } catch (e) {
        console.error('❌ Error stopping sound:', e);
      }
    }

    Animated.timing(fadeSadAnim, {
      toValue: 1, // Fade in
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeSadAnim, {
      toValue: 0,
      duration: 4000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setShowSadGif(false);
      fadeSadAnim.setValue(1);
    }, 4000);
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
      <View style={styles.headphonesContainer}>
        <View style={styles.headphonesRow}>
          {/* Play/Pause Sound */}
          {sound && (
            <TouchableOpacity
              onPress={async () => {
                try {
                  if (isSoundPlaying) {
                    await sound.pauseAsync();
                    setIsSoundPlaying(false);
                  } else {
                    await sound.playAsync();
                    setIsSoundPlaying(true);
                  }
                } catch (err) {
                  console.error('Failed to toggle sound:', err);
                }
              }}
            >
              <FontAwesome
                name={isSoundPlaying ? 'pause' : 'play'}
                style={styles.playButton}
              />
            </TouchableOpacity>
          )}
          {/* Headphones Button */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowSoundOptions(!showSoundOptions)}
          >
            <FontAwesome name="headphones" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {showSoundOptions && (
          <View style={styles.dropdown}>
            {['Raining', 'Suzume Soundtrack', 'Ocean Waves'].map(
              (soundOption) => (
                <TouchableOpacity
                  key={soundOption}
                  onPress={async () => {
                    try {
                      setShowSoundOptions(false);

                      if (sound) {
                        await sound.stopAsync();
                        await sound.unloadAsync();
                        setSound(null);
                      }

                      const file = SoundFunction.getSoundFile(soundOption);
                      console.log('Selected sound file:', file);

                      const { sound: newSound } = await Audio.Sound.createAsync(
                        file,
                        {
                          shouldPlay: true,
                          isLooping: true,
                        },
                      );

                      setSound(newSound);
                      await newSound.playAsync();
                      setIsSoundPlaying(true);
                    } catch (error) {
                      console.error('Error playing sound:', error);
                    }
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownText}>{soundOption}</Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        )}
      </View>

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
      {showSadGif && (
        <Animated.Image
          source={require('../../assets/calm_sad.gif')}
          style={[styles.sadGif, { opacity: fadeSadAnim }]} // Apply fade effect
        />
      )}

      <MenuBar navigation={navigation} activeScreen="CalmMain" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
  },
  content: {
    marginTop: 30,
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingTop: 30,
  },
  controlButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    width: '60%',
    marginTop: 60,
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
  headphonesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  headphonesContainer: {
    marginTop: hp('8%'),
    top: hp('2%'),
    left: wp('33%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: wp('4%'),
    height: hp('3%'),
    backgroundColor: 'transparent',
    color: '#739CEF',
    marginRight: wp('2%'),
    fontSize: hp('2%'),
    marginTop: hp('1%'),
  },

  iconButton: {
    backgroundColor: '#739CEF',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  dropdown: {
    position: 'absolute',
    top: hp('-2%'),
    height: hp('12.5%'),
    right: wp('60%'),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  dropdownText: {
    fontSize: 14,
    color: '#333',
  },

  sadGif: {
    position: 'absolute',
    bottom: hp('9%'),
    right: wp('50%'),
    width: wp('50%'),
    height: hp('27%'),
    zIndex: 0,
  },
});

export default CalmMain;
