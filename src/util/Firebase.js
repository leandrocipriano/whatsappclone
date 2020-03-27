const firebase = require('firebase');
require('firebase/firestore');


export class Firebase {

    constructor() {

        this._config = {

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
