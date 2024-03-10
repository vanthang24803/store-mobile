import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, StyleSheet } from "react-native";

const Avatar = () => {
  const navigator = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigator.navigate("Profile")}>
      <Image
        source={{
          uri: "https://i.pinimg.com/564x/0d/71/34/0d71347a7d2982903952d7484fb69855.jpg",
        }}
        style={styles.avatar}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 999,
    objectFit: "cover",
  },
});

export default Avatar;
