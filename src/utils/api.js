const baseURL = '';
const headers = {
    'Content-Type' : 'application/json'
};

let endpoint = `${process.env.BASE_URL}/api/skills`;
export async function skills(){
    let res = await fetch('http://127.0.0.1:3000/api/skills');

    if (!res.ok) {
        // Check for response status other than 200 OK
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

    const data = await res.json();
}


export async function insertSkills(data = []){
    await fetch('http://127.0.0.1:3000/api/skills', { 
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }).then((res) => {
        if(!res.ok){
            throw new Error(`HTTP error! Status : ${res.status}`)
        }
        return res.json();
    }).then((data) => {
        console.log('Response:', data)
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export async function updateSkill(data){

    await fetch('http://127.0.0.1:3000/api/skills', {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    }).then((res) => {

        if(!res.ok){
            throw new Error(`HTTP error! Status : ${res.status}`)
        }
        return res.json();

    }).then((data) => {

        console.log('Response:', data)

    }).catch((err) => {
        console.error(err)
    });

}

export async function deleteSkill(id){
    await fetch('http://127.0.0.1:3000/api/skills', {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify({id: id})
    })
    .then((res) => {

        if(!res.ok){
            throw new Error(`HTTP error! Status : ${res.status}`)
        }

        return res.json();
    })
    .then((data) => {
        console.log("Resonse : ", data)
    })
    .catch((err) => {
        console.error(err)
    });

}   