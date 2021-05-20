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

const couponData=[
  {
    name:'deal-1 hjkhkjhkjhkjhgfghfhgfghfghghfghfhgfhgfghfghfghfhgfghfhgfhgfghfghfhgfghf',
    price:199,
    action:'Buy Now',
    description:'deal-1 description',
    image:'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  },
  {
    name:'deal-2',
    price:299,
    action:'Buy',
    description:'deal-2 description',
    image:'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  },
  {
    name:'deal-3 kladjklsdjksdjkasdjkl',
    price:399,
    action:'Buy',
    description:'deal-3 description',
    image:'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  },
  {
    name:'deal-4',
    price:499,
    action:'View Details',
    description:'deal-4 description',
    image:'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200'
  }
]

const imageW = width * 0.9;
const imageH = imageW * 0.5;

const HomeScreen = ({navigation}) => {
    

  const categoryButton =(text) =>{
return(
  <TouchableOpacity style={{width:'27%',height:25,backgroundColor:"rgb(0,0,0)",borderRadius: 5,justifyContent:'center'}}>
    <Text style={{color:'rgb(255,255,255)',textAlign:"center",justifyContent: 'center',alignSelf:'center',fontSize:12}}>{text}</Text>
  </TouchableOpacity>
)
  }
  const couponNavigate = (action) =>{
if(action  == 'View Details'){
navigation.navigate('CouponDetails')
return true;
}
  }
  const renderDeal = ({item}) =>{
    return(
      <View style={styles.FlatListViewContainer}> 
      <Image
      source={{uri: item?.image}}
     // resizeMode={'contain'}
      style={{margin:5,width:'95%',height:100,borderRadius:5}}
      />
      <View style={{justifyContent: 'center',alignItems:'center'}}>
        <Text numberOfLines={2} style={{color:'#CD5C5C',marginHorizontal:3,textAlign:'center'}}>{item?.name}</Text>
        <Text style={{color:'rgb(228, 0, 43)'}}>Price - {item?.price}</Text>
        </View>
        <TouchableOpacity
        style={{margin:5,borderWidth:1,padding:5,justifyContent: 'center',alignItems:"center",borderColor:"#F08080",backgroundColor:'#DC143C',borderRadius:5}}
        onPress={()=>couponNavigate(item?.action)}
        >
          <Text style={{color:'#FFA07A'}}>{item?.action}</Text>
        </TouchableOpacity>
      </View>
    )
  }

    return (
      <ScrollView
              contentContainerStyle={{ flexGrow:1 }}
              showsVerticalScrollIndicator={false}
          >
    <View style={styles.Container}>
      {/* =<StatusBar hidden /> */}
          
        <Crousel data={data} />
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
        {categoryButton('All Category')}
        {categoryButton('Recharge')}
        {categoryButton('Books')}
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-evenly',top:10}}>
        {categoryButton('Electronics')}
        {categoryButton('Fashion')}
        {categoryButton('Food')}
        </View>
        {/* <OpacityCrousel data={data} /> */}
        <FlatList
        data={couponData}
        renderItem={renderDeal}
       numColumns={2}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{paddingHorizontal: 10,paddingVertical:20}}
        />
    </View>
        </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
        //backgroundColor: '#000',
        //paddingBottom:50
  },
  FlatListViewContainer:{
    marginHorizontal:10,
    borderWidth:1,
    flex:1,
    borderRadius:5,
    margin:10,
    borderColor: '#FF5733',
    justifyContent:'space-evenly'
  }
});

export default HomeScreen;
