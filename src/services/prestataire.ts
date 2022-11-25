import { collection, addDoc } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import { useCurrentUser } from 'vuefire'

const COLLECTION = 'prestataires'

export interface Prestataire {
    uid: string,
    speciality: string,
}

export function getPrestataireUID () {
    return useCurrentUser().value?.uid
}

export async function createPrestataire(prestataire: Prestataire) {
    await addDoc(collection(firestore, COLLECTION), prestataire)
}