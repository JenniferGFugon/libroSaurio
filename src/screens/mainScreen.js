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
          await Promise.all([
           response = await backend.get(`${apiUrl}?category=libros_programacion&criteria=featured&lang=spanish`),
           response2 = await backend.get(`${apiUrl}?category=bases_de_datos&criteria=most_viewed&lang=spanish`),
           response3 = await backend.get(`${apiUrl}?category=control_de_versiones&criteria=most_viewed&lang=spanish`),
           response4 = await backend.get(`${apiUrl}?category=desarrollo_web&criteria=most_viewed&lang=spanish`),
           response5 = await backend.get(`${apiUrl}?category=diseno_3d&criteria=most_viewed&lang=spanish`),
           response6 = await backend.get(`${apiUrl}?category=electronica-biblioteca&criteria=most_viewed&lang=spanish`),
           response7 = await backend.get(`${apiUrl}?category=metodologias_agiles&criteria=most_viewed&lang=spanish`),
           response8 = await backend.get(`${apiUrl}?category=multimedia-biblioteca&criteria=most_viewed&lang=spanish`),
           response9 = await backend.get(`${apiUrl}?category=redes_y_sysadmins&criteria=most_viewed&lang=spanish`),
           response10 = await backend.get(`${apiUrl}?category=retroinformatica-biblioteca&criteria=most_viewed&lang=spanish`),
           response11 = await backend.get(`${apiUrl}?category=robotica&criteria=most_viewed&lang=spanish`),
           response12 = await backend.get(`${apiUrl}?category=seo_y_sem&criteria=most_viewed&lang=spanish`),
           response13 = await backend.get(`${apiUrl}?category=software-general&criteria=most_viewed&lang=spanish`),
           response14 = await backend.get(`${apiUrl}?category=libros_software_libre&criteria=most_viewed&lang=spanish`),
           setBooks(response.data),
           setBaseDatos(response2.data),
           setControlVersiones(response3.data),
           setdesarolloWeb(response4.data),
           setDiseño3D(response5.data),
           setElectronica(response6.data),
           setMetodologiasAgiles(response7.data),
           setMultimedia(response8.data),
           setRedes(response9.data),
           setRetroinformatica(response10.data),
           setRobotica(response11.data),
           setSeo(response12.data),
           setSoftwareGeneral(response13.data),
           setSoftwareLibre(response14.data),
          ]

          ).then(() => {console.log('done')});

          
         
          
        } 
        catch (error) {
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
        <Text style={{textAlign:"center"}}>Cargando...</Text> 
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
    {keyItem: 1,
    value:books,
    titulo:"Programacion"},
    {keyItem: 2,
    value:baseDatos,
    titulo:"Base de Datos"},
    {keyItem: 3,
    value:controlVersiones,
    titulo:"Control de Versiones"},
    {keyItem: 4,
    value:desarolloWeb,
    titulo:"Desarollo Web"},
    {keyItem: 5,
    value:diseño3D,
    titulo:"Diseño 3D"},
    {keyItem: 6,
    value:electronica,
    titulo:"Electronica"},
    {keyItem: 7,
    value:metodologiasAgiles,
    titulo:"Metodologias Aguiles"},
    {keyItem: 8,
    value:multimedia,
    titulo:"Multimedia"},
    {keyItem: 9,
    value:redes,
    titulo:"Redes"},
    {keyItem: 10,
    value:retroinformatica,
    titulo:"Retro Informatica"},
    {keyItem: 11,value:robotica,
    titulo:"Robotica"},
    {keyItem: 12,
    value:seo,
    titulo:"SEO"},
    {keyItem: 13,
    value:softwareGeneral,
    titulo:"Software General"},
    {keyItem: 14,
    value:softwareLibre,
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
                    {dataOptions.map((dat,index) => (
                    <Body>
                       <Text  style = {styles.text} key={index} > {dat.titulo}</Text>
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
    