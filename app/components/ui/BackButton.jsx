import { TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Color from "../../constant/Color";

export default function BackButton() {
  const router = useNavigation();
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: 45,
        left: 10,
        zIndex: 999,
      }}
      onPress={() => router.goBack()}
    >
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 999,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Color.WHITE,
        }}
      >
        <Ionicons name="arrow-back" size={20} color="black" />
      </View>
    </TouchableOpacity>
  );
}

