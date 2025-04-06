import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MenuBar from '../components/MenuBar';
import TrophyItem from './components/TrophyItem';

const TrophyPage = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <LinearGradient
          colors={[
            'rgba(164, 205, 241, 0.77)', // Slightly transparent blue
            'rgba(243, 202, 175, 0.77)', // Slightly transparent peach
          ]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.backGradient}
        >
          <FontAwesome name="arrow-left" size={hp('2.5%')} color="#153CE6" />
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.trophyList}>
        {/* Trophy with Custom GIF */}
        <TrophyItem
          title="Aquaholic"
          image={require('../../assets/aquaholic.gif')}
          progress={0.6}
        />

        {/* Another Trophy with a Different Image */}
        <TrophyItem
          title="Quack Tacktitian"
          image={require('../../assets/quacktitian.gif')}
          progress={0.8}
        />

        <TrophyItem
          title="Scram! Leave her!"
          image={require('../../assets/scram.gif')}
          progress={0.4}
        />

        <TrophyItem
          title="They were roommates"
          image={require('../../assets/roommates.gif')}
          progress={0.1}
        />
      </View>

      <MenuBar navigation={navigation} activeScreen="TrophyPage" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  trophyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    top: hp('25%'),
  },
  backButton: {
    top: hp('8%'),
    right: wp('38%'),
    zIndex: 10,
  },

  backGradient: {
    overflow: 'hidden',
    borderRadius: 50,
    width: wp('12%'),
    height: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
});

export default TrophyPage;
