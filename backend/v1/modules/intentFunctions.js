var con = require('./dbConnection');
var async = require('async');
var URL_GCP = require('./variables').URL_GCP;

const imagesDirectory = "/media/images/cards/";

exports.linkToChat = function(gId){
    //gId corresponde al ID del grupo en cuestión de Chatra.io
    var link = "?chat=human";
    if(gId !== undefined)
        link += "&group="+gId;
    return '<a href="'+link+'">Chat con un operador</a>';
}

exports.hora = function(){
    var date = new Date();var hour = (date.getHours()+2)%24;var min  = date.getMinutes();var sec  = date.getSeconds();var year = date.getFullYear();var month = date.getMonth() + 1;var day  = date.getDate();
    hour=hour-1;
    if(month.toString().length == 1) {
            month = '0'+month;
    }
    if(day.toString().length == 1) {
            day = '0'+day;
    }   
    if(hour.toString().length == 1) {
            hour = '0'+hour;
    }
    if(min.toString().length == 1) {
            min = '0'+min;
    }
    if(sec.toString().length == 1) {
            sec = '0'+sec;
    } 

    return "Son las "+hour+":"+min+" del "+day+"/"+month+"/"+year;
}

exports.menuPrincipal = function(fl){
    
    return new Promise(function(resolve, reject) {

        var cards = [
            {
                "img": URL_GCP + imagesDirectory + "comercios.jpg",
                "title": "Comercios",
                "subtitle": "Consultas relacionadas con establecimientos",
                "buttons": [
                    {
                        "text": "Comercios",
                        "action": "Comercios"
                    }
                ]
            },
            {
                "img": URL_GCP + imagesDirectory + "pos.jpg",
                "title": "Soluciones de Cobro",
                "subtitle": "Consultas sobre gestión y operativa de terminales",
                "buttons": [
                    {
                        "text": "Soluciones de Cobro",
                        "action": "Soluciones de Cobro"
                    }
                ]
            },
            {
                "img": URL_GCP + imagesDirectory + "liquidaciones.jpg",
                "title": "Liquidación de Operaciones",
                "subtitle": "Operaciones relacionadas con comisiones y liquidaciones",
                "buttons": [
                    {
                        "text": "Liquidación Operaciones",
                        "action": "Liquidación Operaciones"
                    }
                ]
            }
        ];
        
        resolve({carousel: cards, messages: []});

        /*
        mssql.connect(configMssql, function (err) {
            if(err){
                console.log("error conexion")
                console.log(err);
            }

            // create Request object
            var request = new mssql.Request();
                
            // query to the database and get the records
            request.query('SELECT TOP 9 * from SAU_NOTICIA ORDER BY id DESC', function (err, recordset) {
                if(err){
                    console.log("error consulta")
                    console.log(err)
                }
                // send records as a response
                console.log(recordset);
            });
        });
        */

        async.parallel([
            async.reflect(function(callback) {
                //console.log('func1')

                var sql = "SELECT (SELECT count(ea.id) as total_avisos from eva_avisos ea WHERE ea.status=1) as total_avisos, (SELECT count(en.id) as total_novedades from eva_novedades en WHERE en.status=1) as total_novedades";
                con.query(sql, function (err, result) {
                    if (err){ 
                        //console.log(JSON.stringify(err))
                        callback(null, cards);
                    }
                    else{
                        if(!result)
                            callback(null, cards);
                        result = result[0];
                        if(result.total_novedades>0){
                            var novedades = 
                                {
                                    "img": URL_GCP + imagesDirectory + "novedades.jpg",
                                    "title": "Novedades",
                                    "subtitle": "Noticias y comunicados para oficinas",
                                    "buttons": [
                                        {
                                            "text": "Novedades",
                                            "action": "Novedades"
                                        }
                                    ]
                                };
                            //console.log("Resultado novedades: " + result.total_novedades);
                            cards.unshift(novedades);
                        }
                        if(result.total_avisos>0){
                            var avisos = 
                                {
                                    "img": URL_GCP + imagesDirectory + "avisos.jpg",
                                    "title": "Avisos",
                                    "subtitle": "Últimas alertas a tener en cuenta para la operativa diaria",
                                    "buttons": [
                                        {
                                            "text": "Avisos",
                                            "action": "Avisos"
                                        }
                                    ]
                                };
                            //console.log("Resultado avisos: " + result.total_avisos);
                            cards.unshift(avisos);
                        }
                        callback(null, cards);
                    }
                });

            }),
            async.reflect(function(callback) {
                //console.log('func2');

                if(fl==1)
                    callback(null);
                else{
                    var sql = "SELECT ea.texto_conversacion as tc from eva_avisos ea WHERE ea.status=1 order by ea.id desc limit 9";
                    con.query(sql, function (err, result) {
                        if (err){ 
                            //console.log(JSON.stringify(err));
                            callback(null);
                            //throw err
                        }
                        else{
                            if(result==null)
                                callback(null);
                            //console.log(result)
                            //console.log('AVISOS: '+JSON.stringify(result))
                            var messages = [];
                            if(result.length>0){
                                result.forEach(function(aviso) {
                                    messages.push(aviso.tc);
                                });
                            }
                            callback(null, messages);
                        }
                    });
                }
            })
        ],
        // optional callback
        function(err, results) {
            //console.log('callback: '+JSON.stringify(results));
            var c = results[0].value;
            var m = results[1].value;
            resolve({carousel: c, messages: m});
        });
    });
}

exports.getAvisos = function(){
    return new Promise(function(resolve, reject) {
        var sql = "SELECT ea.* from eva_avisos ea WHERE ea.status=1 order by id desc limit 9";
        con.query(sql, function (err, result) {
            var messages = [];
            if (err){ 
                //console.log(JSON.stringify(err));
                messages.push("Uy! Cuánto lo siento, tuve un problema al obtener los avisos");
                messages.push("Por favor, vuelve a intentarlo en un rato");
                resolve(messages);
            };

            if(result==null || result.length==0){
                messages.push("Ahora mismo no hay avisos disponibles");
            }
            else{
                (Math.floor(Math.random() >= 0.5))?messages.push("Estos son los avisos activos"):messages.push("Aquí tienes los avisos activos");
                result.forEach(function(aviso) {
                    var fecha = new Date(aviso.fecha);
                    var m = fecha.getMonth()+1;
                    messages.push(fecha.getDate()+"/"+m+"/"+fecha.getFullYear()+" - "+aviso.titulo+"<br><button id=\""+aviso.id+"\" class=\"btn btn-bs btn-sm verDetalle\" type=\"button\">Ver</button>");
                });
            }
            resolve(messages);
        });  
    });  
}

exports.getNovedades = function(){
    return new Promise(function(resolve, reject) {
        var sql = "SELECT en.* from eva_novedades en order by id desc limit 9";
        con.query(sql, function (err, result) {
            var messages = [];
            if (err){ 
                //console.log(JSON.stringify(err));
                messages.push("Uy! Cuánto lo siento, tuve un problema al obtener las novedades");
                messages.push("Por favor, vuelve a intentarlo en un rato");
                resolve(messages);
            };

            if(result==null || result.length==0){
                messages.push("Ahora mismo no hay novedades disponibles");
            }
            else{
                (Math.floor(Math.random() >= 0.5))?messages.push("Estas son las novedades actuales"):messages.push("Aquí tienes las últimas novedades");
                result.forEach(function(novedad) {
                    var fecha = new Date(novedad.fecha);
                    var m = fecha.getMonth()+1;
                    messages.push(fecha.getDate()+"/"+m+"/"+fecha.getFullYear()+" - "+novedad.titulo+"<br><button id=\""+novedad.id+"\" class=\"btn btn-bs btn-sm verDetalle\" type=\"button\">Ver</button>");
                });
            }
            resolve(messages);
        });  
    });  
}