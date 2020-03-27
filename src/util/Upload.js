import { Firebase } from './Firebase';

export class Upload {

    static send(file, from){

        return new Promise((success, failure) => {

            let uploadTaks = Firebase.storage().ref(from).child(Date.now() + '_' + file.name).put(file);
            
            uploadTaks.on('state_changed', e=>{
    
                console.info('upload', e);
    
            }, err => {
    
                failure(err);
    
            }, ()=>{
                
                success(uploadTaks.snapshot);
            });
    
        }); //ClosePromise
    }
}