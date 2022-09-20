import React,{ useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View,AsyncStorage , 
        TouchableOpacity,RefreshControl,ScrollView,SafeAreaView} from 'react-native';
import { Octicons,Entypo,FontAwesome } from '@expo/vector-icons';
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 5
  },
  item: {
    padding: 10,
    fontSize: 15,
    //height: 44,
  },
  itemtext: {
    padding: 10,
    fontSize: 12,
    height: 44,
    textAlign:'center',
  },
});
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const Home = (props) => {
  //handle refresh
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //instansiasi varibale session
  const [id_user, setGetIdUser] = useState('');
  const [name, setGetName] = useState('');
  // set session
  AsyncStorage.getItem('id_user').then(
    (value) =>
      setGetIdUser(value),
  );
  AsyncStorage.getItem('name').then(
    (value) =>
    setGetName(value),
  );

  const LogoutApp = async () => {
    AsyncStorage.removeItem('id_user');
    AsyncStorage.removeItem('name');
    props.navigation.navigate("Login")
  };

  const MyNote = async () => {
    props.navigation.navigate("Note")
  };

  const AddNote = async () => {
    props.navigation.navigate("Create")
  };
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.container}>
      <Text style={styles.item}>Halo : {name}</Text>

        <TouchableOpacity onPress={AddNote}
        >
        <Text style={{
        fontSize:16,
        fontWeight:'500',
        color:'#000000',
        textAlign:'center'
        }}>
        <Entypo name="add-to-list" size={24} color="black" />
        </Text>
        
        <Text style={styles.itemtext}>Tambah Catatan</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={MyNote}>

        <Text style={{
        fontSize:16,
        fontWeight:'500',
        color:'#000000',
        textAlign:'center'
        }}>
       <FontAwesome name="th-list" size={24} color="black" />
        </Text>
        <Text style={styles.itemtext}>Lihat Catatan Anda</Text>
        </TouchableOpacity>

        
        <TouchableOpacity onPress={LogoutApp}>
        <Text style={{
        fontSize:16,
        fontWeight:'500',
        color:'#000000',
        textAlign:'center'
        }}>
        <Octicons name="sign-out" size={24} color="black" />
        </Text>
        <Text style={styles.itemtext}>Keluar Sistem</Text>
        </TouchableOpacity>
        </View>
    </ScrollView>
  </SafeAreaView>
  );
}
export default Home;
