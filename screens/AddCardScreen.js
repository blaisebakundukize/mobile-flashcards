import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import Colors from "../constants/colors";
import { addCardToDeck } from "../utils/api";
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";

const AddCardScreen = ({ route, navigation }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const questionChangeHandler = (question) => {
    setQuestion(question);
  };

  const answerChangeHandler = (answer) => {
    setAnswer(answer);
  };

  const saveCardHandler = async () => {
    const deckId = route.params.deckId;
    const card = {
      question,
      answer,
    };
    await addCardToDeck(card, deckId);
    clearLocalNotification().then(setLocalNotification);
    navigation.goBack();
  };

  return (
    <View style={styles.content}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Add Card</Text>
        <TextInput
          placeholder='Question'
          style={styles.input}
          onChangeText={questionChangeHandler}
          value={question}
        />
        <TextInput
          placeholder='Answer'
          style={styles.input}
          onChangeText={answerChangeHandler}
          value={answer}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        disabled={question === "" || answer === ""}
        onPress={saveCardHandler}
      >
        <Text style={styles.text}>Submit</Text>
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
  title: {
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

export default AddCardScreen;
