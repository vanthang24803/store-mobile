import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Color from "../../constant/Color";
import { formatPrice, price } from "../../utils/format";

export default function Card({ product }) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `${product.thumbnail}`,
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
          {product.name}
        </Text>
        <View style={styles.row}>
          <Text style={styles.options}>{product.options.length} phiên bản</Text>
          {product.options[0].sale > 0 && (
            <View style={styles.sale}>
              <Text style={styles.saleText}>{product.options[0].sale}%</Text>
            </View>
          )}
        </View>

        <View style={styles.row}>
          <Text style={styles.priceSale}>
            {formatPrice(product.options[0].price, product.options[0].sale)}₫
          </Text>
          {product.options[0].sale > 0 && (
            <Text style={styles.price}>{price(product.options[0].price)}₫</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: Color.WHITE,
    borderRadius: 6,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 2,
  },
  content: {
    flexDirection: "column",
    marginHorizontal: 8,
  },
  name: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  price: {
    fontSize: 12,
    fontWeight: "400",
    color: Color.GRAY,
    textDecorationLine: "line-through",
  },
  priceSale: {
    fontSize: 12,
    fontWeight: "800",
    color: Color.RED,
  },
  options: {
    fontSize: 12,
    color: Color.GRAY,
  },
  sale: {
    backgroundColor: "pink",
    padding: 4,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  saleText: {
    fontSize: 12,
    color: Color.RED,
    fontWeight: "400",
  },
});
