


import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';

import React, { Component } from 'react'

export default class UpdateUser extends Component {


  constructor(props) {
    super(props);
     this.db = openDatabase({name: 'UserDatabase.db'});

     this.state={userName:"" ,
  
     userContact:"" ,
   
     userAddress:"" ,
     userName:"" ,
     userName:"" ,
     inputUserId:"",
 
   }}
  


  
    updateAllStates = (name, contact, address) => {
      setUserName(name);
      setUserContact(contact);
      setUserAddress(address);
    };
  
     searchUser = () => {
      console.log(inputUserId);
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM table_user where user_id = ?',
          [inputUserId],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              let res = results.rows.item(0);
              updateAllStates(res.user_name, res.user_contact, res.user_address);
            } else {
              alert('No user found');
              updateAllStates('', '', '');
            }
          },
        );
      });
    };
     updateUser = () => {
      console.log(inputUserId, userName, userContact, userAddress);
  
      if (!inputUserId) {
        alert('Please fill User id');
        return;
      }
      if (!userName) {
        alert('Please fill name');
        return;
      }
      if (!userContact) {
        alert('Please fill Contact Number');
        return;
      }
      if (!userAddress) {
        alert('Please fill Address');
        return;
      }
  
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?',
          [userName, userContact, userAddress, inputUserId],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'User updated successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('HomeScreen'),
                  },
                ],
                {cancelable: false},
              );
            } else alert('Updation Failed');
          },
        );
      });
    };
  
  
  

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{flex: 1}}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <KeyboardAvoidingView
                behavior="padding"
                style={{flex: 1, justifyContent: 'space-between'}}>
                <Mytextinput
                  placeholder="Enter User Id"
                  style={{padding: 10}}
                  onChangeText={(inputId) => this.setState({inputUserId:inputId})}
                />
                <Mybutton title="Search User" customClick={this.searchUser} />
                <Mytextinput
                  placeholder="Enter Name"
                  value={this.userName}
                  style={{padding: 10}}
                  onChangeText={(userN) => this.setState({userName:userN})}
                />
                <Mytextinput
                  placeholder="Enter Contact No"
                  value={'' + this.userContact}
                  onChangeText={(userc) => this.setState({userContact:userc})}
                  maxLength={10}
                  style={{padding: 10}}
                  keyboardType="numeric"
                />
                <Mytextinput
                  value={this.userAddress}
                  placeholder="Enter Address"
                  onChangeText={(usera) => this.setState({userAddress:usera})}
                  maxLength={225}
                  numberOfLines={5}
                  multiline={true}
                  style={{textAlignVertical: 'top', padding: 10}}
                />
                <Mybutton title="Update User" customClick={this.updateUser} />
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
          <Text style={{fontSize: 18, textAlign: 'center', color: 'grey'}}>
            Example of SQLite Database in React Native
          </Text>
          <Text style={{fontSize: 16, textAlign: 'center', color: 'grey'}}>
            www.aboutreact.com
          </Text>
        </View>
      </SafeAreaView>
    )
  }}
;










