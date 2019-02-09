import React, { Component } from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions, AsyncStorage, Alert } from 'react-native';
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
    state = {
        allData: "", allOK: false, buttonDelete: false
    }
    static navigationOptions = {
        backButton: {
            color: "white",
        },
        title: 'Salvările mele',
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
        this._retrieveData();
    }
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('Saved');
            console.log(value);
            if (value !== null) {
                // We have data!!
                this.setState({ allData: JSON.parse(value), allOK: true, buttonDelete: true });
                console.log(JSON.parse(value));
            }
        } catch (error) {
            console.log("eroare da da" + error);
            // Error retrieving data
        }
    };
    _deleteAllStoarge = async () => {
        const { navigate } = this.props.navigation;
        try {
            await AsyncStorage.setItem('Saved', "")
                .then(() => {
                    alert("Salvările s-au șters!");
                })
                .then(() => {
                    navigate('Home');
                })

        } catch (error) {
            alert("Ceva nu a mers bine!");
            console.log("Ceva nu a mers bine!");
            // Error retrieving data
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        //this.props.navigation.dispatch();
        this.setState({ stationName: "" })
    }

    _checkTime = (Line) => {
        var date = new Date();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var myDate = hours + ":" + minutes;

        var allHours = [];
        var i = 0;
        Object.keys(Line).forEach((keys) => {
            Object.values(Line[keys]).forEach((minutes) => {
                allHours.push(keys + ":" + minutes)
            })
        });
        allHours.sort();
        for (let i = 0; i < allHours.length; i++) {

            if (myDate < allHours[i]) {
                var date1 = new Date();
                var date2 = new Date();
                let expectedTime = allHours[i].split(":");
                let TimeStar = expectedTime[1].split("*");
                let myTime = myDate.split(":");
                date1.setHours(myTime[0]); date1.setMinutes(myTime[1]);
                date2.setHours(expectedTime[0]); date2.setMinutes(TimeStar[0]);
                var msec = date2 - date1;
                var mins = parseInt((msec / (1000 * 60)) % 60)
                var hrs = parseInt((msec / (1000 * 60 * 60)) % 24);

                hrs = (hrs < 10) ? "0" + hrs : hrs;
                mins = (mins < 10) ? "0" + mins : mins;
                console.log(hrs + ":" + mins)
                if (hrs > "00") {
                    console.log(hrs + " h " + mins + " '")
                    return (hrs + " h " + mins + " '")
                } else{
                    console.log(hrs + " h " + mins + " '");
                    return (mins + " '")
                }
            }
         
        }
    }
    _viewSaves = () => {
        if (this.state.allData !== "") {
            console.log(this.state.allData)
            var table = []
            for (let i = 0; i < this.state.allData.length; i++) {
                table.push(
                    <View style={styles.gradient} key={i}>
                        <LinearGradient colors={['#9d73fd', '#012853']}>
                            <TouchableOpacity style={styles.listStation}

                                onPress={() => {

                                    Alert.alert(
                                        'Stergere',
                                        'Ești sigur că vrei să ștergi linia?',
                                        [
                                            {
                                                text: 'OK', onPress: () => {
                                                    this.removeItemValue(i);
                                                }
                                            },
                                            {
                                                text: 'Cancel',
                                                onPress: () => console.log('Cancel Pressed'),
                                                style: 'cancel',
                                            },
                                        ],

                                    );


                                }}>
                                <Text style={styles.textLine}> {this.state.allData[i].line}</Text>
                                <Text style={styles.textStation}>{"\n"}{"\n"}IN STATIA: {this.state.allData[i].station}</Text>

                                <Text style={styles.textRoute}>{"\n"}{"\n"}{this.state.allData[i].route}</Text>

                                <Text style={styles.textShedule}>{"\n"}{"\n"}{this.state.allData[i].time}</Text>


                                <Text style={styles.textAjunge}>Ajunge în:</Text>

                                <Text style={styles.textMinutes}>{this._checkTime(this.state.allData[i].data)}</Text>

                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                )
            }
            return table;
        } else {
            return (
                <Text style={styles.textTitleSave}> Nu ai salvări !</Text>
            )
        }
    }
    removeItemValue = async (key) => {
        try {
            var saved = await AsyncStorage.getItem("Saved")

            if (saved !== null) {
                let savedParsed = JSON.parse(saved);
                savedParsed.splice(key, 1);
                await AsyncStorage.setItem('Saved', JSON.stringify(savedParsed));
                var savedNEW = await AsyncStorage.getItem("Saved")
                this.setState({ allData: JSON.parse(savedNEW) });
                this._viewSaves();
            }

            return true;
        }
        catch (exception) {
            alert("err" + exception);
            return false;
        }
    }
    render() {
        return (
            <ScrollView>

                <TouchableOpacity style={styles.buttonDelete}
                    onPress={() => {
                        if (this.state.buttonDelete === true) {
                            Alert.alert(
                                'Stergere totală!',
                                'Ești sigur că vrei să ștergi toate datele?',
                                [
                                    {
                                        text: 'OK', onPress: () => {
                                            this._deleteAllStoarge();
                                        }
                                    },
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                ],

                            );
                        } else {
                            Alert.alert(
                                'Alert',
                                'Nu ai salvari !',
                                [
                                    {
                                        text: 'OK',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },

                                ],

                            );
                        }
                    }
                    }
                >
                    <Icon name="trash" size={25} color="black" style={styles.iconDelete} />
                </TouchableOpacity>
                {this._viewSaves()}

            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    textTitleSave: {
        alignSelf: 'center',
        fontSize: 24,
        color: '#9d73fd',
        fontWeight: '900',
    },
    buttonDelete: {
        textAlign: 'center',
        borderRadius: 30,
        alignSelf: 'center',
        alignItems: 'center',
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
        paddingBottom: 80,
        alignSelf: 'center',
        borderRadius: 20,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    textLine: {
        color: 'white',
        fontSize: 20,

        fontWeight: "900",
    },
    textErr: {
        color: 'black',
        fontSize: 20,
        paddingLeft: 30,
        fontWeight: "900",
    },
    iconDelete: {
        top: 4.5,
        color: 'white',
    },
    textRoute: {
        color: 'white',
        fontSize: 14,
        position: 'absolute',
        bottom: 40,
        left: -10,

        fontWeight: "900",
        width: 100 + "%",
        paddingLeft: 15,
    },
    textShedule: {
        color: 'white',
        fontSize: 14,
        position: 'absolute',
        bottom: 20,
        left: -10,

        fontWeight: "900",
        width: 100 + "%",
        paddingLeft: 15,

    },
    textStation: {
        color: 'white',
        fontSize: 14,
        position: 'absolute',
        bottom: 60,
        left: -10,
        fontWeight: "900",
        width: 100 + "%",
        paddingLeft: 15,
    },
    textMinutes: {
        color: 'white',
        fontSize: 22,
        position: 'absolute',
        top: 43,
        right: 0,
        fontWeight: "900",

    },
    textAjunge: {
        color: 'white',
        fontSize: 20,
        position: 'absolute',
        top: 20,
        right: 0,
        fontWeight: "900",

    },
    icon: {
        position: 'absolute',
        right: 30,
        top: 20,
        bottom: 20,
        color: 'white',
    }
})