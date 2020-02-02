import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Icon } from "react-native-elements";

import Home from "../views/home";

import config from "../config/stack";

const HomeDrawerItem = createStackNavigator(
  {
    Home: {
      screen: Home,

      navigationOptions: ({ navigation }) => ({
        title: "Home",
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

HomeDrawerItem.navigationOptions = {
  drawerLabel: "Home",
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="home"
      size={30}
      iconStyle={{
        width: 30,
        height: 30
      }}
      type="material"
      color={tintColor}
    />
  )
};

export default HomeDrawerItem;
