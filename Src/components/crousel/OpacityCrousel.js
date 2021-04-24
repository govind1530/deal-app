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
} from 'react-native';
const {height, width} = Dimensions.get('screen');
const ITEM_SIZE = width * 0.9;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;
const imageW = width * 0.9;
const imageH = imageW * 0.5;
const OpacityCrousel = ({data}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
const buttonAnimation = React.useRef(new Animated.Value(0)).current;
    
  const buttonOpacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
const renderItems = ({item, index}) => {
      const inputRange = [
        (index - 1) * ITEM_SIZE,
        index * ITEM_SIZE,
        (index + 1) * ITEM_SIZE,
      ];

      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.4, 1, 0.4],
      });

      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.7, 1, 0.7],
      });
      return (
        <Animated.View
          style={{
            width: ITEM_SIZE,
            justifyContent: 'center',
            alignItems: 'center',
            top: 10,
            opacity,
            transform: [
              {
                scale,
              },
            ],
          }}>
          <Image
            source={{uri: item}}
            style={{width: ITEM_SIZE, height: imageH, borderRadius: 16}}
          />
        </Animated.View>
      );
    };
  return (
    <View style={{height: 200}}>
      <Animated.FlatList
        data={data}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => {
          item.toString();
        }}
        renderItem={renderItems}
        contentContainerStyle={{paddingHorizontal: ITEM_SPACING}}
        style={{opacity: buttonOpacity}}
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: true,
          },
        )}
        // onMomentumScrollEnd={ev => {
        //   console.log('ev', ev.nativeEvent.contentOffset.x);
        //   //   const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
        //   //   setDuration(timers[index]);
        // }}
      />
    </View>
  );
}

export default OpacityCrousel;