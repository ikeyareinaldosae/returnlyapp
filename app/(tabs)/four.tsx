import * as ImagePicker from "expo-image-picker";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { auth } from "../../FirebaseConfig";

export default function TabOneScreen() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], // Restrict to images only
      allowsEditing: true, // Allows cropping
      aspect: [4, 3], // Aspect ratio for cropping
      quality: 1, // 1 is highest quality
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) router.replace("/");
    });
    return unsubscribe;
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/returnly_bg.png")}
      style={styles.screenWrapper}
      resizeMode="cover"
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.loginBox}>
        <View>
          <TouchableOpacity
            style={styles.signoutContainer}
            onPress={() => auth.signOut()}
          >
            <Text style={styles.signout}>Sign out</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Lost Item Listing</Text>
      </View>
      <View style={styles.form}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, width: "100%" }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.label}>Item Image</Text>

            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={pickImage}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.previewImage} />
              ) : (
                <Text style={styles.nextButtonText}>Upload Image</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                console.log("Moving to Step 2");
                // logic to navigate or change state to Step 2
              }}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>

            {/* Step Indicator */}
            <View style={styles.stepContainer}>
              <View style={styles.stepBubble}>
                <Text style={styles.stepText}>1</Text>
              </View>
              <View style={styles.stepLine} />
              <View style={styles.stepBubble}>
                <Text style={styles.stepText}>2</Text>
              </View>
              <View style={styles.stepLine} />
              <View style={[styles.stepBubble, styles.activeStep]}>
                <Text style={styles.activeStepText}>3</Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  // This is your white 80% wide box
  label: {
    alignSelf: "flex-start",
    marginLeft: "5%",
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
    marginBottom: -10,
    marginTop: 10,
  },
  dropdown: {
    height: 55,
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderColor: "#E8EAF6",
    borderWidth: 2,
    borderRadius: 15,
    marginVertical: 15,
    paddingHorizontal: 25,
    alignSelf: "center",
    // Adding shadow to match your textInput style
    shadowColor: "#9E9E9E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#C7C7CD",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#3C4858",
  },
  loginBox: {
    height: 180, // Giving it a fixed height instead of flex: 1
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingTop: 80,
    alignItems: "flex-start",
  },
  imagePickerButton: {
    width: "90%",
    height: 200,
    backgroundColor: "#E8EAF6",
    borderRadius: 15,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#419FDC",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  signoutContainer: {
    alignSelf: "flex-end",
  },
  signout: {
    color: "#419FDC",
    fontWeight: "700",
    fontSize: 14,
  },
  form: {
    flex: 2, // Taking up more space for the inputs
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  descriptionInput: {
    height: 150, // Much taller than the standard input
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderColor: "#E8EAF6",
    borderWidth: 2,
    borderRadius: 15,
    marginVertical: 15,
    paddingHorizontal: 25,
    paddingTop: 15, // Gives space at the top for multiline text
    fontSize: 16,
    color: "#3C4858",
    alignSelf: "center",
    shadowColor: "#9E9E9E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonContainer: {
    // 1. Change to row to align children horizontally
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",

    // 2. Space them out
    justifyContent: "space-between",
    alignItems: "center",
  },

  // 3. Style for the buttons inside the horizontal container
  actionButton: {
    flex: 1, // Make both buttons take up equal space
    height: 200,
    marginHorizontal: 5, // Add a little gap between the buttons
    backgroundColor: "#419FDC",
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  actionButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
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
    fontSize: 26,
    fontWeight: "800",
    color: "#419FDC",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "500",
    color: "#888888",
    alignSelf: "flex-start",
    marginTop: -40,
    paddingLeft: 20,
    marginBottom: 40,
  },
  mainText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2F2F2F",
    marginTop: 0,
    padding: 20,
    marginBottom: 40,
  },
  mainDescription: {
    fontSize: 22,
    fontWeight: "300",
    color: "#2F2F2F",
    textAlign: "center",
    marginTop: -50,
    padding: 20,
    marginBottom: 40,
  },
  textInput: {
    height: 55,
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderColor: "#E8EAF6",
    borderWidth: 2,
    borderRadius: 15,
    marginVertical: 15,
    paddingHorizontal: 25,
    fontSize: 16,
    color: "#3C4858",
    alignSelf: "center",
    shadowColor: "#9E9E9E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
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
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  stepBubble: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#E8EAF6", // Inactive color
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D1D1D1",
  },
  activeStep: {
    backgroundColor: "#419FDC", // Your brand blue
    borderColor: "#419FDC",
  },
  stepText: {
    color: "#888",
    fontWeight: "bold",
  },
  activeStepText: {
    color: "#FFF", // Make the text white for the active bubble
  },
  stepLine: {
    width: 30,
    height: 2,
    backgroundColor: "#E8EAF6",
    marginHorizontal: 5,
  },
  // Next Button Styles
  nextButton: {
    width: "90%",
    backgroundColor: "#419FDC",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 40, // Space at the bottom of scroll
    shadowColor: "#419FDC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
