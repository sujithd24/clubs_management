import Card from "../../Components/CommanComponent/CardComponent/Card";
import bitlogo from "../../assets/bit-logo.png"

const AdminHome = () => {
   

    const list = [
        {
            title: "Code Circle",
            content: "Code Circle Club aims to improve the art of competitive programming skills among the students and to train them ready for reputed competitions, Events conducted at National and International Level...View More "
        },
        {
            title: "Geo Club",
            content: "Green Eco Organisation [GEO], the nature club of BIT, strives towards inculcating a habit of conservation and sustainable practices amongst the students to enable them make eco-friendly decisions further in their chosen careers...View More"
        },
        {
            title: "Great Minds Club",
            content: "Great Minds Club helps to recognize and bring out our students’ various interpersonal skills like creative thinking, general knowledge, etc., which is also helpful for their academic knowledge and insights for placement interviews mediated via a teleconference..."
        },
        {
            title: "Leo Club",
            content: 'The Leo club provides and enhances "Leadership, Experience and Opportunity" to the younger generation by involving them in various social related activities...'
        },
        {
            title: "Music Club",
            content: "This is the place in the campus where music is recreated, cherished and loved by the most passionate hearts. The Music Club of BIT has always had its history very interesting as many passionate musicians today in the industry have started their career from this very platform..."
        },
        {
            title: "Photo Hub",
            content: "Moments are miracles that last for a second. Memories are gems that last forever. Let's capture each and every moment with a click to build our memory gallery. At Photohub we capture, transform, beautify and intensify your experiences since experiences come once and never repeat themselves..."
        },
    ]

    const society = [
        {
            title: "National Cadet Corps",
            content: "UNITY AND DISCIPLINE. World's largest uniformed youth organization. Join BIT-NCC to realise your potential and enjoy the adventure.View More"
        },
        {
            title: "National Service Scheme",
            content: 'NOT ME BUT YOU — "The best way to find yourself is to lose yourself in the service of others." Mahatma Gandhi Join the NSS community of BIT to make the difference. View More'
        },
    ]

    return (
        <div className="allContent">
            <div className="content" style={{marginLeft:"-10px"}}>
            <img src={bitlogo} alt="a" height={"70px"} className="logoAdmin"/>
                <h1 className="homeHeading">
                    Clubs</h1>
                {
                    list.map(
                        (c, i) => {
                            return (
                                <Card key={i} content={c} />
                            )
                        }
                    )
                }
                <h1 className="homeHeading">Society</h1>
                {
                    society.map(
                        (c, i) => {
                            return (
                                <Card key={i} content={c} />
                            )
                        }
                    )
                }
            </div>
        </div>
    );
}

export default AdminHome;
