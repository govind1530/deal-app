import React from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet,ScrollView} from 'react-native';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';
const CouponDetails = () =>{
    const [copiedText, setCopiedText] = React.useState('');
    const copyCouponCode = () =>{
        Toast.show({
            text2: 'Coupon25 is copy to clipboard 👋'
          });
        Clipboard.setString('Coupon25');
        const text =Clipboard.getString()
        console.log( text);
    }
    return(
        
        <View style={styles.container}>
            <ScrollView
              contentContainerStyle={{ flexGrow:1 }}
              showsVerticalScrollIndicator={false}
          >
            <View style={{borderWidth:1,justifyContent: 'center',alignItems: 'center',marginHorizontal:30,marginTop:30,borderColor:'#FF4500'}}>
            <Image
            source={{uri: 'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200'}}
            style={{width:'100%',height:150}}
            />
            </View>

            <View style={{width:'95%',marginHorizontal:10,marginTop:50}}>
            <Text style={{textAlign:"center"}}>
            Alternatively referred to as promo code, a coupon code is a special series of characters used on e-commerce websites to get a discounted price or limited offer on an order.
            </Text>
            </View>

           
            </ScrollView>
            <View style={{width:'100%',alignItems: 'center',marginBottom:5}}>
                <Text style={{marginBottom:5}}>Tap to copy code</Text>
            <TouchableOpacity
            style={styles.couponButton}
            onPress={() =>copyCouponCode()}
            >
                <Text style={{color:"#2F4F4F"}}>Coupon25</Text>
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