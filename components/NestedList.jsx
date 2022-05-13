import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from "react-native";
import { AppStyles } from "../style";
import { useState } from "react";

const NestedList = (props) => {
  const [collapsed, setCollapsed] = useState([]);
  const handleSelectItem = (item) => {
    props.onSelect(item);
  };

  const toggleCollapse = (id) => {
    if (collapsed.includes(id)) {
      setCollapsed(() => collapsed.filter((number) => number !== id));
    } else {
      setCollapsed((oldCollapsed) => [...oldCollapsed, id]);
    }
  };

  const renderItem = ({ item }) => (
    <View>
      {item.group ? (
        <TouchableOpacity onPress={() => toggleCollapse(item.id)}>
          <View>
            <Text style={styles.header}>{item.name}</Text>
            <FlatList
              style={collapsed.includes(item.id) ? styles.open : styles.collapsed}
              data={item.group}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => handleSelectItem(item)}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
  return (
    <FlatList
      style={AppStyles.NestedListWrapper}
      data={props.data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
    />
  );
};
const styles = StyleSheet.create({
  collapsed: {
    display: "none",
  },
  open: {
    display: "flex",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
export default NestedList;
