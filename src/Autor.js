import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado.js';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

export class FormularioAutor extends Component{

	constructor(){
        super();
        this.state = {lista: [], name:'', email:'', password:''};
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

	enviaForm(evento){
	  evento.preventDefault();
	  console.log('dados sendo enviados');      


	  $.ajax({
	      url:'http://localhost:8000/api/author/store',
	      contentType:'application/json',
	      dataType:'json',
	      type:'post',
	      data: JSON.stringify({name:this.state.name,email:this.state.email, password:this.state.password}),
	      success:function (resposta){
              console.log(resposta);
              PubSub.publish('atualiza-listagem-autores',resposta[1].original[1]);
                this.setState({name:'', email:'', password:''});

            // this.props.callBackAtualizaListagem(resposta[1].original[1]);
            // disparar um aviso geral de nova listagem disponivel  
	        // this.setState({lista:resposta[1].original[1]});
	      }.bind(this),
	      error:function (resposta){
	          if(resposta.status === 400){
                  //recuperar quais foram os erros
                  //exibir a mensagem de erro no campo
                  new TratadorErros().publicaErros(resposta.responseJSON);
              }
          },
          beforeSend: function(){
              PubSub.publish("limpa-erros",{});
          }

	  });
	}

	setName(evento){
	  this.setState({name:evento.target.value});
	}

	setEmail(evento){
	  this.setState({email:evento.target.value});
	}

	setPassword(evento){
	  this.setState({password:evento.target.value});
	}

        render(){
            return (
                <div className="content" id="content">
                    <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="get">

                        <InputCustomizado id="name" type="text" name="name" value={this.state.name} label="Nome"  onChange={this.setName} />

                        <InputCustomizado id="email" type="email" name="email" value={this.state.email} label="Email"  onChange={this.setEmail} />

                        <InputCustomizado id="password" type="password" name="password" value={this.state.password} label="Senha" onChange={this.setPassword} />

                        <div className="pure-control-group">
                            <label></label>
                            <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                        </div>
                    </form>
                </div>

            );
        }
}


export class TabelaAutores extends Component{

	render(){
		return (
			<div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Senha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function (author){
                            return (
                                <tr key={author.id}>
                                    <td>{author.name}</td>
                                    <td>{author.email}</td>
                                    <td>{author.password}</td>
                                </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>

		);
	}
}

export default class AutorBox extends Component{

    constructor(){
        super();
        this.state = {lista: []};
        // this.atualizaListagem = this.atualizaListagem.bind(this);
    }

    componentDidMount(){
        $.ajax({
            url:'http://localhost:8000/api/authors/',
            dataType:'json',
            success:function (resposta){
                console.log(resposta);
                this.setState({lista:resposta[1]});
            }.bind(this)
        });  
        
        PubSub.subscribe('atualiza-listagem-autores', function (topico,novaLista){
           this.setState({lista:novaLista}); 
        }.bind(this));
    }

    // atualizaListagem(novaLista){
    // 	this.setState({lista:novaLista});
    // }

	render(){
		return(
            <div>
                {/* <div className="header">
                    <h1>Cadastro de Autores</h1>
                </div> */}
                <div className="content" id="content">
                    {/* <FormularioAutor callBackAtualizaListagem={this.atualizaListagem}/> */}
                    <FormularioAutor/>
                    <TabelaAutores lista={this.state.lista}/>
                </div> 
			</div>
		);
	}
}

