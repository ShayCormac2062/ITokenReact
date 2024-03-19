import axios from 'axios'

export const BASE_URL = 'https://s-wash.com/'

export const instance = axios.create({
	baseURL: BASE_URL,
})
