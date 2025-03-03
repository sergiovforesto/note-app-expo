import AddButton from '@/src/components/AddButton';
import GlobalContainer from '@/src/components/GlobalContainer';
import Header from '@/src/components/Header';
import NotesList from '@/src/components/NotesList';
import Title from '@/src/components/Title';
import { BACKGROUNDGLOBAL } from '@/src/config/global-themes';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { DeviceEventEmitter, StyleSheet, View } from 'react-native';
import { Note } from '@/src/interfaces/note-interface';
import { useEffect, useState } from 'react';
import { readNotes } from '@/src/actions/notas/read-notes';


export default function NotasScreen() {

  const [notes, setNotes] = useState<Note[]>([]);
  
  const router = useRouter()
  
  useEffect(() => {

    const getNotes = async() => {
      await readNotes({setNotes});
    }

    getNotes();

    const noteDeletedListener = DeviceEventEmitter.addListener('noteDeleted', (fileId) => {
      
      setNotes(prevNotes => prevNotes.filter(note => note.id !== fileId));
    });

    
    return () => {
      noteDeletedListener.remove();
    };
  }, []);
  
  
  

  return (

    <GlobalContainer style={{backgroundColor: BACKGROUNDGLOBAL}}>
      <Header icon={'information-circle-outline'} onPress={() => router.push('/info')}/>

      <AddButton onPress={() => (
        Haptics.impactAsync(),
        router.push('/notas')
      )}/>
        
      <View style={styles.container}>

        <Title title='Notes'/>

        <View style={{marginBottom: 10}}/>

        <NotesList notes={notes} readNotes={() => readNotes({ setNotes })}/>


      </View>
    </GlobalContainer>
  );
}

const styles = StyleSheet.create({

  container: {
    position: 'relative',
    paddingHorizontal: 10
  },

});




