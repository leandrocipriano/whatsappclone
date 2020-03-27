export class ClassEvent {

    constructor(){

        this._events = {};

    }

    on(eventName, fn){

        if(!this._events[eventName]){
            this._events[eventName] = new Array();
        }

        this._events[eventName].push(fn);
    }

    trigger(){

        //As informações que vem no arguments - nativo do javascript, a primeira sempre é o nome da função
        let args = [...arguments];

        //A função shift é utilizada para pegar a primeira função dos arguments  
        let eventName = args.shift();

        args.push(new Event(eventName));

        if(this._events[eventName] instanceof Array){

            this._events[eventName].forEach(event =>{

                event.apply(null, args);

            });
        };
    };
}