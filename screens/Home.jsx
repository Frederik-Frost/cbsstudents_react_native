import { View, Text, StyleSheet } from "react-native";
import { AppStyles } from "../style";


const Home = ( ) => {
  return (
    <View style={styles.empty}>
      <Text style={AppStyles.text}>Welcome to Home screen please go to Chat or Menu</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center"
  }
})
export default Home;
