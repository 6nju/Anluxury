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




export default class CasItem extends Component {
  constructor(props) {
    super(props);

	this.state = {
      id:this.props.id,
      title:this.props.title,
      products:[],
    };
	apis.getProductList(this.state.id).then(res => {
		
      this.setState({
        products: res.data.data,
        
        progess: false,
      });
    });
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
        <View>
		
						
							<View style={[{width: '100%',paddingTop: 0, backgroundColor: '#fff',marginBottom: 20}]}>
								<Text style={[styles.category_text, {width: '100%', textAlign:'center', color: '#000', fontSize:14, paddingTop: 5, fontWeight: 'bold', }]}>{this.state.title}</Text>
								<View style={[styles.header_section, {width: '100%',paddingTop: 0, backgroundColor: '#fff',paddingTop: 5,paddingLeft: 5, paddingRight: 5}]}>
								{ (this.state.products.length) ? 
									<View style={[{width: '100%',paddingTop: 0,  backgroundColor: '#fff',  borderLeftWidth: 1,borderTopWidth: 1, borderColor: '#9B9EA9', flexDirection:'row',flexWrap:'wrap',}]}>
										{
									this.state.products.map((val, index_) => {
										return (
										<TouchableOpacity  onPress={() => this.props.navigation.navigate('Detail', {product: val})} style={[{width: width*.3 - 16,borderRightWidth: 1, borderBottomWidth: 1,borderColor: '#9B9EA9'}]}>	
											<View style={styles.item_image}>
										  <Image 
												 source={{uri: 'https://hoplongtech.com/uploads/product/schneider-atv310hu15n4e.jpg',width: width*.3 -20, height: width*.3 -20}}/>
									  </View>
									<Text style={{fontSize: 12, textAlign: 'center', width: '100%'}}>{val.title}</Text>
										</TouchableOpacity>
									)
						})
						}</View>
									: <View style={[styles.header_section, {width: '100%',paddingTop: 0, backgroundColor: '#fff'}]}>
								
								
								
									<Text style={[styles.category_text, {width: '100%', textAlign:'center', color: '#000', fontSize:14}]}>Không có sản phẩm</Text>
								
								
							</View>
						}
							
						</View>
						</View>
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
