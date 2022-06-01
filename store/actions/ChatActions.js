export const SEND_MESSAGE = "SEND_MESSAGE";
export const CLEAR_CURRENT_CHATROOM_STATE = "CLEAR_CURRENT_CHATROOM_STATE";
export const ADD_PROFILES = "ADD_PROFILES";
export const NEW_CHATROOM = "NEW_CHATROOM";
export const GET_CHATROOM = "GET_CHATROOM";
export const GET_CHATROOMS = "GET_CHATROOMS";
export const GET_CHATROOMS_ERR = "GET_CHATROOMS_ERR";

import { Chatmessage, Chatroom } from "../../assets/js/chatRoom";

export const sendMessage = (text, chatroom) => {
  return async (dispatch, getState) => {
    const userInfo = getState().profile.userInfo;
    const timestamp = new Date().toLocaleString();
    const message = new Chatmessage(text, timestamp, userInfo.localId);
    const response = await fetch(
      `https://kea-react-native-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatroom.key}/chatmessages.json?auth=${userInfo.idToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      },
    );
    const data = await response.json();
    let processedMessages = [];
    for (const key in chatroom.chatmessages) {
      processedMessages.push(chatroom.chatmessages[key]);
    }
    processedMessages.push(message);
    const updatedChatroom = { ...chatroom, chatmessages: processedMessages };
    dispatch({ type: SEND_MESSAGE, payload: { chatroom: updatedChatroom, message: message } });
  };
};
export const getChatroom = (chatroom) => {
  return async (dispatch, getState) => {
    const chatrooms = getState().chat.chatrooms;
    const currentChatroom = chatrooms.find((chat) => chat.id == chatroom.id);
    let processedChatroom = [];
    for (const key in currentChatroom.chatmessages) {
      processedChatroom.push(currentChatroom.chatmessages[key]);
    }
    dispatch({ type: GET_CHATROOM, payload: { messages: processedChatroom, currentChatroom: currentChatroom } });
  };
};
export const clearCurrentChatroomState = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_CURRENT_CHATROOM_STATE });
  };
};

export const getProfiles = () => {
  return async (dispatch, getState) => {
    const profileState = getState().profile;
    const idToken = profileState.userInfo.idToken;
    const localId = profileState.userInfo.localId;
    const response = await fetch(
      `https://kea-react-native-default-rtdb.europe-west1.firebasedatabase.app/profiles.json?auth=${idToken}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    let profiles = [];
    for (const key in data) {
      profiles.push(data[key]);
    }
    //Exclude self
    dispatch({ type: ADD_PROFILES, payload: profiles.filter((profile) => profile.userId != localId) });
  };
};

export const newChatroom = (chatroomData) => {
  return async (dispatch, getState) => {
    const idToken = getState().profile.userInfo.idToken;
    const localId = getState().profile.userInfo.localId;
    let newChatroom = new Chatroom(null, [], "", [chatroomData.userId, localId]);
    const response = await fetch(
      `https://kea-react-native-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=${idToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChatroom),
      },
    );
    const data = await response.json();
    newChatroom.key = data.name
    dispatch({ type: NEW_CHATROOM, payload: newChatroom });
  };
};
export const getChatrooms = () => {
  return async (dispatch, getState) => {
    const idToken = getState().profile.userInfo.idToken;
    const response = await fetch(
      `https://kea-react-native-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=${idToken}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    let chatrooms = [];
    for (const key in data) {
      chatrooms.push(
        new Chatroom(
          data[key].title || "",
          data[key].chatmessages || [],
          data[key].imageUrl || "",
          data[key].members || [],
          key,
        ),
      );
    }
    if (!response.ok) {
      dispatch({ type: GET_CHATROOMS_ERR, payload: data.error });
    } else {
      dispatch({ type: GET_CHATROOMS, payload: {chatrooms: chatrooms, userId: getState().profile.profileInfo.userId} });
    }
  };
};
