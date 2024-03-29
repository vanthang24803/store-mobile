import { Ionicons, Feather } from "@expo/vector-icons";
import Color from "../constant/Color";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home, Profile, Search, Cart } from "../screens";
import { View, Text, StyleSheet } from "react-native";
import useCart from "../../hooks/use-cart";

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
  const cart = useCart();

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
                {focused && <Text style={styles.iconTextFocus}>Home</Text>}
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
                {focused && <Text style={styles.iconTextFocus}>Search</Text>}
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
                <Feather
                  name={"shopping-cart"}
                  size={24}
                  color={focused ? Color.BLACK : Color.GRAY}
                />
                {cart.items.length > 0 && (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>
                      {cart.totalItems() > 99 ? '...' : cart.totalItems()}
                    </Text>
                  </View>
                )}
                {focused && <Text style={styles.iconTextFocus}>Cart</Text>}
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
                {focused && <Text style={styles.iconTextFocus}>Profile</Text>}
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
  badgeContainer: {
    position: "absolute",
    right: -10,
    top: -4,
    backgroundColor: Color.RED,
    borderRadius: 8,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "600",
  },
});
