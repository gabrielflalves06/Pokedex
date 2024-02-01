import './index.css'

const Description = (props) => {

    const { nome, descrição, região } = props;

    return (
        <div className="descriptions">
            
            <h3>{região}</h3>
            <h1>{nome}</h1>
            <h2>{descrição}</h2>
        </div>
    );
}

export default Description;