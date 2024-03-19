import axios from "axios";
import {CollectionType, NftResponsType} from "./type";

export const authApi = {
    async getNft() {
        return await axios.get<{ assets: NftResponsType[] }>(`https://raw.githubusercontent.com/ShayCormac2062/MyNFTApi/master/assets.json`)
    },
    async getCollections() {
        return await axios.get< {collections: CollectionType[]} >(`https://raw.githubusercontent.com/ShayCormac2062/MyNFTApi/master/collections.json`)
    },
}
