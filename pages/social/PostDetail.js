import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { supabase } from '../../supabase';
import MenuBar from '../components/MenuBar';
import BackButton from './components/BackButton';
import CommentInput from './components/CommentInput';
import CommentSection from './components/CommentSection';
import { POST_DETAIL_CONSTANTS } from './constants/postDetailConstants';
import { commentService } from './services/commentService';

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

  const fetchCurrentUser = useCallback(async () => {
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
      Alert.alert('Error', 'Failed to load user information');
    }
  }, []);

  const fetchComments = useCallback(async () => {
    try {
      const data = await commentService.fetchComments(postId);
      setComments(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }, [postId]);

  const handleAddComment = useCallback(async () => {
    if (!newComment.trim()) return;

    try {
      const data = await commentService.addComment(
        postId,
        currentUser.id,
        newComment,
      );
      setComments([...comments, data]);
      setNewComment('');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }, [postId, currentUser, newComment, comments]);

  const handleDeleteComment = useCallback(
    async (commentId) => {
      try {
        await commentService.deleteComment(commentId);
        setComments(comments.filter((comment) => comment.id !== commentId));
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    },
    [comments],
  );

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.backgroundMain}
        resizeMode="cover"
      >
        <BackButton onPress={() => navigation.goBack()} />

        <ScrollView
          contentContainerStyle={styles.container}
          style={{ flex: 1 }}
        >
          <LinearGradient
            colors={POST_DETAIL_CONSTANTS.GRADIENTS.MAIN}
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

            <CommentSection
              comments={comments}
              currentUser={currentUser}
              onDeleteComment={handleDeleteComment}
            />

            <CommentInput
              value={newComment}
              onChangeText={setNewComment}
              onSubmit={handleAddComment}
            />
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
    padding: wp(POST_DETAIL_CONSTANTS.LAYOUT.PADDING.HORIZONTAL + '%'),
    borderRadius: POST_DETAIL_CONSTANTS.LAYOUT.BORDER_RADIUS.MEDIUM,
    margin: wp('4%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  profilePic: {
    width: wp(POST_DETAIL_CONSTANTS.LAYOUT.PROFILE.SIZE + '%'),
    height: wp(POST_DETAIL_CONSTANTS.LAYOUT.PROFILE.SIZE + '%'),
    borderRadius: wp(POST_DETAIL_CONSTANTS.LAYOUT.PROFILE.BORDER_RADIUS + '%'),
    marginRight: wp('3%'),
  },
  username: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    color: POST_DETAIL_CONSTANTS.COLORS.PRIMARY,
  },
  contentText: {
    fontSize: hp('2%'),
    color: POST_DETAIL_CONSTANTS.COLORS.PRIMARY,
    marginVertical: hp('1%'),
  },
  contentImage: {
    width: '100%',
    height: hp(POST_DETAIL_CONSTANTS.LAYOUT.CONTENT.IMAGE_HEIGHT + '%'),
    borderRadius: POST_DETAIL_CONSTANTS.LAYOUT.BORDER_RADIUS.SMALL,
    resizeMode: 'cover',
    marginVertical: hp('1%'),
  },
  divider: {
    height: 1,
    backgroundColor: POST_DETAIL_CONSTANTS.COLORS.PRIMARY,
    opacity: 0.4,
    marginVertical: hp('2%'),
  },
  menuWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default PostDetail;
