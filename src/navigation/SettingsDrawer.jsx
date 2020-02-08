import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Icon } from "react-native-elements";

import SettingsScreen from "../screens/SettingsScreen";

import config from "../config/stack";

const SettingsDrawerItem = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Settings",
        headerStyle: {
          borderBottomWidth: 0,
          backgroundColor: "#f5f5f5"
        },
        headerLeft: () => (
          <Icon
            name="menu"
            size={30}
            type="entypo"
            iconStyle={{ paddingLeft: 10 }}
            onPress={navigation.toggleDrawer}
          />
        )
      })
    }
  },
  config
);

SettingsDrawerItem.navigationOptions = {
  drawerLabel: "Settings",
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="cog"
      size={30}
      iconStyle={{
        width: 30,
        height: 30
      }}
      type="entypo"
      color={tintColor}
    />
  )
};

export default SettingsDrawerItem;
