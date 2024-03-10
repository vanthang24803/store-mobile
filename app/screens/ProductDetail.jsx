import axios from "axios";
import React, { useState } from "react";
import Product from "../components/Product";
import { API_URL } from "@env";

export default function ProductDetail({ route }) {
  const { productId } = route.params;

  const [product, setProduct] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(`${API_URL}/api/product/${productId}`);

    if (response.status == 200) {
      setProduct(response.data);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return <>{product && <Product product={product} />}</>;
}
