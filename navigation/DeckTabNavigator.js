import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Platform, Text } from "react-native";

import AddCardScreen from "../screens/AddCardScreen";
import AddDeckScreen from "../screens/AddDeckScreen";
import DeckDetailScreen from "../screens/DeckDetailScreen";
import DecksScreen from "../screens/DecksScreen";
import QuizScreen from "../screens/QuizScreen";
import Colors from "../constants/colors";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const DeckStack = createStackNavigator();

function DeckStackScreen() {
  return (
    <DeckStack.Navigator
      initialRouteName='Decks'
      screenOptions={defaultStackNavOptions}
    >
      <DeckStack.Screen name='Decks' component={DecksScreen} />
      <DeckStack.Screen
        name='DeckDetails'
        options={({ route }) => ({ title: route.params.deckTitle })}
        component={DeckDetailScreen}
      />
      <DeckStack.Screen
        name='AddCard'
        options={({ route }) => ({ title: route.params.deckTitle })}
        component={AddCardScreen}
      />
      <DeckStack.Screen name='Quiz' component={QuizScreen} />
    </DeckStack.Navigator>
  );
}

const AddCardStack = createStackNavigator();

function AddCardStackScreen() {
  return (
    <AddCardStack.Navigator
      initialRouteName='AddDeck'
      screenOptions={defaultStackNavOptions}
    >
      <AddCardStack.Screen
        name='AddDeck'
        options={{ title: "Add Deck" }}
        component={AddDeckScreen}
      />
      <DeckStack.Screen
        name='DeckDetails'
        options={({ route }) => ({ title: route.params.deckTitle })}
        component={DeckDetailScreen}
      />
      <DeckStack.Screen name='Quiz' component={QuizScreen} />
    </AddCardStack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

const tabScreenConfig = {
  decks: {
    options: {
      tabBarLabel: Platform.OS === "android" ? <Text>Decks</Text> : "Decks",
      tabBarIcon: ({ color }) => {
        return <FontAwesome name='list' size={26} color={color} />;
      },
    },
  },
  addDeck: {
    options: {
      tabBarLabel:
        Platform.OS === "android" ? <Text>Add Deck</Text> : "Add Deck",
      tabBarIcon: ({ color }) => {
        return <FontAwesome name='plus-square' size={26} color={color} />;
      },
    },
  },
};

function DeckTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor={Colors.primaryColor}
        barStyle={{ backgroundColor: "white" }}
      >
        <Tab.Screen
          name='Decks'
          options={tabScreenConfig.decks.options}
          component={DeckStackScreen}
        />
        <Tab.Screen
          name='Add Deck'
          options={tabScreenConfig.addDeck.options}
          component={AddCardStackScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default DeckTabNavigator;
