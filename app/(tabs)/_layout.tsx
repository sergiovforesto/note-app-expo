import Ionicons from '@expo/vector-icons/Ionicons';
import { BACKGROUNDGLOBAL, GRAY, LIGHTBLACK } from '@/src/config/global-themes';


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NotasScreen from '.';
import TareasScreen from './tareas';


const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {


  return (
    
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: LIGHTBLACK,
        tabBarInactiveTintColor: GRAY,
        tabBarIndicatorStyle: {
          backgroundColor: LIGHTBLACK,
          height: 0,
        },
        tabBarStyle: {
          backgroundColor: BACKGROUNDGLOBAL,
          shadowColor: BACKGROUNDGLOBAL,
          borderColor: GRAY,
          height: 70
        },
        
        
        swipeEnabled: true,
      }}
      tabBarPosition='bottom'
    >
      <Tab.Screen
        name="index"
        options={{
          title: 'Notes',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="reader" color={color} />,
        }}
        component={NotasScreen}
      />
      <Tab.Screen
        name="tareas"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="checkbox" color={color} />,
        }}
        component={TareasScreen}
      />
    </Tab.Navigator>
    
  );
}
