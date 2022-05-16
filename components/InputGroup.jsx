import { Text, View, FlatList, TextInput, StyleSheet } from "react-native";
import { AppStyles } from "../style";
import Ionicons from "react-native-vector-icons/Ionicons";
const InputGroup = (props) => {
  const renderItem = ({ item }) => (
    <View style={AppStyles.inputGroup}>
      <Text style={AppStyles.inputLabel}>{item.label}</Text>
      <TextInput
        style={AppStyles.inputText}
        placeholder={item.placeholder}
        value={item.value}
        onChangeText={item.onChange}
        autoComplete={item.autoComplete}
        secureTextEntry={item.secureTextEntry}
      />
    </View>
  );
  return (
    <View style={AppStyles.inputGroupWrapper}>
    <FlatList
      data={props.data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
    />
      <View style={props.err && props.err.length > 0 ? styles.errMsg : styles.hide} >
        <Ionicons style={styles.danger} name="close-circle-outline" size={24}/> 
        <Text style={[styles.danger, {marginLeft: 8}] }>{props.err}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  hide: {
    display: "none"
  },
  errMsg: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    padding: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  danger: {
    color: "#B10024",
  }
});
export default InputGroup;
