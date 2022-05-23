import { View, Image, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStyles } from "../style";
import { clearCurrentChatroomState, getProfiles, newChatroom, getChatrooms } from "../store/actions/ChatActions";
import CreateChatModal from "./../components/CreateChatModal";
import Ionicons from "react-native-vector-icons/Ionicons";

const Chat = ({ navigation }) => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chatrooms);
  const profileList = useSelector((state) => state.chat.profileList);
  const profile = useSelector((state) => state.profile.profileInfo);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(clearCurrentChatroomState());
    dispatch(getChatrooms());
    dispatch(getProfiles());
  }, []);
  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const onCreateNewChat = (chatData) => {
    setModalVisible(false);
    dispatch(newChatroom(chatData));
  };
  const findName = (chatroom) => {
    const chatReceiverId = chatroom.members.find((id) => id != profile.userId) || "";
    const chatReceiver = profileList.find((profile) => profile.userId == chatReceiverId);
    return chatReceiver ? chatReceiver.name : chatroom.title;
  };
  const findPreviewChat = (item) => {
    if(item && Object.keys(item.chatmessages).length != 0 ){
      const messageKeys = Object.keys(item.chatmessages);
      return item.chatmessages[messageKeys[messageKeys.length - 1]].text || "";
    } else return "Start a conversation..."
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chat} onPress={() => navigation.navigate("ChatRoom", {chatroom: item, chatroomName: findName(item)})}>
      <Image style={styles.chatImg} source={item.imageUrl || require("../assets/img/icon_profile.png")} />
      <View style={styles.chatTexts}>
        <Text style={styles.title}>{findName(item)}</Text>
        <Text style={styles.chatPreview}>{findPreviewChat(item)}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <CreateChatModal
        showModal={modalVisible}
        handleHideModal={() => {
          setModalVisible(false);
        }}
        listData={profileList}
        createChat={(item) => onCreateNewChat(item)}
      />
      <FlatList data={chats} renderItem={renderItem} keyExtractor={(item, index) => index} />
      <View style={styles.newChatBtnWrapper}>
        <TouchableOpacity
          onPress={() => {
            handleOpenModal();
          }}
          style={styles.newChatBtn}
        >
          <Ionicons style={styles.btnIcon} name="create-outline" size={30} color="blue" />
        </TouchableOpacity>
      </View>
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
  newChatBtnWrapper: {
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 12,
  },
  btnIcon: {
    justifyContent: "center",
    alignSelf: "center",
    width: 30,
    height: 30,
  },
  container: {
    flex: 1,
  },
});
export default Chat;
