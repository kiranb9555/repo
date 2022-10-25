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
import a from './style';

const ScreenWidth = Dimensions.get('screen').width;
export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchedDataList: [],
      searchedDataGrid: [],
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
        this.setState({ data: resJson, searchedDataList: resJson , searchedDataGrid: resJson});
        this.setState({ refreshing: false });
      })
      .catch(e => console.log(e));
  }
  renderItemComponentList = ({ item }) => {
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

  renderItemComponentGrid = ({ item }) => {
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

  searchDataList = ({ nativeEvent: { text } }) => {
    let filteredDataList = this.state.data?.filter(item => item?.name.toLowerCase()?.includes(text?.toLowerCase()));
    this.setState({
      searchedDataList: filteredDataList
    })
  }
  searchDataGrid = ({ nativeEvent: { text } }) => {
    let filteredDataGrid = this.state.data?.filter(item => item?.name.toLowerCase()?.includes(text?.toLowerCase()));
    this.setState({
      searchedDataGrid: filteredDataGrid
    })
  }

  Detailslistgridview = () => {
    return (

      <FlatList
        key={'list'}
        numColumns={2}
        data={this.state.searchedDataGrid}
        renderItem={item => this.renderItemComponentGrid(item)}
        keyExtractor={item => item.id.toString()}
        refreshing={this.state.refreshing}
      />

    );
  };

  Detailslistsview = () => {

    return (
      <FlatList
        key={'gridList'}
        data={this.state.searchedDataList}
        renderItem={item => this.renderItemComponentList(item)}
        keyExtractor={item => item.id.toString()}
        refreshing={this.state.refreshing}
      />

    );
  };

  firstPress = () => {
    Animated.timing(this.state.slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
    this.setState({ presslist: true });
  }
 
  secondPress = () => {
    Animated.timing(this.state.slideAnim, {
      toValue: ScreenWidth/2,
      duration: 300,
      useNativeDriver: true
    }).start();
    this.setState({ presslist: false });
  }

  render() {
    return (
      <View style={a.viewwsty}>
        <View style={{ width: '100%', height: 70, padding: 10 }}>
          <TextInput
            placeholder='Search data...'
            value={this.state.searchText}
            onChangeText={text => this.setState({ searchText: text })}
            style={{ borderWidth: 1, borderColor: 'black', paddingLeft: 10 }}
            onSubmitEditing={(t) => {this.state.presslist? this.searchData1ist(t) :this.searchDataGrid(t)}}
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
        <Animated.View style={[a.bottomBar, {transform: [{translateX:this.state.slideAnim}] }]} />
        {this.state.presslist ? this.Detailslistsview() : this.Detailslistgridview()}
      </View>
    );
  }
}