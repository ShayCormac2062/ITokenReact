import React, {useCallback, useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../components/ui/baseWrapperComponent";
import {NftResponsType} from "../api/type";
import Card from "../components/listViewer/Card";
import {deviceStorage} from "../utils/storage/storage";
import {FlatList, StyleSheet, View} from "react-native";
import Header from "../components/ui/Header";
import {routerConstants} from "../constants/routerConstants";
import {DATA_SEARCH} from "../utils/commonUtils";
import {getMyCreatesTokens} from "../utils/storage/utils";
const CreatesTokensS = ({navigation}) => {
    const [myCreatesTokens, setMyCreatesToken] = useState([])
    useEffect(() => {
        getMyCreatesTokens().then((data) => {
            setMyCreatesToken(data)
        })
    }, []);
    const onPressToken =  useCallback((data) => {
        navigation.navigate(routerConstants.VIEW_TOKEN, {data: data})
    }, [])
    const renderItem = useCallback(({ item }: {item: NftResponsType}) => {
        return <Card onPress={onPressToken} item={item}/>
    }, [])
    const goBackPress = () => {
        navigation.goBack()
    }
    return (
        <BaseWrapperComponent>
            <View style={[styles.container]}>
                <Header isGoBack={true} goBackPress={goBackPress} style={{ paddingHorizontal: 9}} title={'Мои токены'}/>
                <FlatList
                    data={myCreatesTokens}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={20}
                    numColumns={2}
                    columnWrapperStyle={{justifyContent: "space-evenly", width: '100%'}}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id.toString()}
                />
            </View>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },

});
export default CreatesTokensS;
