export default async function updateTrip(tripId: string, date: string, time: string, destination: string, name: string){
    try{
        let serverURL = process.env.REACT_APP_SERVER_URL;
        await fetch(serverURL+`/travelDetails/${tripId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                date: date,
                time: time,
                destination: destination
            })
        });
    }catch(err){
        window.alert("Error updating trip");
        console.log(err);
    }
}