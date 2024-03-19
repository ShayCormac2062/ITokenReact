import React, {useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../components/ui/baseWrapperComponent";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import crystalImg from '../assets/images/crystal.png'
import Button from "../components/ui/Button";
import colors from "../styles/colors";
import {deviceStorage} from "../utils/storage/storage";
import {useIsFocused} from "@react-navigation/native";
import {getMyBuys, getMyCrystal} from "../utils/storage/utils";


const AddCrystalS = ({navigation}) => {
    const focus = useIsFocused()
    const [myCrystal, setMyCrystal] = useState(0)

    const onPressCrystal = async () => {
        await deviceStorage.saveItem('myCrystal', String(myCrystal + 1))
        setMyCrystal(prevState => prevState + 1)
    }
    useEffect(() => {
        if(focus) {
            getMyCrystal().then((data) => {
                setMyCrystal(+data)
            })
        }

    }, [focus]);
    const onGoBack = () => {
        navigation.goBack()
    }
    return (
        <BaseWrapperComponent>
            <View style={{paddingHorizontal: 16, paddingTop: 20}}>
                <Button title={'Назад'} styleText={styles.btnText} backgroundColor={'transparent'}
                        colorText={'black'}
                        styleContainer={styles.btnContainer} onPress={onGoBack}/>

            </View>
            <View style={styles.container}>
                {
                    !!myCrystal && <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                        <Text style={{fontSize: 20, fontWeight: 500, color: colors.gray}}>Total:</Text>
                        <Text style={{fontSize: 20, fontWeight: 500, color: colors.purpleDark}}>
                            {' '}{myCrystal}
                        </Text>
                    </View>
                }
                <TouchableOpacity onPress={onPressCrystal}>
                    <Image style={styles.img} source={crystalImg}/>
                </TouchableOpacity>
            </View>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
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
        height: 180,
        width: 158.5,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 10,
    },

});
export default AddCrystalS;
