console.log("this is forgot js");

async function forgot(e) {
    e.preventDefault()
    try {
        let email = document.getElementById('email').value
        console.log(email)
        const res = await fetch("/api/insta/generateotp", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({email})
        })

        const data = await res.json()

        console.log(data)

        if (res.status === 200) {

            alert(data.message)

            localStorage.setItem('email', email)

            window.location.href = "/verifyotp"
        }

        else {  
            alert(data.message)
        }
    }

    catch (error) {
        console.log(error.message)
        alert(error.message)
    }
}
