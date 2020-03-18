import { ClassEvent } from "../util/ClassEvent";

export class MicrophoneController extends ClassEvent {

    constructor(){

        //Chamar o construtor do pai
        super();

        this._mimeType = 'audio/webm';

        this._available = false; 

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream=>{


            this._available = true;

            this._stream = stream;

            //Teste do retorno do Microfone
            /*let audio = new Audio();

            audio.srcObject = stream;

            audio.play();*/
            
            //Função trigger criada de forma genérica
            //this.trigger('play', audio);

            this.trigger('ready', this._stream);
            
        }).catch(err=>{
            console.error(err);
        });
    }

    stop(){

        this._stream.getTracks().forEach(track =>{
            track.stop();
        });
    }

    isAvaliable(){

        return this._available;

    }

    startRecorder(){

        if(this.isAvaliable()){

            this._mediaRecorder = new MediaRecorder(this._stream, {
                _mimeType: this._mimeType
            });

            this._recordedChunks = [];

            this._mediaRecorder.addEventListener('dataavaliable', e =>{

                if(e.data.size > 0){
                    this._recordedChunks.push(e.data);
                }

            });

            this._mediaRecorder.addEventListener('stop', e => {

                let blob = new Blob(this._recordedChunks, {
                    type: this._mimeType
                });

                let filename = `rec${Date.now()}.webm`;

                let file = new File([blob], filename, {
                    type: this._mimeType,
                    lastModified: Date.now()
                });

               
                console.log('file', file);

            });

            this._mediaRecorder.start();
            this.startTimer();

        }
    }

    stopRecorder(){
        
        if(this.isAvaliable()){

            this._mediaRecorder.stop();
            this.stop();
            
        }
        
    }

    startTimer(){

        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(()=>{

            this.trigger('recordtimer', (Date.now() - start));

        }, 100);
    }

    stopTimer(){

        clearInterval(this._recordMicrophoneInterval);

    }
}