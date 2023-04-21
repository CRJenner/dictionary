import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native';
import {images} from "./assets/images"

export default function App() {
const image = images.sky

const [newWord, setNewWord] = useState('')
const[checkedWord, setCheckedWord] = useState('')
const[definition, setDefinition] = useState('')
const[example, setExample] = useState('')

const searchWord= (enteredWord)=> {
  setNewWord(enteredWord)
}

getInfo = () => {
  let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + newWord;

  return fetch(url)
  .then((data) => {
    return data.json()
  })
  .then((response) => {
    let word = response[0].word
    setCheckedWord(word);
    
    let def = response[0].meanings[0].definitions[0].definition
    setDefinition(def)
    let ex = response[0].meanings[0].definitions[0].example
    setExample(ex)
    
  })
}

  return (
    <View style={styles.container}>
      <ImageBackground
      style={{flex: 1}}
      resizeMode="cover"
      source={image}>
      <View style={{flex:0.8}}>
        <View style={{justifyContent: 'center', alignItems: "center"}}>
          <TextInput 
          style={styles.inputBox}
          placeholder='search a word'
          placeholderTextColor={'grey'}
          textAlign="center"
          clearButtonMode='always'
          onChangeText={searchWord}
          value={newWord}
          >
          </TextInput>
        </View>
        <View style = {{
          flexDirection : 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          marginBottom: 20
        }
        }>
          <TouchableOpacity style={styles.buttons}
          onPress={() => {
            getInfo()
          }}>
            <Text style={styles.buttonText}>Go !</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('./assets/Speaker.png')} style={styles.speakerButton}/>
          </TouchableOpacity>
        </View>
        <View>
          <Text>entered word: {checkedWord}</Text>
          <Text> Defintion : {definition}</Text>
          <Text> Example : {example} </Text>
        </View>
      </View>
      
      <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  inputBox:{
    width: "80%",
    height: 50,
    borderWidth:5,
    borderColor: "blue",
    marginTop:100,
    fontSize:25
  },
  speakerButton: {
    height:40,
    width: 50
  },
  buttons: {
    borderRadius: 30,
    borderWidth: 1,    
    borderColor: 'black',
    width: '20%'

  },
  buttonText: {
    fontSize: 25,
    alignSelf: 'center',
    marginTop:5
  }
});
