console.log("index's js")

async function loadData(){
    const res = await fetch("http://localhost:5000/api/insta/loaddata", {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    })
    const data = await res.json()
    console.log(data);

    
}
loadData()