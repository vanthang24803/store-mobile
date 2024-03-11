import { Text, StyleSheet, View, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Color from "../constant/Color";
import useCart from "../../hooks/use-cart";
import { Feather } from "@expo/vector-icons";
import { formatPrice, price } from "../utils/format";
import UpdateCart from "../components/UpdateCart";

export default function Cart() {
  const cart = useCart();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            marginHorizontal: 15,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          Giỏ hàng
        </Text>
        <Text
          style={{
            fontSize: 12,
            marginHorizontal: 15,
            fontWeight: "400",
            color: Color.GRAY,
          }}
        >
          Có{" "}
          <Text
            style={{ fontWeight: "bold", color: Color.BLACK, fontSize: 15 }}
          >
            {cart.totalItems()}
          </Text>{" "}
          sản phẩm trong giỏ
        </Text>
      </View>
      <ScrollView>
        {cart.items.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              margin: 10,
            }}
          >
            <Image
              source={{
                uri: item.product.thumbnail,
              }}
              style={{
                width: 100,
                height: 120,
                borderRadius: 10,
                objectFit: "cover",
              }}
            />
            <View
              style={{
                flexDirection: "column",
                marginLeft: 8,
                flexShrink: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    width: "80%",
                  }}
                >
                  {item.product.name}
                </Text>
                <Feather
                  name="x"
                  size={20}
                  color="black"
                  onPress={() =>
                    cart.removeItem(item.product.id, item.product.options[0].id)
                  }
                />
              </View>

              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "500",
                  color: Color.GRAY,
                  marginTop: 2,
                }}
              >
                {item.product.options[0].name}
              </Text>

              <View style={styles.row}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "800",
                      color: Color.RED,
                    }}
                  >
                    {formatPrice(
                      item.product.options[0].price,
                      item.product.options[0].sale
                    )}
                    ₫
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "400",
                      color: Color.GRAY,
                      marginLeft: 10,
                      textDecorationLine: "line-through",
                    }}
                  >
                    {price(item.product.options[0].price)}₫
                  </Text>
                </View>
                {item.product.options[0].sale > 0 && (
                  <View
                    style={{
                      backgroundColor: Color.RED,
                      padding: 6,
                      borderRadius: 4,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.WHITE,
                        fontWeight: "bold",
                      }}
                    >
                      {item.product.options[0].sale}%
                    </Text>
                  </View>
                )}
              </View>
              <UpdateCart
                productId={item.product.id}
                optionId={item.product.options[0].id}
                quantity={item.quantity}
              />
            </View>
          </View>
        ))}
       
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
