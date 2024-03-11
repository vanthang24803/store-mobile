import { Pressable, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

import useCart from "../../hooks/use-cart";
import Color from "../constant/Color";

export default function UpdateCart({ productId, optionId, quantity }) {
  const cart = useCart();

  const [total, setTotal] = React.useState(quantity);

  const handleMinus = () => {
    setTotal((prevTotal) => {
      const newTotal = prevTotal > 0 ? prevTotal - 1 : 0;
      if (newTotal < 1) {
        cart.removeItem(productId, optionId);
      } else {
        cart.updateQuantity(productId, optionId, newTotal);
      }
      return newTotal;
    });
  };

  const handlePlus = () => {
    setTotal((prevTotal) => {
      const newTotal = prevTotal + 1;
      cart.updateQuantity(productId, optionId, newTotal);
      return newTotal;
    });
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 4,
          elevation: 3,
          backgroundColor: Color.BLACK,
          marginHorizontal: 12,
        }}
        onPress={handleMinus}
      >
        <AntDesign
          name="minus"
          size={12}
          style={{
            color: Color.WHITE,
          }}
        />
      </Pressable>
      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          width: 40,
          height: 34,
          backgroundColor: Color.WHITE,
          borderWidth: 1,
          borderColor: Color.BLACK,
        }}
      >
        <Text
          style={{
            color: Color.BLACK,
          }}
        >
          {total}
        </Text>
      </Pressable>

      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 4,
          elevation: 3,
          backgroundColor: Color.BLACK,
          marginHorizontal: 12,
        }}
        onPress={handlePlus}
      >
        <AntDesign
          name="plus"
          size={12}
          style={{
            color: Color.WHITE,
          }}
        />
      </Pressable>
    </View>
  );
}
