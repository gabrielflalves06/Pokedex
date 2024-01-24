import './index.css'

const Description = (props) => {
    
    const {nome, descrição} = props;
    
    return(
        <div className="descriptions">
            <h1>{nome}</h1>
            <h3>{descrição}</h3>
        </div>
    );
}

export default Description;