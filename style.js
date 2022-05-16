import { StyleSheet } from "react-native";
import { useFonts, OpenSans_400Regular, OpenSans_700Bold } from "@expo-google-fonts/open-sans";
import { Teko_500Medium } from "@expo-google-fonts/teko";

export const AppStyles = StyleSheet.create({
  text: {
    fontFamily: "Teko_500Medium",
    textTransform: "capitalize",
  },
  tekoTitle: {
    fontFamily: "Teko_500Medium",
    textTransform: "uppercase",
    color: "#32305D",
    fontSize: 26,
    marginBottom: 8,
  },
  tekoTitleMedium: {
    fontFamily: "Teko_500Medium",
    textTransform: "uppercase",
    fontSize: 18,
    color: "#32305D",
  },
  tekoTitleSmall: {
    fontFamily: "Teko_500Medium",
    textTransform: "uppercase",
    color: "#32305D",
    fontSize: 14,
  },
  smallTitle: {
    fontFamily: "OpenSans_700Bold",
    textTransform: "uppercase",
    color: "#333333",
    fontSize: 16,
    lineHeight: 28,
  },
  inputText: {
    fontFamily: "OpenSans_400Regular",
    color: "#32305D",
    fontSize: 12,
    lineHeight: 22,
  },
  inputLabel:{
    fontFamily: "OpenSans_700Bold",
    textTransform: "uppercase",
    color: "#32305D",
    fontSize: 12,
    lineHeight: 28,
  },
  infoText: {
    fontFamily: "OpenSans_400Regular",
    color: "#707070",
    fontSize: 12,
    lineHeight: 17,
  },
  infoTextMedium: {
    fontFamily: "OpenSans_400Regular",
    color: "#707070",
    fontSize: 16,
    lineHeight: 27,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  loginImg: {
    marginTop: 40
  },
  standardContainer:{
    padding: 24
  },
  unregisteredContainer:{
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 48,
    paddingHorizontal: 24
  },
  inputGroupWrapper:{
    flexGrow: 0,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.46,
    elevation: 2,
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  inputGroup:{
    padding: 6,
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    paddingBottom: 12

  },

  mainBtn: {
    backgroundColor: "#5050A5",
    alignSelf: "center",
    padding: 18,
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
  mainBtnDisabled:{
    backgroundColor: "#5050A5",
    alignSelf: "center",
    padding: 18,
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
    opacity: 0.4
  },
  mainBtnText: {
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
    color: "#FFF",
  },
  modalView: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#0000003d",
  },
  modalContainer: {
    flex: 1,
    alignSelf: "stretch",
    marginVertical: 80,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white'
  },
  modalHeader: {
    // padding: 8,
    paddingTop: 10,
    backgroundColor: "#fafafa",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 5.46,
    elevation: 4
  }



});
