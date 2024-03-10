import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Feather } from "@expo/vector-icons";
import Color from "../constant/Color";
import { formatPrice, price } from "../utils/format";
import React, { useState } from "react";

export default function Product({ product }) {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [option, setOption] = useState(product?.options[0]);
  const [total, setTotal] = useState(1);

  const handleOptionChange = (id) => {
    const newOption = product?.options.find((option) => option.id === id);
    setOption(newOption);
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.boxIcon}>
            <Ionicons name="arrow-back" size={20} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate("Cart")}
        >
          <View style={styles.boxIcon}>
            <Feather name="shopping-cart" size={18} color="black" />
          </View>
        </TouchableOpacity>
        <Swiper
          loop={false}
          showsPagination={false}
          onIndexChanged={(index) => setCurrentIndex(index)}
        >
          {product.images.map((item, index) => (
            <Image
              key={index}
              style={styles.image}
              source={{
                uri: item.url,
              }}
            />
          ))}
        </Swiper>
        <View style={styles.boxCounter}>
          <Text style={styles.counter}>
            {currentIndex + 1}/{product.images.length}
          </Text>
        </View>
      </View>
      <ScrollView style={styles.detailContent}>
        <View style={styles.row}>
          <Text style={styles.name}>{product.name}</Text>
          {option?.status ? (
            <Text
              style={{
                color: Color.Primary,
                fontWeight: "bold",
                marginRight: 20,
              }}
            >
              Còn hàng
            </Text>
          ) : (
            <Text
              style={{
                color: Color.GRAY,
                fontWeight: "bold",
                marginRight: 20,
              }}
            >
              Hết hàng
            </Text>
          )}
        </View>
        <View style={styles.row}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.price}>
              {formatPrice(option?.price, option?.sale)}₫
            </Text>
            {option.sale > 0 && (
              <Text
                style={{
                  color: Color.GRAY,
                  fontWeight: "600",
                  textDecorationLine: "line-through",
                }}
              >
                {price(option?.price)}₫
              </Text>
            )}
          </View>
          {option.sale > 0 && (
            <View style={styles.sale}>
              <Text style={styles.saleText}>-{option?.sale}%</Text>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 12,
            marginTop: 4,
          }}
        >
          {product?.options.map((item, index) => (
            <View
              style={{
                margin: 10,
              }}
              key={index}
            >
              <Pressable
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 8,
                  paddingHorizontal: 8,
                  borderRadius: 4,
                  elevation: 3,
                  backgroundColor:
                    item.id === option?.id ? Color.CYAN : Color.BLACK,
                }}
                onPress={() => handleOptionChange(item.id)}
              >
                <Text style={styles.text}>{item.name} </Text>
              </Pressable>
            </View>
          ))}
        </View>

        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: Color.Primary,
            marginHorizontal : 12,
            marginTop :12
          }}
          onPress={() => {}}
        >
          <Text style={styles.text}>Thêm vào giỏ hàng</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  image: {
    aspectRatio: 1 / 1,
    resizeMode: "cover",
  },
  swiperContainer: {
    height: "50%",
  },
  boxIcon: {
    width: 30,
    height: 30,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.WHITE,
  },
  backButton: {
    position: "absolute",
    top: 45,
    left: 10,
    zIndex: 999,
  },
  cartButton: {
    position: "absolute",
    top: 45,
    right: 10,
    zIndex: 999,
  },
  boxCounter: {
    backgroundColor: Color.GRAY,
    position: "absolute",
    right: 20,
    top: 300,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    borderRadius: 4,
  },
  counter: {
    fontSize: 14,
    color: Color.WHITE,
    zIndex: 999,
  },
  detailContent: {
    marginTop: -50,
    backgroundColor: Color.WHITE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  name: {
    marginHorizontal: 20,
    width: 220,
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    marginHorizontal: 20,
    fontSize: 18,
    color: Color.RED,
    fontWeight: "bold",
  },
  row: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sale: {
    backgroundColor: Color.RED,
    padding: 6,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  saleText: {
    fontSize: 12,
    color: Color.WHITE,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
