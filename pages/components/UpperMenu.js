import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const UpperMenu = ({
  hydrationGoal = 2000,
  currentHydration = 500,
  todayTask = null,
  navigation,
}) => {
  const [menuHeight] = useState(new Animated.Value(80)); // ← start at a visible height

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: menuHeight }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (_, gestureState) => {
      const threshold = 20;
      if (gestureState.dy > threshold) {
        Animated.timing(menuHeight, {
          toValue: 200, // expanded
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(menuHeight, {
          toValue: 80, // collapsed
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const percent =
    hydrationGoal > 0
      ? Math.round((currentHydration / hydrationGoal) * 100)
      : 0;

  // Fade-in content when expanded
  const contentOpacity = menuHeight.interpolate({
    inputRange: [80, 250],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.menuBar,
        {
          height: menuHeight,
        },
      ]}
    >
      <LinearGradient
        colors={['#A4CDF1', '#F3CAAF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Fading content */}
        <Animated.View
          style={[styles.contentContainer, { opacity: contentOpacity }]}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('HydrationMain')}
          >
            <View style={styles.hydrationPill}>
              <LinearGradient
                colors={['#F3CAAF', '#A4CDF1']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.percentageBubble}
              >
                <Text style={styles.percentageText}>{percent}%</Text>
              </LinearGradient>
              <FontAwesome5 name="tint" size={24} color="#F3CAAF" />
            </View>
          </TouchableOpacity>

          {todayTask && (
            <TouchableOpacity
              onPress={() => navigation.navigate('PlannerMain')}
            >
              <View style={styles.taskContainer}>
                <Text style={styles.taskText}>📌 {todayTask}</Text>
              </View>
            </TouchableOpacity>
          )}
        </Animated.View>
      </LinearGradient>

      {/* Slider handle */}
      <View style={styles.sliderHandle} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menuBar: {
    width: '100%',
    height: hp('15%'),
    position: 'absolute',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  gradient: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  sliderHandle: {
    position: 'absolute',
    top: '85%',
    height: 10,
    width: 70,
    backgroundColor: '#E8CDC0',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
  hydrationPill: {
    position: 'relative',
    bottom: hp('5%'),
    right: wp('20%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: wp('4%'),
    width: wp('35%'),
    height: hp('4%'),
    borderRadius: 30,
    backgroundColor: '#153CE6',
  },
  percentageBubble: {
    width: wp('16%'),
    height: hp('3.5%'),
    right: wp('3%'),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('7%'),
  },
  percentageText: {
    fontWeight: 'bold',
    color: '#153CE6',
    fontSize: hp('1.8%'),
  },
  taskContainer: {
    width: wp('35%'),
    height: hp('4%'),
    position: 'relative',
    bottom: hp('9%'),
    left: wp('50%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#153CE6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },

  taskText: {
    color: '#F3CAAF',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
    textAlign: 'center',
  },
});

export default UpperMenu;
