import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Header from './components/Header';
import Navbar from './components/navbar';
import ListOne from './components/ListOne';
import CasItem from './components/CasItem';
import ListTow from './components/ListTow';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShoppingCart, faBars, faChevronRight, faSlidersH, faSort } from '@fortawesome/free-solid-svg-icons'
import LoadingCircular from './components/Loading';
export default class Category extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      sonCategories: [],
      array_page: [],
      categories: [],
      type:0,
      categoryId:(this.props.navigation.state.params.categoryId != 'undefined') ? this.props.navigation.state.params.categoryId : 0,
      cas:[],
      products:[],
      page:1,
      categorySonId:0,
      title_:'',
      progess: true,
      
      navigation: this.props.navigation,
    };
	
  }
	componentDidMount() {
		
    this._promisAll();
  }

  _promisAll = () => {
    

    /*
     * API getCategoryCode
     * @param
     *       categoryCode : string
     * */
	
    apis.getCategory(this.state.categoryId.id).then(res => {
		
		this.setState({
			categories: res.data.items,
			categorySonId: res.data.items[0].id,
			
		})
		 
		 
		
		apis.getCategorySon(res.data.items[0].id, this.state.page).then(res => {
			
			let count = res.data.count / 20;
			let array_page = []
			for(let i = 0; i < count; i++){
				
				let key = i + 1;
				array_page.push(key)
			}
			this.setState({
				products: res.data.items,
				progess: false,
				array_page: array_page
			}) 
			
			
			
					
				
		
		});
		
		
    });
	
	
  };
  _showSubSon(id){
	   let sub = []
		  this.setState({
			  categorySonId: this.state.categories[id].id,
			  
			  progess: true,
		  }) 
		 
		  apis.getCategorySon(this.state.categories[id].id).then(res_ => {

					this.setState({
						products: res.data.items,
						progess: false,
					})
				
				
				
			})
		
  }
  _showPage(id){
	  this.setState({
		 page: id,
		 progess: true,
	  })
	
	  apis.getCategorySon(this.state.categorySonId, id).then(res => {
			
			let count = res.data.count / 20;
			let array_page = []
			for(let i = 0; i < count; i++){
				
				let key = i + 1;
				array_page.push(key)
			}
			this.setState({
				products: res.data.items,
				progess: false,
				array_page: array_page
			}) 
			
			
			
					
				
		
		});
  }
  _showSub(id){
	  let sub = []
		  this.setState({
			  categorySonId: this.state.categories[id].id,
			  page: 1,
			  progess: true,
		  }) 
		
		  apis.getCategorySon(this.state.categories[id].id, 1).then(res_ => {
			  
					let count = res_.data.count / 20;
					let array_page = []
					for(let i = 0; i < count; i++){
						
						let key = i + 1;
						array_page.push(key)
					}
					this.setState({
						products: res_.data.items,
						progess: false,
						array_page: array_page
					}) 
					
				
				
				
			})
	  }
  render() {
    const {goBack} = this.props.navigation;
	const {search,progess } = this.state;
	if (progess) return <LoadingCircular />;
	else 
    return (
      <View style={styles.wrapper}>
      		<StatusBar 
                    translucent
                    backgroundColor="transparent"
                    barStyle = "light-content"
          	/>
          	<Header navigation={this.props.navigation} />
          	<ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollview_section}>
		          	
                        <View>
                            <Text style={styles.title}>{this.state.categoryId.name}</Text>
                        </View>
                        <View style={[styles.setting, {marginBottom: 30}]}>
                                      <ScrollView 
                                         horizontal={true}
                                         showsHorizontalScrollIndicator={false} 
                                         >
										 {
									this.state.categories.map((val, index_) => {
										return (
										<View>
										{
											(val.id == this.state.categorySonId) ?
                                            <TouchableOpacity style={[styles.ssection1]} key={index_}>
                                                 <View style={styles.simage}>
                                                      <Text style={[styles.stext, {color: '#fff', backgroundColor:'#ed7ca8'}]}>{val.name}</Text>
                                                 </View>
                                            </TouchableOpacity>
											:
											<TouchableOpacity style={styles.ssection1} key={index_} onPress={this._showSub.bind(this, index_)}>
                                                 <View style={styles.simage}>
                                                      <Text style={styles.stext}>{val.name}</Text>
                                                 </View>
                                            </TouchableOpacity>
										}
										</View>
                                            )
									})
										 }
                                        </ScrollView>
                                </View>
                                
                                <View style={[{marginBottom: 60}]}>
                                     { 
										(!this.state.type) ?
										<ListOne navigation={this.props.navigation} products={this.state.products}/>
										: <ListTow navigation={this.state.navigation} products={this.state.products}/>
									}
									{
				  (this.state.array_page.length > 0)?
				  <View style={[{alignItems: 'center',flexWrap: 'wrap', marginTop: 0, marginBottom: 100, width: width}, {flexDirection: 'row',padding: 10}]}>
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
                                </View>
                  	
						
                 
          	</ScrollView>
          	<Navbar navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	wrapper:{
		flex: 1
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
  		backgroundColor:'#ed7ca8',
  	},
  	category_title_box:{
  		
  		
  		paddingTop:15,
  		paddingBottom:15,
		width: width*.4,
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
  title:{
    textTransform: 'uppercase',
    color:'#ed7ca8',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    paddingTop:7,
    paddingBottom:7,
  },
  setting:{
    paddingLeft:15,
    backgroundColor:'#ebebeb',
    borderTopColor:'#cccccc',
    borderTopWidth:1,
    borderBottomColor:'#cccccc',
    borderBottomWidth:1,
  },
  ssection1:{
    marginRight:10,
    paddingTop:7,
    paddingBottom:7,
  },
  simage:{
    borderRadius:6,
    borderColor:'#d1d1d1',
    borderWidth:1,
  },
  stext:{
    color:'#909090',
    paddingTop:2,
    paddingBottom:2,
    paddingLeft:2,
    paddingRight:2,
  },
  fsection1:{
    marginTop:5,
    marginBottom:5,
    marginLeft:15,
    flexDirection: 'row',
    width:width*0.45,
  },
  fsection2:{
    width:width*0.45,
    marginTop:5,
    marginBottom:5,
    marginLeft:15,
    justifyContent:'flex-end',
    flexDirection: 'row',
    paddingRight:15,
  },
  ftext:{
    textAlign:'left',
  }, 
  ficon:{
    justifyContent:'center',
    marginLeft:5,
  },
  listitem:{

  },
  lisection1:{
    width:width*0.5,
    borderColor:'#d2d2d2',
    borderWidth:1,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:15,
    paddingBottom:10,
  },
  liimage:{
    alignItems:'center',
  },
  litext:{
    color:'#454545',
    fontSize:13,
    marginLeft:6,
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
  sale:{
    color:'#fff',
    backgroundColor:'#5bc8ac',
    marginTop:5,
    right:0,
    position: 'absolute',
  },
  popup:{
    position: 'absolute',
    zIndex: 1,
    width:width,
    backgroundColor:'#fff',
    borderRadius:10,
    marginTop:60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  popupsection1:{
    width:width*0.32,
    alignItems:'flex-start',
    paddingLeft:15,
  },
  popupsection2:{
    width:width*0.32,
    alignItems:'center',
    paddingLeft:15,
  },
  popupsection3:{
    width:width*0.32,
    alignItems:'flex-end',
    paddingRight:15,
  },
  cancel:{
    paddingTop:5,
    paddingBottom:5,
    color:'#3d3d3d',
  },
  popuptitle:{
    paddingTop:5,
    paddingBottom:5,
    color:'#3d3d3d',
  },
  accept:{
    paddingTop:5,
    paddingBottom:5,
    color:'#ed7ca8',
  },
  popupdash:{
    backgroundColor:'#e1e1e1',
    height:2,
  },
  popupcontent:{
    alignItems:'center',
    marginTop:10,
    marginBottom:10,
  },
});