

import React from 'react';
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

import { Component } from 'react'

export default class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state={userName:"" ,
  
    userContact:"" ,
  
    userAddress:"" ,
    userName:"" ,

  }
     this.db = openDatabase({name: 'UserDatabase.db'});

  //  this.Intialize();
  }



  // let [userName, setUserName] = useState('');
  // let [userContact, setUserContact] = useState('');
  // let [userAddress, setUserAddress] = useState('');


 RegisterUser = () => {
  
const {userName, userContact, userAddress} = this.state;
const props = this.props;
console.log(userName, userContact, userAddress);

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

    this.db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
        [userName, userContact, userAddress],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => props?.navigation?.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
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
                placeholder="Enter Name"
                onChangeText={(userN) => this.setState({userName:userN})}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Contact No"
                onChangeText={(userc) => this.setState({userContact:userc})}
                maxLength={10}
                keyboardType="numeric"
                style={{padding: 10}}
              /> 
              <Mytextinput
                placeholder="Enter Address"
                onChangeText={(usera) => this.setState({userAddress:usera})}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              <Mybutton title="Submit" customClick={this.RegisterUser} />
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
  );
}}


