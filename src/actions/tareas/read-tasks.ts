import * as FileSystem from 'expo-file-system';
import { Tarea } from '@/src/interfaces/tarea-interface';


interface Props {
    setTareas?: (tarea: Tarea[]) => void;
}


export const readTareas = async ({setTareas}:Props) => {

    try {
        const notesDir = `${FileSystem.documentDirectory}tarea/`;
        const files = await FileSystem.readDirectoryAsync(notesDir);
        const tareasContent: Tarea[] = [];


        for (const file of files) {
            const fileUri = `${notesDir}${file}`;

            const fileInfo = await FileSystem.getInfoAsync(fileUri);
            if (!fileInfo.exists) {
                console.warn('Archivo no encontrado:', fileUri);
                continue;
            }

            const content = await FileSystem.readAsStringAsync(fileUri);
            const lines = content.split('\n'); 
            const id = lines[0].replace('id: ', '');
            const texto = lines[1].replace('texto: ', '');
            const completado = JSON.parse(lines[2].replace('completado: ', '').toLowerCase());
            

            tareasContent.push({id, texto, completado});
        }

        if (setTareas) {
            if (tareasContent.length === 0) {
                setTareas([]);
            } else {
                setTareas(tareasContent);
            }
        } else {
            console.warn('setTareas no está definido');
        }


    } catch (error) {
        console.error('Error al leer las notas:', error);
    }
};