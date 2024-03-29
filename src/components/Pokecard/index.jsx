import './index.css';

const PokeCard = (props) => {
  const { id, nome, imagem, tipos, onClick} = props;

  const primeiroTipo = tipos.length > 0 ? tipos[0].type.name : '';

  const tiposExibidos = tipos.map((type) => type.type.name.toUpperCase()).join(' / ');

  const cardClasses = `card_pokemon ${primeiroTipo}`;

  return (
    <div className={cardClasses} onClick={onClick}>
      <h4>#{id}</h4>
      <h3>{nome}</h3>
      <img src={imagem} alt={nome} loading="lazy"/>
      <p className="type">
        {tiposExibidos}
      </p>
    </div>
  );
};

export default PokeCard;