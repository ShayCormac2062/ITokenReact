import {Platform} from "react-native";

export const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid,
) => {
    if (Platform.OS === 'ios') {
        return {
            shadowColor: shadowColorIos,
            shadowOffset: {width: xOffset, height: yOffset},
            shadowOpacity,
            shadowRadius,
        };
    } else if (Platform.OS === 'android') {
        return {
            elevation,
            shadowColor: shadowColorAndroid,
        };
    }
};


export const DATA_SEARCH = [
    {
        name: 'Art', value: ["mir",
            "Son",
            "Guil",
            "Sheep",
            "Line",
            "Bed",
            "MAN",
            "Self",
            "#266",
            "WIP",
            "Wei",
            "cry",
            "art",
            "Money",
            "FPH",
            "#1500",
            "pix",
            "Angel",
            "Snail"], colorStart: '#911918', colorEnd: '#DC1102'
    },
    {
        name: 'Collectibles', value: ["Bears",
            "tao",
            "Ape",
            "Meet",
            "Fox",
            "Furri",
            "Dour",
            "Zeb",
            "Drug",], colorStart: '#18661A', colorEnd: '#F1E336'
    },
    {
        name: 'DomainNames', value: ["Big",
            "Calla",
            "363",
            "Uk",
            "Lot",
            "put",
            "Kid",
            "video",
            "Su D",
            "clt",
            "Weird",], colorStart: '#93811F', colorEnd: '#F1E336'
    },
    {
        name: 'Music', value: ["Meta",
            "Punks",
            "Cup",
            "skull",
            "0034",
            "gta",
            "Rock",
            "Pick",
            "Meka",
            "Pass",
            "Mand",], colorStart: '#A6671D', colorEnd: '#D88B19'
    },
    {
        name: 'Sports', value: ["SU",
            "Detroit",
            "Meme",
            "Bik",
            "Pet",], colorStart: '#18661A', colorEnd: '#36E040'
    },
    {
        name: 'TradingCards', value: ["DAO",
            "Pass",
            "Kokeshi",
            "#1092",
            "SPACE",
            "Bart",
            "Eve",
            "pik",
            "pix",], colorStart: '#911918', colorEnd: '#DC1102'
    },
    {
        name: 'Utility', value: ["Gen",
            "Eye",
            "Vault",
            "Alien",
            "Paper",
            "Sons",
            "SNA",
            "gm",], colorStart: '#18661A', colorEnd: '#36E040'
    },
    {
        name: 'VirtualWorlds', value: ["53",
            "Asta",
            "Dog",
            "cre",
            "THE",
            "Conta",
            "Hiki",
            "God",
            "Hell",
            "SEE",], colorStart: '#911918', colorEnd: '#DC1102'
    },

]
export const getRandomId = () => +Math.random().toString(20).slice(20)
export const getRandomValue = () => {
    return Math.floor(Math.random() * 100)
}
