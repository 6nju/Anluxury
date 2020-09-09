import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Image,
  TextInput,
  Text,
  Dimensions,
} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
import {globalStyles, images, settings} from '../../configs';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Accordian from '../Accordion';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
class RightMenu extends Component {
  constructor() {
    super();
    this.state = {
      categories :[],
      category :0,
      catalog :0,
      expanded :false,
      catalogs :[],
      from :0,
      to :0,
      menu :[
        {
          title: 'Non Veg Biryanis ádasdasd',
          data: [
            {key:'Chicken Biryani', value:'true'},
            {key:'Mutton Biryani', value:'false'},
            {key:'Prawns Biryani', value:'false'},
          ]
        },
        {
          title: 'Pizzas',
          data: [
            {key:'Chicken Dominator', value:'false'},
            {key:'Peri Peri Chicken', value:'false'},
            {key:'Indie Tandoori Paneer', value:'false'},
            {key:'Veg Extraveganza', value:'false'}
          ]
        },
        {
          title: 'Drinks',
          data: [
            {key:'Cocktail',value:'false'},
            {key:'Mocktail',value:'false'},
            {key:'Lemon Soda',value:'false'},
            {key:'Orange Soda', value:'false'}
          ]
        },
        {
          title: 'Deserts',
          data: [
            {key:'Choco Lava Cake', value:'false'},
            {key:'Gulabjamun', value:'false'},
            {key:'Kalajamun', value:'false'},
            {key:'Jalebi', value:'false'}
          ]
        },
      ]
    }
	
  }
changeLayoutOne = () => {
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded }); 
  }
  renderAccordians=()=> {
    //const items = [];
    const {menu} = this.state;
    return menu.map((item, index) => {
      return <Accordian
          key = {index}
          title = {item.title}
          data = {item.data}
      />
    })

  }

  render() {
	  const {from,to } = this.state;
    return (
      <View style={styles.sideMenuContainer}>
        
        <Text style={[styles.item_h1, {marginTop: 40,marginBottom:10,}]}>Lọc Theo Hãng</Text>
		<View style={{flexDirection:'row',flexWrap: 'wrap'}}>
		{
						this.state.categories.map((val, index) => {
							if(val.id == this.state.category)
							return (
								<TouchableOpacity onPress={() => this.setState({category: val.id})} style={[styles.brand_title_box, {fontWeight: 'bold', color: 'red',  backgroundColor: '#5ab9f5',}]} key={index}>
									<Text style={[styles.brand_text, {fontWeight: 'bold', color: '#fff'}]}>{val.title}</Text>
								</TouchableOpacity>
							)
							else
							return (
								<TouchableOpacity  onPress={() => this.setState({category: val.id})} style={styles.brand_title_box} key={index}>
									<Text style={styles.brand_text}>{val.title}</Text>
								</TouchableOpacity>
							)
						})
			}
		</View>
		<Text style={[styles.item_h1, {marginTop: 40,marginBottom:10,}]}>Lọc Tên thiết bị</Text>
		<View style={{flexDirection:'row',flexWrap: 'wrap', height: this.state.expanded ? null : 170, overflow: 'hidden'}}>
		{
						this.state.catalogs.map((val, index) => {
							if(val.id == this.state.catalog)
							return (
								<TouchableOpacity onPress={() => this.setState({catalog: val.id})} style={[styles.brand_title_box, {fontWeight: 'bold', color: 'red',  backgroundColor: '#5ab9f5',}]} key={index}>
									<Text style={[styles.brand_text, {fontWeight: 'bold', color: '#fff'}]}>{val.title}</Text>
								</TouchableOpacity>
							)
							else
							return (
								<TouchableOpacity  onPress={() => this.setState({catalog: val.id})} style={styles.brand_title_box} key={index}>
									<Text style={styles.brand_text}>{val.title}</Text>
								</TouchableOpacity>
							)
						})
			}
		</View>
		<TouchableOpacity style={{alignItems:'center',marginTop: 20}} onPress={this.changeLayoutOne}>
			{ (this.state.expanded) ? 
				<Text style={{color: '#5ab9f5', fontWeight: 'bold'}}>Ẩn</Text>
				:
				<Text style={{color: '#5ab9f5', fontWeight: 'bold'}}>Xem thêm</Text>
			}
		</TouchableOpacity>
		<Text style={[styles.item_h1, {marginTop: 40,marginBottom:10,}]}>Lọc Theo Giá</Text>
        
		<View style={{flexDirection:'row',flexWrap: 'wrap'}}>
		<View style={styles.section2}>
		                	<TextInput
		                        style={[styles.brand_title_box,{width: width*.5 -40}]}
		                        placeholder="Từ"
		                        placeholderTextColor="#8d8d8d"
								autoCorrect={false}
								returnKeyType='done'
								onChangeText={(from) => this.setState({ from })}
								value={from}
		                      />
                		</View>
		<View style={styles.section2}>
		                	<TextInput
		                        style={[styles.brand_title_box,{width: width*.5 -40}]}
		                        placeholder="Đến"
		                        placeholderTextColor="#8d8d8d"
								autoCorrect={false}
								returnKeyType='done'
								onChangeText={(to) => this.setState({ to })}
								value={to}
		                      />
                		</View>
                		</View>
		<View style={{flexDirection:'row',flexWrap: 'wrap'}}>
		<TouchableOpacity style={[styles.brand_title_box, {alignItems:'center',marginTop: 20, width: width*.5 -40}]} onPress={() => this.props.navigation.goBack()}>
			
				<Text style={{}}>Bỏ Qua</Text>
			
				
		
		</TouchableOpacity>
		<TouchableOpacity style={[styles.brand_title_box, {backgroundColor: '#5ab9f5', alignItems:'center',marginTop: 20, width: width*.5 - 40}]}  onPress={() => this.props.navigation.navigate('searchRight', {category: this.state.category, catalog: this.state.catalog, from: this.state.from, to: this.state.to})}>
				<Text style={{color: '#fff', fontWeight: 'bold'}}>Áp Dụng</Text>
		</TouchableOpacity>
		</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
	brand_title_box:{
		marginLeft: 5,
		marginRight: 5,
		marginTop: 5,
		marginBottom: 5,
		paddingBottom: 6,
		paddingTop: 6,
		paddingLeft: 10,
		paddingRight: 10,
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 20,
	},
	item_h1:{
    paddingLeft:15,
    fontSize:15,
    fontWeight:'400',
    backgroundColor:'#DDDDDD',
    color:'#0F1738',
    paddingTop:10,
    paddingBottom:10,
  },
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f4f4f4',
    paddingBottom: 70,

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
  sideMenuProfile: {
    height: 160,
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    alignItems: 'center',
  },
  sideMenuContent: {
    padding: 25,
    overflow: 'hidden',
  },
  sideMenuClose: {
    padding: 20,
    position: 'absolute',
    bottom: 0,
    right:0,
  },
});

export default RightMenu;
