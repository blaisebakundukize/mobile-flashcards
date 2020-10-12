import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import DeckList from "../components/DeckList";
import { formatDecks } from "../utils/helpers";
import { getDecks } from "../utils/api";

const DecksScreen = (props) => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStoredDecks();
  });

  const getStoredDecks = async () => {
    const receivedDecks = await getDecks();
    if (receivedDecks) {
      setDecks(formatDecks(receivedDecks));
    }
    setLoading(false);
  };

  const displayMessage = (message) => {
    return (
      <View style={styles.content}>
        <Text style={styles.text}>{message}</Text>
      </View>
    );
  };

  let message = "Loading...";

  if (!loading && decks.length === 0) {
    message = "No decks found, maybe add some?";
    return displayMessage(message);
  }

  return (
    <>
      {loading ? (
        displayMessage(message)
      ) : (
        <DeckList decks={decks} navigation={props.navigation} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default DecksScreen;
