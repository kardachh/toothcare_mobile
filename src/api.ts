import {appDB} from "../firebaseConfig";
import {collection, doc, getCountFromServer, getDoc, getDocs, getFirestore, query, where,} from "firebase/firestore"

const dbFirestore = getFirestore(appDB)

export const getUsers = async () => {
    const querySnapshot = await getDocs(collection(dbFirestore, "users"))
    querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data())
    })
};

export const checkUser = async (login: string, password: string) => {
    const q = query(collection(dbFirestore, "users"), where("login", "==", login), where("password", "==", password))
    const querySnapshotData = await getCountFromServer(q).then(r => r.data());
    return querySnapshotData.count === 1
};
