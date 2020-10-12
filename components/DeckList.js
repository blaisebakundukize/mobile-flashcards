import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import DeckItem from "./DeckItem";

const DeckList = (props) => {
  const renderDeckItem = (itemData) => {
    return (
      <DeckItem
        title={itemData.item.title}
        totalQuestions={itemData.item.questions.length}
        onSelectDeck={() =>
          props.navigation.navigate({
            name: "DeckDetails",
            params: {
              deckId: itemData.item.id,
              deckTitle: itemData.item.title,
            },
          })
        }
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.decks}
        keyExtractor={(item) => item.id}
        renderItem={renderDeckItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});

export default DeckList;
