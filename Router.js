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

const isSameUser = (a, b) => a.id == b.id;

const onlyInLeft = (left, right) => 
  left.filter(leftValue =>
    !right.some(rightValue => 
      isSameUser(leftValue, rightValue)));

// const onlyIn = (left, right) => {
//   console.log('right', right);
//   let data = left?.filter(item => {
//     let obj = right.find(val => val.id === item.id);
//     console.log('obj-->', obj);
//     if(obj){
//       return false
//     } else {
//       return true
//     }
//   });
//   console.log('datga', data);
// }
export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchedDataListandGrid: [],
      refreshing: true,
      presslist: true,
      searchText: '',
      slideAnim: new Animated.Value(0)
    };
      
    
  }

  componentDidMount() {
    this.createTable();
    this.fetchCats();
    // this.deleteTable()
  }

  ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    this.db.transaction((trans) => {
      trans.executeSql(sql, params, (trans, results) => {
       console.log("executed sql______%s__%s",params,sql) 
        resolve(results);
      },
        (error) => {
          reject("error__%s__%s",error,sql);
        });
    });
  });

  deleteTable = async () => {
    let Table = await this.ExecuteQuery("DROP TABLE users", []);
    console.log('Table', Table)
  }

  db = openDatabase(
    {
      name: 'SQ',
      // location: 'default',
      // createFromLocation: '~SQLite1.db',
    },
    () => { },
    error => {
      console.log("ERROR: " + error);
    }
  );

  async createTable() {
    let Table = await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS users (id INTEGER, email VARCHAR(16), gender VARCHAR(16), name VARCHAR(16), status VARCHAR(16))", []);
    console.log('Table', Table)
  }

  addDataInDataBase = async (data) => {
    // let Deletetable = await this.ExecuteQuery('DELETE FROM users',[]);
    for (let i = 0; i < data?.length; ++i) {
      let item = data[i];
      
      
      let singleInsert = await this.ExecuteQuery("INSERT INTO users (id, email, gender, name, status) VALUES ( ?, ?, ?, ?, ? )", [item.id, item.email, item.gender, item.name, item.status]);
    }
       this.data = await this.ExecuteQuery('SELECT * FROM users', []);
       var rows = data.rows;
       let fullData = [];
     
      for (let i = 0; i < rows?.length; i++) {
         var itemsave = rows.item(i);
        fullData.push(itemsave);
       }
       if (fullData?.length > 0) 
   
        this.setState({ data: fullData,searchedDataListandGrid: fullData });
        console.log("******************************************************************************",this.state.searchedDataListandGrid);
        // return false;
      
      
    
    // // data?.forEach(item => {
    // //   let singleInsert = await this.ExecuteQuery("INSERT INTO users (id, email, gender, name, status) VALUES ( ?, ?, ?, ?, ? )", [item.id, item.email, item.gender, item.name, item.status]);
    // // })
    // let Data = data;
    // let query = "INSERT INTO users (id, email, gender, name, status) VALUES";
    // for (let i = 0; i < Data.length; ++i) {
    //   query = query + "('"
    //     + Data[i].id //id
    //     + "','"
    //     + Data[i].email //first_name
    //     + "','"
    //     + Data[i].gender //last_name
    //     + "','"
    //     + Data[i].name //last_name
    //     + "','"
    //     + Data[i].status //is_deleted
    //     + "')";
    //   if (i != Data.length - 1) {
    //     query = query + ",";
    //   }
    // }
    // query = query + ";";
    // let multipleInsert = await this.ExecuteQuery(query, []);
    // console.log('multipleInsert');
  }

  // async DeleteQuery(id) {
  //   let deleteQuery = await this.ExecuteQuery('DELETE FROM users WHERE id = ?', [id]);
  //   console.log('deleteQuery', deleteQuery);
  // }


  getData = async () => {
    let data = await this.ExecuteQuery('SELECT * FROM users', []);
    var rows = data.rows;
    let fullData = [];
    for (let i = 0; i < rows?.length; i++) {
      var item = rows.item(i);
      console.log("item from row item(i)_____________", item);
      fullData.push(item);
      console.log(this.state.fullData);
    }
    if (fullData?.length > 0) {      
      return fullData;
    } else {
      return [];
    }
  }

  async DeleteQuery(id){
    let deleteQuery = await this.ExecuteQuery('DELETE FROM users WHERE id = ?', [id]);
    console.log(deleteQuery);
  }

  deleteRow = (data) => {
    data.forEach(item => this.DeleteQuery(item.id));
  }

  addData = async (resJson) => {
    // let data = Array(20).fill(1).map((item, index) => index+1);
    // data.forEach(item => this.DeleteQuery(item))
    this.addDataInDataBase(resJson);
    // let data = await this.ExecuteQuery('SELECT * FROM users', []);
    // var rows = data.rows;
    // let fullData = [];
   
    // for (let i = 0; i < rows.length; i++) {
    //   var item = rows.item(i);
    //   fullData.push(item);
    // }
    // console.log('fullData', fullData);
//     if (fullData?.length > 0) {
//       this.setState({ data: fullData, searchedDataList: fullData, searchedDataGrid: fullData, searchedDataListandGrid: fullData });
//       return false;
//      } else {
//     //  this.addDataInDataBase(resJson);
// console.log("error");
//      }
  }

  async UpdateQuery(email,gender,name,status){
    let updateQuery = await this.ExecuteQuery('UPDATE users SET  email = ?, gender = ?, name = ?, status = ? WHERE id = ?', [email,gender,name,status, [id]]);
    console.log(updateQuery);
  }


  manageData = (DATA) => {
    this.getData().then(res => {
      if(res?.length > 0){
        // this.setState({ data: res, searchedDataListandGrid: res });
        let leftData = onlyInLeft(DATA, res, isSameUser);
        let resLeftData = onlyInLeft(res, DATA, isSameUser);
        if(leftData?.length > 0){
          this.deleteRow(leftData);
        
          // this.addDataInDataBase(leftData);
        } 
        if(resLeftData?.length > 0){
          this.addDataInDataBase(DATA);
          // this.deleteRow(resLeftData)
        }
      } else {
        this.addDataInDataBase(DATA);
      }
      // this.setState({ data: res, searchedDataListandGrid: res });
    });
  }

  fetchCats(){
    fetch('https://my-json-server.typicode.com/kiranb9555/updatedapi/usersData')
    .then(res => res.json())
    .then(res => {
      this.manageData(res);
    }).catch(e => {
      this.manageData([]);
      console.log('api ',e);
    });
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

  searchList = ({ nativeEvent: { text } }) => {
    this.setState({ searchedDataListandGrid: this.state.data?.filter(item => item?.name.toLowerCase()?.includes(text?.toLowerCase())) });
  }

  Detailslistgridview = () => {
    return (
      <SafeAreaView>
        <FlatList
          key={this.state.presslist ? 'list' : 'grid'}
          numColumns={this.state.presslist ? 1 : 2}
          data={this.state.searchedDataListandGrid}
          contentContainerStyle={{paddingBottom: 150}}
          renderItem={item => this.renderItemComponentListandGrid(item)}
          keyExtractor={item => item.id.toString()}
          refreshing={this.state.refreshing}
        />
      </SafeAreaView>
    );
  };

  firstPress = () => {
    Animated.timing(this.state.slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
    this.setState({ presslist: true });
    this.setState({ searchedDataListandGrid: this.state.data });
    this.setState({ searchText: '' });
    this.fetchCats();
  }

  secondPress = () => {
    Animated.timing(this.state.slideAnim, {
      toValue: ScreenWidth / 2,
      duration: 200,
      useNativeDriver: true
    }).start();
    this.setState({ presslist: false, searchedDataListandGrid: this.state.data, searchText: '' });
    this.fetchCats();
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
        {this.Detailslistgridview()}
      </View>
    );
  }
}