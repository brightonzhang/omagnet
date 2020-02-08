import React from "react";
import { View } from "react-native";

import { SearchBar } from "react-native-elements";

import FilterRules from "../components/FilterRules";

class Home extends React.Component {
  state = {
    search: ""
  };

  updateSearch = search => {
    this.setState({ search });
  };

  handleChangeRule = index => {
    console.log(`handleChangeRule ${index}`);
  };

  render() {
    const { search } = this.state;

    return (
      <View>
        <SearchBar
          platform="android"
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />

        <FilterRules onChange={this.handleChangeRule} />
      </View>
    );
  }
}

export default Home;
