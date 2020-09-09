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
export default class BestSaler extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      page:1,
      array_page:[],
      type:0,
      products:[],
      progess:true,
	
      navigation: this.props.navigation,
    };
	apis.getBestSale(this.state.page).then(res => {
		let array_page = this.state.array_page
		for(let i = 0; i < res.data.last_page; i++){
			
			let key = i + 1;
			array_page.push(key)
		}
		
		this.setState({
			products: res.data.data,
			array_page: array_page,
			perpage: res.data.last_page,
			progess: false,

			
			
		}) 
		
    });
  }
  _showPage(id){
	  this.setState({
		 page: id,
		 progess: true,
	  })
	 
	  apis.getBestSale(id).then(res => {
		
		
		this.setState({
			products: res.data.data,
			
			progess: false,

			
			
		}) 
		
    });
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
		          	<View style={styles.hot_fuction}>
                    <View style={styles.hot_left_fuction}>
                        <Text style={styles.hot_title}>Sản phẩm bán chạy</Text>
                    </View>
                    
                  </View>
                    
             		<View style={[styles.soft, {marginTop: 40}]}>
                  		<TouchableOpacity style={styles.left_soft}>
                  			<View>
                  				
                  				
                  			</View>
                  		</TouchableOpacity>
                  		<View style={styles.soft}>
                  		<TouchableOpacity style={styles.left_soft}>
                  			<Text>
                  				
                  				<Text>
                  					
                  				</Text>
                  			</Text>
                  		</TouchableOpacity>
                  		<View style={styles.right_soft}>
                  			<Text style={{marginRight: 50}}>
                  				Sắp xếp
                  			</Text>
								
                  			
                  		</View>
						<View style={[styles.right_soft,{width:30, right: 40}]}>
								<TouchableOpacity style={{marginRight: 10}} onPress={() =>this.setState({type: 0})}>
                  					<Image
                                		source={require('./images/grid1.png')}
                              		/>
								</TouchableOpacity>	
                  		</View>		
                  		<View style={[styles.right_soft,{width:30, right: 10}]}>		
								<TouchableOpacity onPress={() =>this.setState({type: 1})}>
                  					<Image
                                		source={require('./images/grid2.png')}
                              		/>
								</TouchableOpacity>
                  		</View>			
                  	</View>
					{ 
						(!this.state.type) ?
						<ListOne navigation={this.props.navigation} products={this.state.products}/>
						: <ListTow navigation={this.state.navigation} products={this.state.products}/>
					}
                  	</View>
                  	
					{
				  (this.state.array_page.length > 0)?
				  <View style={[{alignItems: 'center',flexWrap: 'wrap', marginTop: - 120, marginBottom: 100, width: width}, {flexDirection: 'row',padding: 10}]}>
				  {
						this.state.array_page.map((val_, key) => {
							if(this.state.page == val_){
							return (
							<TouchableOpacity style={[styles.page, {height: 32, backgroundColor:'#0c6dac'}]}  key={key} onPress={this._showPage.bind(this, val_)}>
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
	wrapper:{
		flex: 1
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
 	header_section:{
	    flexDirection:'row',
	    flexWrap:'wrap',
	    backgroundColor:'#fff',
	    paddingTop:5,
	    paddingBottom:5,
  	},
	scrollview_section:{
		height: height - 65
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
});