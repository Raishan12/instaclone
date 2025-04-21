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


    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmpassword").value;

    const usernameRegex = /^[a-z0-9._]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,12}$/;

    if (!username || !email || !phone || !password || !confirmPassword) {
        alert("Fill all fields")
        return true
    }

    if (!usernameRegex.test(username)) {
        alert("Username must contain only lowercase letters, numbers, '.', or '_'")
        return true
    }

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.")
        return true
    }

    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid 10-digit Indian phone number (starting with 6-9).")
        return true
    }

    if (!passwordRegex.test(password)) {
        alert("Password must be 8-12 characters long and include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.")
        return true
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.")
        return true
    }

    const content = {
        profilepicture: profilepicture,
        username: username,
        email: email,
        phone: phone,
        password: password
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