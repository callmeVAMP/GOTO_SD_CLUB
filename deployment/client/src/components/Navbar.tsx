import navbarProps from "../types/navbarProps"
import "../styles/navbarStyle.css"
import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import YourTrip from "./YourTrip"
import UserMenu from "./UserMenu"
import getUserTrips from "../utils/getUserTrips"
import getContact from "../utils/getContact"

const Navbar: React.FC<navbarProps> = ({isLogged, profile, siteName, onLogout}) => {
  const navigate = useNavigate();
  const openTripsDialogButton = useRef<HTMLButtonElement>(null);
  const [tripsShown, setTripsShown] = useState<boolean>(false);
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
  let storedTrips = localStorage.getItem('myTrips');
  const [myTrips, setMyTrips] = useState<{_id:string, destination:string, date:string, time:string}[]>((!!storedTrips)?JSON.parse(storedTrips) : []);
  const [tripState, setTripState] = useState<string>("Loading...");

  const openUserMenuBtn = useRef<HTMLButtonElement>(null);
  const [userMenuShown, setUserMenuShown] = useState<boolean>(false);
  const [userMenuDialogPosition, setUserMenuDialogPosition] = useState({ top: 0, left: 0 });

  const logoutConfirmationDialog = useRef<HTMLDialogElement>(null);

  const [ph_no, setPh_no] = useState<string>(localStorage.getItem('ph_no') || "Loading...");
  const [wa_no, setWa_no] = useState<string>(localStorage.getItem('wa_no') || "Loading...");

  const openTripsDialog = () => {
    setUserMenuShown(false);
    if(profile)  getUserTrips(profile.email).then((trips) => {if(trips.length===0)  setTripState("You haven't added any trips."); setMyTrips(trips)});
    if(openTripsDialogButton.current){
      const buttonRect = openTripsDialogButton.current.getBoundingClientRect();
      setDialogPosition({
        top: buttonRect.bottom + 5,
        left: buttonRect.right - 250,
      });
    }
    setTripsShown(true);
  }

  const openUserMenu = () => {
    setTripsShown(false);
    if(profile && (ph_no==="Loading..." || wa_no==="Loading...")){
    getContact(profile.email).then((contact) => {
      if(typeof(contact)!=='boolean'){
        setPh_no(contact.ph_no);
        setWa_no(contact.wa_no);
      }
    });}
    
    if(openUserMenuBtn.current){
      const buttonRect = openUserMenuBtn.current.getBoundingClientRect();
      setUserMenuDialogPosition({
        top: buttonRect.bottom + 5,
        left: buttonRect.right - 200,
      });
    }
    setUserMenuShown(true);
  }

  const closeLogoutModal = () => {
    if (logoutConfirmationDialog.current) {
        logoutConfirmationDialog.current.close();
        }};

  const openLogoutModal = () => {
    if (logoutConfirmationDialog.current) {
        logoutConfirmationDialog.current.showModal();
        }};

    return(
      <>
      <dialog className="user-trips-dialog" style={dialogPosition} open={tripsShown}>
        <div className="dialog-content">
          {myTrips.length === 0 && <div className="no-trips">{tripState}</div>}
          {myTrips.map((trip) => (
            <YourTrip key={trip._id+trip.date+trip.time} destination={trip.destination} date={trip.date} time={trip.time} id={trip._id} name={profile?.name || ""}/>
          ))}
          <button className="red-text-btn" onClick={()=> setTripsShown(false)}>Close</button>
        </div>
      </dialog>

      <dialog className="user-menu-dialog" style={userMenuDialogPosition} open={userMenuShown}>
        <UserMenu key={ph_no} email={profile?.email || ""} ph_no={ph_no} wa_no={wa_no} />
        <button className="red-text-btn" onClick={()=> setUserMenuShown(false)}>Close</button>
      </dialog>

      <nav className="navbar">
        <dialog ref={logoutConfirmationDialog}>
          <div className="modal-content">
          <div>Are you sure that you want to logout?</div>
          <div className="buttons">
              <button className='blue-text-btn' onClick={closeLogoutModal}>No</button>
              <button className='red-text-btn' onClick={()=>{onLogout(); closeLogoutModal()}}>Yes</button>
          </div>
          </div>
        </dialog>

        <div className="navbar__site-name" onClick={()=> navigate("/home")}>
          {window.screen.width>window.screen.height || !isLogged?"GoTogether":"GoTo"}
        </div>
        {isLogged?
        <div className="navbar__user">

          <button ref={openTripsDialogButton} className="user-trips" onClick={openTripsDialog}>Your Trips</button>
          

          <button ref={openUserMenuBtn} onClick={openUserMenu} className="navbar__avatar-frame">
            <img src={profile?.picture} alt="User Avatar" className="navbar__avatar" />
          </button>

          

          {window.screen.width>window.screen.height?
            <button className="navbar__logout" onClick={openLogoutModal}>Logout</button>
            :<img src="/icons/logout.png" alt="Logout" className="navbar__logout_icon" onClick={openLogoutModal}/>
          }

        </div>
        :<></>}
      </nav>
      </>
    )
}

export default Navbar;