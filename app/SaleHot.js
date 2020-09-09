import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Header from './components/Header';
import Navbar from './components/navbar';
import CountDown from 'react-native-countdown-component';
import ListOne from './components/ListOne';
import ListTow from './components/ListTow';
import LoadingCircular from './components/Loading';
export default class SaleHot extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      page:1,
      type:0,
      array_page:[],
      products:[],
      progress:true,
      
      navigation: this.props.navigation,
    };
	apis.getHot(1).then(res => {
		
			let array_page = []
			for(let i = 0; i < res.data.items.per_page; i++){
				
				let key = i + 1;
				array_page.push(key)
			}
			this.setState({
				products: res.data.items.data,
				progress: false,
				array_page: array_page
			}) 
		
			
	})
  }
  _showPage(id){
	  this.setState({
		 page: id,
		 progress: true,
	  })
	
	  apis.getHot(id).then(res => {
			
			let array_page = []
			for(let i = 0; i < res.data.items.per_page; i++){
				
				let key = i + 1;
				array_page.push(key)
			}
			this.setState({
				products: res.data.items.data,
				progress: false,
				array_page: array_page
			}) 
			
			
			
					
				
		
		});
  }
  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.wrapper}>
      		<StatusBar 
                    translucent
                    backgroundColor="transparent"
                    barStyle = "light-content"
          	/>
          	<Header navigation={this.props.navigation} />
          	<ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollview_section}>
		          <View style={styles.flashsale}>
                                    <View style={styles.container_}>
                                        <View style={styles.fssection1}>
										<TouchableOpacity>
                                              <Text style={styles.fsaletext}>Khuyến Mại</Text>
											  </TouchableOpacity>
                                        </View>
                                        
                                    </View>
                                </View>
		             
					  {
					(this.state.progress) ? <LoadingCircular /> : 
					 <View style={[{marginBottom: 160}]}>
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
					  }
                  	
                 
		    </ScrollView>
			
		    <Navbar navigation={this.props.navigation} />     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper:{
    flex:1,
  },
	flashsale:{
    marginTop:15,
	marginBottom: 15,
  },
	container:{
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  fssection2:{
    width:width*0.6,
    alignItems:'flex-end',
    paddingRight:20,
    justifyContent: 'center',
  },
	
	container:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
 	header_section:{
	    flexDirection:'row',
	    flexWrap:'wrap',
	    backgroundColor:'#fff',
	    paddingTop:5,
	    paddingBottom:5,
  	},
	scrollview_section:{
		height: height - 80
	},
	header_left:{
	    alignItems:'center',
	    width:width*0.1,
	},
  	header_right:{
	    alignItems:'flex-start',
	    width:width*0.1,
  	},
  	header_middle:{
    	width:width*0.7,
  	},
  	soft:{
    	paddingBottom:10,
    },
    item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
      marginLeft:15,
      marginTop:10,
    },
    left_soft:{
    	marginLeft:0,
		width: 150
    },
    right_soft:{
		top: -30,
    	marginLeft:15,
    	position:'absolute',
    	right:15,
		width: 110
    },
    item_section:{
  		marginLeft:15,
  		marginRight:15,
  		flexDirection:'row',
  		flexWrap:'wrap',
  		marginBottom:100,
  	},
  	item:{
      width:(width-30)*0.5,
      borderColor:'#e3e3e3',
      borderWidth:1,
      backgroundColor:'#fff',
    },
    item_image:{
      alignItems:'center',
      justifyContent:'center',
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
    item_price:{
      marginLeft:15,
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
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
  	width25:{
	    width:width*0.25,
	    alignItems:'center',
	    marginTop:5,
  	},
  	bottom1:{
	    color:'#8d8d8d',
	    fontSize:12,
  	},
	container_:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
	},
});