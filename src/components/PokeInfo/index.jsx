import React from 'react';
import './index.css';

const PokeInfo = (props) => {
    const { pokemon, onClick } = props;

    const tiposExibidos = pokemon.types.map((type) => type.type.name).join(', ');
    const HabilidadesExibidos = pokemon.abilities.map((ability) => ability.ability.name).join(', ')
 
    return (
        <div className='poke-info'>
            <img className='close' onClick={onClick} src='src\assets\x-lg.svg' alt=""/>
            <h2>Detalhes do Pokémon</h2>
            <p>ID: #{pokemon.id}</p>
            <p>Nome: {pokemon.name}</p>
            <img className='poke-img' src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Altura: {pokemon.height}</p>
            <p>Peso: {pokemon.weight}</p>
            <p>Tipos: {tiposExibidos}</p>
            <p>Habilidades: {HabilidadesExibidos}</p>
        </div>
    );
};

export default PokeInfo;
