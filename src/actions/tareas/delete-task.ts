import * as FileSystem from 'expo-file-system';
import { DeviceEventEmitter } from 'react-native';


interface Props {
    id: string;
    setWishDelete: (value: boolean) => void;
}


export const deleteTarea = async({id, setWishDelete}:Props) => {

    const fileName = `${FileSystem.documentDirectory}tarea/${id}.txt`


    try {
        const fileInfo = await FileSystem.getInfoAsync(fileName);
    
        console.log('File Information:', fileInfo);

        if(fileInfo.exists) {
            await FileSystem.deleteAsync(fileName)
            console.log('Tarea borrada correctamente');
            
            DeviceEventEmitter.emit('tareaDeleted', id);
        } else {
            console.log('Archivo no existe');
        }

        setWishDelete(false)

        

    } catch (error) {
        console.error('Error al borrar archivo: (tarea)', error);
    }
        
}