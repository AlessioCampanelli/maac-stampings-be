import { Controller, Post } from '@nestjs/common';
import firebase from 'firebase-admin';
import { StampingDto } from 'src/stampings/stamping.interface';
import { FirebaseSingleton } from '../../firebase/firebase-shared';

@Controller('auht-firebase')
export class AuhtFirebaseController {

    @Post('createJwt')
    async createJwt(): Promise<any> {

        // create JWT Token
        const uid = 'auth-firebase-uid';

        FirebaseSingleton.getInstance();

        return new Promise(resolve => {
            firebase
            .auth()
            .createCustomToken(uid)
            .then((customToken) => {
                // Send token back to client
                resolve(customToken);
                return;
            })
            .catch((error) => {
                console.log('Error creating custom token:', error);
                resolve(null);
                return null;
            });
        });
    }


    @Post('createStamping')
    async createStamping(stamping: StampingDto): Promise<any> {

        FirebaseSingleton.getInstance();

        return new Promise(async resolve => {
            const docName = this.randomAppName(10);
            const document = firebase.firestore().doc(`stampings/${docName}`);
            await document.set({
                title: stamping.title,
                subtitle: stamping.subtitle,
                address: stamping.address,
                start_time: (stamping.start_time != null && stamping.start_time != "") ? firebase.firestore.Timestamp.fromDate(new Date(stamping.start_time)).toDate() : null,
                end_time: (stamping.end_time != null && stamping.end_time != "") ? firebase.firestore.Timestamp.fromDate(new Date(stamping.end_time)).toDate() : null,
                start_stamped_time: (stamping.start_stamped_time != null && stamping.start_stamped_time != "") ? firebase.firestore.Timestamp.fromDate(new Date(stamping.start_stamped_time)).toDate() : null,
                end_stamped_time: (stamping.end_stamped_time != null && stamping.end_stamped_time != "") ? firebase.firestore.Timestamp.fromDate(new Date(stamping.end_stamped_time)).toDate() : null,
                id_user: stamping.id_user
            });
            resolve(true);
        });
    }

    async listStampings(id_user: string): Promise<any> {

        FirebaseSingleton.getInstance();

        var stampings = []

        return new Promise(async resolve => {

            const stampingsRef = firebase.firestore().collection('stampings');
            const snapshot = await stampingsRef.where('id_user', '==', id_user).get();
            snapshot.forEach(stamp => {
                stampings.push(stamp);
            });

            resolve(stampings);
        });
    }

    async deleteStamping(id_stamping: string): Promise<any> {
        FirebaseSingleton.getInstance();
        return new Promise(async resolve => {
            const isDeleted = await firebase.firestore().collection('stampings').doc(id_stamping).delete();
            resolve(isDeleted);
        });
    }

    randomAppName(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
}