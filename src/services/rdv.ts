import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import { getPrestataireUID } from '@/services/prestataire'

const COLLECTION = 'rdvs'

export interface RDV {
    prestataire_uid: string,
    client_uid: string,
    date: string,
    description: string,
}

export async function getRdvs (): Promise<Array<RDV>> {
    const rdvs: Array<RDV> = []
    const collectionRef = query(collection(firestore, COLLECTION), where('prestataire_uid', '==', getPrestataireUID()))
    const docsRdvs = (await getDocs(collectionRef)).docs
    docsRdvs.forEach(doc => {
        const data = doc.data()
        rdvs.push({
            prestataire_uid: data.prestataire_uid,
            client_uid: data.client_uid,
            date: data.date,
            description: data.description,
        })
    })

    return rdvs
}
