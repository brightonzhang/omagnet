import React from "react";
import { connect } from "react-redux";

import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { SearchBar } from "react-native-elements";

import FilterRules from "../components/FilterRules";
import MagnetBrief from "../components/MagnetBrief";
import actions from "../actions";
import {
  SEARCH_INIT,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from "../constants/searchStatus";

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

    let magnets;
    switch (this.props.magnets.status) {
      case SEARCH_REQUEST:
        magnets = <ActivityIndicator size="large" />;
        break;

      case SEARCH_SUCCESS: {
        let list = null;
        let total = 0;
        const data = this.props.magnets[
          this.props.rules[this.state.activeRule].id
        ];
        if (data) {
          total = data.length;
          list = data.map((magnet, index) => (
            <MagnetBrief info={magnet} key={index} />
          ));
        }

        magnets = (
          <ScrollView style={{ flex: 1 }}>
            <Text>{`共搜索到${total}条记录`}</Text>
            {list}
          </ScrollView>
        );
        break;
      }

      case SEARCH_FAILURE:
        magnets = <Text>出错了。。。</Text>;
        break;

      default:
        magnets = null;
        break;
    }

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
        {magnets}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    rules: state.filterRules.data,
    magnets: state.magnets
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
