console.log("signup's js")
<<<<<<< HEAD
localStorage.removeItem("token");
=======

>>>>>>> f7519cbf6869b7b9bcd2c33781e151a9a4531663
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
<<<<<<< HEAD
    
=======

>>>>>>> f7519cbf6869b7b9bcd2c33781e151a9a4531663
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
<<<<<<< HEAD
    console.log(content)
    console.log(profilepicture)
=======
>>>>>>> f7519cbf6869b7b9bcd2c33781e151a9a4531663

    try {
        const res = await fetch("http://localhost:7000/api/insta/signup",{
            method:"post",
            headers:{"Content-Type":"application/json"},
<<<<<<< HEAD
            body: JSON.stringify(content)
=======
            body:JSON.stringify(content)
>>>>>>> f7519cbf6869b7b9bcd2c33781e151a9a4531663
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