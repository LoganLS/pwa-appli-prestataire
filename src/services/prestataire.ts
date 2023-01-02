import { collection, addDoc } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import { useCurrentUser } from 'vuefire'

const COLLECTION = 'prestataires'
const COLLECTION_TOKENS = 'prestataires_tokens';

export interface Prestataire {
    uid: string,
    firstName: string,
    lastName: string,
    speciality: string,
}

export interface PrestataireToken {
    prestaire_uid: string,
    token: string,
}

export function getPrestataireUID () {
    return useCurrentUser().value?.uid
}

export async function createPrestataire(prestataire: Prestataire) {
    await addDoc(collection(firestore, COLLECTION), prestataire)
}

export async function createToken(prestaireToken: PrestataireToken) {
    await addDoc(collection(firestore, COLLECTION_TOKENS), prestaireToken)
}