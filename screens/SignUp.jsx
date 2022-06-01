import { StyleSheet, Text, View, Button, FlatList, TextInput, Image, TouchableOpacity } from "react-native";
import { AppStyles } from "../style";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../store/actions/ProfileActions";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import InputGroup from "../components/InputGroup";

const SignUp = ({ navigation }) => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isSelected, setSelection] = useState(false);
  const state = useSelector((state) => state);
  const signupErr = useSelector((state) => state.profile.signUpErr);
  const signupInfo = useSelector((state) => state.profile.signupInfo);
  const [errorMsg, setErrMsg] = useState(signupErr);

  const handleSignup = () => {
    if (password == repeatPassword) {
      dispatch(signUpUser(email, password));
    }
  };

  useEffect(() => {
    if (signupInfo) {
      navigation.navigate("SignIn");
    }
    if (signupErr && signupErr.length > 0) {
      () => {
        setErrMsg(signupErr);
      };
    }
  });

  const inputFields = [
    {
      value: email,
      onChange: setEmail,
      autoComplete: "email",
      placeholder: "Enter email",
      label: "E-mail",
      secureTextEntry: false,
    },
    {
      value: password,
      onChange: setPassword,
      autoComplete: "password-new",
      placeholder: "Enter password",
      label: "Password",
      secureTextEntry: true,
    },
    {
      value: repeatPassword,
      onChange: setRepeatPassword,
      autoComplete: "password-new",
      placeholder: "Repeat password",
      label: "Repeat password",
      secureTextEntry: true,
    },
  ];

  return (
    <View style={AppStyles.unregisteredContainer}>
      <Image style={AppStyles.loginImg} source={require("../assets/img/cbslogo.png")} />
      <Text style={[AppStyles.tekoTitle, styles.title]}>Sign up to get access</Text>
      <InputGroup data={inputFields} err={signupErr} />
      <View style={styles.checkboxContainer}>
        <BouncyCheckbox
          value={isSelected}
          onPress={() => setSelection((prevSelection) => !prevSelection)}
          style={styles.checkbox}
          fillColor="#32305D"
        />
        <Text style={styles.label}>I agree to the terms and conditions</Text>
      </View>
      <TouchableOpacity
        style={[isSelected ? AppStyles.mainBtn : AppStyles.mainBtnDisabled]}
        disabled={!isSelected && password == repeatPassword ? true : false}
        onPress={() => handleSignup()}
      >
        <Text style={AppStyles.mainBtnText}>Get access</Text>
      </TouchableOpacity>
      <View style={styles.bottomLink}>
        <Text onPress={() => navigation.navigate("SignIn")}>Already have a user? Log in</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 28,
    marginBottom: 16,
  },
  checkboxContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 24,
  },
  checkbox: {
    // marginRight: 40
    // width: 20,
    // height: 20,
    // borderRadius: 6,
  },
  bottomLink: {
    marginTop: 24,
  },
});

export default SignUp;
