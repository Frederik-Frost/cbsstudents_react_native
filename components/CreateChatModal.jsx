import { StyleSheet,FlatList, Text, View, TouchableOpacity, Modal } from "react-native";
import { AppStyles } from "../style";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

const CreateChatModal = (props) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {props.createChat(item)}}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      visible={props.showModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        props.handleHideModal();
      }}
    >
      <View style={AppStyles.modalView}>
        <View style={AppStyles.modalContainer}>
          <View style={AppStyles.modalHeader}>
            <Text style={AppStyles.tekoTitle}>New Chat</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => props.handleHideModal()}>
              <Ionicons name="close-circle-outline" size={30} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={props.listData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
          
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeBtn: {
    position: "absolute",
    right: 10,
  },
});
export default CreateChatModal;
