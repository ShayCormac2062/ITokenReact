import React, {useCallback} from 'react';
import Header from "../components/ui/Header";
import {BaseWrapperComponent} from "../components/ui/baseWrapperComponent";
import {Nft} from "../models/Nft";
import {defaultPathLocalRealm} from "../models";
import {FlatList, StyleSheet, View} from "react-native";
import {CollectionType, NftType} from "../api/type";
import Card from "../components/listViewer/Card";
import colors from "../styles/colors";
import Categories from "../components/listViewer/categories";
import {Collection} from "../models/Collection";
import CollectionItem from "../components/listViewer/CollectionItem";
import {DATA_SEARCH} from "../utils/commonUtils";
import {routerConstants} from "../constants/routerConstants";
import {useGoBack} from "../hook/useGoBack";

const {useQuery} = defaultPathLocalRealm;

const Home = ({navigation}) => {
    const goBackPress = () => {
        navigation.navigate('Home')
        return true
    }

    useGoBack(goBackPress)
    const nftRealmResult = useQuery<Nft>(Nft);
    const collectionRealmResult = useQuery<Collection>(Collection);
    const onPresCard = useCallback((data: NftType) => {
        navigation.navigate(routerConstants.VIEW_TOKEN, {data: data, isHome: true})
    }, [])
    const renderItem = useCallback(({ item }: {item: NftType}) => {
        return <Card onPress={onPresCard} item={item}/>
    }, [])
    const renderCollection = useCallback(({ item }: {item: CollectionType}) => {
        return <CollectionItem onPress={onPresCard} item={item}/>
    }, [])
    const onPressCategories = useCallback((val) => {
        navigation.navigate(routerConstants.SEARCH_S,  { categoryData: val })
    }, [])
    const renderCategories = useCallback(({ item }) => {
        return <Categories onPress={onPressCategories} item={item}/>
    }, [])
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
           <View style={styles.container}>
               <Header style={{ alignItems: 'center'}} title={'Главная'}/>
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
               <View style={{ alignItems: 'flex-start', width: '100%', justifyContent: 'flex-start'}}>
                   <Header style={{ paddingHorizontal: 9,}} title={'Библиотека токенов'}/>
                   <FlatList
                       data={nftRealmResult?.slice(0, 20)}
                       style={{width: "100%"}}
                       showsHorizontalScrollIndicator={false}
                       horizontal
                       renderItem={renderItem}
                       keyExtractor={(item, index) => item.id.toString()}
                   />
               </View>
               <View style={{ alignItems: 'flex-start', width: '100%', justifyContent: 'flex-start'}}>
                   <Header style={{ paddingHorizontal: 9,}} title={'Выгодные предложения'}/>
                   <FlatList
                       data={nftRealmResult?.slice(50, 70)}
                       style={{width: "100%"}}
                       showsHorizontalScrollIndicator={false}
                       horizontal
                       renderItem={renderItem}
                       keyExtractor={(item, index) => item.id.toString()}
                   />
               </View>
               <View style={{ alignItems: 'flex-start', width: '100%', justifyContent: 'flex-start'}}>
                   <Header style={{ paddingHorizontal: 9 }} title={'Трендоые коллекции'}/>
                   <FlatList
                       data={collectionRealmResult?.slice(20, 40)}
                       style={{width: "100%"}}
                       showsHorizontalScrollIndicator={false}
                       horizontal
                       renderItem={renderCollection}
                       keyExtractor={(item, index) => index.toString()}
                   />
               </View>
           </View>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingBottom: 100,
        flex: 1,
        backgroundColor: colors.backColor,
        paddingHorizontal: 10,
    },
});
export default Home;
