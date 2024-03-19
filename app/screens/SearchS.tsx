import React, {useCallback, useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../components/ui/baseWrapperComponent";
import {FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, TouchableOpacity, View} from "react-native";
import Header from "../components/ui/Header";
import {Nft} from "../models/Nft";
import {NftResponsType} from "../api/type";
import Card from "../components/listViewer/Card";
import {defaultPathLocalRealm} from "../models";
import SearchInput from "../components/SearchInput";
import {DATA_SEARCH} from "../utils/commonUtils";
import Categories from "../components/listViewer/categories";
import {useKeyBoardStatus} from "../hook/useKeyBoardStatus";
import {routerConstants} from "../constants/routerConstants";

const {useQuery} = defaultPathLocalRealm;
const SearchS = ({navigation, route}) => {
    const routeData = route.params
 const {keyboardStatus} = useKeyBoardStatus()
    const nftRealmResult: any = useQuery<Nft>(Nft);
    const [value, setValue] = useState('')
    const [scroll, setScroll] = useState(0)
    const [searchCategory, setSearchCategory] = useState<string>('');
    const [searchResults, setSearchResults] = useState<NftResponsType[]>(nftRealmResult);
    useEffect(() => {
        if(routeData?.categoryData) {
            const {name, value} = routeData.categoryData
            setSearchResults(searchDataForCategory(value))
            setSearchCategory(name)
        }
    }, [route.params]);
    const searchNft = (searchString: string): any => {
        return nftRealmResult.filtered(`name CONTAINS[c] "${searchString}"`);
    };
    const searchDataForCategory = (categoryData): any => {
        const filterString = categoryData.map(value => `name CONTAINS[c] "${value}"`).join(' OR ');
        return nftRealmResult.filtered(filterString);
    };
    const onChangeText = (text: string) => {
        setValue(text);
        const results = searchNft(text);
        setSearchResults(results);
    }
    const onPresCard = useCallback((data) => {
        navigation.navigate(routerConstants.VIEW_TOKEN, {data: data, isHome: true})
    }, [])
    const renderItem = useCallback(({item}: { item: NftResponsType }) => {
        return <Card onPress={onPresCard} item={item}/>
    }, [])
    const onPressCategories = useCallback((categoryData) => {
        const filteredData = searchDataForCategory(categoryData.value)
        setSearchResults(filteredData)
        setSearchCategory(categoryData.name)
    }, []);
    const renderCategories = useCallback(({ item }) => {
        return <Categories onPress={onPressCategories} item={item}/>
    }, [])
    const onPressClearCategory = useCallback(() => {
        setSearchCategory('')
        setSearchResults(nftRealmResult)
    }, [])
    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        setScroll(e.nativeEvent.contentOffset)
    }
    return (
        <BaseWrapperComponent>
            <View style={[styles.container, {paddingBottom: keyboardStatus ? 0 : 330}]}>
                <Header style={{alignItems: 'center'}} title={'Поиск'}/>
                <View style={{ marginBottom: 10}}>
                    <SearchInput value={value} onChangeText={onChangeText}/>
                </View>
                <View style={{ alignItems: 'flex-start', width: '100%', justifyContent: 'flex-start'}}>
                    <FlatList
                        data={DATA_SEARCH}
                        style={{width: "100%"}}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={renderCategories}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={{alignItems: 'flex-start', width: '100%', justifyContent: 'flex-start'}}>
                       <Header style={{ paddingHorizontal: 9 }} onPressClear={onPressClearCategory} isIco={!!searchCategory} title={searchCategory ? searchCategory : 'Библиотека токенов'}/>
                    <FlatList
                        onScroll={onScroll}
                        showsVerticalScrollIndicator={false}
                        data={searchResults}
                        initialNumToRender={20}
                        numColumns={2}
                        columnWrapperStyle={{justifyContent: "space-evenly", width: '100%'}}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.id.toString()}
                    />
                </View>
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
export default SearchS;
