import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';

import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import GlobalContainer from '@/src/components/GlobalContainer';
import { BACKGROUNDGLOBAL, Dark, globalThemes, PRIMARY} from '@/src/config/global-themes';
import { getCurrentTime } from '@/src/helpers/get-current-time';
import { NoteInterface } from '@/src/interfaces/note-interface';
import { createNote } from '@/src/actions/notas/create-note';


export default function NotasScreen() {

  const [note, setNote] = useState<NoteInterface>({
    titulo: '',
    texto: '',
    fecha: ''
  });


  const [caracteres, setCaracteres] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (note.titulo.length > 0 || note.texto.length > 0) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [note.titulo, note.texto]);


  useEffect(() => {
    if (note.fecha === '') {
      setNote(prevNote => ({
        ...prevNote,
        fecha: getCurrentTime()
      }));
    }
  }, [note.fecha]);



  const handleTituloChange = (text: string) => {
    setNote(prevNote => ({
      ...prevNote,
      titulo: text
    }));
  };

  const handleTextoChange = (text: string) => {
    setNote(prevNote => ({
      ...prevNote,
      texto: text
    }));
    setCaracteres(text.length);
  };

  

  return (
    <GlobalContainer style={{backgroundColor: BACKGROUNDGLOBAL}}>
      <View style={globalThemes.headerNotas}>
        <Pressable 
          onPress={() => router.back()}
          style={({ pressed }) => [
            {
              padding: 5,
              alignItems: 'center'
            },
            pressed && globalThemes.buttonHover,
          ]}
        >
          <Ionicons size={24} name={'arrow-back-outline'} color={Dark} />
        </Pressable>


        {
          showButton && (
            <Pressable 
              onPress={() => createNote({note, setNote})}
              style={({ pressed }) => [
                {
                
                  padding: 5,
                  alignItems: 'center'
                },
                pressed && globalThemes.buttonHover,
              ]}
            >
              <Ionicons size={24} name={'checkmark'} color={Dark} />
            </Pressable>
          )
        }
      </View>

      <View style={{paddingHorizontal: 10,}}>
        <TextInput
          placeholder='Titulo'
          onChangeText={handleTituloChange}
          value={note.titulo}
          style={globalThemes.inputTitle}
          placeholderTextColor="#aaaaaa"
          selectionColor={PRIMARY}
        />

        <View>
          <Text style={globalThemes.currentDate}>{getCurrentTime()} | {caracteres + " caracteres"}</Text>
        </View>


        <View>
          <TextInput
            placeholder='Escribe tu nota aquí...'
            onChangeText={handleTextoChange}
            value={note.texto}
            style={globalThemes.inputDescription}
            placeholderTextColor="#aaaaaa"
            selectionColor={PRIMARY}
            multiline
            
          />
        </View>

      </View>

    </GlobalContainer>
  );
}


