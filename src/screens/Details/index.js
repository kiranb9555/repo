// import React from "react";
// import {
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   View,
//   Text,
//   Image,
//   TouchableOpacity
// } from "react-native";
// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       refreshing: true,
//     }
//   }
//   componentDidMount() {
//     this.fetchCats();
//   }
//   fetchCats() {
//     this.setState({ refreshing: true });
//     fetch('https://gorest.co.in/public/v2/users')
//       .then(res => res.json())
//       .then(resJson => {
//         this.setState({ data: resJson });
//         this.setState({ refreshing: false });
//       }).catch(e => console.log(e));
//   }
//   renderItemComponent = ({ item }) => {
//     console.log('item', item)
//     return (
//       <View style={{ backgroundColor: '#eee', elevation: 2, marginHorizontal: '10%', marginVertical: '3%', padding: '2%' }}>
//         <Text style={{ color: '#333', fontSize: 20, fontWeight: "bold", marginBottom: '1%' }}>
//           {item.name}</Text>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
//           <Text style={{ color: '#333' }}>
//             {item.email}</Text>
//           <Text style={{ color: '#333' }}>
//             {item.gender}</Text>
//         </View>
//         <View style={{
//           padding: '2%', backgroundColor: '#456456', width: '30%', margin: '5%', justifyContent: 'center', alignItems: 'center'
//         }}>
//           <Text style={{ color: '#333' }}>
//             {item.status}</Text>
//         </View>
//         <View style={{ borderBottomWidth: 1, width: '100%', marginVertical: '1%' }}></View>
//         <TouchableOpacity >
//           <Text style={{ color: '#123456' }}>
//             {item.id}</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }
//   ItemSeparator = () => <View style={{
//     height: 10,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     marginLeft: 10,
//     marginRight: 10,
//   }}
//   />
//   handleRefresh = () => {
//     this.setState({ refreshing: false }, () => { this.fetchCats() }); // call fetchCats after setting the state
//   }
//   render() {
//     return (
//       <SafeAreaView>
//         <FlatList
//           data={this.state.data}
//           renderItem={item => this.renderItemComponent(item)}
//           keyExtractor={item => item.id.toString()}
//           refreshing={this.state.refreshing}
//           onRefresh={this.handleRefresh}
//         />
//       </SafeAreaView>)
//   }
// }

//task5 grid view
// import React from 'react';
// import {
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       refreshing: true,
//     };
//   }
//   componentDidMount() {
//     this.fetchCats();
//   }
//   fetchCats() {
//     this.setState({refreshing: true});
//     fetch('https://gorest.co.in/public/v2/users')
//       .then(res => res.json())
//       .then(resJson => {
//         this.setState({data: resJson});
//         this.setState({refreshing: false});
//       })
//       .catch(e => console.log(e));
//   }
//   renderItemComponent = ({item}) => {
//     console.log('item', item);
//     return (
//       <View
//         style={{
//           width:'40%',
//           backgroundColor: '#eee',
//           elevation: 2,
//           marginHorizontal: '5%',
//           marginVertical: '3%',
//           padding: '2%',
//         }}>
//         <Text
//           style={{
//             color: '#333',
//             fontSize: 20,
//             fontWeight: 'bold',
//             marginBottom: '1%',
//           }}>
//           {item.name}
//         </Text>
//         <View style={{paddingBottom:5, justifyContent: 'space-around'}}>
//           <Text style={{fontSize:13, color: '#333',marginVertical:3}}>{item.email}</Text>
//           <Text style={{color: '#333',paddingTop:1}}>{item.gender}</Text>
//         </View>
//         <View
//           style={{
//             padding: '2%',
//             backgroundColor: '#456456',
//             width: '40%',
           
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Text style={{color: '#333'}}>{item.status}</Text>
//         </View>
       
  
        
//           <Text style={{color: '#123456'}}>{item.id}</Text>
       
//       </View>
//     );
//   };

//   // ItemSeparator = () => (
//   //   <View
//   //     style={{
//   //       height: 10,
//   //       backgroundColor: 'rgba(0,0,0,0.5)',
//   //       marginLeft: 10,
//   //       marginRight: 10,
//   //     }}
//   //   />
//   // );
//   handleRefresh = () => {
//     this.setState({refreshing: false}, () => {
//       this.fetchCats();
//     }); // call fetchCats after setting the state
//   };
//   render() {
//     return (
//       <SafeAreaView>
//         <FlatList
//           numColumns={2}
//           data={this.state.data}
//           renderItem={item => this.renderItemComponent(item)}
//           keyExtractor={item => item.id.toString()}
//           refreshing={this.state.refreshing}
//           onRefresh={this.handleRefresh}
//         />
//       </SafeAreaView>
//     );
//   }
// }

// npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
// cd android
//
// ./gradlew assembleDebug




//task6 tab view

// import React from "react";
// import {
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   View,
//   Text,
//   Image,
//   TouchableOpacity
// } from "react-native";
// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       refreshing: true,
//     }
//   }
//   componentDidMount() {
//     this.fetchCats();
//   }
//   fetchCats() {
//     this.setState({ refreshing: true });
//     fetch('https://gorest.co.in/public/v2/users')
//       .then(res => res.json())
//       .then(resJson => {
//         this.setState({ data: resJson });
//         this.setState({ refreshing: false });
//       }).catch(e => console.log(e));
//   }
//   renderItemComponent = ({ item }) => {
//     console.log('item', item)
//     return (
//       <View style={{ backgroundColor: '#eee', elevation: 2, marginHorizontal: '10%', marginVertical: '3%', padding: '2%' }}>
//         <Text style={{ color: '#333', fontSize: 20, fontWeight: "bold", marginBottom: '1%' }}>
//           {item.name}</Text>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
//           <Text style={{ color: '#333' }}>
//             {item.email}</Text>
//           <Text style={{ color: '#333' }}>
//             {item.gender}</Text>
//         </View>
//         <View style={{
//           padding: '2%', backgroundColor: '#456456', width: '30%', margin: '5%', justifyContent: 'center', alignItems: 'center'
//         }}>
//           <Text style={{ color: '#333' }}>
//             {item.status}</Text>
//         </View>
//         <View style={{ borderBottomWidth: 1, width: '100%', marginVertical: '1%' }}></View>
//         <TouchableOpacity >
//           <Text style={{ color: '#123456' }}>
//             {item.id}</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }
//   ItemSeparator = () => <View style={{
//     height: 10,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     marginLeft: 10,
//     marginRight: 10,
//   }}
//   />
//   handleRefresh = () => {
//     this.setState({ refreshing: false }, () => { this.fetchCats() }); // call fetchCats after setting the state
//   }
//   render() {
//     return (
//       <SafeAreaView>
//         <FlatList
//           data={this.state.data}
//           renderItem={item => this.renderItemComponent(item)}
//           keyExtractor={item => item.id.toString()}
//           refreshing={this.state.refreshing}
//           onRefresh={this.handleRefresh}
//         />
//       </SafeAreaView>)
//   }
// }

import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: true,
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
        this.setState({data: resJson});
        this.setState({refreshing: false});
      })
      .catch(e => console.log(e));
  }
  renderItemComponent = ({item}) => {
    console.log('item', item);
    return (
      <View
        style={{
          width:'40%',
          backgroundColor: '#eee',
          elevation: 2,
          marginHorizontal: '5%',
          marginVertical: '3%',
          padding: '2%',
        }}>
        <Text
          style={{
            color: '#333',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: '1%',
          }}>
          {item.name}
        </Text>
        <View style={{paddingBottom:5, justifyContent: 'space-around'}}>
          <Text style={{fontSize:13, color: '#333',marginVertical:3}}>{item.email}</Text>
          <Text style={{color: '#333',paddingTop:1}}>{item.gender}</Text>
        </View>
        <View
          style={{
            padding: '2%',
            backgroundColor: '#456456',
            width: '40%',
           
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#333'}}>{item.status}</Text>
        </View>
       
  
        
          <Text style={{color: '#123456'}}>{item.id}</Text>
       
      </View>
    );
  };

  // ItemSeparator = () => (
  //   <View
  //     style={{
  //       height: 10,
  //       backgroundColor: 'rgba(0,0,0,0.5)',
  //       marginLeft: 10,
  //       marginRight: 10,
  //     }}
  //   />
  // );
  handleRefresh = () => {
    this.setState({refreshing: false}, () => {
      this.fetchCats();
    }); // call fetchCats after setting the state
  };
  render() {
    return (
      <SafeAreaView>
        <FlatList
          numColumns={2}
          data={this.state.data}
          renderItem={item => this.renderItemComponent(item)}
          keyExtractor={item => item.id.toString()}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </SafeAreaView>
    );
  }
}