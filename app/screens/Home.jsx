import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Appbar from "../components/Appbar";

import styles from "../style/home.style";

export default function Home({ navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Appbar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}
