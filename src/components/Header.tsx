import { Pressable, StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dark, globalThemes } from '../config/global-themes';


interface Props {
  icon?: string | any;
  color?: string;
  iconLeft?: boolean;
  onPress?: () => void;
}


export default function Header({icon, color = Dark, onPress, iconLeft}:Props) {
  return (
    <View style={[styles.header, {justifyContent: iconLeft ? 'flex-start' : 'flex-end'}]}>
      <Pressable 
        onPress={onPress}
        style={({pressed}) => [
          {
            padding: 5,
            alignItems: 'center'
          },
          pressed && globalThemes.buttonHover
        ]}
      >
        <Ionicons size={24} name={icon} color={color} />
      </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },


});