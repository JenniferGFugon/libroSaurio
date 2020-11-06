import { Container, Right } from "native-base";
import React, { useEffect, useState } from "react";

import react from "react";

import { StyleSheet, Text, View, Image, Dimensions,FlatList } from "react-native";
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
import { color, greaterThan } from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

const { apiUrl , apiImageUrl, apiImageSize } = getEnvVars();

  const mainScreen = ({ navigation }) => { 
     
    const [books, setBooks] = useState(null);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");


    async function getBooks() {
        try {
          const response = await backend.get(`${apiUrl}?category=libros_programacion&criteria=featured&lang=spanish`);
    
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
        <Spinner color="green" />
      </View>
    )
  }

    

      return (
        <Container  style={{backgroundColor: 'black'}}>
            <Header style={styles.header} >
              <Left>
                <Image source={require("../../assets/logo_computadora.png")} style={styles.logoImage} />
              </Left>
              <Body>
                <Image source={require("../../assets/logo_letras.png")} style={styles.letrasImage} />
              </Body>
              <Right>
                <Icon name="menu" style={styles.icono} onPress={() => {navigation.navigate("searchScreen")}} />
              </Right>
            </Header>
            
                <Text style = {styles.text} > TOPS EN PROGRAMACIÓN </Text>
                <FlatList
                  data={books}
                  keyExtractor={(item) => {
                    return item.ID;
                  }}
                  ListEmptyComponent={<Text>¡No se han encontrado libros!</Text>}
                  renderItem={({ item }) => {
                    return (
                      <View style={{backgroundColor: "black"}}>
                        <Card >
                        <CardItem header bordered style={{backgroundColor: "#0f630f"}}>
                            <H3 style={styles.tituloLibro}>{item.title}</H3>
                        </CardItem>                          
                          <CardItem cardBody bordered>
                          <Body>
                            <Image  source={{ uri: `${item.cover}` }} style={styles.bookImage} />
                         </Body>
                          </CardItem> 
                         
                          <CardItem footer bordered>
                            <Text style={styles.autoryPag} > {item.pages} Páginas</Text>
                            <Right>
                            <Text style={styles.autoryPag}> Autor: {item.author}</Text>
                            </Right>
                         </CardItem>
                         
                        </Card>
                    </View>
                    )
                  }}
                />
        
        </Container>
      )
  };

   const styles = StyleSheet.create({
    header: {
      backgroundColor: '#fff',
    },

    text: {
      fontFamily: 'Times New Roman',
      fontSize: 25,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 10,
      textAlign: "center",
      color: "#fff",
      backgroundColor: "#0f630f"
    },

    tituloLibro: {
      fontFamily: 'Times New Roman',
      fontSize: 19,
      fontWeight: "bold",
      justifyContent: "center",
      color: "#fff"
    },

    autoryPag: {
      fontFamily: 'Times New Roman',
      fontSize: 16,
      
    },

    bookImage: {
      width: width * 0.99,
      height: height * 0.75,
    },

    letrasImage: {
      width: 145,
      height: 23,
    },

    logoImage: {
      width: 50,
      height: 33,
    },

    icono: {
      color: "green",
      margin: 10,
    }
   
  });

export default mainScreen;
    