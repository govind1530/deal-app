import React from 'react';
import AnimatedFlatList from '../../components/AnimatedFlatList/AnimatedFlatList';
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
    ActivityIndicator,
    Linking
  } from 'react-native';
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
const SPACING = 10;
const AVATAR_SIZE = 100;
const ITEM_SIZE = AVATAR_SIZE  + SPACING *2;
const Coupon = ({navigation}) => {
    const [loading, setLoading] = React.useState(false);
    const [couponList,setCouponList] = React.useState()
    const scrollY = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        const subscriber = firestore()
          .collection('couponlist')
          .onSnapshot(documentSnapshot => {
            console.log('couponlist docs: ', documentSnapshot?._docs);
            setCouponList(documentSnapshot?._docs);
            //console.log('couponlist changes: ',documentSnapshot?._changes);
          });
    
        // Stop listening for updates when no longer required
        return () => subscriber();
      }, []);
      
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
               style={{width: 90, height: 90,marginRight: 10,borderRadius:10}}
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


      const openUrl = (url) =>{
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              console.log("Don't know how to open URI: " +url);
            }
          });
      }
     
   const navigateCouponDetails = (id) =>{
console.log('id',id)
navigation.navigate('CouponDetails',{couponId:id})
      }
     
      const renderItem = ({ item ,index}) => {
        //console.log('list',item)
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
           <Animated.View style={{
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
               <View style={{flexDirection:'row'}}>
             {FastImages(item?._data?.Image)}
             
             <View>
               <Text style={{fontSize:22,fontWeight:'700'}}>{item?._data?.Name}</Text>
               <Text style={{fontSize:16,opacity:0.7}}>{item?._data?.code}</Text>
               <Text style={{fontSize:14,opacity:0.8,color:'#0099cc'}}>Expiry Date: {item?._data?.ExpiryDate}</Text>
             </View>
             </View>
            <View style={{width:'100%',justifyContent: 'center',alignItems: 'center'}}>
                <Text numberOfLines={3}>{item?._data?.Description}</Text>
            </View>
             <View style={{justifyContent:'center',alignItems: 'center',marginLeft:20}}>
             <TouchableOpacity
             onPress={()=>item?._data?.Url?openUrl(item?._data?.Url):navigateCouponDetails(item?._ref?._documentPath?._parts[1])}
              style={{marginTop:10,width:'40%',height:25,backgroundColor:"rgb(0,0,0)",borderRadius: 5,justifyContent:'center'}}>
    <Text style={{color:'rgb(255,255,255)',textAlign:"center",justifyContent: 'center',alignSelf:'center',fontSize:12}}>{item?._data?.Url?'Buy Now':'View Details'}</Text>
  </TouchableOpacity>
  </View>
           </Animated.View>
         );
      }
      return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <StatusBar hidden />
          <Animated.FlatList
            data={couponList}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {useNativeDriver:true}
            )}
            contentContainerStyle={{padding:SPACING,paddingTop:StatusBar.currentHeight || 42}}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    activityIndicator: {
      position: 'absolute',
      zIndex: 1,
      backgroundColor: 'transparent',
      left: 0,
      right: 0,
      bottom: 0,
    },
    flatListContainer:{
        width: '95%',
        marginHorizontal:10,
        borderWidth: 1,
        borderRadius:10,
        margin:15,
    }
  });

export default Coupon;