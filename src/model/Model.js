
//@ts-check
import { ClassEvent } from "../util/ClassEvent";

export class Model extends ClassEvent{

    constructor(){

        super();
        this._data = {};
    }

    fromJSON(json){

        //Object assign mescla os dados e mantem o mais novo, se houver conflito
        this._data = Object.assign(this._data, json);

        //Envia as informações do JSON para quem estiver ouvindo a trigger ('datachange')
        this.trigger('datachange', this.toJSON());

    }

    toJSON(){
        return this._data;
    }

}