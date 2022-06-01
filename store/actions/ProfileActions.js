import * as SecureStore from "expo-secure-store";

export const SIGNUP = "SIGNUP";
export const SIGNUP_ERR = "SIGNUP_ERR";
export const SIGNIN = "SIGNIN";
export const SIGNIN_ERR = "SIGNIN_ERR";
export const SIGNOUT = "SIGNOUT";
export const TO_SIGNUP_FLOW = "TO_SIGNUP_FLOW";
export const ADD_PROFILE_DATA = "ADD_PROFILE_DATA";
export const END_SIGNUP_FLOW = "END_SIGNUP_FLOW";
export const UPDATE_PROFILE_INFO = "UPDATE_PROFILE_INFO";

// export const RESTORE_USER = 'RESTORE_USER';

export const restoreUser = (userInfo) => {
  return (dispatch) => {
    dispatch({ type: SIGNIN, payload: userInfo });
    dispatch(getProfileData(userInfo));
  };
};

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
      SecureStore.setItemAsync("userInfo", JSON.stringify(data));
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
      if (data && data.error == "Auth token is expired") {
        SecureStore.deleteItemAsync("userInfo");
        dispatch({ type: SIGNOUT });
      } else {
        dispatch({ type: SIGNIN_ERR, payload: data.error });
      }
    } else if (profileId == null || !profileId || profileId == undefined) {
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
    dispatch({ type: END_SIGNUP_FLOW, payload: { profileId: profileId, profileData: profileInfo } });
  };
};

export const updateProfileInfo = (name, programme) => {
  return async (dispatch, getState) => {
    const profileState = getState().profile;
    const idToken = profileState.userInfo.idToken;
    const profileId = profileState.profileId;
    let profileInfo = profileState.profileInfo;
    profileInfo.name = name;
    profileInfo.programme = programme;

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
    dispatch({ type: UPDATE_PROFILE_INFO, payload: { profileData: data } });
  };
};

export const toggleNotifications = (notificationType) => {
  return async (dispatch, getState) => {
    const profileState = getState().profile;
    const idToken = profileState.userInfo.idToken;
    const profileId = profileState.profileId;

    let profileInfo = profileState.profileInfo;
    profileInfo[notificationType] = !profileInfo[notificationType];
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
    dispatch({ type: UPDATE_PROFILE_INFO, payload: { profileData: data } });
  };
};

export const signOut = () => {
  return (dispatch) => {
    SecureStore.deleteItemAsync("userInfo");
    dispatch({ type: SIGNOUT });
  };
};

