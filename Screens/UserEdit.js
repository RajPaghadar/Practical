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

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase("practical.db", "1.0", "raj", 200000);

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

import { GetUserObj } from '../Utility/Utils'

export default class UserEdit extends React.Component {

    constructor() {
        super();
        this.state = {
            User_Object: {},

            Name: "",
            UserName: "",
            Email: "",
            Phone: "",
            Website: "",
            Company: "",

            error_name: "",
            error_username: "",
            error_email: "",
            error_phone: "",
            error_website: "",
            error_company: ""

        }
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        this.setState({ Name: GetUserObj().name })
        this.setState({ UserName: GetUserObj().username })
        this.setState({ Email: GetUserObj().email })
        this.setState({ Phone: GetUserObj().phone })
        this.setState({ Website: GetUserObj().website })
        this.setState({ Company: GetUserObj().company })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        this.props.navigation.goBack();
        return true;
    }

    Update_user = () => {

        const email_reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        var web_regex = new RegExp(expression);

        this.setState({ error_name: "" });
        this.setState({ error_username: "" });
        this.setState({ error_email: "" });
        this.setState({ error_phone: "" });
        this.setState({ error_website: "" });
        this.setState({ error_company: "" });

        if (this.state.Name.trim() == "") {
            this.setState({ error_name: "Enter name" });
        }
        else if (this.state.UserName.trim() == "") {
            this.setState({ error_username: "Enter username" });
        }
        else if (this.state.Email.trim() == "") {
            this.setState({ error_email: "Enter email" });
        }
        else if (!email_reg.test(this.state.Email)) {
            this.setState({ error_email: "Enter valid email" });
        }
        else if (this.state.Phone.trim() == "") {
            this.setState({ error_phone: "Enter phone" });
        }
        else if (this.state.Website.trim() == "") {
            this.setState({ error_website: "Enter website" });
        }
        else if (!web_regex.test(this.state.Website)) {
            this.setState({ error_website: "Enter valid website" });
        }
        else if (this.state.Company.trim() == "") {
            this.setState({ error_company: "Enter company" });
        }
        else {

            db.transaction((tx) => {
                tx.executeSql(
                    'UPDATE users SET name = ?, username = ?, email = ?, phone = ?, website = ?, company = ?  WHERE id = ?',
                    [this.state.Name, this.state.UserName, this.state.Email, this.state.Phone, this.state.Website, this.state.Company, GetUserObj().id],
                    (tx, results) => {
                        this.props.navigation.push('UserList');
                    }
                );
            });

        }

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

                    <Text style={{ color: "rgba(255,255,255,1)", letterSpacing: 1.5, fontSize: 19 }}>Edit User</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: "rgba(241,240,240,1)", }}>

                        <View style={{ width: screenWidth - 50, backgroundColor: "rgba(241,240,240,1)", justifyContent: 'center', marginTop: 20, shadowColor: "rgba(245,177,189,1)", shadowOffset: { height: 6, width: 0 }, elevation: 12, shadowOpacity: 0.37, shadowRadius: 7.49, borderRadius: 10, borderWidth: this.state.error_name == "" ? 0 : 1, borderColor: 'red' }}>

                            <Text style={{ color: "rgba(0,0,0,1)", fontSize: 17, letterSpacing: 1, marginTop: 18, marginLeft: 24 }}>Name</Text>

                            <TextInput style={{ color: "rgba(115,112,112,1)", height: 45, marginBottom: 5, letterSpacing: 1, fontSize: 16, marginLeft: 22, marginRight: 20 }}
                                underlineColorAndroid='transparent'
                                selectionColor="rgba(237,38,76,1)"
                                value={this.state.Name}
                                onChangeText={(text) => {
                                    this.setState({ Name: text })
                                }}
                            />

                        </View>

                        {
                            this.state.error_name == "" ? null :
                                <Text style={{ fontSize: 14, color: 'red', alignSelf: 'flex-end', marginRight: 30, marginTop: 6, }}>{this.state.error_name}</Text>
                        }

                        <View style={{ width: screenWidth - 50, backgroundColor: "rgba(241,240,240,1)", justifyContent: 'center', marginTop: 20, shadowColor: "rgba(245,177,189,1)", shadowOffset: { height: 6, width: 0 }, elevation: 12, shadowOpacity: 0.37, shadowRadius: 7.49, borderRadius: 10, borderWidth: this.state.error_username == "" ? 0 : 1, borderColor: 'red' }}>

                            <Text style={{ color: "rgba(0,0,0,1)", fontSize: 17, letterSpacing: 1, marginTop: 18, marginLeft: 24 }}>User Name</Text>

                            <TextInput style={{ color: "rgba(115,112,112,1)", height: 45, marginBottom: 5, letterSpacing: 1, fontSize: 16, marginLeft: 22, marginRight: 20 }}
                                underlineColorAndroid='transparent'
                                selectionColor="rgba(237,38,76,1)"
                                value={this.state.UserName}
                                onChangeText={(text) => {
                                    let value = "";
                                    value = text.replace(/[^a-zA-Z0-9]/g, "")
                                    this.setState({ UserName: value })
                                }}
                            />

                        </View>

                        {
                            this.state.error_username == "" ? null :
                                <Text style={{ fontSize: 14, color: 'red', alignSelf: 'flex-end', marginRight: 30, marginTop: 6, }}>{this.state.error_username}</Text>
                        }

                        <View style={{ width: screenWidth - 50, backgroundColor: "rgba(241,240,240,1)", justifyContent: 'center', marginTop: 20, shadowColor: "rgba(245,177,189,1)", shadowOffset: { height: 6, width: 0 }, elevation: 12, shadowOpacity: 0.37, shadowRadius: 7.49, borderRadius: 10, borderWidth: this.state.error_email == "" ? 0 : 1, borderColor: 'red' }}>

                            <Text style={{ color: "rgba(0,0,0,1)", fontSize: 17, letterSpacing: 1, marginTop: 18, marginLeft: 24 }}>Email</Text>

                            <TextInput style={{ color: "rgba(115,112,112,1)", height: 45, marginBottom: 5, letterSpacing: 1, fontSize: 16, marginLeft: 22, marginRight: 20 }}
                                selectionColor="rgba(237,38,76,1)"
                                underlineColorAndroid='transparent'
                                value={this.state.Email}
                                onChangeText={(text) => {
                                    this.setState({ Email: text })
                                }}
                            />

                        </View>

                        {
                            this.state.error_email == "" ? null :
                                <Text style={{ fontSize: 14, color: 'red', alignSelf: 'flex-end', marginRight: 30, marginTop: 6, }}>{this.state.error_email}</Text>
                        }

                        <View style={{ width: screenWidth - 50, backgroundColor: "rgba(241,240,240,1)", justifyContent: 'center', marginTop: 20, shadowColor: "rgba(245,177,189,1)", shadowOffset: { height: 6, width: 0 }, elevation: 12, shadowOpacity: 0.37, shadowRadius: 7.49, borderRadius: 10, borderWidth: this.state.error_phone == "" ? 0 : 1, borderColor: 'red' }}>

                            <Text style={{ color: "rgba(0,0,0,1)", fontSize: 17, letterSpacing: 1, marginTop: 18, marginLeft: 24 }}>Phone</Text>

                            <TextInput style={{ color: "rgba(115,112,112,1)", height: 45, marginBottom: 5, letterSpacing: 1, fontSize: 16, marginLeft: 22, marginRight: 20 }}
                                selectionColor="rgba(237,38,76,1)"
                                underlineColorAndroid='transparent'
                                maxLength={10}
                                value={this.state.Phone}
                                onChangeText={(text) => {
                                    let value = "";
                                    value = text.replace(/[^\d]/g, "")
                                    this.setState({ Phone: value })
                                }}
                            />

                        </View>

                        {
                            this.state.error_phone == "" ? null :
                                <Text style={{ fontSize: 14, color: 'red', alignSelf: 'flex-end', marginRight: 30, marginTop: 6, }}>{this.state.error_phone}</Text>
                        }

                        <View style={{ width: screenWidth - 50, backgroundColor: "rgba(241,240,240,1)", justifyContent: 'center', marginTop: 20, shadowColor: "rgba(245,177,189,1)", shadowOffset: { height: 6, width: 0 }, elevation: 12, shadowOpacity: 0.37, shadowRadius: 7.49, borderRadius: 10, borderWidth: this.state.error_website == "" ? 0 : 1, borderColor: 'red' }}>

                            <Text style={{ color: "rgba(0,0,0,1)", fontSize: 17, letterSpacing: 1, marginTop: 18, marginLeft: 24 }}>Web-site</Text>

                            <TextInput style={{ color: "rgba(115,112,112,1)", height: 45, marginBottom: 5, letterSpacing: 1, fontSize: 16, marginLeft: 22, marginRight: 20 }}
                                selectionColor="rgba(237,38,76,1)"
                                underlineColorAndroid='transparent'
                                value={this.state.Website}
                                onChangeText={(text) => {
                                    this.setState({ Website: text })
                                }}
                            />

                        </View>

                        {
                            this.state.error_website == "" ? null :
                                <Text style={{ fontSize: 14, color: 'red', alignSelf: 'flex-end', marginRight: 30, marginTop: 6, }}>{this.state.error_website}</Text>
                        }

                        <View style={{ width: screenWidth - 50, backgroundColor: "rgba(241,240,240,1)", justifyContent: 'center', marginTop: 20, shadowColor: "rgba(245,177,189,1)", shadowOffset: { height: 6, width: 0 }, elevation: 12, shadowOpacity: 0.37, shadowRadius: 7.49, borderRadius: 10, borderWidth: this.state.error_company == "" ? 0 : 1, borderColor: 'red' }}>

                            <Text style={{ color: "rgba(0,0,0,1)", fontSize: 17, letterSpacing: 1, marginTop: 18, marginLeft: 24 }}>Company Name</Text>

                            <TextInput style={{ color: "rgba(115,112,112,1)", height: 45, marginBottom: 5, letterSpacing: 1, fontSize: 16, marginLeft: 22, marginRight: 20 }}
                                selectionColor="rgba(237,38,76,1)"
                                underlineColorAndroid='transparent'
                                value={this.state.Company}
                                onChangeText={(text) => {
                                    this.setState({ Company: text })
                                }}
                            />

                        </View>

                        {
                            this.state.error_company == "" ? null :
                                <Text style={{ fontSize: 14, color: 'red', alignSelf: 'flex-end', marginRight: 30, marginTop: 6, }}>{this.state.error_company}</Text>
                        }

                        <TouchableOpacity activeOpacity={1} onPress={() => { this.Update_user() }} style={{ width: screenWidth - 50, height: 50, marginBottom: 20, justifyContent: 'center', alignItems: 'center', marginTop: 35, shadowColor: "rgba(237,198,206,1)", backgroundColor: 'rgba(237,38,76,1)', shadowOffset: { height: 6, width: 0 }, elevation: 12, shadowOpacity: 0.37, shadowRadius: 7.49, borderRadius: 10, }}>

                            <Text style={{ color: "rgba(255,255,255,1)", fontSize: 17, letterSpacing: 2, }}>UPDATE USER</Text>

                        </TouchableOpacity>

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