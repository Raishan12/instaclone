



async function verifyotp(e) {
    e.preventDefault()
    let email = localStorage.getItem('email')
    let otp = document.getElementById('otp').value

    try{   
        const res = await fetch('/api/insta/verifyotp',{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify({email,otp})
        })
        
        const data = await res.json()
        
        if(res.status===200){
            alert(data.message)
            window.location.href="/resetpassword"
        }else{
            alert(data.message)
        }

    }catch(err){
        console.log(err)
        alert(err)
    }   
}