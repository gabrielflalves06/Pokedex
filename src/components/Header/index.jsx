import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const PokedexNavigation = ({ ProcurarPokedex }) => {

    const pokedexOptions = [
        { id: 1, name: 'national' },
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
    ];

    return (
        <div className="topnav">

            <img src="/logo.png" width={100} alt="" />
            <select className='form-select form-select-lg mb-3' style={{ width: '90%', margin: "10px" }}  onChange={(e) => ProcurarPokedex(parseInt(e.target.value))}>
                {pokedexOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>

    );
};

export default PokedexNavigation;
