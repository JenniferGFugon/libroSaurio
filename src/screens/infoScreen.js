import react from "react";

import { Container, Right, Content, Footer } from "native-base";
import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, Image, Dimensions,FlatList, ImageBackground } from "react-native";
import {Input, Title, Item, H1, Button, Header, Icon, Spinner, Card, CardItem, H3, Body, Left, Thumbnail} from "native-base";

/*import backend from "../api/backend";
import getEnvVars from "../../enviroment";*/
const { width, height } = Dimensions.get("window");
const infoScreen = ({ navigation }) => {
    
    return (
        <Container>
            <Header style={styles.header} >
                <Left>
                    <Image  source={require("../../assets/logo_computadora.png")} style={styles.logoImage} />
                </Left>
                <Body>
                    <Image  source={require("../../assets/logo_letras.png")} style={styles.letrasImage} />
                </Body>
                <Right>
                    <Icon name="menu" style={styles.icono} onPress={() => {navigation.navigate("searchScreen")}} />
                </Right>
            </Header>
            <Content>
                <ImageBackground style={styles.Fondo} source={require("../../assets/fondo.jpeg")}>
                    <Text>
                        <H1 style={styles.estiloH1}>Información de los libros</H1>
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
  });

export default infoScreen;