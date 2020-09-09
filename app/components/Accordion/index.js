import React, {Component} from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet} from "react-native";
import {colors} from '../../configs';
import {faAngleUp, faAngleDown, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            expanded : false,
        }
    }

    render() {

        return (
            <View>
                <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpand()}>
                    <Text style={[styles.title]}>{this.props.title}</Text>
                    <FontAwesomeIcon
                        icon={this.state.expanded ? faAngleUp : faAngleDown}
                        size={24}
                        color={ colors.LIGHTGREEN}
                    />
                </TouchableOpacity>

                {
                    this.state.expanded &&
                    <View >
                        <FlatList
                            data={this.state.data}
                            numColumns={1}
                            scrollEnabled={false}
                            renderItem={({item, index}) =>
                                <View key={index}>
                                    <TouchableOpacity style={[styles.childRow, styles.button, item.value ? styles.itemInActive : styles.itemActive]} onPress={()=>this.onClick(index)}>
                                        <Text  >{item.key}</Text>

                                    </TouchableOpacity>

                                </View>
                            }/>
                    </View>
                }

            </View>
        )
    }

    onClick=(index)=>{
        const temp = this.state.data.slice()
        temp[index].value = !temp[index].value
        this.setState({data: temp})
    }

    toggleExpand=()=>{
        this.setState({expanded : !this.state.expanded})
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    font:{
        // fontFamily: Fonts.bold,
    },
    button:{
        width:'100%',
        height:34,
        paddingLeft:15,
        paddingRight:15,
        fontSize: 14,
    },
    title:{
        fontSize: 16,
        color: colors.DARKGRAY,
    },
    itemActive:{
        fontSize: 14,
        color: colors.GREEN,
    },
    itemInActive:{
        fontSize: 14,
        color: colors.DARKGRAY,
    },
    btnActive:{
    //    borderColor: colors.GREEN,
    },
    btnInActive:{
    //    borderColor: colors.DARKGRAY,
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:45,
        alignItems:'center',
    },
    childRow:{
        flexDirection: 'row',
        justifyContent:'space-between',
       // backgroundColor: colors.GRAY,
    }


});

export default Accordion;
