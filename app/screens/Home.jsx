import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, View, StyleSheet, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Appbar from "../components/Appbar";

import SearchComponent from "../components/Search";
import Carousel from "../components/Carousel";
import axios from "axios";
import Heading from "../components/ui/Heading";
import ListProduct from "../components/ListProduct";

export default function Home() {
  const [billboard, setBillboard] = useState([]);
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    const response = await axios.get(
      ` https://08de-2402-800-61c4-a254-f89a-9ec7-6b11-ebdf.ngrok-free.app/api/product/billboard`
    );
    if (response.status == 200) {
      setBillboard(response.data);
    }
  };

  const fetchProduct = async () => {
    const response = await axios.get(
      ` https://08de-2402-800-61c4-a254-f89a-9ec7-6b11-ebdf.ngrok-free.app/api/product?Filter=Lasted`
    );
    if (response.status == 200) {
      setProducts(response.data);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    fetchProduct().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchData();
    fetchProduct();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Appbar />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SearchComponent />
        <Carousel billboard={billboard} />
        <Heading title="Sản phẩm mới cập nhật" />
        <ListProduct products={products} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22,
    marginTop: 12,
  },
});
