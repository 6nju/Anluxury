import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, Alert, View, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity, BackHandler } from 'react-native'
import {
  apis,
  colors,
  globalStyles,
  pmathText,
  settings,
  images,
} from './configs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { faMinus, faPlus, faCommentDots, faShoppingCart, faCartPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import Navbar from './components/navbar';
import Logo from './components/logo';
import { ActionCart } from './redux/ActionCart'
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})

class SwiperComponent extends Component {
	constructor(props) {
        super(props)
        this.state = {
            product: this.props.navigation.state.params.product,
            total_: 0,
            value: 1,
            cart: (this.props.cart) ? this.props.cart : [], 
            sections: [],			
        }
		const {product} = this.state;
		apis.getHomeWork(product.id).then(res => {
			
			this.setState({
				sections: res.data.items,
			});
		});
		
	}
	
	componentDidMount() {
		
	let ps = this.state.cart
	let total = 0
	for(let i = 0; i < this.state.cart.length; i++){
		total = total + ps[i].value*(ps[i].product.attributes.price *(100 - ps[i].product.attributes.sale))/100
	}

       this.setState({
				total_:total,
			
		})
    }
	componentWillUnmount() {
		const { navigation } = this.props
	
	}
	_minus = () => {
		let value = this.state.value
		if(this.state.value > 1){
			value = value - 1;
			this.setState({
				value:value
			})
		}
	}
	_plus = () => {
		
		let value = this.state.value
		
			value = value + 1;
			this.setState({
				value:value
			})
		
	}
	
	_showWork = (id, section) => {
		
		let items = this.state.sections
		this.setState({
				sections:[]
			})
		items[section][id].status = !items[section][id].status
			this.setState({
				sections:items
			})
		
	}
	_add = () => {
		let product = []
		let key = 0;
		if(typeof this.state.cart == 'undefined' || this.state.cart.length == 0){
			product = []
			product.push({product: this.state.product, value: this.state.value})	
			
		}else{
			product = this.state.cart
			
			for(let i = 0; i < product.length; i++){
				if(product[i].product.productId == this.state.product.productId){
					key = 1;
				}
			}
			if(key == 0){
			product.push({product: this.state.product, value: this.state.value})	
			}
		}
		Alert.alert("Thông báo", "Đã thêm sản phẩm vào giỏ hàng");
		this.props.dispatch(ActionCart.set_cart(product))
		this.props.navigation.navigate('List')
	}
	_alert = () => {
		Actions.alerts()
	}
	
  render() {
	  const {progess, product } = this.state;

	
    if (progess) return <LoadingCircular />;
    return (
		<View style={{height: height, position: 'relative'}}>
          

			<View style={[styles.itemcenter,{marginBottom: 60}]}>
			
            <ScrollView contentInsetAdjustmentBehavior="automatic">
			<Logo navigation={this.props.navigation} />	
			<View>
				<Text style={{fontSize: 20, width: width - 40, marginLeft: 20, paddingBottom: 20, paddingTop: 30, textAlign: 'center'}}>
					{product.title}
				</Text>
				<Text style={{width: width - 40, marginLeft: 20, paddingBottom: 20, paddingTop: 30, textAlign: 'center'}}>
					<FontAwesomeIcon icon={faStar} size={20} color={'#909090'}/>
					<FontAwesomeIcon icon={faStar} size={20} color={'#909090'}/>
					<FontAwesomeIcon icon={faStar} size={20} color={'#909090'}/>
					<FontAwesomeIcon icon={faStar} size={20} color={'#909090'}/>
					<FontAwesomeIcon icon={faStar} size={20} color={'#909090'}/>
				</Text>
			</View>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('Item', {product: val_})}>
					<Text style={[{paddingTop: 10, height: 40,width: width - 60, marginLeft: 30, textAlign: 'center', marginBottom: 30,borderRadius: 8,borderWidth: 1,borderColor: '#ddd',}]}>Bạn có muốn tham gia khóa học</Text>						
				</TouchableOpacity>	
				{
					this.state.sections.map((val_, key) => {
							//if(val_.attributes.name != '' && val_.attributes.name.toUpperCase().includes(this.state.search.toUpperCase())){
							return (
						<View style={{}}>
							<Text style={[{paddingTop: 10, paddingBottom: 10,height: 40,width: width - 60, marginLeft: 30}]}>Section {(key + 1)}</Text>
								{
									(val_.length > 0) ? 
									<View>
										{
										val_.map((item, key_) => {
												return (
												<View style={styles.container}>
													<View style={{width: 50, marginTop: 15}}>
														<Text style={{width: 50, textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}> {(key_ + 1)} </Text>
														
													</View>
													<View style={{width: width - 50}}>
														<TouchableOpacity  key={key_} onPress={this._showWork.bind(this, key_, key)}>
														<Text style={{fontSize: 18, marginBottom: 10}}> {item.title} </Text>
														</TouchableOpacity>	
														<Text style={{fontSize: 14, marginBottom: 15}}> Video: 10.30s </Text>
													</View>
													
												</View>
												)
											})
										}
									</View>
									:
									<View>
										<Text style={globalStyles.alertWarning}> Chưa có bài học nào trong section </Text>
									  </View>
								}	
						</View>
					)

				})
				}	
			</ScrollView>
			
			</View>
			<Navbar navigation={this.props.navigation} />
		</View>
    )
  }
}
const styles = StyleSheet.create({
  container: {

    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign:'left',


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

export default connect(mapStateToProps)(SwiperComponent)
