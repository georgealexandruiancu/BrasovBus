import React, { Component } from 'react';
import { Button, View, StyleSheet, Text, TouchableHighlight, ScrollView, Dimensions, AsyncStorage, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-spinkit';
const dimensions = Dimensions.get('window');
import MapView, { Marker } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import * as coordsNames from './coordsNames.json';
export default class Maps extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            ready: false,
            where: {
                lat: null,
                lng: null,
            },
            myMarker: {
                latlng: {
                    latitude: null,
                    longitude: null,
                },
                title: "YES",
                description: "TYEasdad"
            },
            stations: [{ name: "Valea Cetatii", latlng: { latitude: 45.6306138, longitude: 25.601677 } }, { name: "Toamnei", latlng: { latitude: 45.6525496, longitude: 25.6156271 } }, { name: "Avantgarden", latlng: { latitude: 45.6653198, longitude: 25.556325 } }, { name: "Livada Postei", latlng: { latitude: 45.6455145, longitude: 25.588325 } }, { name: "Sanitas", latlng: { latitude: 45.6493336, longitude: 25.6004232 } }, { name: "Onix", latlng: { latitude: 45.653442, longitude: 25.6039917 } }, { name: "Biserica Bartolomeu", latlng: { latitude: 45.662822, longitude: 25.578067 } }, { name: "Ignis", latlng: { latitude: 45.649883, longitude: 25.559381 } }, { name: "Ec. Teodoroiu", latlng: { latitude: 45.665365, longitude: 25.584127 } }, { name: "Molnar Janos", latlng: { latitude: 45.665488, longitude: 25.568329 } }, { name: "N. Labis", latlng: { latitude: 45.6788823, longitude: 25.6142127 } }, { name: "Academia Henri Coanda", latlng: { latitude: 45.6622812, longitude: 25.5931823 } }, { name: "Triaj", latlng: { latitude: 45.67567710000001, longitude: 25.6473121 } }, { name: "Rasaritul", latlng: { latitude: 45.653393, longitude: 25.56628 } }, { name: "Tudor Vladimirescu", latlng: { latitude: 45.6648632, longitude: 25.594011 } }, { name: "Plevnei", latlng: { latitude: 45.660356, longitude: 25.59631 } }, { name: "Coresi", latlng: { latitude: 45.668853, longitude: 25.629482 } }, { name: "Vectra", latlng: { latitude: 45.663996, longitude: 25.570035 } }, { name: "Carierei", latlng: { latitude: 45.657975, longitude: 25.578446 } }, { name: "Rulmentul", latlng: { latitude: 45.682184, longitude: 25.614951 } }, { name: "Dramatic", latlng: { latitude: 45.6452745, longitude: 25.5982572 } }, { name: "Agricultorilor", latlng: { latitude: 45.666568, longitude: 25.572631 } }, { name: "Piata Tractorul", latlng: { latitude: 45.665968, longitude: 25.604892 } }, { name: "Bisericii Romane", latlng: { latitude: 45.651695, longitude: 25.586021 } }, { name: "Huniade", latlng: { latitude: 45.66656099999999, longitude: 25.5888589 } }, { name: "Vlahuta", latlng: { latitude: 45.6577152, longitude: 25.6221705 } }, { name: "Carierei*", latlng: { latitude: 45.65808819999999, longitude: 25.5806331 } }, { name: "Liceul Mesota", latlng: { latitude: 45.653912, longitude: 25.6092616 } }, { name: "Fragilor", latlng: { latitude: 45.63306799999999, longitude: 25.6055555 } }, { name: "Tractorul", latlng: { latitude: 45.664776, longitude: 25.608927 } }, { name: "Camera de Comert", latlng: { latitude: 45.65106189999999, longitude: 25.6082761 } }, { name: "Stadionul Tineretului", latlng: { latitude: 45.6650375, longitude: 25.5833561 } }, { name: "Faget", latlng: { latitude: 45.661027, longitude: 25.607768 } }, { name: "Sc. Gen. 25", latlng: { latitude: 45.6340976, longitude: 25.6059873 } }, { name: "Auchan Coresi", latlng: { latitude: 45.672937, longitude: 25.618411 } }, { name: "Berzei", latlng: { latitude: 45.6396394, longitude: 25.6271163 } }, { name: "Castanilor", latlng: { latitude: 45.6491821, longitude: 25.6041903 } }, { name: "Primarie", latlng: { latitude: 45.64653029999999, longitude: 25.5962607 } }, { name: "1 Decembrie 1918", latlng: { latitude: 45.6665682, longitude: 25.5985361 } }, { name: "RAT Brasov", latlng: { latitude: 45.669643, longitude: 25.6367903 } }, { name: "Lanurilor", latlng: { latitude: 45.662347, longitude: 25.5677821 } }, { name: "CEC", latlng: { latitude: 45.65460100000001, longitude: 25.615245 } }, { name: "Autogara 3", latlng: { latitude: 45.66339500000001, longitude: 25.6290601 } }, { name: "Universitate", latlng: { latitude: 45.655924, longitude: 25.600044 } }, { name: "Memorandului", latlng: { latitude: 45.6549662, longitude: 25.5830755 } }, { name: "Zlatna", latlng: { latitude: 45.66677199999999, longitude: 25.574782 } }, { name: "Egretei", latlng: { latitude: 45.6642338, longitude: 25.5653291 } }, { name: "Astra", latlng: { latitude: 45.6473333, longitude: 25.5893278 } }, { name: "Fartec", latlng: { latitude: 45.666141, longitude: 25.5890359 } }, { name: "Marasesti", latlng: { latitude: 45.6486217, longitude: 25.6053058 } }, { name: "Muncii", latlng: { latitude: 45.6399339, longitude: 25.6112605 } }, { name: "Sc. Gen. 20", latlng: { latitude: 45.637925, longitude: 25.609383 } }, { name: "Liceul Tractorul", latlng: { latitude: 45.6685813, longitude: 25.6101555 } }, { name: "Mircea cel Batran", latlng: { latitude: 45.65695849999999, longitude: 25.6063582 } }, { name: "Caprioara", latlng: { latitude: 45.6596481, longitude: 25.6148441 } }, { name: "F-ca de Var", latlng: { latitude: 45.6432609, longitude: 25.6242105 } }, { name: "13 Decembrie", latlng: { latitude: 45.6540204, longitude: 25.6053662 } }, { name: "Coresi 2", latlng: { latitude: 45.66986, longitude: 25.6218121 } }, { name: "Saturn", latlng: { latitude: 45.63454429999999, longitude: 25.63548 } }, { name: "Atelier", latlng: { latitude: 45.6552497, longitude: 25.5921554 } }, { name: "Dambul Morii", latlng: { latitude: 45.594584, longitude: 25.634977 } }, { name: "Hidro B", latlng: { latitude: 45.651378, longitude: 25.6140305 } }, { name: "Judetean", latlng: { latitude: 45.647288, longitude: 25.619313 } }, { name: "Spitalul Judetean", latlng: { latitude: 45.647288, longitude: 25.619313 } }, { name: "Facultativa**", latlng: { latitude: 45.6579755, longitude: 25.6011977 } }, { name: "Hidro A", latlng: { latitude: 45.651228, longitude: 25.6100075 } }, { name: "Facultativa", latlng: { latitude: 45.648398, longitude: 25.5307779 } }, { name: "Biserica Tractorul", latlng: { latitude: 45.664776, longitude: 25.608927 } }, { name: "Patria", latlng: { latitude: 45.6486217, longitude: 25.6053058 } }, { name: "Rapid", latlng: { latitude: 45.6596481, longitude: 25.6148441 } }, { name: "Carpatilor", latlng: { latitude: 45.64182, longitude: 25.614699 } }, { name: "Metabras", latlng: { latitude: 45.676453, longitude: 25.588306 } }, { name: "Bd. Garii", latlng: { latitude: 45.66081399999999, longitude: 25.613418 } }, { name: "Energo", latlng: { latitude: 45.653483, longitude: 25.653081 } }, { name: "IUS", latlng: { latitude: 45.6564607, longitude: 25.618341 } }, { name: "Piata Decebal", latlng: { latitude: 45.644048, longitude: 25.618207 } }, { name: "Statie Epurare", latlng: { latitude: 45.6808817, longitude: 25.5729574 } }, { name: "Gemenii", latlng: { latitude: 45.64944800000001, longitude: 25.628506 } }, { name: "Campus Genius", latlng: { latitude: 45.668525, longitude: 25.549028 } }, { name: "Facultativa*", latlng: { latitude: 45.648398, longitude: 25.5307779 } }, { name: "Artera Sud-Est", latlng: { latitude: 45.629532, longitude: 25.654986 } }, { name: "Carrefour", latlng: { latitude: 45.631603, longitude: 25.637197 } }, { name: "Cosmesti", latlng: { latitude: 45.666508, longitude: 25.579412 } }, { name: "Neptun", latlng: { latitude: 45.641753, longitude: 25.63532 } }, { name: "CET", latlng: { latitude: 45.6616232, longitude: 25.640872 } }, { name: "Varistei", latlng: { latitude: 45.629433, longitude: 25.568957 } }, { name: "Diversitas", latlng: { latitude: 45.657585, longitude: 25.643914 } }, { name: "Praktiker", latlng: { latitude: 45.630515, longitude: 25.63789 } }, { name: "Autogara 2", latlng: { latitude: 45.6635306, longitude: 25.5829344 } }, { name: "Gh. Doja", latlng: { latitude: 45.667685, longitude: 25.577942 } }, { name: "Cimitirul Central", latlng: { latitude: 45.672738, longitude: 25.5751891 } }, { name: "Oitelor", latlng: { latitude: 45.693119, longitude: 25.5630451 } }, { name: "IAR Ghimbav", latlng: { latitude: 45.6632991, longitude: 25.5072284 } }, { name: "Panait Cerna", latlng: { latitude: 45.650633, longitude: 25.626125 } }, { name: "Caramidariei", latlng: { latitude: 45.65838, longitude: 25.5633619 } }, { name: "Bronzului", latlng: { latitude: 45.66833800000001, longitude: 25.597115 } }, { name: "Benzinaria Petrom", latlng: { latitude: 45.6331875, longitude: 25.6345642 } }, { name: "Soarelui", latlng: { latitude: 45.6370165, longitude: 25.6314219 } }, { name: "Liceul Informatica", latlng: { latitude: 45.6433375, longitude: 25.6241861 } }, { name: "Pavilioanele CFR", latlng: { latitude: 45.65982, longitude: 25.6320799 } }, { name: "Turnului", latlng: { latitude: 45.6596481, longitude: 25.6148441 } }, { name: "Poienelor", latlng: { latitude: 45.6317691, longitude: 25.629517 } }, { name: "Infostar", latlng: { latitude: 45.6550093, longitude: 25.6125963 } }, { name: "Cernatului", latlng: { latitude: 45.64905599999999, longitude: 25.651757 } }, { name: "Complexul Mare", latlng: { latitude: 45.64384949999999, longitude: 25.6326646 } }, { name: "Facultativa Timis-Triaj", latlng: { latitude: 45.666898, longitude: 25.649428 } }, { name: "Morii", latlng: { latitude: 45.658028, longitude: 25.587384 } }, { name: "Brancoveanu", latlng: { latitude: 45.6391594, longitude: 25.5828331 } }, { name: "Coresi 1", latlng: { latitude: 45.668853, longitude: 25.629482 } }, { name: "Halta Timisul de Jos", latlng: { latitude: 45.584056, longitude: 25.623068 } }, { name: "Cineplex Coresi", latlng: { latitude: 45.6717918, longitude: 25.6135915 } }, { name: "Silnef", latlng: { latitude: 45.6632618, longitude: 25.5855801 } }, { name: "Roman", latlng: { latitude: 45.63283699999999, longitude: 25.6325129 } }, { name: "Spital Marzescu", latlng: { latitude: 45.647288, longitude: 25.619313 } }, { name: "Lujerului", latlng: { latitude: 45.71438999999999, longitude: 25.551206 } }, { name: "Branduselor", latlng: { latitude: 45.6536257, longitude: 25.624103 } }, { name: "Baumax", latlng: { latitude: 45.673229, longitude: 25.589765 } }, { name: "Stupini Izvorului", latlng: { latitude: 45.70230000000001, longitude: 25.555653 } }, { name: "Toamnei(CEC)", latlng: { latitude: 45.6525496, longitude: 25.6156271 } }, { name: "Brintex", latlng: { latitude: 45.657113, longitude: 25.559274 } }, { name: "Invatatorilor", latlng: { latitude: 45.627904, longitude: 25.56805 } }, { name: "Warte", latlng: { latitude: 45.6461033, longitude: 25.5770409 } }, { name: "Traian", latlng: { latitude: 45.6501234, longitude: 25.6232031 } }, { name: "Elmas", latlng: { latitude: 45.68752800000001, longitude: 25.582899 } }, { name: "Independentei", latlng: { latitude: 45.6664942, longitude: 25.5957604 } }, { name: "Dimitrie Anghel", latlng: { latitude: 45.669005, longitude: 25.576226 } }, { name: "Unitate Militara", latlng: { latitude: 45.67630700000001, longitude: 25.58041 } }, { name: "Hotel Trifan", latlng: { latitude: 45.670973, longitude: 25.590543 } }, { name: "Pantex", latlng: { latitude: 45.60705, longitude: 25.653741 } }, { name: "Stadionul Municipal", latlng: { latitude: 45.659872, longitude: 25.569987 } }, { name: "Podul Cretului", latlng: { latitude: 45.626344, longitude: 25.566441 } }, { name: "Metrom", latlng: { latitude: 45.634694, longitude: 25.624213 } }, { name: "Avicola Magurele", latlng: { latitude: 45.628325, longitude: 25.521197 } }, { name: "Fundatura Harmanului", latlng: { latitude: 45.6741993, longitude: 25.6469638 } }, { name: "Hornbach", latlng: { latitude: 45.660892, longitude: 25.550745 } }, { name: "Dacia", latlng: { latitude: 45.6580689, longitude: 25.612709 } }, { name: "Brintex*", latlng: { latitude: 45.657113, longitude: 25.559274 } }, { name: "Rozmarinului", latlng: { latitude: 45.61899, longitude: 25.637326 } }, { name: "Stupinii Noi", latlng: { latitude: 45.7204725, longitude: 25.5709102 } }, { name: "Tineretului (Cristian)", latlng: { latitude: 45.62853, longitude: 25.4815818 } }, { name: "Facultativa***", latlng: { latitude: 45.6579755, longitude: 25.6011977 } }, { name: "Posta", latlng: { latitude: 45.6679246, longitude: 25.5710748 } }, { name: "Plugarilor", latlng: { latitude: 45.6808817, longitude: 25.5729574 } }, { name: "Fagurului", latlng: { latitude: 45.70532499999999, longitude: 25.5720409 } }, { name: "Rial", latlng: { latitude: 45.65149599999999, longitude: 25.595527 } }, { name: "Spital Tractorul", latlng: { latitude: 45.66586299999999, longitude: 25.6087021 } }, { name: "Timis Triaj", latlng: { latitude: 45.666898, longitude: 25.649428 } }, { name: "Albinelor", latlng: { latitude: 45.687453, longitude: 25.5455521 } }, { name: "Depozite ILF", latlng: { latitude: 45.65838, longitude: 25.5633619 } }, { name: "Craiter", latlng: { latitude: 45.6569103, longitude: 25.6335229 } }, { name: "Junilor", latlng: { latitude: 45.629773, longitude: 25.57128 } }, { name: "Pompieri", latlng: { latitude: 45.637155, longitude: 25.622295 } }, { name: "Ioan Clopotel", latlng: { latitude: 45.652126, longitude: 25.542612 } }, { name: "Bellevue Residence", latlng: { latitude: 45.6452135, longitude: 25.580207 } }, { name: "Bariera Bartolomeu", latlng: { latitude: 45.664274, longitude: 25.577953 } }, { name: "Romradiatoare", latlng: { latitude: 45.64907710000001, longitude: 25.6445481 } }, { name: "Aurora", latlng: { latitude: 45.617662, longitude: 25.651754 } }, { name: "Biserica", latlng: { latitude: 45.664776, longitude: 25.608927 } }, { name: "Liceul CFR", latlng: { latitude: 45.672978, longitude: 25.645673 } }, { name: "Toamnei*", latlng: { latitude: 45.6525496, longitude: 25.6156271 } }, { name: "Camine IAR", latlng: { latitude: 45.671035, longitude: 25.5657785 } }, { name: "Vulturului", latlng: { latitude: 45.6392862, longitude: 25.619711 } }, { name: "Bartolomeu Gara", latlng: { latitude: 45.6626617, longitude: 25.5746001 } }, { name: "Parc Ind. Metrom", latlng: { latitude: 45.634453, longitude: 25.6227758 } }, { name: "Carfil", latlng: { latitude: 45.64918, longitude: 25.647395 } }, { name: "Cometei", latlng: { latitude: 45.63855, longitude: 25.636339 } }, { name: "Surlasului", latlng: { latitude: 45.693613, longitude: 25.5524181 } }, { name: "ICPC", latlng: { latitude: 45.673158, longitude: 25.542709 } }, { name: "Piata Unirii", latlng: { latitude: 45.636187, longitude: 25.57924 } }, { name: "Poligrafie", latlng: { latitude: 45.648931, longitude: 25.640641 } }, { name: "Iancu Jianu", latlng: { latitude: 45.660427, longitude: 25.600816 } }, { name: "Star", latlng: { latitude: 45.644806, longitude: 25.598713 } }, { name: "Facultativa II", latlng: { latitude: 45.648398, longitude: 25.5307779 } }, { name: "Biserica Neagra", latlng: { latitude: 45.64039140000001, longitude: 25.5856553 } }, { name: "Liceul Saguna", latlng: { latitude: 45.653912, longitude: 25.6092616 } }, { name: "Silver Mountain", latlng: { latitude: 45.604879, longitude: 25.54359 } }, { name: "Solomon", latlng: { latitude: 45.61752509999999, longitude: 25.5584693 } }, { name: "Complex Bartolomeu", latlng: { latitude: 45.6635849, longitude: 25.5788417 } }, { name: "Magurele", latlng: { latitude: 45.63612699999999, longitude: 25.523686 } }, { name: "Merilor", latlng: { latitude: 45.69047560000001, longitude: 25.5661913 } }, { name: "La Moara", latlng: { latitude: 45.6579755, longitude: 25.6011977 } }, { name: "Sala Sporturilor", latlng: { latitude: 45.6590457, longitude: 25.6208213 } }, { name: "Metro", latlng: { latitude: 45.622209, longitude: 25.646676 } }, { name: "Pensiunea Stupina", latlng: { latitude: 45.686708, longitude: 25.569921 } }, { name: "Sc. Gen. 4", latlng: { latitude: 45.63766100000001, longitude: 25.6128538 } }, { name: "Conforest", latlng: { latitude: 45.6713795, longitude: 25.5789735 } }, { name: "Int. Ceferistilor", latlng: { latitude: 45.656595, longitude: 25.631522 } }, { name: "Tocile", latlng: { latitude: 45.6331242, longitude: 25.5764562 } }, { name: "Scriitorilor", latlng: { latitude: 45.65050550000001, longitude: 25.6206523 } }, { name: "Tipografia Brastar", latlng: { latitude: 45.697849, longitude: 25.582073 } }, { name: "Selgros", latlng: { latitude: 45.6244026, longitude: 25.6448032 } }, { name: "Dedeman", latlng: { latitude: 45.67905, longitude: 25.586858 } }, { name: "Facultativa (MTI)", latlng: { latitude: 45.648398, longitude: 25.5307779 } }, { name: "Patinoarul Olimpic", latlng: { latitude: 45.6637484, longitude: 25.6123343 } }, { name: "Service", latlng: { latitude: 45.65961, longitude: 25.566741 } }, { name: "Strand Noua", latlng: { latitude: 45.6154539, longitude: 25.6405852 } }, { name: "Piata Auto", latlng: { latitude: 45.664, longitude: 25.555342 } }, { name: "Oligopol", latlng: { latitude: 45.68234899999999, longitude: 25.581729 } }, { name: "Panselelor", latlng: { latitude: 45.627529, longitude: 25.622478 } }, { name: "Fantanii", latlng: { latitude: 45.70814439999999, longitude: 25.5772471 } }, { name: "Baciului CL", latlng: { latitude: 45.715795, longitude: 25.5888961 } }, { name: "Noua", latlng: { latitude: 45.620183, longitude: 25.634 } }, { name: "Aleea Tiberiu Brediceanu", latlng: { latitude: 45.6389364, longitude: 25.5931848 } }, { name: "Poiana Darste", latlng: { latitude: 45.616414, longitude: 25.6453269 } }, { name: "Piata Agroalimentara", latlng: { latitude: 45.6656888, longitude: 25.604235 } }, { name: "Mondotrans", latlng: { latitude: 45.706104, longitude: 25.5803779 } }, { name: "Telecabina", latlng: { latitude: 45.6389364, longitude: 25.5931848 } }, { name: "Dulgherului", latlng: { latitude: 45.65695849999999, longitude: 25.6063582 } }, { name: "Mol", latlng: { latitude: 45.68437, longitude: 25.58274 } }, { name: "Eroilor", latlng: { latitude: 45.6455145, longitude: 25.588325 } }, { name: "Opera Brasov", latlng: { latitude: 45.6546111, longitude: 25.5898849 } }, { name: "Prunului", latlng: { latitude: 45.65695849999999, longitude: 25.6063582 } }, { name: "Agetaps", latlng: { latitude: 45.6887059, longitude: 25.5815942 } }, { name: "Balcescu", latlng: { latitude: 45.6416198, longitude: 25.5925603 } }, { name: "Str. Izvorului", latlng: { latitude: 45.70230000000001, longitude: 25.555653 } }, { name: "Fundaturii", latlng: { latitude: 45.685755, longitude: 25.541413 } }, { name: "Targ Auto", latlng: { latitude: 45.664, longitude: 25.555342 } }, { name: "Iveco", latlng: { latitude: 45.682978, longitude: 25.584294 } }, { name: "Poiana Mica", latlng: { latitude: 45.6080637, longitude: 25.5542074 } }, { name: "Feldioarei", latlng: { latitude: 45.708153, longitude: 25.579734 } }, { name: "Stupini Izvorului spre Lujerului", latlng: { latitude: 45.702366, longitude: 25.555766 } }, { name: "Stupini Centru", latlng: { latitude: 45.698023, longitude: 25.558432 } }, { name: "Ceferistilor", latlng: { latitude: 45.6604, longitude: 25.6259 } }, { name: "Gara Brasov", latlng: { latitude: 45.6596481, longitude: 25.6148441 } }, { name: "Papa Reale", latlng: { latitude: 45.665406, longitude: 25.643935 } }, { name: "Pod Barsa", latlng: { latitude: 45.682648, longitude: 25.553421 } }, { name: "Str. Baciului", latlng: { latitude: 45.715795, longitude: 25.5888961 } }, { name: "Scoala", latlng: { latitude: 45.63766100000001, longitude: 25.6128538 } }, { name: "Centru", latlng: { latitude: 45.6577152, longitude: 25.6221705 } }, { name: "Iuliu Maniu", latlng: { latitude: 45.6493336, longitude: 25.6004232 } }, { name: "Bartolomeu Nord", latlng: { latitude: 45.664274, longitude: 25.577953 } }, { name: "Izvorului spre Baciului", latlng: { latitude: 45.702103, longitude: 25.556061 } }, { name: "Fundaturii cl", latlng: { latitude: 45.683117, longitude: 25.543218 } }, { name: "Piata Sfatului", latlng: { latitude: 45.6473333, longitude: 25.5893278 } }, { name: "Facultate Constructii", latlng: { latitude: 45.6596481, longitude: 25.6148441 } }, { name: "Str. Fagurului", latlng: { latitude: 45.698023, longitude: 25.558432 } }, { name: "Roplant", latlng: { latitude: 45.660892, longitude: 25.55598 } }, { name: "Sc. Gen. 9", latlng: { latitude: 45.615313, longitude: 25.630739 } }, { name: "Case", latlng: { latitude: 45.6432609, longitude: 25.6242105 } }, { name: "Univ. Spiru Haret", latlng: { latitude: 45.664776, longitude: 25.608927 } }, { name: "Stad. Municipal", latlng: { latitude: 45.659872, longitude: 25.569987 } }, { name: "Poiana Brasov", latlng: { latitude: 45.59486, longitude: 25.553191 } }],
            error: null,
            tableStations: [],
            entries: ["MAMA", "DADSDASD", "DASDASDasd"],
            fetch: false
        }
    }

    componentDidMount() {
        let geoOptions = {
            // enableHighAccuracy: true, 
            // timeOut: 20000,
            // maximumAge: 60*60,
        };
        console.log(this.state.stations);

        this.setState({ ready: false, error: null });
      
        navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoErr, geoOptions)

      
    }

    geoSuccess = (position) => {
        
            this.setState({
                where: {
                    lng: position.coords.longitude,
                    lat: position.coords.latitude
                },
                myMarker: {
                    latlng: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                },
                ready: true

            })
            this._fetchStations();
        

    }
    geoErr = (err) => {
        this.setState({ error: err.message });
    }
    componentWillUnmount() {

    }
    markerClick(name) {
        alert(name);
    }
    _renderItem({ item, index }) {
        return (
            <View style={styles.slide}>
                <Text style={styles.titleSlide}>{item}</Text>
            </View>
        );
    }
  
    _fetchStations(){
        fetch('https://ratbv-scraper.herokuapp.com/getStations')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ stationsNames: myJson.data });
            })
            .then(() => {
                var tableStations = [];
                for (let i = 0; i < this.state.stationsNames.length; i++) {
                    tableStations.push(this.state.stationsNames[i])
                }
                this.setState({ tableStations, fetch: true });
            })
            .then(() => {

            })
    }
    _carouselStationView(){
      
        if(this.state.fetch === true){
            return(
                <View style={styles.carousel}>

                    <Carousel
                        onPress={() => { alert('da'); }}
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.tableStations}
                        renderItem={this._renderItem}
                        sliderWidth={dimensions.width}
                        itemWidth={dimensions.width / 1.3}

                        loop={true}

                    />
                </View>
            )
        }
    }
    render() {
        return (

            <View>


                {this.state.ready && (
                    <Text>
                        Geolocation in React Native
                        </Text>
                )}
                {this.state.error && (
                    <Text>
                        {this.state.error}
                    </Text>
                )}
                {this.state.ready && (
                    <MapView style={styles.map}
                        customMapStyle={mapStyle}
                        initialRegion={{
                            latitude: this.state.where.lat,
                            longitude: this.state.where.lng,
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.001,
                        }}
                    >
                        <Marker
                            coordinate={this.state.myMarker.latlng}
                            title={this.state.myMarker.title}
                            description={this.state.myMarker.description}
                            onPress={() => this.markerClick()}
                        >
                            <View style={styles.circle}>
                                <Text style={styles.pinText}>{this.state.myMarker.title}</Text>
                            </View>
                        </Marker>
                        {this.state.fetch && (this.state.stations.map(marker => (
                            <Marker coordinate={marker.latlng} onPress={() => this.markerClick(marker.name)} key={marker.name}></Marker>
                        )

                        ))}
                        
                       
                        </MapView>
                )}
                {this._carouselStationView()}
            </View>
        );
    }
}
const mapStyle = [
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#9d73fd"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#9d73fd"
            }
        ]
    }
]

const styles = StyleSheet.create({
    titleSlide: {
        fontWeight: '900',
        color: 'white',
        fontSize: 17,
    },
    container: {
        width: dimensions.width,
        height: dimensions.height,
        position: 'relative',
    },
    slide: {
        backgroundColor: '#3b37fe',
        height: 150,
        width: dimensions.width / 1.3,
        padding: 35,
        borderRadius: 20,
        color: 'white',
    },
    carousel: {
        position: 'absolute',
        top: dimensions.height / 1.6,
        // alignSelf:'flex-end'
    },
    circleS: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: '#9d73fd',
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'red',
    },
    pinText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 5,
        marginBottom: 10,
    },
    textTitleSave: {
        alignSelf: 'center',
        fontSize: 24,
        color: '#9d73fd',
        fontWeight: '900',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: dimensions.width,
        height: dimensions.height,
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