import React from 'react';
import { Platform,StyleSheet, Text,Linking, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { Actions, ActionConst } from 'react-native-router-flux';
import { LoginManager } from 'react-native-fbsdk'
import { connect } from 'react-redux'
import { ActionCreators } from './redux/ActionCreators'
import Header from './components/Header';
import Navbar from './components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {  faFacebookF , } from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart, faMobile, faBars, faChevronRight, faHome, faHeart, faBell, faUser } from '@fortawesome/free-solid-svg-icons'

import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';

const mapStateToProps = (state) => ({
	user_login: state.user_login
})
class User extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
			user: this.props.user_login,
			
			
        isLogin: false,
			
        }
		
           
    }

    async handleResponse() {

    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });

      if (appleAuthRequestResponse['realUserStatus']) {
        this.setState({
          isLogin: true,
        });
      }
    } catch (error) {
      if (error.code === AppleAuthError.CANCELED) {
      }
      if (error.code === AppleAuthError.FAILED) {
        alert('Touch ID wrong');
      }
      if (error.code === AppleAuthError.INVALID_RESPONSE) {
        alert('Touch ID wrong');
      }
      if (error.code === AppleAuthError.NOT_HANDLED) {
      }
      if (error.code === AppleAuthError.UNKNOWN) {
        alert('Touch ID wrong');
      }
    }
  }

  onLogout() {
    this.setState({
      isLogin: false,
    });
  }


	_logout = () => {
	  this.props.dispatch(ActionCreators.set_user_login(null))
	  this.props.navigation.navigate('Home')
  }
  handleFacebookLogin () {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          console.log('Login success with permissions: ' + result.grantedPermissions.toString())
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      }
    )
  }
   _facebook = () => {
	 
	  	Linking.openURL("https://www.facebook.com/profile.php?id=672464512828298");
	 }
	 _
	 _phone = () => {
		 Linking.openURL('tel:0985292184')
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
				{	
				(this.state.user != null) ? 
				<View>
		            <View style={styles.user_portrait}>
		            	<View style={styles.user_image}>
		            		
		            	</View>
		            	<View style={styles.user_login}>
		            		<Text style={styles.user_text}>{this.state.user.name}</Text>
		            		<Text style={styles.user_text}>{this.state.user.phone}</Text>
		            	</View>
		            </View>
		            <View style={styles.user_name}>
		            	<Text style={styles.user_name_title}>Số điện thoại</Text>
		            	<Text style={styles.user_name_info}>{this.state.user.phone}</Text>
		            </View>
		            <View style={styles.user_name}>
		            	<Text style={styles.user_name_title}>Email</Text>
		            	<Text style={styles.user_name_info}>{this.state.user.email}</Text>
		            </View>
		            
		            
		            <View style={styles.user_name}>
		            	<Text style={styles.user_name_title}>Địa chỉ cụ thể</Text>
		            	<Text style={styles.user_name_info}>{this.state.user.address}</Text>
		            </View>
		            <TouchableOpacity style={styles.logout}   onPress={this._logout}>
                  		<Text style={styles.logout_text}>Thoát</Text>
                	</TouchableOpacity>
				</View> :
				<View>
				<TouchableOpacity style={[styles.logout, {backgroundColor: '#5bc8ac'}]} onPress={() =>this.props.navigation.navigate('Login')}>
                  		<FontAwesomeIcon icon={ faMobile } size={25} color={'#fff'} style={{position: 'absolute', top: 8, left: 10}}/><Text style={styles.logout_text}>Đăng nhập bằng số điện thoại</Text>
                	</TouchableOpacity>
				<TouchableOpacity style={[styles.logout, {backgroundColor: '#3578E5'}]}      onPress={this.handleFacebookLogin}>
                  		<FontAwesomeIcon icon={ faFacebookF } size={25} color={'#fff'} style={{position: 'absolute', top: 8, left: 10}}/><Text style={styles.logout_text}>Đăng nhập bằng Facebook</Text>
        </TouchableOpacity>
        <View style={{width:width,marginLeft:15,marginRight:15}}>
                      {!this.state.isLogin ? (
                      <AppleButton
                        buttonStyle={AppleButton.Style.BLACK}
                        buttonType={AppleButton.Type.SIGN_IN}
                        onPress={() => this.handleResponse()}
                        style={styles.appleButton}
                      />
                    ) : (
                      <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={() => this.onLogout()}>
                        <Text style={{color: 'white'}}>LOGOUT</Text>
                      </TouchableOpacity>
                    )}
        </View>
				</View>
							
				}
				<View>
				<Text style={[styles.logout_text, {color: '#000', marginLeft: 18, marginTop: 20}]}>Hỗ Trợ</Text>
				</View>
				
				<View style={{position: 'relative', width: width, height: 50 }}>
				<TouchableOpacity style={[{width: width*0.5 - 10, alignItems:'center', justifyContent: 'center', backgroundColor: '#fff', height: 50, position: 'absolute',top: 0, left: 0}]} onPress={this._facebook}>
                  	<Image
						style={{width: 30, height: 30,}}
		                source={require('./images/chat.png')}
                	/>
                </TouchableOpacity>
				<TouchableOpacity style={[{width: width*0.5 - 10, alignItems:'center', justifyContent: 'center', backgroundColor: '#fff', height: 50, position: 'absolute',top: 0, right: 0}]} onPress={this._phone}>
                  	<Text style={[{color: '#000', fontWeight:'bold'}]}>
					Phone: 0985292184</Text>
                </TouchableOpacity>
				</View>
				<View>
        { 
        (this.state.user != null) ? 
        <TouchableOpacity style={[styles.logout, {backgroundColor: '#fff', width: width, marginLeft: 0, alignItems:'center'}]} onPress={() =>this.props.navigation.navigate('Log')}>
                      <Text style={[styles.logout_text, {color: '#000', textAlign: 'left'}]}>Đơn hàng của bạn</Text>
                  </TouchableOpacity>
                  : null
                }
				<TouchableOpacity style={[styles.logout, {backgroundColor: '#fff', width: width, marginLeft: 0, alignItems:'center'}]} onPress={() =>this.props.navigation.navigate('Info', {id : 9})}>
                  		<Text style={[styles.logout_text, {color: '#000', textAlign: 'left'}]}>Giới thiệu về AnLuxury</Text>
                	</TouchableOpacity>
					<TouchableOpacity style={[styles.logout, {backgroundColor: '#fff', width: width, marginLeft: 0, alignItems:'center'}]} onPress={() => this.props.navigation.navigate('Info', {id : 10})}>
                  		<Text style={[styles.logout_text, {color: '#000', textAlign: 'left'}]}>Đặt hàng giao hàng</Text>
                	</TouchableOpacity>
					<TouchableOpacity style={[styles.logout, {backgroundColor: '#fff', width: width, marginLeft: 0, alignItems:'center'}]} onPress={() =>this.props.navigation.navigate('Info', {id : 11})}>
                  		<Text style={[styles.logout_text, {color: '#000', textAlign: 'left'}]}>Chính sách bảo mật</Text>
                	</TouchableOpacity>
					<TouchableOpacity style={[styles.logout, {backgroundColor: '#fff', width: width, marginLeft: 0, alignItems:'center', marginBottom: 100}]} onPress={() =>this.props.navigation.navigate('Info', {id : 12})}>
                  		<Text style={[styles.logout_text, {color: '#000', textAlign: 'left'}]}>Điều khoản sử dụng</Text>
                	</TouchableOpacity>
				
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
 	header_section:{
	    flexDirection:'row',
	    flexWrap:'wrap',
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
  	user_portrait:{
  		flexDirection:'row',
  		flexWrap:'wrap',
  		marginLeft:15,
  		marginRight:15,
  		backgroundColor:'#fff',
  		marginTop:15,
  		paddingTop:15,
  		paddingBottom:15,
  		borderRadius:10,
  		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,
		elevation: 2,
		marginBottom:35,
  	},
  	user_image:{
  		width:(width-30)*0.35,
  		paddingLeft:15,
  		alignItems:'center',
  	},
  	user_login:{
  		width:(width-30)*0.65,
  		marginTop:15,
  	},
  	user_text:{
  		color:'#0f1738',
  	},
  	user_name:{
  		flexDirection:'row',
  		flexWrap:'wrap',
  		marginLeft:15,
  		marginRight:15,
  		borderBottomWidth:1,
  		borderBottomColor:'#e3e4e4',
  		paddingTop:5,
  		paddingBottom:5,
  		marginTop:8,
  	},
  	user_name_title:{
  		width:(width-30)*0.35,
  		color:'#707070',
  	},
  	user_name_info:{
  		position:'absolute',
    	right:15,
    	color:'#bcbcbc',
  	},
  	logout:{
	    marginLeft:15,
	    marginRight:15,
	    alignItems:'center',
	    backgroundColor:'#ed7ca8',
	    borderRadius:10,
	    marginTop:25,
	    
  	},
  logout_text:{
	    paddingBottom:10,
	    paddingTop:10,
	    color:'#fff',
	    fontSize:14,
	    textTransform:'uppercase',
	    fontWeight:'bold',
  },
  bottom_bar:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderTopColor:'#e6e6e6',
    borderTopWidth:2,
    position:'absolute',
    bottom:0,
    backgroundColor:'#f8f8f8',
    paddingBottom:20,
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
  appleButton: {
    width: width-30,
    height: 40,
    marginTop:20,
  },
  logoutButton: {
    width: width-30,
    height: 40,
    marginTop:20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
 });
 export default connect(mapStateToProps)(User)