import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';

const FirebaseContext = createContext();

export const useFirebase = () => {
    return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
    const [firebaseInstance, setFirebaseInstance] = useState(null);
  
    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyB27TQtWi8NqDBiQGBQ3YKZuQ8VWNV0zF8",
            authDomain: "shoppy-c5d74.firebaseapp.com",
            databaseURL: "https://shoppy-c5d74-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "shoppy-c5d74",
            storageBucket: "shoppy-c5d74.appspot.com",
            messagingSenderId: "771369000220",
            appId: "1:771369000220:web:b1df00664758706dabeed9",
            measurementId: "G-4KMB8G38YM"
          };
  
      const app = initializeApp(firebaseConfig);
      console.log(app)
      setFirebaseInstance(app);
  
    //   return () => {
    //     // 컴포넌트 언마운트 시 Firebase 인스턴스 정리
    //     app.delete();
    //   };
    }, []);
  
    return (
      <FirebaseContext.Provider value={firebaseInstance}>
        {children}
      </FirebaseContext.Provider>
    );
};
