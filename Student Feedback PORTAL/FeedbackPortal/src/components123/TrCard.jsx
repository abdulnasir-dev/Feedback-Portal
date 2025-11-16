import '../Style/TrCard.css';

export default function TrCard({details}) {
    return (
       <>   
        <div className="acc">
          
            <a href=""><img src={details.src}alt="user.img" className="account-image" /></a>
           <span className="acc-s">

             <h3>{details.name}</h3>
             <p>{details.subject}</p>
            < p>{details.email}</p>
            
           </span>
           
        </div>
       
       </>
    )
}