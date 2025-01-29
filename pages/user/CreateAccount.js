import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

const CreateAccount = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      //   await signUp(email, password);
      alert("Sign-up success! Please check your email for confirmation link.");
      // Navigate to the login page after successful sign-up
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      alert(`Sign-up error: ${error}`);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Sign Up</Text>

      <TextInput
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Button title="Sign Up" onPress={handleSignUp} />

      {/* Link to navigate back to the login screen */}
      <View>
        <Text>
          Already have an account?{" "}
          <Text
            style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
            onPress={() => navigation.navigate("Login")}
          >
            Log in
          </Text>
          .
        </Text>
      </View>
    </View>
  );
};

export default CreateAccount;
