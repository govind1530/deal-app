import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import faker from 'faker';


faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      'women',
      'men',
    ])}/${faker.datatype.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE  + SPACING *3;
const bg = `https://images.pexels.com/photos/2027697/pexels-photo-2027697.jpeg`;


const AnimatedFlatList = ({couponlist}) => {
  const [loading, setLoading] = React.useState(false);
  const loadStart = e => {
    setLoading(true);
  };

  const loadEnd = e => {
    setLoading(false);
  };
  const FastImages = (uri) => {
    return (
      <View style={{margin:10}}>
        <View style={{justifyContent:'center',alignItems: 'center'}}>
          <FastImage
            style={{width: 300, height: 150, borderRadius: 10}}
            source={{
              uri: uri ?uri:'',
              priority: FastImage.priority.normal,
            }}
           // resizeMode={FastImage.resizeMode.contain}
            onLoadStart={e => loadStart(e)}
            onLoadEnd={e => loadEnd(e)}
          />
        </View>
        {loading && (
          <ActivityIndicator
            style={[styles.activityIndicator]}
            animating={true}
            size="small"
            color={'#79FF33 '}
          />
        )}
      </View>
    );
  };
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const renderItem = ({ item ,index}) => {
    console.log('list',item)
    const inputRange = [
      -1,
      0,
      ITEM_SIZE * index,
       ITEM_SIZE * (index + 2)
    ];
      const opacityInputRange = [
      -1,
      0,
      ITEM_SIZE * index,
       ITEM_SIZE * (index + .5)
    ];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange:[1,1,1,0]
    })
    const opacity = scrollY.interpolate({
      inputRange:opacityInputRange,
      outputRange: [1, 1, 1, 0],
    });
     return (
       <Animated.View style={{flexDirection: 'row',
         padding: SPACING, marginBottom: SPACING, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.8)',
         shadowColor: '#000',
         shadowOffset: {
           width: 0,
           height:10,
         },
         shadowOpacity: 0.3,
         shadowRadius: 20,
         transform: [{ scale }],
         opacity,
         borderWidth:1
       }}>
         
         {/* <Image
           source={{uri: item?.image}}
           style={{width: AVATAR_SIZE, height: AVATAR_SIZE,marginRight: SPACING/2,borderRadius:AVATAR_SIZE}}
         /> */}
         <View>
           <Text style={{fontSize:22,fontWeight:'700'}}>{item?.name}</Text>
           <Text style={{fontSize:16,opacity:0.7}}>{item?.jobTitle}</Text>
           <Text style={{fontSize:14,opacity:0.8,color:'#0099cc'}}>{item?.email}</Text>
         </View>
       </Animated.View>
     );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar hidden />
      {/* <Image
        source={{ uri: bg }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
      /> */}
      <Animated.FlatList
        data={couponlist}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {useNativeDriver:true}
        )}
        contentContainerStyle={{padding:SPACING,paddingTop:StatusBar.currentHeight || 42}}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AnimatedFlatList

{/* <Image
               source={{uri: item?.image}}
               style={{width: AVATAR_SIZE, height: AVATAR_SIZE,marginRight: SPACING/2,borderRadius:AVATAR_SIZE}}
             /> */}