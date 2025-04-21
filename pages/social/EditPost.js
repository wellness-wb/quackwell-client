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

const EditPost = ({ navigation, route }) => {
  const { postId, initialContent } = route.params;
  const [content, setContent] = useState(initialContent);

  const handleUpdate = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter a post content.');
      return;
    }

    try {
      const { error } = await supabase
        .from('posts')
        .update({ content: content.trim() })
        .eq('id', postId);

      if (error) throw error;

      Alert.alert('Success', 'Post updated successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating post:', error);
      Alert.alert('Error', 'Error occurred while updating the post.');
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
          placeholder="Edit your post..."
          placeholderTextColor="#888"
          multiline
          value={content}
          onChangeText={setContent}
        />

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <LinearGradient
            colors={['rgba(164, 205, 241, 0.77)', 'rgba(243, 202, 175, 0.77)']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.updateGradient}
          >
            <Text style={styles.updateButtonText}>Update</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <MenuBar navigation={navigation} activeScreen="Feed" />
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
  updateButton: {
    alignSelf: 'center',
    width: wp('40%'),
  },
  updateGradient: {
    paddingHorizontal: wp('8%'),
    paddingVertical: hp('1.5%'),
    borderRadius: 25,
    width: '100%',
  },
  updateButtonText: {
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

export default EditPost;
