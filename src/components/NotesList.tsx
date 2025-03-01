import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native"
import { Dark, LIGHTGRAY, WHITE } from "../config/global-themes"
import { useState } from "react";
import { router } from "expo-router";
import { Note } from "../interfaces/note-interface";


interface Props {
  notes: Note[];
  readNotes: () => Promise<void>;
}

export default function NotesList({notes, readNotes}:Props) {
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    if(notes.length === 0) return
    await readNotes(); 
    
    setRefreshing(false);
  };

  const getPreviewText = (text: string, words: number = 15) => {
    const lines = text.trim().split(' ')
    if(lines.length <= 8) return lines.join(' ')
    const shortText = lines.slice(0, words).join(' ').concat('...')
    return shortText;
  };


  return (
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      style={{ marginBottom: 180 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {
        notes.length === 0 ? (
          <View style={styles.noNotesContainer}>
            <Text style={styles.noNotesText}>No hay notas disponibles.</Text>
          </View>
        ) : (
          notes.map((note: Note) => (
            <Pressable
              key={note.id}
              onPress={() => router.push(`/notas/${note.id}`)}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.5 : 1
                },
                styles.noteContainer,
              ]}
            >
              <Text style={styles.noteTitle}>{note.title}</Text>
              <Text style={styles.noteDescription}>{getPreviewText(note.text)}</Text>
              <Text style={styles.noteDate}>{note.fecha}</Text>
            </Pressable>
          ))
        )
      }
    </ScrollView>
  );
}


const styles = StyleSheet.create({

  
  noteContainer: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 13,
    backgroundColor: WHITE,
    padding: 20,
    
  },

  noteTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Dark,
    marginBottom: 3,
    
  },

  noteDescription: {
    fontSize: 14,
    marginBottom: 6,
    color: '#636366',
    lineHeight: 20,
  },

  noteDate: {
    fontSize: 10,
    fontWeight: 500,
    color: LIGHTGRAY
  },

  noNotesContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noNotesText: {
    fontSize: 18,
    color: 'gray',
  }
})


