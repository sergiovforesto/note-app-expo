
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { Dark, WHITE } from '../config/global-themes'

export default function Folders() {
  return (
    <View style={{marginBottom: 2}}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true} 
        style={styles.folderContainer}
      >
        {
          folders.map(({nameFolder, id}) => (
            <Text key={id} style={styles.folderText}>{nameFolder}</Text>
          ))
        }
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
    folderContainer: {
      width: '100%',
      paddingVertical: 10
        
    },
    
    folderText: {
      backgroundColor: WHITE,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginRight: 10,
      color: Dark,
      fontWeight: 'bold'
    },
})

const folders = [
  {
    id: 1,
    nameFolder: 'Todo'
  },

  {
    id: 2,
    nameFolder: 'lista de regalos'
  },

  {
    id: 3,
    nameFolder: 'sin categoria'
  },

  {
    id: 4,
    nameFolder: 'Examen de fisica'
  },

  {
    id: 5,
    nameFolder: 'Notas de ingles'
  },

  {
    id: 6,
    nameFolder: 'Notas de castellano'
  },    
]