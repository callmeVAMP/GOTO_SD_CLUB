import {useParams} from 'react-router-dom';
import findCompanions from '../utils/findCompanions';
import getSubscriptionObject from '../utils/getSubscriptionObject';
import CompanionCard from '../components/CompanionCard';
import "../styles/companionCardStyle.css"
import travelDetails_interface from '../types/travelDetailsInterface';
import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import InfoCard from '../components/InfoCard';
import PopupMessage from '../components/PopupMessage';

const ShowCompanions : React.FC<{email:string, name:string}> = ({email, name}) => {

    const location = useLocation();
    useEffect(()=> setLoading(true), [location]);

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<travelDetails_interface[] | boolean>([]);
    const [pressed, setPressed] = useState<boolean>(false);
    const {destination, date, time} = useParams();

    const [displayPopup, setDisplayPopup] = useState<boolean>(false);
    const handleNotificationSubscriptionPopup = () => {
      setDisplayPopup(true);
      setTimeout(() => {
        setDisplayPopup(false);
      }, 2000);
    };

    if(loading && destination && date && email && time){ findCompanions(destination, date, email, name, time).then(
        (val)=>{setData(val);   setLoading(false);});}

    return (
        <>
            {/* <h1>Companions</h1> */}
            {displayPopup && <PopupMessage content="You will be notified!"/>}
            
            {loading && <InfoCard key={1} content='Loading...'/>}

            {!loading && data===false && <InfoCard key={2} content='Unable to connect to the server :_('/>}

            {!loading && typeof(data)!=='boolean' && data.length === 0 && 
            <>
            <div key={3} className="companion-list">
                <InfoCard content={`Sorry, no companions found for
                ${destination} as of now`}/>
                {!pressed ?
                    <>
                    <InfoCard content={`Don't wanna go alone?
                    We'll let you know when there are companions for you ;-)`}/>
                    <button className='getNotified-btn' onClick={()=>{getSubscriptionObject(email);setPressed(true);handleNotificationSubscriptionPopup();}}>Get Notified!</button>
                    </>
                    :<InfoCard content='You will be notified when there are companions for you.'/>
                }
            </div>
            </>
            }

            <div key={4} className="companion-list">
                {typeof(data)!=='boolean' && data.length > 0 && (
                    <>
                    
                    <InfoCard key={5} content={`You can go to ${destination} with anyone of them...`}/>
                    {data.map((item) => (
                        <div className="companion-card" key={item._id}>
                            <CompanionCard avatar={item.avatar} name={item.name} time={item.time} ph={item.ph_no} wa={item.wa_no} email={item.email}/>
                        </div>
                    ))}
                    {!pressed ?
                        <>
                        <InfoCard key={6} content={`Don't wanna go with them?
                        We'll let you know when there are more companions ;-)`}/>
                        <button className='getNotified-btn' onClick={()=>{getSubscriptionObject(email);setPressed(true);handleNotificationSubscriptionPopup();}}>Get Notified!</button>
                        </>
                        :<InfoCard key={7} content='You will be notified when there are more companions for you.'/>
                    }
                    </>
                )}
            </div>
            

            
                {/* <CompanionCard avatar="https://lh3.googleusercontent.com/a/AAcHTtcEHfXcrWUtyCsZpbHOxZWeG5SOtvKcT8F5h3-TtSo=s96-c" name="John Doe" time="10:00" ph="1234567890" wa="1234567890" email="shlok845@gmail.com"/>
                <CompanionCard avatar="https://lh3.googleusercontent.com/a/AAcHTtcEHfXcrWUtyCsZpbHOxZWeG5SOtvKcT8F5h3-TtSo=s96-c" name="John Doe" time="10:00" ph="1234567890" wa="1234567890" email="shlok845@gmail.com"/>
            </div> */}
        </>
    );
}

export default ShowCompanions;