import React, {Component} from 'react';
import {
  apis,
  colors,
  globalStyles,
  pmathText,
  settings,
  images,
} from '../../configs/index';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  BackHandler,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import Course from '../Card';
import LoadingCircular from '../Loading';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const {width: viewportWidth} = Dimensions.get('window');
import { faTimesCircle, faShoppingCart, faComment, faUser, faMinus, faPlus, faSearch, faClose,faCommentDots, faCartPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
		categories: [],
		categoryId: '',
		categoryName: '',
		products: [],
		count: 0,
		array_page: [],
		progess: true,
		code: this.props.code,
    };
  }

  componentDidMount() {
	  
    this._promisAll();
  }

  _promisAll = () => {
    const {code} = this.state;

    /*
     * API getCategoryCode
     * @param
     *       categoryCode : string
     * */
	
    apis.getProductAll(code).then(res => {
		 
		this.setState({
			categoryName: res.data.categoryName,
			products: res.data.items,
			progess: false,
		}) 
		
    });
  };


_add(id){
		let product = this.state.cart
		let key = 0;
		let p = this.state.products[id]
		let length = this.state.length
		if(typeof this.state.cart == 'undefined' || this.state.cart.length == 0){
			product = []
			product.push({product: p, value: p.value_})
			length = 1
		}else{

			product = this.state.cart

			for(let i = 0; i < product.length; i++){
				if(product[i].product.productId == p.productId){
					key = 1;
					product[i].value = p.value_
				}
			}
			if(key == 0){
				length = length + 1
				product.push({product: p, value:p.value_})
			}
		}
		this.setState({
			length: length,
			cart: product
		})
		let ps = product

		let total = 0
		for(let i = 0; i < ps.length; i++){
			total = total + ps[i].value*(ps[i].product.attributes.price *(100 - ps[i].product.attributes.sale))/100
		}

		   this.setState({
					total_:total,

			})
		Alert.alert("Thông báo", "Đã thêm sản phẩm vào giỏ hàng");
		this.props.dispatch(ActionCart.set_cart(product))
	}
  _renderItem = ({item, index}) => {
    const {params} = this.state;
    return <Course item={item} key={index} params={params} />;
  };

  _renderBlocktitle = () => {
		const {params} = this.state;
		return (
        <View style={[globalStyles.blockTitle, {marginTop: 30, marginLeft: 10}]}>
          <Text style={[globalStyles.blockTitleHeading, {width: '50%'}]}>
            {this.state.categoryName}
          </Text>
         
        </View>
      );
  
  };

  _renderBlockContent = () => {
    const {params, progess, products} = this.state;

    if (progess) return <LoadingCircular />;
    if(products.length > 0){
      return (
			<View>
          {(this.state.products.length > 0)?
              <View style={[styles.container]}>

				{
						this.state.products.map((val_, key) => {
							//if(val_.attributes.name != '' && val_.attributes.name.toUpperCase().includes(this.state.search.toUpperCase())){
							return (
							<View style={styles.product}>
							  <TouchableOpacity style={{position: 'relative'}} onPress={() => this.props.navigation.navigate('Item', {product: val_})}>
								   <Image
									style={styles.pimg1}
									source={{uri: val_.image}}
									/>
									<Text style={[styles.ptext, {height: 60}]}>{val_.title}</Text>
									<Text style={styles.price}>{parseFloat(val_.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</Text>
									
							  </TouchableOpacity>
							  <View style={[styles.container,styles.Ibar,{borderColor: '#ddd', marginTop: 10, position: 'absolute', bottom: 0, right: 25,zIndex: 10}]}>
									<TouchableOpacity style={[styles.Icart, {marginTop: 0, right: -20}]}  key={key} onPress={this._add.bind(this, key)}>
										  <FontAwesomeIcon icon={ faCartPlus } size={30} color={colors.primaryColor} />
									</TouchableOpacity>
							  </View>
							</View>
				)

				})
				}

                

              </View>
			  :
			  null
			  }
			  </View>
      )
    }else{
      return (
          <View>
            <Text style={globalStyles.alertWarning}> {settings.noProduct} </Text>
          </View>
      )
    }

  };

  render() {
    const { params,categories, products} = this.state;
	
    if(products.length > 0){
        return (
            <View style={styles.container}>
                <View style={globalStyles.moduleWrapper}>
                    {this._renderBlocktitle()}
                    {this._renderBlockContent()}
                </View>
            </View>
        );
    }else{
        return (
            <View style={globalStyles.container}>
                <View style={globalStyles.moduleWrapper}>
                    {this._renderBlocktitle()}
                    {this._renderBlockContent()}
                </View>
            </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  tabActive: {
	  borderColor: '#fed3be',
	  borderBottomWidth: 3
  },
  middletext:{
    color: '#2f3657',
    fontSize: 20,
    fontWeight:'bold',
	marginTop: 25,
	marginLeft: 10, marginRight: 10
  },
  search: {
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    paddingTop:3,
    paddingBottom:3,
    width: '100%',
    backgroundColor:'#fff',
    position:'relative',
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
  container: {

    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign:'left',


  },
  bgcolor1: {

    backgroundColor:'#dfe5ef',
  },
  bgcolor2: {
    backgroundColor:'#fceedd',
  },
  ctext: {
    paddingTop:7,
    paddingBottom:7,
    paddingLeft:10,
	paddingRight: 10,
    color:'#000',
  },
  ctimg: {
    width: width/6 - 5,
    height: width/6 - 5,
	borderRadius:30,
  },
  pimg1: {
    width: width *.5 - 20 - 20 + 5,
	height:width *.5 - 20 - 20 + 5
  },
  text1:{
    textAlign: 'center',
    fontWeight:'bold',
    fontSize:8,
  },
  price:{
    fontWeight:'bold',
    fontSize:12,
    color: colors.primaryColor,
	marginBottom: 15
  },
  item: {
    alignItems: 'center',
    width: '19%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft:15,
  },
  product: {
    textAlign: 'center',
    width: width *.5 - 15,
    marginTop: 10,
    marginBottom: 10,
    marginLeft:10,

    paddingTop:10,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'#fff',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  navbarContent: {

    flexDirection: 'row',
  },
  amount:{
    width:width*0.07,
    backgroundColor:'#ffc0a8',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    height:width*0.07,
    marginTop:4,
  },
  navbar: {
    bottom:0,
	zIndex: 1000,
	position: 'absolute',
    backgroundColor: '#fed3be',
  },
  navicon: {
    alignItems: 'center',
    width: '25%',
    paddingTop: 5,
    paddingBottom: 10,
  },
  Ibar:{

    marginLeft:0,
  },
  Imess:{
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:15,
  },
  Icart:{
    backgroundColor: '#fff',
    width:width*0.1,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    height:width*0.1,
    marginTop:7,
    marginBottom:7,
    marginLeft:5,
  },
  Ibuy:{
    backgroundColor: '#ff5c00',
    width:width*0.25,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    height:width*0.1,
    marginTop:7,
    marginBottom:7,
    marginLeft:10,
  },
  ibuytext:{
    fontWeight:'bold',
    color:'#fff',
    fontSize:15,
  },
});
export default Products;
