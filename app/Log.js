import React from 'react';
import { StyleSheet, Text,Linking,LayoutAnimation, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { Actions, ActionConst } from 'react-native-router-flux';
import { LoginManager } from 'react-native-fbsdk'
import { connect } from 'react-redux'
import {apis, settings, images} from './configs';
import { ActionCreators } from './redux/ActionCreators'
import Header from './components/Header';
import Navbar from './components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {  faFacebookF , } from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart, faMobile, faBars, faChevronRight, faHome, faHeart, faBell, faUser } from '@fortawesome/free-solid-svg-icons'
const mapStateToProps = (state) => ({
	user_login: state.user_login
})
import LoadingCircular from './components/Loading';
class Log extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      user: this.props.user_login,
      orders: [],
      progress: true,
      progress: true,
      
      navigation: this.props.navigation,
    };
	apis.getOrder(this.state.user.phone).then(res => {
	
			
			this.setState({
				orders: res.data.items,
				progress: false,
				
			}) 
		
			
	})
  }
  _showTab(id) {
	  let orders = this.state.orders
	  orders[id].statusC = !orders[id].statusC
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({ orders: orders }); 
	}
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
		          <View style={styles.flashsale}>
                                    <View style={styles.container_}>
                                        <View style={styles.fssection1}>
										<TouchableOpacity>
                                              <Text style={styles.fsaletext}>Đơn hàng của bạn</Text>
											  </TouchableOpacity>
                                        </View>
                                        
                                    </View>
                                </View>
		             
					  
					 <View style={[{marginBottom: 160}]}>
					 {
						this.state.orders.map((val_, key) => {
							
							return (
							<View>
                        <TouchableOpacity key={key} onPress={this._showTab.bind(this, key)} style={[styles.logout, {backgroundColor: '#fff', width: width, marginLeft: 0, alignItems:'center', paddingBottom: 20, height: 95}]} >
							<Text style={[styles.logout_text, {color: '#000', textAlign: 'left'}]}>Ngày: {val_.created_at.split('.')[0].replace('T', ' ')}</Text>
								{ (val_.status == 0) ?
							<Text style={[{color: '#000', textAlign: 'right', position:'absolute', top: 30, left: 15, fontSize: 12}]}>Đang chờ duyệt</Text>
							: null
								}
								{ (val_.status == 1) ?
							<Text style={[{color: '#000', textAlign: 'right', position:'absolute', top: 30, left: 15, fontSize: 12}]}>Đã xác nhận</Text>
							: null
								}
								{ (val_.status == 2) ?
							<Text style={[{color: '#000', textAlign: 'right', position:'absolute', top: 30, left: 15, fontSize: 12}]}>Đang vận chuyển</Text>
							: null
								}
								{ (val_.status == 3) ?
							<Text style={[{color: '#000', textAlign: 'right', position:'absolute', top: 30, left: 15, fontSize: 12}]}>Đã giao hàng</Text>
							: null
								}
								{ (val_.status == 4) ?
							<Text style={[{color: '#000', textAlign: 'right', position:'absolute', top: 30, left: 15, fontSize: 12}]}>Hủy</Text>
							: null
								}
								<Text style={[{color: '#000', textAlign: 'right', position:'absolute', top: 30, right: 15, fontSize: 12, color: 'red', fontWeight: 'bold'}]}>{(parseFloat(val_.total).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} đ</Text>
                <Text style={[{color: '#000', textAlign: 'right', position:'absolute', top: 50, left: 15, fontSize: 12}]}>Ghi chú: {val_.ghi_chu}</Text>
                <Text style={[{color: '#000', textAlign: 'right', position:'absolute', top: 70, left: 15, fontSize: 12}]}>Vận chuyển: {val_.ship_method}</Text>
							
						</TouchableOpacity> 
						{ (val_.statusC) ?
						<View>
						{
						val_.productsC.map((val, key_) => {
								return (
								<View  style={[styles.logout, { width: width, marginTop: 0, backgroundColor: '#fff',marginLeft: 0, alignItems:'center', height: 50}]}>
								<Image 
												 style={{position:'absolute', left: 0}}
									 source={{uri: settings.ServiceAddress+'/' + val.image,width: 50, height: 50}}/>
								<Text style={[{color: '#000', position:'absolute', left: 50, fontSize: 12, width: width*.5, top: 2}]}>{val.title}</Text>
								<Text style={[{color: '#000', position:'absolute', top: 20, right: 15, fontSize: 12, color: 'red', fontWeight: 'bold'}]}>{(val.promotion == null) ? val.price : val.promotion}x{val_.values_[key_]}</Text>
								</View>
						)
						})
						}
						</View> : null 
						}
</View>	
								)
						})
					 }
                      </View>
					 
                  	
                 
		    </ScrollView>
			
		    <Navbar navigation={this.props.navigation} />     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper:{
    flex:1,
  },
  logout_text:{
	    paddingBottom:10,
	    paddingTop:10,
	    color:'#fff',
		
		width: width - 30,
	    fontSize:14,
	    textTransform:'uppercase',
	    fontWeight:'bold',
  },
	flashsale:{
    marginTop:15,
	marginBottom: 15,
  },
	container:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  fsaletext:{
    textTransform: 'uppercase',
    color:'#ed7ca8',
    fontSize:20,
    fontWeight:'bold',
  },
  fssection1:{
    width:width*1,
    paddingLeft:20,
  },
  logout:{
	    marginLeft:15,
	    marginRight:15,
	
	    backgroundColor:'#ed7ca8',
	    borderRadius:10,
	    marginTop:25,
	    
  	},
  fssection2:{
    width:width*0.6,
    alignItems:'flex-end',
    paddingRight:20,
    justifyContent: 'center',
  },
	
	container:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
 	header_section:{
	    flexDirection:'row',
	    flexWrap:'wrap',
	    backgroundColor:'#fff',
	    paddingTop:5,
	    paddingBottom:5,
  	},
	scrollview_section:{
		height: height - 80
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
  	soft:{
    	paddingBottom:10,
    },
    item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
      marginLeft:15,
      marginTop:10,
    },
    left_soft:{
    	marginLeft:0,
		width: 150
    },
    right_soft:{
		top: -30,
    	marginLeft:15,
    	position:'absolute',
    	right:15,
		width: 110
    },
    item_section:{
  		marginLeft:15,
  		marginRight:15,
  		flexDirection:'row',
  		flexWrap:'wrap',
  		marginBottom:100,
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
    item_price:{
      marginLeft:15,
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
    },
	page: {
    textAlign: 'center',

    marginTop: 10,
    marginBottom: 10,
    marginLeft:10,

    paddingBottom:5,
    paddingTop:5,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'#fff',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
    bottom_bar:{
	    flexDirection:'row',
	    flexWrap:'wrap',
	    borderTopColor:'#e6e6e6',
	    borderTopWidth:2,
	    position:'absolute',
	    bottom:0,
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
	container_:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
	},
});
 export default connect(mapStateToProps)(Log)