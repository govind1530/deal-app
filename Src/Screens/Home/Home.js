import React from 'react';
import {
  View,
  Text,
  Animated,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  PermissionsAndroid,
  Alert,
  Platform,
  ScrollView
} from 'react-native';
import {OpacityCrousel,Crousel,DealOfTheDay} from '../../components/index'
const { height, width } = Dimensions.get('screen');

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
];

const imageW = width * 0.9;
const imageH = imageW * 0.5;

const HomeScreen = () => {
    
    return (
      <ScrollView
              contentContainerStyle={{ flexGrow:1 }}
          >
    <View style={styles.Container}>
      {/* <StatusBar hidden /> */}
          
        <Crousel data={data} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <Text style={{color: '#b92b27'}}>All Categories</Text>
          <TouchableOpacity>
            <Text style={{color: '#1565C0'}}>View all</Text>
          </TouchableOpacity>
        </View>
        <OpacityCrousel data={data} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <Text style={{color: '#8E2DE2'}}>All Coupons</Text>
          <TouchableOpacity>
            <Text style={{color: '#4A00E0'}}>View all</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              color: '#00b09b',
              textAlign: 'center',
              fontSize: 20,
              top: 15,
            }}>
            Deal Of The Day
          </Text>
          <DealOfTheDay />
        </View>
      
    </View>
        </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
        //backgroundColor: '#000',
        paddingBottom:50
  },
});

export default HomeScreen;
