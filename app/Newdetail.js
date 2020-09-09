import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Header from './components/Header';
import Navbar from './components/navbar';
import WebView from 'react-native-webview';
export default class Newdetail extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            progess: false,
            news: [],
            newItem: this.props.navigation.state.params.newItem,
        }
		apis.getNew(1).then(res => {
			
			this.setState({
				news: res.data.data,
				progess: false,
			})	
			
		})
		
	}
	onWebViewMessage = (event: WebViewMessageEvent) => {
		this.setState({webViewHeight: Number(event.nativeEvent.data)})
	  }
  render() {
		const {goBack} = this.props.navigation;
		let html = '<html lang="en"><head><meta charset="utf-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" />'
		html= html +'<meta name="viewport" content="width=device-width, initial-scale=1" />'

		html= html +'<style>a, h3,h4, p,div{width: calc(100% - 5px) !important; img{width: 200px !important; }</style>'
		html= html +'</head><body style="width: calc(100% - 5px) !important;overflow: hidden; padding-bottom: 30px; background: #e7e7e7">'
		html= html + '<div style="width: calc(100% - 5px)">'+this.state.newItem.content+'</div>'
		html= html + '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script><script>'
		html= html + '$(document).ready(function(){ $("img").attr("height", "auto");$("img").attr("width", "100%");});'
  

		html= html + '</script>'
		html= html +' </body></html>'
   
    
  
         
	   

    return (
      <View style={styles.wrapper}>
      		<StatusBar 
                    translucent
                    backgroundColor="transparent"
                    barStyle = "light-content"
          	/>
          	<Header navigation={this.props.navigation} />
          	<ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollview_section}>
		          		
		              <Text style={styles.title}>{this.state.newItem.name}</Text>
		              <View style={styles.detail}>
		              		
							<Image 
									 source={{uri: 'http://demo1.sotavn.com/anluxury/public/' + this.state.newItem.image,width: width - 30, height: 120*(width - 30)/168}}/>
		                   
		                   	<View style={styles.new_section}>
  <WebView
		style={{ height: this.state.webViewHeight }}
		onMessage={this.onWebViewMessage}
          
          injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'

         source={{html}} />
                      <View>
			<Text style={[styles.new_title, {marginTop: 20}]}>Thông Báo Khác</Text>
              <View style={[styles.new_section,{marginBottom: 200}]}>
			  {
						this.state.news.map((val, index) => {
							if(index < 5 && val.id != this.state.newItem.id)
							return(
							  <TouchableOpacity style={styles.new} onPress={() =>{this.setState({newItem: val})}}>
								  <Text style={styles.dot}>
									<Image
									  source={require('./images/yellow_dot.png')}
									/>
									<Text> {val.name}</Text>
								  </Text>
							  </TouchableOpacity>
						)
						})
			  }
                      
                  
              </View>
              </View>
              </View>
		              </View>
		    </ScrollView>
      </View>
    );
  }
}		              

const styles = StyleSheet.create({
	wrapper:{
		marginBottom:50,
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
  	header_right:{
	    alignItems:'flex-start',
	    width:width*0.1,
  	},
  	header_middle:{
    	width:width*0.7,
  	},
	new_title:{
      marginLeft:15,
	  marginTop: 20,
      color:'#5aa6d8',
      textTransform:'uppercase',
    },
	 new_section:{
      paddingRight:15,
      paddingLeft:15,
      backgroundColor:'#fff',
    },
    new:{
      paddingTop:8,
      paddingBottom:8,
      borderBottomWidth:1,
      borderBottomColor:'#fbfbfb',
    },
    more_new:{
      alignItems:'flex-end',
      paddingRight:15,
    },
    more_new_text:{
      color:'#5aa6d8',
      fontSize:13,
    },
  	detail:{
  		marginLeft:15,
  		marginRight:15,
  	},
  	title:{
  		marginLeft:15,
  		marginTop:10,
  		color:'#0f1738',
  		fontSize:16,
  		fontWeight:'bold',
  		marginBottom:10,
  	},
  	new_image:{
  		width:width-30,
		height: 120*(width*.5 -30)/168
  	},
  	summary:{
  		marginTop:10,
  		color:'#0f1738',
  		fontSize:16,
  	},
  	content:{
  		marginTop:10,
  		color:'#0f1738',
  	},
  	writter_box:{
  		alignItems:'flex-end',
  		marginTop:10,
  	},
  	writter:{
  		color:'#3191cf',
  	},
  	new_section:{
  		borderTopWidth:1,
  		borderTopColor:'#dddddd',
  		marginTop:15,
  	},
    new_title:{
      marginLeft:15,
      color:'#0f1738',
      textTransform:'uppercase',
    },
    new:{
      paddingTop:8,
      paddingBottom:8,
    },
});