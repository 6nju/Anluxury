import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { ActionCreators } from '../../redux/ActionCreators'
const mapStateToProps = (state) => ({
	user_login: state.user_login
})
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShoppingCart, faBars, faChevronRight, faHome, faHeart, faBell, faUser } from '@fortawesome/free-solid-svg-icons'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



class Navbarbottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
        textNavbar:[
            {text:'Home'},
            {text:'Kiểm tra'},
            {text:'Khóa học'},
            {text:'Tài khoản'}
        ],
		action: (this.props.user_login) ? 'User' : 'Login' ,
		flashSaleItem: [],
		end: 0,
    };
	apis.getFlashSale().then(res => {
		
		let now = (res.data.item.date_start*1000 - Date.now())/1000;  
		
		this.setState({
			flashSaleItem: res.data.items,
			progessFlash: false,
			end: now,
		}) 
		
    });
  }

  render() {
      const textNavbar = this.state.textNavbar;
    return (
     <View style={styles.navbar}>
                      
					  
                                <View style={[styles.container,styles.footer]}>
                                    <TouchableOpacity style={styles.footersection1} onPress={() =>this.props.navigation.navigate('Home')}>
                                        <FontAwesomeIcon icon={ faHome } size={15} color={'#909090'} />
                                        <Text style={styles.footertext}>Trang chủ</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.footersection1} onPress={() =>this.props.navigation.navigate('Love')}>
                                        <FontAwesomeIcon icon={ faHeart } size={15} color={'#909090'} />
                                        <Text style={styles.footertext}>Yêu thích</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.footersectionmiddle}  onPress={() => this.props.navigation.navigate('Flashsale', {products: this.state.flashSaleItem, end: this.state.end})}>
                                        <Image
                                            style={styles.simage}
                                            source={require('../../imgs/flashsale.png')}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.footersection1} onPress={() =>this.props.navigation.navigate('New')}>
                                        <FontAwesomeIcon icon={ faBell } size={15} color={'#909090'}/>
                                        <Text style={styles.footertext}>Thông báo</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.footersection1} onPress={() =>this.props.navigation.navigate('User')}>
                                        <FontAwesomeIcon icon={ faUser } size={15} color={'#909090'} />
                                        <Text style={styles.footertext}>Tài khoản</Text>
                                    </TouchableOpacity>
                                </View>
         </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    
    backgroundColor: '#f8f8f8',
	flexDirection:'row',
    flexWrap:'wrap',
    backgroundColor:'#f8f8f8',
    position:'absolute',
    bottom:0,
    width:width,
		borderColor: '#e6e6e6',
  },
    navbarContent: {
        flex: 1,
        flexDirection: 'row',
    },
  navicon: {
    alignItems: 'center',
    width: '25%',
    paddingTop: 5,
    paddingBottom: 10,
    position: 'relative',
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
  footersection1:{
    width:width*0.17,
	
    alignItems:'center',
    justifyContent:'center',
  },
  footersectionmiddle:{
    width:width*0.30,
    alignItems:'center',
    marginTop:-10,
  },
  footertext:{
    fontSize:12,
    color:'#909090',
  },
  footer:{
    
  },
  container:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
 export default connect(mapStateToProps)(Navbarbottom)