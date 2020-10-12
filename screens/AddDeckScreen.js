import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Colors from "../constants/colors";
import { addDeck } from "../utils/api";

const AddDeckScreen = ({ navigation }) => {
  const [titleValue, setTitleValue] = useState("");

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const saveDeckHandler = async () => {
    const newDeck = {
      title: titleValue,
      questions: [],
    };
    await addDeck(newDeck);
    setTitleValue("");
    navigation.navigate("Decks");
  };

  return (
    <View style={styles.content}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          What is the title of your new deck?
        </Text>
        <TextInput
          placeholder='Deck Title'
          style={styles.input}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        disabled={titleValue.length === 0 ?? true}
        onPress={saveDeckHandler}
      >
        <Text style={styles.text}>Create Desk</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 50,
  },
  inputContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputLabel: {
    width: "80%",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    width: "80%",
    height: 45,
    marginVertical: 5,
    backgroundColor: Colors.white,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 5,
    height: 50,
    marginBottom: 10,
  },
  btn: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
    borderRadius: 5,
    height: 50,
  },
  text: {
    fontSize: 18,
    color: Colors.white,
  },
});

export default AddDeckScreen;
