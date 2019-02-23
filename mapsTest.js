import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Image,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    Modal,

} from "react-native";

import MapView from "react-native-maps";
import SearchableDropdown from 'react-native-searchable-dropdown';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get("window");
const imageWidth = width;
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width - 10;
const origin = { latitude: 45.6577152, longitude: 25.6221705 };
const destination = { latitude: 45.6742467, longitude: 25.6127491 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyAssHpNB_Hpj_hFKudAalPultvahAojIng';
import Carousel from 'react-native-snap-carousel';
export default class screens extends Component {
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
    state = {
        markers: [{ title: "Vlahuta", coordinate: { latitude: 45.6577152, longitude: 25.6221705 }, buses: ["Linia 1", "Linia 17B", "Linia 8", "Linia 10", "Linia 37", "Linia 21", "Linia 23", "Linia 23B", "Linia 25", "Linia 34B"] }, { title: "13 Decembrie", coordinate: { latitude: 45.6742467, longitude: 25.6127491 }, buses: ["Linia 15"] }, { title: "Toamnei", coordinate: { latitude: 45.6525496, longitude: 25.6156271 }, buses: ["Linia 1", "Linia 3", "Linia 7", "Linia 5", "Linia 10", "Linia 6", "Linia 17", "Linia 52", "Linia 22", "Linia 31", "Linia 32", "Linia 34", "Linia 35", "Linia 53"] }, { title: "Autogara 3", coordinate: { latitude: 45.66339500000001, longitude: 25.6290601 }, buses: ["Linia 1", "Linia 10", "Linia 37", "Linia 21", "Linia 23B"] }, { title: "Triaj", coordinate: { latitude: 45.67567710000001, longitude: 25.6473121 }, buses: ["Linia 1", "Linia 15", "Linia 19", "Linia 10", "Linia 21", "Linia 23B", "Linia 34B"] }, { title: "Toamnei(CEC)", coordinate: { latitude: 45.6525496, longitude: 25.6156271 }, buses: ["Linia 1"] }, { title: "Camera de Comert", coordinate: { latitude: 45.65106189999999, longitude: 25.6082761 }, buses: ["Linia 1", "Linia 4", "Linia 5", "Linia 17", "Linia 22", "Linia 31", "Linia 34"] }, { title: "Dramatic", coordinate: { latitude: 45.6452745, longitude: 25.5982572 }, buses: ["Linia 1", "Linia 2", "Linia 4", "Linia 5", "Linia 6", "Linia 41", "Linia 16", "Linia 17", "Linia 31", "Linia 34", "Linia 36"] }, { title: "Patria", coordinate: { latitude: 45.6486217, longitude: 25.6053058 }, buses: ["Linia 1", "Linia 3", "Linia 7", "Linia 4", "Linia 5", "Linia 6", "Linia 17", "Linia 52", "Linia 22", "Linia 31", "Linia 34"] }, { title: "F-ca de Var", coordinate: { latitude: 45.645286, longitude: 25.552547 }, buses: ["Linia 14"] }, { title: "Facultativa", coordinate: { latitude: 45.648398, longitude: 25.5307779 }, buses: ["Linia 14", "Linia 15", "Linia 17B", "Linia 19", "Linia 5M", "Linia 50", "Linia 17", "Linia 18", "Linia 20", "Linia 21", "Linia 24", "Linia 25", "Linia 28", "Linia 34", "Linia 34B", "Linia 35", "Linia 40"] }, { title: "Ec. Teodoroiu", coordinate: { latitude: 45.665365, longitude: 25.584127 }, buses: ["Linia 15", "Linia 9", "Linia 29"] }, { title: "Saturn", coordinate: { latitude: 45.63454429999999, longitude: 25.63548 }, buses: ["Linia 17B", "Linia 8", "Linia 6", "Linia 52", "Linia 21", "Linia 22", "Linia 23", "Linia 25"] }, { title: "Cosmesti", coordinate: { latitude: 45.666508, longitude: 25.579412 }, buses: ["Linia 15", "Linia 41", "Linia 25", "Linia 29"] }, { title: "CEC", coordinate: { latitude: 45.65460100000001, longitude: 25.615245 }, buses: ["Linia 1", "Linia 10"] }, { title: "Bisericii Romane", coordinate: { latitude: 45.651695, longitude: 25.586021 }, buses: ["Linia 14", "Linia 5", "Linia 24", "Linia 28"] }, { title: "Faget", coordinate: { latitude: 45.661027, longitude: 25.607768 }, buses: ["Linia 2", "Linia 7", "Linia 8", "Linia 51", "Linia 23", "Linia 23B", "Linia 25", "Linia 29", "Linia 36", "Linia 40", "Linia 53"] }, { title: "Piata Tractorul", coordinate: { latitude: 45.665968, longitude: 25.604892 }, buses: ["Linia 15", "Linia 9", "Linia 29", "Linia 36"] }, { title: "RAT Brasov", coordinate: { latitude: 45.669643, longitude: 25.6367903 }, buses: ["Linia 1", "Linia 15", "Linia 10", "Linia 21", "Linia 23B"] }, { title: "Piata Decebal", coordinate: { latitude: 45.644048, longitude: 25.618207 }, buses: ["Linia 3", "Linia 7", "Linia 10", "Linia 31", "Linia 32"] }, { title: "Lanurilor", coordinate: { latitude: 45.662347, longitude: 25.5677821 }, buses: ["Linia 15", "Linia 25", "Linia 28"] }, { title: "Agricultorilor", coordinate: { latitude: 45.666568, longitude: 25.572631 }, buses: ["Linia 15", "Linia 25", "Linia 28"] }, { title: "Atelier", coordinate: { latitude: 45.6552497, longitude: 25.5921554 }, buses: ["Linia 14"] }, { title: "Liceul Tractorul", coordinate: { latitude: 45.6685813, longitude: 25.6101555 }, buses: ["Linia 2", "Linia 15", "Linia 7", "Linia 8", "Linia 9"] }, { title: "Egretei", coordinate: { latitude: 45.6642338, longitude: 25.5653291 }, buses: ["Linia 15", "Linia 25", "Linia 28"] }, { title: "Carpatilor", coordinate: { latitude: 45.64182, longitude: 25.614699 }, buses: ["Linia 3", "Linia 10", "Linia 31", "Linia 32"] }, { title: "N. Labis", coordinate: { latitude: 45.6788823, longitude: 25.6142127 }, buses: ["Linia 2", "Linia 7", "Linia 8", "Linia 9"] }, { title: "Carierei", coordinate: { latitude: 45.657975, longitude: 25.578446 }, buses: ["Linia 14", "Linia 5", "Linia 24", "Linia 28"] }, { title: "Mircea cel Batran", coordinate: { latitude: 45.65695849999999, longitude: 25.6063582 }, buses: ["Linia 2", "Linia 7", "Linia 51", "Linia 36"] }, { title: "Hidro A", coordinate: { latitude: 45.651228, longitude: 25.6100075 }, buses: ["Linia 1", "Linia 3", "Linia 7", "Linia 4", "Linia 5", "Linia 10", "Linia 37", "Linia 6", "Linia 17", "Linia 52", "Linia 22", "Linia 31", "Linia 32", "Linia 34", "Linia 34B", "Linia 35", "Linia 53"] }, { title: "Fragilor", coordinate: { latitude: 45.63306799999999, longitude: 25.6055555 }, buses: ["Linia 3", "Linia 10", "Linia 33", "Linia 31", "Linia 32"] }, { title: "Memorandului", coordinate: { latitude: 45.6549662, longitude: 25.5830755 }, buses: ["Linia 14", "Linia 5", "Linia 24", "Linia 28"] }, { title: "Biserica Tractorul", coordinate: { latitude: 45.664776, longitude: 25.608927 }, buses: ["Linia 2", "Linia 7", "Linia 8", "Linia 29", "Linia 36", "Linia 53"] }, { title: "IUS", coordinate: { latitude: 45.6564607, longitude: 25.618341 }, buses: ["Linia 1", "Linia 10"] }, { title: "Sc. Gen. 20", coordinate: { latitude: 45.637925, longitude: 25.609383 }, buses: ["Linia 3", "Linia 10", "Linia 33", "Linia 31", "Linia 32"] }, { title: "Spitalul Judetean", coordinate: { latitude: 45.647288, longitude: 25.619313 }, buses: ["Linia 3", "Linia 7", "Linia 5", "Linia 10", "Linia 17", "Linia 31", "Linia 32", "Linia 35", "Linia 53"] }, { title: "Complexul Mare", coordinate: { latitude: 45.64384949999999, longitude: 25.6326646 }, buses: ["Linia 17B", "Linia 8", "Linia 6", "Linia 52", "Linia 21", "Linia 22", "Linia 23", "Linia 25"] }, { title: "Carierei*", coordinate: { latitude: 45.65808819999999, longitude: 25.5806331 }, buses: ["Linia 14"] }, { title: "Valea Cetatii", coordinate: { latitude: 45.6306138, longitude: 25.601677 }, buses: ["Linia 3", "Linia 10", "Linia 33", "Linia 31", "Linia 32"] }, { title: "Cineplex Coresi", coordinate: { latitude: 45.6717918, longitude: 25.6135915 }, buses: ["Linia 2", "Linia 9"] }, { title: "Huniade", coordinate: { latitude: 45.66656099999999, longitude: 25.5888589 }, buses: ["Linia 15", "Linia 9", "Linia 29"] }, { title: "Livada Postei", coordinate: { latitude: 45.6455145, longitude: 25.588325 }, buses: ["Linia 1", "Linia 14", "Linia 2", "Linia 4", "Linia 6", "Linia 41", "Linia 50", "Linia 16", "Linia 17", "Linia 20", "TRASEU TURISTIC (suspendat)", "Linia 24", "Linia 28", "Linia 31", "Linia 34", "Linia 36"] }, { title: "Sanitas", coordinate: { latitude: 45.6493336, longitude: 25.6004232 }, buses: ["Linia 1", "Linia 2", "Linia 4", "Linia 5", "Linia 6", "Linia 50", "Linia 16", "Linia 51", "Linia 17", "Linia 52", "Linia 22", "Linia 31", "Linia 34", "Linia 36"] }, { title: "Zlatna", coordinate: { latitude: 45.66677199999999, longitude: 25.574782 }, buses: ["Linia 15", "Linia 25", "Linia 29"] }, { title: "Rasaritul", coordinate: { latitude: 45.653393, longitude: 25.56628 }, buses: ["Linia 14"] }, { title: "Fartec", coordinate: { latitude: 45.666141, longitude: 25.5890359 }, buses: ["Linia 3", "Linia 16", "Linia 23", "Linia 23B", "Linia 25"] }, { title: "Primarie", coordinate: { latitude: 45.64653029999999, longitude: 25.5962607 }, buses: ["Linia 1", "Linia 2", "Linia 4", "Linia 5", "Linia 6", "Linia 41", "Linia 50", "Linia 16", "Linia 51", "Linia 17", "Linia 52", "TRASEU TURISTIC (suspendat)", "Linia 31", "Linia 34", "Linia 36"] }, { title: "Tractorul", coordinate: { latitude: 45.664776, longitude: 25.608927 }, buses: ["Linia 2", "Linia 15", "Linia 7", "Linia 8", "Linia 9"] }, { title: "Ignis", coordinate: { latitude: 45.649883, longitude: 25.559381 }, buses: ["Linia 14"] }, { title: "Academia Henri Coanda", coordinate: { latitude: 45.6622812, longitude: 25.5931823 }, buses: ["Linia 3", "Linia 16", "Linia 23", "Linia 23B", "Linia 25"] }, { title: "Astra", coordinate: { latitude: 45.6473333, longitude: 25.5893278 }, buses: ["Linia 14", "Linia 5", "Linia 24", "Linia 28"] }, { title: "Rulmentul", coordinate: { latitude: 45.682184, longitude: 25.614951 }, buses: ["Linia 2", "Linia 7", "Linia 8", "Linia 9"] }, { title: "Vectra", coordinate: { latitude: 45.663996, longitude: 25.570035 }, buses: ["Linia 15", "Linia 25", "Linia 28"] }, { title: "Marasesti", coordinate: { latitude: 45.68046700000001, longitude: 25.572535 }, buses: ["Linia 14"] }, { title: "Coresi", coordinate: { latitude: 45.668853, longitude: 25.629482 }, buses: ["Linia 2", "Linia 7", "Linia 8", "Linia 9"] }, { title: "1 Decembrie 1918", coordinate: { latitude: 45.6665682, longitude: 25.5985361 }, buses: ["Linia 15", "Linia 9", "Linia 29", "Linia 36"] }, { title: "Infostar", coordinate: { latitude: 45.6550093, longitude: 25.6125963 }, buses: ["Linia 4", "Linia 37", "Linia 51", "Linia 32", "Linia 34B", "Linia 35", "Linia 53"] }, { title: "Branduselor", coordinate: { latitude: 45.6536257, longitude: 25.624103 }, buses: ["Linia 17B", "Linia 8", "Linia 21", "Linia 23", "Linia 25", "Linia 34B"] }, { title: "Cometei", coordinate: { latitude: 45.63855, longitude: 25.636339 }, buses: ["Linia 17B", "Linia 8", "Linia 6", "Linia 52", "Linia 21", "Linia 22", "Linia 23", "Linia 25"] }, { title: "Universitate", coordinate: { latitude: 45.655924, longitude: 25.600044 }, buses: ["Linia 3", "Linia 16"] }, { title: "Onix", coordinate: { latitude: 45.653442, longitude: 25.6039917 }, buses: ["Linia 3", "Linia 2", "Linia 7", "Linia 6", "Linia 16", "Linia 51", "Linia 52", "Linia 36"] }, { title: "Caprioara", coordinate: { latitude: 45.6596481, longitude: 25.6148441 }, buses: ["Linia 17B", "Linia 8", "Linia 37", "Linia 23", "Linia 23B", "Linia 25", "Linia 34B"] }, { title: "Dacia", coordinate: { latitude: 45.6580689, longitude: 25.612709 }, buses: ["Linia 4", "Linia 37", "Linia 51", "Linia 32", "Linia 34B", "Linia 35", "Linia 53"] }, { title: "Sc. Gen. 25", coordinate: { latitude: 45.6340976, longitude: 25.6059873 }, buses: ["Linia 3", "Linia 10", "Linia 33", "Linia 31", "Linia 32"] }, { title: "Biserica Bartolomeu", coordinate: { latitude: 45.662822, longitude: 25.578067 }, buses: ["Linia 14", "Linia 5", "Linia 24", "Linia 28"] }, { title: "Muncii", coordinate: { latitude: 45.6399339, longitude: 25.6112605 }, buses: ["Linia 3", "Linia 10", "Linia 33", "Linia 31", "Linia 32"] }, { title: "Neptun", coordinate: { latitude: 45.641753, longitude: 25.63532 }, buses: ["Linia 17B", "Linia 8", "Linia 6", "Linia 52", "Linia 21", "Linia 22", "Linia 23", "Linia 25"] }, { title: "Molnar Janos", coordinate: { latitude: 45.665488, longitude: 25.568329 }, buses: ["Linia 15", "Linia 25", "Linia 28"] }, { title: "Auchan Coresi", coordinate: { latitude: 45.66986, longitude: 25.6218121 }, buses: ["Linia 2", "Linia 9"] }, { title: "Rapid", coordinate: { latitude: 45.6596481, longitude: 25.6148441 }, buses: ["Linia 4", "Linia 37", "Linia 32", "Linia 34B", "Linia 35", "Linia 53"] }, { title: "Pantex", coordinate: { latitude: 45.60705, longitude: 25.653741 }, buses: ["Linia 17B"] }, { title: "Roman", coordinate: { latitude: 45.63283699999999, longitude: 25.6325129 }, buses: ["Linia 7", "Linia 5", "Linia 33", "Linia 52", "Linia 25", "Linia 53"] }, { title: "Berzei", coordinate: { latitude: 45.6396394, longitude: 25.6271163 }, buses: ["Linia 5", "Linia 17", "Linia 35", "Linia 53"] }, { title: "Stadionul Tineretului", coordinate: { latitude: 45.6650375, longitude: 25.5833561 }, buses: ["Linia 3", "Linia 41", "Linia 16", "Linia 22", "Linia 23", "Linia 23B", "Linia 25"] }, { title: "Silnef", coordinate: { latitude: 45.6632618, longitude: 25.5855801 }, buses: ["Linia 19", "Linia 34", "Linia 34B"] }, { title: "Noua", coordinate: { latitude: 45.620183, longitude: 25.634 }, buses: ["Linia 19", "Linia 17", "Linia 21", "Linia 35"] }, { title: "Diversitas", coordinate: { latitude: 45.657585, longitude: 25.643914 }, buses: ["Linia 19", "Linia 34", "Linia 34B"] }, { title: "Service", coordinate: { latitude: 45.65961, longitude: 25.566741 }, buses: ["Linia 5M", "Linia 16", "Linia 23", "Linia 24", "Linia 28", "Linia 110"] }, { title: "Vulturului", coordinate: { latitude: 45.6392862, longitude: 25.619711 }, buses: ["Linia 7", "Linia 33"] }, { title: "Benzinaria Petrom", coordinate: { latitude: 45.6331875, longitude: 25.6345642 }, buses: ["Linia 17B"] }, { title: "Halta Timisul de Jos", coordinate: { latitude: 45.584056, longitude: 25.623068 }, buses: ["Linia 17B"] }, { title: "Poienelor", coordinate: { latitude: 45.6317691, longitude: 25.629517 }, buses: ["Linia 7", "Linia 5", "Linia 19", "Linia 33", "Linia 17", "Linia 52", "Linia 35", "Linia 53"] }, { title: "Soarelui", coordinate: { latitude: 45.6370165, longitude: 25.6314219 }, buses: ["Linia 5", "Linia 17", "Linia 35", "Linia 53"] }, { title: "Gemenii", coordinate: { latitude: 45.64944800000001, longitude: 25.628506 }, buses: ["Linia 17B", "Linia 8", "Linia 6", "Linia 52", "Linia 21", "Linia 22", "Linia 23", "Linia 25", "Linia 34", "Linia 34B"] }, { title: "Bd. Garii", coordinate: { latitude: 45.66081399999999, longitude: 25.613418 }, buses: ["Linia 8", "Linia 23", "Linia 23B", "Linia 25", "Linia 29", "Linia 40", "Linia 53"] }, { title: "Stadionul Municipal", coordinate: { latitude: 45.659872, longitude: 25.569987 }, buses: ["Linia 5", "Linia 5M", "Linia 9", "Linia 16", "Linia 23B", "Linia 24"] }, { title: "Plevnei", coordinate: { latitude: 45.660356, longitude: 25.59631 }, buses: ["Linia 3", "Linia 16", "Linia 23", "Linia 23B", "Linia 25", "Linia 40"] }, { title: "Liceul Informatica", coordinate: { latitude: 45.6433375, longitude: 25.6241861 }, buses: ["Linia 5", "Linia 17", "Linia 35", "Linia 53"] }, { title: "Coresi 2", coordinate: { latitude: 45.66986, longitude: 25.6218121 }, buses: ["Linia 15"] }, { title: "Coresi 1", coordinate: { latitude: 45.668853, longitude: 25.629482 }, buses: ["Linia 15"] }, { title: "Artera Sud-Est", coordinate: { latitude: 45.629532, longitude: 25.654986 }, buses: ["Linia 19"] }, { title: "Hidro B", coordinate: { latitude: 45.651378, longitude: 25.6140305 }, buses: ["Linia 3", "Linia 7", "Linia 5", "Linia 10", "Linia 17", "Linia 31", "Linia 32", "Linia 35", "Linia 53"] }, { title: "Spital Tractorul", coordinate: { latitude: 45.66586299999999, longitude: 25.6087021 }, buses: ["Linia 15", "Linia 9", "Linia 29", "Linia 36"] }, { title: "Avantgarden", coordinate: { latitude: 45.6653198, longitude: 25.556325 }, buses: ["Linia 15", "Linia 25", "Linia 28"] }, { title: "Toamnei*", coordinate: { latitude: 45.6525496, longitude: 25.6156271 }, buses: ["Linia 10"] }, { title: "Pompieri", coordinate: { latitude: 45.637155, longitude: 25.622295 }, buses: ["Linia 5", "Linia 53"] }, { title: "Praktiker", coordinate: { latitude: 45.630515, longitude: 25.63789 }, buses: ["Linia 17B", "Linia 17", "Linia 21", "Linia 35"] }, { title: "Facultativa Timis-Triaj", coordinate: { latitude: 45.666898, longitude: 25.649428 }, buses: ["Linia 19", "Linia 34B"] }, { title: "Metrom", coordinate: { latitude: 45.634694, longitude: 25.624213 }, buses: ["Linia 7", "Linia 5", "Linia 33", "Linia 53"] }, { title: "Selgros", coordinate: { latitude: 45.6244026, longitude: 25.6448032 }, buses: ["Linia 17B", "Linia 17", "Linia 21", "Linia 35"] }, { title: "Brintex", coordinate: { latitude: 45.657113, longitude: 25.559274 }, buses: ["Linia 5M", "Linia 23"] }, { title: "Sala Sporturilor", coordinate: { latitude: 45.6590457, longitude: 25.6208213 }, buses: ["Linia 17B", "Linia 8", "Linia 37", "Linia 23", "Linia 23B", "Linia 25", "Linia 34B"] }, { title: "Panait Cerna", coordinate: { latitude: 45.650633, longitude: 25.626125 }, buses: ["Linia 17B", "Linia 8", "Linia 21", "Linia 23", "Linia 25", "Linia 34B"] }, { title: "Carrefour", coordinate: { latitude: 45.631603, longitude: 25.637197 }, buses: ["Linia 17B", "Linia 17", "Linia 52", "Linia 21", "Linia 25", "Linia 35"] }, { title: "Metro", coordinate: { latitude: 45.622209, longitude: 25.646676 }, buses: ["Linia 17B", "Linia 17", "Linia 21", "Linia 35"] }, { title: "Ioan Clopotel", coordinate: { latitude: 45.652126, longitude: 25.542612 }, buses: ["Linia 5M"] }, { title: "CET", coordinate: { latitude: 45.6616232, longitude: 25.640872 }, buses: ["Linia 19", "Linia 34", "Linia 34B"] }, { title: "Magurele", coordinate: { latitude: 45.660356, longitude: 25.59631 }, buses: ["Linia 5M"] }, { title: "Tudor Vladimirescu", coordinate: { latitude: 45.6648632, longitude: 25.594011 }, buses: ["Linia 3", "Linia 16", "Linia 23", "Linia 23B", "Linia 25"] }, { title: "Castanilor", coordinate: { latitude: 45.6491821, longitude: 25.6041903 }, buses: ["Linia 2", "Linia 50", "Linia 16", "Linia 51", "Linia 36"] }, { title: "Dambul Morii", coordinate: { latitude: 45.594584, longitude: 25.634977 }, buses: ["Linia 17B"] }, { title: "Energo", coordinate: { latitude: 45.653483, longitude: 25.653081 }, buses: ["Linia 19", "Linia 34", "Linia 34B"] }, { title: "Aurora", coordinate: { latitude: 45.617662, longitude: 25.651754 }, buses: ["Linia 17B", "Linia 17", "Linia 21", "Linia 35"] }, { title: "Fundatura Harmanului", coordinate: { latitude: 45.6741993, longitude: 25.6469638 }, buses: ["Linia 19", "Linia 34B"] }, { title: "Bartolomeu Gara", coordinate: { latitude: 45.6626617, longitude: 25.5746001 }, buses: ["Linia 5", "Linia 9", "Linia 16", "Linia 23", "Linia 23B", "Linia 24", "Linia 28"] }, { title: "Invatatorilor", coordinate: { latitude: 45.627904, longitude: 25.56805 }, buses: ["Linia 50"] }, { title: "Warte", coordinate: { latitude: 45.6461033, longitude: 25.5770409 }, buses: ["Linia 20"] }, { title: "La Moara", coordinate: { latitude: 45.6579755, longitude: 25.6011977 }, buses: ["Linia 50"] }, { title: "Facultativa*", coordinate: { latitude: 45.648398, longitude: 25.5307779 }, buses: ["Linia 14", "Linia 5M", "Linia 18", "Linia 24"] }, { title: "Iveco", coordinate: { latitude: 45.682978, longitude: 25.584294 }, buses: ["Linia 40"] }, { title: "Pensiunea Stupina", coordinate: { latitude: 45.686708, longitude: 25.569921 }, buses: ["Linia 41"] }, { title: "Piata Agroalimentara", coordinate: { latitude: 45.6656888, longitude: 25.604235 }, buses: ["Linia 18", "Linia 40"] }, { title: "Pod Barsa", coordinate: { latitude: 45.682648, longitude: 25.553421 }, buses: ["Linia 28"] }, { title: "Baciului CL", coordinate: { latitude: 45.715795, longitude: 25.5888961 }, buses: ["Linia 24"] }, { title: "Cimitirul Central", coordinate: { latitude: 45.672738, longitude: 25.5751891 }, buses: ["Linia 41"] }, { title: "Piata Auto", coordinate: { latitude: 45.664, longitude: 25.555342 }, buses: ["Linia 28"] }, { title: "Judetean", coordinate: { latitude: 45.647288, longitude: 25.619313 }, buses: ["Linia 10"] }, { title: "Oitelor", coordinate: { latitude: 45.693119, longitude: 25.5630451 }, buses: ["Linia 41"] }, { title: "Piata Sfatului", coordinate: { latitude: 45.6473333, longitude: 25.5893278 }, buses: ["TRASEU TURISTIC (suspendat)"] }, { title: "Panselelor", coordinate: { latitude: 45.627529, longitude: 25.622478 }, buses: ["Linia 52", "Linia 53"] }, { title: "Piata Unirii", coordinate: { latitude: 45.636187, longitude: 25.57924 }, buses: ["Linia 50", "Linia 51", "Linia 52", "TRASEU TURISTIC (suspendat)"] }, { title: "Stad. Municipal", coordinate: { latitude: 45.659872, longitude: 25.569987 }, buses: ["Linia 23", "Linia 28", "Linia 110"] }, { title: "Depozite ILF", coordinate: { latitude: 45.65838, longitude: 25.5633619 }, buses: ["Linia 5M", "Linia 23"] }, { title: "Merilor", coordinate: { latitude: 45.69047560000001, longitude: 25.5661913 }, buses: ["Linia 41"] }, { title: "Liceul Mesota", coordinate: { latitude: 45.653912, longitude: 25.6092616 }, buses: ["Linia 1", "Linia 3", "Linia 7", "Linia 4", "Linia 5", "Linia 10", "Linia 37", "Linia 6", "Linia 17", "Linia 52", "Linia 22", "Linia 31", "Linia 32", "Linia 34", "Linia 34B", "Linia 35", "Linia 53"] }, { title: "Lujerului", coordinate: { latitude: 45.71438999999999, longitude: 25.551206 }, buses: ["Linia 41"] }, { title: "Dulgherului", coordinate: { latitude: 45.65695849999999, longitude: 25.6063582 }, buses: ["Linia 41"] }, { title: "Balcescu", coordinate: { latitude: 45.6416198, longitude: 25.5925603 }, buses: ["Linia 50", "Linia 51", "Linia 52"] }, { title: "Aleea Tiberiu Brediceanu", coordinate: { latitude: 45.6389364, longitude: 25.5931848 }, buses: ["TRASEU TURISTIC (suspendat)"] }, { title: "Pavilioanele CFR", coordinate: { latitude: 45.65982, longitude: 25.6320799 }, buses: ["Linia 37"] }, { title: "Bariera Bartolomeu", coordinate: { latitude: 45.664274, longitude: 25.577953 }, buses: ["Linia 41", "Linia 18"] }, { title: "Iuliu Maniu", coordinate: { latitude: 45.6493336, longitude: 25.6004232 }, buses: ["Linia 41", "Linia 22"] }, { title: "Ceferistilor", coordinate: { latitude: 45.6604, longitude: 25.6259 }, buses: ["Linia 37"] }, { title: "Morii", coordinate: { latitude: 45.658028, longitude: 25.587384 }, buses: ["Linia 41", "Linia 22"] }, { title: "Solomon", coordinate: { latitude: 45.61752509999999, longitude: 25.5584693 }, buses: ["Linia 50"] }, { title: "Dimitrie Anghel", coordinate: { latitude: 45.669005, longitude: 25.576226 }, buses: ["Linia 41"] }, { title: "ICPC", coordinate: { latitude: 45.673158, longitude: 25.542709 }, buses: ["Linia 24", "Linia 28"] }, { title: "Timis Triaj", coordinate: { latitude: 45.666898, longitude: 25.649428 }, buses: ["Linia 34"] }, { title: "Autogara 2", coordinate: { latitude: 45.6635306, longitude: 25.5829344 }, buses: ["Linia 41", "Linia 22"] }, { title: "Stupini Izvorului spre Lujerului", coordinate: { latitude: 45.702366, longitude: 25.555766 }, buses: ["Linia 41", "Linia 24"] }, { title: "IAR Ghimbav", coordinate: { latitude: 45.6632991, longitude: 25.5072284 }, buses: ["Linia 18", "Linia 28"] }, { title: "Scriitorilor", coordinate: { latitude: 45.65050550000001, longitude: 25.6206523 }, buses: ["Linia 6", "Linia 52", "Linia 22", "Linia 34"] }, { title: "Stupini Centru", coordinate: { latitude: 45.698023, longitude: 25.558432 }, buses: ["Linia 41", "Linia 18", "Linia 24", "Linia 40"] }, { title: "Plugarilor", coordinate: { latitude: 45.6808817, longitude: 25.5729574 }, buses: ["Linia 41"] }, { title: "Facultativa Fundaturii", coordinate: { latitude: 45.6579755, longitude: 25.6011977 }, buses: ["Linia 24"] }, { title: "Gara Brasov", coordinate: { latitude: 45.6596481, longitude: 25.6148441 }, buses: ["Linia 4", "Linia 17B", "Linia 37", "Linia 51", "Linia 25", "Linia 29", "Linia 32", "Linia 34B", "Linia 35", "Linia 40"] }, { title: "Iancu Jianu", coordinate: { latitude: 45.660427, longitude: 25.600816 }, buses: ["Linia 23", "Linia 23B", "Linia 25", "Linia 40"] }, { title: "Feldioarei", coordinate: { latitude: 45.708153, longitude: 25.579734 }, buses: ["Linia 18", "Linia 40"] }, { title: "Parc Ind. Metrom", coordinate: { latitude: 45.634453, longitude: 25.6227758 }, buses: ["Linia 52", "Linia 53"] }, { title: "Str. Fagurului", coordinate: { latitude: 45.698023, longitude: 25.558432 }, buses: ["Linia 24"] }, { title: "Facultativa II", coordinate: { latitude: 45.648398, longitude: 25.5307779 }, buses: ["Linia 50", "Linia 18", "Linia 20", "Linia 24"] }, { title: "Campus Genius", coordinate: { latitude: 45.668525, longitude: 25.549028 }, buses: ["Linia 24"] }, { title: "Facultativa (MTI)", coordinate: { latitude: 45.648398, longitude: 25.5307779 }, buses: ["Linia 5M", "Linia 110"] }, { title: "Gh. Doja", coordinate: { latitude: 45.667685, longitude: 25.577942 }, buses: ["Linia 18"] }, { title: "Star", coordinate: { latitude: 45.644806, longitude: 25.598713 }, buses: ["Linia 50", "Linia 51", "Linia 52", "TRASEU TURISTIC (suspendat)"] }, { title: "Poiana Mica", coordinate: { latitude: 45.6080637, longitude: 25.5542074 }, buses: ["Linia 60", "Linia 20"] }, { title: "Stupinii Noi", coordinate: { latitude: 45.7204725, longitude: 25.5709102 }, buses: ["Linia 24"] }, { title: "Craiter", coordinate: { latitude: 45.6569103, longitude: 25.6335229 }, buses: ["Linia 37"] }, { title: "Facultativa**", coordinate: { latitude: 45.6579755, longitude: 25.6011977 }, buses: ["Linia 24"] }, { title: "Avicola Magurele", coordinate: { latitude: 45.628325, longitude: 25.521197 }, buses: ["Linia 5M"] }, { title: "Rial", coordinate: { latitude: 45.65149599999999, longitude: 25.595527 }, buses: ["Linia 41", "Linia 22"] }, { title: "Biserica", coordinate: { latitude: 45.664776, longitude: 25.608927 }, buses: ["Linia 33"] }, { title: "Biserica Neagra", coordinate: { latitude: 45.64039140000001, longitude: 25.5856553 }, buses: ["Linia 50", "Linia 51", "Linia 52"] }, { title: "Spital Marzescu", coordinate: { latitude: 45.647288, longitude: 25.619313 }, buses: ["Linia 41", "Linia 22"] }, { title: "Opera Brasov", coordinate: { latitude: 45.6546111, longitude: 25.5898849 }, buses: ["Linia 41", "Linia 22"] }, { title: "Strand Noua", coordinate: { latitude: 45.6154539, longitude: 25.6405852 }, buses: ["Linia 17", "Linia 21", "Linia 35"] }, { title: "Podul Cretului", coordinate: { latitude: 45.626344, longitude: 25.566441 }, buses: ["Linia 50"] }, { title: "Sc. Gen. 4", coordinate: { latitude: 45.63766100000001, longitude: 25.6128538 }, buses: ["Linia 33"] }, { title: "Silver Mountain", coordinate: { latitude: 45.604879, longitude: 25.54359 }, buses: ["Linia 60"] }, { title: "Poligrafie", coordinate: { latitude: 45.648931, longitude: 25.640641 }, buses: ["Linia 34", "Linia 34B"] }, { title: "Liceul Saguna", coordinate: { latitude: 45.653912, longitude: 25.6092616 }, buses: ["Linia 50", "Linia 51", "Linia 52", "TRASEU TURISTIC (suspendat)"] }, { title: "Traian", coordinate: { latitude: 45.6501234, longitude: 25.6232031 }, buses: ["Linia 6", "Linia 52", "Linia 22", "Linia 34"] }, { title: "Statie Epurare", coordinate: { latitude: 45.6808817, longitude: 25.5729574 }, buses: ["Linia 41"] }, { title: "Stupini Izvorului", coordinate: { latitude: 45.70230000000001, longitude: 25.555653 }, buses: ["Linia 41", "Linia 40"] }, { title: "Complex Bartolomeu", coordinate: { latitude: 45.6635849, longitude: 25.5788417 }, buses: ["Linia 41", "Linia 9", "Linia 16", "Linia 23", "Linia 23B", "Linia 25"] }, { title: "Unitate Militara", coordinate: { latitude: 45.67630700000001, longitude: 25.58041 }, buses: ["Linia 18", "Linia 110"] }, { title: "Posta", coordinate: { latitude: 45.6679246, longitude: 25.5710748 }, buses: ["Linia 28", "Linia 29"] }, { title: "Sc. Gen. 9", coordinate: { latitude: 45.615313, longitude: 25.630739 }, buses: ["Linia 17", "Linia 21", "Linia 35"] }, { title: "Str. Izvorului", coordinate: { latitude: 45.70230000000001, longitude: 25.555653 }, buses: ["Linia 24"] }, { title: "Oligopol", coordinate: { latitude: 45.68234899999999, longitude: 25.581729 }, buses: ["Linia 18"] }, { title: "Varistei", coordinate: { latitude: 45.629433, longitude: 25.568957 }, buses: ["Linia 50"] }, { title: "Patinoarul Olimpic", coordinate: { latitude: 45.6637484, longitude: 25.6123343 }, buses: ["Linia 53"] }, { title: "Conforest", coordinate: { latitude: 45.6713795, longitude: 25.5789735 }, buses: ["Linia 18"] }, { title: "Fundaturii cl", coordinate: { latitude: 45.683117, longitude: 25.543218 }, buses: ["Linia 18", "Linia 24", "Linia 28"] }, { title: "Eroilor", coordinate: { latitude: 45.6455145, longitude: 25.588325 }, buses: ["Linia 110"] }, { title: "Camine IAR", coordinate: { latitude: 45.671035, longitude: 25.5657785 }, buses: ["Linia 28", "Linia 29"] }, { title: "Carfil", coordinate: { latitude: 45.64918, longitude: 25.647395 }, buses: ["Linia 34", "Linia 34B"] }, { title: "Tipografia Brastar", coordinate: { latitude: 45.697849, longitude: 25.582073 }, buses: ["Linia 18", "Linia 40"] }, { title: "Str. Baciului", coordinate: { latitude: 45.715795, longitude: 25.5888961 }, buses: ["Linia 24"] }, { title: "Albinelor", coordinate: { latitude: 45.687453, longitude: 25.5455521 }, buses: ["Linia 28"] }, { title: "Brintex*", coordinate: { latitude: 45.657113, longitude: 25.559274 }, buses: ["Linia 23"] }, { title: "Centru", coordinate: { latitude: 45.65695849999999, longitude: 25.6063582 }, buses: ["Linia 110"] }, { title: "Facultate Constructii", coordinate: { latitude: 45.6596481, longitude: 25.6148441 }, buses: ["Linia 53"] }, { title: "Romradiatoare", coordinate: { latitude: 45.64907710000001, longitude: 25.6445481 }, buses: ["Linia 34", "Linia 34B"] }, { title: "Facultativa***", coordinate: { latitude: 45.6579755, longitude: 25.6011977 }, buses: ["Linia 24"] }, { title: "Poiana Darste", coordinate: { latitude: 45.616414, longitude: 25.6453269 }, buses: ["Linia 17", "Linia 21", "Linia 35"] }, { title: "Papa Reale", coordinate: { latitude: 45.665406, longitude: 25.643935 }, buses: ["Linia 34"] }, { title: "Izvorului spre Baciului", coordinate: { latitude: 45.702103, longitude: 25.556061 }, buses: ["Linia 24"] }, { title: "Baumax", coordinate: { latitude: 45.673229, longitude: 25.589765 }, buses: ["Linia 40"] }, { title: "Fagurului", coordinate: { latitude: 45.70532499999999, longitude: 25.5720409 }, buses: ["Linia 18", "Linia 40"] }, { title: "Scoala", coordinate: { latitude: 45.63766100000001, longitude: 25.6128538 }, buses: ["Linia 110"] }, { title: "Brancoveanu", coordinate: { latitude: 45.6391594, longitude: 25.5828331 }, buses: ["Linia 50", "Linia 51", "Linia 52"] }, { title: "Case", coordinate: { latitude: 45.6432609, longitude: 25.6242105 }, buses: ["Linia 18", "Linia 28"] }, { title: "Surlasului", coordinate: { latitude: 45.693613, longitude: 25.5524181 }, buses: ["Linia 18", "Linia 24"] }, { title: "Cernatului", coordinate: { latitude: 45.64905599999999, longitude: 25.651757 }, buses: ["Linia 34", "Linia 34B"] }, { title: "Junilor", coordinate: { latitude: 45.629773, longitude: 25.57128 }, buses: ["Linia 50"] }, { title: "Elmas", coordinate: { latitude: 45.68752800000001, longitude: 25.582899 }, buses: ["Linia 18", "Linia 40"] }, { title: "Roplant", coordinate: { latitude: 45.660892, longitude: 25.55598 }, buses: ["Linia 24", "Linia 28"] }, { title: "Mondotrans", coordinate: { latitude: 45.705557, longitude: 25.5804851 }, buses: ["Linia 18", "Linia 40"] }, { title: "Telecabina", coordinate: { latitude: 45.6389364, longitude: 25.5931848 }, buses: ["Linia 60"] }, { title: "Tocile", coordinate: { latitude: 45.6331242, longitude: 25.5764562 }, buses: ["Linia 50", "Linia 51", "Linia 52"] }, { title: "Bartolomeu Nord", coordinate: { latitude: 45.664274, longitude: 25.577953 }, buses: ["Linia 28", "Linia 29"] }, { title: "Mol", coordinate: { latitude: 45.68437, longitude: 25.58274 }, buses: ["Linia 40"] }, { title: "Rozmarinului", coordinate: { latitude: 45.61899, longitude: 25.637326 }, buses: ["Linia 17", "Linia 21", "Linia 35"] }, { title: "Targ Auto", coordinate: { latitude: 45.664, longitude: 25.555342 }, buses: ["Linia 24"] }, { title: "Tineretului (Cristian)", coordinate: { latitude: 45.62853, longitude: 25.4815818 }, buses: ["Linia 110"] }, { title: "Agetaps", coordinate: { latitude: 45.6887059, longitude: 25.5815942 }, buses: ["Linia 18", "Linia 40"] }, { title: "Hotel Trifan", coordinate: { latitude: 45.670973, longitude: 25.590543 }, buses: ["Linia 40"] }, { title: "Bronzului", coordinate: { latitude: 45.66833800000001, longitude: 25.597115 }, buses: ["Linia 36"] }, { title: "Turnului", coordinate: { latitude: 45.6596481, longitude: 25.6148441 }, buses: ["Linia 53"] }, { title: "Independentei", coordinate: { latitude: 45.6664942, longitude: 25.5957604 }, buses: ["Linia 36"] }, { title: "Hornbach", coordinate: { latitude: 45.660892, longitude: 25.550745 }, buses: ["Linia 24", "Linia 28", "Linia 110"] }, { title: "Poiana Brasov", coordinate: { latitude: 45.59486, longitude: 25.553191 }, buses: ["Linia 60", "Linia 20"] }, { title: "Fantanii", coordinate: { latitude: 45.707401, longitude: 25.575228 }, buses: ["Linia 18", "Linia 40"] }, { title: "Dedeman", coordinate: { latitude: 45.67905, longitude: 25.586858 }, buses: ["Linia 40"] }, { title: "Bellevue Residence", coordinate: { latitude: 45.6452135, longitude: 25.580207 }, buses: ["Linia 20"] }, { title: "Univ. Spiru Haret", coordinate: { latitude: 45.664776, longitude: 25.608927 }, buses: ["Linia 53"] }, { title: "Fundaturii", coordinate: { latitude: 45.685755, longitude: 25.541413 }, buses: ["Linia 18", "Linia 24", "Linia 28"] }, { title: 'Prunului', coordinate: { latitude: 45.6241599, longitude: 25.6356847}, buses:["Linia 19"]}
            , { title: 'Metabras', coordinate: { latitude: 45.676453, longitude: 25.588306 }, buses: ["Linia 19","Linia 34B","Linia 40"] }
            , { title: 'Caramidariei', coordinate: { latitude: 45.65838, longitude: 25.5633619 }, buses: ["Linia 5M", "Linia 16", "Linia 23", "Linia 24","Linia 110"] }
            , { title: 'Int. Ceferistilor', coordinate: { latitude: 45.656595, longitude: 25.631522 }, buses: ["Linia 37"] }
            , { title: 'Int. Ceferistilor', coordinate: { latitude: 45.688663, longitude: 25.5678731 }, buses: ["Linia 41"] }
            , { title: 'Aurora', coordinate: { latitude: 45.6180326, longitude: 25.6483649 }, buses: ["Linia 17", "Linia 21", "Linia 25"] }

    ]
        , region: {
            latitude: 45.6577152,
            longitude: 25.6221705,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        },
        searchModal: false,
        modalVisible: false,
        modalVisible2: false,
        routeSearch: false,
        ready: false,
        myMarker: {
            latlng: {
                latitude: 45.6577152,
                longitude: 25.6221705,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }
        },
    };

    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
    }
    componentDidMount() {
        let geoOptions = {};
        navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoErr, geoOptions)
    }
    geoSuccess = (position) => {
        this.state.markers.push({
            title: "Locatia mea",
            coordinate: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            },
            buses: ["Locatia mea"]
        })
        this.setState({
            myMarker: {
                latlng: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }
            },
            ready: true

        }, () => {
            this.map.animateToRegion(
                {
                    latitude: this.state.myMarker.latlng.latitude,
                    longitude: this.state.myMarker.latlng.longitude,
                    latitudeDelta: this.state.region.latitudeDelta,
                    longitudeDelta: this.state.region.longitudeDelta,
                },
                350
            );
        })
    }
    geoErr = (err) => {
        this.setState({ error: err.message });
    }
    _swipeMaps(index) {
        clearTimeout(this.regionTimeout);
        this.regionTimeout = setTimeout(() => {

            console.log("aici index mapa swipe" + index);
            const { coordinate } = this.state.markers[index];
            this.map.animateToRegion(
                {
                    ...coordinate,
                    latitudeDelta: this.state.region.latitudeDelta,
                    longitudeDelta: this.state.region.longitudeDelta,
                },
                350
            );

        }, 10);
    }
    _renderBuses(bus, station) {
        const { navigate } = this.props.navigation;
        tableBus = []
        for (let i = 0; i < bus.length; i++) {
            tableBus.push(
                <Text style={styles.busTitle} onPress={() => { navigate('Stations', { stationName: station }) }} key={bus[i]}>{bus[i]}</Text>
            )
        }
        return tableBus
    }
    setModalVisible2(visible) {
        this.setState({ modalVisible2: visible });
        var tableStations = [];
        tableStations.push({
            id: 1,
            name: "Locatia mea"
        })
        var index = 2;
        for (let i = 0; i < this.state.markers.length; i++) {
            tableStations.push({
                id: index,
                name: this.state.markers[i].title
            })
            index++;
        }
        this.setState({ tableStations });
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
        var tableStations = [];
        tableStations.push({
            id: 1,
            name: "Locatia mea"
        })
        var index = 2;
        for (let i = 0; i < this.state.markers.length; i++) {
            tableStations.push({
                id: index,
                name: this.state.markers[i].title
            })
            index++;
        }
        this.setState({ tableStations });
    }
    _renderItem({ item, index }) {
        return (
            <View style={styles.card} key={index}>

                <View style={styles.textContent}>
                    <Text numberOfLines={1} style={styles.cardtitle} >{item.title}</Text>
                    <View style={{
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                    }}>
                        {/* {this._renderBuses(item.buses, item.title)} */}
                    </View>

                </View>
            </View>
        );
    }
    _searchDirections() {

        for (let i = 0; i < this.state.markers.length; i++) {

            if (this.state.textLine1.name === this.state.markers[i].title) {
                coordsForDeparture = this.state.markers[i]
            }
        }
        for (let i = 0; i < this.state.markers.length; i++) {

            if (this.state.textLine2.name === this.state.markers[i].title) {
                coordsForArive = this.state.markers[i]
            }
        }
        console.log(coordsForArive);
        console.log(coordsForDeparture);
        this.setState(
            {
                coordsForDeparture: coordsForDeparture.coordinate,
                coordsForArive: coordsForArive.coordinate
            }, () => {
                this.map.animateToRegion(
                    {
                        latitude: this.state.coordsForDeparture.latitude,
                        longitude: this.state.coordsForDeparture.longitude,
                        latitudeDelta: this.state.region.latitudeDelta,
                        longitudeDelta: this.state.region.longitudeDelta,
                    },
                    350
                );
            });

    }
    _searchOnMap(){
        for (let i = 0; i < this.state.markers.length; i++) {

            if (this.state.textLineSearch.name === this.state.markers[i].title) {
                coordsForSearch= this.state.markers[i]
            }
        }
        this.setState(
            {
                coordsForSearch: coordsForSearch.coordinate,
            }, () => {
                this.map.animateToRegion(
                    {
                        latitude: this.state.coordsForSearch.latitude,
                        longitude: this.state.coordsForSearch.longitude,
                        latitudeDelta: this.state.region.latitudeDelta,
                        longitudeDelta: this.state.region.longitudeDelta,
                    },
                    350
                );
            });
    }
    render() {
        const interpolations = this.state.markers.map((marker, index) => {

            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            return { scale, opacity };
        });
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <MapView
                    customMapStyle={mapStyle}
                    ref={map => this.map = map}
                    initialRegion={this.state.myMarker.latlng}
                    style={styles.container}
                >

                    {this.state.markers.map((marker, index) => {

                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };
                        const opacityStyle = {
                            opacity: interpolations[index].opacity,
                        };
                        const { navigate } = this.props.navigation;
                        if (this.state.ready && marker.title === "Locatia mea") {
                            return (
                                <MapView.Marker
                                    coordinate={this.state.myMarker.latlng}
                                    image={require('./assets/pin.png')}
                                />
                            )
                        } else {
                            return (
                                <MapView.Marker key={index} coordinate={marker.coordinate}>
                                    <MapView.Callout
                                        tooltip
                                        style={{ width: width / 1.5, flex: 1 }}
                                        onPress={() => { navigate('Stations', { stationName: marker.title }) }}
                                    >
                                        <View style={styles.containerTooltip} onPress={() => { navigate('Stations', { stationName: marker.title }) }}>
                                            <Text style={styles.textTooltip}>{marker.title}</Text>
                                            <View style={{
                                                flexWrap: 'wrap',
                                                alignItems: 'flex-start',
                                                flexDirection: 'row',
                                            }}>
                                                {this._renderBuses(marker.buses, marker.title)}
                                            </View>
                                        </View>
                                    </MapView.Callout>
                                </MapView.Marker>
                            );
                        }
                    })}
                    <MapViewDirections
                        origin={this.state.coordsForDeparture}
                        destination={this.state.coordsForArive}
                        apikey={GOOGLE_MAPS_APIKEY}
                        mode={"transit"}
                        strokeWidth={4}
                        strokeColor="red"
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);

                        }}
                        onReady={result => {
                            console.log(result);
                            console.log(`Distance: "${result.distance}" km`)
                            console.log(`Duration: "${result.duration}" min.`)
                            this.setState({ distance: Math.round(result.distance * 100) / 100, duration: Math.floor(result.duration) })
                        }}
                        onError={(errorMessage) => {
                            // console.log('GOT AN ERROR');
                        }}
                    />
                </MapView>
                {(this.state.routeSearch && this.state.distance && this.state.duration) && (
                    <View style={styles.routeSearchDetails}>
                        <Text style={styles.routeSearchText}>Distanta:  {this.state.distance} KM</Text>
                        <Text style={styles.routeSearchText}>Durata:  {this.state.duration} MIN</Text>
                    </View>
                )}
                <View style={styles.scrollView}>

                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.markers}
                        renderItem={this._renderItem}
                        sliderWidth={width}
                        itemWidth={width / 2}
                        onSnapToItem={() => { this._swipeMaps(this._carousel.currentIndex) }}
                    />
                </View>

                <View style={styles.buttonSearch} >
                    <TouchableHighlight
                        onPress={() => {
                            this.setModalVisible(true);
                        }}>
                        <Text style={styles.text}>Direcții</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.buttonSearch2} >
                    <TouchableHighlight
                        onPress={() => {
                            this.setModalVisible2(true);
                        }}>
                        <Text style={styles.text}>Caută</Text>
                    </TouchableHighlight>
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Image source={require('./assets/wave2.png')} style={styles.bgImages} resizeMode={'cover'} />
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text style={styles.textModal}>Caută traseu</Text>

                            <SearchableDropdown
                                onTextChange={(textLine1) => { this.setState({ textLine1 }); console.log(this.state.textLine1.name) }}
                                onItemSelect={(textLine1) => { this.setState({ textLine1, itemSelect: true }); console.log(this.state.textLine1.name) }}
                                containerStyle={{ padding: 5 }}
                                textInputStyle={{
                                    padding: 12,
                                    borderWidth: 1,
                                    borderColor: '#3b37fe',
                                    borderRadius: 0,
                                    color: '#3b37fe',
                                }}
                                itemStyle={{
                                    padding: 10,
                                    marginTop: 2,
                                    backgroundColor: '#3b37fe',
                                    borderColor: '#3b37fe',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                                itemTextStyle={{ color: 'white' }}
                                itemsContainerStyle={{ maxHeight: 200 }}
                                items={this.state.tableStations}
                                placeholder="Scrie stația de plecare"
                                placeholderTextColor="black"
                                resetValue={false}
                                underlineColorAndroid="transparent"
                                value={this.state.textLine1}
                            />
                            <SearchableDropdown
                                onTextChange={(textLine2) => { this.setState({ textLine2 }); console.log(this.state.textLine2.name) }}
                                onItemSelect={(textLine2) => { this.setState({ textLine2, itemSelect: true }); console.log(this.state.textLine2.name) }}
                                containerStyle={{ padding: 5 }}
                                textInputStyle={{
                                    padding: 12,
                                    borderWidth: 1,
                                    borderColor: '#3b37fe',
                                    borderRadius: 0,
                                    color: '#3b37fe',
                                }}
                                itemStyle={{
                                    padding: 10,
                                    marginTop: 2,
                                    backgroundColor: '#3b37fe',
                                    borderColor: '#3b37fe',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                                itemTextStyle={{ color: 'white' }}
                                itemsContainerStyle={{ maxHeight: 200 }}
                                items={this.state.tableStations}
                                placeholder="Scrie stația de sosire"
                                placeholderTextColor="black"
                                resetValue={false}
                                underlineColorAndroid="transparent"
                                value={this.state.textLine2}
                            />
                            <TouchableOpacity
                                style={styles.buttonModal}
                                underlayColor='#fff'
                                onPress={() => {
                                    this._searchDirections();
                                    this.setState({ routeSearch: true })
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={styles.textHide}>CAUTĂ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonModal}
                                underlayColor='#fff'
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={styles.textHide}>ANULEAZĂ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible2}
                    onRequestClose={() => {
                        this.setModalVisible2(!this.state.modalVisible2);
                    }}>
                    <Image source={require('./assets/wave2.png')} style={styles.bgImages} resizeMode={'cover'} />
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text style={styles.textModal}>Caută pe hartă</Text>

                            <SearchableDropdown
                                onTextChange={(textLineSearch) => { this.setState({ textLineSearch }); console.log(this.state.textLineSearch.name) }}
                                onItemSelect={(textLineSearch) => { this.setState({ textLineSearch, itemSelect: true }); console.log(this.state.textLineSearch.name) }}
                                containerStyle={{ padding: 5 }}
                                textInputStyle={{
                                    padding: 12,
                                    borderWidth: 1,
                                    borderColor: '#3b37fe',
                                    borderRadius: 0,
                                    color: '#3b37fe',
                                }}
                                itemStyle={{
                                    padding: 10,
                                    marginTop: 2,
                                    backgroundColor: '#3b37fe',
                                    borderColor: '#3b37fe',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                                itemTextStyle={{ color: 'white' }}
                                itemsContainerStyle={{ maxHeight: 200 }}
                                items={this.state.tableStations}
                                placeholder="Scrie stația"
                                placeholderTextColor="black"
                                resetValue={false}
                                underlineColorAndroid="transparent"
                                value={this.state.textLineSearch}
                            />
                          
                            <TouchableOpacity
                                style={styles.buttonModal}
                                underlayColor='#fff'
                                onPress={() => {
                                    this._searchOnMap();
                                    this.setState({ routeSearch: true })
                                    this.setModalVisible2(!this.state.modalVisible2);
                                }}>
                                <Text style={styles.textHide}>CAUTĂ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonModal}
                                underlayColor='#fff'
                                onPress={() => {
                                    this.setModalVisible2(!this.state.modalVisible2);
                                }}>
                                <Text style={styles.textHide}>ANULEAZĂ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    routeSearchText: {
        padding: 10,
        backgroundColor: "#3b37fe",
        color: "white",
        fontSize: 17,
        fontWeight: "900",
        marginTop: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,

    },
    routeSearchDetails: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    textHide: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '900',
        letterSpacing: 1,
        marginTop: 10,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '900',
        letterSpacing: 1,
        fontSize: 15,
    },
    textModal: {
        color: 'black',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '900',
        letterSpacing: 1,
        fontSize: 22,
    },
    textOpenModal: {
        color: 'white',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: '900',
        letterSpacing: 1,
        fontSize: 20,
    },
    input: {
        borderBottomWidth: 2,
        borderColor: 'white',
        marginTop: 20,
        marginBottom: 20,
        fontSize: 25,
        color: "white",
        fontWeight: '900',
    },
    buttonModal: {
        textAlign: 'center',
        borderRadius: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: 20,
        backgroundColor: '#1B1D1C',
        paddingBottom: 10,
        textAlign: 'center',
        width: 125,
        alignSelf: 'center',
    },
    bgImages: {
        width: imageWidth,
        height: 1000,
        position: 'absolute',
        zIndex: 0,
        bottom: 0,
    },
    bgMain: {
        height: height,
        width: width,

        position: 'absolute',
        zIndex: 0,
        top: 0,
        opacity: 1,

    },
    buttonOpenModal: {
        width: 348,
    },
    buttonSearch: {
        position: 'absolute',
        top: 10,
        left: 0,
        backgroundColor: "#3b37fe",
        padding: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        width: 100,
    },
    buttonSearch2: {
        position: 'absolute',
        top: 80,
        left: 0,
        backgroundColor: "#3b37fe",
        padding: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        width: 100,
    },
    textButtonSearch: {
        color: "white",
        fontWeight: '900',
    },
    cancelSearch: {
        backgroundColor: "white",
        padding: 20,
    },
    textButtonCancelSearch: {
        color: "#3b37fe",
        fontWeight: '900',
    },
    searchContainer: {
        position: 'absolute',

        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "#3b37fe",
    },
    containerTooltip: {
        width: width / 1.5,
        backgroundColor: "#3b37fe",
        padding: 5,
        flex: 1,
    },
    busTitle: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        color: '#3b37fe',
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        margin: 5,
    },
    textTooltip: {
        color: "white",
        fontWeight: '900',
        alignSelf: 'center',
        marginBottom: 10,
    },
    container: {
        flex: 1,
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,

    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#3b37fe",
        alignItems: 'center',
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: 75,
        width: width / 2,
        overflow: "hidden",


    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 17,
        marginTop: 10,


        fontWeight: "bold",
        color: 'white',
        fontWeight: '900'
    },
    cardDescription: {
        fontSize: 13,
        color: "#444",
        color: 'white',
        fontWeight: '900'
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "blue",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
    },
});
const mapStyle = [

    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8ec3b9"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1a3646"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4b6878"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#64779e"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4b6878"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#334e87"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#283d6a"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6f9ba5"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3C7680"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#304a7d"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#98a5be"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2c6675"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#255763"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#b0d5ce"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#98a5be"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#283d6a"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3a4762"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0e1626"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#4e6d70"
            }
        ]
    }
]


AppRegistry.registerComponent("mapfocus", () => screens);