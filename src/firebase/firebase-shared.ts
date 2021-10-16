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
                private_key_id: "",
                private_key: "",
                client_email: "",
                client_id: "",
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