import React from 'react';
import Modal from "react-native-modal";
import { StyleSheet, BackHandler, ActivityIndicator, Alert, Dimensions, Text, View, Button, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Footer } from './components/index'
const width = Dimensions.get('window').width
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimesCircle, faHome, faShoppingCart, faComment, faUser, faMinus, faPlus, faSearch, faClose,faCommentDots, faCartPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
const height = Dimensions.get('window').height
import Navbar from './components/navbar';
import Logo from './components/logo';
import Products from './components/Products';
import { connect } from 'react-redux'
import LoadingCircular from './components/Loading';
import { ActionCart } from './redux/ActionCart'
const mapStateToProps = (state) => ({
	user_login: state.user_login,
	cart: state.cart,
})
class List extends React.Component {

	constructor(props) {
        super(props)
        this.state = {
			code: this.props.navigation.state.params.code,
			categoryName: '',
			products: [],
			progess: false,
        }
		
		
	}
	
	render() {
	const {products, progess, categoryName, code } = this.state;
	if (progess) return <LoadingCircular />;
	
	return (
		<View style={{height: height, position: 'relative'}}>
			<View style={[styles.itemcenter,{marginBottom: 60}]}>
				<ScrollView contentInsetAdjustmentBehavior="automatic">
				<Logo navigation={this.props.navigation} />

					<Products
					code={code}
					navigation={this.props.navigation}
				  />
				
				</ScrollView>
			</View>	
			<Navbar navigation={this.props.navigation} />
		</View>	
	);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    marginTop: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  itemcenter: {
    position: 'relative',
    alignItems: 'center'
  },
  banner: {
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#fff',
  },

  textCategory: {
    position: 'absolute',

    textAlign: 'center',
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    color: '#fff',
    backgroundColor: '#ff5c00',
    top: ((width - 40) / 344) * 64 - 5,
    fontSize: 18,
  },

  ctimg: {
    borderRadius: 10,
    width: width - 40,
    height: ((width - 40) / 344) * 128,
    marginTop: 25,
  },
});

export default connect(mapStateToProps)(List)
