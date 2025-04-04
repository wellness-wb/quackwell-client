import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MenuBar from '../components/MenuBar';
import Post from './components/Post';

const Feed = ({ navigation }) => {
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

      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PostDetail', {
                profilePic: require('../../assets/profilepic.png'),
                username: 'Mr. Quackwell II',
                contentText: "I'm better than you!",
                likes: 24,
              })
            }
          >
            <Post
              profilePic={require('../../assets/profilepic.png')}
              username="Mr. Quackwell II"
              contentText="I'm better than you!"
              likes={24}
              comments={7}
            />
          </TouchableOpacity>

          <Post
            profilePic={require('../../assets/friendspic.png')}
            username="Mr. Quackwell I"
            contentText="Mr. Quackwell II has earned a badge!"
            contentImage={require('../../assets/roommates.gif')}
            likes={48}
            comments={19}
          />

          <Post
            profilePic={require('../../assets/profilepic.png')}
            username="Mr. Quackwell II"
            contentText="Mr. Quackwell I has earned a badge!"
            contentImage={require('../../assets/scram.gif')}
            likes={12}
            comments={1}
          />

          <Post
            profilePic={require('../../assets/profilepic.png')}
            username="Mr. Quackwell II"
            contentText="Has anyone else's duck died????!"
            likes={50}
            comments={100}
          />
        </ScrollView>

        {/* Sticky MenuBar */}
        <MenuBar navigation={navigation} activeScreen="Feed" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 100, // gives space above MenuBar
  },
  backButton: {
    top: hp('10%'),
    left: wp('5%'),
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

export default Feed;
