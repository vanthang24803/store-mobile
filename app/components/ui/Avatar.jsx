import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";

const Avatar = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
