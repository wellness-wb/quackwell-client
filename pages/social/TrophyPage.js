import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MenuBar from '../components/MenuBar';
import TrophyItem from './components/TrophyItem';

const TrophyPage = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
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
});

export default TrophyPage;
