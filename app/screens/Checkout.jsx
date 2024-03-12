import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";

import Color from "../constant/Color";
import useCart from "../../hooks/use-cart";
import { formatPrice, price } from "../utils/format";
import { useNavigation } from "@react-navigation/native";
import CheckoutForm from "../components/CheckoutForm";

export default function Checkout() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState();

  const cart = useCart();
  const router = useNavigation();

  const handleSubmit = async () => {
    // const jsonReq = {
    //   name: name,
    //   address: address,
    //   phone: phone,
    //   payment : payment
    // };
    router.navigate("Home");
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 20,
              marginHorizontal: 15,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Xác nhận đơn hàng
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginHorizontal: 15,
              fontWeight: "400",
              color: Color.GRAY,
            }}
          >
            Đơn hàng của bạn có {""}
            <Text
              style={{ fontWeight: "bold", color: Color.BLACK, fontSize: 15 }}
            >
              {cart.totalItems()}
            </Text>{" "}
            sản phẩm
          </Text>

          <CheckoutForm
            name={name}
            setName={setName}
            address={address}
            setAddress={setAddress}
            phone={phone}
            setPhone={setPhone}
            setPayment={setPayment}
          />

          <View
            style={{
              height: 0.25,
              backgroundColor: Color.GRAY,
              margin: 12,
            }}
          ></View>

          <ScrollView
            style={{
              marginBottom: 50,
            }}
          >
            <View style={{ marginBottom: 20 }}>
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
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "500",
                        color: Color.GRAY,
                        marginTop: 2,
                      }}
                    >
                      x {item.quantity}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            elevation: 0,
            height: 60,
          }}
        >
          <View
            style={{
              height: 0.25,
              backgroundColor: Color.GRAY,
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
            <AntDesign
              name="back"
              size={24}
              color="black"
              onPress={() => router.goBack()}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text>
                Thành tiền :{" "}
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  {payment == "COD"
                    ? price(cart.totalPrice() + 35000)
                    : price(cart.totalPrice())}
                  ₫
                </Text>
              </Text>
              <Pressable
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  borderRadius: 6,
                  elevation: 4,
                  backgroundColor: Color.Primary,
                  marginHorizontal: 8,
                }}
                onPress={handleSubmit}
              >
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 20,
                    fontWeight: "600",
                    letterSpacing: 0.25,
                    color: "white",
                  }}
                >
                  Đặt hàng
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
