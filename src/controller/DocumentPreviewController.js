const pdfjsLib = require('pdfjs-dist');
const path = require('path');

//Criando o worker para leitura e escrita de pdf
pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '../../dist/pdf.worker.bundle.js');

export class DocumentPreviewController {

    constructor(file){

        this._file = file;

    }

    getPreviewData(){

        return new Promise((resolve, reject) => {
            
            let reader = new FileReader();

            switch (this._file.type) {
                case 'image/png':
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/gif':
    
                reader.onload = e =>{

                    resolve({
                        src: reader.result,
                        info: this._file.name
                    });
                };

                reader.onerror = e => {

                    reject(e);
                };

                reader.readAsDataURL(this._file);
                break;

                case 'application/pdf':
                    reader.onload = e => {

                        pdfjsLib.getDocument(new Uint8Array(reader.result)).then(pdf => {

                            //console.log('pdf ', pdf);

                            pdf.getPage(1).then(page => {

                                let viewport  = page.getViewport(1);

                                let canvas = document.createElement('canvas');

                                let canvasContext = canvas.getContext('2d');

                                canvas.width = viewport.width;
                                canvas.height = viewport.height;

                                page.render({
                                    canvasContext,
                                    viewport
                                }).then(()=>{

                                    let pags = (pdf.numPages > 1) ? 's' : '';

                                    resolve({
                                        src: canvas.toDataURL('image/png'),
                                        info: `${pdf.numPages} página${pags}`
                                    })

                                }).catch(err => {
                                    reject(err);
                                });

                            }).catch(err =>{
                                reject(err);
                            });

                        }).catch(err => {

                            reject(err);
                        });

                    };

                    reader.readAsArrayBuffer(this._file);
                break;

                default: 
                    reject(e);

            }




        });
    }
}