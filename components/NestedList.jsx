import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from "react-native";
import { AppStyles } from "../style";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

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
          <View style={styles.headerWrapper}>
            <View style={[styles.header, item.topLevel && styles.topHeader]}>
              <Text style={[styles.headerText, item.topLevel && styles.topHeaderText]}>{item.name}</Text>
              <Ionicons
                style={[styles.chevron, item.topLevel && styles.topHeaderChevron]}
                name={collapsed.includes(item.id) ? "chevron-up-outline" : "chevron-down-outline"}
                size={32}
              />
            </View>
            <FlatList
              style={collapsed.includes(item.id) ? styles.open : styles.collapsed}
              data={item.group}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.selection} onPress={() => handleSelectItem(item)}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
  return (
    <FlatList
      style={styles.nestedListWrapper}
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
  nestedListWrapper: {
    alignSelf: "stretch",
  },
  topHeaderText:{
    fontSize: 22,
    color: "#fff",
  },
  topHeader:{
    backgroundColor: "#333333",
    borderBottomColor: "#fff"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#ededed",
    backgroundColor: "#fafafa",
    padding: 10
  },
  headerText: {
    fontFamily: "OpenSans_700Bold",
  },
  chevron:{
    fontSize: 18
  },
  topHeaderChevron:{
    color: "#fff"
  },
  selection:{
    fontSize: 14,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ededed",
  }
});
export default NestedList;
