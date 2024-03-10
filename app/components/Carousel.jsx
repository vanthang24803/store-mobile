import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

const Carousel = ({ billboard }) => {
  return (
    <View style={styles.container}>
      <Swiper autoplay={true} autoplayTimeout={10} loop={true} showsPagination={false}>
        {billboard.map((item, index) => (
          <Image
            key={index}
            source={{ uri: item.thumbnail }}
            style={styles.image}
          />
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    marginHorizontal: 20,
    height : 160
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 10,
  },
});

export default Carousel;
