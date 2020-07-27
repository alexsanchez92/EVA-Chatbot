'use strict';

var express = require('express');
var router = express.Router();

var groupId = require('../modules/variables').groupId;
var URL_GCP = require('../modules/variables').URL_GCP;
var iFunc = require('../modules/intentFunctions');
//var chatBase = require('../modules/chatbase');
const projectId = "consultas-sau";

router.post('/intent', (req, res) => {

    console.log("MI HOST: "+URL_GCP);
    console.log("LA DIR DONDE ME LLAMAN ES: "+req.get('host')+",   EL ORIGIN ES: "+req.get('origin'))

    //Estos parametros se ponen en la configuración del Fulfillment en Dialogflow
    //header user = atencionsau
    //header pass = bDf_4d}Z$f
    if(req.headers.authorization!="Basic YXRlbmNpb25zYXU6YkRmXzRkfVokZg=="){
        res.status(401);
        res.json({
          message: 'Unauthorized'
        });
    }
    
    var awaitCallback = false;
    var utilidad = false;
    var messages = [];
    var contextOut = [];
    var replies = [];
  
    var handled = true;
  
    var id = req.body.id;
    var sessionId = req.body.sessionId;
    var timestamp = Date.now().toString();
    var req = req.body.result;
  
    var intent = req.metadata.intentName;
    var action = req.action;
    var query = req.resolvedQuery;
  
    console.log("HE RECIBIDO: "+query);
    console.log("ACCION: "+action);
    
    ////////////////////////////
    //      FUNCIONES PARA ESCRIBIR LA RESPUESTA
    ////////////////////////////
    function addMessage(text){
        messages.push({"type": 0, "speech": text});
    }
  
    function addToMessage(text){
        messages.push(text);
    }
  
    function addButton(button){
        replies.push(button);
    }
  
    function processButton(){
        messages.push({"type":2, "replies": replies});
        replies = [];
    }

    function addCard(card){
        messages.push(card);
    }

    function addCarousel(cards){   
        var carousel = {
            "type": 4,
            "payload": {
                "cards": cards
            }
        };
        messages.push(carousel);
    }
  
    function setContext(name, lifespan){
        contextOut.push({"name": name, "lifespan": lifespan});
    }
    
    function processMessages(){
        for(var i=0; i<req.fulfillment.messages.length; i++){
            addToMessage(req.fulfillment.messages[i]);
        }
    } 
  
    ////////////////////////////
    //      DETECCION DE ACTION
    ////////////////////////////
    switch(action){

        case 'General.Hola.Inicial':
            awaitCallback = true;
            processMessages();
            iFunc.menuPrincipal(0)
            .then(function(result) {
                if(result.messages!=null && result.messages.length>0)
                    result.messages.forEach(function(aviso) {
                        addMessage("🛑🛑🛑 "+aviso);
                    });
                addCarousel(result.carousel);
                return res.json({messages, contextOut});
            }, function(err) {
                return res.json({messages, contextOut});
            });
        break;
        
        case 'Utilidad.Yes.Continuar':
        case 'General.Hola':
            awaitCallback = true;
            processMessages();
            iFunc.menuPrincipal(1)
            .then(function(result) {
                addCarousel(result.carousel);
                return res.json({messages, contextOut});
            }, function(err) {
                return res.json({messages, contextOut});
            });
        break;

        case 'General.Avisos':
            awaitCallback = true;
            iFunc.getAvisos()
            .then(function(result) {
                if(result!=null && result.length>0)
                    result.forEach(function(m) {
                        addMessage(m);
                    });
                return res.json({messages, contextOut});
            }, function(err) {
                return res.json({messages, contextOut});
            });
        break;

        case 'General.Novedades':
            awaitCallback = true;
            iFunc.getNovedades()
            .then(function(result) {
                if(result!=null || result.length>0)
                    result.forEach(function(m) {
                        addMessage(m);
                    });
                return res.json({messages, contextOut});
            }, function(err) {
                return res.json({messages, contextOut});
            });
        break;
        
        case 'Prestamo.Juanvi.Hora':
        case 'General.Hora':
            addMessage(iFunc.hora());
        break;

        case 'ErrorAlta':     
            var tipologia = req.parameters.tipologiaAlta;
            if(tipologia == "terminal"){
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
                    "type": 1,
                    "title": "Manual VX680",
                    "subtitle": "Versión 3",
                    "imageUrl": URL_GCP+"/media/images/cards/manuales.jpg",
                    "buttons": [
                      {
                        "text": "Ver manual",
                        "postback": URL_GCP+"/media/manuales/VX680_v3.pdf"
                      }
                    ]
                  };
                  addCard(t);
                  break;
                case 'IWL28X':
                  var t={
                    "type": 1,
                    "title": "Manual IWL28X",
                    "subtitle": "Versión 4",
                    "imageUrl": URL_GCP+"/media/images/cards/manuales.jpg",
                    "buttons": [
                      {
                        "text": "Ver manual",
                        "postback": URL_GCP+"/media/manuales/IWL28X_v4.pdf"
                      }
                    ]
                  };
                  addCard(t);
                  break;
                case 'ICT250':
                  var t={
                    "type": 1,
                    "title": "Manual ICT250",
                    "subtitle": "Versión 2",
                    "imageUrl": URL_GCP+"/media/images/cards/manuales.jpg",
                    "buttons": [
                      {
                        "text": "Ver manual",
                        "postback": URL_GCP+"/media/manuales/ICT250_v3.pdf"
                      }
                    ]
                  };
                  addCard(t);
                  break; 
                default:
                  addMessage("No tenemos manual del "+modelo+" que buscabas");
            }             
            utilidad=true;
        break; 
        
        case 'OperativaTerminal.OperacionDenegada':
            var tipo = req.parameters.tipoTpv;
            switch(tipo){
                case 'virtual':
                    addMessage("texto");
                    addMessage("texto");
                    addMessage("texto");
                    utilidad=true;
                break;
                case 'fisico':
                    addMessage("Este es un caso que no estoy preparada para resolver");
                    addMessage("Tengo que pasarte con un agente especializado, pulsa para hablar con él");
                    iFunc.linkToChat(groupId.comerciosMx);
                break;                
            }
        break;

        case 'Terminales.Baja.Tpv':
            var tipo = req.parameters.tipoTpv;
            switch(tipo){
                case 'virtual':
                    addMessage("texto");
                    addMessage("texto");
                    addMessage("texto");             
                    utilidad=true;
                break;
                case 'fisico':
                    addMessage("texto");
                    addMessage("texto");
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

        case 'OperativaTerminal.BoletaOperacion':
        case 'OperativaTerminal.ConsultarActivacionKeyEntry':
        case 'OperativaTerminal.DevolucionNoPermitida':
        case 'OperativaTerminal.ErrorDCC':
        case 'OperativaTerminal.NoAceptarAmex':
        case 'OperativaTerminal.NumSim':
        case 'OperativaTerminal.ProblemaRollos':

        case 'Terminales.Alta.IncompatibilidadTpv':
            addMessage("Este es un caso que no estoy preparada para resolver");
            addMessage("Aquí tienes a un agente especializado, pulsa para hablar con él");
            addMessage(iFunc.linkToChat(groupId.comerciosMx));
        break;


        case 'Terminales.Alta.Modificar':
            addMessage("Este es un caso que no estoy preparada para resolver");
            addMessage("Tengo que pasarte con un agente especializado, pulsa para hablar con él");
            addMessage(iFunc.linkToChat(groupId.soporteTpvs));
        break;

        case 'TipoServicio.AlipayIncidencia':
            addMessage("Este es un caso que no estoy preparada para resolver");
            addMessage("Te paso con un agente especializado, pulsa para hablar con él");
            addMessage(iFunc.linkToChat(groupId.soporteVirtuales));
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
        case 'Liquidacion.TiposTarifaPlana':
        case 'Liquidacion.TitularNoVeDevolucion':
        case 'Liquidacion.TpvNoRecuperado': //-- Incluye opción de chat

        case 'OperacionDuplicada':
        
        case 'OperativaTerminal.AccesoDatosTarjeta':
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
        case 'OperativaTerminal.CierreTNA':
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
        case 'OperativaTerminal.ModificacionVirtual':
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
        case 'TipoServicio.Done':
        case 'TipoServicio.PackBasico':
        case 'TipoServicio.PackCompleto':
        case 'TipoServicio.PackEventos':
        case 'TipoServicio.PackMultiple':
        case 'TipoServicio.PhoneSellSmsEmail':
        case 'TipoServicio.PhoneSellTarjeta':
        case 'TipoServicio.Price':
        case 'TipoServicio.Selae':
        case 'TipoServicio.TNA':
        case 'TipoServicio.TPVMovil':
        case 'TipoServicio.TpvPc':
        case 'TipoServicio.TPVRespaldo':
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

            addButton('Sí, gracias 👍🏻');
            addButton('No mucho 👎🏻');
            processButton();
    }

    //////
    //Enviamos a Chatbase
    //////
    //chatBase.userMessage(handled, timestamp, req.source, intent, query, sessionId);
    //chatBase.agentMessage(timestamp, req.source, intent, sessionId, messages);

    //Devolvemos la respuesta. si hay un callback esperamos
    if(!awaitCallback){
        return res.json({messages, contextOut});
    }
});

module.exports = router;