import React,{Component} from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado.js';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

export class FormularioLivro extends Component{

    constructor(){

        super();
        this.state = {lista:[], title:'', price:'', authorId:''}
        this.enviaForm = this.enviaForm.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setPrice = this.setPrice.bind(this);
        this.setAuthorId = this.setAuthorId.bind(this);
    }

    enviaForm(evento){
    	  evento.preventDefault();
    	  console.log('dados sendo enviados');


    	  $.ajax({
    	      url:'http://localhost:8000/api/book/store',
    	      contentType:'application/json',
    	      dataType:'json',
    	      type:'post',
    	      data: JSON.stringify({title:this.state.title,price:this.state.price, author_id:this.state.authorId}),
    	      success:function (resposta){
                  console.log(resposta);
                  PubSub.publish('atualiza-listagem-livros',resposta[1].original[1]);
                    this.setState({title:'', price:'', authorId:''});

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

    setTitle(evento){
        this.setState({title:evento.target.value});
    }

    setPrice(evento){
        this.setState({price:evento.target.value});
    }

    setAuthorId(evento){
        this.setState({authorId:evento.target.value});
    }

    render(){
		return (
			<div className="content" id="content">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="get">

                    <InputCustomizado id="title" type="text" name="title" value={this.state.title} label="Titulo" onChange={this.setTitle} />
                    <InputCustomizado id="price" type="text" name="price" value={this.state.price} label="Preco" onChange={this.setPrice} />
                    
                    <div className="pure-control-group">
              			    <label htmlFor="author_id" >Autor</label>
                          <select id="author_id" value={ this.state.authorId } name="author_id" onChange={ this.setAuthorId }>
                              <option value="">Selecione o autor</option>
                              {
                                  this.props.autores.map(function(autor) {
                                    return <option key={ autor.id } value={ autor.id }>{ autor.name }</option>
                                  })
                              }
                          </select>
                    </div>



                    <div className="pure-control-group">
                        <label></label>
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                    </div>
                </form>
            </div>

		);
	}
}


export class TabelaLivros extends Component{

	render(){
		return (
			<div>
          <table className="pure-table">
              <thead>
                  <tr>
                      <th>Titulo</th>
                      <th>Preco</th>
                      <th>Autor</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      this.props.lista.map(function (book){
                      return (
                          <tr key={book.id}>
                              <td>{book.title}</td>
                              <td>{book.price}</td>
                              <td>{book.author_id}</td>
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



export default class LivroBox extends Component{

  constructor(){
    super();
    this.state = {lista:[], autores:[]};
  }

  componentDidMount(){
      $.ajax({
          url:'http://localhost:8000/api/books/',
          dataType:'json',
          success:function (resposta){
              console.log(resposta);
              this.setState({lista:resposta[1]});
          }.bind(this)
      });

      $.ajax({
          url:'http://localhost:8000/api/authors/',
          dataType:'json',
          success:function (resposta){
              console.log(resposta);
              this.setState({autores:resposta[1]});
          }.bind(this)
      });

      PubSub.subscribe('atualiza-listagem-livros', function (topico,novaLista){
         this.setState({lista:novaLista});
      }.bind(this));
  }

    render(){
        return(
            <div>
                <div className="content" id="content">
                    <FormularioLivro autores={this.state.autores}/>
                    <TabelaLivros lista={this.state.lista}/>
                </div>
            </div>
        );
    }
}
