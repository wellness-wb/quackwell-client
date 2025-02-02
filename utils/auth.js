import { supabase } from "../supabase";

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }
  return data;
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
    console.error("Sign-out error:", error.message);
    throw error;
  }
}

export async function sendPasswordResetLink(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: process.env.EXPO_PUBLIC_RESET_PASSWORD_URL + "reset-password",
  });

  if (error) {
    console.error("Error sending password reset link:", error.message);
    throw error;
  }

  return data;
}
