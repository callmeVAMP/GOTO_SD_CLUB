export default async function updateContact(email: string, ph_no: string, wa_no: string) {
  try{
    await fetch(`http://localhost:5000/userDetails//updateContact`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, ph_no, wa_no }),
    });
    return true;
  }catch(err){
    console.log(err);
    return false;
  }
}