console.log("index's js")

let user_id = null

pageLoad()
async function pageLoad() {
    const token = localStorage.getItem("token");

    if (!token) {
        return window.location.href = "/login";
    }

    user_id = localStorage.getItem("user_id")

    try {
        const userres = await fetch(`http://localhost:7000/api/insta/user/${user_id}`);
        const userdata = await userres.json();

        console.log(userdata);

        document.getElementById("profilePic").src = userdata.user.profilepicture

        const res = await fetch(`http://localhost:7000/api/insta/loadposts`,{
            headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        console.log(data);
        
        const container = document.getElementById("container")

data.forEach(post => {
    container.innerHTML += `
        <div class="post">
            <div class="post-header">
                <img class="post-profile-pic" src="${post.user_id.profilepicture}" alt="Profile Pic">
                <span class="post-username">${post.user_id.username}</span>
            </div>
        
            <div class="post-image">
                <img src="${post.post}" alt="Post Image">
            </div>
        
            <div class="post-description">
                <span class="post-username">${post.user_id.username}</span>
                ${post.description}
            </div>
        
           
        </div>
    `
    // <div class="post-date">${post.date}</div>
})

    } catch (error) {
        console.error("Error loading data:", error);
    }
}


document.getElementById("logout").addEventListener("click", () => {
    if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")
        window.location.href = "/login"
    }
})


checkTokenValidity()
function checkTokenValidity() {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token.split('.')[1]))
    const expiry = payload.exp * 1000
    if (Date.now() > expiry) {
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")
        window.location.href = "/login"
    }
}

function uploadPostSection(){
    document.getElementById("uploadpost").style.display =  document.getElementById("uploadpost").style.display == "block" ? "none" : "block"
}

document.getElementById("profileContainer").addEventListener("click", () => {
    const dropdown = document.getElementById("profileDropdown")
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block"
})


let photo = null

document.getElementById("photo").addEventListener("change",async(e)=>{
    console.log(e.target.files)
    photo = await convertBase64(e.target.files[0])
    document.getElementById("photopreview").innerHTML=`<img height="100%" src="${photo}" alt="image preview">`
})

function convertBase64(file){
    return new Promise((resolve, reject)=>{
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        fileReader.onload=()=>{
            resolve(fileReader.result)
        }

        fileReader.onerror=(error)=>{
            reject(error)
        }
    }) 
}

async function uploadpost(){

    const content = {
        post : photo,
        description : document.getElementById("desc").value
    }


    try {
        const res = await fetch(`http://localhost:7000/api/insta/upload/${user_id}`,{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(content)
        })
        const data =await res.json()
        if(res.status===201){
            window.location.href="http://localhost:7000/"    
            alert("Post successfully uploaded")
        }else{
            console.log(data);
            alert(data.error)
        }
    
    } catch (error) {
        console.log(error)
    }
}