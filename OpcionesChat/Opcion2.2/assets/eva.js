    //Token Dialogflow V1. !!!!! Hay que cambiar a la V2 antes de Octubre 2019
    var accessToken = "c88f17eeb9af4f1b9b556bb524498b6d";
    var baseUrl = "https://api.api.ai/v1/";
    var first = false;
    var idCar = 0;

    function md5(d){return rstr2hex(binl2rstr(binl_md5(rstr2binl(d),8*d.length)))}function rstr2hex(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function rstr2binl(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function binl2rstr(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function binl_md5(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

    //Ajustamos la altura de todas las tarjetas. Solo funciona en IExplorer
    function setHeigthCar(idCar){
        var height=0;
        $("#carousel"+idCar+">.card").each(function () {
            if(height<$(this).height())
                height=$(this).height();
            //console.log(height+"  "+$(this).height())
        });

        $("#carousel"+idCar+">.card").each(function () {
            $(this).height(height);
            //console.log(height)
        });
    }

    //Obtenemos un ramdom entre 1-2 segundos para mostrar la secuencia de mensajes
    function getDelay(){
        return Math.floor(Math.random() * 2000) + 1000;
    }

    //Obtener parametro de url. Así comprobamos si abrimos chat humano, asignamos grupo
    function getUrlParam(name) {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        if(vars[name])
            return vars[name];
        else
            return false;
    }

    //Comprobar si la acción del botón es una Url, para así lanzar evento con href de a, si no lanzamos evento onclick
    function isUrl(str){
        var r = false;
        regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

        if(regexp.test(str))r=true;
        regexp = /((mailto:\w+)|(tel:\w+)).+/;
        if(regexp.test(str))r=true;

        return r;
    }

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    
    //Contador caracteres
    $('#mytext').keyup(function(){
      var num = $(this).val().length;
      (num>240)?$('#char_left').css("color", "#ff0000"):$('#char_left').css("color", "#bbb");
      $('#char_left').html(num+"/256");
    });

    //Cerramos el modal de EVA
    $("#alert-eva-close").click(function() {
        localStorage.setItem('alertEva', true);
        localStorage.setItem('showEva', 1);

        $( "#chat-bubble" ).fadeOut( "slow", function() {});
        $( "#chat-frame" ).fadeIn( "slow", function() {});
        callToEvent();
        first=true;
    });
    $("#chat-bubble-modal").click(function() {
        localStorage.setItem('alertEva', true);
        localStorage.setItem('showEva', 1);
        $('#modalEvaInfo').modal('hide');

        $( "#chat-bubble" ).fadeOut( "slow", function() {});
        $( "#chat-frame" ).fadeIn( "slow", function() {});
        callToEvent();
        first=true;
    });

$(document).ready(function() {


    //Creamos la sesión para Dialogflow y así agrupar la conversación
    if(!localStorage.getItem('sessionId')){
        localStorage.setItem('sessionId', md5(Math.random().toString(36).substr(2, 13)).toLowerCase());
    }

    //Mostramos el modal con la info sobre EVA
    if(!localStorage.getItem('alertEva')){
        $('#modalEvaInfo').modal({show: true, backdrop: false});
    }

    //Si está la variable "name" en la url. Si coinicde mostramos el chat humano
    if(getUrlParam("chat")=="human"){
        var c = "";
        //Hemos escondido la comprobación de Group, ahora se hace con Trigger desde el panel de Chatra
        /*if(getUrlParam("group")){
            c += "<script>ChatraGroupID='"+getUrlParam("group")+"';<\/script>";
        }*/
        //Incrusta código de chat, cambia los colores de fondo y, por último, despliega la ventana del chat
        c += "<script>(function(d, w, c) {w.ChatraID = 'bnWr994iCcTWfyQi7';var s=d.createElement('script');w[c]=w[c] || function(){(w[c].q = w[c].q || []).push(arguments);};s.async=true;s.src='https://call.chatra.io/chatra.js';if (d.head) d.head.appendChild(s);})(document, window, 'Chatra');<\/script> <script>window.ChatraSetup = {colors: {buttonText: '#fff', buttonBg: '#006dff'}};<\/script><script>window.ChatraSetup = {chatWidth: 550,chatHeight: 650};<\/script><script>Chatra('expandWidget');</script>";
        
        $("#chat-container").html(c);
        
    }
    else if(localStorage.getItem('showEva')==1){
        $( "#chat-frame" ).fadeIn( "slow", function() {}); 
        callToEvent();
        first=true;       
    }
    else{
        $( "#chat-bubble" ).fadeIn( "slow", function() {});
    }

});
    //Cierra el chat del bot para mostrar la burbuja flotante
    $( "#close-chat" ).click(function() {
        localStorage.setItem('showEva', 0);           
        $( "#sendMessage" ).val('');       
        $( "#chat-frame" ).fadeOut( "slow", function() {});
        $( "#chat-bubble" ).fadeIn( "slow", function() {});
    });

    //Click en la burbuja flotante, abre el chat del bot
    $( "#chat-bubble" ).click(function() {
        localStorage.setItem('showEva', 1);   
        if(!first){
            callToEvent();
            first=true;
        }
        $( "#chat-frame" ).fadeIn( "slow", function() {});
        $( "#chat-bubble" ).fadeOut( "slow", function() {});
    });

    //Envío de mensaje con tecla Intro
    $("#mytext").keypress(function(e) {
        if (e.which == 13){
            var text = $(this).val();
            if (text !== ""){
                send(text);
                insertChat("user", text);              
                $(this).val('');
            }
        }
    });

    //Envío de mensaje con el botón
    $( "#sendMessage" ).click(function() {
        var text = $("#mytext").val();
        if (text !== ""){
            send(text);
            insertChat("user", text);              
            $("#mytext").val('');
        }
    });

    //Función para mostrar-esconder el gif "Escribiendo"
    function manageTyping(f){
        //0: close typing
        //1: open typing
        if(f==1){
            $( "#mytext" ).prop('disabled', true);
            $( "#typing-box" ).css('display', 'block');
            $( "#send-button" ).css('display', 'none');
        }
        else{
            $( "#mytext" ).prop('disabled', false);
            $( "#typing-box" ).css('display', 'none');
            $( "#send-button" ).css('display', 'flex');
        }
    }

    //Llamamos al evento de bienvenida, solo funciona la primera vez que se abre el chatbot
    function callToEvent(){
        manageTyping(1);

        $.ajax({
            type: "GET",
            url: baseUrl + "query?v=20150910&e=welcome&timezone=Europe/Madrid&lang=es&sessionId="+localStorage.getItem('sessionId'),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            success: function(data) {
                setResponse(JSON.stringify(data, undefined, 2), data);
            },
            error: function() {
                setResponse("Internal Server Error");
                manageTyping(0);
            }
        });
    }

    //Enviamos el texto a DFLW para recibir la respuesta, después de esto se pinta la respuesta con setResponse()
    function send(text) {

        $.ajax({
            type: "POST",
            url: baseUrl + "query?v=20150910",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: JSON.stringify({ query: text, lang: "es", sessionId: localStorage.getItem('sessionId') }),
            success: function(data) {
                manageTyping(1);
                setResponse(JSON.stringify(data, undefined, 2), data);
            },
            error: function() {
                manageTyping(0);
                setResponse("Internal Server Error");
            }
        });
    }

    //Función lanzada al hacer click sobre botón del chat
    function sendButton(text){
        insertChat("user", text);
        send(text);
    }

    //Escribimos los bocadillos del bot
    function setResponse(val, data) {
        var timeDelay = 1000;
        $("#response").text(val);

        //console.log(JSON.stringify(data.result));

        var response = data.result;

        //if(response.metadata.webhookUsed){
        if(true){

            for(i=0; i<response.fulfillment.messages.length;i++){
                switch (response.fulfillment.messages[i].type){
                    //TEXT
                    case 0:
                        if(!response.fulfillment.messages[i].platform){
                            var value = response.fulfillment.messages[i].speech.replace(/\n/g, "<br>");
                            //alert(value)
                            insertChat("bot", value, timeDelay);
                            timeDelay+=getDelay();
                        }
                    break;
                    //CARD
                    case 1:
                        var c = response.fulfillment.messages[i];
                        var buttons = "";

                        for(k=0;k<c.buttons.length;k++){
                            buttons += '<a style="margin:3px;" target="_blank" class="btn btn-bs" href="'+c.buttons[k].postback+'">'+c.buttons[k].text+'</a>';
                        }

                        var card = '<div class="card">'+
                                        '<img class="card-img-top img-responsive" src="'+c.imageUrl+'" alt="'+c.title+'">'+
                                        '<div class="card-body">'+
                                            '<h5 style="margin-top:0;" class="card-title h3">'+c.title+'</h5>'+
                                            '<p class="card-text">'+c.subtitle+'</p>'+
                                            buttons+
                                        '</div>'+
                                    '</div>';

                        insertCard(card, timeDelay);
                            timeDelay+=getDelay();
                    break;
                    //QUICK REPLY - BUTTON
                    case 2:
                        var button = "";
                        for(k=0;k<response.fulfillment.messages[i].replies.length;k++){
                            button += '<a style="margin:3px;" class="btn btn-bs" onclick="sendButton(\''+response.fulfillment.messages[i].replies[k]+'\')">'+response.fulfillment.messages[i].replies[k]+'</a>';
                        }
                        insertButton(button, timeDelay);
                            timeDelay+=getDelay();
                    break;
                    //QUICK REPLY - BUTTON
                    case 4:
                        if(response.fulfillment.messages[i].payload.links){
                            var links = "";
                            for(k=0;k<response.fulfillment.messages[i].payload.links.length;k++){
                                var link = '<a target="_blank" style="margin:3px;" href="'+response.fulfillment.messages[i].payload.links[k].url+'">'+response.fulfillment.messages[i].payload.links[k].text_link+'</a>';
                                links += response.fulfillment.messages[i].payload.links[k].text.replace("[link]", link);
                            }
                            insertButton(links, timeDelay);
                            timeDelay+=getDelay();
                        }
                        if(response.fulfillment.messages[i].payload.buttons){
                            var button = "";
                            for(k=0;k<response.fulfillment.messages[i].payload.buttons.length;k++){
                                button += '<a style="margin:3px;" class="btn btn-bs" onclick="sendButton(\''+response.fulfillment.messages[i].payload.buttons[k].text+'\')">'+response.fulfillment.messages[i].payload.buttons[k].text+'</a>';
                            }
                            insertButton(button, timeDelay);
                            timeDelay+=getDelay();
                        }
                        if(response.fulfillment.messages[i].payload.cards){
                            var cards = "";
                            for(k=0;k<response.fulfillment.messages[i].payload.cards.length;k++){
                                
                                var c = response.fulfillment.messages[i].payload.cards[k];

                                var buttons = response.fulfillment.messages[i].payload.cards[k].buttons;
                                var b = "";

                                for(j=0;j<buttons.length;j++){
                                    if(isUrl(buttons[j].action))
                                        b += '<a target="_blank" href="'+buttons[j].action+'" class="btn btn-bs">'+buttons[j].text+'</a>';
                                    else
                                        b += '<a onclick="sendButton(\''+buttons[j].action+'\')" class="btn btn-bs">'+buttons[j].text+'</a>';
                                }

                                cards += '<div class="card"><img class="card-img-top img-responsive" src="'+c.img+'" alt="Card image cap"><div class="card-body"><h4 class=" h5 card-title">'+c.title+'</h4><p class="card-text">'+c.subtitle+'</p><div class="btn-card">'+b+'</div></div><div class="clearfix"></div></div>';

                            }
                            if(k==1)
                                insertCard(cards, timeDelay);
                            else
                                insertCarousel(cards, timeDelay);
                            timeDelay+=getDelay();
                        }
                    break;
                }
            }
        }
        else{
            insertChat("bot", response.fulfillment.speech, timeDelay);
            timeDelay+=getDelay();      
        }
        setTimeout(
            function(){                
                manageTyping(0);
        }, timeDelay); 
    }

    ////
    //Insertamos el bocadillo en función del tipo de mensaje
    ////
    function insertChat(who, text, time){

        if (time === undefined){
            time = 0;
        }
        var control = "";
        var date = formatAMPM(new Date());
        
        if (who == "bot"){
            control = '<li style="width:100%;">' +
                            '<div class="msj macro">' +
                                '<div class="text text-l">' +
                                    '<p>'+ text +'</p>' +
                                    '<p><small>'+date+'</small></p>' +
                                '</div>' +
                            '</div>' +
                        '</li>';                    
        }
        else{
            control = '<li style="width:100%;">' +
                            '<div class="msj-user macro">' +
                                '<div class="text text-r">' +
                                    '<p>'+text+'</p>' +
                                    '<p><small>'+date+'</small></p>' +
                                '</div>' +                                
                      '</li>';
        }
        setTimeout(
            function(){                        
                $("#chat-conversation").append(control).scrollTop($("#chat-conversation").prop('scrollHeight'));
            }, time); 
    }

    function insertCard(text, time){
        if (time === undefined){
            time = 0;
        }
        var control = "";
        var date = formatAMPM(new Date());

        control = '<li style="width:100%;">' +
                        '<div>' +
                            '<div class="text text-l">' + text + '</div>' +
                        '</div>' +
                    '</li>'; 

        setTimeout(
            function(){                        
                $("#chat-conversation").append(control).scrollTop($("#chat-conversation").prop('scrollHeight'));
            }, time); 
    }

    function insertCarousel(text, time){
        idCar++;
        if (time === undefined){
            time = 0;
        }
        var control = "";
        var date = formatAMPM(new Date());

        control = '<li style="width:100%;">' +
                        '<div style="width:100%;overflow-x: auto;white-space:nowrap;" class="carousel" id="carousel'+idCar+'">' +
                            text +
                        '</div>' +
                    '</li>';

        setTimeout(
            function(){                        
                $("#chat-conversation").append(control).scrollTop($("#chat-conversation").prop('scrollHeight'));
                setHeigthCar(idCar);
            }, time); 
    }

    function insertButton(text, time){
        if (time === undefined){
            time = 0;
        }
        var control = "";
        var date = formatAMPM(new Date());
        
        control = '<li style="width:100%;">' +
                        '<div class="msj macro">' +
                            '<div class="text text-l">' +
                                '<p style="">'+ text +'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>'; 

        setTimeout(
            function(){                        
                $("#chat-conversation").append(control).scrollTop($("#chat-conversation").prop('scrollHeight'));
            }, time); 
    }