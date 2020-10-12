import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

import Colors from "../constants/colors";

const DeckItem = (props) => {
  return (
    <View style={styles.deckItem}>
      <TouchableOpacity onPress={props.onSelectDeck}>
        <View style={styles.deckRow}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.totalQuestions}>
            {props.totalQuestions} cards
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
  totalQuestions: {
    color: Colors.grey,
    fontSize: 20,
  },
  deckItem: {
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
    borderColor: Colors.grey,
  },
  deckRow: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

export default DeckItem;
