import { View, StyleSheet, Text } from "react-native";
import { AppStyles } from "../style";
const Discover = () => {
  return (
    <View style={styles.empty}>
      <Text style={AppStyles.text} >Welcome to Discover screen. Please go to Chat or Menu</Text>
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
export default Discover;
