import { StyleSheet, Text, View, Button, FlatList, TextInput, Image, Modal } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TouchableOpacity } from "react-native";
import { AppStyles } from "../style";
import NestedList from "../components/NestedList";

const ProgrammeModal = (props) => {
  const programmes = require("../assets/js/programmes.json");
  const handleSelectProgramme = (programme) => {
    props.handleSetProgramme(programme);
    props.handleHideModal();
  };

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
            <Text style={AppStyles.tekoTitle}>Study programme</Text>
          </View>

          <NestedList data={programmes} onSelect={handleSelectProgramme} />

          <TouchableOpacity onPress={() => props.handleHideModal()}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default ProgrammeModal;
