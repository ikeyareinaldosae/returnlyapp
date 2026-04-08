import { router, Stack } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../FirebaseConfig";

const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
  };

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/returnly_bg.png")}
      style={styles.screenWrapper}
      resizeMode="cover"
    >

      <Stack.Screen options={{ headerShown: false }} />
    
      {/* 1. Use KeyboardAvoidingView so the keyboard doesn't hide your inputs */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, width: '100%' }}
        keyboardVerticalOffset={-300}
      >
        {/* 2. ScrollView allows the content to move */}
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.loginBox}>
            <Image
              source={require("../assets/images/returnly_logo.png")}
              style={styles.logo}
              resizeMode="contain"
          />
            <Text style={styles.title}>Login</Text>
            
            <TextInput
              style={styles.textInput}
              placeholder="email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none" // Recommended for emails
            />
            
            <TextInput
              style={styles.textInput}
              placeholder="password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCorrect={false}
            />
            
            <TouchableOpacity style={styles.button} onPress={signIn}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={signUp}>
              <Text style={styles.text}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default index;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
    // Remove justifyContent: "center" if it feels jumpy, 
    // or keep it but ensure the KeyboardAvoidingView is configured right.
    justifyContent: "center", 
    alignItems: "center",
    paddingVertical: 20, // Reduced from 50 to keep it tighter
  },
  screenWrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center", // Vertical center
    alignItems: "center", // Horizontal center
  },
  // This is your white 80% wide box
  loginBox: {
    width: "85%", // Adjusted to 85% for better breathing room
    paddingVertical: 40, // Box grows based on content
    paddingHorizontal: 20,
    backgroundColor: "#FAFAFA",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    // Shadow for that "floating" effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA", // A softer white for a modern, minimalist background
  },
  background: {
    width: "50%", // Width is now strictly 80%
    paddingVertical: 40, // Better than fixed height for mobile
    backgroundColor: "#FAFAFA",
    borderRadius: 25, // Nice rounded corners for the "box" look
    alignItems: "center",
    justifyContent: "center",

    // Add shadow to make the box "pop" off the background
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 28, // A bit larger for a more striking appearance
    fontWeight: "800", // Extra bold for emphasis
    marginBottom: 40, // Increased space for a more airy, open feel
    color: "#54C47B", // A deep indigo for a sophisticated, modern look
  },
  textInput: {
    height: 50, // Standard height for elegance and simplicity
    width: "90%", // Full width for a more expansive feel
    backgroundColor: "#FFFFFF", // Pure white for contrast against the container
    borderColor: "#E8EAF6", // A very light indigo border for subtle contrast
    borderWidth: 2,
    borderRadius: 15, // Softly rounded corners for a modern, friendly touch
    marginVertical: 15,
    paddingHorizontal: 25, // Generous padding for ease of text entry
    fontSize: 16, // Comfortable reading size
    color: "#3C4858", // A dark gray for readability with a hint of warmth
    shadowColor: "#9E9E9E", // A medium gray shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // Slightly elevated for a subtle 3D effect
  },
  button: {
    width: "90%",
    marginVertical: 15,
    backgroundColor: "#419FDC", // A lighter indigo to complement the title color
    padding: 20,
    borderRadius: 15, // Matching rounded corners for consistency
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3C4858", // Shadow color to match the button for a cohesive look
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    color: "#FFFFFF", // Maintained white for clear visibility
    fontSize: 18, // Slightly larger for emphasis
    fontWeight: "600", // Semi-bold for a balanced weight
  },
  logo: {
    width: 120, // Adjust width as needed
    height: 120, // Adjust height as needed
    marginBottom: 20,
    // If your logo has a specific brand color,
    // you can use tintColor to force it to match your Indigo theme:
    // tintColor: '#1A237E',
  },
});
