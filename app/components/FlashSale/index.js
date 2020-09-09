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
  ScrollView,
  BackHandler,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Image,
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Carousel from 'react-native-snap-carousel';
import Swiper from 'react-native-swiper'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import Course from '../Card';
import LoadingCircular from '../Loading';

const {width: viewportWidth} = Dimensions.get('window');

class FlashSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoryId: '',
      categoryName: '',
      products: this.props.products,
      count: 0,
      array_page: [],
      progess: this.props.progess,
      params: this.props.params,
      type: this.props.type,
      navigation: this.props.navigation,
    };
  }

 componentDidMount() {
    this._promisAll();
  }

  _promisAll = () => {
    const {params, type} = this.state;

    /*
     * API getCategoryCode
     * @param
     *       categoryCode : string
     * */
	
    
  };

  componentWillReceiveProps(nextProps) {
		
		this.setState({
			products: this.props.products,
			progess: this.props.progess,
		})
		
	}



  

  render() {
    
	
	const { params,categories, products, progess} = this.state;

    

        return (
		<View>
            
				{
					(!this.state.products.length) ? <LoadingCircular /> : 
				 <View style={styles.item_section}>
                  <ScrollView 
                     horizontal={true}
                     showsHorizontalScrollIndicator={false}
                     style={styles.scrollview_item}
                  >
				  {
									this.state.products.map((val, index_) => {
										
										return (
										<View>
                      <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Detail', {product: val})} >
                          <View style={styles.item_image}>
                              <Image 
									 source={{uri: 'https://hoplongtech.com/uploads/product/' + val.cover_image,width: (width-30)*0.5, height: (width-30)*0.5}}/>
                          </View>
                          <Text style={styles.item_title}>{val.title}</Text>
                          <View style={styles.item_rate}>
                              <Image
                                source={require('../../images/rated_star.png')}
                              />
                              <Image
                                source={require('../../images/rated_star.png')}
                              />
                              <Image
                                source={require('../../images/rated_star.png')}
                              />
                              <Image
                                source={require('../../images/rated_star.png')}
                              />
                              <Image
                                source={require('../../images/unrated_star.png')}
                              />
                          </View>
                          <Text style={styles.item_price}>{(parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} VNĐ</Text>
                      </TouchableOpacity>
					  </View>
					)
					})
					}
                     
                  </ScrollView>
              </View>
				 
				}
			</View>
        );
    

  }
}

export default FlashSale;
const styles = StyleSheet.create({
    col:{
      flexDirection:'row',
      flexWrap:'wrap',
    },
    wrapper:{
      backgroundColor:'#f7f7f7'
    }, 
    header_text:{
      color:'red',
    },
    header_left:{
      paddingLeft:15,
      width:width*0.33,
      alignItems:'flex-start',
    },
    header_middle:{
      width:width*0.33,
      alignItems:'center',
    },
    header_end:{
      paddingRight:15,
      width:width*0.33,
      alignItems:'flex-end',
    },
    header_image_section:{
      flexDirection:'row',
      flexWrap: 'wrap',
      position: 'absolute',
      top:50,
    },
    input:{
      marginLeft:15,
      marginRight:15,
      width:width*1-30,
      backgroundColor:'#fff',
      height: 40,
      borderRadius:10,
      borderColor:'#fff',
      borderWidth:1, 
    },
    search_section:{
      flexDirection:'row',
      position:'absolute',
      top:85,
      zIndex:10,
    },
    search_icon:{
      justifyContent:'center',
      alignItems:'center',
      marginLeft:-50,
    },
    slide_wrapper:{
      height:height*0.35,
    },
    brand_wrapper:{
      height:height*0.4,
    },
    slide1:{
      alignItems:'center',
    },
    brand_box:{
      flexDirection:'row',
      flexWrap: 'wrap',
      width:width-30,
    },
    brand:{
      width:(width-30)*0.25,
      marginTop:10,
    },
    brand_text:{
      marginTop:7,
      fontSize:13,
    },
    item_center:{
      alignItems:'center',
      justifyContent:'center',
    },
    section_flashsale:{
      marginTop:-15,
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
    scrollview_item:{
      marginLeft:15,
      marginTop:15,
      marginBottom:20,
     
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
    item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
      marginLeft:15,
      marginTop:10,
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
    hot_right_fuction:{
      width:width*0.5,
      alignItems:'flex-end',
      paddingRight:25,
    },
    hot_text:{
      fontSize:13,
    },
    hot_title:{
      textTransform:'uppercase',
      color:'#fff'
    },
    new_section:{
      paddingRight:15,
      paddingLeft:15,
      backgroundColor:'#fff',
    },
    new_title:{
      marginLeft:15,
      color:'#5aa6d8',
      textTransform:'uppercase',
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
});
