const firebase = require('firebase');
require('firebase/firestore');


export class Firebase {

    constructor() {

        this._config = {
            apiKey: "AIzaSyAH4sOG-oPrYTPNQKbMqvRc5lEg2wwnxMs",
            authDomain: "whatsapp-clone-4c916.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-4c916.firebaseio.com",
            projectId: "whatsapp-clone-4c916",
            storageBucket: "gs://whatsapp-clone-4c916.appspot.com",
            messagingSenderId: "593179952109",
            appId: "1:593179952109:web:cb6b0d40e86798b0309de4",
            measurementId: "G-8SLZQDFDTZ"
          };

        this._initialized = false;

        this.init();

    }

    init(){

        if(!window._initializedFirebase){

            firebase.initializeApp(this._config);

            //Setar o time stamp a cada snapshot da base
            // The timestampsInSnapshots setting now defaults to true and you no
            // longer need to explicitly set it
            /*firebase.firestore().settings({
                timestampsInSnapshots: true
            });*/

            window._initializedFirebase = true;
        }

    }

    static db(){

        return firebase.firestore();
    
    }

    static storage(){

        return firebase.storage();

    }

    initAuth(){
        
        return new Promise((success, failure)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(result => {
                let token = result.credential.accessToken;
                let user = result.user;

                success({token, user});
            }).catch(err=>{
                failure(err);
            });

        })
    }

}