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
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import Color from "../constant/Color";
import { formatPrice, price } from "../utils/format";
import React, { useState } from "react";
import useCart from "../../hooks/use-cart";
import More from "./More";
export default function Product({ product }) {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);


  const [show, setShow] = useState(false);

  const [option, setOption] = useState(product?.options[0]);
  const [total, setTotal] = useState(1);

  const handleOptionChange = (id) => {
    const newOption = product?.options.find((option) => option.id === id);
    setOption(newOption);
  };

  const cart = useCart();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 45,
            left: 10,
            zIndex: 999,
          }}
          onPress={() => navigation.goBack()}
        >
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Color.WHITE,
            }}
          >
            <Ionicons name="arrow-back" size={20} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 45,
            right: 15,
            zIndex: 999,
          }}
          onPress={() => navigation.navigate("Cart")}
        >
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Color.WHITE,
            }}
          >
            <Feather name="shopping-cart" size={18} color="black" />
          </View>
          <View
            style={{
              position: "absolute",
              right: -5,
              top: -4,
              backgroundColor: Color.RED,
              borderRadius: 8,
              width: 18,
              height: 18,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 10,
                fontWeight: "600",
              }}
            >
              {cart.totalItems()}
            </Text>
          </View>
        </TouchableOpacity>

        <Swiper
          loop={false}
          showsPagination={false}
          onIndexChanged={(index) => setCurrentIndex(index)}
          style={{
            height: 320,
          }}
        >
          {product.images.map((item, index) => (
            <Image
              key={index}
              style={{
                aspectRatio: 1 / 1,
              }}
              source={{
                uri: item.url,
              }}
            />
          ))}
        </Swiper>

        <View
          style={{
            backgroundColor: Color.GRAY,
            position: "absolute",
            right: 20,
            top: 280,
            alignItems: "center",
            justifyContent: "center",
            padding: 5,
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: Color.WHITE,
              zIndex: 999,
            }}
          >
            {currentIndex + 1}/{product.images.length}
          </Text>
        </View>

        <ScrollView
          style={{
            marginTop: 10,
            marginHorizontal: 10,
          }}
        >
          <View style={styles.row}>
            <Text
              style={{
                width: 220,
                marginTop: 10,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {product.name}
            </Text>
            {option?.status ? (
              <Text
                style={{
                  color: Color.Primary,
                  fontWeight: "bold",
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
              <Text
                style={{
                  fontSize: 17,
                  color: Color.RED,
                  fontWeight: "bold",
                  marginRight: 10,
                }}
              >
                {formatPrice(option?.price, option?.sale)}₫
              </Text>
              {option.sale > 0 && (
                <Text
                  style={{
                    color: Color.GRAY,
                    fontWeight: "500",
                    textDecorationLine: "line-through",
                    fontSize: 14,
                  }}
                >
                  {price(option?.price)}₫
                </Text>
              )}
            </View>
            {option.sale > 0 && (
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
                  -{option?.sale}%
                </Text>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            {product?.options.map((item, index) => (
              <View
                style={{
                  marginTop: 10,
                  marginRight: 10,
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

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                marginRight: 20,
              }}
            >
              Số lượng:
            </Text>
            <Pressable
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 4,
                elevation: 3,
                backgroundColor: total > 1 ? Color.BLACK : Color.GRAY,
                marginHorizontal: 12,
              }}
              onPress={() => {
                if (total > 1) {
                  setTotal(total - 1);
                }
              }}
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
              onPress={() => setTotal(total + 1)}
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

          <View
            style={{
              marginTop: 20,
            }}
          >
            <View
              style={{
                width: "100%",
                height: 0.5,
                backgroundColor: Color.GRAY,
                marginBottom: 10,
              }}
            ></View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 4,
              }}
            >
              Mô tả sản phẩm
            </Text>
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <Text style={styles.info}>
                - Tác giả: {product.information?.author}
              </Text>
              <Text style={styles.info}>
                - Dịch giả: {product.information?.translator}
              </Text>
              <Text style={styles.info}>
                - Thể loại: {product.information?.category}
              </Text>
              <Text style={styles.info}>
                - Ngày phát hành: {product.information?.released}
              </Text>
              <Text style={styles.info}>
                - Đơn vị phát hành: {product.information?.publisher}
              </Text>

              <Text style={styles.info}>
                {"- Quà tặng: " + product.information?.gift + " "}
              </Text>
              {!show ? (
                <Pressable onPress={() => setShow(true)}>
                  <Text
                    style={{
                      color: Color.Primary,
                      fontWeight: "bold",
                      marginHorizontal: 6,
                    }}
                  >
                    xem thêm...
                  </Text>
                </Pressable>
              ) : (
                <>
                  <Text style={styles.info}>
                    - Giới thiệu: {product.information.introduce}
                  </Text>
                  <Pressable onPress={() => setShow(false)}>
                    <Text
                      style={{
                        color: Color.Primary,
                        fontWeight: "bold",
                        marginHorizontal: 6,
                      }}
                    >
                      ...thu gọn
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
                      

       <More category={product.categories[0].name} />

          
        </ScrollView>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 70,
        }}
      >
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 0,
            flex: 1,
            elevation: 3,
            backgroundColor: option.status ? Color.Primary : Color.GRAY,
            marginTop: 20,
          }}
          onPress={() => {
            if (option.status) {
              cart.addItems(product, total);
            }
          }}
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
            Thêm vào giỏ hàng
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    letterSpacing: 0.25,
    color: "white",
  },
  info: { fontSize: 13, marginBottom: 2 },
});
