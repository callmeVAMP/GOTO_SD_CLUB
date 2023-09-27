import navbarProps from "../types/navbarProps"
import "../styles/navbarStyle.css"
import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import YourTrip from "./YourTrip"
import getUserTrips from "../utils/getUserTrips"

const Navbar: React.FC<navbarProps> = ({isLogged, profile, siteName, onLogout}) => {
  const navigate = useNavigate();
  const openTripsDialogButton = useRef<HTMLButtonElement>(null);
  const [tripsShown, setTripsShown] = useState<boolean>(false);
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
  const [myTrips, setMyTrips] = useState<{_id:string, destination:string, date:string, time:string}[]>([]);
  const openTripsDialog = () => {

    if(profile?.email)  getUserTrips(profile.email).then((trips) => setMyTrips(trips));
    if(openTripsDialogButton.current){
      const buttonRect = openTripsDialogButton.current.getBoundingClientRect();
      setDialogPosition({
        top: buttonRect.bottom + 5,
        left: buttonRect.right - 380,
      });
    }
    setTripsShown(true);
    
  }

    return(
      <nav className="navbar">
        <div className="navbar__site-name" onClick={()=> navigate("/home")}>{siteName}</div>
        {isLogged?
        <div className="navbar__user">

          <button ref={openTripsDialogButton} className="user-trips" onClick={openTripsDialog}>Your Trips</button>
          <dialog className="user-trips-dialog" style={dialogPosition} open={tripsShown}>
            <div className="dialog-content">
              {myTrips.length === 0 && <div className="no-trips">You haven't added any trip</div>}
              {myTrips.map((trip) => (
                <YourTrip key={trip._id} destination={trip.destination} date={trip.date} time={trip.time} id={trip._id}/>
              ))}
              <button className="your-trips-close-btn" onClick={()=> setTripsShown(false)}>Close</button>
            </div>
          </dialog>

          <div className="navbar__avatar-frame">
            <img src={profile?.picture} alt="User Avatar" className="navbar__avatar" />
          </div>

          <button className="navbar__logout" onClick={onLogout}>Logout</button>

        </div>
        :<></>}
      </nav>
    )
}

export default Navbar;