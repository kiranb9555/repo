// import React from "react";
// import {
//     StyleSheet,
//     SafeAreaView,
//     FlatList,
//     View,
//     Text,
//     TouchableOpacity
// } from "react-native";
// import axios from 'axios';

// export default class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: [],
//             refreshing: true,
//         }
//     }

//     componentDidMount() {
//         // this.fetchCats();
//         axios.get('https://jsonplaceholder.typicode.com/todos/1')
//            .then(resJson => {
//               console.log(resJson);
//                 this.setState({ data: resJson });
//                 this.setState({ refreshing: false });
//             }).catch(e => console.log(e));
//     }

//     fetchCats() {
//         this.setState({ refreshing: true });
//         axios.get('https://jsonplaceholder.typicode.com/todos/1')
//            .then(resJson => {
//               console.log(resJson);
//                 this.setState({ data: resJson });
//                 this.setState({ refreshing: false });
//             }).catch(e => console.log(e));
//     }

//     renderItemComponent = ({item}) =>{
// console.log(item);
// return (
//     <View style={{ backgroundColor:'#eee',elevation:2,marginHorizontal:'10%',marginVertical:'3%',padding:'2%' }}> 
//    <Text style={{color:'#333',fontSize:20,fontWeight:"bold",marginBottom:'1%'}}>
//       {item.name}</Text> 
  
//         <View style={{flexDirection:'row',justifyContent:'space-around'}}>
//      <Text style={{color:'#333'}}>
//           {item.startdate}</Text> 
//          <Text style={{color:'#333'}}>
//        {item.enddate}</Text> 
//        </View>
  
//       <View style={{padding:'2%',backgroundColor:'#456456',width:'30%',margin:'5%',justifyContent:'center',alignItems:'center'
//      }}>
  
//       <Text style={{color:'#333'}}>
//          {item.class}</Text> 
//       </View>
  
  
  
  
//         <View style={{borderBottomWidth:1,width:'100%',marginVertical:'1%'}}></View>
//         <TouchableOpacity >
        
//        <Text style={{color:'#123456'}}>
//         {item.event}</Text> 
//          </TouchableOpacity> 
       
       
         
//           </View>
//        )



//     }
       
//     ItemSeparator = () => <View style={{
//         height: 2,
//         backgroundColor: "rgba(0,0,0,0.5)",
//         marginLeft: 10,
//         marginRight: 10,
//     }}
//     />

//     handleRefresh = () => {
//         this.setState({ refreshing: false }, () => { this.fetchCats() }); // call fetchCats after setting the state
//     }

//     render() {
//       return (
//         <SafeAreaView>
//           <Text>text</Text>
//           <FlatList
//             data={this.state.data}
//             renderItem={item => this.renderItemComponent(item)}
//             keyExtractor={item => item.id.toString()}
//             ItemSeparatorComponent={this.ItemSeparator}
//             refreshing={this.state.refreshing}
//             onRefresh={this.handleRefresh}
//           />
//         </SafeAreaView>)
//     }
// }

// const styles = StyleSheet.create({
//   container: {
//     height: 300,
//     margin: 10,
//     backgroundColor: '#FFF',
//     borderRadius: 6,
//   },
//   image: {
//     height: '100%',
//     borderRadius: 4,
//   },
// });


