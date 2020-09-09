import React, {Component} from 'react';
import {
  StyleSheet,View,
  TextInput,
  Text,
  TouchableOpacity, StatusBar, Image, Dimensions,
} from 'react-native';
import { Button,ThemeProvider } from 'react-native-elements';

import {colors,images} from '../../configs/index';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;




export default class ListTow extends Component {
  constructor(props) {
    super(props);

	this.state = {
      products:this.props.products,
    };
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
        <View style={[styles.item_section, {marginBottom: 50}]}>
		{
									this.state.products.map((val, index_) => {
										return (
						
						<TouchableOpacity style={styles.cart_box} onPress={() => this.props.navigation.navigate('Detail', {product: val})} >
		              		<View style={styles.cart_item_image}>
		              				<Image 
									 source={{uri: 'https://hoplongtech.com/uploads/product/' + val.cover_image,width: (width-100)*0.5, height: (width-100)*0.5}}/>
		              		</View>
		              		<View style={styles.cart_item_title}>
		              			<Text style={styles.item_title}>{val.title}</Text>
		                          <View style={styles.item_rate}>
		                              <Image
		                                source={require('../../images/rated_star.png')}
		                              />
		                              <Image
		                                source={require('../../images/rated_star.png')}
		                              />
		                              <Image
		                                source={require('../../images/rated_star.png')}
		                              />
		                              <Image
		                                source={require('../../images/rated_star.png')}
		                              />
		                              <Image
		                                source={require('../../images/unrated_star.png')}
		                              />
		                          </View>
                          		<Text style={styles.item_price}>{(parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} VNĐ</Text>
		              		</View>
		              	
		              	
		            </TouchableOpacity>
					)
									})
		}
		            		              
                 </View>
    );
  }
}

const styles = StyleSheet.create({
    cart_box:{
  		flexDirection:'row',
  		flexWrap:'wrap',
  		marginLeft:15,
	    marginRight:15,
	    backgroundColor:'#fff',
	    shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,
		elevation: 2,
		marginBottom:10,
		marginTop:10,
  	},
  	item_title:{
      marginLeft:15,
      marginTop:15,
      textTransform: 'uppercase',
      color:'#0f1738',
    },
    item_price:{
      marginLeft:15,
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
    },
    item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
      marginLeft:15,
      marginTop:10,
    },
    cart_item_image:{
    	width:(width-30)*0.35,
    	alignItems:'center',
    	justifyContent:'center',
    },
    cart_item_title:{
    	width:(width-30)*0.35,
    },
    cart_item_quantity:{
      flexDirection:'row',
      flexWrap:'wrap',
      position: 'absolute',
      right:10,
      bottom:10,
      zIndex:1000,
  	},
	 quantity:{
	    alignItems:'center',
	    justifyContent:'center',
	    marginLeft:8,
	    marginRight:8,
	},
	exit:{
		position: 'absolute',
      	right:10,
      	top:10,
	},
});
