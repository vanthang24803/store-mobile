import React from "react";
import { Text, View , StyleSheet } from "react-native";
import Card from "./ui/Card";
import api from "../utils/api";

export default function More({ category }) {
  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    const response = await api.get(
      `/api/product?Category=${category}`
    );

    if (response.status == 200) {
      setData(response.data);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <View
      style={{
        marginTop: 20,
        marginBottom: 70,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 16,
          marginBottom: 4,
        }}
      >
        Sản phẩm có liên quan
      </Text>
      <View style={styles.container}>
        {data.map((product, index) => (
          <View key={index} style={styles.product}>
            <Card product={product} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      marginTop: 8,
      flexDirection: "row",
      flexWrap: "wrap",
    },
    product: {
      width: "50%",
      padding : 4,
    },
  });