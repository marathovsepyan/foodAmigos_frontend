import axios from "axios";
import { getCookie } from "../helper";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        Accept: 'application/json',
    },
})

// api.interceptors.request.use(async (config) => {
//     const token = getCookie('accessToken');
//     if  (token && !config.headers.non_auth) {
//       config.headers.Authorization = `Bearer ${token}`;
//       config.headers['Accept-Language'] = "en"
//     }
//     return config;
//   });

//   api.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       const { response } = error;
//       const { status } = response;
//       if (status === 401) {
//         deleteCookie('accessToken', '');
//         window.location.href = "/auth/login";
//       }
//       throw error;
//     }
//   ) 

const token = getCookie("token");
export const getProducts = () => {
    return api.get('products')
}
export const getAuth = (data) => {
    return api.post('tokens', data)
}

export const getBaskets = () => {
    return api.get('baskets', { headers: { "Authorization": `Bearer ${token}` } });
}

export const addBaskets = (data) => {

    return api.post('baskets',
        { productId: data.productId, count: +data.count },
        { headers: { "Authorization": `Bearer ${token}` } });

}

export const updateBasket = (data) => {
    return api.patch(`baskets/${data.id}`, { note: data.values.note, count: +data.values.count }, {
        headers: { "Authorization": `Bearer ${token}` }
    });
}
export const deleteBasket = (data) => {
    return api.delete(`baskets/${data}`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
}

export const getOrders = () => {
    return api.get('orders', { headers: { "Authorization": `Bearer ${token}` } });
}

export const createOrder = (data) => {
    return api.post('orders',
        data,
        { headers: { "Authorization": `Bearer ${token}` } });

}

export const signUp = (data) =>{
    return api.post('sign-up',data)
}



