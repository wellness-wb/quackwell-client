import { supabase } from '../../../supabase';

export const commentService = {
  async fetchComments(postId) {
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
      return data;
    } catch (error) {
      console.error('Error fetching comments:', error.message);
      throw new Error('Failed to load comments');
    }
  },

  async addComment(postId, userId, content) {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: postId,
            user_id: userId,
            content: content.trim(),
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
      return data;
    } catch (error) {
      console.error('Error adding comment:', error.message);
      throw new Error('Failed to add comment');
    }
  },

  async deleteComment(commentId) {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting comment:', error.message);
      throw new Error('Failed to delete comment');
    }
  },
};
