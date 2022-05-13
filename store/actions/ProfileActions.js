export const SIGNUP = "SIGNUP";
export const SIGNUP_ERR = "SIGNUP_ERR";
export const SIGNIN = "SIGNIN";
export const SIGNIN_ERR = "SIGNIN_ERR";
export const SIGNOUT = "SIGNOUT";
export const TO_SIGNUP_FLOW = "TO_SIGNUP_FLOW";
export const ADD_PROFILE_DATA = "ADD_PROFILE_DATA";
export const END_SIGNUP_FLOW = "END_SIGNUP_FLOW";
export const UPDATE_PROFILE_INFO = "UPDATE_PROFILE_INFO";


export const signUpUser = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKBvTPgHF_LfSxc82tHkgYauH9_s_uYco",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );
    const data = await response.json();
    dispatch(!response.ok ? { type: SIGNUP_ERR, payload: data.error.message } : { type: SIGNUP, payload: data });
  };
};

export const signInUser = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKBvTPgHF_LfSxc82tHkgYauH9_s_uYco",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      dispatch({ type: SIGNIN_ERR, payload: data.error.message });
    } else {
      dispatch({ type: SIGNIN, payload: data });
      dispatch(getProfileData(data));
    }
  };
};

export const getProfileData = (userData) => {
  const idToken = userData.idToken;
  return async (dispatch) => {
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
    let profileData;
    let profileId;
    for (const key in data) {
      if (userData.localId == data[key].userId) {
        profileId = key;
        profileData = data[key];
      }
    }

    if (!response.ok) {
      dispatch({ type: SIGNIN_ERR, payload: data.error.message });
    } else if (profileId == null || !profileId || profileId == undefined) {
      console.log("no data, go to signup flow");
      dispatch({ type: TO_SIGNUP_FLOW, payload: userData });
    } else {
      dispatch({ type: ADD_PROFILE_DATA, payload: { profileId: profileId, profileData: profileData } });
    }
  };
};
export const setProfileData = (name, programme) => {
  return async (dispatch, getState) => {
    const userInfo = getState().profile.userInfo;
    const profileData = {
      name: name,
      programme: programme,
      userId: userInfo.localId,
    };
    const response = await fetch(
      `https://kea-react-native-default-rtdb.europe-west1.firebasedatabase.app/profiles.json?auth=${userInfo.idToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      },
    );
    const data = await response.json();
    console.log("DATA NAME:::::", data.name)
    if (!response.ok) {
      dispatch({ type: ADD_PROFILE_DATA_ERR, payload: data.error.message });
    } else {
      dispatch({ type: ADD_PROFILE_DATA, payload: { profileId: data.name, profileData: profileData } });
    }
  };
};

export const endSignupFlow = (notifications) => {
  return async (dispatch, getState) => {
    const profileState = getState().profile;
    const idToken = profileState.userInfo.idToken;
    let profileInfo = profileState.profileInfo;
    const profileId = profileState.profileId;
    profileInfo.chatNotifications = notifications;
    profileInfo.eventNotifications = notifications;
    const response = await fetch(
      `https://kea-react-native-default-rtdb.europe-west1.firebasedatabase.app/profiles/${profileId}.json?auth=${idToken}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileInfo),
      },
    );
    const data = await response.json();
    dispatch({ type: END_SIGNUP_FLOW, payload: { profileId: data.name, profileData: profileInfo } });
  };
};

export const updateProfileInfo = (name, programme) => {
  return async (dispatch, getState) => {
    const profileState = getState().profile;
    const idToken = profileState.userInfo.idToken;
    const profileId = profileState.profileId;
    
    let profileInfo = profileState.profileInfo;
    profileInfo.name = name
    profileInfo.programme = programme


    const response = await fetch(
      `https://kea-react-native-default-rtdb.europe-west1.firebasedatabase.app/profiles/${profileId}.json?auth=${idToken}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileInfo),
      },
    );
    const data = await response.json();
    console.log("DATA::: ",data)
    dispatch({ type: UPDATE_PROFILE_INFO, payload: { profileData: data } });
  };
};

export const signOut = () => {
  return (dispatch) => {
    // localStorage.setItem("userInfo", null);
    // localStorage.setItem("profileInfo", null);
    dispatch({ type: SIGNOUT });
  };
};
// export const addChatRoom = (chatroomName) => {
//   return async (dispatch, getState) => {
//     const idToken = getState().chat.userInfo.idToken
//     const response = await fetch(
//       `https://kea-react-native-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=${idToken}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title: chatroomName
//         }),
//       },
//     );
//     const data = await response.json();
//     console.log(data)
//     if (!response.ok) {
//       dispatch({ type: ADD_CHATROOM_ERR, payload: data.error.message });
//     } else {
//       dispatch({ type: ADD_CHATROOM, payload: {title: chatroomName, id: data.name}, });
//     }
//   };
// };
// export const getChatrooms = () => {
//   return async (dispatch, getState) => {
//     const idToken = getState().chat.userInfo.idToken
//     const response = await fetch(
//       `https://kea-react-native-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=${idToken}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         }
//       },
//     );
//     const data = await response.json();
//     console.log(data)
//     let chatrooms = []
//     for(const key in data){
//       chatrooms.push(new Chatroom(data[key].title, [], '', key))
//     }
//     if (!response.ok) {
//       dispatch({ type: GET_CHATROOM_ERR, payload: data.error.message });
//     } else {
//       dispatch({ type: GET_CHATROOM, payload: chatrooms});
//     }
//   };
// };
// export const deleteChatroom = (id) => {
//   return async (dispatch, getState) => {
//     const idToken = getState().chat.userInfo.idToken
//     const response = await fetch(
//       `https://kea-react-native-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${id}.json?auth=${idToken}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         }
//       },
//     );
//     const data = await response.json();
//     console.log(data)
//     if (!response.ok) {
//       // ERR
//       // dispatch({ type: GET_CHATROOM_ERR, payload: data.error.message });
//     } else {
//       dispatch({ type: DELETE_CHATROOM, payload: id});
//     }
//   };
// };

// export const updateUserInfo = ( displayName, email, idToken ) => {
//   return async (dispatch, getState) => {
//     // const idToken = getState().chat.userInfo.idToken
//     const response = await fetch(
//       `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDKBvTPgHF_LfSxc82tHkgYauH9_s_uYco`,
//       {
//         method: "POST",
//         body: JSON.stringify({
//           idToken: idToken,
//           displayName: displayName
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         }
//       },
//     );
//     const data = await response.json();
//     console.log(data)
//     if (!response.ok) {
//       // ERR
//       // dispatch({ type: GET_CHATROOM_ERR, payload: data.error.message });
//     } else {
//       // dispatch({ type: DELETE_CHATROOM, payload: id});
//     }
//   };
// };