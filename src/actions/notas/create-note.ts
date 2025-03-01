import * as FileSystem from 'expo-file-system';
import { NoteInterface } from '../../interfaces/note-interface';
import { router } from 'expo-router';

interface Props {
  note: NoteInterface;
  setNote: (note: NoteInterface) => void;
}

export const createNote = async({note, setNote}: Props) => {

  const dirUri = `${FileSystem.documentDirectory}todo`;
  const fileUri = `${dirUri}/${note.titulo}.txt`;
  

  try {
    await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
    const noteContent = `Título: ${note.titulo}\nFecha: ${note.fecha}\n ${note.texto}`
    await FileSystem.writeAsStringAsync(fileUri, noteContent);
    router.push('/')
    setNote({titulo: '', texto: '', fecha: ''})
    

  } catch (error) {
    console.error('Error al guardar la nota:', error);
  }

}