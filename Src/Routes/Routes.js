import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Home/Home'
import Coupon from '../Screens/Coupon/Coupon';
import CouponDetails from '../Screens/Coupon/CouponDetails';
import Splash from '../Screens/Splash/Splash';
import SignInScreen from '../Screens/SignIn/Signin';
import Store from '../Screens/Store/Store';
import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    //    activeColor="#fff"
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="home-outline" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Coupon"
      component={Coupon}
      options={{
        tabBarLabel: 'Coupon',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({color}) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Store"
      component={Store}
      options={{
        tabBarLabel: 'Store',
        tabBarColor: '#694fad',
        tabBarIcon: ({color}) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Explore"
      component={Home}
      options={{
        tabBarLabel: 'Explore',
        tabBarColor: '#d02860',
        tabBarIcon: ({color}) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerShown: false,
    }}
    initialRouteName="Splash">
    <HomeStack.Screen name="Splash" component={Splash} />
    <HomeStack.Screen name="Signin" component={SignInScreen} />
    <HomeStack.Screen name="CouponDetails" component={CouponDetails} />
    <HomeStack.Screen
      name="Home"
      component={MainTabScreen}
      options={{
        title: 'Overview',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            //    onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

export default HomeStackScreen;

