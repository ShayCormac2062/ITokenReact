import React, {useState} from 'react';
import {StyleSheet, View} from "react-native";
import TextInput from "./ui/TextInput";

const SearchInput = ({value, onChangeText}) => {

    return (
        <View style={styles.container}>
         <TextInput placeholder="Search NFT" style={styles.input} value={value} onChangeText={onChangeText}  />
        </View>
    );
};
const styles = StyleSheet.create({
    input: {

    },
    container: {
    },

});
export default SearchInput;
