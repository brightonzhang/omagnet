import React from "react";
import { connect } from "react-redux";

import { ActivityIndicator, ScrollView, View } from "react-native";

import { SearchBar } from "react-native-elements";

import FilterRules from "../components/FilterRules";
import MagnetBrief from "../components/MagnetBrief";
import actions from "../actions";
import log from "../utils/log";

class Home extends React.Component {
  state = {
    search: "",
    activeRule: 0
  };

  updateSearch = search => {
    this.setState({ search });
  };

  submitSearch = (keyword, activeRule) => {
    console.log(`submitSearch ${keyword}`);
    if (keyword) {
      this.props.searchMagnet({
        keyword,
        rule: this.props.rules[activeRule]
      });
    }
  };

  handleEndEditing = e => {
    this.submitSearch(e.nativeEvent.text, this.state.activeRule);
  };

  handleChangeRule = index => {
    console.log(`handleChangeRule ${index}`);
    this.setState({ activeRule: index });
    this.submitSearch(this.state.search, index);
  };

  render() {
    const { search } = this.state;

    let magnets = this.props.loading ? (
      <ActivityIndicator size="large" />
    ) : (
      this.props.magnets.map((magnet, index) => (
        <MagnetBrief info={magnet} key={index} />
      ))
    );

    return (
      <View style={{ flex: 1 }}>
        <SearchBar
          platform="android"
          placeholder="请输入想要搜索的文件名"
          onChangeText={this.updateSearch}
          onEndEditing={this.handleEndEditing}
          value={search}
        />
        <View>
          <FilterRules onChange={this.handleChangeRule} />
        </View>
        <ScrollView style={{ flex: 1 }}>{magnets}</ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    rules: state.filterRules.data,
    magnets: state.magnets.data,
    loading: state.magnets.loading
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
