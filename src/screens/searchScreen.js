import react from "react";

import { Container, Right, Content, Footer } from "native-base";
import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, Image, Dimensions,FlatList, ImageBackground } from "react-native";
import {Input, Title, Item, H1, Button, Header, Icon, Spinner, Card, CardItem, H3, Body, Left, Thumbnail} from "native-base";

/*import backend from "../api/backend";
import getEnvVars from "../../enviroment";*/
const { width, height } = Dimensions.get("window");
const searchScreen = ({ navigation }) => {
    
    return (
        <Container>
            <Header style={styles.header}>
                <Right> 
                    <Item>
                        <Input placeholder="Buscar"/>
                    </Item>
                </Right>
            <Button style={styles.boton} onPress={() => {navigation.navigate("infoScreen")}}>
                <Icon name="search" style={styles.icono} />
            </Button>
          </Header>
          <Content>
          <ImageBackground style={styles.Fondo} source={require("../../assets/fondo.jpeg")}>
              <Text>
               <H1 style={styles.estiloH1}>Resultados de la búsqueda</H1>
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