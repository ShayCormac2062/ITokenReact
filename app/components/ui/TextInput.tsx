import React, {forwardRef} from 'react'
import {StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, Text, View} from 'react-native'
import {FontAwesome} from '@expo/vector-icons';
import colors from "../../styles/colors";

type InputCustomProps = {
    label?: string
    errorMessage?: string
    error?: boolean
    textErrorStyles?: StyleProp<TextStyle>
    iconRight?: JSX.Element,
    iconLeft?: JSX.Element,
    onClearText?: () => void
} & TextInputProps
const InputCustom = forwardRef(({
                                    label,
                                    errorMessage,
                                    error,
                                    textErrorStyles,
                                    iconRight,
                                    iconLeft,
                                    style,
                                    ...rest
                                }: InputCustomProps, ref) => {
    return (
        <View>
            { label && <Text style={styles.label}>{label}</Text> }
            <TextInput
                style={[styles.input, style]}
                {...rest}
            />
        </View>
    )
})
const styles = StyleSheet.create({
    label: {
        fontSize: 15,
        color: colors.black,
        fontWeight: 'bold',
        marginBottom: 10
    },
    input: {
        padding: 5,
        fontSize: 15, fontWeight: 'normal',
        borderColor: colors.gray,
        borderWidth: 1,
        borderRadius: 5
    },
    container: {},

});
export default InputCustom
