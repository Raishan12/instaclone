console.log("signup's js")
localStorage.removeItem("token");
let profilepicture=""
document.getElementById("profilepicture").addEventListener("change",async(e)=>{
    console.log(e.target.files)
    profilepicture = await convertBase64(e.target.files[0])
    document.getElementById("profilepicturepreview").innerHTML=`<img height="100%" src="${profilepicture}" alt="image preview">`
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

async function signup(event){
    event.preventDefault()
    
    const pass = document.getElementById("password").value
    const cpass = document.getElementById("confirmpassword").value

    if(pass!==cpass){
        return alert("Password Missmatch")
    }

    const content = {
        profilepicture: profilepicture,
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        password: document.getElementById("password").value
    }
    console.log(content)
    console.log(profilepicture)

    try {
        const res = await fetch("http://localhost:7000/api/insta/signup",{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(content)
        })
        const data =await res.json()
        if(res.status===201){
            window.location.href="http://localhost:7000/"    
            alert("Successfully Submitted")
        }else{
            console.log(data);
            alert(data.error)
        }
    
    } catch (error) {
        console.log(error)
    }
    

}