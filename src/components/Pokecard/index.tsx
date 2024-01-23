import './index.css'

const PokeCard = (props) => {
    const { id, nome, imagem, tipos } = props;
  
    return (
      <div className="card_pokemon">
        <h4>#{id}</h4>
        <h3>{nome}</h3>
        <img src={imagem} alt="" />
        {tipos.map((type) => (
          <p className="type">
            {type.type.name}
          </p>
        ))}
      </div>
    );
  };
  
  export default PokeCard;