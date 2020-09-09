import React, {Component} from 'react';
import {globalStyles} from '../../configs';
import {ActivityIndicator, View} from 'react-native';

class LoadingCircular extends Component {
    render() {
        return (
            <View style={[globalStyles.mainLoader, globalStyles.loader]}>
                <ActivityIndicator size="large" color="#5ab9f5" />
            </View>
        );
    }
}

export default LoadingCircular;
