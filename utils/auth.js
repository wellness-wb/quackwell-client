import { supabase } from '../supabase';

export async function signUp(email, password, username) {
  try {
    // 먼저 사용자가 존재하는지 확인
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .maybeSingle();

    if (existingUser) {
      // 이미 존재하는 사용자명인 경우
      throw new Error('이미 존재하는 사용자명입니다.');
    }

    // 인증 회원가입 실행
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username: username } },
    });

    if (error) {
      throw error;
    }

    if (data?.user) {
      // 기존 프로필이 있는지 확인
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.user.id)
        .maybeSingle();

      // 프로필이 없는 경우에만 추가
      if (!existingProfile) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: data.user.id, username: username }]);

        if (profileError) {
          throw profileError;
        }
      }
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Sign-out error:', error.message);
    throw error;
  }
}

export async function sendPasswordResetLink(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: process.env.EXPO_PUBLIC_RESET_PASSWORD_URL + 'reset-password',
  });

  if (error) {
    console.error('Error sending password reset link:', error.message);
    throw error;
  }

  return data;
}

export async function getUsername() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return user?.user_metadata?.username;
}

export async function addFriendByUsername(username) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error('User not found');
  }
  const currentUserId = user.id;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('username', username)
    .single();

  if (profileError || !profile) {
    throw new Error('User not found');
  }

  const friendId = profile.id;

  if (friendId === currentUserId) {
    throw new Error('Cannot add yourself as a friend');
  }

  const { data: existingRequest, error: checkError } = await supabase
    .from('friends')
    .select('status')
    .or(
      `and(user_id.eq.${currentUserId},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${currentUserId})`,
    )
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    throw new Error('Failed to check friend request status');
  }

  if (existingRequest) {
    if (existingRequest.status === 'pending') {
      throw new Error('Friend request is already pending');
    } else if (existingRequest.status === 'accepted') {
      throw new Error('Already friends');
    }
  }

  const { data, error: insertError } = await supabase
    .from('friends')
    .insert([
      { user_id: currentUserId, friend_id: friendId, status: 'pending' },
    ]);

  if (insertError) {
    throw new Error('Failed to add friend: ' + insertError.message);
  }

  return data;
}

export async function getFriendRequests() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('User not found');
  }

  const { data: friendRequests, error } = await supabase
    .from('friends')
    .select('id, user_id, status')
    .eq('friend_id', user.id)
    .eq('status', 'pending');

  if (error) {
    console.log(error.message);
    throw new Error('Failed to get friend requests: ' + error.message);
  }

  const requestsWithUsernames = await Promise.all(
    friendRequests.map(async (request) => {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', request.user_id)
        .single();

      if (profileError) {
        console.log(profileError.message);
        return { ...request, profiles: { username: 'Unknown User' } };
      }

      return { ...request, profiles: { username: profile.username } };
    }),
  );

  return requestsWithUsernames;
}

export async function acceptFriendRequest(requestId) {
  const { data, error } = await supabase
    .from('friends')
    .update({ status: 'accepted' })
    .eq('id', requestId);

  if (error) {
    throw new Error('Failed to accept friend request: ' + error.message);
  }

  return data;
}

export async function rejectFriendRequest(requestId) {
  const { data, error } = await supabase
    .from('friends')
    .delete()
    .eq('id', requestId);

  if (error) {
    throw new Error('Failed to reject friend request: ' + error.message);
  }

  return data;
}

export async function getSentFriendRequests() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('User not found');
  }

  const { data: sentRequests, error } = await supabase
    .from('friends')
    .select('id, friend_id, status')
    .eq('user_id', user.id)
    .eq('status', 'pending');

  if (error) {
    console.log(error.message);
    throw new Error('Failed to get sent friend requests: ' + error.message);
  }

  // Get user info for each request
  const requestsWithUsernames = await Promise.all(
    sentRequests.map(async (request) => {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', request.friend_id)
        .single();

      if (profileError) {
        console.log(profileError.message);
        return { ...request, profiles: { username: 'Unknown User' } };
      }

      return { ...request, profiles: { username: profile.username } };
    }),
  );

  return requestsWithUsernames;
}

export async function getFriends() {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('User not found');
    }

    const currentUserId = user.id;

    const { data: sentAccepted, error: sentError } = await supabase
      .from('friends')
      .select('id, friend_id')
      .eq('user_id', currentUserId)
      .eq('status', 'accepted');

    if (sentError) {
      console.error('Failed to get sent friends:', sentError.message);
      throw sentError;
    }

    const { data: receivedAccepted, error: receivedError } = await supabase
      .from('friends')
      .select('id, user_id')
      .eq('friend_id', currentUserId)
      .eq('status', 'accepted');

    if (receivedError) {
      console.error('Failed to get received friends:', receivedError.message);
      throw receivedError;
    }

    const sentIds = sentAccepted.map((item) => ({
      id: item.id,
      profileId: item.friend_id,
    }));

    const receivedIds = receivedAccepted.map((item) => ({
      id: item.id,
      profileId: item.user_id,
    }));

    const allFriendIds = [...sentIds, ...receivedIds];

    if (allFriendIds.length === 0) {
      return [];
    }

    const profileIds = allFriendIds.map((item) => item.profileId);

    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, username')
      .in('id', profileIds);

    if (profilesError) {
      console.error('Failed to get profiles:', profilesError.message);
      throw profilesError;
    }

    const profileMap = {};
    profiles.forEach((profile) => {
      profileMap[profile.id] = profile;
    });

    const friendsList = allFriendIds.map((item) => {
      const profile = profileMap[item.profileId];
      return {
        id: item.id,
        name: profile?.username || 'Unknown User',
        status: 'Online',
        profilePic: require('../assets/profilepic.png'),
      };
    });

    return friendsList;
  } catch (error) {
    console.error('Error in getFriends:', error.message);
    throw new Error('Failed to get friends: ' + error.message);
  }
}
