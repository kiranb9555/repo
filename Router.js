import React, { Component } from 'react';
import {
  FlatList,
  View,
  TextInput,
  Text,
  Animated,
  Pressable,
  Dimensions
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import a from './style';

const ScreenWidth = Dimensions.get('screen').width;
export default class Router extends Component {
  constructor(props) {
    super(props);
    var db=openDatabase({name:userDatabase.db});
    
    this.state = {
      data: [],
      // searchedDataList: [],
      // searchedDataGrid: [],
      searchedDataListandGrid: [],
      refreshing: true,
      presslist: true,
      searchText: '',
      slideAnim: new Animated.Value(0)
    };
  }
  componentDidMount() {
    this.fetchCats();
  }
  fetchCats() {
    this.setState({ refreshing: true });
    fetch('https://gorest.co.in/public/v2/users')
      .then(res => res.json())
      .then(resJson => {
        this.setState({ data: resJson, searchedDataList: resJson, searchedDataGrid: resJson });
        this.setState({ refreshing: false });
        this.db.transaction(function(txn){

        
          this.db.transaction(function (txn) {
            txn.executeSql(
              "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
              [],
              function (tx, res) {
                console.log('item:', res.rows.length);
                if (res.rows.length == 0) {
                  txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                  txn.executeSql(
                    'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(40),user_email VARCHAR(40), user_gender  VARCHAR(40), user_status VARCHAR(6),user_id INT(4))',
                    [],
                  );
                  txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                  tx.executeSql(
                    'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
                    [userName, userContact, userAddress],
                    (tx, results) => {
                      console.log('Results', results.rowsAffected);
                      if (results.rowsAffected > 0) {
                        Alert.alert(
                          'Success',
                          'data added Successfully',
                          [
                            {
                              text: 'Ok',
                              
                            },
                          ],
                          {cancelable: false},
                        );
                      } else alert('data addition Failed');
                    },
                  );
                }
              },
            );
          });
        })
      })
      .catch(e => console.log(e));
  }
  renderItemComponentListandGrid = ({ item }) => {
    return (
      <View style={this.state.presslist ? a.flatlist_List_view1sty : a.flatlist_view1sty}>
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

  // renderItemComponentGrid = ({ item }) => {
  //   return (
  //     <View style={a.flatlist_view1sty}>
  //       <Text style={a.flatlist_text1sty}>{item.name}</Text>
  //       <View style={a.flatlist_view2sty}>
  //         <Text style={a.flatlist_text2sty}>{item.email}</Text>
  //         <Text style={a.flatlist_text3sty}>{item.gender}</Text>
  //       </View>
  //       <View style={a.flatlist_view3sty}>
  //         <Text style={a.flatlist_text4sty}>{item.status}</Text>
  //       </View>

  //       <Text style={a.flatlist_text5sty}>{item.id}</Text>
  //     </View>
  //   );
  // };

  searchList = ({ nativeEvent: { text } }) => {

    // let filteredDataGrid,filteredDataList;
    //  filteredDataGrid = filteredDataList
     
     this.setState({ searchedDataListandGrid: this.state.data?.filter(item => item?.name.toLowerCase()?.includes(text?.toLowerCase()))});


    // if (this.state.presslist) {

    //   this.setState({ searchDataGrid: this.state.data });
    //   this.setState({searchedDataListandGrid: filteredDataList  });
    // }

    // else 
    // {
    //   this.setState({ searchedDataList: this.state.data });
    //   this.setState({ searchedDataListandGrid: filteredDataGrid });
    // }
  }





  // searchList = ({ nativeEvent: { text } }) => {

  //   let filteredDataGrid,filteredDataList;
  //    filteredDataGrid = filteredDataList=this.state.data?.filter(item => item?.name.toLowerCase()?.includes(text?.toLowerCase()));
  //   if (this.state.presslist) {

  //     this.setState({ searchDataGrid: this.state.data });
  //     this.setState({searchedDataList: filteredDataList  });
  //   }

  //   else 
  //   {
  //     this.setState({ searchedDataList: this.state.data });
  //     this.setState({ searchedDataGrid: filteredDataGrid });
  //   }
  // }

// searchDataGrid = ({ nativeEvent: { text } }) => {
//   this.setState({searchedDataList:this.state.data});
//   let filteredDataGrid = this.state.data?.filter(item => item?.name.toLowerCase()?.includes(text?.toLowerCase()));
//   this.setState({
//     searchedDataGrid: filteredDataGrid
//   })
// }

Detailslistgridview = () => {
  return (
<SafeAreaView> 
    <FlatList
      key={this.state.presslist ?'list' : 'grid'}
      // key={'gridList'}
      numColumns={this.state.presslist ? 1 : 2}
      data={this.state.searchedDataListandGrid}
      // data={this.state.presslist ? this.state.searchedDataList :this.state.searchedDataGrid }
      renderItem={item => this.renderItemComponentListandGrid(item)}
      keyExtractor={item => item.id.toString()}
      refreshing={this.state.refreshing}
    />
</SafeAreaView>
  );
};

// Detailslistsview = () => {

//   return (
//     <FlatList
//       key={'gridList'}
//       data={this.state.searchedDataList}
//       renderItem={item => this.renderItemComponentListandGrid(item)}
//       keyExtractor={item => item.id.toString()}
//       refreshing={this.state.refreshing}
//     />

//   );
// };

firstPress = () => {
  Animated.timing(this.state.slideAnim, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true
  }).start();
  this.setState({ presslist: true });
  this.setState({searchedDataListandGrid:this.state.data});
  this.setState({ searchText: '' });

}

secondPress = () => {
  Animated.timing(this.state.slideAnim, {
    toValue: ScreenWidth / 2,
    duration: 200,
    useNativeDriver: true
  }).start();
  this.setState({ presslist: false });
  this.setState({searchedDataListandGrid:this.state.data});
  this.setState({ searchText: '' });
}

render() {
  return (
    <View style={a.viewwsty}>
      <View style={{ width: '100%', height: 50, paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
        <TextInput
          placeholder='Search data...'
          value={this.state.searchText}
          onChangeText={text => this.setState({ searchText: text })}
          style={{ borderWidth: 1, borderColor: 'black', paddingLeft: 10 }}
          onSubmitEditing={(t) => { this.searchList(t) }}
        />
      </View>
      <View style={a.viewsty}>
        <Pressable android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }} style={a.to1}
          onPress={this.firstPress}
        >
          <Text style={a.buttonText}>DETAILSLISTVIEW</Text>
        </Pressable>
        <Pressable android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }} style={a.to1}
          onPress={this.secondPress}
        >
          <Text style={a.buttonText}>DETAILSGRIDVIEW</Text>
        </Pressable>
      </View>
      <View style={a.animatedview} >
        <Animated.View style={[a.bottomBar, { transform: [{ translateX: this.state.slideAnim }] }]} /></View>
      { this.Detailslistgridview()}
      {/* this.state.presslist ?  this.Detailslistsview() : */}
    </View>
  );
}
}