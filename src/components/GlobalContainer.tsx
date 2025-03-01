import React, { PropsWithChildren } from 'react'
import { Platform, StyleProp, View, ViewStyle } from 'react-native';

interface Props extends PropsWithChildren {
    style?: StyleProp<ViewStyle>;

}

export default function GlobalContainer({style, children}:Props) {
  return (
    <View 
        style={[
            {
                flex: 1,
                padding: 16,
                paddingTop: Platform.OS === 'android' ? 25 : 0,
            },
            style
        ]}
    >
        {children}
    </View>
  )
}
