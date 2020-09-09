import React, {Component} from 'react';
import {
  StyleSheet,View,
  TextInput,
  Text,
  TouchableOpacity, StatusBar, Image, Dimensions,
} from 'react-native';
import { Button,ThemeProvider } from 'react-native-elements';

import {colors,images} from '../../configs/index';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;




export default class NewsTow extends Component {
  constructor(props) {
    super(props);
	this.state = {
          news: [],
     }
	  apis.getRecruitment(1).then(res => {
			
			this.setState({
				news: res.data.data,
				progess: false,
			})	
			
		})
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
	<View>
       <Text style={styles.new_title}>Danh sách tuyển dụng</Text>
              <View style={styles.new_section}>
			  {
						this.state.news.map((val, index) => {
							if(index < 5)
							return(
                      <TouchableOpacity style={styles.new} onPress={() =>this.props.navigation.navigate('Newdetail',{newItem: val})}>
                          <Text style={styles.dot}>
                            <Image
                              source={require('../../images/yellow_dot.png')}
                            />
                            <Text> {val.name}</Text>
                          </Text>
                      </TouchableOpacity>
					  )
						})
			  }
                      
                  <TouchableOpacity style={styles.more_new} onPress={() =>this.props.navigation.navigate('NewTow', {news: this.state.news})}>
                      <Text style={styles.more_new_text}>Xem thêm ></Text>
                  </TouchableOpacity>
              </View>
              </View>
    );
  }
}

const styles = StyleSheet.create({
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
});
