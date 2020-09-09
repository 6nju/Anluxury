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
  BackHandler,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import Course from '../Card';
import LoadingCircular from '../Loading';

const {width: viewportWidth} = Dimensions.get('window');

class CourseNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoryId: '',
      categoryName: '',
      products: [],
      count: 0,
      array_page: [],
      progess: true,
      params: this.props.params,
      navigation: this.props.navigation,
    };
  }

  componentDidMount() {
    this._promisAll();
  }

  _promisAll = () => {
    const {params} = this.state;

    /*
     * API getCategoryCode
     * @param
     *       categoryCode : string
     * */
	
    apis.getProduct(params.categoryCode).then(res => {
		 
		this.setState({
			categoryName: res.data.categoryName,
			products: res.data.items,
			progess: false,
		}) 
		
    });
  };



  _renderItem = ({item, index}) => {
    const {params} = this.state;
	
    return <Course item={item} key={index} params={params} navigation={this.state.navigation}/>;
  };

  _renderBlocktitle = () => {
		const {params} = this.state;
		
		return (
        <View style={globalStyles.blockTitle}>
          <Text style={[globalStyles.blockTitleHeading, {width: '50%'}]}>
            {this.state.categoryName}
          </Text>
          <TouchableOpacity
            style={globalStyles.blockTitleMore}
            onPress={() => this.props.navigation.navigate('List', {code: params.categoryCode} )}>
			{
				(this.state.products.length > 0) ?
					
            <Text style={[{color: colors.primaryColor}]}>
              {settings.ViewMore}
            </Text> 
			:  null
			}
			{
					(this.state.products.length > 0) ?
					
            
			<FontAwesomeIcon
              icon={faAngleRight}
              size={14}
              color={colors.primaryColor}
            />
			
			:  null
				}
            
          </TouchableOpacity>
        </View>
      );
  
  };

  _renderBlockContent = () => {
    const {params, progess, products} = this.state;

    if (progess) return <LoadingCircular />;
    if(products.length > 0){
      return (
          <Carousel
              ref={c => {
                this.slider1Ref = c;
              }}
              data={products}
              renderItem={this._renderItem}
              sliderWidth={viewportWidth}
              itemWidth={params.ImageSizeWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              loop={true}
              autoplayDelay={500}
              autoplayInterval={3000}
              activeSlideAlignment={'start'}
          />
      );
    }else{
      return (
          <View>
            <Text style={globalStyles.alertWarning}> {settings.noProduct} </Text>
          </View>
      )
    }

  };

  render() {
    const { params,categories, products} = this.state;
	
    if(products.length > 0){
        return (
            <View style={globalStyles.container}>
                <View style={globalStyles.moduleWrapper}>
                    {this._renderBlocktitle()}
                    {this._renderBlockContent()}
                </View>
            </View>
        );
    }else{
        return (
            <View style={globalStyles.container}>
                <View style={globalStyles.moduleWrapper}>
                    {this._renderBlocktitle()}
                    {this._renderBlockContent()}
                </View>
            </View>
        );
    }

  }
}

export default CourseNew;
