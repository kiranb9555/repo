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
    this.fetchCats();
    this.createTable();
    // this.deleteTable()
  }

  ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    this.db.transaction((trans) => {
      trans.executeSql(sql, params, (trans, results) => {
        resolve(results);
      },
        (error) => {
          reject(error);
        });
    });
  });

  deleteTable = async () => {
    let Table = await this.ExecuteQuery("DROP TABLE users", []);
    console.log('Table', Table)
  }

  db = openDatabase(
    {
      name: 'SQLite',
      location: 'default',
      createFromLocation: '~SQLite.db',
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
    for (let i = 0; i < data.length; ++i) {
      let item = data[i];
      let singleInsert = await this.ExecuteQuery("INSERT INTO users (id, email, gender, name, status) VALUES ( ?, ?, ?, ?, ? )", [item.id, item.email, item.gender, item.name, item.status]);
    }
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

  async DeleteQuery(id) {
    let deleteQuery = await this.ExecuteQuery('DELETE FROM users WHERE id = ?', [id]);
    console.log('deleteQuery', deleteQuery)
  }


  getData = async () => {
    let data = await this.ExecuteQuery('SELECT * FROM users', []);
    var rows = data.rows;
    let fullData = [];
    for (let i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      fullData.push(item);
    }

    if (fullData?.length > 0) {
      this.setState({ data: fullData, searchedDataList: fullData, searchedDataGrid: fullData, searchedDataListandGrid: fullData });
      return false;
    }
  }

  addData = async (resJson) => {
    // let data = Array(20).fill(1).map((item, index) => index+1);
    // data.forEach(item => this.DeleteQuery(item))

    let data = await this.ExecuteQuery('SELECT * FROM users', []);
    var rows = data.rows;
    let fullData = [];
    for (let i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      fullData.push(item);
    }
    console.log('fullData', fullData);
    if (fullData?.length > 0) {
      this.setState({ data: fullData, searchedDataList: fullData, searchedDataGrid: fullData, searchedDataListandGrid: fullData });
      return false;
    } else {
      this.addDataInDataBase(resJson);
    }
  }

  fetchCats() {
    this.setState({ refreshing: true });
    fetch('https://gorest.co.in/public/v2/users')
      .then(res => res.json())
      .then(resJson => {
        this.setState({ data: resJson, searchedDataList: resJson, searchedDataGrid: resJson, searchedDataListandGrid: resJson, refreshing: false });
        resJson?.length > 0 && this.addData(resJson)
      })
      .catch(e => {
        this.getData();
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

  }

  secondPress = () => {
    Animated.timing(this.state.slideAnim, {
      toValue: ScreenWidth / 2,
      duration: 200,
      useNativeDriver: true
    }).start();
    this.setState({ presslist: false, searchedDataListandGrid: this.state.data, searchText: '' });
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