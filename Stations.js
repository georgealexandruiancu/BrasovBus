import React, { Component } from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-spinkit';
const dimensions = Dimensions.get('window');

export default class Stations extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        // rest of your code
    }
    navigate = this.props.navigation;
    state = {
        stationName: this.navigate.getParam('stationName'),
        allRoutes: '',
        stationSearch: '',
        error: 0,
        clickOnce: 0
    };
    static navigationOptions = {
        backButton: {
            color: "white",
        },
        title: 'Linii',
        headerTintColor: 'white',
        headerTitleStyle: {
            color: 'white',
        },
        headerStyle: {
            backgroundColor: '#3b37fe',
            color: 'white'
        },
        titleStyle: { color: 'white' },
    };
    componentDidMount() {

        this._isMounted = true;
        if (this.navigate.getParam('stationName') !== this.state.stationName) {
            this.setState({ stationName: this.navigate.getParam('stationName') });
        }
        fetch('https://ratbv-scraper.herokuapp.com/allroutes')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                if (this._isMounted) {
                    this.setState({ allRoutes: myJson.data });
                }
            })
            .then(() => {
                
                var search = 'https://ratbv-scraper.herokuapp.com/schedule?station=' + this.state.stationName;

                fetch(search)
                    .then(function (response) {
                        return response.json();
                    })
                    .then((myJson) => {

                        this.setState({ stationSearch: myJson.data, status: myJson.status.err });
                    })
                    .then(() => {
                        console.log(this.state.stationSearch)
                    })
            })
            .catch(error => {
                this.setState({ error: 1 });
            })
    }
    componentWillUnmount() {
        this._isMounted = false;
        //this.props.navigation.dispatch();
        this.setState({ stationName: "" })
    }
    isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    }
    viewComponent = () => {
        const { navigate } = this.props.navigation;
        var table = [];

        if (this.state.status === true) {

            return (
                <Text style={styles.textErr}> Nu am gasit nici un rezultat pentru {this.state.stationName}. Incearca din nou !</Text>
            )
        }
        else if (this.state.stationSearch !== '' && this.state.error !== 1) {
            Object.keys(this.state.stationSearch).map((item) => {

                Object.keys(this.state.allRoutes).map((key) => {

                    if (key === item) {
                        var TempRoute = Object.values(this.state.allRoutes[key])[1]
                        TempRoute = TempRoute.split("-");
                        if(TempRoute.length < 3){
                            TempRoute = TempRoute[1] + " - " + TempRoute[0]
                        }else{
                            TempRoute = TempRoute[2] + " - " + TempRoute[1] + " - " + TempRoute[0]
                        }
                        TempRoute = TempRoute.replace("Ceta?ii", "Cetații")
                        TempRoute = TempRoute.replace("Grivi?ei", "Griviței")
                        TempRoute = TempRoute.replace("Bra?ov", "Brașov")

                        table.push(
                            <View style={styles.gradient} key={item}>
                                <LinearGradient colors={['#9d73fd', '#012853']}>
                                    <TouchableOpacity style={styles.listStation} onPress={() => { table = []; navigate('Line', { titleLine: item, dataLine: this.state.stationSearch[item], route: TempRoute, stationName: this.state.stationName }) }}>
                                        <Text style={styles.textLine}> {item}</Text>
                                        <Text style={styles.textRoute}>{"\n"}{"\n"}{TempRoute}</Text>
                                        <Icon name="chevron-circle-right" size={25} color="white" style={styles.icon} />
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        )
                    }
                })

            })
            return table;
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
    render() {
        return (
            <ScrollView>

                {this.viewComponent()}
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    spinner: {
        alignSelf: 'center',
        marginTop: 150,
    },
    gradient: {
        marginTop: 10,
        borderRadius: 10,
        overflow: 'hidden',
        width: 90 + "%",
        alignSelf: 'center',
    },
    listStation: {
        width: 90 + "%",
        color: 'white',
        position: 'relative',
        paddingTop: 20,
        paddingBottom: 60,
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
    textErr: {
        color: 'black',
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