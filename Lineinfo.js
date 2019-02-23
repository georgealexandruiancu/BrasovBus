import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    Animated,
    Image,
    Easing
} from 'react-native';
import { withTheme } from 'glamorous-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Table, Row, Rows } from 'react-native-table-component';
import LinearGradient from 'react-native-linear-gradient';
import BottomNav from './BottomNav';
const timing = 500;

export default class Lineinfo extends React.Component {
    static navigationOptions = {
        backButton: {
            color: "white",
        },
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
    navigate = this.props.navigation;
    titleStation = this.navigate.getParam('titleStation');
    dataLine = this.navigate.getParam('dataLine');
    lineName = this.navigate.getParam('lineName');
    departure = this.navigate.getParam('departure');
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ["Ora", "Minutul"],
            tableData: [],
            selectedTime: '',
            selectedSchedule: '',
            selectedOne: false,
            selectedTwo: false,
            showText: true,
            exactTime: '',
            activeWeek: false,
            activeWeekend: false,
        }
        // setInterval(() => {
        //     this.setState({ showText: !this.state.showText });
        // }, 800);
        this._isMounted = false;
    }
    componentDidMount(){
        this._isMounted = true;
        
        if (this._isMounted === true) {
            console.log(this.dataLine)
            console.log(this.titleStation)

            if (typeof this.dataLine !== 'undefined' && typeof this.dataLine[this.titleStation].sambataDuminica !== 'undefined') {
                this.setState({
                    data: {
                        luniVineri: this.dataLine[this.titleStation].luniVineri,
                        sambataDuminica: this.dataLine[this.titleStation].sambataDuminica
                    },
                    buttonsThree: false,

                });
                

            } else if (typeof this.dataLine !== 'undefined' && typeof this.dataLine[this.titleStation].sambata !== 'undefined') {
                this.setState({
                    data: {
                        luniVineri: this.dataLine[this.titleStation].luniVineri,
                        sambata: this.dataLine[this.titleStation].sambata,
                        duminica: this.dataLine[this.titleStation].duminica,
                    },
                    buttonsThree: true,
                });
            }

            if (typeof this.dataLine !== 'undefined' && typeof this.dataLine[this.titleStation].sambataDuminica !== 'undefined') {
                this.setState({
                    data: {
                        luniVineri: this.dataLine[this.titleStation].luniVineri,
                        sambataDuminica: this.dataLine[this.titleStation].sambataDuminica
                    },
                    buttonsThree: false,
                });
               

            } else if (typeof this.dataLine !== 'undefined' && typeof this.dataLine[this.titleStation].sambata !== 'undefined') {
                this.setState({
                    data: {
                        luniVineri: this.dataLine[this.titleStation].luniVineri,
                        sambata: this.dataLine[this.titleStation].sambata,
                        duminica: this.dataLine[this.titleStation].duminica,
                    },
                    buttonsThree: true,
                });
            }


        }
    }
    viewSchedule = (departure) => {
        if (this._isMounted === true) {
            var i = 5;
            var allHours = [];
            this.state.tableData = [];
            if (departure === 'week') {
                this.setState({ selectedTime: 'week', selectedTwo: true })
               

                Object.keys(this.state.data.luniVineri).forEach((keys) => {
                    var arrForPush = []
                    Object.values(this.state.data.luniVineri[keys]).forEach((minutes) => {
                        allHours.push(keys + ":" + minutes)
                        arrForPush = [keys, this.state.data.luniVineri[keys] + " "]
                    })
                    this.state.tableData.push(arrForPush);

                });
                this.state.tableData.sort();
                console.log(allHours);


            } else if (departure === 'weekend' ) {
                this.setState({ selectedTime: 'weekend', selectedTwo: true })
                Object.keys(this.state.data.sambataDuminica).forEach((keys) => {
                    var arrForPush = []
                    Object.values(this.state.data.sambataDuminica[keys]).forEach((minutes) => {
                        allHours.push(keys + ":" + minutes)
                        arrForPush = [keys, this.state.data.sambataDuminica[keys] + " "]
                    })
                    this.state.tableData.push(arrForPush);

                });
                this.state.tableData.sort();
                console.log(allHours);


            } else if (departure === 'sambata') {
                this.setState({ selectedTime: 'sambata', selectedTwo: true })
                Object.keys(this.state.data.sambata).forEach((keys) => {
                    var arrForPush = []
                    Object.values(this.state.data.sambata[keys]).forEach((minutes) => {
                        allHours.push(keys + ":" + minutes)
                        arrForPush = [keys, this.state.data.sambata[keys] + " "]
                    })
                    this.state.tableData.push(arrForPush);

                });
                this.state.tableData.sort();
                console.log(allHours);


            } 
            else if (departure === 'duminica') {
                this.setState({ selectedTime: 'duminica', selectedTwo: true })
                Object.keys(this.state.data.duminica).forEach((keys) => {
                    var arrForPush = []
                    Object.values(this.state.data.duminica[keys]).forEach((minutes) => {
                        allHours.push(keys + ":" + minutes)
                        arrForPush = [keys, this.state.data.duminica[keys] + " "]
                    })
                    this.state.tableData.push(arrForPush);

                });
                this.state.tableData.sort();
                console.log(allHours);
            } 
        }
    }
    checkView() {
        if ( this.state.selectedTime !== "" && this._isMounted === true) {
            return (
                <View style={{marginBottom: 100}}>
                    <View style={styles.containerTable}>
                        <LinearGradient colors={['#9d73fd', '#012854']} style={{ borderRadius: 25 }}>
                            <Table borderStyle={{ borderWidth: 2, borderColor: 'transparent', borderRadius: 25 }}>
                                <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                                <Rows data={this.state.tableData} textStyle={styles.text} />
                            </Table>
                        </LinearGradient>
                    </View>
                </View>
            )
        }
    }
    errorForUser() {

        if (this.state.selectedOne === false) {
            let display = this.state.showText ? "Te rugăm să alegi perioada (L-V / S-D)" : ' ';
            return (
                <Text style={styles.err}>{display}</Text>
            )
        }
    }
    _checkTimeWeek() {
        if (this.state.buttonsThree) {
            return (
                <View style={styles.container}>
                    <TouchableOpacity
                        style={[styles.buttonModalLeft, this.state.activeWeek && styles.active]}
                        onPress={() => { this.viewSchedule('week'); this.setState({ activeWeek: true, activeWeekend: false, activeSambata: false, activeDuminica: false }) }}
                        underlayColor='#fff'>
                        <Icon name="calendar" size={22} color="black" style={styles.iconLeft} />

                        <Text style={styles.text}>{'L-V'.toLocaleUpperCase()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonModalRound, this.state.activeSambata && styles.active]}
                        onPress={() => { this.viewSchedule('sambata'); this.setState({ activeWeek: false, activeWeekend: false, activeSambata: true, activeDuminica: false }) }}
                        underlayColor='#fff'>
                        <Text style={styles.text}>{'S'.toLocaleUpperCase()}</Text>


                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonModalRight, this.state.activeDuminica && styles.active]}
                        onPress={() => { this.viewSchedule('duminica'); this.setState({ activeWeek: false, activeWeekend: false, activeSambata: false, activeDuminica: true }) }}
                        underlayColor='#fff'>
                        <Text style={styles.text}>{'D'.toLocaleUpperCase()}</Text>
                        <Icon name="calendar" size={22} color="black" style={styles.iconRight} />

                    </TouchableOpacity>
                </View>
            )
        } else if (this.state.buttonsThree === false) {
            return (
                <View style={styles.container}>
                    <TouchableOpacity
                        style={[styles.buttonModalLeft, this.state.activeWeek && styles.active]}
                        onPress={() => { this.viewSchedule('week'); this.setState({ activeWeek: true, activeWeekend: false }) }}
                        underlayColor='#fff'>
                        <Icon name="calendar" size={22} color="black" style={styles.iconLeft} />

                        <Text style={styles.text}>{'L-V'.toLocaleUpperCase()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonModalRight, this.state.activeWeekend && styles.active]}
                        onPress={() => { this.viewSchedule('weekend'); this.setState({ activeWeek: false, activeWeekend: true }) }}
                        underlayColor='#fff'>
                        <Text style={styles.text}>{'S-D'.toLocaleUpperCase()}</Text>
                        <Icon name="calendar" size={22} color="black" style={styles.iconRight} />

                    </TouchableOpacity>
                </View>
            )
        }
    }
    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <Text style={styles.titleLine}>Program: </Text>
                    <Text style={styles.titleLine}>{this.lineName} ({this.departure}) in statia: {this.titleStation}</Text>
                    {/* <Text style={styles.titleRoute}>{this.dataLine}</Text> */}
                    {this.errorForUser()}
                    {this._checkTimeWeek()}
                    {this.checkView()}
                </ScrollView>
                {/* <View>
                    <BottomNav navigate={this.props.navigation}></BottomNav>
                </View> */}
            </View>
           
        );
    }
}
const styles = StyleSheet.create({
    err: { padding: 20, color: '#f44242', textAlign: 'center', fontWeight: '700', height: 75 },
    containerTable: { padding: 20, borderRadius: 50 },
    head: { height: 60, backgroundColor: '#000', borderRadius: 25, paddingTop: 10, paddingBottom: 10, },
    text: { paddingTop: 10, paddingBottom: 10, backgroundColor: '#000', color: 'black' },
    container: {
        width: 100 + "%",
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLeft: {
        width: 400,
        position: 'absolute',
        right: 0,
    },
    buttonRight: {
        width: 100,
        position: 'absolute',
        left: 0,
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
        width: 125,
        position: 'relative',
    },
    active: {
        backgroundColor: '#9d73fd',
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
        width: 125,
        position: 'relative',

    },
    buttonModalRound: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: 10,
        backgroundColor: '#012853',
        paddingBottom: 10,
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        width: 125,
        position: 'relative',

    },
    buttonModalLeftDisabled: {
        textAlign: 'center',
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: 10,
        backgroundColor: 'grey',
        paddingBottom: 10,
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        width: 125,
        position: 'relative',
    },
    buttonModalRightDisabled: {
        textAlign: 'center',
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: 10,
        backgroundColor: 'grey',
        paddingBottom: 10,
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        width: 125,
        position: 'relative',

    },
    text: {
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '900',
        letterSpacing: 1,
        fontSize: 15,
    },
    titleLine: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 23,
        fontWeight: '900',
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
    },
    titleRoute: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 16,
        fontWeight: '900',
        color: 'black',
        alignSelf: 'center',
    },
    titleExpected: {
        paddingTop: 10,
        fontSize: 18,
        fontWeight: '900',
        color: 'black',
        alignSelf: 'center',
    },
    hoursMinutes: {
        paddingTop: 10,
        fontSize: 25,
        fontWeight: '900',
        color: 'black',
        alignSelf: 'center',
    },
    listStation: {
        backgroundColor: 'black',
        width: 90 + "%",
        color: 'white',
        position: 'relative',
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 20,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    textLine: {
        color: 'white',
        fontSize: 23,
        paddingLeft: 30,
        fontWeight: "900",
    },
    iconLeft: {
        position: 'absolute',
        left: 15,
        top: 9,
        bottom: 0,
        color: 'white',
    },
    iconRight: {
        position: 'absolute',
        right: 15,
        top: 9,
        bottom: 0,
        color: 'white',
    }
})