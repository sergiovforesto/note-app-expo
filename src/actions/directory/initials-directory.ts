import * as FileSystem from 'expo-file-system';


const todoDirectory = async() => {

    const todoDir = `${FileSystem.documentDirectory}todo`

    try {
        const dirExist =  await FileSystem.getInfoAsync(todoDir)

    if(dirExist.exists) return;

        await FileSystem.makeDirectoryAsync(todoDir)
    
    } catch (error) {
        console.error('Error al cargar el directorio (todoDirectory())', error);
    }
}

const tareaDirectory = async() => {

    const todoDir = `${FileSystem.documentDirectory}tarea`

    try {
        const dirExist =  await FileSystem.getInfoAsync(todoDir)

        if(dirExist.exists) return;

        await FileSystem.makeDirectoryAsync(todoDir)
    
    } catch (error) {
        console.error('Error al cargar el directorio (tareaDirectory)', error);
    }
}


export {
    todoDirectory,
    tareaDirectory
}