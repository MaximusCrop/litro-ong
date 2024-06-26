export async function getSponsors(limit: number, page: number): Promise<any> {
    try{
      const validLimit = limit;
      const validPage = page;
      
      const url = new URL('https://litro-ong.onrender.com/sponsor');
      url.searchParams.append('limit', validLimit.toString());
      url.searchParams.append('page', validPage.toString());
      const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const data = await response.json();

    console.log(data);
    return data;}
    catch{
      console.log("Error al crear el sponsor")
    }
  } 
