import {appDB} from "../firebaseConfig";
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where,} from "firebase/firestore";
import {Client, Order, Service, User} from "./types";
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
                dispatch(setUser({id: docs.docs[0].id, type: docs.docs[0].data().type}));
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

    const getDelServices: () => Promise<string[]> = async () => {
        const querySnapshot = await getDocs(collection(dbFirestore, "delServices"));
        const delServices: string[] = [];
        querySnapshot.forEach((doc) => {
            delServices.push(
                doc.data().delServiceId
            )
        })
        return delServices
    };

    const getUsers: () => Promise<User[]> = async () => {
        const querySnapshot = await getDocs(collection(dbFirestore, "users"));
        const users: User[] = [];
        querySnapshot.forEach((doc) => {
            users.push({
                FirstName: doc.data().FirstName,
                LastName: doc.data().LastName,
                SecondName: doc.data().SecondName,
                id: doc.id,
                type: doc.data().type,
            })
        })
        return users
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

    const addDelService: (serviceId : string) => Promise<void> = async (serviceId) => {
        // Add a new document in collection "cities"
        await addDoc(collection(dbFirestore, "delServices"), {delServiceId: serviceId});
        // console.log('Added document with ID: ', res.id);
    }

    const getOrder = async (id: string) => {
        const snap = await getDoc(doc(dbFirestore, "orders", id));
        if (snap.exists()) {
            return Promise.all([
                ({id: id}),
                ({date: snap.data().date}),
                ({time: snap.data().time}),
                getDoc(snap.data().client).then((res) => ({client: {...res.data() as Object, id: res.id}})),
                getDoc(snap.data().service).then((res) => ({service: {...res.data() as Object, id: res.id}})),
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

    const addService: (service: Service) => Promise<any> = async (service) => {
        await addDoc(collection(dbFirestore, "services"), service);
        // console.log('Added document with ID: ', res.id);
    }

    const addDocToDb : (collectionName:string, newInfo:any) => Promise<void> = async (collectionName, newInfo) => {
        await addDoc(collection(dbFirestore,collectionName), newInfo)
    }

    const deleteDocFromDb : (collectionName:string, idDoc:string) => Promise<void> = async (collectionName,idDoc) => {
        await deleteDoc(doc(dbFirestore,collectionName,idDoc))
    }

    const updateDocFromDb : (collectionName:string, idDoc:string, newInfo:any) => Promise<void> = async (collectionName,idDoc,newInfo) => {
        await updateDoc(doc(dbFirestore,collectionName,idDoc), newInfo)
    }

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

    const getOrdersForClient = async (clientId:string) => {
        const clientDocRef = doc(dbFirestore,"clients",clientId)
        const q = query(
            collection(dbFirestore, "orders"),
            where("client", "==", clientDocRef),
        );
        return await getDocs(q).then((docs) => {
            const orders: string[] = []
            docs.docs.forEach(doc => orders.push(doc.id))
            return orders;
        });
    };

    const addOrder: (order: Order) => Promise<any> = async (order) => {
        await addDoc(collection(dbFirestore, "orders"), {
            client: doc(dbFirestore, "clients", `${order.client.id}`),
            date: `${order.date}`,
            service: doc(dbFirestore, "services", `${order.service.id}`),
            time: `${order.time}`,
            user: doc(dbFirestore, "users", `${order.user.id}`),
        });
        // console.log('Added document with ID: ', res.id);
    }

    const updateOrder: (info:Order) => Promise<void> = async (info) => {
        // console.log("from api.ts",info, info.id)
        const newInfo = {
            client: doc(dbFirestore, "clients", `${info.client.id}`),
            date: `${info.date}`,
            service: doc(dbFirestore, "services", `${info.service.id}`),
            time: `${info.time}`,
            user: doc(dbFirestore, "users", `${info.user.id}`),
        }
        // console.log("from api.ts",newInfo)
        await updateDoc(doc(dbFirestore,"orders",info.id!), newInfo)
    }

    return {
        authUser,
        getClient,
        getClients,
        getService,
        getServices,
        getDelServices,
        getOrder,
        getOrdersForDay,
        getOrdersForClient,
        getUsers,
        addDelService,
        addClient,
        addService,
        addOrder,
        updateOrder,
        addDocToDb,
        updateDocFromDb,
        deleteDocFromDb,
    };
};
