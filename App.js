import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { enableScreens } from "react-native-screens";
// import * as SplashScreen from "expo-splash-screen";

import DeckTabNavigator from "./navigation/DeckTabNavigator";

enableScreens();

// const fetchFonts = () => {
//   return Font.loadAsync({
//     "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
//     "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
//   });
// };

export default function App() {
  // const [fontLoaded, setFontLoaded] = useState(false);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await SplashScreen.preventAutoHideAsync();
  //     } catch (e) {
  //       console.warn(e);
  //     }
  //   })();
  //   return () => {
  //     console.log("This will be logged on unmount");
  //   };
  // }, [fontLoaded]);

  // const setAfter = async () => {
  //   setFontLoaded(true);
  //   await SplashScreen.hideAsync();
  // };

  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={setAfter}
  //       onError={console.warn}
  //       // autoHideSsplash={true}
  //     />
  //   );
  // }

  return (
    <>
      <StatusBar barStyle='default' />
      <DeckTabNavigator />
    </>
  );
}
