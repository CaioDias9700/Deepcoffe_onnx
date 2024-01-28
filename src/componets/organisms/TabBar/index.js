import React, { useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, SplashScreen, New, Save , Class, User, Treatment, Slider, CameraScreen} from "../../../screens";
import { Entypo, Feather } from "@expo/vector-icons";
import { ButtonNew } from '../../atoms';


const HOME_ICON = "home";
const PROFILE_ICON = "user";

const Tab = createBottomTabNavigator();

export const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          display: "flex",
          backgroundColor: "#121212",
          paddingBottom: 5,
          paddingTop: 5,
          height: 55,
        },
        tabBarActiveTintColor: "#FFF",
        borderTopColor: "#191970",
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          headerShown: true,
          headerTintColor: '#F7F7F7',
          headerStyle: {
            backgroundColor: '#121212',
          },
          tabBarIcon: ({ size, color }) => (
            <Entypo name={HOME_ICON} size={size} color={color} />
          ),
          unmountOnBlur: true, // Adiciona esta propriedade
        }}
      />
      <Tab.Screen
        name="Novo"
        component={New}
        options={{
          tabBarStyle:{display:'none'},
          tabBarLabel: "",
          headerShown: true,
          headerTintColor: '#F7F7F7',
          headerStyle: {
            backgroundColor: '#121212',
          },
          tabBarIcon: ({ focused, size, color }) => (
            <ButtonNew size={20}></ButtonNew>
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={CameraScreen}
        options={{
          headerShown: true,
          headerTintColor: '#F7F7F7',
          headerStyle: {
            backgroundColor: '#121212',
          },
          tabBarIcon: ({ size, color }) => (
            <Feather name={PROFILE_ICON} size={size} color={color} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Class"
        component={Class}
        options={{
          headerTintColor: '#F7F7F7',
          headerStyle: {
            backgroundColor: '#121212',
          },
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
};
