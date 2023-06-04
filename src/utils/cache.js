const appName = 'weather_app';

export const setToken = (value)=> {
    localStorage.setItem(`${appName}_token`, value)
}

export const getToken = async () => {
   return await localStorage.getItem(`${appName}_token`);
}

export const removeToken = () => {
    localStorage.removeItem(`${appName}_token`);
}