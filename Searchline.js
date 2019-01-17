import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { withTheme } from 'glamorous-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-spinkit';
const dimensions = Dimensions.get('window');
export default class Stations extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        setInterval(() => {
            this.setState({ showText: !this.state.showText });
        }, 800);
    }
    navigate = this.props.navigation;
    state = {
        lineName: this.navigate.getParam('lineName'),
        allRoutes: '',
        stationSearch: '',
        error: 0,
        activeGoing: false,
        activeReturned: false,
        selectedOne: false,
    };
    static navigationOptions = {
        title: 'Statii',
    };
    componentDidMount() {
        this._isMounted = true;
        console.log("AIAIAIAIAIA: " + JSON.stringify(this.state.lineName));
        if (this.state.lineName !== this.state.lineName.toUpperCase()) {
            var splitStr = this.state.lineName.toLowerCase().split(' ');
            splitStr[0] = splitStr[0].charAt(0).toUpperCase() + splitStr[0].substring(1);
            splitStr[1] = splitStr[1].toUpperCase();

            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            this.state.lineName = splitStr.join(" ");
        }
        if(this.state.lineName[this.state.lineName.length - 1] === " "){
            this.state.lineName = this.state.lineName.substring(0, this.state.lineName.length - 1);
        }
        var search = 'https://ratbv-scraper.herokuapp.com/schedule?route=' + this.state.lineName;

        fetch(search)
            .then(function (response) {
                return response.json();
            })
            .then((myJson) => {

                if (this._isMounted) {
                    this.setState({
                        lineSearch: {
                            going: myJson.data[this.state.lineName].dus,
                            returned: myJson.data[this.state.lineName].intors,
                        }
                    });
                }
            })
    }
    errorForUser() {

        if (this.state.selectedOne === false ) {
            let display = this.state.showText ? "Te rugam sa alegi ruta (dus/intors)" : ' ';
            return (
                <Text style={styles.err}>{display}</Text>
            )
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    viewComponent = () => {
        const { navigate } = this.props.navigation;
        var tableGoing = [];
        var tableReturned = [];
        if (this._isMounted === true) {
            if (typeof this.state.lineSearch.going !== 'undefined' && this.state.error !== 1) {
                Object.keys(this.state.lineSearch.going).map((item) => {
                    tableGoing.push(
                        <View style={styles.gradient} key={item}>
                            <LinearGradient colors={['#9d73fd', '#012853']}>
                                <TouchableOpacity style={styles.listStation} onPress={() => { navigate('Lineinfo', { titleStation: item, dataLine: this.state.lineSearch.going, lineName: this.state.lineName, departure: 'dus' }) }}>
                                    <Text style={styles.textLine}> {item}</Text>
                                    <Icon name="chevron-circle-right" size={25} color="white" style={styles.icon} />
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    )
                })
            }
            else if (this.state.error === 1) {
                return (
                    <Text> Avem niste probleme, lucram la mentenanta :(, Ne pare rau!</Text>
                )
            }
            else {
                return (
                    <Spinner style={styles.spinner} color={'#9d73fd'} size={100} type={'Wave'} />
                )
            }
            if (typeof this.state.lineSearch.returned !== 'undefined' && this.state.error !== 1) {
                Object.keys(this.state.lineSearch.returned).map((item) => {
                    tableReturned.push(
                        <View style={styles.gradient} key={item}>
                            <LinearGradient colors={['#9d73fd', '#012853']}>
                                <TouchableOpacity style={styles.listStation} onPress={() => { navigate('Lineinfo', { titleStation: item, dataLine: this.state.lineSearch.returned, lineName: this.state.lineName, departure: 'intors' }) }}>
                                    <Text style={styles.textLine}> {item}</Text>
                                    <Icon name="chevron-circle-right" size={25} color="white" style={styles.icon} />
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    )
                })
            }
            else if (this.state.error === 1) {
                return (
                    <Text> Avem niste probleme, lucram la mentenanta :(, Ne pare rau!</Text>
                )
            }
            else {
                return (
                    <Spinner style={styles.spinner} color={'#9d73fd'} size={100} type={'Wave'} />
                )
            }
        }
        if(this.state.departure === "going"){
            return tableGoing;
        }
        if(this.state.departure === "returned"){
            return tableReturned;
        }
    }
    
    render() {
        return (
            <ScrollView>
                {this.errorForUser()}
                
                <View style={styles.container}>

                    <TouchableOpacity
                        style={[styles.buttonModalLeft, this.state.activeGoing && styles.active]}
                        onPress={() => { this.setState({ departure: 'going', activeGoing: true, activeReturned: false, selectedOne: true, selectedOne: true }) }}
                        underlayColor='#fff'>
                        <Icon name="chevron-circle-left" size={25} color="black" style={styles.iconLeft} />
                        <Text style={styles.text}>{'Dus'.toLocaleUpperCase()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonModalRight, this.state.activeReturned && styles.active]}
                        onPress={() => { this.setState({ departure: 'returned', activeGoing: false, activeReturned: true, selectedOne: true, selectedOne: true }) }}
                        underlayColor='#fff'>
                        <Text style={styles.text}>{'Intors'.toLocaleUpperCase()}</Text>
                        <Icon name="chevron-circle-right" size={25} color="black" style={styles.iconRight} />
                    </TouchableOpacity>
                </View>
                {this.viewComponent()}
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    err: { padding: 20, color: '#9d73fd', textAlign: 'center', fontWeight: '700', height: 75 },
    spinner: {
        alignSelf: 'center',
        marginTop: 150,
    },
    text: {
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '900',
        letterSpacing: 1,
        fontSize: 18,
    },
    iconLeft: {
        position: 'absolute',
        left: 15,
        top: 6,
        bottom: 0,
        color: 'white',
    },
    iconRight: {
        position: 'absolute',
        right: 15,
        top: 6,
        bottom: 0,
        color: 'white',
    },
    gradient: {
        marginTop: 10,
        borderRadius: 10,
        overflow: 'hidden',
        width: 90 + "%",
        alignSelf: 'center',
    },
    buttonModalLeft: {
        textAlign: 'center',
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: 10,
        backgroundColor: '#012853',
        paddingBottom: 10,
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        width: 150,
        position: 'relative',
    },
    buttonModalRight: {
        textAlign: 'center',
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: 10,
        backgroundColor: '#012853',
        paddingBottom: 10,
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        width: 150,
        position: 'relative',
    },
    active:{
        backgroundColor: '#9d73fd',
    },
    container: {
        width: 100 + "%",
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listStation: {
        width: 90 + "%",
        color: 'white',
        position: 'relative',
        paddingTop: 20,
        paddingBottom: 30,
        alignSelf: 'center',
        borderRadius: 20,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    textLine: {
        color: 'white',
        fontSize: 20,
        paddingLeft: 30,
        fontWeight: "900",
    },
    textRoute: {
        color: 'white',
        fontSize: 14,
        position: 'absolute',
        bottom: 20,
        left: 20,
        fontWeight: "900",
        width: 100 + "%",
    },
    icon: {
        position: 'absolute',
        right: 30,
        top: 20,
        bottom: 20,
        color: 'white',
    }
})