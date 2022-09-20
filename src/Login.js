import React, { useEffect, useState } from "react";
import { FontAwesome,MaterialIcons,Octicons } from '@expo/vector-icons';
import { 
        Text, Button, View, 
        Alert, ScrollView, TextInput,
        TouchableOpacity,Image,AsyncStorage } 
  from "react-native";

const Login = (props) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const initiate = async () => {};
    initiate();
  }, []);

  //api handle
  const login = async () => {
    fetch("https://mynotebackend.intermediatech.link/login_user", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: "&email=" + email + "&password=" + password,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          AsyncStorage.setItem('id_user', JSON.stringify(responseJson.result.id));
          AsyncStorage.setItem('name', responseJson.result.name);
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
        Selamat datang di MyNotes
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
        Masukkan Email & Password
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
      
      <TouchableOpacity onPress={() =>login()}
        style={{
          width:300,
          backgroundColor:'#6e706f',
          borderRadius: 25,
          marginVertical: 10,
          paddingVertical: 13
        }}
      >
        <Text style={{
          fontSize:16,
          fontWeight:'500',
          color:'#ffffff',
          textAlign:'center'
        }}>
          <Octicons name="sign-in" size={24} color="white" />
           
           </Text>
        </TouchableOpacity>

        <Text
        style={{
          marginBottom: 10,
          color:'#ffffff',
          textAlign:'center'
        }}
        onPress={() => props.navigation.navigate("Signup")}>
          Belum punya akun? Daftar
        </Text>
    </View>
  );
};
export default Login;
