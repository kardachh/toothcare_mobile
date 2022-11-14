import {appDB} from "../firebaseConfig";
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where,} from "firebase/firestore";
import {Client, Service} from "./types";
import {useAppDispatch} from "./redux/hooks";
import {setUser} from "./redux/store";
import clients from "./assets/clients";
import {format} from "date-fns";

const dbFirestore = getFirestore(appDB);

export const useAPI = () => {
    const dispatch = useAppDispatch();

    const authUser = async (login: string, password: string) => {
        const q = query(
            collection(dbFirestore, "users"),
            where("login", "==", login),
            where("password", "==", password)
        );
        return await getDocs(q).then((docs) => {
            if (docs.size !== 0) {
                dispatch(setUser({id: docs.docs[0].id}));
                return true;
            } else return false;
        });
    };

    const getService = async (id: string) => {
        const snap = await getDoc(doc(dbFirestore, "services", id));
        if (snap.exists()) {
            // console.log("getService", snap.data());
            return snap.data();
        } else {
            return null;
        }
    };

    const getServices: () => Promise<Service[]> = async () => {
        const querySnapshot = await getDocs(collection(dbFirestore, "services"));
        const services: Service[] = [];
        querySnapshot.forEach((doc) => {
            services.push({
                description: doc.data().description,
                name: doc.data().name,
                price: doc.data().price,
                id: doc.id,
            })
        })
        return services
    };

    const getClient = async (id: string) => {
        const snap = await getDoc(doc(dbFirestore, "clients", id));
        if (snap.exists()) {
            // console.log("getClient", snap.data());
            return snap.data();
        } else {
            return null;
        }
    };

    const getClients: () => Promise<Client[]> = async () => {
        const querySnapshot = await getDocs(collection(dbFirestore, "clients"));
        const clients: Client[] = [];
        querySnapshot.forEach((doc) => {
            clients.push({
                FirstName: doc.data().FirstName,
                LastName: doc.data().LastName,
                SecondName: doc.data().SecondName,
                phone: doc.data().phone,
                id: doc.id
            })
        })
        return clients;
    };

    const addClient: (client: Client) => Promise<any> = async (client: Client) => {
        // Add a new document in collection "cities"
        await addDoc(collection(dbFirestore, "clients"), client);
        // console.log('Added document with ID: ', res.id);
    }

    const getOrder = async (id: string) => {
        const snap = await getDoc(doc(dbFirestore, "orders", id));
        if (snap.exists()) {
            return Promise.all([
                ({id: id}),
                ({date: snap.data().date}),
                ({time: snap.data().time}),
                getDoc(snap.data().client).then((res) => ({client: res.data()})),
                getDoc(snap.data().service).then((res) => ({service: res.data()})),
                getDoc(snap.data().user).then((res) => ({user: res.id})),
            ]).then((values) => {
                const order = {}
                values.forEach(val => {
                    Object.assign(order, val)
                });
                return order
            });
        } else {
            return null;
        }
    };

    // TODO: add safe delete (delete referenced docs from another collection)
    const deleteDocFromDb : (collectionName:string, idDoc:string) => Promise<void> = async (collectionName,idDoc) => {
        await deleteDoc(doc(dbFirestore,collectionName,idDoc))
    }

    const updateDocFromDb : (collectionName:string, idDoc:string, newInfo:any) => Promise<void> = async (collectionName,idDoc,newInfo) => {
        await updateDoc(doc(dbFirestore,collectionName,idDoc), newInfo)
    }

    // const

    const getOrdersForDay = async (date: Date = new Date()) => {
        const q = query(
            collection(dbFirestore, "orders"),
            where("date", "==", format(date, "dd.MM.yyyy")),
        );
        return await getDocs(q).then((docs) => {
            const orders: string[] = []
            docs.docs.forEach(doc => orders.push(doc.id))
            return orders;
        });
    };


    return {
        authUser,
        getClient,
        getClients,
        getService,
        getServices,
        getOrder,
        getOrdersForDay,
        addClient,
        updateDocFromDb,
        deleteDocFromDb,
    };
};
