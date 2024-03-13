import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity } from "react-native";
import authStore from "../../../hooks/store-auth";

const Avatar = ({size}) => {
  const navigator = useNavigation();

  const auth = authStore();

  return (
    <TouchableOpacity onPress={() => navigator.navigate("Profile")}>
      <Image
        source={{
          uri: auth.user?.avatar,
        }}
        style={{
          width: size,
          height: size,
          borderRadius: 999,
          objectFit: "cover",
        }}
      />
    </TouchableOpacity>
  );
};

export default Avatar;
