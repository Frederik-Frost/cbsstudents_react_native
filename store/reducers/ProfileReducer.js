import { SIGNUP, SIGNUP_ERR, SIGNIN, SIGNIN_ERR, SIGNOUT, TO_SIGNUP_FLOW , ADD_PROFILE_DATA, ADD_PROFILE_DATA_ERR, END_SIGNUP_FLOW, UPDATE_PROFILE_INFO} from "../actions/ProfileActions";

const initialState = {
  signupInfo: null,
  signUpErr: "",
  signInErr: "",
  userInfo:  null,
  profileInfo:  null,
  profileId: null,
  signUpFlow: false,
  addProfileErr: "",
  toNotifications: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, signupInfo: action.payload, signUpErr: "" };

    case SIGNUP_ERR:
      console.log(action.payload);
      return { ...state, signUpErr: action.payload };

    case SIGNIN:
      console.log(action.payload);
      // localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };

    case TO_SIGNUP_FLOW:
      console.log(action.payload);
      // localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload, signUpFlow: true };

    case ADD_PROFILE_DATA:
      console.log(action.payload);
      // localStorage.setItem("profileInfo", JSON.stringify(action.payload.profileData));
      return { ...state, profileInfo: action.payload.profileData, profileId: action.payload.profileId, toNotifications: true };
    
    case END_SIGNUP_FLOW:
      console.log(action.payload);
      // localStorage.setItem("profileInfo", JSON.stringify(action.payload.profileData));
      return { ...state, profileId: action.payload.profileId, profileInfo: action.payload.profileData, signUpFlow: false, toNotifications: false};
    
    case UPDATE_PROFILE_INFO:
      console.log(action.payload);
      return { ...state, profileInfo: action.payload.profileData };
    
    case SIGNIN_ERR:
      console.log(action.payload);
      return { ...state, signInErr: action.payload };

    case SIGNOUT:
      console.log(action.payload);
      return { ...state, userInfo: null };      
    default:
      return state;
  }
};

export default profileReducer;
