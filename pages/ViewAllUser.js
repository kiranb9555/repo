


import { FlatList, Text, View, SafeAreaView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import React, { Component } from 'react'

export default class ViewAllUser extends Component {

constructor(props) {
    super(props);
    this.db = openDatabase({ name: 'UserDatabase.db' });

    this.state={
  
   
      flatListItems:[] ,
  }}



 

    componentDidMount=() => {
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        });
      });
    };

    listViewItemSeparator = () => {
      return (
        <View
          style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }}
        />
      );
    };
    listItemView = (item) => {
      return (
        <View
          key={item.user_id}
          style={{ backgroundColor: 'white', padding: 20 }}>
          <Text>Id: {item.user_id}</Text>
          <Text>Name: {item.user_name}</Text>
          <Text>Contact: {item.user_contact}</Text>
          <Text>Address: {item.user_address}</Text>
        </View>
      );
    };

    render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={flatListItems}
              ItemSeparatorComponent={listViewItemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => listItemView(item)}
            />
          </View>
          <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
            Example of SQLite Database in React Native
          </Text>
          <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
            www.aboutreact.com
          </Text>
        </View>
      </SafeAreaView>
    );
  }

};