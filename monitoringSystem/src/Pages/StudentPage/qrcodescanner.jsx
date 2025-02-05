import StudentQRCode from "../../Components/CommanComponent/QrGenerator/QrGenerator";



const QrScanner = () => {
    return( 
        <div className="allContent" > 
        <h1 className="qrInfo"><span className="qrInfo2" >Scan to view Information</span></h1>
            
            <StudentQRCode name={"name"} email={"email"} clubName={"Clubname"} rollNumber={"Roll No"} year={"year"} />
        </div>
    )
}

export default QrScanner;