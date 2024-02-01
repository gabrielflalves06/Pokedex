import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Description from './components/Description';
import PokeCard from './components/Pokecard';
import './App.css';
import PokeInfo from './components/PokeInfo';
import Footer from './components/Footer';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [description, setDescription] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [carregando, setCarregando] = useState(true)

  async function ProcurarPokedex(num) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokedex/${num}`);

      setName(response.data.name);
      ProcurarPokemons(response.data.pokemon_entries);
      num === 1 ? (
        (setRegion(''),
          setDescription(''))
      ) : (

        (setRegion(response.data.region.name),
          setDescription(response.data.descriptions.find((desc) => desc.language.name === "en")))
      )
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
      setCarregando(false);
    } catch (error) {
      console.error(error);
    }
  }

  const filtrarPokemon = () => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(pesquisa.toLowerCase())
    );
  };


  const VerPokeInfo = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsVisible(true);
  };


  useEffect(() => {
    ProcurarPokedex(2);
  }, []);

  const pokedexOptions = [
    { id: 2, name: 'kanto' },
    { id: 3, name: 'original-johto' },
    { id: 4, name: 'hoenn' },
    { id: 5, name: 'original-sinnoh' },
    { id: 6, name: 'extended-sinnoh' },
    { id: 7, name: 'updated-johto' },
    { id: 8, name: 'original-unova' },
    { id: 9, name: 'updated-unova' },
    { id: 12, name: 'kalos-central' },
    { id: 13, name: 'kalos-coastal' },
    { id: 14, name: 'kalos-mountain' },
    { id: 15, name: 'updated-hoenn' },
    { id: 16, name: 'original-alola' },
    { id: 17, name: 'original-melemele' },
    { id: 18, name: 'original-akala' },
    { id: 19, name: 'original-ulaula' },
    { id: 20, name: 'original-poni' },
    { id: 21, name: 'updated-alola' },
    { id: 22, name: 'updated-melemele' },
    { id: 23, name: 'updated-akala' },
    { id: 24, name: 'updated-ulaula' },
    { id: 25, name: 'updated-poni' },
    { id: 26, name: 'letsgo-kanto' },
    { id: 27, name: 'galar' },
    { id: 28, name: 'isle-of-armor' },
    { id: 29, name: 'crown-tundra' },
    { id: 30, name: 'hisui' },
    { id: 31, name: 'paldea' },
    { id: 32, name: 'kitakami' },
    { id: 33, name: 'blueberry' },
  ];

  return (
    <>
      <div className='topnav'>
        <img src="/logo.png" width={100} alt="" />
        <select className='form-select form-select-lg mb-3' style={{ width: '90%', margin: "10px" }} onChange={(e) => ProcurarPokedex(parseInt(e.target.value))}>
          {pokedexOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

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

      <Description nome={name} descrição={description.description} região={region} />
      <div className="container_pokemon">
        {filtrarPokemon().length === 0 ? (
          carregando ? (
            <h1>Carregando...</h1>
          ) : (
            <h1>Não foi encontrado nenhum pokemon com esse nome</h1>
          )
        ) : (
          filtrarPokemon().map((pokemon) => (
            <PokeCard key={pokemon.id} id={pokemon.id} nome={pokemon.name} imagem={pokemon.sprites.front_default} tipos={pokemon.types} onClick={() => VerPokeInfo(pokemon)} />
          ))
        )
        }

        {isVisible && selectedPokemon && (
          <PokeInfo pokemon={selectedPokemon} onClick={() => setIsVisible(false)} />
        )}

      </div>

      <Footer />
    </>
  );
}