import './index.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <p>Site desenvolvido por: Gabriel Lázaro</p>

                <div className="social-icons">
                    <a href="https://www.linkedin.com/in/gabriel-ferreira-2b8ab3274/" target="_blank" rel="noopener noreferrer">
                        <img src='\linkedin.svg' alt=' Icon do Linkedin'/>
                        
                    </a>
                    <a href="https://github.com/gabrielflalves06" target="_blank" rel="noopener noreferrer">
                        <img src="\github.svg" alt="Icon do Github" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
