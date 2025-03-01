import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import { NoteInterface } from '../../interfaces/note-interface';

interface Props {
    id: string | string[];
    note: NoteInterface;
    setNote: (note: NoteInterface) => void;
}

export const updateNote = async({id, note, setNote}:Props) => {

    const fileName = Array.isArray(id) ? id[0] : id;
    const fileUri = `${FileSystem.documentDirectory}todo/${fileName}`;

    try {
        
        const noteContent = `Título: ${note.titulo}\nFecha: ${note.fecha}\n${note.texto}`;

        
        await FileSystem.writeAsStringAsync(fileUri, noteContent);
        console.log('Nota actualizada en:', fileUri);

        
        router.push('/');
        
        setNote({ titulo: '', texto: '', fecha: '' });
    } catch (error) {
        console.error('Error al guardar la nota:', error);
    }
}