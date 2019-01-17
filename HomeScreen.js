import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Image, Modal, Text, TouchableHighlight, View, TextInput, StyleSheet, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Spinner from 'react-native-spinkit';
import SplashScreen from 'react-native-splash-screen';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        headerTitleStyle: {
            textAlign: "center",
            flex: 1, 
            color: 'white',
            fontSize: 20,
        },
        title: 'BRASOV BUS',
        headerStyle: {
            backgroundColor: '#3b37fe',
            color: 'white'
        },
        titleStyle: { color: 'white' },
    };
    constructor(props) {
        super(props);
        this.CheckView = this.CheckView.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleModalLine = this.toggleModalLine.bind(this);

    }
    componentDidMount(){
        SplashScreen.hide();
        fetch('https://ratbv-scraper.herokuapp.com/allroutes')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                    this.setState({ lines: myJson.data });
            })
            .then(() => {
                var tableLines = [];
                var i=1;
                Object.keys(this.state.lines).map((item)=>{
                    tableLines.push({
                        id: i,
                        name: item
                    })
                    i++;
                })
                this.setState({ tableLines });
            })
            .then(()=>{
                this.state({ allLoaded: true })
            })
        fetch('https://ratbv-scraper.herokuapp.com/getStations')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ stations: myJson.data });
            })
            .then(() =>{
                var tableStations = [];
                var index = 1;
                for(let i=0;i<this.state.stations.length;i++){
                    tableStations.push({
                        id: index,
                        name: this.state.stations[i]
                    })
                    index++;
                }
                this.setState({ tableStations });
            })
            .then(() => {
                this.setState({ allLoaded: true })
            })
    }
    state = {
        modalVisible: false,
        modalVisibleLine: false,

        text: "",
        textLine: "",
        allLoaded: false,
        itemSelect: false
    };
    toggleModal = (visible) => {
        this.setState({ modalVisible: visible });
    }
    toggleModalLine = (visible) => {
        this.setState({ modalVisibleLine: visible });
    }
    CheckView = () => {
        if(this.state.allLoaded === true){
            const { navigate } = this.props.navigation;
            return(
                <View style={{ flex: 1, }}>
                    <Image source={require('./assets/wave.png')} style={styles.bgMain} resizeMode={'cover'} />
                    <Modal animationType={"slide"} transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => { console.log("Modal has been closed."); this.toggleModal(!this.state.modalVisible) }}>
                        <View style={styles.modal}>
                            <Image source={require('./assets/wave2.png')} style={styles.bgImages} resizeMode={'cover'} />

                            <Text style={styles.textModal}>Cauta statia</Text>
                            {/* <TextInput editable={true} value={this.state.text} onChangeText={(text) => { this.setState({ text }) }} style={styles.input} /> */}
                            <SearchableDropdown
                                onTextChange={(text) => { this.setState({ text }); console.log(this.state.text.name) }}
                                onItemSelect={(text) => { this.setState({ text, itemSelect: true }); console.log(this.state.text.name) }}
                                containerStyle={{ padding: 5 }}
                                textInputStyle={{
                                    padding: 12,
                                    borderWidth: 1,
                                    borderColor: 'white',
                                    borderRadius: 0,
                                    color: '#fff',
                                }}
                                itemStyle={{
                                    padding: 10,
                                    marginTop: 2,
                                    backgroundColor: 'white',
                                    borderColor: 'white',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                                itemTextStyle={{ color: 'black' }}
                                itemsContainerStyle={{ maxHeight: 140 }}
                                items={this.state.tableStations}
                                placeholder="Scrie statia"
                                resetValue={false}
                                underlineColorAndroid="transparent"
                                value={this.state.textLine}
                            />
                            <TouchableOpacity
                                style={styles.buttonModal}
                                onPress={() => {
                                    if (this.state.text !== "") {
                                        if (this.state.itemSelect === false) {
                                            alert('Te rugam selecteaza statia')
                                        } else {
                                            this.toggleModal(!this.state.modalVisible);
                                            navigate('Stations', { stationName: this.state.text.name });
                                            this.setState({ text: "" })
                                        }
                                    } else {
                                        alert('Te rugam selecteaza statia');

                                    }
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
                        onRequestClose={() => { console.log("Modal has been closed."); this.toggleModalLine(!this.state.modalVisibleLine) }}>
                        <View style={styles.modal}>
                            <Image source={require('./assets/wave2.png')} style={styles.bgImages} resizeMode={'cover'} />

                            <Text style={styles.textModal}>Cauta linia</Text>
                            {/* <TextInput editable={true} value={this.state.textLine} onChangeText={(textLine) => { this.setState({ textLine }) }} style={styles.input} /> */}
                            <SearchableDropdown
                                onTextChange={(textLine) => { this.setState({ textLine }); console.log(this.state.textLine.name) }}
                                onItemSelect={(textLine) => { this.setState({ textLine, itemSelect: true }); console.log(this.state.textLine.name) }}
                                containerStyle={{ padding: 5 }}
                                textInputStyle={{
                                    padding: 12,
                                    borderWidth: 1,
                                    borderColor: 'white',
                                    borderRadius: 0,
                                    color: '#fff',
                                }}
                                itemStyle={{
                                    padding: 10,
                                    marginTop: 2,
                                    backgroundColor: 'white',
                                    borderColor: 'white',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                                itemTextStyle={{ color: 'black' }}
                                itemsContainerStyle={{ maxHeight: 140 }}
                                items={this.state.tableLines}
                                placeholder="Scrie linia"
                                resetValue={false}
                                underlineColorAndroid="transparent"
                                value={this.state.textLine}
                            />
                            <TouchableOpacity
                                style={styles.buttonModal}
                                onPress={() => {
                                    if (this.state.textLine !== "") {
                                        if (this.state.itemSelect === false) {
                                            alert('Te rugam selecteaza statia');
                                        } else {
                                            this.toggleModalLine(!this.state.modalVisibleLine);
                                            navigate('Searchline', { lineName: this.state.textLine.name });
                                            this.setState({ textLine: "" })
                                        }
                                    } else {
                                        alert('Te rugam selecteaza statia');
                                    }
                                }}
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
                        <TouchableHighlight onPress={this.toggleModal.bind(this, true)} style={styles.buttonOpenModal} underlayColor={'transparent'}>
                            <Text style={styles.textOpenModal}>
                                Cauta statia {"  "}
                                <Icon name="map-signs" size={25} color="white" style={{ paddingLeft: 20 }} />
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.container2}>
                        <TouchableOpacity onPress={this.toggleModalLine.bind(this, true)} style={styles.buttonOpenModalLine} underlayColor={'transparent'}>
                            <Text style={styles.textOpenModal}>
                                Cauta linia {"  "}
                                <Icon name="bus" size={25} color="white" style={{ paddingLeft: 20 }} />
                            </Text>
                        </TouchableOpacity>
                    </View>
               
                </View>
            )
        }
        else{
            return(
                <Spinner style={styles.spinner} color={'#9d73fd'} size={100} type={'Wave'} />
            )
        }
    }
    
    render() {
        const { navigate } = this.props.navigation;
        return (
                this.CheckView()
        );
    }
}

const styles = StyleSheet.create({
    spinner: {
        alignSelf: 'center',
        marginTop: 150,
    },
    container: {
        alignItems: 'center',
        padding: 10,
        top: 30+"%",
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#3b37fe',
        borderRadius: 25,
        color: 'white',
        width: 80+"%",
        left: 50+"%",
        transform: [
            { translateX: - dimensions.width/2.5 },
        ],
    },
    container2: {
        alignItems: 'center',
        padding: 10,
        top: 35 + "%",
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#3b37fe',
        borderRadius: 25,
        color: 'white',
        width: 80 + "%",
        left: 50 + "%",
        transform: [
            { translateX: - dimensions.width / 2.5 },
        ],
        marginTop: 20,
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
        fontSize: 25,
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
        textAlign: 'center',
        borderRadius: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: 20,
        backgroundColor: '#1B1D1C',
        paddingBottom: 10,
        textAlign: 'center',

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
        width: 348,
    },
    buttonOpenModalLine: {
        width: 348,
    }
})