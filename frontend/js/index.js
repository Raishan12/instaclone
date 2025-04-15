console.log("index's js")

console.log("this is signup.js");


async function signup(event){
    event.preventDefault()

    const pass = document.getElementById("password").value
    const cpass = document.getElementById("confirmpassword").value

    if(pass!==cpass){
        return alert("Password Missmatch")
    }

    const content = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        password: document.getElementById("password").value
    }

    try {
        const res = await fetch("http://localhost:7000/api/sign/adduser",{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(content)
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