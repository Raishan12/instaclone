

let email;

async function resetpass(e){

    e.preventDefault()

    let password = document.getElementById('password').value

    let confirmpassword = document.getElementById('confirmpassword').value
    //password regular expression
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/

    if (!passwordRegex.test(password))
        return alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.")

    if(password!=confirmpassword)
        return alert("passwords do not match")

    email = localStorage.getItem('email')

    try{ 
        const res = await fetch('/api/insta/resetpass',{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify({email,password})
        })

        const data = await res.json()

        if(res.status===200){
            alert(data.message)
            localStorage.clear()
            window.location.href="/login"
        }else{
            alert(data.message)
        }   
    }catch(err){
        console.log(err)
        alert(data.message)
    }
}
