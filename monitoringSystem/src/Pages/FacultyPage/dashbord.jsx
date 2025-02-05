import img from '../../assets/image.png';

const Fdashbord = () => {

    const clubs ={
        title:"National Service Scheme",
        content:'NOT ME BUT YOU — "The best way to find yourself is to lose yourself in the service of others." Mahatma Gandhi Join the NSS community of BIT to make the difference. View More'
    };

    const incharge = {
        incharge1:"incharge1",
        incharge2:"incharge2"
    }
    return(
    <div className="allContent">
        <div className="fcontent">
           <h1>{clubs.title}</h1>
           <p>{clubs.content}</p>
           <div className="clubIncharge">
            <div>
                <img src={img} alt="" className='inchargeImg' />
                <h1>{incharge.incharge1}</h1>
            </div>
            <div>
                <img src={img} alt="" className='inchargeImg' />
                <h1>{incharge.incharge2}</h1>
            </div>
           </div>
        </div>
    </div>
    )
}

export default Fdashbord;