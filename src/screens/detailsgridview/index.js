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
export default class Detailsgridview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: true,
    };
  }
  componentDidMount() {
    console.log("called detailsgridview");
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