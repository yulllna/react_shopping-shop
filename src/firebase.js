import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';

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
