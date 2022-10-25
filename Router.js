//task1
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import React from 'react'
// import Details from './src/screens/Details';

// const Router = (props) => {
//     const Stack = createNativeStackNavigator();

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName='Details'>
//         <Stack.Screen name="Details" component={Details} options={{title:'details',headerShown:false}}/>

//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// export default Router

import a from './style';
import {View, Button, TextInput} from 'react-native';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';

import React, {Component} from 'react';

export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchedData: [],
      refreshing: true,
      presslist: true,
      searchText: ''
    };
  }
  componentDidMount() {
    this.fetchCats();
  }
  fetchCats() {
    this.setState({refreshing: true});
    fetch('https://gorest.co.in/public/v2/users')
      .then(res => res.json())
      .then(resJson => {
        console.log('flag',resJson);
        this.setState({data: resJson, searchedData: resJson});
        this.setState({refreshing: false});
      })
      .catch(e => console.log(e));
  }
  renderItemComponentList = ({item}) => {
    return (
      <View style={a.flatlist_List_view1sty}>
        <Text style={a.flatlist_text1sty}>{item.name}</Text>
        <View style={a.flatlist_view2sty}>
          <Text style={a.flatlist_text2sty}>{item.email}</Text>
          <Text style={a.flatlist_text3sty}>{item.gender}</Text>
        </View>
        <View style={a.flatlist_view3sty}>
          <Text style={a.flatlist_text4sty}>{item.status}</Text>
        </View>

        <Text style={a.flatlist_text5sty}>{item.id}</Text>
      </View>
    );
  };

  renderItemComponentGrid = ({item}) => {
    return (
      <View style={a.flatlist_view1sty}>
        <Text style={a.flatlist_text1sty}>{item.name}</Text>
        <View style={a.flatlist_view2sty}>
          <Text style={a.flatlist_text2sty}>{item.email}</Text>
          <Text style={a.flatlist_text3sty}>{item.gender}</Text>
        </View>
        <View style={a.flatlist_view3sty}>
          <Text style={a.flatlist_text4sty}>{item.status}</Text>
        </View>

        <Text style={a.flatlist_text5sty}>{item.id}</Text>
      </View>
    );
  };

  // detailslistview() {
  //   return (
  //     <SafeAreaView>
  //       <FlatList
  //         numColumns={!presslist ? 2: null}
  //         data={this.state.data}
  //         renderItem={item => this.renderItemComponent(item)}
  //         keyExtractor={item => item.id.toString()}
  //         refreshing={this.state.refreshing}
  //         onRefresh={this.handleRefresh}
  //       />
  //     </SafeAreaView>
  //   );
  // }

  searchData = ({nativeEvent: {text}}) => {
    console.log('text',text);
    let filteredData = this.state.data?.filter(item => item?.name.toLowerCase()?.includes(text?.toLowerCase()));
    this.setState({
      searchedData: filteredData
    })
  }

  Detailslistgridview = () => {
    return (
 
        <FlatList
          key={'list'}
          numColumns={2}
          data={this.state.searchedData}
          renderItem={item => this.renderItemComponentGrid(item)}
          keyExtractor={item => item.id.toString()}
          refreshing={this.state.refreshing}
          // onRefresh={this.handleRefresh}
        />
     
    );
  };

  Detailslistsview = () => {
    console.log('Detailslistsview')
    return (
      
        <FlatList
          key={'gridList'}
          data={this.state.searchedData}
          renderItem={item => this.renderItemComponentList(item)}
          keyExtractor={item => item.id.toString()}
          refreshing={this.state.refreshing}
          // onRefresh={this.handleRefresh}
        />
      
    );
  };

  render() {
    console.log('presslist', this.state.data);
    return (
      <View style={a.viewwsty}>
        <View style={{width:'100%', height: 70, padding: 10}}>
          <TextInput
            placeholder='Search data...'
            value={this.state.searchText}
            onChangeText={text => this.setState({ searchText: text })}
            style={{ borderWidth: 1, borderColor: 'black', paddingLeft: 10 }} 
            onSubmitEditing={(t) => this.searchData(t)}
            />
        </View>
        <View style={a.viewsty}>

          <TouchableOpacity style={a.to1}>
            
            <Button
              style={a.button1sty}
              title="detailslistview"
              onPress={()=>  this.setState({presslist: true})}
            />
          </TouchableOpacity>
          <TouchableOpacity style={a.to2}>
            <Button
              style={a.button2sty}
              title="detailsgridview"
              onPress={()=>  this.setState({presslist: false})}
            />
          </TouchableOpacity>
        </View>
        
        {this.state.presslist ? this.Detailslistsview()  : this.Detailslistgridview() }
      </View>
    );
  }
}

// // import React, { useEffect } from "react";
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import axios from "axios";

//  import React, { Component } from 'react'

//  export class Details extends Component {
// constructor(props){
//   super(props);

// }

//     componentDidMount(){

//     // ApiCall()https://gorest.co.in/public/v2/users https://api.publicapis.org/entries

// //      axios.get('https://gorest.co.in/public/v2/users').then((response)=>{
// //       console.log("API Data===>", response)
// //     }

// //  renderItem  ({item}) {
// //   console.log("items==<value>",item)
// //   return (

// //     <View style={{ backgroundColor:'#eee',elevation:2,marginHorizontal:'10%',marginVertical:'3%',padding:'2%' }}>
// //     <Text style={{color:'#333',fontSize:20,fontWeight:"bold",marginBottom:'1%'}}>
// //        {item.name}</Text>

// //       <View style={{flexDirection:'row',justifyContent:'space-around'}}>
// //       <Text style={{color:'#333'}}>
// //        {item.startdate}</Text>
// //        <Text style={{color:'#333'}}>
// //        {item.enddate}</Text>
// //       </View>

// //       <View style={{padding:'2%',backgroundColor:'#456456',width:'30%',margin:'5%',justifyContent:'center',alignItems:'center'
// //     }}>

// //       <Text style={{color:'#333'}}>
// //        {item.class}</Text>
// //       </View>

// //       <View style={{borderBottomWidth:1,width:'100%',marginVertical:'1%'}}></View>
// //      <TouchableOpacity >

// //      <Text style={{color:'#123456'}}>
// //      {item.event}</Text>
// //       </TouchableOpacity>

// //        </View>
// //        )

// //   }
// //   render() {

// //     return (<View>
// //       <Text>
// //         Short Term Plan
// //       </Text>

// //       <View>
// //         <FlatList

// //           data={DATA}
// //           renderItem={renderItem}
// //           keyExtractor={item => item.id}
// //         />

// //       </View>
// //     </View>

// //     )
// //   }
// // }

// // // const ApiCall = () => {
// // //   axios
// // //   .get('https://gorest.co.in/public/v2/users')
// // //   .then((response) => console.log("Hello"))
// // // }

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';

// export default class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       dataSource:[]
//      };
//    }

//   componentDidMount(){
//     fetch("https://gorest.co.in/public/v2/users")
//     .then(response => response.json())
//     .then((responseJson)=> {
//       this.setState({
//        dataSource: responseJson
//       })
//     })
//     .catch(error=>console.log(error)) //to catch the errors if any
//     }

//     render(){
//      return(
//       <View style={{padding:10}}>
//       <FlatList
//       padding ={30}
//          data={this.state.dataSource}
//          renderItem={({item}) =>
//          <View style={{height: 50}}>
//          <Text style={{height: 50}}>{item.title}</Text>
//          <View style={{height: 1,backgroundColor:'gray'}}></View>
//          </View>
//         }
//        />

//      </View>
//      )}
// }
