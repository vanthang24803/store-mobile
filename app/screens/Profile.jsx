import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../components/ui/Avatar";
import authStore from "../../hooks/store-auth";

export default function Profile() {
  const { user } = authStore();

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        <Avatar size={150} />
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "600",
        }}
      >
        {user?.name}
      </Text>
    </SafeAreaView>
  );
}
