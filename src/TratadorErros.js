import PubSub from 'pubsub-js';

export default class TratadorErros{


    publicaErros(objeto){
        console.log(objeto);

        // for(var i=0 ;i<objeto.erroMsg.length;i++){
        //     var erro = objeto.erroMsg[i];
        // }
        
        PubSub.publish("erro-validacao",objeto);
        
    }


}