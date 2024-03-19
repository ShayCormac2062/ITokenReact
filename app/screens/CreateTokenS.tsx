import React, {useState} from 'react';
import {BaseWrapperComponent} from "../components/ui/baseWrapperComponent";
import {Image, StyleSheet, Text, View} from "react-native";
import colors from "../styles/colors";
import Header from "../components/ui/Header";
import {generateBoxShadowStyle, getRandomId} from "../utils/commonUtils";
import * as ImagePicker from 'expo-image-picker'
import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";
import {FontAwesome5} from "@expo/vector-icons";
import {deviceStorage} from "../utils/storage/storage";
import {getMyCreatesTokens} from "../utils/storage/utils";

export type DataCreateTokenType = {
    name: string
    image_url: string,
    description: string
    price: string
    id: number
}
const initState = {
    description: '',
    image_url: '',
    price: '',
    name: '',
    id: getRandomId()
}
const CreateTokenS = ({navigation}) => {
    const [data, setData] = useState<DataCreateTokenType>(initState)
    const [error, setError] = useState<boolean>(false)
    const validateData = (data: DataCreateTokenType): boolean => {
        for (const key in data) {
            if (data[key] === '') {
                return false;
            }
        }
        return true;
    }
    const goBackPress = () => {
        navigation.goBack()
    }
    const onSaveToken = async () => {
        if (!validateData(data)) return setError(true)
        try {
            const getTokens = await getMyCreatesTokens()
            if (getTokens?.length) {
                const newTokens = [...getTokens, data]
                await deviceStorage.saveItem('createsTokens', JSON.stringify(newTokens))
                setData({ ...initState, id: getRandomId() })
                return
            }
            await deviceStorage.saveItem('createsTokens', JSON.stringify([data]))
            setData({ ...initState, id: getRandomId() })
        } catch (e) {
            console.log(e)
        }
    }
    const onChangeHandler = (key, value) => {
        setError(false)
        setData(prevState => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    const onGalleryHandler = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissionResult.granted === false) {
            return
        }
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })

            if (!result.canceled) {
                const selectedAsset = result.assets[0]
                const selectedImageUri = selectedAsset.uri
                onChangeHandler('image_url', selectedImageUri)
            }
        } catch (error) {
            console.log('Error selecting image from gallery:', error)
        }
    }
    const generateShadow = generateBoxShadowStyle(2, 2, '#171717', 0.2, 10, 5, '#171717')
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <View style={styles.container}>
                <Header isGoBack={true} goBackPress={goBackPress} style={styles.headerBack}
                        title={'Создай новый токен!'}/>
                <View style={{alignItems: 'flex-start', width: '100%', marginTop: 30, marginBottom: 20}}>
                    <Text style={[styles.text, {fontSize: 18}]}>Выберите картинку*</Text>
                </View>
                <View>
                    <View style={[styles.backImg, generateShadow]}>
                        {
                            data.image_url && <Image style={styles.img} source={{uri: data.image_url}}/>
                        }
                    </View>
                </View>
                <View style={{marginTop: 20, marginBottom: 10}}>
                    <Button onPress={onGalleryHandler} styleContainer={{width: 120, minHeight: 40}} title={'Галерея'}
                            backgroundColor={colors.purpleDark} colorText={colors.white}/>
                </View>
                <View style={{width: '100%', marginBottom: 10}}>
                    <TextInput onChangeText={(e) => onChangeHandler('name', e)} value={data.name} style={styles.input}
                               label={'Дайте имя токену*'} placeholder={'Название'}/>

                </View>
                <View style={{width: '100%', marginBottom: 10}}>
                    <TextInput onChangeText={(e) => onChangeHandler('description', e)} value={data.description}
                               style={styles.input} label={'Дайте описание токену*'} placeholder={'Описание'}/>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    width: '100%',
                    flex: 1
                }}>
                    <Text style={[styles.text, {fontSize: 18}]}>Стоимость токена*</Text>
                    <View>
                        <TextInput keyboardType='numeric' onChangeText={(e) => onChangeHandler('price', e)}
                                   value={data.price} style={[styles.input, {width: 100}]} placeholder={'Цена'}/>
                    </View>
                </View>
                <View style={{marginTop: 20, marginBottom: 20}}>
                    <Button onPress={onSaveToken} styleContainer={{borderRadius: 50, width: 223, minHeight: 48}}
                            title={'Галерея'} backgroundColor={colors.purpleDark}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1}}>
                                <FontAwesome5 name="pen" size={19} color={colors.white}/>
                            </View>
                            {
                                error ? <Text style={[styles.text, {color: colors.red, marginLeft: 5, flex: 3}]}>Заполните все поля</Text> :
                                    <Text style={[styles.text, {color: colors.white, marginLeft: 5, flex: 3}]}>Создать
                                        Токен</Text>
                            }

                        </View>
                    </Button>
                </View>

            </View>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    input: {
        height: 50
    },
    backImg: {
        backgroundColor: colors.white,
        borderRadius: 12,
        width: 320,
        height: 320
    },
    headerBack: {
        position: 'relative',
        top: 15,
        left: 0
    },
    text: {
        fontSize: 14,
        color: colors.black,
        fontWeight: 'bold'
    },
    btnText: {
        color: colors.gray
    },
    btnContainer: {
        width: 79,
        minHeight: 33,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: colors.gray
    },
    img: {
        borderRadius: 12,
        height: '100%',
        width: '100%',
    },
    container: {
        backgroundColor: colors.backColor,
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 16,
    },

});
export default CreateTokenS;
