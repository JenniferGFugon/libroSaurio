import { Body, Right } from "native-base";
import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, Image, Dimensions,FlatList ,ScrollView} from "react-native";
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
 
  Left,
  
  
} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");

const { apiUrl } = getEnvVars();


  const mainScreen = ({ navigation }) => { 
    
     
    const [books, setBooks] = useState(null);
    const [baseDatos, setBaseDatos] = useState(null);
    const [controlVersiones, setControlVersiones] = useState(null);
    const [desarolloWeb, setdesarolloWeb] = useState(null);
    const [diseño3D, setDiseño3D] = useState(null);
    const [electronica, setElectronica] = useState(null);
    const [metodologiasAgiles, setMetodologiasAgiles] = useState(null);
    const [multimedia, setMultimedia] = useState(null);
    const [redes, setRedes] = useState(null);
    const [retroinformatica, setRetroinformatica] = useState(null);
    const [robotica, setRobotica] = useState(null);
    const [seo, setSeo] = useState(null);
    const [softwareGeneral, setSoftwareGeneral] = useState(null);
    const [softwareLibre, setSoftwareLibre] = useState(null);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");
    const [searchError, setSearchError] = useState(false);
  
    async function getBooks() {
        try {
          const response = await backend.get(`${apiUrl}?category=libros_programacion&criteria=featured&lang=spanish`);
          setBooks(response.data);
          const response2 = await backend.get(`${apiUrl}?category=bases_de_datos&criteria=most_viewed&lang=spanish`);
          setBaseDatos(response2.data);
          const response3 = await backend.get(`${apiUrl}?category=control_de_versiones&criteria=most_viewed&lang=spanish`);
          setControlVersiones(response3.data);
          const response4 = await backend.get(`${apiUrl}?category=desarrollo_web&criteria=most_viewed&lang=spanish`);
          setdesarolloWeb(response4.data);
          const response5 = await backend.get(`${apiUrl}?category=diseno_3d&criteria=most_viewed&lang=spanish`);
          setDiseño3D(response5.data);
          const response6 = await backend.get(`${apiUrl}?category=electronica-biblioteca&criteria=most_viewed&lang=spanish`);
          setElectronica(response6.data);
          const response7 = await backend.get(`${apiUrl}?category=metodologias_agiles&criteria=most_viewed&lang=spanish`);
          setMetodologiasAgiles(response7.data);
          const response8 = await backend.get(`${apiUrl}?category=multimedia-biblioteca&criteria=most_viewed&lang=spanish`);
          setMultimedia(response8.data);
          const response9 = await backend.get(`${apiUrl}?category=redes_y_sysadmins&criteria=most_viewed&lang=spanish`);
          setRedes(response9.data);
          const response10 = await backend.get(`${apiUrl}?category=retroinformatica-biblioteca&criteria=most_viewed&lang=spanish`);
          setRetroinformatica(response10.data);
          const response11 = await backend.get(`${apiUrl}?category=robotica&criteria=most_viewed&lang=spanish`);
          setRobotica(response11.data);
          const response12 = await backend.get(`${apiUrl}?category=seo_y_sem&criteria=most_viewed&lang=spanish`);
          setSeo(response12.data);
          const response13 = await backend.get(`${apiUrl}?category=software-general&criteria=most_viewed&lang=spanish`);
          setSoftwareGeneral(response13.data);
          const response14 = await backend.get(`${apiUrl}?category=libros_software_libre&criteria=most_viewed&lang=spanish`);
          setSoftwareLibre(response14.data);
          
          
        } catch (error) {
          setError(true);
        }
      }

     
    // Hook de efecto
    useEffect(() => {
        getBooks();
    }, []);

   
    
  if (!books || !baseDatos || !controlVersiones || !desarolloWeb || !diseño3D || !electronica || !metodologiasAgiles || !multimedia || !redes || !retroinformatica || !robotica || !seo || !softwareGeneral || !softwareLibre) {
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

  const dataOptions = [
    {value:books,
    titulo:"Programacion"},
    {value:baseDatos,
    titulo:"Base de Datos"},
    {value:controlVersiones,
    titulo:"Control de Versiones"},
    {value:desarolloWeb,
    titulo:"Desarollo Web"},
    {value:diseño3D,
    titulo:"Diseño 3D"},
    {value:electronica,
    titulo:"Electronica"},
    {value:metodologiasAgiles,
    titulo:"Metodologias Aguiles"},
    {value:multimedia,
    titulo:"Multimedia"},
    {value:redes,
    titulo:"Redes"},
    {value:retroinformatica,
    titulo:"Retro Informatica"},
    {value:robotica,
    titulo:"Robotica"},
    {value:seo,
    titulo:"SEO"},
    {value:softwareGeneral,
    titulo:"Software General"},
    {value:softwareLibre,
    titulo:"Software Libre"}
  ];  
  
      return (
        <ScrollView  style={{backgroundColor: 'black'}}>
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
                    {dataOptions.map((dat) => (
                    <Body>
                       <Text  style = {styles.text}  > {dat.titulo}</Text>
                   <FlatList style={{flex:1}}
                     horizontal={true}
                     data={dat.value}
                     keyExtractor={(item) => {
                       return item.ID.toString();
                     }}    
                   ListEmptyComponent={<Text>¡No se han encontrado libros!</Text>}
                    
                   renderItem={({ item }) => {
                     return(

                      <View  style={{backgroundColor: "black"}}>

                          <TouchableOpacity  onPress={() => navigation.navigate("infoScreen", {ID: item.ID})}>
                            <Card style={styles.card}>
                                <Image  source={{ uri: `${item.cover}` }} style={styles.bookImage}/>
                            </Card>
                         </TouchableOpacity>
                    </View>
                     ) 
                   }}
                 />
                </Body>

                 ))}

        </ScrollView>
     
      )
  };

   const styles = StyleSheet.create({
    header: {
      backgroundColor: '#fff',
    },

    text: {
      flex:1,
      fontFamily: "serif",
      fontSize: 25,
      fontWeight: "bold",
      marginTop: 20,
      textAlign: "left" ,
      alignContent: "flex-start",
      color: "#fff",
      
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
      borderRadius:20 ,
      overflow: 'hidden'

    },

    letrasImage: {
      width: 200,
      height: 50,
      marginLeft:80
    },

    logoImage: {
      width: 50,
      height: 45,
    },

    icono: {
      color: "green",
      margin: 10,
    },
    card:{
      width:width*0.40,
      height:height*0.30,
      borderRadius:20,
      overflow: 'hidden'


    },
    
    
  });

export default mainScreen;
    