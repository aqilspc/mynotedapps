import React,{ useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View,AsyncStorage , 
        Alert,
        TouchableOpacity,RefreshControl,ScrollView,SafeAreaView,TextInput} from 'react-native';
import { Octicons,Entypo,FontAwesome } from '@expo/vector-icons';
const Detail = (props) => {

  //instansiasi varibale session
  const [id_user, setGetIdUser] = useState('');
  const [note_id, getUsedIdNote] = useState('');
  const [data, setData] = useState([]);

  
  // set session
  AsyncStorage.getItem('id_user').then(
    (value) =>
      setGetIdUser(value),
  );
  
  AsyncStorage.getItem('id_note').then(
    (value) =>
    getUsedIdNote(value),
  );

  useEffect(() => {
    const initiate = async () => {};
    initiate();
  }, []);

      //api handle
      const getDataNoteById = async () => {
        fetch("https://mynotebackend.intermediatech.link/get_note_by_id", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded",
          }),
          body: "&note_id=" + note_id,
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status === "success") {
              setData(responseJson.result);
              console.log(responseJson.result);
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
        getDataNoteById();
      }
  return (
    <View style={{
        flex: 1,
        paddingTop: 22
    }}>

    <Text style={{marginLeft:5,marginBottom:5}}> Judul:  </Text>
    <Text style={{marginLeft:15,marginBottom:5}}> {data.title} </Text>

    <Text style={{marginLeft:5,marginBottom:5}}> Catatan:  </Text>
    <Text style={{marginLeft:15,marginBottom:5}}> {data.note} </Text>

    <TouchableOpacity onPress={() =>login()}
        style={{
          //width:300,
          backgroundColor:'#2b49f0',
          borderRadius: 25,
          marginVertical: 10,
          paddingVertical: 13
        }}>
        <Text style={{
          fontSize:16,
          fontWeight:'500',
          color:'#ffffff',
          textAlign:'center'
        }}>
           Edit
           </Text>
    </TouchableOpacity>

    <TouchableOpacity 
    onPress={() => 
        {
            fetch("https://mynotebackend.intermediatech.link/delete_note", {
                method: "POST",
                headers: new Headers({
                  "Content-Type": "application/x-www-form-urlencoded",
                }),
                body: "&note_id=" + data.id,
              })
                .then((response) => response.json())
                .then((responseJson) => {
                  if (responseJson.status === "success") {
                    //setData(responseJson.result);
                    Alert.alert("Catatan Telah Berhasil Dihapus")
                    props.navigation.navigate("Note");
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
        }}
        style={{
          //width:300,
          backgroundColor:'#f02b3f',
          borderRadius: 25,
          marginVertical: 10,
          paddingVertical: 13
        }}>
        <Text style={{
          fontSize:16,
          fontWeight:'500',
          color:'#ffffff',
          textAlign:'center'
        }}>
           Delete
           </Text>
    </TouchableOpacity>


  </View>
  );
}
export default Detail;
