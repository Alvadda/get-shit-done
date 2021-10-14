export const AUTH_TOKEN = 'jwt_token'
export const USER_NAME = 'user_name'

export const getUserName = () => getItem(USER_NAME)
export const getAuthToken = () => getItem(AUTH_TOKEN)

export const setUserName = (item: string) => sessionStorage.setItem(USER_NAME, item)
export const setAuthToken = (item: string) => sessionStorage.setItem(AUTH_TOKEN, item)

export const removeUserName = () => sessionStorage.removeItem(USER_NAME)
export const removeAuthToken = () => sessionStorage.removeItem(AUTH_TOKEN)

const getItem = (itemName: string) => {
    const item = sessionStorage.getItem(itemName)
    if (!item) return undefined
    return item
}
