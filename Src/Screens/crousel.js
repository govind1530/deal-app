import * as React from 'react';
import {
  Vibration,
  StatusBar,
  Easing,
  TextInput,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
  Text,
  View,
    StyleSheet,
  Image
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const {width, height} = Dimensions.get('window');
const colors = {
  black: '#323F4E',
  red: '#F76A6A',
  text: '#ffffff',
};

const timers = [...Array(13).keys()].map(i => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.9;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

export default function App() {
 const data = [
   'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
   'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
   'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
   'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
   'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
   'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
   'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
 ];

    const [duration, setDuration] = React.useState(timers[0]);
  const inputRef = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const timerAnimation = React.useRef(new Animated.Value(height)).current;
  const textInputAnimation = React.useRef(new Animated.Value(timers[0]))
    .current;
  const buttonAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const listner = textInputAnimation.addListener(({value}) => {
      inputRef?.current?.setNativeProps({
        text: Math.ceil(value).toString(),
      });
      console.log(Math.ceil(value).toString());
    });

    return () => {
      textInputAnimation.removeListener(listner);
      textInputAnimation.removeAllListeners();
    };
  });
  const animation = React.useCallback(() => {
    textInputAnimation.setValue(duration);
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(timerAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(textInputAnimation, {
          toValue: 0,
          duration: duration * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(timerAnimation, {
          toValue: height,
          duration: duration * 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      Vibration.cancel();
      Vibration.vibrate();
      Animated.timing(buttonAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
  }, [duration]);

  const buttonOpacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const buttonTranslateY = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const textOpacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const renderItems = ({item, index}) => {
    console.log(item);
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
          opacity,
          transform: [
            {
              scale,
            },
          ],
        }}>
        {/* <Animated.Text
          style={[
            styles.text,
            {
              opacity,
              transform: [
                {
                  scale,
                },
              ],
            },
          ]}>
          {item}
        </Animated.Text> */}
        <Image source={{uri: item}} style={{width: ITEM_SIZE, height: 150}} />
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            height,
            width,
            backgroundColor: colors.red,
            transform: [
              {
                translateY: timerAnimation,
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 100,
            opacity: buttonOpacity,
            transform: [
              {
                translateY: buttonTranslateY,
              },
            ],
          },
        ]}>
        <TouchableOpacity onPress={animation}>
          <View style={styles.roundButton} />
        </TouchableOpacity>
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          top: height / 3,
          left: 0,
          right: 0,
          flex: 1,
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            width: ITEM_SIZE,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            //   borderWidth: 1,
            //   borderColor: 'blue',
            bottom: -10,
            opacity: textOpacity,
          }}>
          <TextInput
            ref={inputRef}
            style={[styles.text]}
            defaultValue={duration.toString()}
          />
        </Animated.View>
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
          style={{flexGrow: 0, opacity: buttonOpacity}}
          snapToInterval={ITEM_SIZE}
          decelerationRate="fast"
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          onMomentumScrollEnd={ev => {
            const index = Math.round(
              ev.nativeEvent.contentOffset.x / ITEM_SIZE,
            );
            setDuration(timers[index]);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: colors.red,
  },
  text: {
    fontSize: ITEM_SIZE * 0.8,
    fontFamily: 'Menlo',
    color: colors.text,
    fontWeight: '900',
  },
});
