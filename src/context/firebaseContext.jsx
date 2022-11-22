import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from '../components/Generic/firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, 
         signOut, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, sendPasswordResetEmail } 
         from 'firebase/auth';
import { doc, getDoc, setDoc } from "firebase/firestore";


export const firebaseContext = createContext();

export const useAuth = () => {
    const context = useContext(firebaseContext)
    if(!context) throw new Error('No hay context provider')
    return context
}

export function AuthProvider ({children}) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const fakeDataRestaurants = [
        {id:0, description:"Pardes Restaurant", imagen:"https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantsImg%2Fr2_1.jpg?alt=media&token=c3760893-f7e6-433f-b6d3-edd9238d3746", numStars:"4", workTime:"Work time 09:30 - 23:00", beforeyou:"4$"}, 
        {id:1, description:"Glamour Kafe", imagen:"https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantsImg%2Fr2_2.jpg?alt=media&token=21037284-d72a-439a-88b2-1e15acb91f37", numStars:"3", workTime:"Work time 09:00 - 21:00", beforeyou:"13$"}, 
        {id:2, description:"Aromat Bakery", imagen:"https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantsImg%2Fr2_3.jpg?alt=media&token=7a429d56-3a67-4cf4-bffa-c62e6d406782", numStars:"5", workTime:"Work Time 09:00 - 22:00", beforeyou:"3$"}, 
    ];

    const fakeDataDishes = [
        {id:1, descripcion: "Bolognese Salad", description: "Onion and vegetables", price: 14.45, imagen: "https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Fbolognese.jpg?alt=media&token=757c22ba-1e5c-4c2c-b8ce-ac94f19ea495"}, 
        {id:2, descripcion: "Salad with shrimp", description: "Best salad of the world!", price: 19.05, imagen: "https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Fcaesarsalad.jpg?alt=media&token=d1629be1-afbf-435c-948c-12c123952d4a"}, 
        {id:3, descripcion: "Caesar salad without sauce", description: "Tomatoes, chicken, sauce!", price: 17.45, imagen: "https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Ffruitsalad.jpg?alt=media&token=822b1174-2543-4706-a3ba-d1c93cf7aecc"}, 
        {id:4, descripcion: "Fresh with funcheza", description: "Funcheza and fresh tomatoes", price: 14.45, imagen: "https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Ffuncheza.jpg?alt=media&token=c108e4d2-364c-4dbb-8924-e3de3c5a13e0"}, 
        {id:5, descripcion: "Fruit salad", description: "Apple, orange, strawberry and more", price: 12.45, imagen: "https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Fshrimp.jpg?alt=media&token=24ceb12c-4e25-46c6-b4ac-99648080600e"}, 
        {id:6, descripcion: "Vegetable salad", description: "Avocado, tomato, onion", price: 13.45, imagen: "https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Fvegetablesalad.jpg?alt=media&token=50a41093-e973-4bc8-a411-26ce8383d81d"}
    ];

    const fakeDataDishes2 = [
        {id:1, name: "French Onion Soup", description: "Slow simmered, sweet onios, toped with savory", price: 13.28, imagen: "https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Fr2_1.jpg?alt=media&token=ddda1ccd-c5d5-4a8b-97f5-fec6f19fb528"}, 
        {id:2, name: "Soy Marinated", description: "Elegancy marbled japanese", price: 17.05, imagen: "https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Fr2_2.jpg?alt=media&token=1258b59a-3ceb-4d8f-b3df-f6b54eae52fd"}, 
        {id:3, name: "Onion Soup", description: "Bollet onios, grated cheese", price: 17.45, imagen: "https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Fr2_3.jpg?alt=media&token=4928da68-3864-4f85-8f03-6435a7ec2209"}, 
        {id:4, name: "Fresh with funcheza", description: "Beef filet marinated in soy sauce", price: 14.45, imagen: "https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Fr2_4.jpg?alt=media&token=9b0c9e2a-ca92-452a-8d4b-0625ed9ce822"}
    ];

    const fakeDataDishes3 = [
        {id:1, name: "French Onion", description: "Slow simmered, sweet onios, toped with savory", price: 13.28, imagen: "https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Fr3_1.jpeg?alt=media&token=7c0968e2-0051-46c9-86ae-2ad72d7ca547"}, 
        {id:2, name: "Soy Marinated", description: "Elegancy marbled japanese", price: 17.05, imagen: "https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Fr3_2.jpg?alt=media&token=95fced51-ab3f-4672-afaf-63cb767f97f2"}, 
        {id:3, name: "Fruit salad", description: "Bollet onios, grated cheese", price: 17.45, imagen: "https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Fr3_3.jpg?alt=media&token=025c1a25-cf9d-4636-80e7-e3dcfc1f62a4"}, 
        {id:4, name: "Vegetable salad", description: "Beef filet marinated in soy sauce", price: 14.45, imagen: "https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Fr3_4.jpg?alt=media&token=345f65b1-ff46-45f2-859b-45cf1c227e7e"}
    ];


    //Register
    const signup = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password);
    }

    //Login
    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
        const docuRef = doc(firestore, `usersDb/${email}`);
        const queryDoc =  await getDoc(docuRef);
        if(queryDoc.exists()) {
            const infoDocu = queryDoc.data();
            return infoDocu.role;
        } else {
            const docuRef = doc(firestore, `usersDb/default`);
            const queryDoc =  await getDoc(docuRef);
            const infoDocu = queryDoc.data();
            return infoDocu.role;
        }
    }

    //Logout
    const logout = () => signOut(auth);

    //Login with Google
    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }

    //Login with Facebook
    const loginWithFacebook = () => {
        const facebookProvider = new FacebookAuthProvider();
        return signInWithPopup(auth, facebookProvider);
    }

    //ResetPassword
    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email);
    }

    //Find Restaurants
    const findRestaurants =  async () => {
        const docuRef = doc(firestore, `restaurantsDb/items`);
        const queryDoc =  await getDoc(docuRef);
        if(queryDoc.exists()) {
            const infoDocu = queryDoc.data();
            return infoDocu.restaurants;
        } else {
            await setDoc(docuRef, {restaurants: [...fakeDataRestaurants]});
            const queryDoc =  await getDoc(docuRef);
            const infoDocu = queryDoc.data();
            return infoDocu.restaurants;
        }
    }

    //Find Dishes
    const findDishes =  async (restaurantId) => {
        const docuRef = doc(firestore, `restaurantsDb/${restaurantId}`);
        const queryDoc =  await getDoc(docuRef);
        if(queryDoc.exists()) {
            const infoDocu = queryDoc.data();
            return infoDocu.dishes;
        } else {
            await setDoc(docuRef, {dishes: [...fakeDataDishes3]});
            const queryDoc =  await getDoc(docuRef);
            const infoDocu = queryDoc.data();
            return infoDocu.dishes;
        }
    }

    useEffect(() => {
        const unsusbcribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsusbcribe();
    }, [])

    return (
        <firebaseContext.Provider value={{signup, login, user, logout, loading, 
            loginWithGoogle, loginWithFacebook, resetPassword, findRestaurants, findDishes}}>
            {children}
        </firebaseContext.Provider>
    )
}