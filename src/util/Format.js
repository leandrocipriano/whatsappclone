export class Format{

    // Recebe o nome do elemento
    // cria uma div com id em camelcase no HTML e retorna 
    static getCamelCase(text){

        let div = document.createElement('div');

        div.innerHTML = `<div data-${text}="id"></div>`;

        return Object.keys(div.firstChild.dataset)[0];

    }

    static toTime(duration){

        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if(hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    static dateToTime(date, locale = 'pt-BR'){

        return date.toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit'
        });

    }

    static bytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    static fileType(fileType){
        switch (fileType){

            case 'application/pdf':
                return 'pdf';
            break;

            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            case 'application/vnd.ms-powerpoint':
                return 'powerpoint';
            break;

            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            case 'application/vnd.ms-excel':
                return 'excel';
            break;

            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            case 'application/vnd.msword':
                return 'doc';
            break;

            default:
                return 'Não tratado';
            break;
        }
    }

    static timeStampToTime(timeStamp){
        return(timeStamp && typeof timeStamp.toDate === 'function') ? Format.dateToTime(timeStamp.toDate()) : '';
    }

}