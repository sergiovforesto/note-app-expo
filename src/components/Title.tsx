import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";


interface Props {
  title: string;
  style?: StyleProp<TextStyle>;
}

export default function Title({title, style}:Props) {
  return (
    <View>
      <Text style={[styles.title, style]}>
        {title}
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({

  title: {
    fontSize: 34,
    fontWeight: 300,
    color: '#2C2C2E'
  }
});