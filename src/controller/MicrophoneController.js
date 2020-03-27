//@ts-ignore
import { ClassEvent } from "../util/ClassEvent";

export class MicrophoneController extends ClassEvent {

    constructor(){

        super();

        this._mimeType = 'audio/webm;codecs=opus';

        this._available = false; 

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream=>{


            this._available = true;

            this._stream = stream;

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

            const _recordedChunks = [];

            //Teste do retorno do Microfone
            /*let audio = new Audio();

            audio.srcObject = this._stream;

            audio.play();
            
            //Função trigger criada de forma genérica
            this.trigger('play', audio);
            */

            this._mediaRecorder.addEventListener('dataavailable', e=>{

                if(e.data.size > 0)
                {
                    _recordedChunks.push(e.data);
                }

            });

            this._mediaRecorder.addEventListener('stop', e => {

                let blob = new Blob(_recordedChunks, {
                    type: this._mimeType
                });

                let filename = `rec${Date.now()}.webm`;      

                //console.log('audio ', file);
                //console.log('play file');

                //let decode = this.createFile(file);

                var reader = new FileReader();
                let audioContext = new window.AudioContext();
                var self = this;

                reader.onload = function (e) {
                    
                    audioContext.decodeAudioData(e.target.result).then(decode=>{

                        let file = new File([blob], filename, {
                            type: this._mimeType,
                            lastModified: Date.now()
                        });

                        //console.log('decode ', decode);
                        //console.log('file', file);

                        //Vai retornar para a chamada do WhatsAppControler 'recorded' com o audio gerado como arquivo
                        self.trigger('recorded', file, decode);
                    });
                    
                };

                reader.readAsArrayBuffer(blob);              

            }); 

            this._mediaRecorder.start();
            this.startTimer();

        }
    }

    createFile(file) {
        var reader = new FileReader();
        var context = new window.AudioContext();
        var decode;
    
        reader.onload = function (e) {
            context.decodeAudioData(e.target.result, function (buf) {
                decode = context.createBufferSource();
                decode.connect(context.destination);
                decode.buffer = buf;
                //decode.start(0);
            });
        };

        reader.readAsArrayBuffer(file);

        return decode;
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