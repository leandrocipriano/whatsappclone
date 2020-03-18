import { Firebase } from './../util/Firebase'
import { Model } from './Model';


export class User extends Model {

    constructor(id){

        super();

        //Utiliza a data de super (Model)
        //this._data = {};

        if(id) this.getById(id);

    }

    get name(){ return this._data.name; }
    set name(value){ this._data.name = value; }

    get photo(){ return this._data.photo; }
    set photo(value){ this._data.photo = value; }

    get email(){ return this._data.email;}
    set email(value){ this._data.email = value; }
    
    get chatId(){ return this._data.chatId;}
    set chatId(value){ this._data.chatId = value; }

    getById(id){

        return new Promise((success, failure)=>{

            //Cria uma sincronia com o firebase
            User.findByEmail(id).onSnapshot(doc=>{

                this.fromJSON(doc.data());

                success(doc);
            });

            /*
            //Não cria uma sincronia com o firebase
            User.findByEmail(id).get().then(doc => {

                this.fromJSON(doc.data());

                success(doc);

            }).catch(err =>{
                failure(err);
            });*/

        });

    }

    save(){

        return User.findByEmail(this.email).set(this.toJSON());

    }

    static getRef(){

        return Firebase.db().collection('/users');
    }

    static findByEmail(email){
    
        //Retorna o documento referente ao e-mail do firebase
        return User.getRef().doc(email);
    }

    static getContactsRef(id){

        return  User.getRef(id)
                .doc(id)
                .collection('contacts');
    }

    addContact(contact){

        //A funçaõ nativa btoa(string) é para converter em base64
        return User.getContactsRef(this.email)
               .doc(btoa(contact.email))
               .set(contact.toJSON());
    }

    getContacts(filter = ''){

        return new Promise((success, failure)=>{

            User.getContactsRef(this.email).where('name', '>=', filter).onSnapshot(docs =>{

                let contacts = [];

                docs.forEach(doc => {
                    let data = doc.data();

                    data.id = doc.id;

                    contacts.push(data);
                });

                this.trigger('contactschange', docs);

                success(contacts);

            });

        });
    }

}