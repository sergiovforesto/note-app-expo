import * as FileSystem from 'expo-file-system';
import { Note } from '../../interfaces/note-interface';

interface Props {
    setNotes: (note: Note[]) => void;
}


export const readNotes = async ({setNotes}:Props) => {

    try {
        const notesDir = `${FileSystem.documentDirectory}todo/`;
        const files = await FileSystem.readDirectoryAsync(notesDir);
        const notesContent: Note[] = [];


        for (const file of files) {
            const fileUri = `${notesDir}${file}`;

            const fileInfo = await FileSystem.getInfoAsync(fileUri);
            if (!fileInfo.exists) {
                console.warn('Archivo no encontrado:', fileUri);
                continue;
            }

            const content = await FileSystem.readAsStringAsync(fileUri);
            const lines = content.split('\n'); 
            const title = lines[0].replace('Título: ', '');
            const fecha = lines[1].replace('Fecha: ', '');
            const text = lines.slice(2).join('\n');

            
            
            notesContent.push({ id: file, title, text, fecha });
        }

        if (notesContent.length === 0) {
            setNotes([]);
        } else {
            setNotes(notesContent);
        }


    } catch (error) {
        console.error('Error al leer las notas:', error);
    }
};