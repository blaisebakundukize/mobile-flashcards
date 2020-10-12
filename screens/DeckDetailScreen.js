import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Colors from "../constants/colors";
import { getDeck } from "../utils/api";
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";

const DeckDetailScreen = ({ route, navigation }) => {
  const [deck, setDeck] = useState({});

  const deckId = route.params.deckId;

  useFocusEffect(
    useCallback(() => {
      getDeck(deckId).then((d) => {
        setDeck(d);
      });
    }, [deckId])
  );

  const navigateToAddCardHandler = () => {
    navigation.navigate({
      name: "AddCard",
      params: {
        deckId,
        deckTitle: deck.title,
      },
    });
  };

  const navigateToQuizHandler = () => {
    navigation.navigate({
      name: "Quiz",
      params: {
        deckId,
        deckTitle: deck.title,
      },
    });
    clearLocalNotification().then(setLocalNotification);
  };

  return (
    <View style={styles.content}>
      {Object.keys(deck).length === 0 ? (
        <Text style={{ fontSize: 25 }}>Loading...</Text>
      ) : (
        <>
          <View style={styles.deck}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.totalQuestions}>
              {deck.questions.length} cards
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btnWhite}
              onPress={navigateToAddCardHandler}
            >
              <Text style={styles.textBlack}>Add card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              // disabled={deck.questions.length === 0 ?? true}
              onPress={navigateToQuizHandler}
            >
              <Text style={styles.textWhite}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 50,
  },
  deck: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 30,
  },
  totalQuestions: {
    color: Colors.grey,
    fontSize: 20,
  },
  btnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnWhite: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 5,
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  btn: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
    borderRadius: 5,
    height: 50,
  },
  textBlack: {
    fontSize: 20,
    color: Colors.black,
  },
  textWhite: {
    fontSize: 20,
    color: Colors.white,
  },
});

export default DeckDetailScreen;
