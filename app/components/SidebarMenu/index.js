import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
import {globalStyles, images, settings} from '../../configs';
import Accordian from '../Accordion';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { ActionCreators } from '../../redux/ActionCreators'
const mapStateToProps = (state) => ({
	user_login: state.user_login
})
class SiderbarMenu extends Component {
  constructor() {
    super();
    this.state = {
	  pages: [],
	  action: 'Login',
      menu :[
        {
          title: 'Non Veg Biryanis ádasdasd',
          data: [
            {key:'Chicken Biryani', value:'true'},
            {key:'Mutton Biryani', value:'false'},
            {key:'Prawns Biryani', value:'false'},
          ]
        },
        {
          title: 'Pizzas',
          data: [
            {key:'Chicken Dominator', value:'false'},
            {key:'Peri Peri Chicken', value:'false'},
            {key:'Indie Tandoori Paneer', value:'false'},
            {key:'Veg Extraveganza', value:'false'}
          ]
        },
        {
          title: 'Drinks',
          data: [
            {key:'Cocktail',value:'false'},
            {key:'Mocktail',value:'false'},
            {key:'Lemon Soda',value:'false'},
            {key:'Orange Soda', value:'false'}
          ]
        },
        {
          title: 'Deserts',
          data: [
            {key:'Choco Lava Cake', value:'false'},
            {key:'Gulabjamun', value:'false'},
            {key:'Kalajamun', value:'false'},
            {key:'Jalebi', value:'false'}
          ]
        },
      ]
    }
	apis.getWarrantyPolicy().then(res => {
			let pages = this.state.pages
			pages.push(res.data[0])
		this.setState({
			pages: pages,
			
		})	
			
	})
	apis.getPolicyRetunExchange().then(res => {
			let pages = this.state.pages
			pages.push(res.data[0])
		this.setState({
			pages: pages,
			
		})	
			
	})
	apis.getPaymentPolicy().then(res => {
			let pages = this.state.pages
			pages.push(res.data[0])
		this.setState({
			pages: pages,
			
		})	
			
	})
	apis.getShippingPolicy().then(res => {
			let pages = this.state.pages
			pages.push(res.data[0])
		this.setState({
			pages: pages,
			
		})	
			
	})
  }

  renderAccordians=()=> {
    //const items = [];
    const {menu} = this.state;
    return menu.map((item, index) => {
      return <Accordian
          key = {index}
          title = {item.title}
          data = {item.data}
      />
    })

  }

  render() {
    return (
      <View style={styles.sideMenuContainer}>
        <View style={styles.sideMenuProfile}>
          <TouchableOpacity  onPress={() => this.props.navigation.goBack()}>
            <Image
			style={{marginTop: 30}}
                                  source={require('../../images/big_logo.png')}
                              />
          </TouchableOpacity>


        </View>
        <View style={styles.popup_box}>
                          
                          <TouchableOpacity style={styles.popup_naviga} onPress={() => this.props.navigation.navigate('Home')}>
                              <Text style={styles.popup_naviga_text}>Trang chủ</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.popup_naviga} onPress={() => this.props.navigation.navigate('Category')}>
                              <Text style={styles.popup_naviga_text}>Danh mục</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.popup_naviga} onPress={() => this.props.navigation.navigate('Cart')}>
                              <Text style={styles.popup_naviga_text}>Giỏ hàng</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.popup_naviga} onPress={() => this.props.navigation.navigate(this.state.action)}>
                              <Text style={styles.popup_naviga_text}>Thông tin tài khoản</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.popup_naviga} onPress={() => this.props.navigation.navigate('New')}>
                              <Text style={styles.popup_naviga_text}>Tin tức</Text>
                          </TouchableOpacity>
						  {
									this.state.pages.map((val, index_) => {
										return (
                          <TouchableOpacity style={styles.popup_naviga} onPress={() => this.props.navigation.navigate('RoleCustom', {data: val})}>
                              <Text style={styles.popup_naviga_text}>{val.name}</Text>
                          </TouchableOpacity>
									)
									})
						  }
								
                           
                  </View>
        <View style={styles.sideMenuClose}>
          <Button
              type="clear"
              icon={<FontAwesomeIcon icon={faTimes} size={20} color={'#909090'} />}
              onPress={() => this.props.navigation.goBack()}
          />
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f4f4f4',
    paddingBottom: 70,

  },
   popup_logo:{
    alignItems:'center',
    marginTop:50,
    marginBottom:20,
  },
  exit_button:{
    bottom:50,
    position:'absolute',
    right:20,
  },
  popup_naviga:{
    marginLeft:20,
  },
  popup_naviga_text:{
    paddingTop:5,
    paddingBottom:5,
    textTransform:'uppercase',
    marginTop:10,
  },
  sideMenuProfile: {
    height: 160,
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    alignItems: 'center',
  },
  sideMenuContent: {
    padding: 25,
    overflow: 'hidden',
  },
  sideMenuClose: {
    padding: 20,
    position: 'absolute',
    bottom: 0,
    right:0,
  },
});
 export default connect(mapStateToProps)(SiderbarMenu)

