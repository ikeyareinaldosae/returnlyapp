import { router, Stack } from "expo-router";
import { getAuth } from "firebase/auth";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { auth } from "../../FirebaseConfig";

export default function TabOneScreen() {
  getAuth().onAuthStateChanged((user) => {
    if (!user) router.replace("/");
  });

  return (
    <ImageBackground
      source={require("../../assets/images/returnly_bg.png")}
      style={styles.screenWrapper}
      resizeMode="cover"
    >
      <Stack.Screen options={{ headerShown: false }} />
      {/* <View style={styles.container}>
        <Text style={styles.title}>Sign Out</Text>
        <TouchableOpacity style={styles.button} onPress={() => auth.signOut()}>
          <Text style={styles.text}>Sign Out</Text>
        </TouchableOpacity>
      </View> */}
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

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center", // Vertical center
    alignItems: "center", // Horizontal center
  },
  // This is your white 80% wide box
  loginBox: {
    flex: 1,
    width: "100%", // Adjusted to 85% for better breathing room
    paddingVertical: 40, // Box grows based on content
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingTop: 100,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  signoutContainer: {
    position: "absolute",
    top: -40,
    left: 100,
  },
  signout: {
    color: "#419FDC",
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
  },
  form: {
    flex: 1,
    width: "100%", // Adjusted to 85% for better breathing room
    paddingVertical: 40, // Box grows based on content
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingTop: 100,
    alignItems: "center",
    justifyContent: "flex-start",
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
    fontSize: 22,
    fontWeight: "800",
    color: "#419FDC",
    alignSelf: "flex-start",
    marginTop: 0,
    paddingLeft: 20,
    marginBottom: 40,
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
