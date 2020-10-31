import { Container } from "native-base";
import React, { useEffect, useState } from "react";

import react from "react";
import { StyleSheet, Text, View } from 'react-native';
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
  H3,
  Body,
  Left,
  Thumbnail
  
} from "native-base";


  const mainScreen = ({ navigation }) => { 
      return (

        <Container>
            <Header >
            <Left>
            <Thumbnail square small source={require("../../assets/logo.jpg")} />

            </Left>
            <Body>
                <Text>libroSaurio</Text>
            </Body>
        
            </Header>
        
        </Container>
      )
   };

   const styles = StyleSheet.create({
    header: {
      flex: 1,
      backgroundColor: '#1B241D',
    }
   
  });


export default mainScreen;
    