import React from 'react';
import {
    StyleSheet, Dimensions, LogBox, Image, Platform, Switch, Keyboard, Alert, BackHandler, TextInput, FlatList, ActivityIndicator, RefreshControl,
    SafeAreaView, PermissionsAndroid, ImageBackground, StatusBar, ScrollView, TouchableOpacity, Text, View, Button
} from 'react-native'

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase("practical.db", "1.0", "raj", 200000);

import { StoreToDb, GetUsers } from '../Utility/Db'
import { SetUserObj, GetUpdatetriger, SetUpdatetriger } from '../Utility/Utils'

export default class UserList extends React.Component {

    constructor() {
        super();
        this.state = {
            Searched: "",

            isLoading: false,

            refreshing: false,

            uniqueValue: 1,

            Users_ArrayList: [],
        }
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        StoreToDb();
        this.Get_users();

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        BackHandler.exitApp()
        return true;
    }

    Get_users = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM users ORDER BY id',
                [],
                (tx, results) => {

                    let arra = [];
                    for (let index = 0; index < results.rows.length; index++) {
                        const element = results.rows.item(index);
                        arra.push(element);
                    }

                    this.setState({ Users_ArrayList: arra });

                    this.setState(({ uniqueValue }) => ({
                        uniqueValue: uniqueValue + 1
                    }))

                }
            );
        });
    }

    Delete_user = (id) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM users WHERE id = ?',
                [id],
                (tx, results) => {
                    this.Get_users();
                }
            );
        });
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

                <View style={{ height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(237,38,76,1)", }}>
                    <Text style={{ color: "rgba(255,255,255,1)", letterSpacing: 1.5, fontSize: 19 }}>Users</Text>

                    <TouchableOpacity onPress={() => { this.props.navigation.push('CreateUser') }} activeOpacity={1} style={{ width: 40, height: 40, position: 'absolute', right: 6, justifyContent: 'center', alignItems: 'center' }}>
                        <EntypoIcon name="plus" style={{ fontSize: 25, color: 'rgba(255,255,255,1)', }} />
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 1, paddingTop: 10, backgroundColor: "rgba(241,240,240,1)", }}>

                    <FlatList
                        key={this.state.uniqueValue}
                        showsVerticalScrollIndicator={false}
                        data={this.state.Users_ArrayList}
                        renderItem={
                            ({ item }) =>

                                <View style={{ flex: 1, }}>

                                    <View style={{ width: screenWidth - 40, backgroundColor: "rgba(241,240,240,1)", marginBottom: 6, marginTop: 10, height: 170, alignSelf: 'center', borderRadius: 6, shadowColor: "rgba(245,177,189,1)", shadowOffset: { height: 6, width: 0 }, elevation: 16, shadowOpacity: 0.44, shadowRadius: 10.32, }}>

                                        <View style={{ overflow: 'hidden', width: screenWidth - 40, height: 170, borderRadius: 6, }}>

                                            <View style={{ flexDirection: 'row', marginLeft: 16, marginTop: 18 }}>

                                                <MaterialIconsIcon name="person" style={{ color: "rgba(196,188,188,1)", fontSize: 25 }} />
                                                <Text style={{ marginLeft: 10, letterSpacing: 1, color: "rgba(0,0,0,1)", fontSize: 17, marginTop: 2 }}>{item.name}</Text>

                                            </View>

                                            <View style={{ flexDirection: 'row', marginLeft: 16, marginTop: 10 }}>

                                                <MaterialIconsIcon name="person" style={{ color: "rgba(196,188,188,1)", fontSize: 25 }} />
                                                <Text style={{ marginLeft: 10, letterSpacing: 1, color: "rgba(115,112,112,1)", fontSize: 16, marginTop: 3 }}>{item.username}</Text>

                                            </View>

                                            <View style={{ flexDirection: 'row', marginLeft: 16, marginTop: 10 }}>

                                                <MaterialIconsIcon name="location-city" style={{ color: "rgba(196,188,188,1)", fontSize: 25 }} />
                                                <Text style={{ marginLeft: 10, letterSpacing: 1, color: "rgba(115,112,112,1)", fontSize: 16, marginTop: 3 }}>{item.company}</Text>

                                            </View>

                                            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: "rgba(237,38,76,1)", height: 45, alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                                                <View style={{ flexDirection: 'row', marginLeft: 23, }}>

                                                    <FontAwesomeIcon name="phone" style={{ color: "rgba(255,255,255,1)", fontSize: 20 }} />
                                                    <Text style={{ marginLeft: 10, letterSpacing: 1, color: "rgba(255,255,255,1)", fontSize: 16, marginTop: -2 }}>{item.phone}</Text>

                                                </View>

                                                <View style={{ flexDirection: 'row', }}>

                                                    <TouchableOpacity activeOpacity={1} onPress={() => { SetUserObj(item), this.props.navigation.push('UserInfo') }} style={{ height: 45, width: 45, marginRight: 6, justifyContent: 'center', alignItems: 'center' }}>
                                                        <EntypoIcon name="info" style={{ color: "rgba(255,255,255,1)", fontSize: 22, }}></EntypoIcon>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity activeOpacity={1} onPress={() => { SetUserObj(item), this.props.navigation.push('UserEdit') }} style={{ height: 45, width: 45, marginRight: 6, justifyContent: 'center', alignItems: 'center' }}>
                                                        <EntypoIcon name="edit" style={{ color: "rgba(255,255,255,1)", fontSize: 19, }}></EntypoIcon>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity activeOpacity={1} onPress={() => { this.Delete_user(item.id) }} style={{ height: 45, width: 45, marginRight: 8, justifyContent: 'center', alignItems: 'center' }}>
                                                        <MaterialCommunityIconsIcon
                                                            name="delete-empty"
                                                            style={{ color: "rgba(255,255,255,1)", fontSize: 25, }}
                                                        ></MaterialCommunityIconsIcon>
                                                    </TouchableOpacity>

                                                </View>
                                            </View>

                                        </View>

                                    </View>

                                </View>
                        }
                        keyExtractor={({ id }, index) => id}
                    />


                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});