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
    Easing,
    AsyncStorage
} from 'react-native';
import { withTheme } from 'glamorous-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Table, Row, Rows } from 'react-native-table-component';
import LinearGradient from 'react-native-linear-gradient';
import BottomNav from './BottomNav';
const timing = 500;

export default class Line extends React.Component {
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
            activeGoing: false,
            activeReturned: false,
            activeWeek: false,
            activeWeekend: false,
            activeDuminica: false,
            activeSambata: false,
            willSave:{
                station: '',
                line: '',
                departure: '',
                time: '',
                data: '',
                route: ''
            },
            saveButton: true,
            buttonsThree: false,
        }
        // setInterval(() => {
        //     this.setState({ showText: !this.state.showText });
        // }, 800);
        this._isMounted = false;
    }
    navigate = this.props.navigation;
    titleLine = this.navigate.getParam('titleLine');
    dataLine = this.navigate.getParam('dataLine');
    route = this.navigate.getParam('route');

    stationName = this.navigate.getParam('stationName');

    componentDidMount() {
        this._isMounted = true;
        this.route = this.route.replace("Ceta?ii", "Cetații")
        this.route = this.route.replace("Grivi?ei", "Griviței")
        this.route = this.route.replace("Bra?ov", "Brașov")
        if (this._isMounted === true) {
            console.log(this.dataLine)
            if (typeof this.dataLine.intors !== 'undefined' && typeof this.dataLine.intors[this.stationName].sambataDuminica !== 'undefined') {
                this.setState({
                    returned: {
                        luniVineri: this.dataLine.intors[this.stationName].luniVineri,
                        sambataDuminica: this.dataLine.intors[this.stationName].sambataDuminica
                    },
                    buttonsThree: false,

                });
                console.log(this.dataLine.dus);

            } else if (typeof this.dataLine.intors !== 'undefined' && typeof this.dataLine.intors[this.stationName].sambata !== 'undefined') {
                this.setState({
                    returned: {
                        luniVineri: this.dataLine.intors[this.stationName].luniVineri,
                        sambata: this.dataLine.intors[this.stationName].sambata,
                        duminica: this.dataLine.intors[this.stationName].duminica,
                    },
                    buttonsThree: true,
                });
            }
            
            if (typeof this.dataLine.dus !== 'undefined' && typeof this.dataLine.dus[this.stationName].sambataDuminica !== 'undefined') {
                this.setState({
                    going: {
                        luniVineri: this.dataLine.dus[this.stationName].luniVineri,
                        sambataDuminica: this.dataLine.dus[this.stationName].sambataDuminica
                    },
                    buttonsThree: false,
                });
                console.log(this.dataLine.dus);

            } else if (typeof this.dataLine.dus !== 'undefined' && typeof this.dataLine.dus[this.stationName].sambata !== 'undefined'){
                this.setState({
                    going: {
                        luniVineri: this.dataLine.dus[this.stationName].luniVineri,
                        sambata: this.dataLine.dus[this.stationName].sambata,
                        duminica: this.dataLine.dus[this.stationName].duminica,
                    },
                    buttonsThree: true,
                });
            }
           

        }
    }
    reverseRoute() {
        var reverseRoute = this.navigate.getParam('route').split('-');
        var newRoute;
        if (reverseRoute.length < 3) {
            newRoute = reverseRoute[1] + ' - ' + reverseRoute[0];
            newRoute = newRoute.replace("Ceta?ii", "Cetații")
            newRoute = newRoute.replace("Grivi?ei", "Griviței")
            newRoute = newRoute.replace("Bra?ov", "Brașov")
        } else {
            newRoute = reverseRoute[2] + ' - ' + reverseRoute[1] + ' - ' + reverseRoute[0];
            newRoute = newRoute.replace("Ceta?ii", "Cetații")
            newRoute = newRoute.replace("Grivi?ei", "Griviței")
            newRoute = newRoute.replace("Bra?ov", "Brașov")
        }
        return newRoute;
    }
    viewTime(departure) {
        if (departure === 'going') {
            var a;
            this.setState({ selectedSchedule: 'going', selectedOne: true })
            this.setState({ activeGoing: true, activeReturned: false })
            this.state.tableData = [];
            this.setState({
                diffMin: '',
                diffHour: '',
                expectedTime: '',
                activeWeek: false,
                activeWeekend: false,
                activeSambata: false,
                activeDuminica: false,
                selectedTime: '',
                selectedTwo: false
            });
            this.route = this.navigate.getParam('route');
            this.route = this.route.replace("Ceta?ii", "Cetații")
            this.route = this.route.replace("Grivi?ei", "Griviței")
            this.route = this.route.replace("Bra?ov", "Brașov")

        } else if (departure === 'returned') {
            this.setState({ selectedSchedule: 'returned', selectedOne: true })
            this.setState({ activeGoing: false, activeReturned: true })
            this.state.tableData = [];
            this.setState({
                diffMin: '',
                diffHour: '',
                expectedTime: '',
                activeWeek: false,
                activeWeekend: false,
                activeSambata: false,
                activeDuminica: false,
                selectedTime: '',
                selectedTwo: false
            });
            this.route = this.reverseRoute()
        }
    }
    errorForUser() {

        if (this.state.selectedOne === false || this.state.selectedTwo === false) {
            let display = this.state.showText ? "Te rugăm să alegi ruta (dus/întors) și data din saptămână (L-V / S-D)" : ' ';
            return (
                <Text style={styles.err}>{display}</Text>
            )
        }
    }
    viewSchedule = (departure) => {

        var date = new Date();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var myDate = hours + ":" + minutes;

        var i = 5;
        var allHours = [];
        this.state.tableData = [];
        if (departure === 'week' && this.state.selectedSchedule === 'going') {
            this.setState({ selectedTime: 'week', selectedTwo: true })
            this.setState({ willSave:{
                station: this.stationName,
                line: this.titleLine,
                departure: "Dus",
                time: "L - V",
                data: this.state.going.luniVineri,
                route: this.route
            }})
            this._checkSavedData();
           
            Object.keys(this.state.going.luniVineri).forEach((keys) => {
                var arrForPush = []
                Object.values(this.state.going.luniVineri[keys]).forEach((minutes) => {
                    allHours.push(keys + ":" + minutes)
                    arrForPush = [keys, this.state.going.luniVineri[keys] + " "]
                })
                this.state.tableData.push(arrForPush);

            });
            this.state.tableData.sort();
            console.log(allHours);
       

        } else if (departure === 'week' && this.state.selectedSchedule === 'returned') {
            this.setState({ selectedTime: 'week', selectedTwo: true })
            this.setState({
                willSave: {
                    station: this.stationName,
                    line: this.titleLine,
                    departure: "Intors",
                    time: "L - V",
                    data: this.state.returned.luniVineri,
                    route: this.route
                }
            })
            this._checkSavedData();
            Object.keys(this.state.returned.luniVineri).forEach((keys) => {
                var arrForPush = []
                Object.values(this.state.returned.luniVineri[keys]).forEach((minutes) => {
                    allHours.push(keys + ":" + minutes)
                    arrForPush = [keys, this.state.returned.luniVineri[keys] + " "]
                })
                this.state.tableData.push(arrForPush);

            });
            this.state.tableData.sort();
            console.log(allHours);
         

        } else if (departure === 'weekend' && this.state.selectedSchedule === 'going') {
            this.setState({ selectedTime: 'weekend', selectedTwo: true })
            this.setState({
                willSave: {
                    station: this.stationName,
                    line: this.titleLine,
                    departure: "Dus",
                    time: "S - D",
                    data: this.state.going.sambataDuminica,
                    route: this.route
                }
            })
            this._checkSavedData();

            Object.keys(this.state.going.sambataDuminica).forEach((keys) => {
                var arrForPush = []
                Object.values(this.state.going.sambataDuminica[keys]).forEach((minutes) => {
                    allHours.push(keys + ":" + minutes)
                    arrForPush = [keys, this.state.going.sambataDuminica[keys] + " "]
                })
                this.state.tableData.push(arrForPush);

            });
            this.state.tableData.sort();
            console.log(allHours);
        } else if (departure === 'weekend' && this.state.selectedSchedule === 'returned') {
            this.setState({ selectedTime: 'weekend', selectedTwo: true })
            this.setState({
                willSave: {
                    station: this.stationName,
                    line: this.titleLine,
                    departure: "Intors",
                    time: "S - D",
                    data: this.state.returned.sambataDuminica,
                    route: this.route
                }
            })
            this._checkSavedData();

            Object.keys(this.state.returned.sambataDuminica).forEach((keys) => {
                var arrForPush = []
                Object.values(this.state.returned.sambataDuminica[keys]).forEach((minutes) => {
                    allHours.push(keys + ":" + minutes)
                    arrForPush = [keys, this.state.returned.sambataDuminica[keys] + " "]
                })
                this.state.tableData.push(arrForPush);

            });
            this.state.tableData.sort();
            console.log(allHours);
        } else if (departure === 'sambata' && this.state.selectedSchedule === 'returned') {
            this.setState({ selectedTime: 'sambata', selectedTwo: true })
            this.setState({
                willSave: {
                    station: this.stationName,
                    line: this.titleLine,
                    departure: "Intors",
                    time: "Sambata",
                    data: this.state.returned.sambata,
                    route: this.route
                }
            })
            this._checkSavedData();

            Object.keys(this.state.returned.sambata).forEach((keys) => {
                var arrForPush = []
                Object.values(this.state.returned.sambata[keys]).forEach((minutes) => {
                    allHours.push(keys + ":" + minutes)
                    arrForPush = [keys, this.state.returned.sambata[keys] + " "]
                })
                this.state.tableData.push(arrForPush);

            });
            this.state.tableData.sort();
            console.log(allHours);
        }
        else if (departure === 'duminica' && this.state.selectedSchedule === 'returned') {
            this.setState({ selectedTime: 'duminica', selectedTwo: true })
            this.setState({
                willSave: {
                    station: this.stationName,
                    line: this.titleLine,
                    departure: "Intors",
                    time: "Duminica",
                    data: this.state.returned.duminica,
                    route: this.route
                }
            })
            this._checkSavedData();

            Object.keys(this.state.returned.duminica).forEach((keys) => {
                var arrForPush = []
                Object.values(this.state.returned.duminica[keys]).forEach((minutes) => {
                    allHours.push(keys + ":" + minutes)
                    arrForPush = [keys, this.state.returned.duminica[keys] + " "]
                })
                this.state.tableData.push(arrForPush);

            });
            this.state.tableData.sort();
            console.log(allHours);
        }
        else if (departure === 'duminica' && this.state.selectedSchedule === 'going') {
            this.setState({ selectedTime: 'duminica', selectedTwo: true })
            this.setState({
                willSave: {
                    station: this.stationName,
                    line: this.titleLine,
                    departure: "Intors",
                    time: "Duminica",
                    data: this.state.going.duminica,
                    route: this.route
                }
            })
            this._checkSavedData();

            Object.keys(this.state.going.duminica).forEach((keys) => {
                var arrForPush = []
                Object.values(this.state.going.duminica[keys]).forEach((minutes) => {
                    allHours.push(keys + ":" + minutes)
                    arrForPush = [keys, this.state.going.duminica[keys] + " "]
                })
                this.state.tableData.push(arrForPush);

            });
            this.state.tableData.sort();
            console.log(allHours);
        }
        else if (departure === 'sambata' && this.state.selectedSchedule === 'going') {
            this.setState({ selectedTime: 'sambata', selectedTwo: true })
            this.setState({
                willSave: {
                    station: this.stationName,
                    line: this.titleLine,
                    departure: "Intors",
                    time: "Sambata",
                    data: this.state.going.sambata,
                    route: this.route
                }
            })
            this._checkSavedData();

            Object.keys(this.state.going.sambata).forEach((keys) => {
                var arrForPush = []
                Object.values(this.state.going.sambata[keys]).forEach((minutes) => {
                    allHours.push(keys + ":" + minutes)
                    arrForPush = [keys, this.state.going.sambata[keys] + " "]
                })
                this.state.tableData.push(arrForPush);

            });
            this.state.tableData.sort();
            console.log(allHours);
        }


        this.setState({
            diffMin: '',
            diffHour: ''
        });
        for (let i = 0; i < allHours.length; i++) {

            if (myDate < allHours[i]) {

                var date1 = new Date();
                var date2 = new Date();
                let expectedTime = allHours[i].split(":");
                if (expectedTime[1] != "[]") {

                    let TimeStar = expectedTime[1].split("*");

                    if (TimeStar[1] === "") {

                        this.setState({ expectedTime: allHours[i] });
                        let myTime = myDate.split(":");
                        date1.setHours(myTime[0]); date1.setMinutes(myTime[1]);
                        date2.setHours(expectedTime[0]); date2.setMinutes(TimeStar[0]);
                        var msec = date2 - date1;
                        var mins = parseInt((msec / (1000 * 60)) % 60)
                        var hrs = parseInt((msec / (1000 * 60 * 60)) % 24);

                        hrs = (hrs < 10) ? "0" + hrs : hrs;
                        mins = (mins < 10) ? "0" + mins : mins;
                        if (hrs != 0) {
                            this.setState({ exactTime: hrs + " ore " + mins + " minute" })
                        } else {
                            this.setState({ exactTime: mins + " minute" })
                        }
                    } else {
                        this.setState({ expectedTime: allHours[i] });
                        let myTime = myDate.split(":");
                        date1.setHours(myTime[0]); date1.setMinutes(myTime[1]);
                        date2.setHours(expectedTime[0]); date2.setMinutes(expectedTime[1]);
                        var msec = date2 - date1;
                        var mins = parseInt((msec / (1000 * 60)) % 60)
                        var hrs = parseInt((msec / (1000 * 60 * 60)) % 24);

                        hrs = (hrs < 10) ? "0" + hrs : hrs;
                        mins = (mins < 10) ? "0" + mins : mins;
                        if (hrs != 0) {
                            this.setState({ exactTime: hrs + " ore " + mins + " minute" })
                        } else {
                            this.setState({ exactTime: mins + " minute" })
                        }
                    }

                }
                else if (expectedTime[1] === "[]") {
                    i++;
                    let expectedTime = allHours[i].split(":");
                    if (expectedTime[1] != "[]") {

                        var TimeStar = expectedTime[1].split("*");
                        if (TimeStar[1] === "") {
                            this.setState({ expectedTime: allHours[i] });
                            let myTime = myDate.split(":");
                            date1.setHours(myTime[0]); date1.setMinutes(myTime[1]);
                            date2.setHours(expectedTime[0]); date2.setMinutes(TimeStar[0]);
                            var msec = date2 - date1;
                            var mins = parseInt((msec / (1000 * 60)) % 60)
                            var hrs = parseInt((msec / (1000 * 60 * 60)) % 24);

                            hrs = (hrs < 10) ? "0" + hrs : hrs;
                            mins = (mins < 10) ? "0" + mins : mins;
                            if (hrs != 0) {
                                this.setState({ exactTime: hrs + " ore " + mins + " minute" })
                            } else {
                                this.setState({ exactTime: mins + " minute" })
                            }
                        } else {
                            this.setState({ expectedTime: allHours[i] });
                            let myTime = myDate.split(":");
                            date1.setHours(myTime[0]); date1.setMinutes(myTime[1]);
                            date2.setHours(expectedTime[0]); date2.setMinutes(expectedTime[1]);
                            var msec = date2 - date1;
                            var mins = parseInt((msec / (1000 * 60)) % 60)
                            var hrs = parseInt((msec / (1000 * 60 * 60)) % 24);

                            hrs = (hrs < 10) ? "0" + hrs : hrs;
                            mins = (mins < 10) ? "0" + mins : mins;
                            if (hrs != 0) {
                                this.setState({ exactTime: hrs + " ore " + mins + " minute" })
                            } else {
                                this.setState({ exactTime: mins + " minute" })
                            }
                        }
                    }
                    else {
                        this.setState({ expectedTime: "--:--", exactTime: "" })
                    }
                }
                else {
                    this.setState({ expectedTime: "--:--", exactTime: "" })
                }
                break;
            }
        }

    }
    checkView() {
        if (this.state.selectedSchedule !== "" && this.state.selectedTime !== "") {
            return (
                <View>
                    <Text style={styles.titleExpected}>Ajunge în stația {this.stationName} la: {this.state.expectedTime}</Text>
                    <Text style={styles.hoursMinutes}>{this.state.exactTime}</Text>
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

    checkDeparture() {
        console.log(this.dataLine);
        if (typeof this.dataLine.intors !== 'undefined' && typeof this.dataLine.dus !== 'undefined') {
            return (
                <View style={styles.container}>
                    <TouchableOpacity
                        style={[styles.buttonModalLeft, this.state.activeGoing && styles.active]}
                        onPress={() => {
                            this.viewTime('going');
                        }}
                        underlayColor='#fff'>
                        <Icon name="chevron-circle-left" size={25} color="black" style={styles.iconLeft} />
                        <Text style={styles.text}>{'Dus'.toLocaleUpperCase()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonModalRight, this.state.activeReturned && styles.active]}
                        onPress={() => {
                            this.viewTime('returned');
                        }}
                        underlayColor='#fff'>
                        <Text style={styles.text}>{'Întors'.toLocaleUpperCase()}</Text>
                        <Icon name="chevron-circle-right" size={25} color="black" style={styles.iconRight} />
                    </TouchableOpacity>
                </View>
            )
        }
        else if (typeof this.dataLine.intors !== 'undefined') {
            return (
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.buttonModalLeftDisabled}
                        disabled={true}
                        underlayColor='#fff'>
                        <Icon name="chevron-circle-left" size={25} color="black" style={styles.iconLeft} />
                        <Text style={styles.text}>{'Dus'.toLocaleUpperCase()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonModalRight, this.state.activeReturned && styles.active]}
                        onPress={() => {
                            this.viewTime('returned')
                        }}
                        underlayColor='#fff'>
                        <Text style={styles.text}>{'Întors'.toLocaleUpperCase()}</Text>
                        <Icon name="chevron-circle-right" size={25} color="black" style={styles.iconRight} />
                    </TouchableOpacity>
                </View>
            )
        }
        else if (typeof this.dataLine.dus !== 'undefined') {
            return (
                <View style={styles.container}>
                    <TouchableOpacity
                        style={[styles.buttonModalLeft, this.state.activeGoing && styles.active]}
                        onPress={() => {
                            this.viewTime('going')
                        }}
                        underlayColor='#fff'>
                        <Icon name="chevron-circle-left" size={22} color="black" style={styles.iconLeft} />
                        <Text style={styles.text}>{'Dus'.toLocaleUpperCase()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonModalRightDisabled}
                        disabled={true}
                        underlayColor='#fff'>
                        <Text style={styles.text}>{'Întors'.toLocaleUpperCase()}</Text>
                        <Icon name="chevron-circle-right" size={22} color="black" style={styles.iconRight} />
                    </TouchableOpacity>
                </View>
            )
        }
    }
    _storeData = async () => {
        try {
            var saved = await AsyncStorage.getItem('Saved');
           
            if (saved !== null){
                let savedParsed = JSON.parse(saved);
                savedParsed.push(this.state.willSave);
                await AsyncStorage.setItem('Saved', JSON.stringify(savedParsed));
            }else{
                var newSave = []
                newSave.push(this.state.willSave);
                await AsyncStorage.setItem('Saved', JSON.stringify(newSave));
            }
         
        } catch (error) {
            alert("erorare" + error)
        }
    };
    _checkSavedData = async () =>{
        var saved = await AsyncStorage.getItem('Saved');
        let savedParsed = JSON.parse(saved);
        this.setState({ saveButton: true });
        if (savedParsed !== null){
            for (var i = 0; i < savedParsed.length; i++) {
                if (this.state.willSave.station === savedParsed[i].station && this.state.willSave.line === savedParsed[i].line && this.state.willSave.departure === savedParsed[i].departure && this.state.willSave.time === savedParsed[i].time) {
                    this.setState({saveButton: false});
                    break;
                }
            }
            for (var i = 0; i < savedParsed.length; i++) {
                if (this.state.willSave.station === savedParsed[i].station && this.state.willSave.line === savedParsed[i].line && this.state.willSave.departure === savedParsed[i].departure && this.state.willSave.time === savedParsed[i].time) {
                    this.setState({ saveButton: false });
                    break;
                }
            }
        }
    }
    _checkTimeWeek(){
        if (this.state.buttonsThree){
            return(
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
        } else if (this.state.buttonsThree === false){
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
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <Text style={styles.titleLine}>{this.titleLine}</Text>
                    <View style={styles.topRight}>
                        <TouchableOpacity
                            onPress={() => {
                                // this._checkSavedData();
                                if(this.state.saveButton === true){
                                    if (this.state.willSave.line !== "" && this.state.willSave.departure !== "" && this.state.willSave.time !== "" && this.state.willSave.data !== "" && this.state.willSave.station !== "" && this.state.willSave.route !== "") {
                                        this._storeData();
                                        this.setState({ saveButton: false });
                                    } else {
                                        alert("Te rugăm să alegi ruta (dus/întors) și data din saptămână (L-V / S-D)")
                                    }
                                }
                                else{
                                    alert("Aceste date sunt salvate");
                                }
                            }
                            }
                            style={[styles.buttonSave, this.state.saveButton ? styles.buttonSave : styles.buttonSaveInvalid]}
                        >
                            <Icon name="heart" size={25} color="black" style={styles.iconSave} />
                        </TouchableOpacity>
                    </View> 
                   
                    <Text style={styles.titleRoute}>{this.route}</Text>
                    {this.errorForUser()}
                    {this.checkDeparture()}
                    {this._checkTimeWeek()}
                    {this.checkView()}
                   
                    {/* <Text>{JSON.stringify(this.dataLine)}</Text> */}
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
        width: 80 + "%",
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
    topRight:{
        position: 'absolute',
        right: 5,
        top: 0,
    },
    bottomView:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    buttonSave: {
        alignSelf: 'center',
        textAlign: 'center',
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: 10,
        backgroundColor: '#012853',
        paddingBottom: 10,
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        width: 67,
    },
    buttonSaveInvalid:{
        alignSelf: 'center',
        textAlign: 'center',
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: 10,
        backgroundColor: '#f44242',
        paddingBottom: 10,
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        width: 67,
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
        paddingTop: 13,
        paddingBottom: 10,
        fontSize: 23,
        fontWeight: '900',
        color: 'black',
        alignSelf: 'center',
    },
    titleRoute: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 20,
        fontWeight: '900',
        color: '#9d73fd',
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
    iconSave: {
        top: 4.5,
        color: 'white',
    }
})