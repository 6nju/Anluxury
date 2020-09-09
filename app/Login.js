import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { ActionCreators } from './redux/ActionCreators'
import Navbar from './components/navbar';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { LoginManager } from 'react-native-fbsdk'

const mapStateToProps = (state) => ({
	user_login: state.user_login
})

class Login extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
        textNavbar:[
            {text:'Home'},
            {text:'Kiểm tra'},
            {text:'Khóa học'},
            {text:'Tài khoản'}
        ],
		action: (this.props.user_login) ? 'User' : 'Login', 
		username: '',
		password: '' 
    };
	if(this.props.user_login){this.props.navigation.navigate('User')}
  }
  
  _RestPassword = () => {
	  this.props.navigation.navigate('RestPassword')
  }
  _login = () => {
        const { username, password } = this.state
		
        if (username == '')Alert.alert("Thông báo", 'Bạn Chưa Nhập Email');
        if (password == '') Alert.alert("Thông báo", 'Bạn Chưa Nhập Mật Khẩu');
        this.setState({ process: true }, () => {
            apis.login(username, password)
                .then(res => {
					 
					
                    if (res.data.status) {
                        
                        
                       
						let user = {
							"name": res.data.user.name,
							"phone": res.data.user.phone,
							"address": res.data.user.address,
			
							"email": res.data.user.email,
							"customerId": res.data.user.id,
						}
				
				
				Alert.alert("Thông báo", 'Bạn đã đăng nhập thành công');
                this.props.dispatch(ActionCreators.set_user_login(user))
				
                this.props.navigation.navigate('Home')
						
                    } else {
                        this.setState({ process: false })
                        showMessage({ message: 'An error occurred during login', type: "error" })
                    }
                })
                .catch(err => {
                    this.setState({ process: false })
                    console.log(err.response)
                    return showMessage({ message: 'An error occurred during login', type: "error" })
                })
        })     
    }
handleFacebookLogin () {
    LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']).then(
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
  
 
  render() {
    const {goBack} = this.props.navigation;
	const { username, password} = this.state
    return (
      <View style={styles.wrapper}>
          <ScrollView >
      		<StatusBar 
                    translucent
                    backgroundColor="transparent"
                    barStyle = "light-content"
          	/>
          	<View style={styles.theme}>
          		
          	</View>
          	<View style={styles.form}>
          		<View style={styles.section1}>
          				<Image
		                    source={require('./imgs/logo.png')}
                		/>
                		<View style={styles.margintop}></View>
                		<View style={styles.section2}>
		                	<TextInput
		                        style={styles.input}
		                        placeholder="Số điện thoại"
		                       autoCorrect={false}
								  returnKeyType="done"
								   placeholderTextColor="#fff"
								  onChangeText={username => this.setState({username})}
								  value={username}
		                      />
                		</View>
                		<View style={styles.section2}>
		                	<TextInput
		                        style={styles.input}
		                        placeholder="Mật khẩu"
		                        placeholderTextColor="#fff"
								returnKeyType="done"
								  onChangeText={password => this.setState({password})}
								  value={password}
		                      />
                		</View>
                		<TouchableOpacity style={[styles.logout, {backgroundColor: '#fff', color: '#000'}]}   onPress={this._login}>
                  				<Text style={styles.logout_text}>Đăng nhập</Text>
                		</TouchableOpacity>
						<TouchableOpacity style={[styles.logout, {backgroundColor: '#5bc8ac'}]} onPress={() =>this.props.navigation.navigate('Register')}>
                  		<Text style={[styles.logout_text, {color: '#fff'}]}>Đăng Ký</Text>
                	</TouchableOpacity>
					<TouchableOpacity style={[{color: '#fff'}]}   onPress={this._RestPassword}>
					<Text style={[{color: '#fff', fontSize: 12, textAlign: 'left',marginTop:15,}]}>Quên Mật Khẩu</Text>
					</TouchableOpacity>
          		</View>
          		
                  
               
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
		backgroundColor: '#ed7ca8',
	},
	image:{
		width:width,
		height:height,
	},
	form:{
		width:width,
		height:height,
	},
	section1:{
		alignItems:'center',
		marginTop:90,
	},
	input:{
		width:width-30,
		height:36,
	},
	section2:{
		borderBottomWidth:1,
		borderBottomColor:'#efefef',
	},
	logout:{
	    marginLeft:15,
	    marginRight:15,
	    alignItems:'center',
	    backgroundColor:'#ed7ca8',
	    borderRadius:10,
	    marginTop:25,
	    width:width-30,
  	},
    lg_fb:{
      marginLeft:15,
      marginRight:15,
      alignItems:'center',
      backgroundColor:'#ed7ca8',
      borderRadius:10,
      marginTop:25,
      width:(width-30)*0.5,
    },
    lg_gg:{
      position:'absolute',
      right:15,
      alignItems:'center',
      backgroundColor:'#ed7ca8',
      borderRadius:10,
      marginTop:25,
      width:(width-50)*0.5,
    },
    lg_ggfb_text:{
      paddingBottom:5,
      paddingTop:5,
      color:'#fff',
      fontSize:15,
    },
  	logout_text:{
	    paddingBottom:10,
	    paddingTop:10,
	    color:'#000',
	    fontSize:18,
	    textTransform:'uppercase',
  	},
  	margintop:{
  		marginTop:30,
  	},
  	forgot:{
  		alignItems:'flex-end',
  	},
  	forgot_text:{
  		color:'#ed7ca8',
  		marginTop:5,
  		marginRight:15,
  	},
  	or:{
  		flexDirection:'row',
      	flexWrap: 'wrap',
      	marginTop:35,
      	marginBottom:30,
  	},
  	left:{
  		height:1,
  		backgroundColor:'#c6ced4',
  		width:(width-50)*0.42,
  		marginTop:9,
  		marginRight:10,
  		marginLeft:15,
  	},
  	center:{
  		width:(width-50)*0.16,
  		alignItems:'center',
  	},
  	right:{
  		height:1,
  		backgroundColor:'#c6ced4',
  		width:(width-50)*0.42,
  		marginTop:9,
  		marginRight:15,
  		marginLeft:10,
  	},
  	other:{
	    marginLeft:15,
	    marginRight:15,
	    alignItems:'center',
	    backgroundColor:'transparent',
	    borderRadius:10,
	    borderWidth:1,
	    borderColor:'#ed7ca8',
	    marginTop:25,
	    width:width-30,
  	},
  	other_text:{
	    paddingBottom:10,
	    paddingTop:10,
	    color:'#ed7ca8',
	    fontSize:18,
	    textTransform:'uppercase',
  	},
  	register:{
  		flexDirection:'row',
  		flexWrap:'wrap',
  		position:'absolute',
  		bottom:120,
  	},
  	register_now:{
  		color:'#ed7ca8',
  	},
  	register_qoute:{
  		marginLeft:50,
  		marginRight:10,
  	}
});
 export default connect(mapStateToProps)(Login)