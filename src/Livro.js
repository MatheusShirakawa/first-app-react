import React,{Component} from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado.js';
import PubSub from 'pubsub-js';

export class FormularioLivro extends Component{

    constructor(){

        super();
        this.state = {lista:[], title:'', price:'', authorId:''}
        this.setTitle = this.setTitle.bind(this);
        this.setPrice = this.setPrice.bind(this);
        this.setAuthorId = this.setAuthorId.bind(this);
    }

    enviaForm(evento){

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
{/* 
                    <select name="authorId">
                        <option value=""></option>  
                    </select>       */}
                    <select value={ this.state.autorId } name="autorId" onChange={ this.setAutorId }>
                        <option value="">Selecione</option>
                        { 
                            this.props.autores.map(function(autor) {
                            return <option key={ autor.id } value={ autor.id }>
                                        { autor.nome }
                                    </option>;
                            })
                        }
                    </select>
                    {/* <InputCustomizado id="authorId" type="text" name="password" value={this.state.password} label="Senha" onChange={this.setPassword} /> */}

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
        return(
            <div>
                


            </div>
        );
    }
}



export default class LivroBox extends Component{

    render(){
        return(
            <div>
                <FormularioLivro/>
                <TabelaLivros autores={this.state.autores}/>
            </div>
        );
    }
}
