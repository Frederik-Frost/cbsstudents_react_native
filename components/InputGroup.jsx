import { Text, View, FlatList, TextInput } from "react-native";
import { AppStyles } from "../style";

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
    <FlatList
      style={AppStyles.inputGroupWrapper}
      data={props.data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
    />
  );
};

export default InputGroup;
