import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Description from './components/Description';
import PokedexNavigation from './components/Header';
import PokeCard from './components/Pokecard';

export default function PokeApi() {

  const [pokemons, setPokemons] = useState([]);
  const [region, setRegion] = useState('');
  const [description, setDescription] = useState('');

  async function ProcurarPokedex(num) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokedex/${num}`)
      ProcurarPokemons(response.data.pokemon_entries);
      setRegion(response.data.name)
      setDescription(response.data.descriptions.find((desc) => desc.language.name === "en"));
    } catch (error) {
      console.log(error)
    }
  }


  async function ProcurarPokemons(pokedexList) {
    try {
      const result = pokedexList.map(async (pokedex) => {
        const response = await axios.get(pokedex.pokemon_species.url);
        return response.data;
      })
      const ListAllPokemons = await Promise.all(result);
      ListarPokemon(ListAllPokemons)
    } catch (error) {
      console.log(error)
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
      console.log(error);
    }
  }

  useEffect(() => {
    ProcurarPokedex(1)
  }, [])

  
  return (
    <>
      <PokedexNavigation ProcurarPokedex={ProcurarPokedex} />

      <Description nome={region} descrição={description.description} />
      <div className="container_pokemon">
        {pokemons.map((pokemon) => (
          <PokeCard key={pokemon.id} id={pokemon.id} nome={pokemon.name.toUpperCase()} imagem={pokemon.sprites.front_default} tipos={pokemon.types} />
        ))}
      </div>
    </>
  );
}