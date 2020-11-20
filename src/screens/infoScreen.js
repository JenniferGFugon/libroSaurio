
import { Container, Content} from "native-base";
import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, Image, Dimensions,FlatList} from "react-native";
import { Header, Spinner, Card, Body, Left} from "native-base";

import backend from "../api/backend";
import getEnvVars from "../../enviroment";
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
                    <Image  source={require("../../assets/logo_computadora.png")} style={styles.logoImage} />
                </Left>
                <Body>
                    <Image  source={require("../../assets/logo_letras.png")} style={styles.letrasImage} />
                </Body>
                
            </Header>
            


                     
       
                    <FlatList
                  data={book}
                  keyExtractor={(item) => {
                    return item.ID;
                  }}
                  renderItem={({ item }) => {
                    return (
                      <View style={{backgroundColor: "black"}}>
                            <Card>
                                <Header style={{backgroundColor: "black"}}>
                                    <Text style={styles.tituloLibro}>{item.title}</Text>
                                </Header>
                                <Body bordered>
                                
                                <Image  source={{ uri: `${item.cover}` }} style={styles.bookImage} />
                                <Text style={styles.textoAlineadoL} > Detalles del libro:   </Text>
                                  <Text style={styles.texto}> Año: {item.publisher_date}</Text>
                                  <Text style={styles.texto}> Editor: {item.publisher}</Text>
                                  <Text style={styles.texto}> Paginas: {item.pages}</Text>
                                  <Text style={styles.texto}> Idioma: {item.language}</Text>
                                  <Text style={styles.texto} > Descripcion:   </Text>
                                  <Text style={styles.texto} > {removeContent(item)} </Text>
                                  <Text style={styles.texto} > Categorias </Text>
                                  <Text style={styles.texto} > {
                                                                  item.categories.map((category) => (
                                                                    <Text key={category.category_id}>{category.name}</Text>
                                                                  ))
                                                                }   </Text>


                               </Body> 

                                  
                                  
                                 
                                  


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

    estiloH1: {
       color: '#f2f2f2',
       textAlign: "center",
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
    },

    header: {
        backgroundColor: '#fff',
      },

    bookImage: {
        width: width * 0.60,
        height: height * 0.40,
      
    },
    tituloLibro: {
        
        fontFamily: 'serif',
        fontSize: 19,
        fontWeight: "bold",
        justifyContent: "center",
        color: "#fff",
      },  
      texto:{
        color:"black",
        justifyContent:"center",
        textAlign:"left"
      },
      textoAlineadoL:{
        color:"black",
        textAlign: "left" ,
        justifyContent:"flex-start",
      },
  });

export default infoScreen;