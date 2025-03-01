import { Animated, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PRIMARY, WHITE } from "../config/global-themes";
import { useRef, useEffect } from "react";
import { useNavigationState } from "@react-navigation/native";


interface Props {
  onPress?: () => void;
}

export default function AddButton({onPress}: Props) {

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const routeName = useNavigationState(state => {
    const route = state.routes[state.index];
    return route.name;
  });

  useEffect(() => {
    fadeAnim.setValue(0);
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();

  }, [routeName,fadeAnim]);

  

    
  return (

    <Animated.View style={{ ...styles.buttonContainer, opacity: fadeAnim }}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#dc9c3d' : PRIMARY },
        ]}
      >
        <Ionicons name="add" size={32} color={WHITE} />
      </Pressable>
    </Animated.View>
  )
}


const styles = StyleSheet.create({

  buttonContainer: {
    position: 'absolute',
    right: 35,
    bottom: 50,
    zIndex: 10,
  },

  buttonHovered: {
    backgroundColor: '#dc9c3d', 
  },

  button: {
    padding: 15,
    borderRadius: 100, 
  },
})
