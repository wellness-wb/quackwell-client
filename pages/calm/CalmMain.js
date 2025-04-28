import { Audio } from 'expo-av';
import PropTypes from 'prop-types';
import React, { memo, useCallback, useRef, useState } from 'react';
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

// Constants
const SOUND_OPTIONS = ['Raining', 'Suzume Soundtrack', 'Ocean Waves'];
const QUICK_OPTIONS = [
  { label: '10:00', duration: 600 },
  { label: '15:00', duration: 900 },
  { label: '30:00', duration: 1800 },
];

// Components
const SoundControls = memo(
  ({
    sound,
    isSoundPlaying,
    showSoundOptions,
    onToggleSound,
    onToggleOptions,
    onSelectSound,
  }) => (
    <View style={styles.headphonesContainer}>
      <View style={styles.headphonesRow}>
        {sound && (
          <TouchableOpacity onPress={onToggleSound}>
            <FontAwesome
              name={isSoundPlaying ? 'pause' : 'play'}
              style={styles.playButton}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.iconButton} onPress={onToggleOptions}>
          <FontAwesome name="headphones" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {showSoundOptions && (
        <View style={styles.dropdown}>
          {SOUND_OPTIONS.map((soundOption) => (
            <TouchableOpacity
              key={soundOption}
              onPress={() => onSelectSound(soundOption)}
              style={styles.dropdownItem}
            >
              <Text style={styles.dropdownText}>{soundOption}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  ),
);

const TimerControls = memo(
  ({ timerStatus, onStart, onCancel, onPause, onResume }) => (
    <View style={styles.controlButtonsContainer}>
      {!timerStatus.isRunning && (
        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>Start Timer</Text>
        </TouchableOpacity>
      )}

      {timerStatus.isRunning && !timerStatus.isPaused && (
        <>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPause}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        </>
      )}

      {timerStatus.isRunning && timerStatus.isPaused && (
        <>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onResume}>
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  ),
);

const AnimationGif = memo(({ source, style, opacity, autoPlay, loop }) => (
  <Animated.Image
    source={source}
    style={[style, { opacity }]}
    autoPlay={autoPlay}
    loop={loop}
  />
));

const CalmMain = ({ navigation }) => {
  const timerRef = useRef(null);
  const [state, setState] = useState({
    timer: {
      isRunning: false,
      isPaused: false,
    },
    sound: {
      instance: null,
      selected: null,
      isPlaying: false,
      showOptions: false,
    },
    animation: {
      showSad: false,
      fadeValue: new Animated.Value(1),
    },
  });

  const handleStatusChange = useCallback((status) => {
    setState((prev) => ({
      ...prev,
      timer: status,
    }));
  }, []);

  const handleQuickOptionPress = useCallback(
    (duration) => {
      if (timerRef.current) {
        timerRef.current.updateTime(duration);
        if (!state.timer.isRunning) {
          setTimeout(() => {
            timerRef.current.startTimer();
          }, 50);
        }
      }
    },
    [state.timer.isRunning],
  );

  const handleStartTimer = useCallback(() => {
    if (timerRef.current) {
      timerRef.current.startTimer();
    }
  }, []);

  const handleCancelTimer = useCallback(async () => {
    if (timerRef.current) {
      timerRef.current.cancelTimer();
    }

    setState((prev) => ({
      ...prev,
      animation: {
        ...prev.animation,
        showSad: true,
      },
    }));

    if (state.sound.instance) {
      try {
        await state.sound.instance.stopAsync();
        await state.sound.instance.unloadAsync();
        setState((prev) => ({
          ...prev,
          sound: {
            ...prev.sound,
            instance: null,
            isPlaying: false,
          },
        }));
      } catch (e) {
        console.error('Error stopping sound:', e);
      }
    }

    const fadeAnim = state.animation.fadeValue;
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 4000,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        animation: {
          ...prev.animation,
          showSad: false,
          fadeValue: new Animated.Value(1),
        },
      }));
    }, 4000);
  }, [state.sound.instance, state.animation.fadeValue]);

  const handlePauseTimer = useCallback(() => {
    if (timerRef.current) {
      timerRef.current.pauseTimer();
    }
  }, []);

  const handleResumeTimer = useCallback(() => {
    if (timerRef.current) {
      timerRef.current.resumeTimer();
    }
  }, []);

  const handleToggleSound = useCallback(async () => {
    try {
      if (state.sound.isPlaying) {
        await state.sound.instance.pauseAsync();
      } else {
        await state.sound.instance.playAsync();
      }
      setState((prev) => ({
        ...prev,
        sound: {
          ...prev.sound,
          isPlaying: !prev.sound.isPlaying,
        },
      }));
    } catch (err) {
      console.error('Failed to toggle sound:', err);
    }
  }, [state.sound.instance, state.sound.isPlaying]);

  const handleSelectSound = useCallback(
    async (soundOption) => {
      try {
        setState((prev) => ({
          ...prev,
          sound: {
            ...prev.sound,
            showOptions: false,
          },
        }));

        if (state.sound.instance) {
          await state.sound.instance.stopAsync();
          await state.sound.instance.unloadAsync();
        }

        const file = SoundFunction.getSoundFile(soundOption);
        const { sound: newSound } = await Audio.Sound.createAsync(file, {
          shouldPlay: true,
          isLooping: true,
        });

        setState((prev) => ({
          ...prev,
          sound: {
            ...prev.sound,
            instance: newSound,
            selected: soundOption,
            isPlaying: true,
          },
        }));
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    },
    [state.sound.instance],
  );

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.bgContainer}
      resizeMode="cover"
    >
      <SoundControls
        sound={state.sound.instance}
        isSoundPlaying={state.sound.isPlaying}
        showSoundOptions={state.sound.showOptions}
        onToggleSound={handleToggleSound}
        onToggleOptions={() =>
          setState((prev) => ({
            ...prev,
            sound: {
              ...prev.sound,
              showOptions: !prev.sound.showOptions,
            },
          }))
        }
        onSelectSound={handleSelectSound}
      />

      <View style={styles.content}>
        <Timer
          ref={timerRef}
          initialDuration={900}
          onStatusChange={handleStatusChange}
        />

        {!state.timer.isRunning && (
          <View style={styles.quickOptionsContainer}>
            {QUICK_OPTIONS.map(({ label, duration }) => (
              <TimerQuickOption
                key={label}
                label={label}
                duration={duration}
                onPress={handleQuickOptionPress}
              />
            ))}
          </View>
        )}

        <TimerControls
          timerStatus={state.timer}
          onStart={handleStartTimer}
          onCancel={handleCancelTimer}
          onPause={handlePauseTimer}
          onResume={handleResumeTimer}
        />
      </View>

      {state.animation.showSad && (
        <AnimationGif
          source={require('../../assets/calm_sad.gif')}
          style={styles.sadGif}
          opacity={state.animation.fadeValue}
        />
      )}

      {state.timer.isRunning && (
        <AnimationGif
          source={require('../../assets/calm_chilling.gif')}
          style={styles.timerAnimation}
          opacity={1}
          autoPlay
          loop
        />
      )}

      <MenuBar navigation={navigation} activeScreen="CalmMain" />
    </ImageBackground>
  );
};

CalmMain.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

SoundControls.propTypes = {
  sound: PropTypes.object,
  isSoundPlaying: PropTypes.bool.isRequired,
  showSoundOptions: PropTypes.bool.isRequired,
  onToggleSound: PropTypes.func.isRequired,
  onToggleOptions: PropTypes.func.isRequired,
  onSelectSound: PropTypes.func.isRequired,
};

TimerControls.propTypes = {
  timerStatus: PropTypes.shape({
    isRunning: PropTypes.bool.isRequired,
    isPaused: PropTypes.bool.isRequired,
  }).isRequired,
  onStart: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onResume: PropTypes.func.isRequired,
};

AnimationGif.propTypes = {
  source: PropTypes.any.isRequired,
  style: PropTypes.object.isRequired,
  opacity: PropTypes.any,
  autoPlay: PropTypes.bool,
  loop: PropTypes.bool,
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
    zIndex: 100,
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
    zIndex: 101,
  },
  timerAnimation: {
    position: 'absolute',
    bottom: hp('9.4%'),
    right: wp('5%'),
    width: wp('40%'),
    height: hp('28%'),
    zIndex: 0,
  },
});

export default memo(CalmMain);
