import { router, Stack } from "expo-router";
import { getAuth } from "firebase/auth";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
        <View style={styles.header}>
          <View style={styles.col1}>
            <Text style={styles.title}>Hi, Reinaldo</Text>
            <Text style={styles.subtitle}>1035887</Text>
          </View>

          <View style={styles.col2}>
            <TouchableOpacity style={styles.headerButton} onPress={() => router.push("/two")}>
              <Image
                source={require("../../assets/images/sort.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.headerButton} onPress={() => router.push("/two")}>
              <Image
                source={require("../../assets/images/gear.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.mainText}>Welcome to Returnly</Text>
        <Text style={styles.mainDescription}>
          We keep your belongings safe by keeping them private. Instead of a
          public gallery of lost items, Returnly works behind the scenes to
          match your specific description with found reports, ensuring items
          only go back to their rightful owners.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/two")}>
          <Image
            source={require("../../assets/images/laptop.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.actionButtonText}>I Have Lost Something</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#54C47B" }]}
          onPress={() => router.push("/two")}
        >
          <Image
            source={require("../../assets/images/phone.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.actionButtonText}>I Have Found Something</Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    // Add horizontal padding so nothing touches the absolute edges
    paddingHorizontal: 20, 
    marginBottom: 20,
  },
  col1: {
    flex: 2, // Takes up more space for the name
    justifyContent: "center",
  },
  col2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // This ensures the group of buttons stays away from the right edge
  },
  headerButton: {
    width: 45,
    height: 45,
    // This creates the gap BETWEEN the two buttons
    marginLeft: 12, 
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
    fontSize: 24,
    fontWeight: "800",
    color: "#2F2F2F",
    marginBottom: 0, // Reset these for tighter alignment
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#888888",
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
  image: {
    width: 20, // Adjust width as needed
    height: 20, // Adjust height as needed
    tintColor: "#419FDC",
    // If your logo has a specific brand color,
    // you can use tintColor to force it to match your Indigo theme:
    // tintColor: '#1A237E',
  },
});
