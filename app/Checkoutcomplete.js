import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Header from './components/Header';
import Navbar from './components/navbar';

export default class Checkoutcomplete extends React.Component {
  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.wrapper}>
      		<StatusBar 
                    translucent
                    backgroundColor="transparent"
                    barStyle = "light-content"
          	/>
          	<Header navigation={this.props.navigation} />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollview_section}>
                  
            <View style={styles.complete}>
                    <Image
                                source={require('./images/complete.png')}
                     />
            </View>
                <TouchableOpacity style={[styles.buy_now, {backgroundColor: '#ed7ca8'}]} onPress={() =>this.props.navigation.navigate('Home', {tt:1})}>
                  <Text style={styles.buy_now_text}>Tiếp tục mua sắm</Text>
                </TouchableOpacity>
        </ScrollView>
		<Navbar navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header_section:{
      flexDirection:'row',
      flexWrap:'wrap',
      backgroundColor:'#fff',
      paddingTop:5,
      paddingBottom:5,
    },
  header_left:{
      alignItems:'center',
      width:width*0.1,
  },
    header_right:{
      alignItems:'flex-start',
      width:width*0.1,
    },
    header_middle:{
      width:width*0.7,
    },
    bottom_bar:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderTopColor:'#e6e6e6',
    borderTopWidth:2,
    bottom:0,
    position: 'absolute',
    backgroundColor:'#f8f8f8',
    paddingBottom:40,
  },
  width25:{
    width:width*0.25,
    alignItems:'center',
    marginTop:5,
  },
  bottom1:{
    color:'#8d8d8d',
    fontSize:12,
  },
  complete:{
    alignItems:'center',
    justifyContent:'center',
  },
  scrollview_section:{
    height:height,
  },
  buy_now:{
    marginLeft:15,
    marginRight:15,
    alignItems:'center',
    backgroundColor:'#3191cf',
    borderRadius:10,
    marginTop:25,
    marginBottom:90,
  },
  buy_now_text:{
    paddingBottom:10,
    paddingTop:10,
    color:'#fff',
    fontSize:18,
    textTransform:'uppercase',
    fontWeight:'bold',
  },
});