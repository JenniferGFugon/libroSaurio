import { Container } from "native-base";
import React, { useEffect, useState } from "react";

import react from "react";
import { StyleSheet, Text, View } from 'react-native';
import {
  Input,
  Item,
  H1,
  Button,
  Header,
  Icon,
  Spinner,
  Card,
  CardItem,
  H3,
  Body,
  Left,
  Thumbnail
  
} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
const { apiUrl , apiImageUrl, apiImageSize } = getEnvVars();

  const mainScreen = ({ navigation }) => { 
<<<<<<< HEAD
     
    const [books, setBooks] = useState(null);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");


    function getBooks() {
        try {
          const response = await backend.get(`${apiUrl}?category=libros_programacion&criteria=featured`);
    
          setBooks(response.data);
        } catch (error) {
          setError(true);
        }
      }
    
    // Hook de efecto
    useEffect(() => {
        getBooks();
    }, []);

  if (!books) {
    return (
      <View style={{flex: 1, justifyContent: "center"}}>
        <Spinner color="blue" />
      </View>
    )
  }

    
    
    
    
    
    return (

        <Container>
=======
      return (
        <Container style={{backgroundColor: '#2da144'}}>
>>>>>>> f6914b5116291f41ec3fc1e4d45af2678560499c
            <Header >
            <Left>
            <Thumbnail square small source={require("../../assets/logo.jpg")} />

            </Left>
            <Body>
                <Text>libroSaurio</Text>
            </Body>
        
            </Header>
            <Body>
                <Text style = {styles.text} > TOPS EN PROGRAMACION </Text>
            </Body>
        
        </Container>
      )
   };



   const styles = StyleSheet.create({
    header: {
      flex: 1,
      backgroundColor: '#1B241D',
    },

    text: {
        fontFamily: 'serif',
        fontSize: 25,
        marginTop: 5,
        textAlign: "center"
    
    }
   
  });


export default mainScreen;
    