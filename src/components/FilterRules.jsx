import React, { PropTypes, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Text, ScrollView, StyleSheet } from "react-native";
import actions from "../actions";

const FilterRules = () => {
  const rules = useSelector(state => state.filterRules.data);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("dispatch fetch filter...");
    dispatch(actions.fetchFilterRules());
  }, []);

  return (
    <ScrollView>
      {rules.map(rule => (
        <Text key={rule.id}>{rule.name}</Text>
      ))}
      <Text>{JSON.stringify(rules)}</Text>
    </ScrollView>
  );
};

export default FilterRules;
