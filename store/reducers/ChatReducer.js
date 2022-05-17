import { } from "../actions/ChatActions";
import { CHATROOMS } from "../../assets/js/chatRoomDummy"
import * as SecureStore from 'expo-secure-store';
let storage = SecureStore;

const initialState = {
    chatrooms: CHATROOMS
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    
    default:
      return state;
  }
};

export default profileReducer;
