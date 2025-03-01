import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import GlobalContainer from '@/src/components/GlobalContainer';
import { BACKGROUNDGLOBAL, globalThemes, Dark, PRIMARY } from '@/src/config/global-themes';
import { getCurrentTime } from '@/src/helpers/get-current-time';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NoteInterface } from '@/src/interfaces/note-interface';
import { ModalMenu } from '@/src/components/modal/Modal';
import { ModalAlert } from '@/src/components/modal/ModalAlert';
import { getNoteById } from '@/src/actions/notas/get-note-id';
import { updateNote } from '@/src/actions/notas/update-note';
import { deleteNote } from '@/src/actions/notas/delete-note';


export default function NotaById() {

    const [note, setNote] = useState<NoteInterface>({
        titulo: '',
        texto: '',
        fecha: ''
    });
    const [originalNote, setOriginalNote] = useState<NoteInterface>({
        titulo: '',
        texto: '',
        fecha: ''
    });
    const [caracteres, setCaracteres] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const [modalVisible, setOpenModal] = useState(false);
    const [wishDelete, setWishDelete] = useState(false);

    const {id} = useLocalSearchParams()
    const navigation = useNavigation();
    const router = useRouter();

    useEffect(() => {
        if (id) {
            const fileName = Array.isArray(id) ? id[0] : id;
            navigation.setOptions({ headerShown: false });

            getNoteById({fileName, setNote, setOriginalNote, setCaracteres});
        }

    }, [id, navigation]);

    
    useEffect(() => {
        if (note.titulo !== originalNote.titulo || note.texto !== originalNote.texto) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    }, [note, originalNote]);
      
      
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
            <View style={ globalThemes.headerNotas }>
                <Pressable 
                    onPress={() => router.back()}
                    style={({ pressed }) => [
                        {
                            padding: 5,
                            alignItems: 'center',
                            
                        },
                        pressed && globalThemes.buttonHover,
                    ]}
                >
                    <Ionicons size={24} name={'arrow-back-outline'} color={Dark} />
                </Pressable>
                

                <View style={{flexDirection: "row"}}> 
                    {
                        !showButton && (
                            <>
                                <Pressable 
                                    onPress={() => setOpenModal(true)}
                                    style={({ pressed }) => [
                                        {
                                            padding: 5,
                                            alignItems: 'center',
                                            
                                        },
                                        pressed && globalThemes.buttonHover,
                                    ]}
                                >
                                    <Ionicons size={22} name={'ellipsis-vertical'} color={Dark} />
                                </Pressable>

                                <ModalMenu 
                                    modalVisible={modalVisible}
                                    setOpenModal={() => setOpenModal(!modalVisible)}
                                    setWishDelete={() => (
                                        setOpenModal(!modalVisible),
                                        setWishDelete(!wishDelete)
                                    )}
                                    transparent
                                />

                                <ModalAlert 
                                    title='Eliminar Notas'
                                    subTitle='¿Eliminar esta nota?'
                                    isNote={true}
                                    transparent 
                                    showAlert={wishDelete} 
                                    setOpenAlert={() => setWishDelete(!wishDelete)} 
                                    deleteNote={() => deleteNote({ fileId: id, setWishDelete })}
                                />
                            </>
                            
                        )
                    }


                    {
                        showButton && (
                            <Pressable 
                                onPress={() => updateNote({ id, note, setNote })}
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
    )
}