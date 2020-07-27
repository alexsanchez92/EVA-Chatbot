var express = require('express');
var router = express.Router();

const URL_GCP = '#';
const CHATBASE_KEY = process.env.CHATBASE_KEY;
const userChatbase = require('@google/chatbase').setApiKey(CHATBASE_KEY) // Your Chatbase API Key
const projectId = "consultas-sau";

//Ids de grupos para redirigir el chat
const groupId = {
    comerciosMx: "SBPogtD2fFbyvrchC",
    soporteVirtuales: "yo4FYXwDAwQPBShMZ",
    soporteTpvs: "87XGFRTjwMdkvavAH"
}

router.post('/intent', (req, res) => {

    //Estos parametros se ponen en la configuración del Fulfillment en Dialogflow
    if(req.headers.authorization!="#"){
        res.status(401).send("Unauthorized")
        process.exit();
    }
    
    var utilidad = false;
    var fulfillmentMessages = [];
    var outputContexts = [];
    var quickReplies = [];
  
    var handled = true;
  
    var id = req.body.responseId;
    var sessionId = req.body.session;
    var timestamp = Date.now().toString();
    var req = req.body.queryResult;
  
    var intent = req.intent.displayName;
    var action = req.action;
    var query = req.queryText;
  
    console.log("HE RECIBIDO: "+query);
    console.log("ACCION: "+action);

    ////////////////////////////
    //      FUNCIONES PARA ESCRIBIR LA RESPUESTA
    ////////////////////////////
    function addMessage(text){
        fulfillmentMessages.push({"text": {"text": [text] } });
    }
  
    function addToMessage(text){
        console.log("add: "+JSON.stringify(text));
        fulfillmentMessages.push(text);
    }

    function addCard(card){
        fulfillmentMessages.push(card);
    }
  
    function addButton(text){
        quickReplies.push({"title": text});
    }
  
    function processButton(){
        fulfillmentMessages.push({"platform":"ACTIONS_ON_GOOGLE", "suggestions": {"suggestions": quickReplies}});
        quickReplies = [];
    }
  
    function setContext(name, lifespan){
        outputContexts.push({"name": sessionId+"/contexts/"+name, "lifespanCount": lifespan});
    }
    
    function processMessages(){
        console.log("Procesamos mensajes");
        for(var i=0; i<req.fulfillmentMessages.length; i++){
            console.log("mess: "+JSON.stringify(req.fulfillmentMessages[i]))
            if(req.fulfillmentMessages[i].payload)
                addToMessage(req.fulfillmentMessages[i].payload);
            else
                addToMessage(req.fulfillmentMessages[i]);
        }
    } 
  
    ////////////////////////////
    //      DETECCION DE ACTION
    ////////////////////////////
    switch(action){
      case 'General.Hora':        
          hora();
        break;

      case 'ErrorAlta':     
          var tipologia = req.parameters.tipologiaAlta;
          if(tipologia == "terminal"){
            addMessage("texto");
            addMessage("texto");
            addMessage("texto");
            addMessage("texto");
            addMessage("texto");
            addMessage("texto");
            utilidad = true;
          }
          else{
            addMessage("¿Puedes decirme cuál de estos errores estás teniendo?");
            addButton("Entrada datos no válida");
            addButton("Tipo de identificación incorrecto");
            addButton("Campos en rojo");
            processButton();
          }
        break;
        
      case 'OperativaTerminal.ManualesTpv.Modelo':
          var modelo = req.parameters.modeloTpv;
          switch(modelo){
            case 'VX680':
              var t={
                "card":{
                    "title": "Manual VX680",
                    "subtitle": "Versión 3",
                    "imageUri": "#",
                    "buttons": [
                      {
                        "text": "Ver manual",
                        "postback": URL_GCP+"manuales/VX680_v3.pdf"
                      }
                    ]
                }
              };
              addCard(t);
              break;
            case 'IWL28X':
              var t={
                "card":{
                    "title": "Manual IWL28X",
                    "subtitle": "Versión 4",
                    "imageUri": "#",
                    "buttons": [
                      {
                        "text": "Ver manual",
                        "postback": URL_GCP+"manuales/IWL28X_v4.pdf"
                      }
                    ]
                }
              };
              addCard(t);
              break;
            case 'ICT250':
              var t={
                "card":{
                    "title": "Manual ICT250",
                    "subtitle": "Versión 3",
                    "imageUri": "#",
                    "buttons": [
                      {
                        "text": "Ver manual",
                        "postback": URL_GCP+"manuales/ICT250_v3.pdf"
                      }
                    ]
                }
              };
              addCard(t);
              break; 
            default:
              addMessage("No tenemos manual del "+modelo+" que buscabas");
          }             
            utilidad=true;
        break;  
      case 'Terminales.Baja.Tpv':
            var tipo = req.parameters.tipoTpv;
            switch(tipo){
                case 'virtual':
                    addMessage("texto");              
                    utilidad=true;
                break;
                case 'fisico':
                  addMessage("texto");   
                    utilidad=true;
                break;                
          }
        break;  
        

        ////
        ////
        //HABLA CON CHAT HUMANO
        ////
        ////
        case 'Comercios.Alta.ImposibilidadDarAlta':
        case 'Comercios.Alta.Error.Ninguno':
        case 'Comercios.Baja.Error.Reclamacion':
        case 'Comercios.Baja.Error.TpvActivo':

        case 'Comercios.Mantenimiento.CambiarTitularidad':

        case 'Liquidacion.AnularDuplicada':
        case 'Liquidacion.CondicionesReliquidacion':
        case 'Liquidacion.ConsultaRemesaManual':
        case 'Liquidacion.ConsultarMotivoDevolucion':

        case 'Liquidacion.Devoluciones':
        case 'Liquidacion.DevolucionNoCoincideVenta':
        case 'Liquidacion.ErrorCobroComision':
        case 'Liquidacion.ErrorCuotaTpv':
        case 'Liquidacion.ErrorFraccionamiento':
        case 'Liquidacion.LiquidacionAgrupada':
        case 'Liquidacion.LiquidacionErronea':
        case 'Liquidacion.RecepcionFicheros':
        case 'Liquidacion.RemesaManualImposibilidad':
        case 'Liquidacion.RemesaNoAbonada':
        case 'Liquidacion.RetrocederCuotas':
        case 'Liquidacion.TardaAbonoRemesa':

        case 'Terminales.Alta.IncompatibilidadTpv':
            addMessage("Este es un caso que no estoy preparada para resolver");
            addMessage("Tengo que pasarte con un agente especializado, pulsa para hablar con él");
            linkToChat(groupId.comerciosMx);
        break;


        case 'Terminales.Alta.Modificar':
            addMessage("Este es un caso que no estoy preparada para resolver");
            addMessage("Tengo que pasarte con un agente especializado, pulsa para hablar con él");
            linkToChat(groupId.soporteTpvs);
        break;

        case 'TipoServicio.AlipayIncidencia':
            addMessage("Este es un caso que no estoy preparada para resolver");
            addMessage("Tengo que pasarte con un agente especializado, pulsa para hablar con él");
            linkToChat(groupId.soporteVirtuales);
        break;
        

        ////
        ////
        //AÑADE PREGUNTA, TE HA SIDO UTIL?
        ////
        ////
        case 'Comercios.Alta.Alta':
        case 'Comercios.Alta.CambioDivisas':
        case 'Comercios.Alta.CNAE': //-- Incluye opción de chat
        case 'Comercios.Alta.Constitucion':
        case 'Comercios.Alta.DomicilioFueraEspana':
        case 'Comercios.Alta.Error.CamposRojo':
        case 'Comercios.Alta.Error.EntradaNoValidada':
        case 'Comercios.Alta.Error.IdentificacionIncorrecta':
        case 'Comercios.Alta.FucExistente':
        case 'Comercios.Alta.GrabarPrestacion':
        case 'Comercios.Alta.PrestacionFuturo':
        case 'Comercios.Alta.Reactivar':

        case 'Comercios.Baja.Baja':

        case 'Comercios.Mantenimiento.Actualizar':
        case 'Comercios.Mantenimiento.ActualizarOficinaDistinta':
        case 'Comercios.Mantenimiento.CambiarDatos':
        case 'Comercios.Mantenimiento.CargoComisiones2Cuenta':
        case 'Comercios.Mantenimiento.LimiteOperaciones':
        case 'Comercios.Mantenimiento.ListadoEstablecimientos':


        case 'Liquidacion.ActivarTarifaPlana':
        case 'Liquidacion.AltaRemesaManual':
        case 'Liquidacion.ApunteRegularización':
        case 'Liquidacion.BloqueoEmbargo':
        case 'Liquidacion.BonificarCuotas':
        case 'Liquidacion.CobroDuplicado':
        case 'Liquidacion.ComisionSobreVentas':
        case 'Liquidacion.ComisionVentaNegativa':
        case 'Liquidacion.ComoAbonarRemesa':
        case 'Liquidacion.ConsultarDetalleRemesas':
        case 'Liquidacion.ConsultarFacturacion':
        case 'Liquidacion.ConsultarRemesaManual':
        case 'Liquidacion.ConsultarFacturacion':
        case 'Liquidacion.CuentaExpansion':
        case 'Liquidacion.CuentaExpansionCaracteristicas':
        case 'Liquidacion.CuotaPendienteIncidencia':
        case 'Liquidacion.DesactivarTarifaPlana':
        case 'Liquidacion.DevolucionComisionRetrocesiones':
        case 'Liquidacion.DevolucionNoHechaComercio':
        case 'Liquidacion.DevolverCuotas':
        case 'Liquidacion.EximirCuota':
        case 'Liquidacion.FechaRemesaManual':
        case 'Liquidacion.FechaValoracion':
        case 'Liquidacion.FraccionamientoImportes':
        case 'Liquidacion.GrabarCondicionesDescuento':
        case 'Liquidacion.ImporteDevolucionNoCoincide':
        case 'Liquidacion.ImporteErroneo':
        case 'Liquidacion.JustificanteCobro':
        case 'Liquidacion.Modalidades':
        case 'Liquidacion.ModalidadesCuota':
        case 'Liquidacion.ModificarComision':
        case 'Liquidacion.ModificarLiquidacionRemesas':
        case 'Liquidacion.Multidivisa':
        case 'Liquidacion.OperacionesSuperiores60K':
        case 'Liquidacion.OperacionNoAparece':
        case 'Liquidacion.OperacionNoLiquidada':
        case 'Liquidacion.OperativaIrregular':
        case 'Liquidacion.OrganismosAbono':
        case 'Liquidacion.PeriodicidadExtractos':
        case 'Liquidacion.PerioidicidadAbono':
        case 'Liquidacion.PlazoReclamacion':
        case 'Liquidacion.ReliquidacionRemesas':
        case 'Liquidacion.ReliquidarComisiones':
        case 'Liquidacion.ReliquidarRemesasError':
        case 'Liquidacion.RemesaLiquidadaNoAbonada':
        case 'Liquidacion.RetrocederComisionDevolucion':
        case 'Liquidacion.SospechaFraude':
        case 'Liquidacion.TarifaPlana':
        case 'Liquidacion.TarifasAplicables':
        case 'Liquidacion.TasaDescuentoExceso':
        case 'Liquidacion.TerminalBajaTPActiva':
        case 'Liquidacion.TiempoAbonoRemesas':
        case 'Liquidacion.TitularNoVeDevolucion':
        case 'Liquidacion.TpvNoRecuperado': //-- Incluye opción de chat

        case 'OperacionDuplicada':

        case 'OperativaTerminal.AceptarAmex':
        case 'OperativaTerminal.ActivarKeyEntry':
        case 'OperativaTerminal.ActivarRoaming':
        case 'OperativaTerminal.AmexModificacion':
        case 'OperativaTerminal.Aplazamiento':
        case 'OperativaTerminal.AplazamientoCAM':
        case 'OperativaTerminal.AplazamientoDevolucion':
        case 'OperativaTerminal.AplazarVenta':
        case 'OperativaTerminal.Averia':
        case 'OperativaTerminal.ZComerciosAlta':
        case 'OperativaTerminal.BoletaCustodia':
        case 'OperativaTerminal.BoletaNombre':
        case 'OperativaTerminal.CierrePrice':
        case 'OperativaTerminal.CierreTpv':
        case 'OperativaTerminal.CierreTpvPc':
        case 'OperativaTerminal.CierreTpvVirtual':
        case 'OperativaTerminal.Consulta':
        case 'OperativaTerminal.DCC':
        case 'OperativaTerminal.DCCActivacion':
        case 'OperativaTerminal.DevolucionDistintoTpv':
        case 'OperativaTerminal.Devoluciones':
        case 'OperativaTerminal.DiferenciasCambioDevolucionesDCC':
        case 'OperativaTerminal.EliminarTicket':
        case 'OperativaTerminal.Error190':
        case 'OperativaTerminal.FiltrosSeguridad':
        case 'OperativaTerminal.Flexipago':
        case 'OperativaTerminal.GasoleoBonificado':
        case 'OperativaTerminal.H24':
        case 'OperativaTerminal.IdiomaPhoneSell':
        case 'OperativaTerminal.IdiomaTpvVirtual':
        case 'OperativaTerminal.ManualesTpv':
        case 'OperativaTerminal.PAE':
        case 'OperativaTerminal.PAEDenegacion':
        case 'OperativaTerminal.Preautorizacion':
        case 'OperativaTerminal.PreautorizacionesBloqueo':
        case 'OperativaTerminal.SabadellConsumer':
        case 'OperativaTerminal.SeguridadPhoneSell':
        case 'OperativaTerminal.SeguridadTpvVirtual':
        case 'OperativaTerminal.SituacionAveria':
        case 'OperativaTerminal.TarjetasAceptadas':
        case 'OperativaTerminal.TarjetasRestaurante':
        case 'OperativaTerminal.TaxFree':
        case 'OperativaTerminal.TaxFreeGestion':


        case 'Terminales.Alta.Alta':
        case 'Terminales.Alta.Eleccion':
        case 'Terminales.Alta.Priorizar':
        case 'Terminales.Alta.Reclamar': //-- Incluye opción de chat
        case 'Terminales.Alta.Situacion':

        case 'Terminales.Baja.Retirada': //-- Incluye opción de chat
        case 'Terminales.Baja.SigueOperativoSibis': //-- Incluye opción de chat

        case 'Terminales.CambioTitularidadOrgPublico':
        case 'Terminales.CargadorCoche':
        case 'Terminales.Discrepancia':
        case 'Terminales.Divisas':
        case 'Terminales.DocumentoBaja':
        case 'Terminales.FirmaDigitalizada':
        case 'Terminales.Imprinter':
        case 'Terminales.McDonalds':
        case 'Terminales.ReactivarPhone':
        case 'Terminales.ReactivarPinpad':
        case 'Terminales.ReactivarTpvVirtual':
        case 'Terminales.Recambios':


        case 'TipoServicio.Alipay':
        case 'TipoServicio.ICGManager':
        case 'TipoServicio.PackBasico':
        case 'TipoServicio.PackCompleto':
        case 'TipoServicio.PackMultiple':
        case 'TipoServicio.PhoneSellSmsEmail':
        case 'TipoServicio.PhoneSellTarjeta':
        case 'TipoServicio.Price':
        case 'TipoServicio.TpvPc':
        case 'TipoServicio.TpvVirtual':

            processMessages();  
            utilidad = true;
        break;

        //Intent no procesado
        case 'Fallback.Default':
        case 'Fallback.Ayuda':
            handled = false;
            processMessages();  
        break;
        default:
            console.log("default switch")
            processMessages();        
        break;
     }
    
    ////
    ////
    //Si es respuesta final, preguntamos si ha sido de utilidad la respuesta
    ////
    ////
    if(utilidad){
        setContext("ctx-utilidad", 1);
            if(Math.floor(Math.random() >= 0.5))
                addMessage("¿Te ha sido útil esta información?");
            else
                addMessage("¿Te ha servido esta información?");

            addButton("Sí, gracias");
            addButton("No mucho");
            processButton();
    }
    
    console.log("DEV: "+JSON.stringify({fulfillmentMessages, outputContexts}))
    //Devolvemos la respuesta
    return res.json({fulfillmentMessages, outputContexts});
  
    ////////////////////////////
    //      FUNCIONES DE INTENTS
    ////////////////////////////

    //gId corresponde al ID del grupo en cuestión de Chatra.io
    function linkToChat(gId){
        var link = "?chat=human";
        //Si hubiera que refrescar la sesión de SAU habría que incluir el user-pass en la url
        if(gId !== undefined)
            link += "&group="+gId;
        addMessage('<a href="'+link+'">Chat con un operador</a>');
    }
  
    function hora() {        
        var date = new Date();var hour = (date.getHours()+2)%24;var min  = date.getMinutes();var sec  = date.getSeconds();var year = date.getFullYear();var month = date.getMonth() + 1;var day  = date.getDate();
        
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
        addMessage("Son las "+hour+":"+min+" del "+day+"/"+month+"/"+year);
    }
  
});

module.exports = router;