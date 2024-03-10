import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Color from "../constant/Color";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home, Profile, Search, Cart } from "../screens";
import { View, Text, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 70,
  },
};

export default function BottomNavigation() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.iconContainer}>
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={24}
                  color={focused ? Color.BLACK : Color.GRAY}
                />
                <Text
                  style={focused ? styles.iconTextFocus : styles.iconTextBase}
                >
                  Home
                </Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.iconContainer}>
                <Ionicons
                  name={"search-sharp"}
                  size={24}
                  color={focused ? Color.BLACK : Color.GRAY}
                />
                <Text
                  style={focused ? styles.iconTextFocus : styles.iconTextBase}
                >
                  Search
                </Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.iconContainer}>
                <Ionicons
                  name={focused ? "cart" : "cart-outline"}
                  size={24}
                  color={focused ? Color.BLACK : Color.GRAY}
                />
                <Text
                  style={focused ? styles.iconTextFocus : styles.iconTextBase}
                >
                  Cart
                </Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.iconContainer}>
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={24}
                  color={focused ? Color.BLACK : Color.GRAY}
                />
                <Text
                  style={focused ? styles.iconTextFocus : styles.iconTextBase}
                >
                  Profile
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconTextFocus: {
    fontSize: 11,
    fontWeight: "600",
    color: Color.BLACK,
  },
  iconTextBase: {
    fontSize: 11,
    fontWeight: "600",
    color: Color.GRAY,
  },
});