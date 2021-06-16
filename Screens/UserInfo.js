import React from 'react';
import {
    StyleSheet, Dimensions, LogBox, Image, Platform, Switch, Keyboard, Alert, BackHandler, TextInput, FlatList, ActivityIndicator, RefreshControl,
    SafeAreaView, PermissionsAndroid, ImageBackground, StatusBar, ScrollView, TouchableOpacity, Text, View, Button
} from 'react-native'

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

import { GetUserObj } from '../Utility/Utils'

export default class UserInfo extends React.Component {

    constructor() {
        super();
        this.state = {
            Searched: "",

            isLoading: false,

            refreshing: false,

            uniqueValue: 1,

            User_Object: {},
        }
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        this.setState({ User_Object: GetUserObj() });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        this.props.navigation.goBack();
        return true;
    }

    render() {
        LogBox.ignoreAllLogs(true);

        return (
            <View style={styles.container}>
                <View style={{ height: Platform.OS == 'android' ? 0 : STATUSBAR_HEIGHT, backgroundColor: "rgba(237,38,76,1)", }}>
                    <SafeAreaView >
                        <StatusBar hidden={false} barStyle='light-content' backgroundColor="rgba(237,38,76,1)" animated={true} />
                    </SafeAreaView>
                </View>

                <View style={{ height: 40, width: screenWidth, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(237,38,76,1)", }}>

                    <TouchableOpacity activeOpacity={1} onPress={() => { this.props.navigation.goBack(); }} style={{ height: 40, width: 40, justifyContent: 'center', position: 'absolute', left: 5, zIndex: 9999, alignItems: 'center' }}>
                        <Icon name="md-arrow-back" style={{ color: "rgba(255,255,255,1)", fontSize: 25 }}></Icon>
                    </TouchableOpacity>

                    <Text style={{ color: "rgba(255,255,255,1)", letterSpacing: 1.5, fontSize: 19 }}>User Info</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={{ height: (screenHeight - 40) < 680 ? 680 : (screenHeight - 720) }}>

                    <View style={{ flex: 1, paddingTop: 10, backgroundColor: "rgba(237,38,76,1)", }}>

                        <View style={{ height: 210, backgroundColor: '' }}>

                            <View style={{ height: 80, width: 80, alignSelf: 'center', overflow: 'hidden', marginTop: 20, borderRadius: 40, borderWidth: 2, borderColor: 'rgba(255,255,255,1)', backgroundColor: 'rgba(241,240,240,1)' }}>

                                <Icon name="md-person" style={{ color: "rgba(229,208,208,1)", fontSize: 77, marginTop: 2, }}></Icon>

                            </View>

                            <Text style={{ color: "rgba(255,255,255,1)", alignSelf: 'center', letterSpacing: 2, fontSize: 17, fontWeight: 'bold', marginTop: 22 }}>{this.state.User_Object.name}</Text>

                            <Text style={{ color: "rgba(218,255,255,1)", alignSelf: 'center', letterSpacing: 1, fontSize: 15.5, marginTop: 10 }}>{this.state.User_Object.email}</Text>

                        </View>

                        <View style={{ width: screenWidth, height: 470, marginTop: (screenHeight - 40) < 680 ? 0 : (screenHeight - 720), alignItems: 'center', backgroundColor: 'rgba(241,240,240,1)', borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>

                            <View style={{ width: screenWidth - 50, backgroundColor: "rgba(241,240,240,1)", height: 85, justifyContent: 'center', marginTop: 50, shadowColor: "rgba(245,177,189,1)", shadowOffset: { height: 6, width: 0 }, elevation: 12, shadowOpacity: 0.37, shadowRadius: 7.49, borderRadius: 10, }}>

                                <Text style={{ color: "rgba(0,0,0,1)", fontSize: 16, letterSpacing: 1, marginTop: 5, marginLeft: 28 }}>User Name</Text>
                                <Text style={{ color: "rgba(179,178,178,1)", letterSpacing: 1, fontSize: 15, marginTop: 6, marginLeft: 28 }}>{this.state.User_Object.username}</Text>

                            </View>

                            <View style={{ width: screenWidth - 50, backgroundColor: "rgba(241,240,240,1)", height: 85, justifyContent: 'center', marginTop: 20, shadowColor: "rgba(245,177,189,1)", shadowOffset: { height: 6, width: 0 }, elevation: 12, shadowOpacity: 0.37, shadowRadius: 7.49, borderRadius: 10, }}>

                                <Text style={{ color: "rgba(0,0,0,1)", fontSize: 16, letterSpacing: 1, marginTop: 5, marginLeft: 28 }}>Phone</Text>
                                <Text style={{ color: "rgba(179,178,178,1)", letterSpacing: 1, fontSize: 15, marginTop: 6, marginLeft: 28 }}>{this.state.User_Object.phone}</Text>

                            </View>

                            <View style={{ width: screenWidth - 50, backgroundColor: "rgba(241,240,240,1)", height: 85, justifyContent: 'center', marginTop: 20, shadowColor: "rgba(245,177,189,1)", shadowOffset: { height: 6, width: 0 }, elevation: 12, shadowOpacity: 0.37, shadowRadius: 7.49, borderRadius: 10, }}>

                                <Text style={{ color: "rgba(0,0,0,1)", fontSize: 16, letterSpacing: 1, marginTop: 5, marginLeft: 28 }}>Web-site</Text>
                                <Text style={{ color: "rgba(179,178,178,1)", letterSpacing: 1, fontSize: 15, marginTop: 6, marginLeft: 28 }}>{this.state.User_Object.website}</Text>

                            </View>

                            <View style={{ width: screenWidth - 50, backgroundColor: "rgba(241,240,240,1)", height: 85, justifyContent: 'center', marginTop: 20, shadowColor: "rgba(245,177,189,1)", shadowOffset: { height: 6, width: 0 }, elevation: 12, shadowOpacity: 0.37, shadowRadius: 7.49, borderRadius: 10, marginBottom: 20 }}>

                                <Text style={{ color: "rgba(0,0,0,1)", fontSize: 16, letterSpacing: 1, marginTop: 5, marginLeft: 28 }}>Company Name</Text>
                                <Text style={{ color: "rgba(179,178,178,1)", letterSpacing: 1, fontSize: 15, marginTop: 6, marginLeft: 28 }}>{this.state.User_Object.company}</Text>

                            </View>

                        </View>

                    </View>

                </ScrollView>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(237,38,76,1)',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});