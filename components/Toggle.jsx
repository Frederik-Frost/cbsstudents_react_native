import { View, Text, Switch, StyleSheet } from "react-native";
import { useState } from "react";
import { AppStyles } from "../style";

const Toggle = (props) => {
  const [isEnabled, setIsEnabled] = useState(props.model);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <Text style={AppStyles.smallTitle}>{props.title}</Text>
        <Text style={AppStyles.infoText}>{props.infoText}</Text>
      </View>
        <Text style={AppStyles.infoText}>{props.model}</Text>
      <Switch
        trackColor={{ false: "#AAAAAA", true: "#BABADD" }}
        thumbColor={isEnabled ? "#5050A5" : "#F5F5F5"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{ transform: [{ scale: 1.4 }], marginRight: 18 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer:{
        marginTop: 12,
        marginBottom: 12,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 12,
    
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 5.46,
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
        
    },
    textContainer: {
    }

  });
  

export default Toggle;
