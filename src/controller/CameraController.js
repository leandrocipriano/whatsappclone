class CameraController{

    constructor(videoEl){

        this._videoEl = videoEl;

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream=>{

            //Criou uma url com as informações de video
            this._videoEl.src = URL.createObjectURL(stream);

            this._videoEl.play();

        }).catch(err=>{
            console.error(err);
        });
    }

}