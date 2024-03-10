import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "./ui/Card";

export default function ListProduct({ products }) {
  return (
    <View style={styles.container}>
      {products.map((product, index) => (
        <View key={index} style={styles.product}>
          <Card product={product} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginTop: 10,
    marginBottom: 60,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  product: {
    width: "50%",
    padding : 8,
  },
});
