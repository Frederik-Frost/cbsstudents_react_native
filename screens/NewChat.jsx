import { View, Image, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStyles } from "../style";
const NewChat = ({ navigation }) => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile.profiles);

    useEffect(() => {
        console.log("Mounted")  
    }, [])


    
  //   const renderItem = ({ item }) => (
  //     <TouchableOpacity style={styles.chat} onPress={() => navigation.navigate("ChatRoom", item)}>
  //       <Image
  //         style={styles.chatImg}
  //         source={item.imageUrl || require("../assets/img/icon_profile.png")}
  //       />
  //       <View style={styles.chatTexts}>
  //         <Text style={styles.title}>{item.title}</Text>
  //         <Text style={styles.chatPreview}>{item.title}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  return (
    <View>
      <Text> Create a new chat</Text>
      {/* <FlatList data={chats} renderItem={renderItem} keyExtractor={(item, index) => index} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  chat: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  chatImg: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#fff",
    marginHorizontal: 12,
  },
  chatTexts: {},
  title: {
    fontFamily: "OpenSans_700Bold",
    color: "#333333",
    fontSize: 16,
    lineHeight: 28,
  },
  chatPreview: {
    fontFamily: "OpenSans_400Regular",
    color: "#333333",
    fontSize: 14,
  },
});
export default NewChat;
