import { Container, Footer, Right,Drawer,SideBar } from "native-base";
import React, { useEffect, useState } from "react";

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
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");

const { apiUrl } = getEnvVars();


  const mainScreen = ({ navigation }) => { 
    
     
    const [books, setBooks] = useState(null);

    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");
    const [searchError, setSearchError] = useState(false);
    const categoryId = [1,2,3,4,5,6];
 

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

  const handlerSearch = () => {
    if (!search)
      setSearchError(true);
    else
    {
      navigation.navigate("searchScreen", { search })
      setSearchError(false);
    }
  } 
  

      return (
        <Container  style={{backgroundColor: 'black'}}>
            <Header style={styles.header} >
              <Left> 
                <Image source={require("../../assets/logo_computadora.png")} style={styles.logoImage} />
              </Left>
                  <Right> 
                        <Item>
                            <Input placeholder="Buscar" value={search} onChangeText={setSearch} style={searchError ? styles.inputError : null} />
                        </Item>
                    </Right>
                <Button transparent icon onPress={handlerSearch } >
                    <Icon name="search" style={styles.icono} />
                </Button>
            
             
              
            </Header>
                 <Image source={require("../../assets/logo_letras.png")} style={styles.letrasImage}/>
                <Text style = {styles.text} > TOPS EN PROGRAMACIÓN </Text>

                <FlatList
                  horizontal={true}
                  
                  data={books}
                  keyExtractor={(item) => {
                    return item.ID;
                  }}
                  ListEmptyComponent={<Text>¡No se han encontrado libros!</Text>}
                  renderItem={({ item }) => {
                    return (
                      <View style={{backgroundColor: "black"}}>
                          <TouchableOpacity onPress={() => navigation.navigate("infoScreen", {ID: item.ID})}>
                            <Card style={styles.card}>
                                      
                                <CardItem cardBody bordered>
                                <Left header bordered style={{backgroundColor: "#0f630f"}}>
                                  <Image  source={{ uri: `${item.cover}` }} style={styles.bookImage} />
                               </Left>                                      
                               <Right >
                                  <H3 style={styles.tituloLibro}>{item.title}</H3>
                                  <Text style={styles.autoryPag} > {item.pages} Páginas</Text>
                                  <Text style={styles.autoryPag}> Autor: {item.author}</Text>
                                </Right>
  
                                </CardItem> 
                            </Card>
                        </TouchableOpacity>
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
      fontFamily: "serif",
      fontSize: 25,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 10,
      textAlign: "center",
      color: "#fff",
      backgroundColor: "#0f630f"
    },

    tituloLibro: {
      fontFamily: "serif",
      fontSize: 19,
      fontWeight: "bold",
      justifyContent: "center",
      color: "#fff"
    },

    autoryPag: {
      fontFamily: "serif",
      fontSize: 16,
      
    },

    bookImage: {
      width: width * 0.40,
      height: height * 0.30,
    
    },

    letrasImage: {
      width: 200,
      height: 50,
      marginLeft:80,
    },

    logoImage: {
      width: 50,
      height: 33,
    },

    icono: {
      color: "green",
      margin: 10,
    },
    card:{
      width:width*0.90,
      marginLeft:20,
    }
  });

export default mainScreen;
    