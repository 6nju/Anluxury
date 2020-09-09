import React from 'react';
import { StyleSheet, Dimensions, StatusBar, Alert, ActivityIndicator, Text, View, Button, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Footer } from './components/index'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faHome,faArrowLeft,  faMinus, faPlus,faShoppingCart, faComment, faBars, faUser, faSearch,faCartPlus  } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

import { ActionCart } from './redux/ActionCart'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
import Header from './components/Header';
import Navbar from './components/navbar';
import ListOne from './components/ListOne';
import ListTow from './components/ListTow';
import LoadingCircular from './components/Loading';
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
class Search extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            page:1,
            total_:0,
            count:0,
            type:0,
            array_page: [],



            progess: true,
            products: [],

            search: this.props.navigation.state.params.val,
        }
	
		apis.getSearch(this.state.search, 1).then(res => {
		
			let count = res.data.count / 20;
					let array_page = []
					for(let i = 0; i < count; i++){
						
						let key = i + 1;
						array_page.push(key)
					}
					this.setState({
						products: res.data.data,
						progess: false,
						array_page: array_page
					}) 
			
			
		})
	}
	componentWillUnmount() {
		
	}
	componentDidMount() {
	
    }
	/*static navigationOptions = {
	
    headerRight: () => (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#ddd"
		style={{ }}

        hardwareAccelerated
      />
    ),
  };*/
   _showPage(id){
	  this.setState({
		 page: id,
		 progess: true,
	  })
	 
	  apis.getSearch(this.state.search, id).then(res => {
		
		
		this.setState({
			products: res.data.data,
			
			progess: false,

			
			
		}) 
		
    });
  }
  componentWillReceiveProps(nextProps) {
		
		this.setState({
			search: this.props.navigation.state.params.val,
			products: [],
			progess: true,
		})
		apis.getSearch(this.state.search, this.state.page).then(res => {
			this.setState({
				products: res.data.data,
				progess: false,
		
			})	
			
		})
  }
  _search = () => {
	
	this.setState({
		 page: 1,
		 progess: true,
	  })
	apis.getSearch(this.state.search, this.state.page).then(res => {
			
			this.setState({
				products: res.data.data,
				
				progess: false,
		
			})	
			
		})
		
}
   callbackSearch = (search) => {
       this.setState({
            search: search,
			progess: true,
       });
	   
	   apis.getSearch(this.state.search, this.state.page).then(res => {
			
			this.setState({
				products: res.data.data,
				
				progess: false,
		
			})	
			
		})
   }
  render() {
   
	const {search,progess } = this.state;
	if (progess) return <LoadingCircular />;
	else 

    return (
      <View style={styles.wrapper}>
      		
          	
		<View>
	<StatusBar translucent
                    backgroundColor="transparent"
                    barStyle = "light-content"
                 />
	<View style={[styles.container,styles.header]}>
                          <TouchableOpacity style={styles.hsection1}>
                            <FontAwesomeIcon icon={ faBars } size={22} color={'#fff'} />
                          </TouchableOpacity>
                          <View style={styles.hsection2}>
                                    <Image
                                        style={styles.payitemimage}
                                        source={require('./imgs/logo.png')}
                                     />
                            </View>
                            <TouchableOpacity style={styles.hsection3} onPress={() =>this.props.navigation.navigate('Cart')}>
							<Image
                                        style={styles.payitemimage}
                                        source={require('./imgs/cart.png')}
                            />
                           
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
							  <TouchableOpacity style={styles.search_icon}  onPress={() => {
							this.setState({
										products: [],
										page: 1,
										progess: true,
								
									})	
								 apis.getSearch(this.state.search, 1).then(res => {
									let count = res.data.count / 20;
					let array_page = []
					for(let i = 0; i < count; i++){
						
						let key = i + 1;
						array_page.push(key)
					}
					this.setState({
						products: res.data.data,
						progess: false,
						array_page: array_page
					}) 
									
									
								})
							 
						  }}>
                    <Image
                          source={require('./images/search.png')}
                      />
                  </TouchableOpacity>
                        </View>
						
                        </View>
          	<ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollview_section}>
				
					{ 
						(this.state.products.length) ?
					<View>
					{ 
						(!this.state.type) ?
						<ListOne navigation={this.props.navigation} products={this.state.products}/>
						: <ListTow navigation={this.props.navigation} products={this.state.products}/>
					}
					</View>: null
					}
					{
				  (this.state.array_page.length > 0)?
				  <View style={[{alignItems: 'center',flexWrap: 'wrap', marginTop: - 0, marginBottom: 100, width: width}, {flexDirection: 'row',padding: 10}]}>
				  {
						this.state.array_page.map((val_, key) => {
							if(this.state.page == val_){
							return (
							<TouchableOpacity style={[styles.page, {height: 32, backgroundColor:'#ed7ca8'}]}  key={key} onPress={this._showPage.bind(this, val_)}>
							  <View>
								  
									<Text style={[styles.ptext, {color: '#fff'}]}>{val_}</Text>
									
							  </View>
							</TouchableOpacity>
					)
							}else{
								return (
							<TouchableOpacity style={[styles.page, {height: 32}]}  key={key} onPress={this._showPage.bind(this, val_)}>
							  <View>
								  
									<Text style={styles.ptext}>{val_}</Text>
									
							  </View>
							</TouchableOpacity>
					)
							}
						})
					}
					 </View>
				  : null
				}
			</ScrollView>
          	<Navbar navigation={this.props.navigation} />
      </View>
	);
  }

}

const styles = StyleSheet.create({
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
 	header_section:{
	    flexDirection:'row',
	    flexWrap:'wrap',
	    backgroundColor:'#fff',
	    paddingTop:5,
	    paddingBottom:5,
  	},
	header_left:{
	    alignItems:'center',
	    width:width*0.1,
	},
	wrapper:{
		flex: 1
	},
  	header_right:{
	    alignItems:'flex-start',
	    width:width*0.1,
  	},
  	header_middle:{
    	width:width*0.7,
  	},
  	scrollview_brand:{
  		backgroundColor:'#fff',
  	},
  	brand_title_box:{
  		marginLeft:30,
  		marginRight:15,
  		alignItems:'center',
  		marginTop:15,
  		paddingBottom:15,
  	},
  	brand_text:{
  		color:'#0f1738',
  		textTransform: 'uppercase',
  	},
  	scrollview_category:{
  		backgroundColor:'#5ab9f5',
  	},
  	category_title_box:{
  		marginLeft:30,
  		marginRight:15,
  		alignItems:'center',
  		paddingTop:7,
  		paddingBottom:7,
  	},
  	category_text:{
  		color:'#0f1738',
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
	scrollview_section:{
		height: height - 65
	},
    
    soft:{
    	paddingBottom:10,
    },
    
    left_soft:{
    	marginLeft:15,
    },
    right_soft:{
		top: 7,
    	marginLeft:15,
    	position:'absolute',
    	right:15,
		width: 110
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
	input:{
      marginLeft:0,
      marginRight:60,
      width:width*1-120,
      backgroundColor:'#fff',
      height: 40,
      borderRadius:10,
	  marginTop: -8,
	  paddingLeft: 10,
	  backgroundColor: null,
	  
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
  },
  sinput:{
   
    borderBottomWidth: 0.5,
    borderColor: '#707070',
    backgroundColor:'#fff',
    width:width,
    paddingTop:5,
    paddingBottom:5,
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
export default connect(mapStateToProps)(Search)