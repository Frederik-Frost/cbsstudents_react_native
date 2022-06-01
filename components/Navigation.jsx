import Home from "./../screens/Home";
import Discover from "./../screens/Discover";
import Chat from "./../screens/Chat";
import ChatRoom from "./../screens/ChatRoom";
import Menu from "./../screens/Menu";
import SignIn from "./../screens/SignIn";
import SignUp from "./../screens/SignUp";
import BeforeStart from "./../screens/BeforeStart";
import NotificationsScreen from "./../screens/NotificationsScreen";
import EditProfileScreen from "./../screens/EditProfileScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Navigation = (props) => {
  const dispatch = useDispatch();
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const state = useSelector((state) => state.profile);
  const Drawer = createDrawerNavigator();
  const token = useSelector((state) => (state.profile.userInfo ? state.profile.userInfo.idToken : null));
  const profileInfo = useSelector((state) => state.profile.profileInfo);
  const signUpFlow = useSelector((state) => state.profile.signUpFlow);
  const [modalVisible, setModalVisible] = useState(false);
 
function MenuStack() {
    return (
      <Stack.Navigator
        initialRouteName="ProfileScreen"
        screenOptions={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 26,
            fontFamily: "Teko_500Medium",
            textTransform: "upperCase",
            color: "#5050A5",
          }
        }}
      >
        <Stack.Screen
          name="Profile"
          component={Menu}
          options={{
            title: "Menu",
          }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          title="Edit"
          component={EditProfileScreen}
          options={{
            title: "Edit profile",
          }}
        />
      </Stack.Navigator>
    );
  }
  function ChatStack(props) {
    return (
      <Stack.Navigator
        initialRouteName="ProfileScreen"
        screenOptions={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 26,
            fontFamily: "Teko_500Medium",
            textTransform: "upperCase",
            color: "#5050A5",
          },
          //   headerBackImageSource: backImage
        }}
      >
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            title: "Chat",
            headerRight: () => (
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color="blue" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name={"ChatRoom"}
          title="Edit"
          component={ChatRoom}
          options={{
            title: "ChatRoomName",
          }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      {token == undefined || null ? (
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "#fff" },
          }}
        >
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      ) : signUpFlow == true || !profileInfo ? (
        <Stack.Navigator initialRouteName="BeforeStart">
          <Stack.Screen name="BeforeStart" component={BeforeStart} />
          <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                case "Home":
                  iconName = focused ? "ios-home" : "ios-home-outline";
                  break;
                case "Discover":
                  iconName = focused ? "ios-search" : "ios-search-outline";
                  break;
                case "Chatstack":
                  iconName = focused ? "ios-chatbubbles" : "ios-chatbubbles-outline";
                  break;
                case "Menu":
                  iconName = focused ? "ios-menu" : "ios-menu-outline";
                  break;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#5050A5",
            tabBarInactiveTintColor: "#B7B7B7",
            tabBarStyle: {
              // height: 74,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: "Teko_500Medium",
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Discover" component={Discover} />
          <Tab.Screen
            name="Chatstack"
            component={ChatStack}
            options={{
              title: "Chat",
            }}
          />
          <Tab.Screen name="Menu" component={MenuStack} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
