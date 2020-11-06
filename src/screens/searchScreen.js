import react from "react";

import { Container, Right, Content, Footer } from "native-base";
import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, Image, Dimensions,FlatList, ImageBackground } from "react-native";
import {Input, Title, Item, H1, Button, Header, Icon, Spinner, Card, CardItem, H3, Body, Left, Thumbnail} from "native-base";

import backend from "../api/backend";
import getEnvVars from "../../enviroment";
const { width, height } = Dimensions.get("window");
const { apiUrl , apiImageUrl, apiImageSize } = getEnvVars();

const searchScreen = ({ navigation }) => {
    const [books, setBooks] = useState(null);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");
    
    async function getSearchBooks() {
        try {
          const response = await backend.get(`${apiUrl}search/book_title?query=${search}&lang=spanish`);  
          setBooks(response.data);
        } catch (error) {
          setError(true);
        }
    }
    
    useEffect(() => {
        getSearchBooks();
    }, []);

 
    return (
        <Container>
            <Header style={styles.header}>
                <Right> 
                    <Item>
                        <Input placeholder="Buscar" value={search} onChangeText={setSearch}/>
                    </Item>
                </Right>
            <Button style={styles.boton} onPress={() => {navigation.navigate("infoScreen")}}>
                <Icon name="search" style={styles.icono} />
            </Button>
          </Header>
          <Content>
                <ImageBackground style={styles.Fondo} source={require("../../assets/fondo.jpeg")}>
                    <Text>
                        <H1 style={styles.estiloH1}>Resultados de la Búsqueda</H1>
                    </Text> 
                </ImageBackground>
            </Content>
         
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
   
  });

export default searchScreen;