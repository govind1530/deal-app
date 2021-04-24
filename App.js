/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Home from './Src/Screens/Home/Home';
import Crousel from './Src/Screens/crousel';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './Src/Routes/Routes';
const App = () => {
  return (
    
    <NavigationContainer>
      <BottomTab/>
    </NavigationContainer>
  );
};
export default App;
