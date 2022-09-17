import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import Scanner from './pages/Scanner';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {persistStore} from 'redux-persist';
import {ApolloProvider} from '@apollo/client';
import apolloClient from './lib/apollo';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from './pages/Settings';
import Icon from 'react-native-vector-icons/Ionicons';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import Cartridges from './pages/Cartridges';
import Inventory from 'pages/inventory/Inventory';
import Docs from 'pages/docs/Docs';
import PageHeader from 'components/PageHeader/PageHeader';
import Home from 'pages/Home';
import InventoryStatus from 'pages/inventory/InventoryScans';
import DocsEdit from 'pages/docs/DocsEdit';

export type RootStackParamList = {
  HomeScreens: undefined;
  Cartridges: undefined;
  InventoryStack: NavigatorScreenParams<InventoryParamList>;
  HomeTabs: undefined;
  Scanner: {setScan: (data: string) => void};
  Settings: undefined;
  Home: undefined;
  DocsStack: NavigatorScreenParams<DocsParamList>;
};

export type InventoryParamList = {
  Inventory: undefined;
  InventoryScans: undefined;
};

export type DocsParamList = {
  Docs: undefined;
  DocsEdit: {id: number; title: string};
};

function HomeScreens() {
  const HomeStack = createStackNavigator<RootStackParamList>();

  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Главная',
          header: props => <PageHeader {...props} />,
        }}
      />
      <HomeStack.Screen
        name="InventoryStack"
        component={InventoryStack}
        options={{
          header: props => <></>,
        }}
      />
      <HomeStack.Screen
        name="DocsStack"
        component={DocsStack}
        options={{
          title: 'Документооборот',
          header: props => <PageHeader {...props} />,
        }}
      />
      <HomeStack.Screen
        name="Cartridges"
        component={Cartridges}
        options={{
          title: 'Картриджи',
          header: props => <PageHeader {...props} />,
        }}
      />
    </HomeStack.Navigator>
  );
}

const DocsStack = () => {
  const DocsNav = createStackNavigator<DocsParamList>();
  return (
    <DocsNav.Navigator initialRouteName="Docs">
      <DocsNav.Screen
        name="Docs"
        component={Docs}
        options={{
          title: 'Документооборот',
          // header: props => <PageHeader {...props} />,
          header: props => <></>,
        }}
      />
      <DocsNav.Screen
        name="DocsEdit"
        component={DocsEdit}
        options={({route}) => ({
          title: route.params.title,
          header: props => <PageHeader {...props} />,
        })}
      />
    </DocsNav.Navigator>
  );
};

const InventoryStack = () => {
  const InventoryNav = createStackNavigator<InventoryParamList>();
  return (
    <InventoryNav.Navigator initialRouteName="Inventory">
      <InventoryNav.Screen
        name="Inventory"
        component={Inventory}
        options={{
          title: 'Инвентаризация',
          header: props => <PageHeader {...props} />,
        }}
      />
      <InventoryNav.Screen
        name="InventoryScans"
        options={{
          title: 'Сканирования',
          header: props => <PageHeader {...props} />,
        }}
        component={InventoryStatus}
      />
    </InventoryNav.Navigator>
  );
};

const Tabs = () => {
  const Tab = createBottomTabNavigator<RootStackParamList>();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreens"
        component={HomeScreens}
        options={{
          title: 'Главная',
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
          header: props => <></>,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Настройки',
          tabBarIcon: ({color, size}) => (
            <Icon name="settings-outline" size={size} color={color} />
          ),
          header: props => <PageHeader {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  const RootStack = createStackNavigator<RootStackParamList>();

  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={apolloClient}>
          <PaperProvider>
            <NavigationContainer>
              <RootStack.Navigator>
                <RootStack.Group>
                  <RootStack.Screen
                    name="HomeTabs"
                    component={Tabs}
                    options={{headerShown: false}}
                  />
                </RootStack.Group>
                <RootStack.Group screenOptions={{presentation: 'modal'}}>
                  <RootStack.Screen
                    name="Scanner"
                    options={{
                      headerShown: false,
                    }}
                    component={Scanner}
                  />
                </RootStack.Group>
              </RootStack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
