import react from "react";

import { Container, Right, Content, Footer } from "native-base";
import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, Image, Dimensions, FlatList, ImageBackground, Animated } from "react-native";
import {Input, Title, Item, H1, Button, Header, Icon, Spinner, Card, CardItem, H3, Body, Left, Thumbnail} from "native-base";

import backend from "../api/backend";
import getEnvVars from "../../enviroment";
const { width, height } = Dimensions.get("window");
const { apiUrl , apiImageUrl, apiImageSize } = getEnvVars();
import { TouchableOpacity } from "react-native-gesture-handler";
import { linear } from "react-native/Libraries/Animated/src/Easing";
//import Animated from "react-native-reanimated";
import { LinearGradient } from 'expo-linear-gradient';

const searchScreen = ({ route, navigation }) => {
    const { search } = route.params;
    const [books, setBooks] = useState(null);
    const [error, setError] = useState(false);
    const scrollX = React.useRef(new Animated.Value(0)).current;
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
 
    return (
        <Container>
           <Header style={styles.header} >
              <Left> 
                <Image source={require("../../assets/logo_computadora.png")} style={styles.logoImage} />
              </Left>
              <Image source={require("../../assets/logo_letras.png")} style={styles.letrasImage} />
            </Header>
              <LinearGradient colors={[colors= '#238723','#055e05','#000E21']} style={styles.LinearGradient}>
                <Text style={styles.textHeader}>
                  <H1 style={styles.estiloH1}>Resultados de la Búsqueda</H1>
               </Text>
                <Animated.FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={books}
                  keyExtractor={(item) => {
                    return item.ID;
                  }}  
                  contentContainerStyle={{alignItems:"center"}}
                  //snapToInterval= {width * 0.72}
                  decelerationRate={0}
                  //bounces={false}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                  )}
                  scrollEventThrottle={16}
                  ListEmptyComponent={<Text>¡No se han encontrado libros!</Text>}
                  renderItem={({ item, index }) => {
                    const inputRange = [
                      (index - 1) * (width * 0.72),
                      index  * (width * 0.72),
                      (index + 1) * (width * 0.72),
                    ];
                    const translateY = scrollX.interpolate({
                      inputRange,
                      outputRange:[-30, -70, -30],
                    });
                    return (
                      <View style={styles.firstView} >
                          <TouchableOpacity onPress={() => navigation.navigate("infoScreen", {ID: item.ID})}>
                            <Animated.View style={styles.estiloView} style={{transform: [{translateY}] }}>
                            <Card style={styles.estiloCard}>
                              <CardItem header bordered style={styles.cardItem}>
                                <H3 style={styles.tituloLibro}>{item.title}</H3>
                              </CardItem>                          
                               
                                
                                  <Image  source={{ uri: `${item.cover}` }} style={styles.bookImage} />
                              
                                
                              
                                <CardItem footer bordered style={styles.cardItem} >
                                  <Text style={styles.autoryPag} > {item.pages} Páginas</Text>
                                  <Right>
                                  <Text style={styles.autoryPag}> Autor: {item.author}</Text>
                                  </Right>
                              </CardItem>
                              </Card>
                            </Animated.View>
                        </TouchableOpacity>
                      </View>
                    )
                  }}
                />
              </LinearGradient>
        </Container>
    );
}

const styles = StyleSheet.create({
    Fondo: {
      width: width,
      height: height,
      backgroundColor: 'green',
      
    },

    LinearGradient: {
      height: height,
      width: width
      
    },

    textHeader: {
      fontFamily: "Times New Roman",
      fontSize: 25,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 10,
      textAlign: "center",
      color: "#fff",
      backgroundColor: "#173d17"
    },

    firstView: {
      width: width * 0.80,
      marginLeft: 25,
      
    },

    estiloView: {
      marginHorizontal: 10,
      padding: 15,
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 34,
      width: width * 0.86,  
      height: height * 0.70,  
    },

    estiloCard: {
      marginHorizontal: 5,
      paddingTop: 5,
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 10,
      width: width * 0.79, 
      height: "auto",   
      borderColor: "white",
      borderStyle: "dotted",   
      
    },

    estiloH1: {
      color: 'white',
      textAlign: "center",
      //paddingBottom: 30,
      //backgroundColor: "#0f630f",
    },

    icono: {
        width: 19, 
    },

    header: {
        backgroundColor: '#fff',
      },

    bookImage: {
        width: width * 0.50,
        height: height * 0.45,
        marginLeft: 5,        
    },
    letrasImage: {
        width: 180,
        height: 30,
        margin: 20,
        marginRight: 50,
    },
  
    logoImage: {
        width: 50,
        height: 33,
        marginLeft: 10,
    },

    tituloLibro: {
      fontFamily: "Times New Roman",
      fontSize: 16,
      fontWeight: "bold",
      alignContent: "center",
      color: "#000000",
      
    },

    autoryPag: {
      fontFamily: "Times New Roman",
      fontSize: 18,
      fontStyle: "italic"
      //color:"fff",
    },

    cardItem: {
      backgroundColor: "#49c46a",
      borderWidth: 1,
      borderColor: "white"
    }

  });

export default searchScreen;