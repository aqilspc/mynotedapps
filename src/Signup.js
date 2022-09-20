import React, { useEffect, useState } from "react";
import { 
        Text, Button, View, 
        Alert, ScrollView, TextInput,
        TouchableOpacity,Image } 
  from "react-native";
  import { FontAwesome,MaterialIcons } from '@expo/vector-icons';
const Login = (props) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const initiate = async () => {};
    initiate();
  }, []);

  //api handle
  const login = async () => {
    fetch("https://mynotebackend.intermediatech.link/register_user", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: "&email=" + email + "&password=" + password + "&nama_lengkap=" + name,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          Alert.alert("",responseJson.result)
          props.navigation.navigate("Login")
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
      flexGrow: 1,
      justifyContent:'center',
      backgroundColor:'#1c313a',
      alignItems: 'center'
    }}>
      <Text style={{
      marginBottom: 10,
      color:'#ffffff',
      textAlign:'center'
    }}>
        Daftar terlebih dahulu untuk mendapatkan akses
      </Text>

      <MaterialIcons style={{
         marginTop: 10,
         borderRadius: 10,
         borderWidth: 1,
         borderColor: '#fff'
      }} name="event-note" size={50} color="white" />

      <Text style={{
          marginTop: 10,
          marginBottom: 10,
          color:'#ffffff',
          textAlign:'center'
        }}>
        Isi data dibawah ini
      </Text>

      <TextInput 
        style={{
            width:300,
            backgroundColor:'rgba(255, 255,255,0.2)',
            borderRadius: 25,
            paddingHorizontal:16,
            fontSize:16,
            color:'#ffffff',
            marginVertical: 10
        }}
        placeholder="Nama Lengkap"
        underlineColorAndroid='rgba(0,0,0,0)'
        onChangeText={setName}
        value={name}
      />

      <TextInput 
        style={{
            width:300,
            backgroundColor:'rgba(255, 255,255,0.2)',
            borderRadius: 25,
            paddingHorizontal:16,
            fontSize:16,
            color:'#ffffff',
            marginVertical: 10
        }}
        placeholder="Email"
        underlineColorAndroid='rgba(0,0,0,0)'
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={{
          width:300,
          backgroundColor:'rgba(255, 255,255,0.2)',
          borderRadius: 25,
          paddingHorizontal:16,
          fontSize:16,
          color:'#ffffff',
          marginVertical: 10
      }}
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry={true}
        underlineColorAndroid='rgba(0,0,0,0)'
        value={password}
      />

      {/* cta signup */}

      <TouchableOpacity onPress={() =>login()}
        style={{
          width:300,
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
           Daftar
           </Text>
        </TouchableOpacity>

        <Text
        style={{
          marginBottom: 10,
          color:'#ffffff',
          textAlign:'center'
        }}
        onPress={() => props.navigation.navigate("Login")}>
          Sudah punya akun? Masuk
        </Text>
    </View>
  );
};



export default Login;
