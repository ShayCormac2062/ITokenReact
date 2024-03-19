import React, {useEffect} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import colors from "../../styles/colors";
import {CollectionType} from "../../api/type";

type CollectionProps = {
    item: CollectionType
    onPress: (val: any) => void
}
const CollectionItem = ({item, onPress}: CollectionProps) => {
    const isGifs = !!item?.animation_original_url

    return (
        <Pressable style={styles.container} onPress={() => onPress(item)}>
            <View style={{position: 'relative'}}>
                <Image style={[styles.imgAvatar, isGifs && styles.overlay]} source={{uri: item.image_url, width: 50, height: 50}}/>
                <Image style={[styles.img, isGifs && styles.overlay]}  source={{uri: item.image_url, height: 141}}/>
            </View>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center', flex: 1
            }}>
                <Text numberOfLines={1} style={[styles.text, {color: colors.purpleDark}]}>{item.name}</Text>
                <Text numberOfLines={1} style={[styles.text, {fontSize: 12}]}>{item.name}</Text>
            </View>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    overlay:{
        overlayColor: 'white',

    },
    imgAvatar: {
        position: 'absolute',
        borderRadius: 50,
        bottom: -20,
        right: 91,
        borderWidth: 2,
        borderColor: colors.white,
        zIndex: 10
    },
    text: {color: colors.black, fontSize: 14, fontWeight: '700'},
    blockText: {},
    img: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    container: {
        width: 237,
        height: 226,
        borderRadius: 10,
        backgroundColor: colors.white,
        marginRight: 17,
        marginLeft: 9,
        marginBottom: 10,

    },
});
export default CollectionItem;
