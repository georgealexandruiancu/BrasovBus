import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Image, Modal, Text, TouchableHighlight, View, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

import {NavigationAction} from 'react-navigation';

export default class BottomNav extends React.Component {
    static navigationOptions = {
        headerTitleStyle: {
            textAlign: "center",
            flex: 1
        },
        title: 'Brasov Bus',
    };
    constructor(props) {
        super(props);

        this._isMounted = false;
        // rest of your code
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    state = {
        modalVisible: false,
        modalVisibleLine: false,

        text: '',
        textLine: '',

    };

    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }
    toggleModalLine(visible) {
        this.setState({ modalVisibleLine: visible });
    }
    
    render() {
       const {navigate} = this.props.navigate
        this.props.navigate.reset
        return (
            <View>
            
                <Modal animationType={"slide"} transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { console.log("Modal has been closed.") }}>
                    <View style={styles.modal}>
                        <Image source={require('./assets/wave2.png')} style={styles.bgImages} resizeMode={'cover'}/>

                        <Text style={styles.textModal}>Cauta statia</Text>
                        <TextInput editable={true} value={this.state.text} onChangeText={(text)=>{this.setState({text})}} style={styles.input}/>
                        <TouchableOpacity
                            style={styles.buttonModal}
                            onPress={() => { this.toggleModal(!this.state.modalVisible);
                                navigate('Stations', { stationName: this.state.text });
                                this.setState({text: ""})
                            }}
                            underlayColor='#fff'>
                            <Text style={styles.text}>{'Cauta'.toLocaleUpperCase()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonModal}
                            onPress={() => this.toggleModal(!this.state.modalVisible)}
                            underlayColor='#fff'>
                            <Text style={styles.text}>{'Anuleaza'.toLocaleUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal animationType={"slide"} transparent={true}
                    visible={this.state.modalVisibleLine}
                    onRequestClose={() => { console.log("Modal has been closed.") }}>
                    <View style={styles.modal}>
                        <Image source={require('./assets/wave2.png')} style={styles.bgImages} resizeMode={'cover'} />

                        <Text style={styles.textModal}>Cauta linia</Text>
                        <TextInput editable={true} value={this.state.textLine} onChangeText={(textLine) => { this.setState({ textLine }) }} style={styles.input} />
                        <TouchableOpacity
                            style={styles.buttonModal}
                            onPress={() => { this.toggleModalLine(!this.state.modalVisibleLine); navigate('Searchline', { lineName: this.state.textLine }); this.setState({ textLine: "" }) }}
                            underlayColor='#fff'>
                            <Text style={styles.text}>{'Cauta'.toLocaleUpperCase()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonModal}
                                onPress={() => this.toggleModalLine(!this.state.modalVisibleLine)}
                            underlayColor='#fff'>
                            <Text style={styles.text}>{'Anuleaza'.toLocaleUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <View style={styles.container}>
                    <TouchableHighlight onPress={() => { this.toggleModal(true) }} style={styles.buttonOpenModal} underlayColor={'transparent'}> 
                        <Text style={styles.textOpenModal}>
                                Cauta statia {"  "}
                            <Icon name="map-signs" size={25} color="white" style={{paddingLeft: 20}}/>
                        </Text>
                    </TouchableHighlight>
                    <TouchableOpacity onPress={() => { this.toggleModalLine(true) }} style={styles.buttonOpenModal} underlayColor={'transparent'}>
                        <Text style={styles.textOpenModal}>
                            <Icon name="bus" size={25} color="white" style={{ paddingLeft: 20 }} />
                            {"  "} Cauta linia 
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container2}>
                   
                </View>
            </View>
          
        );
    }
}

const styles = StyleSheet.create({
    bottom:{
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'black',
    },
    container: {
        // alignItems: 'center',
        // padding: 10,
        // top: 30+"%",
        // display: 'flex',
        // justifyContent: 'center',
        // backgroundColor: 'black',
        // borderRadius: 25,
        // color: 'white',
        // width: 80+"%",
        // left: 50+"%",
        // transform: [
        //     { translateX: - dimensions.width/2.5 },
        // ],
        flexDirection: 'row',
        backgroundColor: '#9d73fd',
        // flex: .5,
    },
    container2: {
        // alignItems: 'center',
        // padding: 10,
        // top: 35 + "%",
        // display: 'flex',
        // justifyContent: 'center',
        // backgroundColor: 'black',
        // borderRadius: 25,
        // color: 'white',
        // width: 80 + "%",
        // left: 50 + "%",
        // transform: [
        //     { translateX: - dimensions.width / 2.5 },
        // ],
        // marginTop: 20,
        flexDirection: 'row',
        backgroundColor: 'black',
        // flex: .5,

    },
    modal: {
        overflow: 'hidden',
        textAlign: 'center',
        position: 'absolute',
        width: 90+"%",
        height: 90+'%',
        top: 0,
        left: 0,
        backgroundColor: '#0E5BBC',
        padding: 50,
        borderBottomLeftRadius: 100,
        borderTopRightRadius: 100,
        // borderRadius: 25,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        flex: 1,
    },
    text:{
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '900',
        letterSpacing: 1,
    },
    textModal: {
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '900',
        letterSpacing: 1,
        fontSize: 25,
    },
    textOpenModal: {
        color: 'white',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: '900',
        letterSpacing: 1,
        fontSize: 19,
    },
    input:{
        borderBottomWidth: 2,
        borderColor: 'white',
        marginTop: 20,
        marginBottom: 20,
        fontSize: 25,
        color: "white",
        fontWeight: '900',
    },
    buttonModal:{
        marginTop: 25,
        textAlign: 'center',
        borderRadius: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: 20,
        backgroundColor: '#1B1D1C',
        paddingBottom: 10,
        flex: .05,
        minHeight: 30,
        height: 30,
    },
    bgImages:{
       width: imageWidth,
       height: 1000,
       position: 'absolute',
       zIndex: 0,
       bottom: 0,
    },
    bgMain: {
        height: dimensions.height,
        width: dimensions.width,

        position: 'absolute',
        zIndex: 0,
        top: 0,
        opacity: 1,
        
    },
    buttonOpenModal:{
        width: dimensions.width/2
    },
    buttonOpenModalLine: {
        width: 348,
    }
})