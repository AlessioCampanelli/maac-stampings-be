import firebase from 'firebase-admin';

export class FirebaseSingleton {
    private static instance: FirebaseSingleton;
    public static firebase;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): FirebaseSingleton {
        if (!FirebaseSingleton.instance) {
            FirebaseSingleton.instance = new FirebaseSingleton();

            const params = {
                type: "service_account",
                project_id: "maac-shifts",
                private_key_id: "460d243b62a420334770ca3bbd5f41e131b4d236",
                private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCRpPhjt7i3Je2t\nEE8Fc3HAPgfSIkW/oZhlN3sAki7bOIGOZAJ4bSxfav9KuTVz8CgKyfpTyz/J3WCM\n/R7OutaFB5/imK+XVMR1lJ/A4JMCwy/nuXAJIdCrp/a9t7xx5eFfPTLuZWXZ6JeN\nMO0aQJZHaTqxsCfH9/6Qt0AGfPUdv/MyfWknwf0L/8DMgIIhj97MhjXSGSOeV43s\nAzL1CqYxWA8x/zbxfZqrcUIUdVh8bgz0fyHoKDxQqloZz3ItoAHJd1SwWoMtvi8i\nfGPFWKQOJS+dcyz/xbdOhZaE/F4nJi9sX+EyYF5UTdMC9XfIVpUf7wCZHWRGKTmW\nFHBeDd9hAgMBAAECggEAALPkD7WBanJmmcQo+j5a8r6zePV5xd/r67Xl0Qd9IS+k\naGFEWPv/djWYJiGL1K0rwRZfL9JP0q1PwiTI5kRxtOvOS+CV6eWamqdtHrG2sKrs\nBNkyZWJ7yEHXAR+6BNUQGxtUSJQsQ23jQhoih4YYprjApyTR1eqOmHiNElSKz9CG\nz29cecoVJtYQXlMdWKiO4o+cSgVPn0tuSh5v8R3bdsIGkSQRF9HSFlLVOEf02FxG\nGT5AoARK2ksIqRCR/MrADeOVfibzGk3RkggEHRloW39WlBykbNnjbUkLaG8tMXj4\nbtjlRZivESAt7pmFnQ2XHKHI5mdHWk3agkrEuflNNQKBgQDDD3wTeVG8mKruWHet\nbW296faK905IyJiDU+3clOjoyG0oF0RtLbUqDkv9LtixKOuSLucXnZBvz9jx/Q7i\nnR7RsJi3tT7Li5BRDSo1tn1BvhkncIIFa9iuGcv0S2DS9RwROHur18O3RW+c6B/g\nntAJp3+lhVMiJ6GDKBm7cDAI6wKBgQC/JUuRTxmCQcUxWWlw+yIDKBxWd7ILuyXg\nDJCsZNQIXih+h4O09/3zKzdzRsjrE8cWSPP1BgEng/yEC5BD+iD34NA3gcsyfVMM\nrTcu76totFybpY7BpxpPqeY/tkz9Jj+hBaOqrGs2/+8BLEc/5/GarFWA0Jv729AU\n3+kKy4Ql4wKBgHVFVPo8QQja3EEpjOIGXSkFhUTtA/K8Lv0ds26fVBvHi+DDhE8D\nYNyk9ciEpqB0EpSzgBnxj8m5MxvhYVaa0dGNk3M3E0a6ZIxmFs9uJIYm7OaKPJFX\n0lBxj+4Sd2a9GB++TpP0x2Ti6QRzhd68fCShwBtaOa3aF79Ll5TaEPb7AoGAAXGX\nq4ZMbAZxJdlGCZtr+1gfNqv6xUnplFKj+Rld3J5Rcfs2DHTfDyohZhZ/x/7DPzDX\n3t7nvVOq4Zhww4KtIxIooHKzhTMbIHpic1FOGyFZnbdXZ7EKatWerpaC6FqUmnO/\nc7ePq7+tH3YlJ59p3MA2eR2aQAG+BZpXWUSGP/8CgYEAt9rXfER+SHDL5x5Fr4ZZ\n2n6sr9X5jpPP754mdueP/TXJAtUvNZI+keRJahsAg+XRGlSNd8aWM4a0MCb0BhRI\nc6JmUeLBBB3iHLJgsg9NYZCz4/1upo3HG0Ll5RE9PQ5yZv6JMoMnyn5CBdZdmAz9\nKR+Nl0Wv9ct8D5Tf65Hj3Z8=\n-----END PRIVATE KEY-----\n",
                client_email: "firebase-adminsdk-6jc5u@maac-shifts.iam.gserviceaccount.com",
                client_id: "101515819617118033884",
                auth_uri: "https://accounts.google.com/o/oauth2/auth",
                token_uri: "https://oauth2.googleapis.com/token",
                auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
                client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6jc5u%40maac-shifts.iam.gserviceaccount.com"
            }
    
            // Initialize
            firebase.initializeApp({
                credential: firebase.credential.cert(params as any),
            });

            FirebaseSingleton.firebase = firebase;
        }

        return FirebaseSingleton.instance;
    }

    /**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     */
    public firebase() {
        return FirebaseSingleton.firebase;
    }
}