import {deviceStorage} from "./storage";

export const getMyCrystal = async () => {
    try {
        return JSON.parse(await deviceStorage.getItem('myCrystal'))
    } catch (e) {
        console.log(e)
    }
}
export const getStatus = async () => {
    try {
        return await deviceStorage.getItem('myStatus')
    } catch (e) {
        console.log(e)
    }
}
export const getMyCreatesTokens = async () => {
    try {
        return JSON.parse(await deviceStorage.getItem('createsTokens'))
    } catch (e) {
        console.log(e)
    }
}
export const getMyBuys = async () => {
    try {
        return JSON.parse(await deviceStorage.getItem('myBuys'))
    } catch (e) {
        console.log(e)
    }
}
export const getMyName = async () => {
    try {
        return await deviceStorage.getItem('name')
    } catch (e) {
        console.log(e)
    }
}
