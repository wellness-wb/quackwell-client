import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');
const iconSize = width * 0.078;

const MenuBar = ({ navigation, activeScreen }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#EF6C8B', '#F0A26F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.menuBar}
      >
        {/* Calendar */}
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate('PlannerMain')}
        >
          <View style={styles.iconContainer}>
            <FontAwesome5
              name="calendar-day"
              solid
              size={iconSize}
              color={
                ['PlannerMain', 'PlannerDetails'].includes(activeScreen)
                  ? '#A4CDF1'
                  : '#153CE6'
              }
            />
          </View>
        </TouchableOpacity>

        {/* Hydration */}
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate('HydrationMain')}
        >
          <View style={styles.iconContainer}>
            <FontAwesome5
              name="tint"
              solid
              size={iconSize}
              color={
                ['HydrationMain', 'HydrationTracker'].includes(activeScreen)
                  ? '#A4CDF1'
                  : '#153CE6'
              }
            />
          </View>
        </TouchableOpacity>

        {/* Home */}
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate('MainHub')}
        >
          <View style={styles.iconContainer}>
            <FontAwesome5
              name="home"
              solid
              size={iconSize}
              color={activeScreen === 'MainHub' ? '#A4CDF1' : '#153CE6'}
            />
          </View>
        </TouchableOpacity>

        {/* Calm */}
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate('CalmMain')}
        >
          <View style={styles.iconContainer}>
            <FontAwesome5
              name="clock"
              solid
              size={iconSize}
              color={
                ['CalmMain', 'CalmTracker'].includes(activeScreen)
                  ? '#A4CDF1'
                  : '#153CE6'
              }
            />
          </View>
        </TouchableOpacity>

        {/* Feed */}
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate('SocialMain')}
        >
          <View style={styles.iconContainer}>
            <FontAwesome5
              name="user-friends"
              solid
              size={iconSize}
              color={
                ['SocialMain', 'TrophyPage'].includes(activeScreen)
                  ? '#A4CDF1'
                  : '#153CE6'
              }
            />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 45,
  },
  menuBar: {
    width: '90%',
    height: height * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius:
      Math.min(
        Dimensions.get('window').width,
        Dimensions.get('window').height,
      ) * 0.1,
    opacity: 0.77,
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: height * 0.05 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 1,
  },

  icon: {
    width: '20%',
    alignItems: 'center',
    shadowOffset: { width: width * 0.03, height: height * 0.007 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 2,
  },
});

export default MenuBar;
