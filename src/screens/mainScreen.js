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
        <Spinner color="blue" />
      </View>
    )
  }

    
    
    
    
    

      return (
        <Container style={{backgroundColor: '#2da144'}}>
            <Header >
            <Left>
            <Thumbnail square small source={require("../../assets/logo.jpg")} />

            </Left>
            <Body>
                <Text>libroSaurio</Text>
            </Body>
            <Right>
              <Button icon onPress={() => {navigation.navigate("searchScreen")}}>
                <Icon name="search" />
            </Button>
            </Right>
            </Header>
            
                <Text style = {styles.text} > TOPS EN PROGRAMACION </Text>
                <FlatList
                  data={books}
                  keyExtractor={(item) => {
                    return item.ID;
                  }}
                  ListEmptyComponent={<Text>¡No se han encontrado libros!</Text>}
                  renderItem={({ item }) => {
                    return (
                      <View>
                        <Card >
                        <CardItem header bordered>
                            <H3>{item.title}</H3>
                        </CardItem>                          
                          <CardItem cardBody bordered>
                          <Body>
                            <Image  source={{ uri: `${item.cover}` }} style={styles.bookImage} />
                         </Body>
                          </CardItem> 
                         
                          <CardItem footer bordered>
                            <Text> {item.pages} Paginas</Text>
                            <Right>
                            <Text> Autor:{item.author}</Text>
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
      flex: 1,
      backgroundColor: '#1B241D',
    },

    text: {
        fontFamily: 'serif',
        fontSize: 25,
        marginTop: 5,
        textAlign: "center"
    
    },
    bookImage: {
      width: width * 0.99,
      height: height * 0.57,
      
    },
   
  });


export default mainScreen;
    