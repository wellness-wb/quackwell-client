import { default as React, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useBouncePress } from '../utils/useBouncePress';
import GradientButton from './components/GradientButton';
import BubbleBackground from './user/components/bubble/BubbleBackground';

const { width, height } = Dimensions.get('window');

const WelcomePage = ({ navigation }) => {
  const { bounceAnim, handlePress } = useBouncePress();
  const gifLoopAnim = useRef(new Animated.Value(1)).current;
  const [gifKey, setGifKey] = useState(0);

  useEffect(() => {
    const animateGif = () => {
      Animated.sequence([
        Animated.timing(gifLoopAnim, {
          toValue: 1.05,
          duration: 8500,
          useNativeDriver: true,
        }),
        Animated.timing(gifLoopAnim, {
          toValue: 1,
          duration: 8500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setGifKey((prev) => prev + 1);
        animateGif();
      });
    };

    animateGif();

    return () => gifLoopAnim.stopAnimation();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.header.box}>
        <Pressable onPress={handlePress}>
          <Animated.Image
            source={require('../assets/welcome.png')}
            style={[
              styles.header.headerImage,
              { transform: [{ scale: bounceAnim }] },
            ]}
          />
        </Pressable>
      </View>
        </Pressable>
      </View>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        <GradientButton
          text="Let's Get Started"
          width={width * 0.58}
          height={height * 0.08}
          colors={['#F3CAAF', '#739CEF']}
          textColor="#153CE6"
          onPress={() => navigation.navigate('Login')}
        />
      </View>

      {/* Bubbles */}
      <BubbleBackground pointerEvents="box-none" />

      <View style={styles.footer.box}>
        <Image
          source={require('../assets/team_logo.png')}
          style={styles.footer.logo}
          resizeMode="contain"
        />
      </View>

      <Animated.View
        style={[styles.animationBox, { transform: [{ scale: gifLoopAnim }] }]}
      >
      <Animated.View
        style={[styles.animationBox, { transform: [{ scale: gifLoopAnim }] }]}
      >
        <Image
          key={gifKey}
          source={require('../assets/welcome_animated.gif')}
          style={styles.animation}
          resizeMode="contain"
        />
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    box: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',

      zIndex: 5,
    },
    headerImage: {
      width: wp('60%'),
      height: hp('40%'),
      aspectRatio: 1,
    },
  },

  buttonContainer: {
    flex: 0.25,
    bottom: -70,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    zIndex: 6,
  },

  animationBox: {
    position: 'absolute',
    top: height * 0.55,
    left: width * 0.01,
    width: width * 0.8,
    height: height * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  animation: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
  },

  footer: {
    box: {
      position: 'absolute',
      top: height * 0.08,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: width * 0.2,
      height: height * 0.25,
    },
    logo: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      borderRadius: Math.min(width, height) * 0.1,
      opacity: 0.77,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: height * 0.005 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      justifyContent: 'center',
    },
  },
});
export default WelcomePage;
