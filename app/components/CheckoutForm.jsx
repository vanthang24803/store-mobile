import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Color from "../constant/Color";
import { payments } from "../constant";
import { SelectList } from "react-native-dropdown-select-list";

export default function CheckoutForm({
  name,
  setName,
  address,
  setAddress,
  phone,
  setPhone,
  setPayment,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên khách hàng</Text>
      <TextInput
        style={styles.input}
        placeholder="Name..."
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.label}>Địa chỉ</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={(value) => setAddress(value)}
        placeholder="Address..."
      />
      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={(value) => setPhone(value)}
        placeholder="Phone..."
      />
      <Text
        style={{
          fontWeight: "bold",
          marginBottom: 10,
          marginTop: 4,
        }}
      >
        Phương thức vận chuyển
      </Text>

      <SelectList
        setSelected={(value) => setPayment(value)}
        data={payments}
        search={false}
        save="payment"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    borderWidth: 0.25,
    borderColor: Color.GRAY,
    height: 40,
    marginBottom: 4,
    borderRadius: 5,
    padding: 10,
  },
});
