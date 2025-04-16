import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { supabase } from '../../supabase';
import MenuBar from '../components/MenuBar';

const CreatePost = ({ navigation }) => {
  const [content, setContent] = useState('');

  const handlePost = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter a post content.');
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert('Error', 'Login is required.');
        return;
      }

      const { error } = await supabase.from('posts').insert([
        {
          user_id: user.id,
          content: content.trim(),
          comments: 0,
        },
      ]);

      if (error) throw error;

      Alert.alert('Success', 'Post created successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Error occurred while creating a post.');
    }
  };

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
          colors={['rgba(164, 205, 241, 0.77)', 'rgba(243, 202, 175, 0.77)']}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.backGradient}
        >
          <FontAwesome name="arrow-left" size={hp('2.5%')} color="#153CE6" />
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          placeholderTextColor="#888"
          multiline
          value={content}
          onChangeText={setContent}
        />

        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <LinearGradient
            colors={['rgba(164, 205, 241, 0.77)', 'rgba(243, 202, 175, 0.77)']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.postGradient}
          >
            <Text style={styles.postButtonText}>Post</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <MenuBar navigation={navigation} activeScreen="SocialMain" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('15%'),
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 15,
    padding: wp('4%'),
    minHeight: hp('30%'),
    width: wp('90%'),
    fontSize: hp('2%'),
    color: '#153CE6',
    textAlignVertical: 'top',
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  postButton: {
    alignSelf: 'center',
    width: wp('30%'),
  },
  postGradient: {
    paddingHorizontal: wp('8%'),
    paddingVertical: hp('1.5%'),
    borderRadius: 25,
    width: '100%',
  },
  postButtonText: {
    color: '#153CE6',
    fontSize: hp('2%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: hp('7%'),
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

export default CreatePost;
