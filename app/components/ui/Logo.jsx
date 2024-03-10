import React from "react";
import { Image, StyleSheet } from "react-native";
import { LogoImage } from "../../constant";

const Logo = () => {
  return <Image source={LogoImage} style={styles.logo} />;
};

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
  },
});

export default Logo;
