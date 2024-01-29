import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Description from './components/Description';
import PokedexNavigation from './components/Header';
import PokeCard from './components/Pokecard';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PokeApi() {
  const [pokemons, setPokemons] = useState([]);
  const [region, setRegion] = useState('');
  const [description, setDescription] = useState('');
  const [pesquisa, setPesquisa] = useState('');

  async function ProcurarPokedex(num) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokedex/${num}`);
      ProcurarPokemons(response.data.pokemon_entries);
      setRegion(response.data.name);
      setDescription(response.data.descriptions.find((desc) => desc.language.name === "en"));
    } catch (error) {
      console.error(error);
    }
  }

  async function ProcurarPokemons(pokedexList) {
    try {
      const result = pokedexList.map(async (pokedex) => {
        const response = await axios.get(pokedex.pokemon_species.url);
        return response.data;
      });
      const ListAllPokemons = await Promise.all(result);
      ListarPokemon(ListAllPokemons);
    } catch (error) {
      console.error(error);
    }
  }

  async function ListarPokemon(pokeList) {
    try {
      const result = pokeList.map(async (pokemon) => {
        const response = await axios.get(pokemon.varieties[0].pokemon.url);
        return response.data;
      });
      const allPokemonData = await Promise.all(result);
      setPokemons(allPokemonData);
    } catch (error) {
      console.error(error);
    }
  }

  const filtrarPokemon = () => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(pesquisa.toLowerCase())
    );
  };

  useEffect(() => {
    ProcurarPokedex(1);
  }, []);

  return (
    <>
      <PokedexNavigation ProcurarPokedex={ProcurarPokedex} />
      <div className='container' style={{ margin: '10px auto' }}>
        <div className='input-group mb-3'>
          <input
            className='form-control'
            type="text"
            placeholder="Pesquisar por: nome do pokemon"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>
      </div>

      <Description nome={region} descrição={description.description} />
      <div className="container_pokemon">
        {filtrarPokemon().length === 0 ? (
          <h1>Não foi encontrado nenhum pokemon com esse nome</h1>
        ) : (
          filtrarPokemon().map((pokemon) => (
            <PokeCard key={pokemon.id} id={pokemon.id} nome={pokemon.name} imagem={pokemon.sprites.front_default} tipos={pokemon.types} />
          ))
        )
        }
      </div>
    </>
  );
}
