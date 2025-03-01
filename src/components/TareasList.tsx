import { useEffect, useState } from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Dark, GRAY, LIGHTGRAY, PRIMARY, WHITE } from '../config/global-themes';
import { Tarea, TareaInterface } from '../interfaces/tarea-interface';
import { updateTarea } from '../actions/tareas/update-task';


interface Props {
    tareas: Tarea[];
    showInput: boolean;
    setTarea: (tarea: TareaInterface) => void;
    setShowUpdateButton: (value: boolean) => void;
    readTareas: () => Promise<void>;
    setOpenInput: (value: boolean) => void;
}

export const TareasList = ({ 
    tareas = [], 
    setTarea, 
    readTareas, 
    setOpenInput, 
    showInput, 
    setShowUpdateButton, 
       
}: Props) => {

    const [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>({});
    const [refreshing, setRefreshing] = useState(false);

    const tareasNoCompletadas = tareas.filter((tarea) => !checkedStates[tarea.id]);
    const tareasCompletadas = tareas.filter((tarea) => checkedStates[tarea.id]);

    useEffect(() => {
        const newCheckedStates: { [key: string]: boolean } = {};

        tareas.forEach((tarea) => {
            newCheckedStates[tarea.id] = tarea.completado || false;
        });
        setCheckedStates(newCheckedStates);
    }, [tareas]);


    const onRefresh = async () => {
        setRefreshing(true);
        await readTareas();
        setRefreshing(false);
    };

    const handleCheckboxChange = async (id: string, isChecked: boolean) => {
        
        setCheckedStates((prevState) => ({
            ...prevState,
            [id]: isChecked,
        }));
        
        const tarea = tareas.find((t) => t.id === id);

        if (tarea) {
            const updatedTarea = { ...tarea, completado: isChecked };
            
            await updateTarea({ id, tarea: updatedTarea, setTarea, setShowUpdateButton });

        }
    };

    
    

    return (
        <FlatList
            data={[{ key: 'no-completadas', data: tareasNoCompletadas }, { key: 'completadas', data: tareasCompletadas }]}
            renderItem={({ item }) => (
                <View>
                    {item.data.length > 0 && (
                        <Text style={style.sectionTitle}>
                            {item.key === 'no-completadas' ? 'Tareas pendientes' : 'Tareas completadas'}
                        </Text>
                    )}

                    {item.key === 'no-completadas' && item.data.length === 0 ? (
                        <Text style={style.emptyMessage}>No hay tareas pendientes.</Text>
                    ) : (
                        item.data.map((tarea) => (
                            <View style={style.TareaContainer} key={tarea.id}>
                                <BouncyCheckbox
                                    size={28}
                                    fillColor={PRIMARY}
                                    unFillColor="#FFFFFF"
                                    disableText
                                    iconStyle={{ borderColor: LIGHTGRAY }}
                                    innerIconStyle={{ borderWidth: 2 }}
                                    isChecked={checkedStates[tarea.id] || false}
                                    onPress={(isChecked: boolean) => handleCheckboxChange(tarea.id, isChecked)}
                                    style={{padding: 10}}
                                />

                                <Pressable
                                    onPress={() => [
                                        setOpenInput(!showInput),
                                        setTarea(tarea),
                                        setShowUpdateButton(true)
                                    ]}
                                    style={style.textContainer}
                                >
                                    <Text 
                                        style={[style.buttonText, {textDecorationLine: item.key === 'completadas' ? 'line-through' : 'none',}]}
                                        numberOfLines={4}
                                        ellipsizeMode="tail"
                                    >
                                        {tarea.texto}
                                    </Text>
                                </Pressable>
                            </View>
                        ))
                    )}
                </View>
            )}
            keyExtractor={(item) => item.key}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 180 }}
        />
    );
};

const style = StyleSheet.create({
    TareaContainer: {
        marginTop: 10,
        borderRadius: 13,
        padding: 8,
        backgroundColor: WHITE,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
    },
    textContainer: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 10,
        color: LIGHTGRAY,
    },
    emptyMessage: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },

    buttonText: {
        fontSize: 16, 
        fontWeight: '400', 
        color: '#606060',
        flexWrap: 'wrap',
                                         
    }
});