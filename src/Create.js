import React,{ useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View,AsyncStorage , 
        Alert,
        TouchableOpacity,RefreshControl,ScrollView,SafeAreaView,TextInput} from 'react-native';
import { Octicons,Entypo,FontAwesome } from '@expo/vector-icons';
const Create = (props) => {
  const [text, setText] = useState('');
  const [judul, setJudul] = useState('');
  //instansiasi varibale session
  const [id_user, setGetIdUser] = useState('');
  // set session
  AsyncStorage.getItem('id_user').then(
    (value) =>
      setGetIdUser(value),
  );

  useEffect(() => {
    const initiate = async () => {};
    initiate();
  }, []);

    //api handle
    const login = async () => {
      fetch("https://mynotebackend.intermediatech.link/create_note", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: "&user_id=" + id_user + "&title=" + judul + "&note=" + text,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === "success") {
            // AsyncStorage.setItem('id_user', JSON.stringify(responseJson.result.id));
            // AsyncStorage.setItem('name', responseJson.result.name);
            Alert.alert("",responseJson.result)
            props.navigation.navigate("Home")
          } else {
            Alert.alert("",responseJson.result)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

  return (
    <View style={{
        flex: 1,
        paddingTop: 22
    }}>
    <Text style={{marginLeft:5,marginBottom:5}}> Judul:  </Text>
    <TextInput 
        style={{
            borderWidth:1,
            marginHorizontal:10,
            borderRadius:5,
            color:'black'
          }}
        onChangeText={setJudul}
        value={judul}
      />
    <Text style={{marginLeft:5,marginBottom:5}}> Catatan:  </Text>
    <TextInput
      multiline={true}
      numberOfLines={10}
      onChangeText={setText}
      value={text}
      style={{
        borderWidth:1,
        marginHorizontal:10,
        borderRadius:5
      }}
    />

<TouchableOpacity onPress={() =>login()}
        style={{
          backgroundColor:'#6e706f',
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
           Simpan
           </Text>
        </TouchableOpacity>
  </View>
  );
}
export default Create;
