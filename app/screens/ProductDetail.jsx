import api from "../utils/api";
import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, RefreshControl } from "react-native";
import Product from "../components/Product";

export default function ProductDetail({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    const response = await api.get(`/api/product/${productId}`);
    if (response.status == 200) {
      setProduct(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {product && <Product product={product} />}
    </ScrollView>
  );
}
