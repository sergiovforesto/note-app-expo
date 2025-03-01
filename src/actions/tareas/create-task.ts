import { TareaInterface } from '@/src/interfaces/tarea-interface';
import * as FileSystem from 'expo-file-system';
import { readTareas } from './read-tasks';

interface Props {
  tarea: TareaInterface;
  setTarea: (value:  TareaInterface) => void;
}

export const createTarea = async({tarea, setTarea}: Props) => {

  tarea.id = Date.now().toString()

  const todoUri = `${FileSystem.documentDirectory}tarea`;
  const fileUri = `${todoUri}/${tarea.id}.txt`;

  try {
    
    const noteContent = `id: ${tarea.id}\ntexto: ${tarea.texto}\ncompletado: ${false}`
    await FileSystem.writeAsStringAsync(fileUri, noteContent);
    
    console.log('tarea guardada');
    // console.log('tarea guardada en:', fileUri);
    setTarea({id: '', texto: '', completado: false})
  } catch (error) {
    console.error('Error al guardar la nota:', error);
  }

}