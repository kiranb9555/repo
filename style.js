import {StyleSheet} from 'react-native';

const a = StyleSheet.create({
  button1sty: {
 width:'100%',
  },
  button2sty: {
    width:'300%',
     },
  viewwsty: {
     flex:1,
   },

   to1:{height: 100,width:'50%'},
   to2:{height: 100,width:'50%'},
  viewsty: {
  flexDirection:'row'
  },

  flatlist_view1sty: {
    width: '40%',
    backgroundColor: '#eee',
    elevation: 2,
    marginHorizontal: '5%',
    marginVertical: '3%',
    padding: '2%',
  },
  flatlist_text1sty: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '1%',
  },
  flatlist_view2sty: {
    paddingBottom: 5,
    justifyContent: 'space-around',
  },
  flatlist_text2sty: {fontSize: 13, color: '#333', marginVertical: 3},
  flatlist_text3sty: {color: '#333',paddingTop:1},
  flatlist_view3sty: {
    padding: '2%',
    backgroundColor: '#456456',
    width: '40%',
   
    justifyContent: 'center',
    alignItems: 'center',
  },

  flatlist_text4sty: {color: '#333'},

  flatlist_text5sty:{color: '#123456'}
});

export default a;