import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, StyleSheet } from "react-native";
import Avatar from "./ui/Avatar";
import Logo from "./ui/Logo";

const Appbar = () => {
  return (
    <View style={styles.appBar}>
      <Ionicons name="menu-sharp" size={28} />
      <Logo />
      <Avatar />
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
  },
});

export default Appbar;
