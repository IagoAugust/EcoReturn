import React, { useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {onAuthStateChanged} from 'firebase/auth';
import { FIREBASE_AUTH } from '../services/FirebaseConfig';
import { AuthRoutes } from './authRoutes';
import { InsideRoutes } from './insideRoutes';
import { Routes } from './routes';

export function AppRoutes() {

  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const subscriber = onAuthStateChanged(FIREBASE_AUTH, (user) => setUser(user));

  //   return subscriber;
  // },[]);

  return (
    <NavigationContainer>
      {/* {user ? (<InsideRoutes/>):(<AuthRoutes/>)} */}
      <Routes/>
    </NavigationContainer>
  )
}