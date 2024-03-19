import React, {memo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {NftResponsType, NftType} from "../../api/type";
import colors from "../../styles/colors";
import crystalImg from '../../assets/images/card/crystal.png'
import likeBlack from '../../assets/images/card/heroicons_heart_black.png'
import {generateBoxShadowStyle, getRandomValue} from "../../utils/commonUtils";

interface CardProps<T> {
    item: NftType
    onPress: (data: NftType) => void
}

const Card = <T, >({item, onPress}: CardProps<T>) => {
    const generateShadow = generateBoxShadowStyle(2, 2, '#171717', 0.2, 10, 5, '#171717')
    return (
        <Pressable onPress={() => onPress(item)}>
            <View style={[styles.item, generateShadow]}>
                <Image style={styles.img} borderRadius={8} source={{uri: item.image_url}}/>
                <View style={styles.blockText}>
                    <Text style={{...styles.text, marginTop: 5}}>Yokoyan</Text>
                    <Text numberOfLines={1}
                          style={{...styles.text, color: colors.purpleDark, marginTop: 5}}>{item.name}</Text>
                </View>
                <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.imgBottom} borderRadius={8} source={crystalImg}/>
                        <Text style={styles.text}>{item?.price ?? getRandomValue()}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.imgBottom} borderRadius={8} source={likeBlack}/>
                        <Text style={styles.text}>{getRandomValue()}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    text: {color: colors.gray, fontSize: 14, fontWeight: '700'},
    imgBottom: {marginRight: 5, width: 24, height: 24},
    blockText: {},
    img: {
        overlayColor: 'white',
        borderRadius: 10,
        height: 132,
        width: 144,
    },
    item: {
        width: 160,
        borderRadius: 10,
        padding: 10,
        backgroundColor: colors.white,
        marginRight: 17,
        marginLeft: 9,
        marginBottom: 10
    },
});
export default memo(Card)
