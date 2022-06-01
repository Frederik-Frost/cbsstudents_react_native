import { StyleSheet, Text, View, Button, FlatList, TextInput, Image, Modal } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { endSignupFlow } from "../store/actions/ProfileActions";
import { TouchableOpacity } from "react-native";
import { AppStyles } from "../style";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <View style={AppStyles.unregisteredContainer}>
      <Image style={styles.img} source={require("../assets/img/icon_notifications.png")} />

      <Text style={[AppStyles.tekoTitle, styles.textCenter]}> Stay in the loop</Text>
      <Text style={[AppStyles.infoTextMedium, styles.textCenter]}>
        Enable notifications to stay updated on new messages and more.
      </Text>
      <TouchableOpacity style={[AppStyles.mainBtn, styles.mainBtn]} onPress={() => dispatch(endSignupFlow(true))}>
        <Text style={[AppStyles.mainBtnText, styles.textCenter]}>Turn on notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[AppStyles.mainBtn, styles.secondaryBtn]} onPress={() => dispatch(endSignupFlow(false))}>
        <Text style={[AppStyles.mainBtnText, styles.textCenter, styles.textDark]}>Maybe later</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    marginTop: 100,
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  mainBtn: {
    marginTop: 20,
  },
  secondaryBtn: {
    marginTop: 20,
    backgroundColor: "#fafafa",
  },
  textDark: {
    color: "#333333",
  },
  textCenter: {
    textAlign: "center",
  },
});

export default SignUp;
