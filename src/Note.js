import React,{ useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View,AsyncStorage , Alert,
        TouchableOpacity,RefreshControl,ScrollView,SafeAreaView} from 'react-native';
import { Octicons,Entypo,FontAwesome } from '@expo/vector-icons';
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign:'center'
  },
  itemtext: {
    padding: 10,
    fontSize: 12,
    height: 44,
    textAlign:'center',
  },
});
const Note = (props) => {
  // this.DetailNote = this.DetailNote.bind(this);
  //instansiasi varibale session
  const [id_user, setGetIdUser] = useState('');
  const [data, setData] = useState([]);
  // set session
  AsyncStorage.getItem('id_user').then(
    (value) =>
      setGetIdUser(value),
  );

    //api handle
    const getDataNote = async () => {
      fetch("https://mynotebackend.intermediatech.link/get_note", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: "&user_id=" + id_user,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === "success") {
            setData(responseJson.result);
          } else {
            if(responseJson.result.length == 0)
            {
              Alert.alert("",responseJson.result)
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if(data.length == 0)
    {
      getDataNote();
      //Alert.alert("Data catatan anda kosong")
    }
    
  return (
<View style={styles.container}>
    <Text style={styles.item}>
              Daftar Catatan
    </Text>
    <FlatList
      data={data}
      renderItem={
        ({item}) =>
        <TouchableOpacity style={{
          //width:300,
          backgroundColor:'#76c25b',
          borderRadius: 30,
          marginVertical: 8,
          alignItems:'center',
          paddingVertical: 10
        }} onPress={() => 
          {
            AsyncStorage.setItem('id_note', JSON.stringify(item.id));
            props.navigation.navigate("Detail");
              //alert(item.id);
          }}>
          
          <Text style={styles.item}>
              Judul :{item.title}  
          </Text>
          <Text style={styles.item}>
              Tanggal : {JSON.stringify(item.date_note)}
          </Text>
        </TouchableOpacity>
        }
    />
  </View>
  );
}
export default Note;
