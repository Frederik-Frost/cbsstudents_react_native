import { View, TextInput, Text } from "react-native";
import { useState } from "react";
import { AppStyles } from "../style";
import { useDispatch, useSelector } from "react-redux";
import { test } from "../store/actions/ProfileActions";
// import {
//   useFonts,
//   OpenSans_400Regular,
//   OpenSans_700Bold
// } from "@expo-google-fonts/open-sans";
// import {
//   Teko_500Medium
// } from "@expo-google-fonts/teko";

const Home = ( props ) => {
  const dispatch = useDispatch();

  // dispatch(test())
  // let [fontsLoaded] = useFonts({
  //   OpenSans_400Regular,
  //   OpenSans_700Bold,
  //   Teko_500Medium
  // });
  
  return (
    <View>
      <Text style={AppStyles.text}>Welcome to Home screen</Text>
    </View>
  );
};

export default Home;
