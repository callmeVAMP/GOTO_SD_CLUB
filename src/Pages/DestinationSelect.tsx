import loggedInPageProps from "../types/loggedInPageProps"
import React, {useState} from "react"
import "../styles/destinationSelectPageStyle.css"
import InfoCard from '../components/InfoCard';
import {useNavigate} from 'react-router-dom';

import getDateTime from "../utils/getDateTime";
// import checkEntry from "../utils/checkEntry";
import addTravelDetail from "../utils/addTravelDetail";
import updateContact from "../utils/updateContact";
import getContact from "../utils/getContact";

import dateTimeInterface from "../types/dateTimeInterface";
// import findCompanions from "../utils/findCompanions";


export default function DestinationSelect({profile}:loggedInPageProps){

  const handleDropdownVisibility = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let dropdown = document.querySelector("[data-dropdown]");
    if(dropdown){
      dropdown.classList.toggle("active");
    }
  }

  const handleDestinationSelection = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let dropdown = e.currentTarget.closest("[data-dropdown]");
    if(dropdown){
      dropdown.classList.toggle("active");
    }
    setDestination(e.currentTarget.textContent || "Select your Destination");
  }

  const navigate = useNavigate();

  const [destination, setDestination] = useState<string>("Select your Destination");
  const [date, setDate] = useState<string>("");
  const [serverDate, setServerDate] = useState<dateTimeInterface | boolean>(true);
  const [time, setTime] = useState<string>("");
  const [ph_no, setPh_no] = useState<string>("");
  const [wa_no, setWa_no] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isServerDown, setIsServerDown] = useState<boolean>(true);


  if(serverDate===true && profile){
    getContact(profile.email).then((val)=>{
      if(val===false) setLoading(false);
      else if(typeof(val)!=='boolean'){
        setPh_no(val.ph_no);
        setWa_no(val.wa_no);
      }
    });

    getDateTime().then((val)=>{
      setServerDate(val); setLoading(false);
      if(typeof(val)!=='boolean'){
        setDate(val.date);
        setTime(val.time);
        setIsServerDown(false);}
    });
  }

  const onSearch = (destination:string, date: string) => {
    if(profile){
      setLoading(true);
      updateContact(profile.email, ph_no, wa_no).then((val)=>{if(!val) {setLoading(false);  setIsServerDown(true);return;}});

      const travelDetail={
        email: profile.email,
        destination: destination,
        date: date,
        time: time,
      };

      addTravelDetail(travelDetail).then((val)=>{
        setLoading(false);  
        if(val){
          navigate(`/showCompanions/${destination}/${date}/${time}`);
        }
        else setIsServerDown(true);
      });
    }

    else window.alert("Please login to continue");
  }

  return(
    <>
      {loading && <InfoCard content='Loading...'/>}

      {!loading && isServerDown && <InfoCard content='Unable to connect to the server :_('/>}

      {!loading && !isServerDown && typeof(serverDate)!=='boolean' && (
        <>
          <InfoCard content={`So ${profile?.given_name}, where would you like to go today ?`} />
          {/* <div className="selection-list"> */}
          <div className="date-time">
            <input type="date" onChange={(e)=>setDate(e.target.value)} value={date} min={serverDate.date} required/>
            <input type="time" step="900" onChange={(e)=>setTime(e.target.value)} value={time.slice(0,5)} required/>
          </div>
          <div className="drop-wrap">
            <input type="tel" placeholder="Phone Number" onChange={(e)=>setPh_no(e.target.value)} value={ph_no} required/>
            <input type="tel" placeholder="WhatsApp Number" onChange={(e)=>setWa_no(e.target.value)} value={wa_no} required/>
            <span>
            <input type="checkbox" id="myCheckbox" onChange={(e)=> {
              if(e.target.checked) setWa_no(ph_no)
            }} />
            <label htmlFor="myCheckbox">Same as phone number</label>
            </span>

            <div className="dropdown" data-dropdown>
              <button className="destination-selector-button" onClick={handleDropdownVisibility}>
                {destination}</button>
              <div className="dropdown-menu">
                <div className="dropdown-cities">
                  <button className="dropdown-item" onClick={handleDestinationSelection}>DNR</button>
                  <button className="dropdown-item" onClick={handleDestinationSelection}>Khurda Station</button>
                  <button className="dropdown-item" onClick={handleDestinationSelection}>Bhubaneshwar</button>
                  <button className="dropdown-item" onClick={handleDestinationSelection}>Airport</button>
                  <button className="dropdown-item" onClick={handleDestinationSelection}>Puri</button>
                  <button className="dropdown-item" onClick={handleDestinationSelection}>Bhubaneshwar</button>
                </div>
              </div>
            </div>
            <button className="search-btn" onClick={()=>onSearch(destination,date)}>Find Companions</button>
          </div>
        </>
      )}
    </>
  )
}