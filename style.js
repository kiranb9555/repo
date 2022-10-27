import { StyleSheet } from 'react-native';

const a = StyleSheet.create({
  button1sty: {
    width: '100%',
  },
  button2sty: {
    width: '300%',
  },
  viewwsty: {
    flex: 1,
  },
  to1: {
    width: '50%',
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 15
  },
  viewsty: {
   
    flexDirection: 'row' ,backgroundColor:'green',marginTop: 5,
    padding: 2,marginRight:20,marginLeft:20,
  },

  flatlist_List_view1sty: {
    width: '90%',
    backgroundColor: '#eee',
    elevation: 2,
    marginHorizontal: '5%',
    marginVertical: 12,
    padding: 5,
  },
  flatlist_view1sty: {
    width: '40%',
    backgroundColor: '#eee',
    elevation: 2,
    marginHorizontal: '5%',
    marginVertical: 12,
    padding: 5,
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
  flatlist_text2sty: { fontSize: 13, color: '#333', marginVertical: 3 },
  flatlist_text3sty: { color: '#333', paddingTop: 1 },
  flatlist_view3sty: {
    padding: '2%',
    backgroundColor: '#456456',
    width: '40%',

    justifyContent: 'center',
    alignItems: 'center',
  },

  flatlist_text4sty: { color: '#333' ,marginBottom:4},

  flatlist_text5sty: { color: '#123456' ,marginTop:7},

  buttonText:{
    color:'white',
    fontSize:15,
fontWeight:'400'
  },
  bottomBar: {
    
    marginRight:20,
  marginBottom:12,
    backgroundColor: 'pink', 
    width: '45%',
    height: 4
  },
  animatedview:{

  marginHorizontal:20,
  }
});

export default a;