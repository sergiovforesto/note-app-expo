import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import GlobalContainer from '@/src/components/GlobalContainer'
import Header from '@/src/components/Header'
import Title from '@/src/components/Title'
import { BACKGROUNDGLOBAL, Dark, } from '@/src/config/global-themes'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'

export default function InfoScreen() {
  return (
    <GlobalContainer style={{backgroundColor: BACKGROUNDGLOBAL}}>
      

      <Pressable 
        onPress={() => router.back()}
        style={() => [
          {
            marginTop: 20,
            marginBottom: 20,
            padding: 5,
          },
          
        ]}
      >
        <Ionicons size={24} name={'arrow-back-outline'} color={Dark} />
      </Pressable>
      

      
      <View style={{paddingHorizontal: 10}}>
        <Title title='Sobre mi'/>

        <View>
          <View style={style.containerImage}>
            <Image 
              source={require('../../assets/profile.png')}
              style={style.image}
            />
          </View>

          <View>
            <Text style={[style.textCenter, style.title]}>Sergio Ventura</Text>
            <Text style={[style.subtitle, style.textCenter]}>💻FullStack Developer</Text>
            <Text style={[style.location, style.textCenter]}>📍 Caracas - Venezuela</Text>
          </View>

          <View style={style.social}>
            <Pressable onPress={() => router.push('https://www.linkedin.com/in/sergio-ventura/')}>
              <Ionicons name='logo-linkedin' size={34}/>
            </Pressable>

            <Pressable onPress={() => router.push('https://github.com/sergiovforesto')}>
              <Ionicons name='logo-github' size={34}/>
            </Pressable>

            <Pressable >
              <Ionicons name='link-outline' size={34}/>
            </Pressable>
          </View>

        </View>
      </View>


      
    </GlobalContainer>
  )
}



const style = StyleSheet.create({

  containerImage: {
    alignItems: 'center',
    paddingVertical: 30,
   
  },
  image: {
    borderRadius: 100, 
    width: 160,       
    height: 160,      
    resizeMode: 'contain',
    backgroundColor: "#20216C",
    

  },

  title: {
    fontSize: 34,
    fontWeight: '500',
    color: Dark
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
    color: '#747373'
  },

  location: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 6,
    color: '#747373'
  },

  textCenter: {
    textAlign: 'center',
  },

  social: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginTop: 25

  }
})