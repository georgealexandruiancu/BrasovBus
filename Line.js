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

export default class Line extends React.Component {
    static navigationOptions = {

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
        }
        setInterval(() => {
            this.setState({ showText: !this.state.showText });
        }, 800);
        this._isMounted = false;
    }
    navigate = this.props.navigation;
    titleLine = this.navigate.getParam('titleLine');
    dataLine = this.navigate.getParam('dataLine');
    route = this.navigate.getParam('route');
    stationName = this.navigate.getParam('stationName');

    componentDidMount() {
        this._isMounted = true;

        if (this._isMounted === true) {
            if (typeof this.dataLine.dus !== 'undefined') {
                this.setState({
                    going: {
                        luniVineri: this.dataLine.dus[this.stationName].luniVineri,
                        sambataDuminica: this.dataLine.dus[this.stationName].sambataDuminica
                    }
                });
            }
            if (typeof this.dataLine.intors !== 'undefined') {
                this.setState({
                    returned: {
                        luniVineri: this.dataLine.intors[this.stationName].luniVineri,
                        sambataDuminica: this.dataLine.intors[this.stationName].sambataDuminica
                    },
                });
            }
        }
    }
    reverseRoute() {
        var reverseRoute = this.navigate.getParam('route').split('-');
        var newRoute;
        if (reverseRoute.length < 3) {
            newRoute = reverseRoute[1] + ' - ' + reverseRoute[0];
        } else {
            newRoute = reverseRoute[2] + ' - ' + reverseRoute[1] + ' - ' + reverseRoute[0];
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
                selectedTime: '',
                selectedTwo: false
            });
            this.route = this.navigate.getParam('route');
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
                selectedTime: '',
                selectedTwo: false
            });
            this.route = this.reverseRoute();
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

            Object.keys(this.state.going.luniVineri).forEach((keys) => {
                if (i < 10) {
                    let key = "0" + i;
                    let minutesRaw = this.state.going.luniVineri[key];
                    let minutes = JSON.stringify(minutesRaw).split(",")
                    for (let index = 0; index < minutes.length; index++) {
                        minutes[index] = minutes[index].replace('["', "");
                        minutes[index] = minutes[index].replace('"]', "");
                        minutes[index] = minutes[index].replace('"', "");
                        minutes[index] = minutes[index].replace('"', "");

                        allHours.push("0" + i + ":" + minutes[index]);
                    }
                    var arrForPush = ["0" + i, this.state.going.luniVineri[key] + " "]
                    this.state.tableData.push(arrForPush);
                } else if (i === 24) {
                    let key = '00'
                    let minutesRaw = this.state.going.luniVineri[key];
                    let minutes = JSON.stringify(minutesRaw).split(",")
                    for (let index = 0; index < minutes.length; index++) {
                        minutes[index] = minutes[index].replace('["', "");
                        minutes[index] = minutes[index].replace('"]', "");
                        minutes[index] = minutes[index].replace('"', "");
                        minutes[index] = minutes[index].replace('"', "");

                        allHours.push("00:" + minutes[index]);
                    }
                    var arrForPush = ["00", this.state.going.luniVineri[key] + " "]
                    this.state.tableData.push(arrForPush);
                } else {
                    let key = i;
                    let minutesRaw = this.state.going.luniVineri[key];
                    let minutes = JSON.stringify(minutesRaw).split(",")
                    for (let index = 0; index < minutes.length; index++) {
                        minutes[index] = minutes[index].replace('["', "");
                        minutes[index] = minutes[index].replace('"]', "");
                        minutes[index] = minutes[index].replace('"', "");
                        minutes[index] = minutes[index].replace('"', "");

                        allHours.push(i + ":" + minutes[index]);
                    }

                    var arrForPush = [i, this.state.going.luniVineri[key] + " "]
                    this.state.tableData.push(arrForPush);
                }
                i = i + 1;
            });
        } else if (departure === 'week' && this.state.selectedSchedule === 'returned') {
            this.setState({ selectedTime: 'week', selectedTwo: true })

            Object.keys(this.state.returned.luniVineri).forEach((keys) => {
                if (i < 10) {
                    let key = "0" + i;
                    let minutesRaw = this.state.returned.luniVineri[key];
                    let minutes = JSON.stringify(minutesRaw).split(",")
                    for (let index = 0; index < minutes.length; index++) {
                        minutes[index] = minutes[index].replace('["', "");
                        minutes[index] = minutes[index].replace('"]', "");
                        minutes[index] = minutes[index].replace('"', "");
                        minutes[index] = minutes[index].replace('"', "");

                        allHours.push("0" + i + ":" + minutes[index]);
                    }
                    var arrForPush = ["0" + i, this.state.returned.luniVineri[key] + " "]
                    this.state.tableData.push(arrForPush);
                } else if (i === 24) {
                    let key = '00'
                    let minutesRaw = this.state.returned.luniVineri[key];
                    let minutes = JSON.stringify(minutesRaw).split(",")
                    for (let index = 0; index < minutes.length; index++) {
                        minutes[index] = minutes[index].replace('["', "");
                        minutes[index] = minutes[index].replace('"]', "");
                        minutes[index] = minutes[index].replace('"', "");
                        minutes[index] = minutes[index].replace('"', "");

                        allHours.push("00:" + minutes[index]);
                    }
                    var arrForPush = ["00", this.state.returned.luniVineri[key] + " "]
                    this.state.tableData.push(arrForPush);
                } else {
                    let key = i;
                    let minutesRaw = this.state.returned.luniVineri[key];
                    let minutes = JSON.stringify(minutesRaw).split(",")
                    for (let index = 0; index < minutes.length; index++) {
                        minutes[index] = minutes[index].replace('["', "");
                        minutes[index] = minutes[index].replace('"]', "");
                        minutes[index] = minutes[index].replace('"', "");
                        minutes[index] = minutes[index].replace('"', "");

                        allHours.push(i + ":" + minutes[index]);
                    }

                    var arrForPush = [i, this.state.returned.luniVineri[key] + " "]
                    this.state.tableData.push(arrForPush);
                }
                i = i + 1;
            })
        } else if (departure === 'weekend' && this.state.selectedSchedule === 'going') {
            this.setState({ selectedTime: 'weekend', selectedTwo: true })


            Object.keys(this.state.going.sambataDuminica).forEach((keys) => {
                if (i < 10) {
                    let key = "0" + i;
                    let minutesRaw = this.state.going.sambataDuminica[key];
                    let minutes = JSON.stringify(minutesRaw).split(",")
                    for (let index = 0; index < minutes.length; index++) {
                        minutes[index] = minutes[index].replace('["', "");
                        minutes[index] = minutes[index].replace('"]', "");
                        minutes[index] = minutes[index].replace('"', "");
                        minutes[index] = minutes[index].replace('"', "");

                        allHours.push("0" + i + ":" + minutes[index]);
                    }

                    var arrForPush = ["0" + i, this.state.going.sambataDuminica[key] + " "]
                    this.state.tableData.push(arrForPush);
                } else if (i === 24) {
                    let key = '00'
                    let minutesRaw = this.state.going.sambataDuminica[key];
                    let minutes = JSON.stringify(minutesRaw).split(",")
                    for (let index = 0; index < minutes.length; index++) {
                        minutes[index] = minutes[index].replace('["', "");
                        minutes[index] = minutes[index].replace('"]', "");
                        minutes[index] = minutes[index].replace('"', "");
                        minutes[index] = minutes[index].replace('"', "");

                        allHours.push("00:" + minutes[index]);
                    }

                    var arrForPush = ["00", this.state.going.sambataDuminica[key] + " "]
                    this.state.tableData.push(arrForPush);
                } else {
                    let key = i;
                    let minutesRaw = this.state.going.sambataDuminica[key];
                    let minutes = JSON.stringify(minutesRaw).split(",")
                    for (let index = 0; index < minutes.length; index++) {
                        minutes[index] = minutes[index].replace('["', "");
                        minutes[index] = minutes[index].replace('"]', "");
                        minutes[index] = minutes[index].replace('"', "");
                        minutes[index] = minutes[index].replace('"', "");

                        allHours.push(i + ":" + minutes[index]);
                    }

                    var arrForPush = [i, this.state.going.sambataDuminica[key] + " "]
                    this.state.tableData.push(arrForPush);
                }
                i = i + 1;
            })
        } else if (departure === 'weekend' && this.state.selectedSchedule === 'returned') {
            this.setState({ selectedTime: 'weekend', selectedTwo: true })


            Object.keys(this.state.returned.sambataDuminica).forEach((keys) => {
                if (i < 10) {
                    let key = "0" + i;
                    let minutesRaw = this.state.returned.sambataDuminica[key];
                    let minutes = JSON.stringify(minutesRaw).split(",")
                    for (let index = 0; index < minutes.length; index++) {
                        minutes[index] = minutes[index].replace('["', "");
                        minutes[index] = minutes[index].replace('"]', "");
                        minutes[index] = minutes[index].replace('"', "");
                        minutes[index] = minutes[index].replace('"', "");

                        allHours.push("0" + i + ":" + minutes[index]);
                    }

                    var arrForPush = ["0" + i, this.state.returned.sambataDuminica[key] + " "]
                    this.state.tableData.push(arrForPush);
                } else if (i === 24) {
                    let key = '00'
                    let minutesRaw = this.state.returned.sambataDuminica[key];
                    let minutes = JSON.stringify(minutesRaw).split(",")
                    for (let index = 0; index < minutes.length; index++) {
                        minutes[index] = minutes[index].replace('["', "");
                        minutes[index] = minutes[index].replace('"]', "");
                        minutes[index] = minutes[index].replace('"', "");
                        minutes[index] = minutes[index].replace('"', "");

                        allHours.push("00:" + minutes[index]);
                    }

                    var arrForPush = ["00", this.state.returned.sambataDuminica[key] + " "]
                    this.state.tableData.push(arrForPush);
                } else {
                    let key = i;
                    let minutesRaw = this.state.returned.sambataDuminica[key];
                    let minutes = JSON.stringify(minutesRaw).split(",")
                    for (let index = 0; index < minutes.length; index++) {
                        minutes[index] = minutes[index].replace('["', "");
                        minutes[index] = minutes[index].replace('"]', "");
                        minutes[index] = minutes[index].replace('"', "");
                        minutes[index] = minutes[index].replace('"', "");

                        allHours.push(i + ":" + minutes[index]);
                    }

                    var arrForPush = [i, this.state.returned.sambataDuminica[key] + " "]
                    this.state.tableData.push(arrForPush);
                }
                i = i + 1;
            })
        }

        this.setState({
            diffMin: '',
            diffHour: ''
        });
        for (let i = 0; i < allHours.length; i++) {
            console.log(allHours[i])
            if (myDate < allHours[i]) {

                var date1 = new Date();
                var date2 = new Date();
                let expectedTime = allHours[i].split(":");
                if (expectedTime[1] != "[]") {
                    console.log(expectedTime[1])
                    let TimeStar = expectedTime[1].split("*");
                    console.log(TimeStar)
                    if (TimeStar[1] === "") {
                        console.log(TimeStar[1])
                        this.setState({ expectedTime: allHours[i] });
                        let myTime = myDate.split(":");
                        date1.setHours(myTime[0]); date1.setMinutes(myTime[1]);
                        date2.setHours(expectedTime[0]); date2.setMinutes(TimeStar[0]);
                        var msec = date2 - date1;
                        var mins = Math.floor(msec / 60000);
                        var hrs = Math.floor(mins / 60);
                        if (hrs != 0) {
                            this.setState({ exactTime: hrs + " ore " + mins + " minute" })
                        } else {
                            this.setState({ exactTime: mins + " minute" })
                        }
                    }else{
                        this.setState({ expectedTime: allHours[i] });
                        let myTime = myDate.split(":");
                        date1.setHours(myTime[0]); date1.setMinutes(myTime[1]);
                        date2.setHours(expectedTime[0]); date2.setMinutes(expectedTime[1]);
                        var msec = date2 - date1;
                        var mins = Math.floor(msec / 60000);
                        var hrs = Math.floor(mins / 60);
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
                        console.log(expectedTime[1])
                        var TimeStar = expectedTime[1].split("*");
                        if (TimeStar[1] === "") {
                            this.setState({ expectedTime: allHours[i] });
                            let myTime = myDate.split(":");
                            date1.setHours(myTime[0]); date1.setMinutes(myTime[1]);
                            date2.setHours(expectedTime[0]); date2.setMinutes(TimeStar[0]);
                            var msec = date2 - date1;
                            var mins = Math.floor(msec / 60000);
                            var hrs = Math.floor(mins / 60);
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
                            var mins = Math.floor(msec / 60000);
                            var hrs = Math.floor(mins / 60);
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
                        <Icon name="chevron-circle-left" size={25} color="black" style={styles.iconLeft} />
                        <Text style={styles.text}>{'Dus'.toLocaleUpperCase()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonModalRightDisabled}
                        disabled={true}
                        underlayColor='#fff'>
                        <Text style={styles.text}>{'Întors'.toLocaleUpperCase()}</Text>
                        <Icon name="chevron-circle-right" size={25} color="black" style={styles.iconRight} />
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
                    <Text style={styles.titleRoute}>{this.route}</Text>
                    {this.errorForUser()}
                    {this.checkDeparture()}
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={[styles.buttonModalLeft, this.state.activeWeek && styles.active]}
                            onPress={() => { this.viewSchedule('week'); this.setState({ activeWeek: true, activeWeekend: false }) }}
                            underlayColor='#fff'>
                            <Icon name="calendar" size={25} color="black" style={styles.iconLeft} />

                            <Text style={styles.text}>{'L-V'.toLocaleUpperCase()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttonModalRight, this.state.activeWeekend && styles.active]}
                            onPress={() => { this.viewSchedule('weekend'); this.setState({ activeWeek: false, activeWeekend: true }) }}
                            underlayColor='#fff'>
                            <Text style={styles.text}>{'S-D'.toLocaleUpperCase()}</Text>
                            <Icon name="calendar" size={25} color="black" style={styles.iconRight} />

                        </TouchableOpacity>
                    </View>
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
    err: { padding: 20, color: '#9d73fd', textAlign: 'center', fontWeight: '700', height: 75 },
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
        width: 150,
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
        width: 150,
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
        width: 150,
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
        width: 150,
        position: 'relative',

    },
    text: {
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '900',
        letterSpacing: 1,
        fontSize: 18,
    },
    titleLine: {
        paddingTop: 10,
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