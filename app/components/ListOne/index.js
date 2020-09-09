import React, {Component} from 'react';
import {
  StyleSheet,View,
  TextInput,
  Text,
  TouchableOpacity, StatusBar, Image, Dimensions,
} from 'react-native';
import { Button,ThemeProvider } from 'react-native-elements';
import {colors, images,globalStyles, settings} from '../../configs/index';

import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;




export default class ListOne extends Component {
  constructor(props) {
    super(props);
	this.state = {
		products:this.props.products,
    };
	
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
        <View style={[styles.listitem,styles.container]} >
			{
									this.state.products.map((val, index_) => {
										return (
										<TouchableOpacity style={styles.lisection1} onPress={() => this.props.navigation.navigate('Detail', {product: val})}>
                                          <View style={styles.liimage}>
                                            <Image 
											
									 source={{uri: settings.ServiceAddress+'/' + val.image,width: (width-70)*0.5, height: (width-70)*0.5}}/>
                                          </View>
                                            <Text style={styles.litext}>{val.title}</Text>
                                            <Text style={styles.oldprice}>{(parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} đ</Text>
                                            <Text style={styles.pricedash}></Text>
                                            <View>
											{
												(val.promotion != null) ?
												<View>
                                                 <Text style={styles.newprice}>{(parseFloat(val.promotion).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} đ</Text>
												 <Text style={styles.sale}>-{(100 - parseInt(100 * val.promotion / val.price))}%</Text>
												  </View>
												 : 
												 <Text style={styles.newprice}>{(parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} đ</Text>
													 }
                                                  
                                                  
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
    item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
      marginLeft:15,
      marginTop:10,
    },
    item_section:{
  		marginLeft:15,
  		marginRight:15,
  		flexDirection:'row',
  		flexWrap:'wrap',
  		marginBottom:100,
  	},
	itext:{
    color:'#454545',
    fontSize:13,
    marginLeft:6,
	height: 50,
  },
  oldprice:{
    color:'#999999',
    marginLeft:6,
  },
  pricedash:{
    backgroundColor:'#999999',
    height:1,
    marginLeft:6,
    width:70,
    marginTop:-9,
  },
  newprice:{
    color:'#ed7ca8', 
    fontWeight:'bold',
    marginLeft:6,
    marginTop:5,
  },
	item_price:{
      marginLeft:15,
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
    },
  	item:{
      width:(width-30)*0.5,
      borderColor:'#e3e3e3',
      borderWidth:1,
      backgroundColor:'#fff',
    },
    item_image:{
      alignItems:'center',
      justifyContent:'center',
    },
    image_fit:{
      width:(width-40)*0.5,
    },
    item_title:{
      marginLeft:15,
      marginTop:15,
      textTransform: 'uppercase',
      color:'#0f1738',
    },
	container:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  header:{
    backgroundColor:'#ed7ca8',
    paddingTop:30,
  },
  hsection1:{
    width:width*0.1,
    alignItems:'center',
    justifyContent: 'center',
  },
  hsection2:{
    width:width*0.8,
  },
  hsection3:{
    width:width*0.1,
    alignItems:'center',
    justifyContent: 'center',
  },
  title:{
    textTransform: 'uppercase',
    color:'#ed7ca8',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    paddingTop:7,
    paddingBottom:7,
  },
  setting:{
    paddingLeft:15,
    backgroundColor:'#ebebeb',
    borderTopColor:'#cccccc',
    borderTopWidth:1,
    borderBottomColor:'#cccccc',
    borderBottomWidth:1,
  },
  ssection1:{
    marginRight:10,
    paddingTop:7,
    paddingBottom:7,
  },
  simage:{
    borderRadius:6,
    borderColor:'#d1d1d1',
    borderWidth:1,
  },
  stext:{
    color:'#909090',
    paddingTop:2,
    paddingBottom:2,
    paddingLeft:2,
    paddingRight:2,
  },
  fsection1:{
    marginTop:5,
    marginBottom:5,
    marginLeft:15,
    flexDirection: 'row',
    width:width*0.45,
  },
  fsection2:{
    width:width*0.45,
    marginTop:5,
    marginBottom:5,
    marginLeft:15,
    justifyContent:'flex-end',
    flexDirection: 'row',
    paddingRight:15,
  },
  ftext:{
    textAlign:'left',
  }, 
  ficon:{
    justifyContent:'center',
    marginLeft:5,
  },
  listitem:{

  },
  lisection1:{
    width:width*0.5,
    borderColor:'#d2d2d2',
    borderWidth:1,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:20,
    paddingBottom:10,
  },
  liimage:{
    alignItems:'center',
  },
  litext:{
    color:'#454545',
    fontSize:13,
	marginTop: 15,
    
  },
  oldprice:{
    color:'#999999',
    
  },
  pricedash:{
    backgroundColor:'#999999',
    height:1,
    marginLeft:6,
    width:70,
    marginTop:-9,
  },
  newprice:{
    color:'#ed7ca8',
    fontWeight:'bold',
    
    marginTop:5,
  },
  sale:{
    color:'#fff',
    backgroundColor:'#5bc8ac',
    marginTop:5,
    right:0,
    position: 'absolute',
  },
  popup:{
    position: 'absolute',
    zIndex: 1,
    width:width,
    backgroundColor:'#fff',
    borderRadius:10,
    marginTop:60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  popupsection1:{
    width:width*0.32,
    alignItems:'flex-start',
    paddingLeft:15,
  },
  popupsection2:{
    width:width*0.32,
    alignItems:'center',
    paddingLeft:15,
  },
  popupsection3:{
    width:width*0.32,
    alignItems:'flex-end',
    paddingRight:15,
  },
  cancel:{
    paddingTop:5,
    paddingBottom:5,
    color:'#3d3d3d',
  },
  popuptitle:{
    paddingTop:5,
    paddingBottom:5,
    color:'#3d3d3d',
  },
  accept:{
    paddingTop:5,
    paddingBottom:5,
    color:'#ed7ca8',
  },
  popupdash:{
    backgroundColor:'#e1e1e1',
    height:2,
  },
  popupcontent:{
    alignItems:'center',
    marginTop:10,
    marginBottom:10,
  },
});
