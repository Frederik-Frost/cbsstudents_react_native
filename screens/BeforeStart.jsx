import { StyleSheet, Text, View, Button, FlatList, TextInput, Image, Modal } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "../store/actions/ProfileActions";
import { TouchableOpacity } from "react-native";
import { AppStyles } from "../style";
import InputGroup from "../components/InputGroup";
import NestedList from "../components/NestedList";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [programme, setProgramme] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const programmes = require("../assets/js/programmes.json")
  const toNotifications = useSelector((state) => state.profile.toNotifications);

  useEffect(() => {
    if(toNotifications == true){
      navigation.navigate("NotificationsScreen")
    }
  })
  const handleSelectProgramme = (programme) => {
    setProgramme(programme)
    setModalVisible(false)
}
  return (
    <View style={AppStyles.unregisteredContainer}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        presentationStyle='formSheet'
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={AppStyles.modalView}>
          <View style={AppStyles.modalContainer}>
            <View style={AppStyles.modalHeader}>
              <Text style={AppStyles.tekoTitle}>Study programme</Text>
            </View>
          
          <NestedList data={programmes}  onSelect={handleSelectProgramme}/>


          <Text>Oh hello</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text>Close</Text>
            
          </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <Image  source={require("../assets/img/cbslogo.png")} />
      <Text style={[AppStyles.tekoTitle, styles.title]}>Before we start...</Text>

      <View style={styles.topContainer}>
        <View style={styles.topActions}>
          <Text style={AppStyles.tekoTitleSmall}>PROFILE PICTURE</Text>
          <TouchableOpacity style={styles.imageBtn}>
            <Text style={styles.imageBtnText}>Upload</Text>
          </TouchableOpacity>
        </View>
        <Image style={[AppStyles.profileImg, AppStyles.imageBorder]} source={require("../assets/img/icon_profile.png")} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={AppStyles.tekoTitleSmall}>What is your name?</Text>
        <TextInput
          style={[ AppStyles.infoTextMedium]}
          placeholder="First name and last name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <TouchableOpacity style={styles.infoContainer} onPress={() => setModalVisible(true)}>
          <Text style={AppStyles.tekoTitleSmall}>Study programme</Text>
          <Text style={AppStyles.infoTextMedium}>{programme.name || "Select from list"}</Text>
        </TouchableOpacity>

      <TouchableOpacity
        style={[AppStyles.mainBtn, styles.mainBtn]}
        onPress={() => dispatch(setProfileData(name, programme))}
      >
        <Text style={AppStyles.mainBtnText}>Next</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 28,
    marginBottom: 16,
  },
  bottomLink: {
    marginTop: 24,
  },
  mainBtn: {
    marginTop: 24,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    // padding: 24,
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
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
    color: "#fff",
  },
  infoContainer: {
    alignSelf: "stretch",
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
  }
});

export default SignUp;
