import { StyleSheet, Text} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import BackButton from "../components/ui/BackButton";

export default function Checkout() {
  return (
    <SafeAreaView>
      <BackButton />
      <Text>Checkout</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
