import React from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Color from "../constant/Color";
import { useNavigation } from "@react-navigation/native";

const SearchComponent = ({ search, setSearch }) => {
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Feather name="search" size={24} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.searchWrapper}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          onPressIn={() => navigator.navigate("Search")}
          placeholder="Search your product..."
          style={styles.inputSearch}
        />
      </View>
      <TouchableOpacity>
        <Ionicons name="camera" size={24} style={styles.iconCamera} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginVertical: 16,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: Color.Neutral,
    height: 50,
  },
  icon: {
    marginHorizontal: 10,
    color: Color.GRAY,
  },
  iconCamera: {
    marginHorizontal: 10,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: Color.Neutral,
    marginRight: 12,
    borderRadius: 12,
  },
  inputSearch: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 12,
  },
});

export default SearchComponent;
