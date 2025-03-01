import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import { NoteInterface } from '../../interfaces/note-interface';


interface Props {
    fileName: string | string[];
    setNote: (note: NoteInterface) => void;
    setOriginalNote: (note: NoteInterface) => void;
    setCaracteres: (length: number) => void;
}



export const getNoteById = async ({fileName, setNote, setOriginalNote, setCaracteres}:Props) => {
    try {
        const fileUri = `${FileSystem.documentDirectory}todo/${fileName}`;

        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        
        if (!fileInfo.exists) {
            console.warn('Archivo no encontrado:', fileUri);
            router.push('/(tabs)'); // Redirigir al usuario a la pantalla principal
            return;
        }


        const fileContent = await FileSystem.readAsStringAsync(fileUri);

        const lines = fileContent.split('\n'); 
        const title = lines[0].replace('Título: ', '');
        const fecha = lines[1].replace('Fecha: ', '');
        const text = lines.slice(2).join('\n');

        const loadedNote = {
            titulo: title,
            texto: text,
            fecha
        };

        setNote(loadedNote);
        setOriginalNote(loadedNote);
        setCaracteres(text.length);
    } catch (error) {
        console.error('Error leyendo el archivo:', error);
    }
};