import { SEND_MESSAGE, GET_CHATROOM, GET_CHATROOMS,GET_CHATROOMS_ERR, CLEAR_CURRENT_CHATROOM_STATE, ADD_PROFILES, NEW_CHATROOM } from "../actions/ChatActions";
import { CHATROOMS } from "../../assets/js/chatRoomDummy";
import * as SecureStore from "expo-secure-store";


const initialState = {
  chatrooms: [],
  currentChat: {},
  profileList: [],
  chatroomErr: ""
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        currentChat: { ...state.currentChat, chatmessages: [...state.currentChat.chatmessages, action.payload.message] },
        chatrooms: [action.payload.chatroom, ...state.chatrooms.filter(chatroom => chatroom.id != action.payload.chatroom.id)]
      };
    case GET_CHATROOM:
      return { ...state, currentChat: {...action.payload.currentChatroom, chatmessages: action.payload.messages} };
    
    case GET_CHATROOMS:
      return { ...state, chatrooms: action.payload };
    
    case GET_CHATROOMS_ERR:
      return { ...state, chatroomErr: action.payload };
    
    case CLEAR_CURRENT_CHATROOM_STATE:
      console.log("CLEARED CURRENT CHAT STATE")
      return { ...state, currentChat: {} };
    
    case ADD_PROFILES:
      console.log("add profilelist")
      return { ...state, profileList: action.payload };
    
    case NEW_CHATROOM:
      console.log("add Chatroom")
      return { ...state, chatrooms: [action.payload, ...state.chatrooms] };

    default:
      return state;
  }
};

export default profileReducer;
