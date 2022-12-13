import { collection, addDoc, getDoc, doc } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import { useCurrentUser } from 'vuefire'

const COLLECTION = 'specialities'

export interface Speciality {
    id: string,
    speciality: string,
}
/*
export function getSpecialities (): Array<Speciality> {
    return getDoc(getDocRef())
}

function getDocRef() {
    return doc(firestore, COLLECTION);
}*/