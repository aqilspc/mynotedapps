import React, { useEffect, useReducer, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Note from "./Note";
import Create from "./Create";
import Detail from "./Detail";

const Stack = createNativeStackNavigator();

const Route = (props) => {
  const [isLoading, setIsLoading] = useState(false);

	return (
	  <>
	    <NavigationContainer>
	        <Stack.Navigator>
	        <Stack.Screen
            name="Login"
            options={{
              title: "Login",
            }}
          >
            {(props) => (
              <Login
                {...props}
              />
            )}
          </Stack.Screen>
	        <Stack.Screen
            name="Signup"
            options={{
              title: "Signup",
            }}
          >
            {(props) => (
              <Signup
                {...props}
              />
            )}
          </Stack.Screen>

	        <Stack.Screen
            name="Home"
            options={{
              title: "Home",
              headerLeft: () => null
            }}
          >
            {(props) => (
              <Home
                {...props}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Note"
            options={{
              title: "Catatan Saya",
            }}
          >
            {(props) => (
              <Note
                {...props}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Create"
            options={{
              title: "Tambah Catatan",
            }}
          >
            {(props) => (
              <Create
                {...props}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Detail"
            options={{
              title: "Detail Catatan",
            }}
          >
            {(props) => (
              <Detail
                {...props}
              />
            )}
          </Stack.Screen>

	        </Stack.Navigator>
	    </NavigationContainer>
	  </>
	);
};

export default Route;
