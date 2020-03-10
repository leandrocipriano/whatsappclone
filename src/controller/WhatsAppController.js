class WhatsAppController{

    constructor(){

        //console.log('WhatsAppController OK');
        this.elementsPrototype();
        this.loadElements(); 
        this.initEvents();
    }

    //Transforma todos os elementos da página em variáveis javascript
    loadElements(){

        this.el = {};

        document.querySelectorAll('[id]').forEach(element => {

            this.el[Format.getCamelCase(element.id)] = element;
            
        });


    }

    elementsPrototype(){

        Element.prototype.hide = function () {
            this.style.display = 'none'; 

            return this;
        }

        Element.prototype.show = function () {
            this.style.display = 'block'; 

            return this;
        }

        Element.prototype.toggle = function () {
            this.style.display = (this.style.display === 'none') ? 'block' : 'none'; 

            return this;
        }

        //Exemplo: app.el.app.on('click mouseover dlbclick', 
        //                        (event)=>{ console.log('clicou', event.type) })
        Element.prototype.on = function (events, fn) {
            events.split(' ').forEach(event =>{

                this.addEventListener(event, fn);

            });

            return this;
        }

        Element.prototype.css = function (styles) {
            for(let name in styles){

                this.style[name] = styles[name];

            }

            return this;
        }

        Element.prototype.addClass = function (name) {
            this.classList.add(name);

            return this;            
        }

        Element.prototype.removeClass = function (name) {
            this.classList.remove(name);

            return this;            
        }

        Element.prototype.hasClass = function (name) {
            return this.classList.contains(name);            
        }

        Element.prototype.toggleClass = function (name) {
            this.classList.toggle(name); 

            return this;
        }

        //Para descobrir o prototype dos elementos executar o dir no console.
        //Exemplo console.dir(app.el.formPanelAddContact) --Firefox
        //Exemplo 2 - app.el.formPanelAddContact.getForm().get('email')
        HTMLFormElement.prototype.getForm = function () {
            return new FormData(this);          
        }

        //How to use: app.el.formPanelAddContact.toJson()
        //Return: name and value in the field
        HTMLFormElement.prototype.toJson = function () {

            let json = {};

            this.getForm().forEach((value, key)=>{

                json[key] = value;

            });

            return json;
        }

    }

    initEvents(){

        this.el.myPhoto.on('click', e => {

            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(()=>{
                this.el.panelEditProfile.addClass('open');
            }, 300);

        });

        this.el.btnNewContact.on('click', e => {

            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            //setTimeout(()=>{}, 300);
            setTimeout(()=>{
                this.el.panelAddContact.addClass('open');
            }, 300);

        });

        this.el.btnClosePanelEditProfile.on('click', e => {

            this.el.panelEditProfile.removeClass('open');

        });

        this.el.btnClosePanelAddContact.on('click', e => {

            this.el.panelAddContact.removeClass('open');

        });

        this.el.photoContainerEditProfile.on('click', e=>{

            this.el.inputProfilePhoto.click();

        });

        this.el.inputNamePanelEditProfile.on('keypress', e=>{

            if(e.key === 'Enter'){

                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();

            }

        });

        this.el.btnSavePanelEditProfile.on('click', e=>{

            console.log(this.el.inputNamePanelEditProfile.innerHTML);

        });

        this.el.formPanelAddContact.on('submit', e=>{

            e.preventDefault();

            let formData = new FormData(this.el.formPanelAddContact);

        });

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item=>{

            item.on('click', e=> {

                this.el.home.hide();
                this.el.main.css({
                    display:'flex'
                });
            });
        });

        this.el.btnAttach.on('click', e=>{

            //Para evitar que as ações se propagem por todo o sistema
            e.stopPropagation();
            this.el.menuAttach.addClass('open');
            //A função bind é para enviar o escopo para outra função
            document.addEventListener('click', this.closeMenuAttach.bind(this));
        });

        this.el.btnAttachPhoto.on('click', e=>{
            //console.log('Photo');
            this.el.inputPhoto.click();
        });

        this.el.inputPhoto.on('change', e=>{

            //console.log(this.el.inputPhoto.files);

            [...this.el.inputPhoto.files].forEach(file =>{

                console.log(file);

            })

        });

        this.el.btnAttachCamera.on('click', e=>{
            
            //console.log('Camera');
            this.closeAllMainPanel();
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                'height':'calc(100% - 120px)'
            });

            this._camera = new CameraController(this.el.videoCamera);


        });

        this.el.btnClosePanelCamera.on('click', e=>{
            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();
        });

        this.el.btnTakePicture.on('click', e=>{
            console.log('Take Picture');

        });

        this.el.btnAttachDocument.on('click', e=>{

            this.closeAllMainPanel();
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({
                'height':'calc(100% - 120px)'
            });
        });

        this.el.btnClosePanelDocumentPreview.on('click', e=>{

            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();

        });

        this.el.btnSendDocument.on('click', e=>{

            console.log('send document');
        });
        

        this.el.btnAttachContact.on('click', e=>{
           
            this.el.modalContacts.show();

        });

        this.el.btnCloseModalContacts.on('click', e=>{

            this.el.modalContacts.hide();
        });

        this.el.btnSendMicrophone.on('click', e=>{

            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();
            this.startRecordMicrophoneTimer();

        });

        this.el.btnCancelMicrophone.on('click', e=>{

            this.closeRecordMicrophone();
        });

        this.el.btnFinishMicrophone.on('click', e=>{

            this.closeRecordMicrophone();
        });

        this.el.inputText.on('keypress', e=>{

            if(e.key === 'Enter' && !e.ctrlKey){

                e.preventDefault();
                this.el.btnSend.click();
            }

        });

        this.el.inputText.on('keyup', e=>{

            if(this.el.inputText.innerHTML.length){

                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();

            } else {

                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();

            }

        });

        this.el.btnSend.on('click', e=>{

            console.log(this.el.inputText.innerHTML);

        });

        this.el.btnEmojis.on('click', e=>{

            this.el.panelEmojis.toggleClass('open');

        });

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji =>{

            emoji.on('click', e=>{

                console.log(emoji.dataset.unicode);

                let img = this.el.imgEmojiDefault.cloneNode();

                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.atl = emoji.dataset.unicode;

                emoji.classList.forEach(name => {
                    img.classList.add(name);
                });

                //Adicionara o emoji sempre no final  
                //this.el.inputText.appendChild(img);

                //Identificar o cursor para adicionar o emoji
                let cursor = window.getSelection();

                //focusNode retorno o elemento que o cursor está
                if(!cursor.focusNode || !cursor.focusNode.id == 'input-text'){
                    this.el.inputText.focus();
                    cursor = window.getSelection();
                }

                //Seleção de inicio e fim
                let range = document.createRange();

                //Retorna a posição 0
                range = cursor.getRangeAt(0);

                //Deleta as informações selecionadas
                range.deleteContents();

                //Criar um espaço vazio
                let frag = document.createDocumentFragment();

                //Adiciona a imagem no fragmento
                frag.appendChild(img);

                //Adiciona o fragmento na posição e espaço criado  
                range.insertNode(frag);

                //Posiciona o cursor após o término da imagem
                range.setStartAfter(img);

                //Forçar o keyup para sumir com o placeholder
                this.el.inputText.dispatchEvent(new Event('keyup'));

            });

        });
    }

    startRecordMicrophoneTimer(){

        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(()=>{

            this.el.recordMicrophoneTimer.innerHTML = Format.toTime((Date.now() - start));

        }, 100);

    }

    closeRecordMicrophone(){

        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        clearInterval(this._recordMicrophoneInterval);

    }

    closeAllMainPanel(){

        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');

    }

    closeMenuAttach(e){
        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');
    }

    closeAllLeftPanel(){

        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();

    }


}