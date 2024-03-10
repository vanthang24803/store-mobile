import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";

export default function Heading({ title, next }) {
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <AntDesign
        style={styles.icon}
        name="right"
        size={16}
        color="black"
        onPress={() => next && navigator.navigate(next)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    fontWeight: "bold",
  },
});
