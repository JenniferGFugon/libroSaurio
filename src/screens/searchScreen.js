import react from "react";

import { Container, Right, Content, Footer } from "native-base";
import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, Image, Dimensions,FlatList, ImageBackground } from "react-native";
import {Input, Title, Item, H1, Button, Header, Icon, Spinner, Card, CardItem, H3, Body, Left, Thumbnail} from "native-base";
import { withSafeAreaInsets } from "react-native-safe-area-context";
/*import backend from "../api/backend";
import getEnvVars from "../../enviroment";*/
const { width, height } = Dimensions.get("window");
const searchScreen = ({ navigation }) => {
    
    return (
        <Container>
            <Header>
                <Right> 
                    <Item>
                        <Input placeholder="Buscar"/>
                    </Item>
                </Right>
            <Button>
                <Text>Aqui va Icono</Text>
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
   
  });
export default searchScreen;