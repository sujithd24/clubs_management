import './Card.css'

const Card = ({content}) => {
    return(
        <div className="cardComponent">
            <div className='cardContent'>
                <h1>{content.title}</h1>
                <p className='hoverContent'>{content.content}</p>
            </div>            
        </div>
    );
}

export default Card;