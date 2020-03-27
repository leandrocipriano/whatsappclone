export class CameraController {

    constructor(videoEl){

        this._videoEl = videoEl;

        var config = { audio: true, video: true }; 

        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
        }

        // Some browsers partially implement mediaDevices. We can't just assign an object
        // with getUserMedia as it would overwrite existing properties.
        // Here, we will just add the getUserMedia property if it's missing.
        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function(constraints) {
            
                // First get ahold of the legacy getUserMedia, if present
                var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            
                // Some browsers just don't implement it - return a rejected promise with an error
                // to keep a consistent interface
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                }
            
                // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
                return new Promise(function(resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            }
        }

        navigator.mediaDevices.getUserMedia(config).then(stream=>{

            this._stream = stream;

            // Older browsers may not have srcObject
            if ("srcObject" in this._videoEl) {
                this._videoEl.srcObject = stream;
            } else {
                // Avoid using this in new browsers, as it is going away.
                this._videoEl.src = window.URL.createObjectURL(stream);
            } 

            console.log('console antes do play: ', this._videoEl);
            this._videoEl.play();

        }).catch(err=>{
            console.log(err.name + ": " + err.message);
        });
    }

    stop(){

        this._stream.getTracks().forEach(track =>{
            track.stop();
        });
    }

    takePicture(mimeType = 'image/png'){

        let canvas = document.createElement('canvas');

        canvas.setAttribute('height', this._videoEl.videoHeight);
        canvas.setAttribute('width', this._videoEl.videoWidth);

        let context = canvas.getContext('2d');

        context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL(mimeType);


    }

}