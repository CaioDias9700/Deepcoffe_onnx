import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBar } from "../componets";
import { Home, New, SplashScreen } from "../screens";
import { Entypo, Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
export default function Routes() {
  return <TabBar></TabBar>;
}
