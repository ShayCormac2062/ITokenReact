import React, {memo} from 'react'
import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import colors from "../../styles/colors";
import {SimpleLineIcons} from '@expo/vector-icons';

type HeaderProps = {
    title: string
    isIco?: boolean
    isGoBack?: boolean
    onPressClear?: () => void
    goBackPress?: () => void
    style?: StyleProp<ViewStyle>
}
const Header = ({title, style, isIco = false, onPressClear, isGoBack = false, goBackPress}: HeaderProps) => {
    return (
        <View style={[{
            width: '100%',
            marginBottom: 10, marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center'
        }, style, isIco && styles.icoContainer]}>
            {
                isGoBack &&
                <TouchableOpacity onPress={goBackPress} style={{marginRight: 10}}>
                    <SimpleLineIcons name="arrow-left" size={24} color="black"/>
                </TouchableOpacity>
            }
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>{title}</Text>

            {
                isIco && <TouchableOpacity onPress={onPressClear} style={{marginLeft: 5}}>
                    <AntDesign name="closecircle" size={24} color={colors.purpleDark}/>
                </TouchableOpacity>
            }

        </View>
    )
}
const styles = StyleSheet.create({
    icoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

});
export default memo(Header)
