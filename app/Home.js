import React from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  BackHandler,
  View,
  Button,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {apis, settings, images} from './configs';
import {connect} from 'react-redux';
import Slideshow from './components/slideshow';
import Navbar from './components/navbar';
import Header from './components/Header';
import Logo from './components/logo';
import FlashSale from './components/FlashSale';
import Course from './components/CourseNew';
import Branch from './components/Branch';
import News from './components/News';
import NewsTow from './components/NewsTow';
import LoadingCircular from './components/Loading';
import Intro from './components/Intro';
import CountDown from 'react-native-countdown-component';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShoppingCart, faBars, faChevronRight, faHome, faHeart, faBell, faUser } from '@fortawesome/free-solid-svg-icons'
const mapStateToProps = state => ({
  user_login: state.user_login,
  cart: state.cart,
});

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      search: '',
      cart: this.props.cart,
      hots: [],
      menus: [],
      news: [],
      loadingMenu: true,
      loadingSale: true,
      loadingSlider: true,
      user: this.props.user_login,
      length: this.props.cart ? this.props.cart.length : 0,
      statusFlashSale: 1,
      progessFlash: true,
      progess: false,
      progess: false,
      end: 0,
      sliders: [],
      newProduct: [],
      flashSaleItem: [],
      showModal: false,
      images:[],
		search: '',
		bestSaler: [],
      bestSalerProgess: false,
    };
	apis.getHot(1).then(res => {
		
		this.setState({
			hots: res.data.items.data,

			loadingSale: false,
		})	
			
	})
	apis.getSlider().then(res => {
		
		this.setState({
			images: res.data.items,

			loadingSlider: false,
		})	
			
	})
	
	apis.getFlashSale().then(res => {
		
		let now = (res.data.item.date_start*1000 - Date.now())/1000;  
		
		this.setState({
			flashSaleItem: res.data.items,
			progessFlash: false,
			end: now,
		}) 
		
    });
	apis.getHomePage().then(res => {
		
		
		
		this.setState({
			menus: res.data.items,
			loadingMenu: false,

		}) 
		
    });
  }
componentWillMount(){
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
     this.getData();
     //Put your Data loading function here instead of my this.LoadData()
    });}
	  componentDidMount() {
		this.getData();
	  }

  getData() {
    let cart = this.props.cart;
    this.setState({
      
      changecart: true,
    
    });
	apis.getSlider().then(res => {
		
		this.setState({
			
			changecart: false,
		})	
			
	})
	
	
	
  }
	showHome = (showIntro) => {
    this.setState({
		showModal: false
	})
  }
  render() {
    const {search,progess,showModal } = this.state;


    if (progess) return <LoadingCircular />;
	if (showModal) return (	
		<View>
          <Intro showHome={this.showHome} params={settings.Intro} sliders={this.state.sliders} showModal={showModal} navigation={this.props.navigation} />
		</View>
	)
    return (
	
        <View style={styles.wrapper}>
          

          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7'}}>

              {/* Home Header Logo */}
			  {(!this.state.changecart) ?
			<Header navigation={this.props.navigation} /> : null
		  }
             
				{
					(this.state.loadingSlider) ? <LoadingCircular /> :

				
              
              <Slideshow params={this.state.images}/>
			  
				}
				<Branch navigation={this.props.navigation}/>
				
				<View style={[styles.services,styles.container_]}>
                                            <View style={styles.ssection1}>
                                                 <Image
                                                    style={styles.simage}
                                                    source={require('./imgs/services1.png')}
                                                 />
                                                 <Text style={styles.stext}>Đảm bảo{"\n"}chất lượng</Text>
                                            </View>
                                            <View style={styles.sborder}></View>
                                            <View style={[styles.ssection1, {marginTop: -9}]}>
                                                 <Image
                                                    style={styles.simage}
                                                    source={require('./imgs/services2.png')}
                                                 />
                                                 <Text style={styles.stext}>Giao hàng{"\n"}toàn quốc</Text>
                                            </View>
                                            <View style={styles.sborder}></View> 
                                            <View style={styles.ssection1}>
                                                 <Image
                                                    style={styles.simage}
                                                    source={require('./imgs/services3.png')}
                                                 />
                                                 <Text style={styles.stext}>Tư vấn{"\n"}miễn phí</Text>
                                            </View>
                                </View>
								
						 {
					(!this.state.flashSaleItem.length) ? <LoadingCircular /> : 
					<View>
			  { (this.state.statusFlashSale) ?
			   <View>
			   <View style={styles.flashsale}>
                                    <View style={styles.container_}>
                                        <View style={styles.fssection1}>
										<TouchableOpacity onPress={() => this.props.navigation.navigate('Flashsale', {products: this.state.flashSaleItem, end: this.state.end})} >
                                              <Text style={styles.fsaletext}>Flashsale</Text>
											  </TouchableOpacity>
                                        </View>
                                        <View style={[styles.fssection2, {marginTop: -7, marginBottom: -10}]}>
                                        <View style={styles.container_}>
                                              <CountDown
        size={15}
        until={this.state.end}
        onFinish={() => {
			alert('Đã hết FlashSale')
			this.setState({
				statusFlashSale: 0
			})
		}} 
        digitStyle={{backgroundColor: '#ed7ca8'}}
        digitTxtStyle={{color: '#fff'}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#ed7ca8'}}
        timeToShow={['D', 'H', 'M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      />
                                        </View>
                                        </View>
                                    </View>
                                </View>
								<View style={styles.item}>
                                      <ScrollView 
                                         horizontal={true}
                                         showsHorizontalScrollIndicator={false}
                                         >
										
					{
									this.state.flashSaleItem.map((val, index_) => {
										
										if(index_ < 5)
										return (
                                            <TouchableOpacity style={styles.isection1} onPress={() => this.props.navigation.navigate('Detail', {product: val})}>
                                                  <View style={{alignItems:'center',}}>
                                                 <Image 
												 style={{marginLeft: width*0.01}}
									 source={{uri: settings.ServiceAddress+'/' + val.image,width: width*0.36, height: width*0.36}}/>
                                                 </View>
                                                 <Text style={styles.itext}>{val.title}</Text>
												 
                                                 <Text style={styles.oldprice}>{(parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} đ</Text>
                                                 <Text style={styles.pricedash}></Text>
												 <View>
													 {
														 (val.promotion != null) ?
                                                 <Text style={styles.newprice}>{(parseFloat(val.promotion).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} đ</Text>
												 : 
												 <Text style={styles.newprice}>{(parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} đ</Text>
													 }
												  </View>
                                            </TouchableOpacity>
                                            )
									})
					}
                                        </ScrollView>
                                </View>
                                </View>
								
								
			  
              : null
			  }
			  </View>
  }

{
					(this.state.loadingSale) ? <LoadingCircular /> : 
					<View>
			 
			   <View>
			   <View style={styles.flashsale}>
                                    <View style={styles.container_}>
                                        <View style={styles.othersale1}>
										<TouchableOpacity onPress={() => this.props.navigation.navigate('SaleHot')} >
                                              <Text style={styles.fsaletext}>Khuyến Mại Hot</Text>
											  </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={styles.othersale2} onPress={() =>this.props.navigation.navigate('SaleHot')}>
                                              <FontAwesomeIcon icon={ faChevronRight } size={15} color={'#3d3d3d'} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
								<View style={styles.item}>
                                      <ScrollView 
                                         horizontal={true}
                                         showsHorizontalScrollIndicator={false}
                                         >
										
					{
									this.state.hots.map((val, index_) => {
										
										if(index_ < 5)
										return (
                                            <TouchableOpacity style={styles.isection1} onPress={() => this.props.navigation.navigate('Detail', {product: val})}>
                                                  <View style={{alignItems:'center',}}>
                                                 <Image 
												 style={{marginLeft: width*0.01}}
									 source={{uri: settings.ServiceAddress+'/' + val.image,width: width*0.36, height: width*0.36}}/>
                                                 </View>
                                                 <Text style={styles.itext}>{val.title}</Text>
												 
                                                 <Text style={styles.oldprice}>{(parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} đ</Text>
                                                 <Text style={styles.pricedash}></Text>
												 <View>
													 {
														 (val.promotion != null) ?
                                                 <Text style={styles.newprice}>{(parseFloat(val.promotion).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} đ</Text>
												 : 
												 <Text style={styles.newprice}>{(parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} đ</Text>
													 }
												  </View>
                                            </TouchableOpacity>
                                            )
									})
					}
                                        </ScrollView>
                                </View>
                                </View>
								
									
			  
              
			  
			  </View>
  }			

  
								
				{
					(this.state.loadingMenu) ? <LoadingCircular /> : 
					<View>
			 {
									this.state.menus.map((val_, index_) => {
										
										
										return (
			   <View>
			   <View style={styles.flashsale}>
                                    <View style={styles.container_}>
                                        <View style={styles.othersale1}>
										<TouchableOpacity onPress={() =>this.props.navigation.navigate('Category', {categoryId: val_})} >
                                              <Text style={styles.fsaletext}>{val_.name}</Text>
											  </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={styles.othersale2} onPress={() =>this.props.navigation.navigate('Category', {categoryId: val_})}>
                                              <FontAwesomeIcon icon={ faChevronRight } size={15} color={'#3d3d3d'} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
								<View style={styles.item}>
                                      <ScrollView 
                                         horizontal={true}
                                         showsHorizontalScrollIndicator={false}
                                         >
										
					{
									val_.products.map((val, index_) => {
										
										if(index_ < 5)
										return (
                                            <TouchableOpacity style={styles.isection1} onPress={() => this.props.navigation.navigate('Detail', {product: val})}>
                                                  <View style={{alignItems:'center',}}>
                                                 <Image 
												 style={{marginLeft: width*0.01}}
									 source={{uri: settings.ServiceAddress+'/' + val.image,width: width*0.36, height: width*0.36}}/>
                                                 </View>
                                                 <Text style={styles.itext}>{val.title}</Text>
												 
                                                 <Text style={styles.oldprice}>{(parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} đ</Text>
                                                 <Text style={styles.pricedash}></Text>
												 <View>
													 {
														 (val.promotion != null) ?
                                                 <Text style={styles.newprice}>{(parseFloat(val.promotion).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} đ</Text>
												 : 
												 <Text style={styles.newprice}>{(parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} đ</Text>
													 }
												  </View>
                                            </TouchableOpacity>
                                            )
									})
					}
                                        </ScrollView>
                                </View>
                                </View>
								
						)
									})
			 }									
			  
              
			  
			  </View>
  }						
						
						
								
								
				
				
				
			  
              </ScrollView>
			   
            </View>

          {/*  Navbar Bottom */}
		
          <Navbar navigation={this.props.navigation} flashSaleItem={this.state.flashSaleItem} end={this.state.end}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
	section_flashsale:{
      marginTop:-15,
    },
	container_:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
	wrapper:{
		flex: 1
	},
	services:{
    backgroundColor:'#fff',
  },
  ssection1:{
    width:width*0.32,
    alignItems:'center',
    paddingTop:10,
	marginLeft:width*0.01,
	
  },
  sborder:{
    width:1,
    backgroundColor:'#c3c3c3', 
    marginTop:15,
    marginBottom:15,
  },
  fssection1:{
    width:width*0.4,
    paddingLeft:20,
  },
  fssection2:{
    width:width*0.6,
    alignItems:'flex-end',
    paddingRight:20,
    justifyContent: 'center',
  },
  othersale1:{
    width:width*0.8,
    paddingLeft:20,
  },
  othersale2:{
    width:width*0.2,
    alignItems:'flex-end',
    paddingRight:20,
    justifyContent: 'center',
  },
  stext:{
    fontSize:13,
    color:'#434343',
    marginTop:5,
    textAlign:'center',
  },
	hot_fuction:{
      flexDirection:'row',
      flexWrap: 'wrap',
      paddingTop:7,
      paddingBottom:7,
      backgroundColor:'#3191cf',
    },
    hot_left_fuction:{
      width:width*0.5,
      alignItems:'flex-start',
      paddingLeft:25,
    },
	hot_title:{
      textTransform:'uppercase',
      color:'#fff'
    },
	item:{
    marginTop:15,
    marginLeft:15,
  },
  isection1:{
    width:width*0.38, 
    borderWidth: 1,
    borderColor: '#e5e5e5',
    
    paddingBottom:5,
    marginBottom:10,
  },
  iimage:{
    marginTop:5,
  },
  itext:{
    color:'#454545',
    fontSize:13,
    marginLeft:6,
	height: 50,
  marginTop:10,
  },
  oldprice:{
    color:'#999999',
    marginLeft:6,
  },
  pricedash:{
    backgroundColor:'#999999',
    height:1,
    marginLeft:6,
    width:70,
    marginTop:-9,
  },
  newprice:{
    color:'#ed7ca8',
    fontWeight:'bold',
    marginLeft:6,
    marginTop:5,
  },
    hot_right_fuction:{
      width:width*0.5,
      alignItems:'flex-end',
      paddingRight:25,
    },
    hot_text:{
      fontSize:13,
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
	 about_section:{
      alignItems:'center',
      paddingTop:20,
      paddingBottom:30,
      marginBottom:80,
    },
    contact_me:{
      flexDirection:'row',
      flexWrap: 'wrap',
    },
    mg_8x8:{
      marginLeft:8,
      marginRight:8,
    },
    mg_top25:{
      marginTop:25,
    },
    conpany:{
      textTransform:'uppercase',
      marginTop:10,
      fontSize:13,
      color:'#0f1738'
    },
    dash:{
      height:2,
      backgroundColor:'#e5e5e5',
      width:width-60,
      marginTop:5,
      marginBottom:8,
    },
    address:{
      fontSize:13,
      color:'#0f1738'
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
  popup:{
    width:width*0.85,
    position:'absolute',
    backgroundColor:'#fff',
    zIndex:100,
  },
  popup_box:{
    height:height,
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
    flashsale_fuction:{
      flexDirection:'row',
      flexWrap: 'wrap',
      paddingTop:7,
      paddingBottom:7,
      backgroundColor:'#ededed',
    },
    flashsale_left_fuction:{
      width:width*0.33,
      alignItems:'flex-start',
      paddingLeft:25,
    },
    flashsale_center_fuction:{
      width:width*0.33,
      alignItems:'center',
    },
    flashsale_right_fuction:{
      width:width*0.33,
      alignItems:'flex-end',
      paddingRight:25,
    },
    fl_text:{
      fontSize:13,
    },
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
flashsale:{
    marginTop:15,
  },
  fsaletext:{
    textTransform: 'uppercase',
    color:'#ed7ca8',
    fontSize:20,
    fontWeight:'bold',
  },
  fssection1:{
    width:width*0.4,
    paddingLeft:20,
  },
  ctimg: {
    borderRadius: 10,
    width: width - 40,
    height: ((width - 40) / 344) * 128,
    marginTop: 25,
  },
});
export default connect(mapStateToProps)(Home);
