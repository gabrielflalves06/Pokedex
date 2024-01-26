import './index.css'

const PokeCard = (props) => {
    const { id, nome, imagem, tipos } = props;

    const primeiroTipo = tipos.length > 0 ? tipos[0].type.name : '';
  
    // Mapeia os tipos para exibir na tela
    const tiposExibidos = tipos.map((type) => type.type.name.toUpperCase()).join(' / ');

    const cardClasses = `card_pokemon ${primeiroTipo}`;

    return (
      <div className={cardClasses}>
        <h4>#{id}</h4>
        <h3>{nome}</h3>
        <img src={imagem} alt="" />
          <h4 className="type">
            {tiposExibidos}
          </h4>
      </div>
    );
  };
  
  export default PokeCard;