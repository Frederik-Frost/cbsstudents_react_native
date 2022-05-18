import { StyleSheet, View, Image, TextInput, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect, useRef, componentWillUnmount } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { sendMessage, getChatroom } from "../store/actions/ChatActions";

const ChatRoom = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.userInfo);
  const [message, setMessage] = useState("");
  const chatroom = route.params.chatroom;
  const flatListRef = useRef();
  const currentChat = useSelector((state) => state.chat.currentChat);
  // const chatmessages = useSelector((state) => state.chat.currentChat.chatmessages)
  console.log("CHAATROOM:::::::::: ",chatroom)
  // console.log("CURRENT CHAT ", currentChat);
  // console.log("CURRENT CHAT ", currentChat.chatmessages);
  
  const handleSendMessage = () => {
    dispatch(sendMessage(message, chatroom));
    setMessage("");
    handleScrollToBottom();
  };
  const handleScrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current.scrollToEnd({ animated: true });
    }, 200);
  };
  useEffect(() => {
    navigation.setOptions({
      title: route.params.chatroomName,
    });
    dispatch(getChatroom(chatroom));
    handleScrollToBottom();
  }, []);

  const renderItem = ({ item }) => (
    <View style={user.localId == item.userId ? styles.sent : styles.received}>
      {user.localId != item.userId && (
        <Image style={styles.chatImgSmall} source={item.imageUrl || require("../assets/img/icon_profile.png")} />
      )}
      <View style={[styles.textWrapper, user.localId == item.userId ? styles.sentWrapper : styles.receivedWrapper]}>
        <Text style={[styles.message, user.localId == item.userId ? styles.sentText : styles.receivedText]}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={currentChat.chatmessages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        ref={flatListRef}
      />
      <View style={styles.writeMessageWrapper}>
        <Image style={styles.chatImgSmall} source={require("../assets/img/icon_profile.png")} />
        <TextInput
          style={styles.messageInput}
          placeholder="Write message.."
          value={message}
          onChangeText={setMessage}
          multiline={true}
        />
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => {
            handleSendMessage();
          }}
        >
          <Ionicons name="paper-plane-outline" size={30} color={"#fff"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  received: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  sent: {
    flexDirection: "row-reverse",
  },
  receivedText: {
    color: "#333333",
  },
  sentText: {
    color: "#fff",
    alignSelf: "flex-end",
  },
  sentWrapper: {
    backgroundColor: "#5050A5",
    borderBottomRightRadius: 4,
  },
  receivedWrapper: {
    borderBottomLeftRadius: 4,
    backgroundColor: "#EEEEEE",
  },
  textWrapper: {
    borderRadius: 12,
    padding: 12,
    margin: 12,
    marginBottom: 0,
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  chatImgSmall: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 1,
    marginLeft: 8,
    borderColor: "#eee",
  },
  sendBtn: {
    backgroundColor: "#5050A5",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    borderRadius: 8,
  },
  writeMessageWrapper: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    justifyContent: "space-between",
    borderTopColor: "#eee",
    borderTopWidth: 1,
  },
  messageInput: {
    marginHorizontal: 12,
    backgroundColor: "#eee",
    flexGrow: 1,
    borderRadius: 8,
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 12,
    width: 200,
  },
});
export default ChatRoom;
