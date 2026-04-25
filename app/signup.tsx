import { router, Stack } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore methods
import React, { useState } from "react";
import {
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
import { auth, db } from "../FirebaseConfig";

const Register = () => {
  const [name, setName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!name || !studentNumber || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      // 1. Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // 2. Save custom data to Firestore
      // We use the 'uid' from Auth as the Document ID to keep them linked
      await setDoc(doc(db, "users", user.uid), {
        fullName: name,
        studentId: studentNumber,
        email: email,
        createdAt: new Date().toISOString(),
      });

      router.replace("/(tabs)");
    } catch (error: any) {
      alert("Registration failed: " + error.message);
    }
  };
  return (
    <ImageBackground
      source={require("../assets/images/returnly_bg.png")}
      style={styles.screenWrapper}
      resizeMode="cover"
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Create Account",
          headerTransparent: true,
          headerTintColor: "#54C47B",
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, width: "100%" }}
        // Adjust this to 0 or a small positive number if you have a header
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.loginBox}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
              style={styles.textInput}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.textInput}
              placeholder="Student Number"
              value={studentNumber}
              onChangeText={setStudentNumber}
              keyboardType="numeric" // Shows the number pad on mobile
            />

            <TextInput
              style={styles.textInput}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.textInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.text}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ color: "#3C4858", marginTop: 10 }}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Register;

// You can reuse your existing styles here or import them from a common styles file
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // This centers the box when the keyboard is CLOSED
    paddingBottom: 40,
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
    width: "85%",
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#FAFAFA",
    borderRadius: 25,
    alignItems: "center",
    // Remove justifyContent: "center" to prevent vertical "jitter"
    alignSelf: "center", // Ensures it stays centered horizontally
    marginVertical: 40, // Adds space so it doesn't touch screen edges
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
    height: 55,
    width: "100%", // Use 100% of the parent container (loginBox)
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginVertical: 10, // Consistent spacing
    paddingHorizontal: 20,
    fontSize: 16, // Comfortable reading size
    color: "#3C4858", // A dark gray for readability with a hint of warmth
    shadowColor: "#9E9E9E", // A medium gray shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // Slightly elevated for a subtle 3D effect
  },
  button: {
    width: "100%", // Match the input width
    padding: 18,
    marginVertical: 15,
    backgroundColor: "#419FDC", // A lighter indigo to complement the title color
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
