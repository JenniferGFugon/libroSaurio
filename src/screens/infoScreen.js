
import { Container, Content} from "native-base";
import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, Image, Dimensions,FlatList, getElementById} from "react-native";
<<<<<<< HEAD
import { Header, Icon, Spinner, Card,  Left,Badge,bad} from "native-base";
=======
import { Header, Icon, Spinner, Card,  Left,Badge,Right} from "native-base";
>>>>>>> 10ec6bebf5425209d1fae2d65a7cdb51ef51ee2e

import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { LinearGradient } from 'expo-linear-gradient';
import { color } from "react-native-reanimated";

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
        <Container >
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
                        <LinearGradient 
                              colors={[colors= '#1ebd62','#198a49','#166D3B', '#000000']} 
                              style={styles.LinearGradient}
                              start={{ x: 1, y: 1 }}
                              end={{ x: 1, y: 0 }}
                            >
                            <Text style={styles.tituloLibro}>{item.title}</Text>

                            <Card style={styles.cardImagen}>
  
                                <Image  source={{ uri: `${item.cover}` }} style={styles.bookImage} />
     
                            </Card>
                            
                            <Card style={styles.cardTexto}>
                            <Left style={{flex:1}} >
                            <Text style={styles.textoAlineadoL} > Detalles del libro   </Text>
                                  <Text style={styles.tags}> Año: </Text>
                                  <Text style={styles.tags}> Editor: </Text>
                                  <Text style={styles.tags}> Paginas: </Text>
                                  <Text style={styles.tags}> Lenguaje</Text>
                                  <Text style={styles.tags} > Categorías: </Text>
                                  <Text  style={styles.textBadge}> {
                                                                  item.categories.map((category) => (
                                                                    <Badge style={styles.badge} key={category.category_id} >
                                                                    <Text key={category.category_id}>{category.name}</Text>
                                                                    </Badge>

                                                                  ))
                                                                }   </Text> 
                                  <Text >    </Text>
                             </Left> 
                            <Right style={{flex:2}}>  

                            <Text style={styles.tagsData} >  {item.publisher_date}</Text>
                            <Text style={styles.tagsData}>  {item.publisher}</Text>
                            <Text style={styles.tagsData}> {item.pages}</Text>
                            <Text style={styles.tagsData}> {item.language}</Text>
                            <Text style={styles.tagsData}> </Text>
                            <Text style={styles.tagsData}> </Text>

                             </Right> 
                                 
                            </Card>
                              
                            <Text style={styles.texto} > Descripcion   </Text>
                                  <Text style={styles.textoContenido} > {removeContent(item)} </Text>
                        </LinearGradient>                                    

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
    marginTop: 0,
    borderRadius:20,
    shadowOpacity:6
  },
  
  tituloLibro: {
    fontFamily: 'sans-serif-thin',
    fontSize: 25,
    fontWeight: "bold",
    justifyContent: "center",
    color: "#fff",
    marginTop: 18,
    marginBottom: 15,
    textAlign:"center"
  },  
  
  texto:{
    flex:1,
    color:"white",
    justifyContent:"center",
    textAlign:"left",
    fontSize: 19,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    fontWeight:"bold"
  },
  textoContenido:{
    flex:1,
    color:"white",
    justifyContent:"center",
    textAlign: "justify",
    fontSize: 17,
    margin: 18
  },

  tags: {
    fontWeight: "bold",

    color:"white",
    justifyContent:"center",
    fontSize: 16,
    textAlign:"left",
    marginTop: 5,
    marginBottom: 5,
    
  },
  tagsData:{
    
    color:"white",
    justifyContent:"center",
    fontSize: 16,
    textAlign:"right",
    marginTop: 5,
    marginBottom: 5,
    marginRight:5
  },
  textoAlineadoL:{
    color:"white",
    textAlign: "center" ,
    marginLeft: 70,
    justifyContent:"flex-start",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 10,
    marginBottom: 5,
    width:200,
    height:40,
    fontSize:20
  },
  cardImagen:{
    flex:1,
    width: width * 0.60,
    height: height * 0.45,
    borderRadius:20,
    overflow:'hidden',
    marginLeft:80,
    marginBottom: 15,
    borderColor:"transparent"
  },
  cardTexto:{
    backgroundColor:"transparent",
    flex:1,
    flexDirection:"row",
    borderRadius:0,
    overflow: 'hidden',
    padding: 10,
    borderColor: "transparent",
    borderRadius:5,
    
    
  },
  badge:{
    backgroundColor :"#B5F5B6",
    fontWeight: "bold",
    borderWidth:1,
    width: "auto"
  },
  textBadge:{
    flex:1,
    marginLeft:5,
    color:"black"
  }

  });

export default infoScreen;