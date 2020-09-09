import React, {Component} from 'react';
import Modal from "react-native-modal";
import {Dimensions, Image, ScrollView,Alert, Text, TouchableOpacity, View} from 'react-native';
import { Button,ThemeProvider } from 'react-native-elements';
import {globalStyles,colors} from '../../configs';
import Swiper from 'react-native-swiper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Intro extends Component {
    constructor(props){
        super(props);
        this.state={
            showModal: this.props.showModal,
            params: this.props.params,
            sliders: this.props.sliders,
        }
    }
    _modalClose = () => {
		this.props.showHome();
    }

    _navigationLogin=()=>{
        const {navigation}= this.props;
        this.setState({showModal: false});
        navigation.navigate('Login');
    }

    _navigationRegister=()=>{
        const {navigation}= this.props;
        this.setState({showModal: false});
        navigation.navigate('Register');
    }
    render() {
        const {params} = this.state;

        return (
            
			<View stylle={{width:width, height: height, backgroundColor: '#fff'}}>
                <ScrollView style={[globalStyles.introWapper,{width:width, height: height, backgroundColor: '#fff'}]} contentInsetAdjustmentBehavior="automatic">

                    <TouchableOpacity onPress={this._modalClose} >
                        <Text style={[globalStyles.introClose,{top: 10}]} >{params.close }</Text>
                    </TouchableOpacity>

                    <Swiper
                        style={[{height:480}]}
                        autoplay={true}
                        autoplayTimeout={5}
                        paginationStyle={{

                        }}
                        activeDotStyle={{
                            backgroundColor:colors.primaryColor,
                        }}
                    >

                    { this.state.sliders.map((val, index) => {
                            return (
                                <View style={[globalStyles.introSwiper]} key={index}>
                                    <Image
                                        style={globalStyles.introLogo}
                                        source={params.logo}
                                    />

                                    <Image
                                        style={globalStyles.introImg}
                                        source={{uri: val.image, width: 167, height: 151,}}
                                    />
                                    <Text style={globalStyles.introContent}>{val.content}</Text>
                                </View>
                            )
                        })
                    }

                    </Swiper>

                    <ThemeProvider >
                        <Button
                            titleStyle={{ textTransform: 'uppercase' }}
                            buttonStyle={[globalStyles.btn, globalStyles.btnPrimary,{marginTop:30}]}
                            title={params.textBtnLogin}
                            onPress={this._navigationLogin}
                        />

                        <Button
                            title={params.textBtnRegister}
                            buttonStyle={[globalStyles.btn]}
                            titleStyle={{ color: colors.primaryColor,textTransform: 'uppercase' }}
                            onPress={this._navigationRegister}
                            type="clear"
                        />
                    </ThemeProvider>


                </ScrollView>
                </View>
            
        );
    }
}

export default Intro;
