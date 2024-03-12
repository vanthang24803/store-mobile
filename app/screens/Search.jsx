import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Color from "../constant/Color";
import { useNavigation } from "@react-navigation/native";
import api from "../utils/api";
import { formatPrice, price } from "../utils/format";

export default function Search() {
  const router = useNavigation();

  const [searchValue, setSearchValue] = React.useState("");
  const [product, setProduct] = React.useState([]);

  const fetchData = async () => {
    const response = await api.get(`/api/product?Name=${searchValue}`);
    if (response.status == 200) {
      setProduct(response.data);
    }
  };

  React.useEffect(() => {
    if (searchValue) {
      fetchData();
    }
  }, [searchValue]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => {
      setSearchValue("");
      setRefreshing(false);
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity>
            <Feather name="search" size={24} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.searchWrapper}>
            <TextInput
              value={searchValue}
              onChangeText={(value) => setSearchValue(value)}
              placeholder="Search your product..."
              style={styles.inputSearch}
            />
          </View>
          <TouchableOpacity>
            <Ionicons name="camera" size={24} style={styles.iconCamera} />
          </TouchableOpacity>
        </View>
        {product.length > 0 && (
          <ScrollView
            style={{
              flexDirection: "column",
              margin: 10,
            }}
          >
            {product.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() =>
                    router.navigate("ProductDetail", {
                      productId: item.id,
                    })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginBottom: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: item.thumbnail,
                      }}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 10,
                        objectFit: "cover",
                      }}
                    />
                    <View
                      style={{
                        flexDirection: "column",
                        marginLeft: 8,
                        flexWrap: "wrap",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "500",
                          width: "70%",
                        }}
                      >
                        {item.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 2,
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
                            item.options[0].price,
                            item.options[0].sale
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
                          {price(item.options[0].price)}₫
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginVertical: 16,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: Color.Neutral,
    height: 50,
  },
  icon: {
    marginHorizontal: 10,
    color: Color.GRAY,
  },
  iconCamera: {
    marginHorizontal: 10,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: Color.Neutral,
    marginRight: 12,
    borderRadius: 12,
  },
  inputSearch: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 12,
  },
});
