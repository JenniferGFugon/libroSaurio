import react from "react";

import { Container, Right, Content, Footer } from "native-base";
import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, Image, Dimensions,FlatList, ImageBackground } from "react-native";
import {Input, Title, Item, H1, Button, Header, Icon, Spinner, Card, CardItem, H3, Body, Left, Thumbnail} from "native-base";

import backend from "../api/backend";
import getEnvVars from "../../enviroment";
const { width, height } = Dimensions.get("window");
const { apiUrl , apiImageUrl, apiImageSize } = getEnvVars();
import { TouchableOpacity } from "react-native-gesture-handler";


const searchScreen = ({ route, navigation }) => {
    const { search } = route.params;
    const [books, setBooks] = useState(null);
    const [error, setError] = useState(false);

    async function getSearchBooks() {
        try {
          const response = await backend.get(`${apiUrl}?keyword=${search}&lang=spanish`);  
          setBooks(response.data);
        } catch (error) {
          setError(true);
        }
    }


    useEffect(() => {
        getSearchBooks();
    }, []);

    
    // Verifica si el usuario ingresa información en el input de búsqueda

    if (!books) {
        return (
          <View style={{flex: 1, justifyContent: "center"}}>
            <Spinner color="green" />
          </View>
        )
      }
  
 
    console.log(books);

 
    return (
        <Container>
           
                <ImageBackground style={styles.Fondo} source={require("../../assets/fondo.jpeg")}>
                    <Text>
                        <H1 style={styles.estiloH1}>Resultados de la Búsqueda</H1>
                    </Text> 
                    <FlatList
                  data={books}
                  keyExtractor={(item) => {
                    return item.ID;
                  }}
                  ListEmptyComponent={<Text>¡No se han encontrado libros!</Text>}
                  renderItem={({ item }) => {
                    return (
                      <View >
                          <TouchableOpacity onPress={() => navigation.navigate("infoScreen")}>
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
                        </TouchableOpacity>
                    </View>
                    )
                  }}
                />
                </ImageBackground>
                
         
        </Container>
    );
}

const styles = StyleSheet.create({
    Fondo: {
      width: width,
      height: height,
    },

    estiloH1: {
       color: '#f2f2f2',
       textAlign: "center",
    },

    icono: {
        width: 19, 
    },

    boton:{
        backgroundColor: "green",
        width: 50,
        height: 40,
        marginTop: 5,
    },

    header: {
        backgroundColor: '#fff',
      },
      bookImage: {
        width: width * 0.99,
        height: height * 0.75,
      },
  });

export default searchScreen;