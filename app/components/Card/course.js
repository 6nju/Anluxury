import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  BackHandler,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  apis,
  colors,
  globalStyles,
  pmathText,
  images,
} from '../../configs/index';

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoryId: '',
      products: [],
      subKey: 0,
      dataSubItem: [],
      page: 1,
      search: '',
      subSon: -1,
      showModal: false,
      count: 0,
      array_page: [],
      progess: true,
      params: this.props.params,
    };
	
  }

  _dataCategory =(item) =>{
    this.setState({
      category: item,
      categoryId: item.categoryId,
      subKey: 0,
      page: 1,
      search: '',
      progess: true,
      subSon: -1,
    })
	
    apis.getProducts(item.categoryId, 1).then(res => {

      let array_page = []
      let pages
      if((res.data.count % 50) != 0){
        pages = parseInt(res.data.count / 50) + 1;
      }else{
        pages = parseInt(res.data.count / 50);
      }

      for(let i = 0;  i < pages ; i++){
        let key = i + 1;
        array_page.push(key)
      }

      for(let a = 0 ; a < res.data.rows.length; a++){
        res.data.rows[a].value_ = 1
      }

      this.setState({
        products: res.data.rows,
        progess: false,
        count: res.data.count,
        array_page: array_page,
      })

    }).catch(err => {
      this.setState({ process: false })
      return showMessage({ message: 'An error occurred during login', type: "error" })
    })
  }

  render() {
    const {item, params} = this.props;
    //console.log('key ', key);
    return (
      <View style={[styles.card, {marginRight: params.offsetRight}]} >
        <TouchableOpacity style={styles.cardShadow} onPress={() => this.props.navigation.navigate('Item', {product: item})}>
          <View style={[styles.cardImg, {minHeight: params.ImageSizeHeight}]}>
            <Image
              style={[styles.image, {height: params.ImageSizeHeight}]}
              source={{uri: item.image}}
            />
          </View>
          <Text style={styles.cardBody} numberOfLines={2}> {item.title} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Course;

let styles: *;
styles = StyleSheet.create({
  card: {
    padding: 3,
    flex: 1,
    flexDirection: 'column',
  },
  cardShadow: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0,
    elevation: 2,
  },
  cardImg: {
    flex: 1,
    alignItems:'center',

    backgroundColor: '#fff',
    textAlign: 'center',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width:'100%',
  },
  cardBody: {
    padding: 10,
    fontSize: 16,

  },
});
