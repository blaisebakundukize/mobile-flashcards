import { AsyncStorage } from "react-native";

import { generateKey } from "./helpers";

export const CARD_STORAGE_KEY = "Flash:Cards";

export const getDecks = () => {
  return AsyncStorage.getItem(CARD_STORAGE_KEY).then((result) => {
    const decks = JSON.parse(result);
    return decks;
  });
};

export const getDeck = async (key) => {
  const decks = await getDecks();
  return decks[key];
};

export const addDeck = (deck) => {
  const key = generateKey();
  return AsyncStorage.mergeItem(
    CARD_STORAGE_KEY,
    JSON.stringify({
      [key]: deck,
    })
  ).catch((error) => console.log("error occurred", error));
};

export const addCardToDeck = async (card, deckId) => {
  let data = await getDecks();
  data[deckId] = {
    title: data[deckId].title,
    questions: [...data[deckId].questions.concat(card)],
  };
  await AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(data));
  console.log("Added to local storage");
};
