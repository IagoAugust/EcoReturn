import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { Shop } from '../screens/Shop';
import { useAuth } from '../context/AuthContext';
import { StoreReverseLogistics } from '../screens/StoreReverseLogistics';
import { ProductReverseLogistics } from '../screens/ProductReverseLogistics';
import { Orders } from '../screens/Orders';
import { OrderApproval } from '../screens/OrderApproval';
import { Notifications } from '../screens/Notifications';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { FIRESTORE_DB } from '../services/FirebaseConfig';

// const Stack = createNativeStackNavigator();

// export function Routes() {
//   const { redirectToHome } = useAuth();
//   const navigation = useNavigation();

//   const ProfileButton = () => (
//     <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//       <FontAwesome name="user-circle-o" size={28} color="#000" />
//     </TouchableOpacity>
//   );

//   const ProfileNotification = () => (
//     <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
//       <Ionicons name="notifications" size={28} color="#000" />
//     </TouchableOpacity>
//   );


//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: '#add185' },
//         headerTitleAlign: 'center',
//         headerLeft: () => <ProfileButton />,
//         headerRight: () => <ProfileNotification/>
//       }}
//     >
//       {redirectToHome ? (
//         <>
//           <Stack.Screen name="Home" component={Home} options={{ title: 'Tela Inicial' }} />
//           <Stack.Screen name="Profile" component={Profile} options={{ title: 'Perfil' }} />
//           <Stack.Screen name="Store" component={StoreReverseLogistics} options={{ title: 'Solicitação de Pedido' }} />
//           <Stack.Screen name='ProductReverseLogistics' component={ProductReverseLogistics} options={ ({route}) => {({ title: route.params?.storeName || 'Produto', })} } />
//           <Stack.Screen name='Orders' component={Orders} options={{ title: 'Pedidos' }} />
//           <Stack.Screen name="Shop" component={Shop} options={{ title: 'Shop' }} />
//           <Stack.Screen name='OrderApproval' component={OrderApproval} options={{ title: 'Aprovação de pedido' }} />
//           <Stack.Screen name='Notifications' component={Notifications} options={{ title: 'Notificações' }} />
//         </> 
//       ) : (
//         <>
//           <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
//           <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }




const Stack = createNativeStackNavigator();

// const NotificationIcon = ({ hasNewNotifications }) => (

//   <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
//     <Ionicons name="notifications" size={28} color="#000">
//       {hasNewNotifications && (
//         <View
//           style={{
//             position: 'absolute',
//             top: 0,
//             right: 0,
//             backgroundColor: 'red',
//             borderRadius: 8,
//             width: 16,
//             height: 16,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Text style={{ color: 'white', fontSize: 10 }}>•</Text>
//         </View>
//       )}
//     </Ionicons>
//   </TouchableOpacity>
// );

export function Routes() {
  const { redirectToHome } = useAuth();
const navigation = useNavigation();
const [hasNewNotifications, setHasNewNotifications] = useState(false);

const NotificationIcon = ({ hasNewNotifications }) => (
  <TouchableOpacity
    style={{ marginRight: 20, position: 'relative' }}
    onPress={() => navigation.navigate('Notifications')}
  >
    <Ionicons name="notifications" size={28} color="#000" />
    {hasNewNotifications && (
      <View
        style={{
          position: 'absolute',
          top: -5,  // Ajuste esta propriedade para mover a bolinha para cima
          right: 0,
          backgroundColor: 'red',
          borderRadius: 8,
          width: 16,
          height: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 10 }}>•</Text>
      </View>
    )}
  </TouchableOpacity>
);

const ProfileButton = () => (
  <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
    <FontAwesome name="user-circle-o" size={28} color="#000" />
  </TouchableOpacity>
);

useEffect(() => {
  const unsubscribe = onSnapshot(
    query(collection(FIRESTORE_DB, 'notifications'), where('read', '==', false)),
    (snapshot) => {
      const hasNew = snapshot.docs.length > 0;
      setHasNewNotifications(hasNew);
    },
    (error) => {
      console.error('Error listening to new notifications:', error);
    }
  );

  // Remova o observador quando o componente for desmontado
  return () => {
    unsubscribe();
  };
}, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#add185' },
        headerTitleAlign: 'center',
        headerLeft: () => <ProfileButton />,
        headerRight: () => <NotificationIcon hasNewNotifications={hasNewNotifications} />,
      }}
    >
         {redirectToHome ? (
        <>
          <Stack.Screen name="Home" component={Home} options={{ title: 'Tela Inicial' }} />
          <Stack.Screen name="Profile" component={Profile} options={{ title: 'Perfil' }} />
          <Stack.Screen name="Store" component={StoreReverseLogistics} options={{ title: 'Solicitação de Pedido' }} />
          <Stack.Screen name='ProductReverseLogistics' component={ProductReverseLogistics} options={ ({route}) => {({ title: route.params?.storeName || 'Produto', })} } />
          <Stack.Screen name='Orders' component={Orders} options={{ title: 'Pedidos' }} />
          <Stack.Screen name="Shop" component={Shop} options={{ title: 'Shop' }} />
          <Stack.Screen name='OrderApproval' component={OrderApproval} options={{ title: 'Aprovação de pedido' }} />
          <Stack.Screen name='Notifications' component={Notifications} options={{ title: 'Notificações' }} />
        </> 
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}