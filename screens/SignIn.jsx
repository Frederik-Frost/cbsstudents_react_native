import { StyleSheet, Text, View, Button, FlatList, TextInput, Image } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, signUpUser, test } from "../store/actions/ProfileActions";
import { TouchableOpacity } from "react-native";
import { AppStyles } from "../style";
import InputGroup from "../components/InputGroup";


const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signUpFlow = useSelector((state) => state.profile.signUpFlow);



  useEffect(() => {

    // dispatch(test())


    // if(signUpFlow == true){
    //   console.log("navigate ")
    //   navigation.navigate("BeforeStart")
    // }
  })
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
  ];
  // const signInInfo = useSelector((state) => state.chat.userInfo);

  return (
    <View style={AppStyles.unregisteredContainer}>
      <Image style={AppStyles.loginImg} source={require("../assets/img/cbslogo.png")} />
      
      <Text style={[AppStyles.tekoTitle, styles.title]}>Log in</Text>

      <InputGroup data={inputFields} style={styles.inputGroup}/>
  
      <Text style={styles.bottomLink} onPress={() => navigation.navigate("SignUp")}>
        Forgot your password? Sur røv
      </Text>

      <TouchableOpacity style={[AppStyles.mainBtn, styles.mainBtn]} onPress={() => dispatch(signInUser(email, password))}>
        <Text style={AppStyles.mainBtnText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.bottomLink} onPress={() => navigation.navigate("SignUp")}>
        Dont have an account? Sign up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 28,
    marginBottom: 16
  },
  bottomLink: {
    marginTop: 24,
  },
  mainBtn: {
    marginTop: 24
  }
});

export default SignUp;
