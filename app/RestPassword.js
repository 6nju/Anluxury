import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    Alert,
    Text,
    StatusBar,
    TouchableOpacity,
    TextInput,
    View, StyleSheet,
} from 'react-native';
import {Button, Divider, Input , ThemeProvider} from 'react-native-elements';
import {colors, globalStyles} from './configs';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const width = Dimensions.get('window').width;
import Navbar from './components/navbar';
import Header from './components/Header';
import Logo from './components/logo';
const height = Dimensions.get('window').height;
const formLogin = {
  loginByPhone: 'Lấy Lại Mật Khẩu',

};


class RestPassword extends Component {
	constructor(props) {
    super(props)
		this.state = { 
			email: '',
			

		}
		
	}
	_save = () => {
		
		
		const { email } = this.state
		
		if(email == '' || email == null){
		  Alert.alert("Thông báo", "Bạn chưa nhập Email");
		  return
		  }
		  
		apis.forgot(email).then(res => {
			
			Alert.alert("Thông báo", 'Hãy vào email để xác nhận lại mật khẩu của bạn');
			this.props.navigation.navigate('Home')
		}).catch(err => {
			Alert.alert("Thông báo", 'Hãy vào email để xác nhận lại mật khẩu của bạn');
			this.props.navigation.navigate('Home')
                   
		})
}
  render() {
	  const { email } = this.state
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
		                        placeholder="Nhập Email"
		                       autoCorrect={false}
								  returnKeyType="done"
								   placeholderTextColor="#fff"
								  onChangeText={email => this.setState({email})}
								  value={email}
		                      />
                		</View>
                		
                		<TouchableOpacity style={[styles.logout, {backgroundColor: '#fff', color: '#000'}]}   onPress={this._save}>
                  				<Text style={styles.logout_text}>Lấy lại mật khẩu</Text>
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
export default RestPassword;
