import React, {Component} from 'react';
import {
  StyleSheet,View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity, StatusBar, Image, Dimensions,
} from 'react-native';
import { Button,ThemeProvider } from 'react-native-elements';

import {colors,images} from '../../configs/index';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { connect } from 'react-redux'
import { ActionCart } from '../../redux/ActionCart'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
class Header extends Component {
  constructor(props) {
    super(props);
	this.state = {
            page:1,
            search: '',
            products: (this.props.cart == null) ? [] : this.props.cart,
            length: (this.props.cart == null) ? 0 : this.props.cart.length,
			action: (this.props.user_login) ? 'User' : 'Login' 
    }
	
	
  }
  _search = () => {
	
	if(this.state.search == '')return Alert.alert("Thông báo", 'Bạn chưa nhập sản phẩm cần tìm');
	this.props.navigation.navigate('Search', {val: this.state.search})
	
  }
  render() {
    const { navigate, search } = this.props.navigation;
    return (
	<View>
	<StatusBar translucent
                    backgroundColor="transparent"
                    barStyle = "light-content"
                 />
	<View style={[styles.container,styles.header]}>
                          
                          <TouchableOpacity style={styles.hsection2}  onPress={() =>this.props.navigation.navigate('Home')}>
                                    <Image
                                        style={styles.payitemimage}
                                        source={require('../../imgs/logo.png')}
                                     />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hsection3} onPress={() =>this.props.navigation.navigate('Cart')}>
							<Image
                                        style={styles.payitemimage}
                                        source={require('../../imgs/cart.png')}
                            />
							<Text style={{position: 'absolute', top: -7, right: 3, color: '#fff', fontWeight: 'bold', paddingBottom: 1, paddingLeft: 5, paddingTop: 1, paddingRight: 5, backgroundColor: '#ed7ca8', borderRadius: 10}}>
								{this.state.length}
							</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.search}>
                              
							  <TextInput style = {styles.sinput}
								 placeholder = "Tìm kiếm sản phẩm"
								 placeholderTextColor = "#8D8D8D"
								 onChangeText={(search) => this.setState({ search })}
								 value={this.state.search}
								 autoCapitalize = "none"
							  />
							  <TouchableOpacity style={styles.search_icon}  onPress={this._search}>
                    <Image
                          source={require('../../images/search.png')}
                      />
                  </TouchableOpacity>
                        </View>
						
                        </View>
                        
        
    );
  }
}

const styles = StyleSheet.create({
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
	position: 'relative',
	right: -35,
  },
  sinput:{
   
    borderBottomWidth: 0.5,
    borderColor: '#707070',
    backgroundColor:'#fff',
    width:width,
    paddingTop:10,
    paddingBottom:10,
  },
  search_icon:{
	   position: 'absolute',
	   zIndex: 1,
	   top: 5, 
	   right: 10
  },
  search:{
	  position: 'relative',
    alignItems:'center',
    
  },
});
export default connect(mapStateToProps)(Header);