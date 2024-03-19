import React, {useEffect, useState} from 'react';
import {Animated, Easing, StyleSheet, DeviceEventEmitter} from "react-native";
import {Nft} from "../models/Nft";
import {authApi} from "../api/authApi";
import {defaultPathLocalRealm} from "../models";
import imgSplash from '../../assets/Rectangle.png'
import colors from "../styles/colors";
import {routerConstants} from "../constants/routerConstants";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {Collection} from "../models/Collection";
import {Realm} from "@realm/react";

const {useRealm, useQuery} = defaultPathLocalRealm;
type SplashScreenProps = {
    navigation: NavigationProp<ParamListBase>
}
const SplashScreen = ({navigation}: SplashScreenProps) => {
    const realm = useRealm();
    const nftRealmResult = useQuery<Nft>(Nft);
    const collectionRealmResult = useQuery<Collection>(Collection);

    async function getNfts() {
        try {
            const {data} = await authApi.getNft();
            realm.write(() => {
                data.assets.forEach(nftData => {
                    const idNft = String(nftData.id)
                    const newNft = {
                        name: nftData.name ?? '11111',
                        image_url: nftData.image_url ?? '11111',
                        description: nftData.description ?? '1213131',
                        ownerUserName: nftData?.owner?.user?.username ?? '',
                        price: nftData.asset_contract?.seller_fee_basis_points,
                        id: idNft,
                    };
                    realm.create('Nft', newNft);
                });
            });

            navigation.navigate(routerConstants.MAIN);
        } catch (error) {
            console.error('Error fetching data or saving to Realm:', error);
        }
    }

    async function getCollections() {
        try {
            const {data} = await authApi.getCollections();
            realm.write(() => {
                data.collections.forEach(collectionData => {
                    const newCollection = {
                        ...collectionData,
                        _id: new Realm.BSON.ObjectId(),
                    };
                    realm.create('Collection', newCollection);
                });
            });
        } catch (error) {
            console.error('Error getCollections fetching data or saving to Realm:', error);
        } finally {
        }
    }

    const [bounceValue] = useState(new Animated.Value(1));
    useEffect(() => {
        const bounceAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(bounceValue, {
                    toValue: 1,
                    duration: 0,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(bounceValue, {
                    toValue: 0,
                    duration: 1500,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );
        DeviceEventEmitter.addListener('heartrateChanged', (e) => { console.log(e)})

        bounceAnimation.start();
    }, []);
    return (
        <Animated.View
            style={styles.container}
        >
            <Animated.Image
                style={{
                    width: 200,
                    height: 200,
                    borderRadius: 16,
                    transform: [{scale: 1}],
                }}
                source={imgSplash}
            />
        </Animated.View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: '60%',
        height: '60%'
    }
});

export default SplashScreen;
