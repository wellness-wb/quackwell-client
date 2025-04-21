import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
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

const PostDetail = ({ route, navigation }) => {
  const { postId, profilePic, username, contentText, contentImage } =
    route.params;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchComments();
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      setCurrentUser({ ...user, ...profile });
    } catch (error) {
      console.error('Error fetching current user:', error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(
          `
          *,
          profiles:user_id (
            username,
            avatar_url
          )
        `,
        )
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
      Alert.alert('Error', 'Failed to load comments');
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: postId,
            user_id: currentUser.id,
            content: newComment.trim(),
          },
        ])
        .select(
          `
          *,
          profiles:user_id (
            username,
            avatar_url
          )
        `,
        )
        .single();

      if (error) throw error;

      setComments([...comments, data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error.message);
      Alert.alert('Error', 'Failed to add comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error.message);
      Alert.alert('Error', 'Failed to delete comment');
    }
  };

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.backgroundMain}
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

        <ScrollView
          contentContainerStyle={styles.container}
          style={{ flex: 1 }}
        >
          <LinearGradient
            colors={['rgba(164, 205, 241, 0.77)', 'rgba(243, 202, 175, 0.77)']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.background}
          >
            <View style={styles.header}>
              <Image source={profilePic} style={styles.profilePic} />
              <Text style={styles.username}>{username}</Text>
            </View>

            {contentText && (
              <Text style={styles.contentText}>{contentText}</Text>
            )}

            {contentImage && (
              <Image source={contentImage} style={styles.contentImage} />
            )}

            <View style={styles.divider} />

            {/* Comments Section */}
            <View style={styles.commentsSection}>
              <Text style={styles.commentTitle}>Comments</Text>
              {comments.map((comment) => (
                <View key={comment.id} style={styles.commentBox}>
                  <View style={styles.commentContent}>
                    <Text style={styles.commentUser}>
                      {comment.profiles.username}
                    </Text>
                    <Text style={styles.commentText}>{comment.content}</Text>
                  </View>
                  {currentUser && currentUser.id === comment.user_id && (
                    <TouchableOpacity
                      onPress={() => handleDeleteComment(comment.id)}
                      style={styles.deleteButton}
                    >
                      <FontAwesome
                        name="trash"
                        size={hp('2%')}
                        color="#153CE6"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              <View style={styles.commentInputBox}>
                <TextInput
                  value={newComment}
                  onChangeText={setNewComment}
                  placeholder="Write a comment..."
                  style={styles.input}
                  placeholderTextColor="#888"
                />
                <TouchableOpacity onPress={handleAddComment}>
                  <View style={styles.sendBox}>
                    <Text style={styles.sendBtn}>Post</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </ScrollView>

        <View style={styles.menuWrapper}>
          <MenuBar navigation={navigation} activeScreen="SocialMain" />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backgroundMain: {
    flex: 1,
  },
  container: {
    paddingBottom: hp('12%'),
    paddingTop: hp('12%'),
  },
  background: {
    flex: 1,
    padding: wp('5%'),
    borderRadius: 20,
    margin: wp('4%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  profilePic: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    marginRight: wp('3%'),
  },
  username: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    color: '#153CE6',
  },
  contentText: {
    fontSize: hp('2%'),
    color: '#153CE6',
    marginVertical: hp('1%'),
  },
  contentImage: {
    width: '100%',
    height: hp('30%'),
    borderRadius: 10,
    resizeMode: 'cover',
    marginVertical: hp('1%'),
  },
  divider: {
    height: 1,
    backgroundColor: '#153CE6',
    opacity: 0.4,
    marginVertical: hp('2%'),
  },

  commentsSection: {
    padding: wp('3%'),
  },
  commentTitle: {
    fontWeight: 'bold',
    fontSize: hp('2%'),
    color: '#153CE6',
    marginBottom: hp('1%'),
  },
  commentContent: {
    flex: 1,
  },
  commentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp('1.5%'),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: wp('3%'),
    borderRadius: 10,
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#153CE6',
    fontSize: hp('1.8%'),
    marginBottom: hp('0.5%'),
  },
  commentText: {
    color: '#153CE6',
    fontSize: hp('1.8%'),
  },
  deleteButton: {
    padding: wp('2%'),
  },
  commentInputBox: {
    flexDirection: 'row',
    marginTop: hp('1%'),
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 110,
    paddingHorizontal: wp('3%'),
    height: hp('5%'),
    marginRight: wp('1%'),
    right: wp('1%'),
  },
  sendBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('14%'),
    height: hp('5%'),
    backgroundColor: '#F3CAAF',
    borderRadius: 40,
  },
  sendBtn: {
    color: '#153CE6',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
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

export default PostDetail;
