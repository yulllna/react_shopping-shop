import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set,remove } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { v4 as uuid } from "uuid";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//export default app;
export const db = getDatabase(app);
export const auth = getAuth();
const provider = new GoogleAuthProvider();

export const login = () => {
    signInWithPopup(auth, provider)
    .catch((error) => {
        console.log(error)
    });
}

export const logout = () => {
    signOut(auth).then(() => null).catch((error) => {
        console.log(error)
      });
}

export function onUserStateChange(callback) {
    onAuthStateChanged(auth, async (user) => {
        user && adminUser(user)
        const updatedUser = user ? await adminUser(user) : null;
        callback(updatedUser)
    })
}

async function adminUser(user) {
    return get(ref(db, 'admins')).then((snapshot) => {
        if(snapshot.exists()) {
            const admins = snapshot.val();
            const isAdmin = admins.includes(user.uid);
            return {...user, isAdmin}
        }
        return user;
    });
}

export async function addNewProduct (product, image) {
    const id = uuid()
    const params = {
        id,
        title: product.filter((item) => item.code === 'NAME')[0].data,
        price: parseInt(product.filter((item) => item.code === 'PRICE')[0].data),
        category: product.filter((item) => item.code === 'CATEGORY')[0].data,
        description: product.filter((item) => item.code === 'DESCRIPTION')[0].data,
        options: product.filter((item) => item.code === 'OPTIONS')[0].data.split(','),
        image,
    }
    return set(ref(db, `products/${id}`), params)
}

export async function getProducts() {
    return await get(ref(db, 'products')).then((snapshot) => {
        if(snapshot.exists()) {
            return Object.values(snapshot.val())
        }
        return [];
    });
}

export async function getCart(userId) {
    return get(ref(db, `carts/${userId}`))
    .then(snapshot => {
        const items = snapshot.val() || {};
        return Object.values(items);
    })
}

export async function addOrUpdateToCart(userId, product) {
    return set(ref(db, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, id) {
    return remove(ref(db, `carts/${userId}/${id}`));
}