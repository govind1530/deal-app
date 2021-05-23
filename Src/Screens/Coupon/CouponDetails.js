import React from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet,ScrollView,ActivityIndicator} from 'react-native';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
const CouponDetails = (props) =>{
    let couponId = props.route.params?.couponId;
    const [loading, setLoading] = React.useState(false);
    const [copiedText, setCopiedText] = React.useState('');
    const [couponDetails,setCouponDetails] = React.useState()
    React.useEffect(() => {
        firestore()
        .collection('couponlist')
        .doc(couponId)
        .get()
        .then(documentSnapshot => {
          console.log('coupon details: ', documentSnapshot);
          setCouponDetails(documentSnapshot)
        });
      }, []);

      const loadStart = e => {
        setLoading(true);
      };
    
      const loadEnd = e => {
        setLoading(false);
      };
      const FastImages = (uri) => {
        return (
          <View style={{}}>
            <View style={{justifyContent:'center',alignItems: 'center'}}>
              <FastImage
              style={{width:290,height:140}}
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
    const copyCouponCode = (code) =>{
        Toast.show({
            text2: `${code} is copy to clipboard 👋'`
          });
        Clipboard.setString(code);
        const text =Clipboard.getString()
        console.log( text);
    }
    return(
        
        <View style={styles.container}>
            <ScrollView
              contentContainerStyle={{ flexGrow:1 }}
              showsVerticalScrollIndicator={false}
          >
            <View style={{height:142,width:292,borderWidth:1,justifyContent: 'center',marginHorizontal:30,marginTop:30,borderColor:'#FF4500'}}>
            {FastImages(couponDetails?._data?.Image)}
            </View>

            <View style={{width:'95%',marginHorizontal:10,marginTop:50}}>
            <Text style={{textAlign:"center"}}>
          {couponDetails?._data?.Description}
            </Text>
            </View>

           
            </ScrollView>
            <View style={{width:'100%',alignItems: 'center',marginBottom:5}}>
                <Text style={{marginBottom:5}}>Tap to copy code</Text>
            <TouchableOpacity
            style={styles.couponButton}
            onPress={() =>copyCouponCode(couponDetails?._data?.code)}
            >
                <Text style={{color:"#2F4F4F"}}>{couponDetails?._data?.code}</Text>
            </TouchableOpacity>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
       // alignItems: 'center',
        //justifyContent:'space-evenly'
    },
    couponButton:{
        height:50,
        borderWidth: 1,
        width:'85%',
        justifyContent:"center",
        alignItems: 'center',
        borderRadius:5,
        backgroundColor:'#F4A460',
        borderColor:'#BC8F8F',
        //marginTop:250
    }
})

export default CouponDetails