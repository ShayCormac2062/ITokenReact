import React, {useState} from 'react';
import {BaseWrapperComponent} from "../components/ui/baseWrapperComponent";
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import colors from "../styles/colors";
import {FontAwesome, FontAwesome5} from "@expo/vector-icons";
import imgCrystal from '../assets/images/card/crystal.png'
import Button from "../components/ui/Button";
import {deviceStorage} from "../utils/storage/storage";
import Header from "../components/ui/Header";
import {NftResponsType, NftType} from "../api/type";
import {getRandomId, getRandomValue} from "../utils/commonUtils";
import {getMyBuys, getMyCreatesTokens, getMyCrystal} from "../utils/storage/utils";

const ViewTokenS = ({navigation, route}) => {
    const routData: { data: NftType, isHome?: boolean } = route.params
    const [isSmallCrystal,setIsSmallCrystal] = useState(false)
    const [isDone,setIsDone] = useState(false)
    const onPressBuyToken = async () => {
        const myCrystal = await getMyCrystal()
        if(myCrystal >= routData.data.price) {
            const myBuyes = await getMyBuys()
            if (myBuyes?.length) {
                const newTokens = [...myBuyes, routData.data]
               await deviceStorage.saveItem('myBuys', JSON.stringify(newTokens))
            } else {
                await deviceStorage.saveItem('myBuys', JSON.stringify([routData.data]))
            }
            const currentBalance = Number(myCrystal) - Number(routData.data.price)
            await deviceStorage.saveItem('myCrystal', String(currentBalance))
            setIsDone(true)
            return
        }
        setIsSmallCrystal(true)

    }
    const goBackPress = () => {
        navigation.goBack()
    }
    const randomPriceValue = routData.data.price
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>

            <View style={styles.container}>

                <ImageBackground style={styles.imgBack} blurRadius={5} source={{uri: routData.data.image_url}}>
                    <Header isGoBack={true} goBackPress={goBackPress} style={styles.headerBack} title={'Назад'}/>
                    <Image style={styles.imgAvatar} source={{uri: routData.data.image_url}}/>
                </ImageBackground>

                <View style={{paddingHorizontal: 16, marginTop: '15%'}}>
                    <Text style={[styles.text, {fontSize: 15, textAlign: 'center', color: colors.purpleDark, marginBottom: 10}]}>{routData.data.name}</Text>
                    <Text
                        style={[styles.text, {fontSize: 18}]}>{routData.data.creator ? routData.data.creator : 'Автор не известен'}  </Text>
                    <View style={styles.blockStatistic}>
                        <View style={styles.statistic}>
                            <FontAwesome name="file-image-o" size={24} color="black"/>
                            <Text style={styles.text}>Продаж: {getRandomValue()}</Text>
                        </View>
                        <View style={styles.statistic}>
                            <FontAwesome5 name="user-friends" size={24} color="black"/>
                            <Text style={styles.text}>Создателей: {getRandomValue()}</Text>
                        </View>

                        <View style={styles.statistic}>
                            <FontAwesome5 name="heart" size={24} color="black"/>
                            <Text style={styles.text}>Оценок: {getRandomValue()}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                        <Image style={styles.img} source={imgCrystal}/>
                        <Text
                            style={[styles.text, {color: colors.purpleDark, fontSize: 18}]}>Цена: {randomPriceValue} Crystal</Text>
                    </View>
                    {
                        !!routData.data.description && <View style={{marginBottom: 15}}>
                            <Text style={[styles.text, {color: colors.gray, textAlign: 'left'}]}>
                                {routData.data.description}
                            </Text>
                        </View>
                    }
                    <View style={{alignItems: 'center', marginBottom: 10}}>
                        {
                            isDone && <Text style={[styles.text, {color: colors.green, textAlign: 'center', marginBottom: 10}]}>
                               Оплата прошла ! : )
                            </Text>
                        }
                        {
                            isSmallCrystal && <Text style={[styles.text, {color: colors.red, textAlign: 'center', marginBottom: 10}]}>
                                Не хватает кристалов : (
                            </Text>
                        }
                        {
                            routData?.isHome && <Button title={'Приобрести токен'} styleText={styles.btnText}
                                                        backgroundColor={'transparent'}
                                                        colorText={'black'}
                                                        styleContainer={styles.btnContainer} onPress={onPressBuyToken}/>
                        }
                    </View>
                </View>
            </View>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    headerBack: {
        position: 'relative',
        top: 15,
        left: 10
    },
    imgAvatar: {
        position: 'relative',
        top: 30,
        borderRadius: 12,
        height: 330,
        width: 330,
    },
    imgBack: {
        justifyContent: 'center',
        alignItems: 'center',
        overlayColor: 'white',
        borderRadius: 10,
        height: 350,
        width: '100%',
    },
    btnText: {
        color: colors.black,
        fontWeight: 'bold'
    },
    btnContainer: {
        width: 167,
        minHeight: 33,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: colors.gray
    },
    img: {
        width: 24,
        height: 24,
        marginRight: 10
    },
    container: {
        flex: 1,
        backgroundColor: colors.backColor,
    },
    text: {
        fontSize: 14,
        color: colors.black,
        fontWeight: 'bold'
    },
    statistic: {
        alignItems: 'center',
    },
    blockStatistic: {
        marginTop: 20,
        marginBottom: 30,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});
export default ViewTokenS;
