import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Alert,
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
import { supabase } from '../../supabase';
import MenuBar from '../components/MenuBar';
import Post from './components/Post';

const Feed = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchPosts();
    fetchCurrentUser();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchPosts();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchCurrentUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
      setCurrentUser(user);
    } catch (error) {
      console.error('Error fetching current user:', error.message);
    }
  };

  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = async (postId) => {
    try {
      const { error } = await supabase.from('posts').delete().eq('id', postId);

      if (error) throw error;

      setPosts(posts.filter((post) => post.id !== postId));
      Alert.alert('Success', 'Post deleted successfully.');
    } catch (error) {
      console.error('Error deleting post:', error.message);
      Alert.alert('Error', 'Error occurred while deleting the post.');
    }
  };

  const fetchPosts = async () => {
    try {
      const { data: postsData, error: postErr } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (postErr) throw postErr;

      const ids = postsData.map((p) => p.user_id);
      const { data: profiles, error: profErr } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .in('id', ids);
      if (profErr) throw profErr;

      const formatted = postsData.map((post) => {
        const prof = profiles.find((p) => p.id === post.user_id);
        return {
          ...post,
          username: prof?.username ?? '익명 사용자',
          profilePic: prof?.avatar_url
            ? { uri: prof.avatar_url }
            : require('../../assets/profilepic.png'),
        };
      });

      setPosts(formatted);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
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
          {posts.map((post) => (
            <TouchableOpacity
              key={post.id}
              onPress={() =>
                navigation.navigate('PostDetail', {
                  postId: post.id,
                  contentText: post.content,
                  username: post.username,
                  profilePic: post.profilePic,
                })
              }
            >
              <Post
                profilePic={post.profilePic}
                username={post.username}
                contentText={post.content}
                comments={post.comments}
                isOwner={currentUser && currentUser.id === post.user_id}
                onDelete={() => handleDeletePost(post.id)}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => navigation.navigate('CreatePost', { addNewPost })}
        >
          <LinearGradient
            colors={['rgba(164, 205, 241, 0.77)', 'rgba(243, 202, 175, 0.77)']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.createPostGradient}
          >
            <FontAwesome name="plus" size={hp('3%')} color="#153CE6" />
          </LinearGradient>
        </TouchableOpacity>

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
  createPostButton: {
    position: 'absolute',
    bottom: hp('15%'),
    right: wp('5%'),
    zIndex: 10,
  },
  createPostGradient: {
    overflow: 'hidden',
    borderRadius: 50,
    width: wp('15%'),
    height: wp('15%'),
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
