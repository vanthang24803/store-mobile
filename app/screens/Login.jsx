import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Color from "../constant/Color";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Pressable,
} from "react-native";
import { FontAwesome6, FontAwesome, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import authStore from "../../hooks/store-auth";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);
  const [loading, setLoading] = useState(false);

  const router = useNavigation();
  const auth = authStore();

  const handlerLogin = () => {
    setLoading(true);
    try {
      auth.login(email, password);

      if (auth.isLogin) {
        router.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: Color.BLACK,
            marginHorizontal: 12,
            lineHeight: 35,
            marginTop: 20,
          }}
        >
          Welcome
        </Text>
        <Text style={styles.heading}>Back!</Text>
      </View>
      <View
        style={{
          marginTop: 40,
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity>
            <FontAwesome6 name="user-large" size={18} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.searchWrapper}>
            <TextInput
              value={email}
              placeholder="Email"
              style={styles.input}
              onChangeText={(value) => setEmail(value)}
            />
          </View>
        </View>
        <View style={styles.container}>
          <TouchableOpacity>
            <FontAwesome name="lock" size={25} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.searchWrapper}>
            <TextInput
              value={password}
              onChangeText={(value) => setPassword(value)}
              placeholder="Password"
              style={styles.input}
              secureTextEntry={isPasswordVisible}
            />
          </View>
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Entypo
              name={isPasswordVisible ? "eye" : "eye-with-line"}
              size={20}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Pressable
        onPress={handlerLogin}
        style={{
          height: 55,
          backgroundColor: loading ? Color.Neutral : Color.Primary,
          marginHorizontal: 12,
          marginTop: 30,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: Color.WHITE,
            fontWeight: "bold",
          }}
        >
          Login
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    color: Color.BLACK,
    marginHorizontal: 12,
    lineHeight: 35,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: "#F5F5F5",
    height: 50,
    borderWidth: 0.25,
    borderColor: Color.GRAY,
  },
  icon: {
    marginHorizontal: 12,
    color: Color.GRAY,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    marginRight: 12,
    borderRadius: 12,
  },
  input: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 12,
  },
});
