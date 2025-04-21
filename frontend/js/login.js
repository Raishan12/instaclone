console.log("this is login");
localStorage.removeItem("token");
async function signin(event){
    event.preventDefault()
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value    

    try {
        const res = await fetch("http://localhost:7000/api/insta/login",{
            method: "post",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ email, password })
        })
        console.log(res);
        const data = await res.json()
        console.log(data);

        if(res.status===200){
            localStorage.setItem("token",data.token)
            localStorage.setItem("user_id",data.user_id)
            alert(data.message)
            window.location.href = "/"
        }else{
            alert(data.message)
        }

    } catch (error) {
        console.log(error);
    }
}
