import React, {Component} from 'react';
import {StyleSheet, Text, Dimensions, View, Button} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {colors, images,globalStyles, settings} from '../../configs/index';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.params,
    };
	
	
  }
	
  render() {
    return (
      <View style={styles.blockSlider}>
        <SliderBox
          images={this.state.images}
          sliderBoxHeight={170*width/375}
          autoplay={true}
          dotStyle={{top: 30}}
          dotColor={colors.primaryColor}
        />
		
      </View>
    );
  }
}

const styles = StyleSheet.create({
  blockSlider: {
    marginBottom:30,
    width: width,
  }
});
