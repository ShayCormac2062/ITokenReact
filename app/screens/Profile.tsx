import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BaseWrapperComponent} from "../components/ui/baseWrapperComponent";
import colors from "../styles/colors";
import imgBack from '../assets/images/profile/backAvatar.png';
import imgAvatar from '../assets/images/profile/avatarSmall.png';
import Button from "../components/ui/Button";
import {FontAwesome, FontAwesome5, MaterialIcons, SimpleLineIcons} from '@expo/vector-icons';
import {routerConstants} from "../constants/routerConstants";
import {useIsFocused} from "@react-navigation/native";
import {getMyBuys, getMyCreatesTokens, getMyCrystal, getMyName, getStatus} from "../utils/storage/utils";
import TextInput from "../components/ui/TextInput";
import {deviceStorage} from "../utils/storage/storage";
import * as ImagePicker from "expo-image-picker";

const Profile = ({navigation}: any) => {
    const focus = useIsFocused()
    const randomValue = Math.floor(Math.random() * 100)
    const [name, setName] = useState(`User${randomValue}`)
    const [myCrystal, setMyCrystal] = useState('')
    const [myBuys, setMyBuys] = useState('')
    const [status, setStatus] = useState('IТопчик')
    const [myCreatesTokens, setMyCreatesTokens] = useState('')
    const [isEditName, setIsEditName] = useState(false)
    const [isEditStatus, setIsEditStatus] = useState(false)
    const [myImg, setMyImg] = useState(imgBack)

    useEffect(() => {
        if(focus) {
            getMyCrystal().then((data) => {
                setMyCrystal(data)
            })
            getStatus().then((data) => {
                if(!!data) {
                    setStatus(data)
                }
            })
            getMyBuys().then((data) => {
                setMyBuys(data?.length)
            })
            getMyCreatesTokens().then((data) => {
                setMyCreatesTokens(data?.length)
            })
            getMyName().then((data) => {
                if(!!data) {
                    setName(data)
                }
            })
        }

    }, [focus]);
    const onPressCrystal = () => {
        navigation.navigate(routerConstants.ADD_CRYSTAL)
    }
    const onPresBigBtn = (name: 'buy' | 'create_tokens') => {
        navigation.navigate(name === 'buy' ? routerConstants.MY_BUYS : routerConstants.VIEW_CREATES_TOKEN)
    }
    const onSaveName = async () => {
       try {
           await deviceStorage.saveItem('name', name)
           setIsEditName(false)
       } catch (e) {

       }
    }
    const onSaveStatus = async () => {
        try {
            await deviceStorage.saveItem('myStatus', status)
            setIsEditStatus(false)
        } catch (e) {

        }
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
                //onChangeHandler('image_url', selectedImageUri)
            }
        } catch (error) {
            console.log('Error selecting image from gallery:', error)
        }
    }
    return (
        <BaseWrapperComponent>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Image style={styles.imgBack} source={imgBack}/>
                </View>
                <View style={styles.blockTextHeader}>
                    <Button title={'EasyCrystal'} styleText={styles.btnText} backgroundColor={'transparent'}
                            colorText={'black'}
                            styleContainer={styles.btnContainer} onPress={onPressCrystal}/>
                    <Image style={styles.imgAvatar} source={imgAvatar}/>
                    <Text style={[styles.text, {color: colors.purpleDark}]}>{myCrystal ?? ''} ICrystal</Text>
                </View>
                <View style={styles.blockText}>
                    {
                        isEditName ?    <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <TextInput value={name} autoFocus={true}
                                           onChangeText={(text) => {
                                               setName(text)
                                           }} style={styles.editNameField}  />

                                <TouchableOpacity onPress={onSaveName}>
                                    <MaterialIcons name="done" size={30} color={colors.purpleDark} />
                                </TouchableOpacity>
                            </View>

                            :    <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={[styles.text, {color: colors.purpleDark, fontSize: 20}]}>{name}</Text>
                            <TouchableOpacity onPress={() => setIsEditName(true)} style={{ position: 'relative', left: 10 }} >
                                <FontAwesome5 name="pen" size={15} color={colors.purpleDark} />
                            </TouchableOpacity>
                        </View>
                    }

                </View>
                <View style={styles.bodyContainer}>
                    {
                        isEditStatus ?  <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <TextInput value={status} autoFocus={true}
                                           onChangeText={(text) => {
                                               setStatus(text)
                                           }} style={styles.editNameField}  />

                                <TouchableOpacity onPress={onSaveStatus}>
                                    <MaterialIcons name="done" size={30} color={colors.purpleDark} />
                                </TouchableOpacity>
                            </View>
                            : <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'}}>
                                <Text style={styles.text}>{status}</Text>
                                <TouchableOpacity onPress={() => setIsEditStatus(true)} style={{ position: 'relative', left: 10 }} >
                                    <FontAwesome5 name="pen" size={15} color={colors.purpleDark} />
                                </TouchableOpacity>
                            </View>
                    }

                    <View style={styles.blockStatistic}>
                        <View style={styles.statistic}>
                            <FontAwesome name="file-image-o" size={24} color="black"/>
                            <Text style={styles.text}>Куплено: {myBuys ?? '0'}</Text>
                        </View>
                        <View style={styles.statistic}>
                            <FontAwesome5 name="pen" size={19} color="black"/>
                            <Text style={styles.text}>Создано: {myCreatesTokens ?? '0'}</Text>
                        </View>

                     {/*   <View style={styles.statistic}>
                            <FontAwesome5 name="dollar-sign" size={24} color="black"/>
                            <Text style={styles.text}>Аукционы: {'4'}</Text>
                        </View>*/}
                    </View>
                    <View style={{marginTop: 30}}>
                        <TouchableOpacity onPress={() => onPresBigBtn(('buy'))} style={styles.bigBtn}>
                            <Text style={styles.btnBigText}>Покупки</Text>
                            <SimpleLineIcons name="arrow-right" size={24} color={colors.purpleDark}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPresBigBtn('create_tokens')} style={styles.bigBtn}>
                            <Text style={styles.btnBigText}>Созданные токены</Text>
                            <SimpleLineIcons name="arrow-right" size={24} color={colors.purpleDark}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    editNameField: {
        height: 40,
        marginRight: 10,
        width: 200
    },
    btnBigText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.gray
    },
    bigBtn: {
        marginBottom: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: colors.white,
        height: 68,
    },
    statistic: {
        alignItems: 'center',
    },
    blockStatistic: {
        marginTop: 20,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    btnText: {
        color: colors.gray
    },
    bodyContainer: {
        paddingHorizontal: 16
    },
    blockText: {

        justifyContent: 'center',
        alignItems: 'center'
    },
    blockTextHeader: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    btnContainer: {
        minHeight: 33,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.gray
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    imgAvatar: {
        position: 'relative',
        bottom: 40,
        right: '15%',
        height: 80,
        width: 80
    },
    containerHeader: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgBack: {
        width: '100%',
        height: 150
    },
    container: {
        paddingBottom: 10,
        flex: 1,
        backgroundColor: colors.backColor,
    },
});
export default Profile;
