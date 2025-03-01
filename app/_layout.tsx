import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { tareaDirectory, todoDirectory } from '@/src/actions/directory/initials-directory';

export default function RootLayout() {


  useEffect(() => {
    
    const initializeDirectories = async () => {
      try {
        await Promise.all([todoDirectory(), tareaDirectory()]);
      } catch (error) {
        console.error('Error al inicializar los directorios', error);
      }
    };

    initializeDirectories();
    
  }, [])

  return (
    <>
    
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            
          }} 
        />
        <Stack.Screen 
          name="notas/index" 
          options={{ 
            headerShown: false,
          }} 
        />

        <Stack.Screen 
          name="info/index" 
          options={{ 
            headerShown: false,
          }} 
        />


        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  )
    
}
