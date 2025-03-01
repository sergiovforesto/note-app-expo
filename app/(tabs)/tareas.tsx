import GlobalContainer from '@/src/components/GlobalContainer';
import Header from '@/src/components/Header';
import { TareasList } from '@/src/components/TareasList';
import Title from '@/src/components/Title';
import { BACKGROUNDGLOBAL } from '@/src/config/global-themes';
import { router } from 'expo-router';
import { StyleSheet, View, Text, DeviceEventEmitter,} from 'react-native';
import * as Haptics from 'expo-haptics';
import AddButton from '@/src/components/AddButton';
import { InputTarea } from '@/src/components/InputTarea';
import { useEffect, useState } from 'react';
import { Tarea, TareaInterface } from '@/src/interfaces/tarea-interface';
import { readTareas } from '@/src/actions/tareas/read-tasks';
import { ModalAlert } from '@/src/components/modal/ModalAlert';
import { deleteTarea } from '@/src/actions/tareas/delete-task';


export default function TareasScreen() {


  const [tarea, setTarea] = useState<TareaInterface>({
    id: '',
    texto: '',
    completado: false,
  })
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [showdeleteButton, setShowDeleteButton] = useState(false);
  const [showInput, setOpenInput] = useState(false)
  const [wishDelete, setWishDelete] = useState(false);

  const getTareas = async() => {
    await readTareas({setTareas})
  }
  useEffect(() => {
    getTareas()


    const tareaDeletedListener = DeviceEventEmitter.addListener('tareaDeleted', (id) => {
      
      setTareas(prevTarea => prevTarea.filter(tarea => tarea.id !== id));
    });

    
    return () => {
      tareaDeletedListener.remove();
    };
  }, [])

  

  return (
    <GlobalContainer style={{backgroundColor: BACKGROUNDGLOBAL}}>
      <Header icon={'information-circle-outline'} onPress={() => router.push('/info')}/>

      
      <AddButton onPress={() => (
        Haptics.impactAsync(),
        setTarea({ id: '', texto: '', completado: false }),
        setOpenInput(true)
      )}/>
      

      <InputTarea 
        transparent
        showInput={showInput}
        setOpenInput={setOpenInput}
        tarea={tarea}
        updateButton={showUpdateButton}
        setShowUpdateButton={setShowUpdateButton}
        setShowDeleteButton={setShowDeleteButton}
        deleteButton={showdeleteButton}
        setTarea={setTarea}
        getTareas={getTareas}
        setOpenAlert={() => setWishDelete(!wishDelete)} 

      />

      <View style={styles.container}>

        <Title title='Tareas'/>

        <View style={{marginBottom: 10}}/>

        <TareasList 
          tareas={tareas}
          setTarea={setTarea}
          readTareas={() => readTareas({setTareas})}
          setShowUpdateButton={setShowUpdateButton}
          showInput={showInput}
          setOpenInput={setOpenInput}
        />
        

        <ModalAlert
          title='Eliminar Tareas'
          subTitle='¿Desea eliminar esta tarea?'
          isTask={true}
          transparent 
          showAlert={wishDelete} 
          setOpenAlert={() => setWishDelete(!wishDelete)} 
          deleteTarea={() => deleteTarea({id: tarea.id, setWishDelete})}
        />

      </View>
    </GlobalContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal: 10
  },
});
