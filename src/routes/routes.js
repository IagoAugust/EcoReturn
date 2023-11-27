import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
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

const Stack = createNativeStackNavigator();

export function Routes() {
  const { redirectToHome } = useAuth();
  const navigation = useNavigation();

  const ProfileButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <FontAwesome name="user-circle-o" size={28} color="#000" />
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#add185' },
        headerTitleAlign: 'center',
        headerLeft: () => <ProfileButton />,
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
