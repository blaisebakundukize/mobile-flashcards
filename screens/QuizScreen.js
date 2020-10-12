import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

import Colors from "../constants/colors";
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";

import { getDeck } from "../utils/api";

class QuizScreen extends Component {
  state = {
    deck: null,
    numberOfQuestions: 0,
    currentQuestion: 0,
    correctAnswer: 0,
    incorrectAnswer: 0,
    showAnswer: false,
    width: new Animated.Value(0),
    height: new Animated.Value(0),
  };

  componentDidUpdate() {
    const { currentQuestion, numberOfQuestions } = this.state;
    if (currentQuestion > numberOfQuestions) {
      clearLocalNotification().then(setLocalNotification);
    }
  }

  async componentDidMount() {
    const { route } = this.props;
    const deckId = route.params.deckId;
    let deck = await getDeck(deckId);
    let numberOfQuestions = deck.questions.length;
    this.setState({
      deck: deck,
      numberOfQuestions: numberOfQuestions,
      currentQuestion: numberOfQuestions === 0 ? 0 : 1,
    });
  }

  handleCorrectAnswer = () => {
    this.setState((prevState) => ({
      correctAnswer: prevState.correctAnswer + 1,
      currentQuestion: prevState.currentQuestion + 1,
      showAnswer: false,
      width: new Animated.Value(0),
      height: new Animated.Value(0),
    }));
  };

  handleIncorrectAnswer = () => {
    this.setState((prevState) => ({
      incorrectAnswer: prevState.incorrectAnswer + 1,
      currentQuestion: prevState.currentQuestion + 1,
      showAnswer: false,
      width: new Animated.Value(0),
      height: new Animated.Value(0),
    }));
  };

  handleShowAnswer = () => {
    const { width, height } = this.state;

    this.setState(
      (prevState) => ({
        showAnswer: !prevState.showAnswer,
      }),
      () => {
        Animated.spring(width, {
          toValue: 380,
          speed: 10,
          useNativeDriver: false,
        }).start();
        Animated.spring(height, {
          toValue: 100,
          speed: 5,
          useNativeDriver: false,
        }).start();
      }
    );
  };

  onRestartQuizHandler = () =>
    this.setState({
      currentQuestion: 1,
      correctAnswer: 0,
      incorrectAnswer: 0,
    });

  onGoBackHandler = () => this.props.navigation.goBack();
  calculateScore = () =>
    ((this.state.correctAnswer / this.state.numberOfQuestions) * 100).toFixed(
      2
    );

  render() {
    const {
      deck,
      numberOfQuestions,
      currentQuestion,
      showAnswer,
      width,
      height,
    } = this.state;
    let display;
    if (deck !== null) {
      display = (
        <View style={styles.container}>
          {deck.questions.length === 0 && (
            <Text style={styles.text}>
              Sorry, you cannot take a quiz because there are no cards in the
              deck.
            </Text>
          )}

          {currentQuestion > numberOfQuestions && (
            <View style={styles.content}>
              <Text style={styles.displayBox}>
                You scored {this.calculateScore()}%
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={this.onRestartQuizHandler}
              >
                <Text style={styles.btnName}>Restart Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={this.onGoBackHandler}
              >
                <Text style={styles.btnName}>Back</Text>
              </TouchableOpacity>
            </View>
          )}

          {currentQuestion <= numberOfQuestions && numberOfQuestions !== 0 && (
            <View style={styles.content}>
              <Text style={styles.currentQuestion}>
                {currentQuestion} / {numberOfQuestions}
              </Text>
              {!showAnswer ? (
                <Text style={styles.displayBox}>
                  <Text style={styles.label}>Question:</Text>
                  <Text> {deck.questions[currentQuestion - 1].question}</Text>
                </Text>
              ) : (
                <Animated.Text style={[styles.displayBox, { width, height }]}>
                  <Text style={styles.label}>Answer:</Text>
                  <Text> {deck.questions[currentQuestion - 1].answer}</Text>
                </Animated.Text>
              )}
              <TouchableOpacity
                style={styles.btn}
                onPress={this.handleShowAnswer}
              >
                <Text style={styles.btnName}> Show Answer </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btn}
                onPress={this.handleCorrectAnswer}
              >
                <Text style={styles.btnName}>Correct</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btn}
                onPress={this.handleIncorrectAnswer}
              >
                <Text style={styles.btnName}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      );
    }

    return <View>{display}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 50,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  currentQuestion: {
    fontSize: 17,
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    padding: 40,
    width: 500,
  },
  label: {
    color: Colors.grey,
  },
  displayBox: {
    width: "80%",
    paddingTop: 20,
    textAlign: "center",
    borderWidth: 1,
    borderColor: Colors.grey,
    marginVertical: 4,
    borderRadius: 5,
    height: 100,
    fontSize: 18,
    backgroundColor: Colors.white,
  },
  btnName: {
    fontSize: 18,
    color: Colors.white,
  },
  btn: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
    borderRadius: 5,
    height: 50,
    marginVertical: 4,
  },
});

export default QuizScreen;
