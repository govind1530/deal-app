import React from 'react';
import { View, Text, Image, StyleSheet, Animated ,Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');
const imageW = width * 0.9;
const imageH = imageW * 0.5;
const DealOfTheDay = () => {
  const leftValue = React.useRef(new Animated.Value(500)).current;

  React.useEffect(() => {
    Animated.timing(leftValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <View style={styles.conatiner}>
      <Animated.View
        style={{
          transform: [{translateX: leftValue}],
          top:25,
          //flex: 1,
          //justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={styles.profilePic}
          source={{
            uri:
              'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
   // borderWidth: 1,
    //borderColor: 'red',
    //top:25
  },
  profilePic: {
    height: imageH,
    width: imageW,
    borderRadius: 16,
  },
});

export default DealOfTheDay;
