import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Appbar from "../components/Appbar";

import SearchComponent from "../components/Search";
import Carousel from "../components/Carousel";
import axios from "axios";
import Heading from "../components/ui/Heading";
import ListProduct from "../components/ListProduct";
import { API_URL } from "@env";

export default function Home() {
  const [billboard, setBillboard] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  const fetchData = async () => {
    const response = await axios.get(`${API_URL}/api/product/billboard`);
    if (response.status == 200) {
      setBillboard(response.data);
    }
  };

  const fetchProduct = async () => {
    const response = await axios.get(`${API_URL}/api/product?Filter=Lasted`);
    if (response.status == 200) {
      setProducts(response.data);
    }
  };

  React.useEffect(() => {
    fetchData();

    fetchProduct();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Appbar />
      </View>
      <ScrollView>
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
