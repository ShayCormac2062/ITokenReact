import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import colors from "../../styles/colors";
import {LinearGradient} from "expo-linear-gradient";

type CategoriesProps = {
    item: any
    onPress: (val:string) => void
}
const Categories = ({item, onPress}: CategoriesProps) => {
    return (
        <TouchableOpacity onPress={() => onPress(item)} >
            <LinearGradient
                colors={[item.colorStart, item.colorEnd]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.item}>
                <Text style={{...styles.text}}>{item.name}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    text: {color: colors.white, fontSize: 16, fontWeight: 'bold'},
    item: {
        padding: 10,
        backgroundColor: 'red',
        width: 91,
        height: 91,
        borderRadius: 16,
        marginRight: 7,
        marginLeft: 9,
        marginBottom: 10
    },
});
export default Categories;
