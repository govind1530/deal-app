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
const imageW = width * 0.9;
const imageH = imageW * 0.5;

const Crousel = ({data}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
    const renderImage = item => {
      return (
        <TouchableOpacity
          style={styles.coursalImageMainView}
          //    onPress={() => handleDownload(item.item)}
        >
          <Image source={{uri: item.item}} style={styles.coursalImage} />
        </TouchableOpacity>
      );
    };
    return (
      <View style={{height:200}}>
        <Animated.FlatList
          data={data}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          keyExtractor={(item, index) => {
            item + index;
          }}
          renderItem={renderImage}
        />
      </View>
    );
}
const styles = StyleSheet.create({
  
  coursalImage: {
    width: imageW,
    height: imageH,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  coursalImageMainView: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    top: 7,
    //   borderWidth: 1,
    // borderColor:'red'
  },
});

export default Crousel;