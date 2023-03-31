
import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, Image, Dimensions,  Animated } from "react-native";
import {H1, Header, Spinner, Card, H3, Left, Container,Body} from "native-base";

import backend from "../api/backend";
import getEnvVars from "../../enviroment";
const { width, height } = Dimensions.get("window");
const { apiUrl } = getEnvVars();
import { TouchableOpacity } from "react-native-gesture-handler";
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
                <Image source={require("../../assets/logo_dino.png")} style={styles.logoImage} />
              </Left>
              <Image source={require("../../assets/logo_letras.png")} style={styles.letrasImage} />
            </Header>
              <LinearGradient 
                colors={[colors= '#63D471','#000000']} 
                style={styles.LinearGradient}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                >
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
                      outputRange:[-30, -65, -30],
                    });
                    return (
                      <View style={styles.firstView} >
                          <TouchableOpacity onPress={() => navigation.navigate("infoScreen", {ID: item.ID})}>
                            <Animated.View style={styles.estiloView} style={{transform: [{translateY}] }}>
                              <Card style={styles.estiloCard}>
                                                        
                                <Body style={{marginTop:10}}> 
                                <Image  source={{ uri: `${item.cover}` }} style={styles.bookImage} />
                                </Body>
                                
                                  <H3 style={styles.tituloLibro}>{item.title}</H3>
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
      fontFamily: "serif",
      fontSize: 25,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 10,
      textAlign: "center",
      color: "#fff",
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
      height: height * 0.90,  
      marginTop:20
    },

    estiloCard: {
      marginHorizontal: 5,
      paddingBottom: 5,
      alignItems: "center",
      backgroundColor: "#F5F5F5",
      borderRadius: 10,
      width: width * 0.79, 
      height: 500,
      borderWidth: 50,   
      borderColor: "blue",
      borderStyle: "solid",   
    },

    estiloH1: {
      color: 'white',
      textAlign: "center",
      fontSize: 25
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
        marginTop:53,
        width: width * 0.70,
        height: height * 0.45,
    },
    letrasImage: {
        width: 222,
        height: 30,
        margin: 20,
        marginRight: 38,
    },
  
    logoImage: {
      width: 60,
      height: 48,
      marginLeft: 30
    },

    tituloLibro: {
      fontFamily: "sans-serif",
      fontSize: 16,
      fontWeight: "bold",
      color: "#000000",
      marginLeft:15,
      marginRight:5,
    },

    autoryPag: {
      fontFamily: "sans-serif-thin",
      fontSize: 18,
      fontStyle: "italic"
      //color:"fff",
    },

    cardItem: {
      
      fontWeight:"bold",
      alignContent:"center",
      backgroundColor:"transparent",
      textAlign:"center"

    }

  });

export default searchScreen;