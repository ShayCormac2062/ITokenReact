import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import colors from "../styles/colors";
import tabBarBack from '../assets/images/navigation/tabbarBack.png'
import { Ionicons } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {routerConstants} from "../constants/routerConstants";
const CustomTabBar = props => {
  const navigation = useNavigation();
  return (
    <>
      <View>
        <Image resizeMode={'stretch'} style={styles.tabBar}  source={tabBarBack}/>
        <BottomTabBar {...props} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate(routerConstants.CREATE_TOKEN)}  style={styles.btnAddToken}>
        <Ionicons name="add-circle-sharp" size={55} color={colors.purpleDark} />
      </TouchableOpacity>
    </>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  btnAddToken: {
    position: 'absolute',
    bottom: 70,
    right: 0,
    width: 80,
    height: 80
  },
  tabBar: {
    position: 'absolute',
    width: '100%',
    right: 0,
    left: 0,
    bottom: 0,
    height: 110,
    backgroundColor: 'transparent',
  },
});
