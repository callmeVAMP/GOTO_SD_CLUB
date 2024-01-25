import React from "react";
import "../styles/images.css"
const Images=()=>{
     const image=[
        {
            idx:1,
            src:"https://www.railwayrecruitment.co.in/wp-content/uploads/2017/01/khurdaroad48758.jpg",
            name :"Khurda Road",
            location:" Station Road,Jatni,Khurda,Odisha",
            Know_More:"https://erail.in/info/khurda-road-railway-station-KUR/24047"
        },
        {   idx:2,
            src:"https://th.bing.com/th/id/R.ac6c53365e329d771d38993153b3aeac?rik=hvGC%2f%2fB8lRjWcw&riu=http%3a%2f%2ftimesofindia.indiatimes.com%2fphoto%2fmsid-60516973%2f60516973.jpg%3f190170&ehk=Opn6HE3%2fW6m3SZjJpzMUf8ck8PmcHbrClqSORU0unm0%3d&risl=&pid=ImgRaw&r=0",
            name :"Bhubneshwar Railway Station",
            location:" Master Canteen, Bhubaneswar, Odisha",
            Know_More:"https://www.railyatri.in/stations/bhubaneswar-bbs"
        },
        {   idx:3,
            src:"https://inbhubaneswar.com/wp-content/uploads/2023/04/Nexus-Esplanade-One-Mall-Rasulgarh-Bhubaneswar.jpg",
            name :"Nexus Esplanade",
            location:" Rasulgarh, Bhubaneswar, Odisha",
            Know_More:"https://www.nexusselecttrust.com/nexus-esplanade"
        },
        {
            idx:4,
            src:"https://i.ytimg.com/vi/H-dfwa52SxU/hqdefault.jpg",
            name :"DN regalia",
            location:" South Tamando, DN Square, Patrapada, Bhubaneswar",
            Know_More:"https://dnregalia.com/mall.php"
        },
        {
          idx:5,
          src:"https://akm-img-a-in.tosshub.com/indiatoday/images/story/202005/Bhubaneswar_Airport_0.jpeg?DFNseC4bolf5WYQG7YuaqyA7fUUU3S2G&size=770:433",
          name :"Bhubneshwar Airport",
          location:" Airport Rd, Bhubaneswar, Odisha",
            Know_More:"https://www.bhubaneswarairport.com/arrivals.php"
      },
      {
        idx:6,
        src:"https://img.collegepravesh.com/2016/03/NISER-Bhubaneswar.jpg",
        name :"NISER",
        location:" Jatni, Khordha-Pipili Road, Khordha, Bhubaneswar",
            Know_More:"https://www.niser.ac.in/"
    },
    ];


    return (
      <>
        
          {image.map((data) => (
            <div className="flip-card ">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img  src ={data.src} alt ="img1" className="card-img-top" />
                    <h3>{data.name}</h3>
                </div>    
                  <div class="flip-card-back">
                      <p>Location:{data.location}</p>
                      <p>Know More: <a href={data.Know_More}>Click Here</a></p>
                  </div>
                </div>
              
            </div>
              ))}
         
      </>


   )
 }
;
export default Images;
