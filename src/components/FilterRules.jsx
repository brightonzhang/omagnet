import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";

import magnetwConfig from "../vendor/magnetw/config";
import actions from "../actions";

const styles = StyleSheet.create({
  container: {
    marginTop: 5
  },

  item: {
    height: 64,
    margin: 5,
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#000",
    borderRadius: 5,
    backgroundColor: "#ffffff"
  },

  activeItem: {
    borderColor: "red"
  },

  image: {
    marginTop: 5,
    width: 30,
    height: 30
  },

  name: {
    fontSize: 16
    // marginTop: 3
  }
});

const formatDefaultIcon = id => {
  const uri = `${magnetwConfig.icons.baseUrl}/${id}.${magnetwConfig.icons.extension}`;
  // console.log(uri);
  return uri;
};

const FilterRules = ({ onChange }) => {
  const [active, setActive] = useState(0);

  const rules = useSelector(state => state.filterRules.data);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("dispatch fetch filter...");
    dispatch(actions.fetchFilterRules());
  }, []);

  const handlePressItem = index => {
    // console.log(index);
    setActive(index);
    onChange(index);
  };

  return (
    <ScrollView style={styles.container} horizontal={true}>
      {rules.map((rule, index) => (
        <TouchableOpacity
          key={rule.id}
          onPress={() => handlePressItem(index)}
          style={[styles.item, active === index && styles.activeItem]}
        >
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: rule.icon || formatDefaultIcon(rule.id) }}
          />
          <Text style={styles.name}>{rule.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

FilterRules.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default FilterRules;
