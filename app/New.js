import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Header from './components/Header';
import Navbar from './components/navbar';

export default class New extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            page:1,
            total_:0,
            count:0,

            array_page: [],

            progess: true,
            news: [],

        }
	
		apis.getNew(1).then(res => {
			let count = res.data.count / 20;
			let array_page = []
			for(let i = 0; i < count; i++){
				
				let key = i + 1;
				array_page.push(key)
			}
			this.setState({
				news: res.data.data,
				array_page: array_page,
				progess: false,
			})	
			
		})
	}
	_showPage(id){
	  this.setState({
		 page: id,
		 progess: true,
	  })
	 
		apis.getNew(id).then(res => {
		
		
			this.setState({
				news: res.data.data,


				progess: false,

				
				
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
		          		
						{
						this.state.news.map((val, index) => {
							
							return(
		              <TouchableOpacity style={styles.new} onPress={() =>this.props.navigation.navigate('Newdetail', {newItem: val})}>
		              		<View style={styles.new_image}>
		              				<Image 
									 source={{uri: 'http://demo1.sotavn.com/anluxury/public/' + val.image,width: width*.5 - 20, height: 120*(width*.5 -20)/168}}/>
		              		</View>
		              		<View style={styles.new_title}>
		              				<Text style={styles.new_title_text}>{val.name}</Text>
									<Text style={styles.new_title_text_mota}>{val.mota}</Text>
		              		</View>
		              </TouchableOpacity>
						)
						})
						}
		               {
				  (this.state.array_page.length > 0)?
				  <View style={[{alignItems: 'center',flexWrap: 'wrap', marginTop: 10, marginBottom: 100, width: width}, {flexDirection: 'row',padding: 10}]}>
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
		height:height,
		paddingBottom:70,
	},
 	header_section:{
	    flexDirection:'row',
	    flexWrap:'wrap',
	    backgroundColor:'#fff',
	    paddingTop:5,
	    paddingBottom:5,
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
  	new:{
  		flexDirection:'row',
  		flexWrap:'wrap',
  		backgroundColor:'#fff',
  		marginTop:10,
		paddingTop: 10,
		paddingBottom: 10
  	},
  	new_image:{
  		width:width*0.5,
  		paddingLeft:15,
  	},
  	new_title:{
  		width:width*0.5,
  		paddingRight:15,
		
  	},
  	new_title_text_mota:{
		marginLeft:10,
  		marginTop:10,
  		color:'#0f1738',
  		fontSize:12,
  		
	},
  	new_title_text:{
  		marginLeft:10,
  		marginTop:10,
  		color:'#0f1738',
  		fontSize:14,
  		fontWeight:'bold',
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
  scrollview_section:{
		height: height - 200
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