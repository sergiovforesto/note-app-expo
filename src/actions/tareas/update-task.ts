import * as FileSystem from 'expo-file-system';
import { Tarea, TareaInterface } from '@/src/interfaces/tarea-interface';

interface Props {
    id: string;
    tarea: TareaInterface;
    setTarea?: (value:  TareaInterface) => void;
    setShowUpdateButton?: (value: boolean) => void;
}

export const updateTarea = async ({ id, tarea, setTarea, setShowUpdateButton }: Props) => {
    const fileName = id; 
    const fileUri = `${FileSystem.documentDirectory}tarea/${fileName}.txt`; 
    
    
    try {
        
        const tareaContent = `id: ${id}\ntexto: ${tarea.texto}\ncompletado: ${tarea.completado}`;

        await FileSystem.writeAsStringAsync(fileUri, tareaContent);
        console.log('Tarea actualizada');
        // console.log('Tarea actualizada en:', fileUri);

        setTarea!({id: '', texto: '', completado: false})
        setShowUpdateButton!(false)
    } catch (error) {
        console.error('Error al guardar la tarea:', error);
    }
};