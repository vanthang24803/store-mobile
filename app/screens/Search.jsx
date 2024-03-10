import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchComponent from "../components/Search";

export default function Search() {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <SafeAreaView>
      <SearchComponent search={searchValue} setSearch={setSearchValue} />
    </SafeAreaView>
  );
}
