import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useState } from "react";
import { updateProfileInfo } from "../store/actions/ProfileActions";
import ProgrammeModal from "../components/ProgrammeModal";
import { useDispatch, useSelector } from "react-redux";
import { AppStyles } from "../style";

const EditProfileScreen = () => {
  const dispatch = useDispatch()
  const profileState = useSelector((state) => state.profile);
  const [name, setName] = useState(profileState.profileInfo.name);
  const [programme, setProgramme] = useState(profileState.profileInfo.programme);
  const [modalVisible, setModalVisible] = useState(false);
  const updateProgramme = (programme) => {
    setProgramme(programme)
  }
  return (
    <View>
      <ProgrammeModal
        showModal={modalVisible}
        handleHideModal={() => {setModalVisible(false)}}
        handleSetProgramme={updateProgramme}
      />
      <View style={styles.topContainer}>
        <View style={styles.topActions}>
          <Text style={AppStyles.tekoTitleMedium}>PROFILE PICTURE</Text>
          <TouchableOpacity style={styles.imageBtn}>
            <Text style={styles.imageBtnText}>Upload</Text>
          </TouchableOpacity>
        </View>
        <Image
          style={[AppStyles.profileImg, AppStyles.imageBorder, AppStyles.imgBackground]}
          source={require("../assets/img/icon_profile.png")}
        />
      </View>

      <View style={AppStyles.standardContainer}>
        <View style={styles.infoContainer}>
          <Text style={AppStyles.tekoTitleSmall}>What is your name?</Text>
          <TextInput
            style={[AppStyles.infoTextMedium]}
            placeholder="First name and last name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <TouchableOpacity style={styles.infoContainer} onPress={() => setModalVisible(true)}>
          <Text style={AppStyles.tekoTitleSmall}>Study programme</Text>
          <Text style={AppStyles.infoTextMedium}>{programme.name || "Select from list"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveChanges} onPress={() => dispatch(updateProfileInfo(name, programme))}>
          <Text style={styles.saveChangesText}>Save changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 24,
    marginBottom: 48,
  },
  topActions: {
    // justifyContent: "end",
  },
 
  imageBtn: {
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: 5,
    marginTop: 12,
    marginBottom: 18,
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
  imageBtnText: {
    alignSelf: "center",
    padding: 8,
    paddingHorizontal: 50,
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
    color: "#fff",
  },
  infoContainer: {
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5.46,
    elevation: 4,
    justifyContent: "space-between",
  },
  saveChanges: {
    marginTop: 18,
    marginBottom: 18,
    backgroundColor: "#5050A5",
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
  saveChangesText: {
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
    color: "#FFF",
  },
});

export default EditProfileScreen;
