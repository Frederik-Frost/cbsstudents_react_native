import { View, TextInput, Text, Button, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { AppStyles } from "../style";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../store/actions/ProfileActions";
import Toggle from "./../components/Toggle";

const Menu = ({ navigation }) => {
  
  const profileState = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  


  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <View style={styles.profileInfo}>
          <Image
            style={AppStyles.profileImg}
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
          <View style={styles.student}>
            <Text style={styles.name}>{profileState.profileInfo.name}</Text>
            <Text style={styles.additionalInfo}>{profileState.userInfo.email}</Text>
            <Text style={styles.additionalInfo}>{profileState.profileInfo.programme.name}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editProfileBtn} onPress={() => navigation.navigate("EditProfileScreen")}>
          <Text style={styles.editProfileBtnText}>Edit profile</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.notificationSettings, styles.subContainer]}>
        <Text style={AppStyles.tekoTitle}>Notifications</Text>
        <Toggle title="Chat" infoText="When you recieve a new message" model={profileState.profileInfo.notifications} />
        <Toggle title="Event reminder" infoText="An hour before events you are 'going to'" />
      </View>
      <View>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => dispatch(signOut())}>
          <Text style={styles.logoutBtnText}>Log out</Text>
        </TouchableOpacity>

        <Text style={[AppStyles.infoText, styles.copyright]}>Student life v1.03 Copyright © CBS Students 2020</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  editProfileBtn: {
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: 5,
    marginTop: 12,
    backgroundColor: "#5050A5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 5.46,
    elevation: 4,
  },
  editProfileBtnText: {
    alignSelf: "center",
    padding: 8,
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
    color: "#fff",
  },
  student: {
    marginLeft: 20,
    flexDirection: "column",
    flex: 1,
  },
  name: {
    fontFamily: "Teko_500Medium",
    paddingTop: 3,
    fontSize: 26,
    lineHeight: 26,
    color: "#32305D",
  },
  additionalInfo: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 12,
    lineHeight: 17,
    color: "#333333",
  },
  subContainer: {
    paddingBottom: 36,
    borderBottomWidth: 1,
    borderColor: "#B7B7B7",
  },
  profileInfo: {
    margin: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 0,
  },

  mainContainer: {
    padding: 24,
  },
  notificationSettings: {
    marginTop: 48,
  },
  logoutBtn: {
    marginTop: 48,
    marginBottom: 48,
    backgroundColor: "#fff",
    alignSelf: "center",
    padding: 24,
    alignSelf: "stretch",
    borderRadius: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 5.46,
    elevation: 4,
  },
  logoutBtnText: {
    textTransform: "uppercase",
    fontSize: 26,
    fontFamily: "Teko_500Medium",
    color: "#32305D",
    alignSelf: "center",
  },
  copyright: {
    alignSelf: "center",
    textAlign: "center",
    width: 175,
    marginBottom: 48,
  },
});

export default Menu;
