import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, View, StyleSheet, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Appbar from "../components/Appbar";

import SearchComponent from "../components/Search";
import Carousel from "../components/Carousel";
import Heading from "../components/ui/Heading";
import ListProduct from "../components/ListProduct";
import api from "../utils/api";

export default function Home() {
  const [billboard, setBillboard] = useState([]);
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    const response = await api.get(`/api/product/billboard`);
    if (response.status == 200) {
      setBillboard(response.data);
    }
  };

  const fetchProduct = async () => {
    const response = await api.get(`/api/product?Filter=Lasted`);
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
