import './Card.css'

const Card = ({content}) => {
    return(
        <div className="cardComponent">
            <div className='cardContent'>
                <h1>{content.clubName}</h1>
                <p className='hoverContent'>{content.clubContent}</p>
            </div>            
        </div>
    );
}

export default Card;