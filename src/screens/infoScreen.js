
import { Container, Content} from "native-base";
import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, Image, Dimensions,FlatList} from "react-native";
import { Header, Spinner, Card, Body, Left} from "native-base";

import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { LinearGradient } from 'expo-linear-gradient';

const { apiUrl  } = getEnvVars();

const { width, height } = Dimensions.get("window");

const infoScreen = ({ route,navigation }) => {
    const { ID } = route.params;
    const [book, setBook] = useState(null);
    const [error, setError] = useState(false);
    var contenido ="";
    
    async function getBookInfo() {
        try {
          const response = await backend.get(`${apiUrl}?id=${ID}&lang=spanish`);
    
          setBook(response.data);

        } 
        catch(error) {
          setError(true);
        }
      };
    
      // Efecto secundario que ejecuta la consulta a la API
      useEffect(() => {
        getBookInfo();
      }, []);

      if (!book) {
        return (
          <Content>
            <Spinner />
          </Content>
        )
      }
      
      function removeContent(item){
        contenido=item.content
        contenido=contenido.replace(/&oacute;/g,"ó")
        contenido=contenido.replace(/&eacute;/g,"é")
        contenido=contenido.replace(/&iacute;/g,"í")
        contenido=contenido.replace(/&aacute;/g,"á")
        contenido=contenido.replace(/&uacute;/g,"ú")
        contenido=contenido.replace(/&quot;/g,"\"")
        contenido=contenido.replace(/&ntilde;/g,"ñ")
        contenido=contenido.replace(/&lt;/g,"<")
        contenido=contenido.replace(/&gt;/g,">")
        contenido=contenido.replace(/&ldquo;/g,"\"")
        contenido=contenido.replace(/&rdquo;/g,"\"")
        contenido=contenido.replace(/&iquest;/g, "¿")

        console.log(contenido);
        
        return contenido;
      }

      return (
        <Container>
            <Header style={styles.header} >
                <Left>
                    <Image  source={require("../../assets/logo_dino.png")} style={styles.logoImage} />
                </Left>
                <Image  source={require("../../assets/logo_letras.png")} style={styles.letrasImage} />             
            </Header>
        
              <FlatList
                  data={book}
                  keyExtractor={(item) => {
                    return item.ID;
                  }}
                  renderItem={({ item }) => {
                    return (
                      <View style={{backgroundColor: "#227d3a"}}>
                            <Card>
                            <LinearGradient 
                              colors={[colors= '#7F8C8D','#000000']} 
                              style={styles.LinearGradient}
                              start={{ x: 1, y: 0 }}
                              end={{ x: 0, y: 1 }}
                            >
                                <Header style={{backgroundColor: "#227d3a"}}>
                                  <Text style={styles.tituloLibro}>{item.title}</Text>
                                </Header>
                                <Body bordered>
                                
                                <Image  source={{ uri: `${item.cover}` }} style={styles.bookImage} />
                                <Text style={styles.textoAlineadoL} > Detalles del libro:   </Text>
                                  <Text style={styles.tags}> Año: {item.publisher_date}</Text>
                                  <Text style={styles.tags}> Editor: {item.publisher}</Text>
                                  <Text style={styles.tags}> Paginas: {item.pages}</Text>
                                  <Text style={styles.tags}> Idioma: {item.language}</Text>
                                  <Text style={styles.tags} > Categorías: </Text>
                                  <Text style={styles.tags} > {
                                                                  item.categories.map((category) => (
                                                                    <Text key={category.category_id}>{category.name}</Text>
                                                                  ))
                                                                }   </Text>
                                  <Text >    </Text>
                                  <Text style={styles.texto} > Descripcion:   </Text>
                                  <Text style={styles.texto} > {removeContent(item)} </Text>
                                  

                               </Body> 
                              </LinearGradient>                                    
                            </Card>
                    </View>
                    )
                }}
              />
            
        </Container>
    );
}
const styles = StyleSheet.create({
  Fondo: {
    width: width,
    height: height,
    },
  
    LinearGradient: {
      height: "auto",
      width: width
      
    },
  estiloH1: {
    color: '#f2f2f2',
    textAlign: "center",
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
    
  icono: {
    color: "green",
    margin: 10,
  },

  header: {
    backgroundColor: '#fff',
  },

  bookImage: {
    width: width * 0.60,
    height: height * 0.45,
    marginTop: 8,
  },
  
  tituloLibro: {
    fontFamily: 'serif',
    fontSize: 19,
    fontWeight: "bold",
    justifyContent: "center",
    color: "#fff",
    marginTop: 10
  },  
  
  texto:{
    color:"white",
    justifyContent:"center",
    textAlign:"left",
    fontSize: 19,
    margin: 20,
    marginTop: 5,
    marginBottom: 5,
  },

  tags: {
    color:"white",
    justifyContent:"center",
    fontSize: 18,
    textAlign:"left",
    marginTop: 5,
    marginBottom: 5,
  },
  
  textoAlineadoL:{
    color:"white",
    textAlign: "left" ,
    justifyContent:"flex-start",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 10,
    marginBottom: 5
  },
  });

export default infoScreen;