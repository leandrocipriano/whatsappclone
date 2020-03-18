const path = require('path');

module.exports = {
    //Configuração de Entrada para chamar os outros arquivos js
    //entry: './src/app.js',

    entry:{
        app: './src/app.js',
        'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry.js'
    },

    //COnfiguração de Saída
    output: {
        //[name] vai pegar dos entry (app.bundle.js, pdf.worker.bundle.js)
        filename: '[name].bundle.js',
         //Path para um único js
        // path: path.resolve(__dirname, '/dist'),
        //Path para multiplos js
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist'
    }

}