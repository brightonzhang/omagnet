import React from "react";
import { connect } from 'react-redux'

import { View } from "react-native";

import { SearchBar } from "react-native-elements";

import FilterRules from "../components/FilterRules";
import actions from "../actions";

class Home extends React.Component {
  state = {
    search: ""
  };

  updateSearch = search => {
    this.setState({ search });
  };

  handleChangeRule = index => {
    console.log(`handleChangeRule ${index}`);
    this.searchMagnet({ rule: rules[index], keyword: "ip.man.4" });
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

const mapStateToProps = state => {
  return {
    rules: state.filterRules.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchMagnet: ({ rule, keyword }) => {
      dispatch(actions.searchMagnet({ rule, keyword }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
