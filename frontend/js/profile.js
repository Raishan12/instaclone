console.log("Profile page loaded");
loadProfilePage()
async function loadProfilePage() {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    if (!user_id || !token) {
        window.location.href = "/login";
        return;
    }

    try {
        const userRes = await fetch(`http://localhost:7000/api/insta/user/${user_id}`)
        const userData = await userRes.json();
        console.log(userData);

        if (userRes.ok) {
            const user = userData.user;

            document.getElementById("username").textContent = user.username;
            document.getElementById("profilePicture").src = user.profilepicture;    
            document.getElementById("bioDesc").textContent = `Hey there! This is ${user.username}'s profile.`;

        } else {
            alert("User not found");
        }

        const postRes = await fetch(`http://localhost:7000/api/insta/loaduserposts/${user_id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const postData = await postRes.json();
        console.log(postData)

        if (postRes.ok) {
            const postsGrid = document.getElementById("postsGrid");
            document.getElementById("postCount").textContent = postData.length;

            postData.forEach(post => {
                const postDiv = document.createElement("div");
                postDiv.classList.add("post");
                postDiv.innerHTML = `<img src="${post.post}" alt="Post Image" onclick="clickImage(this)">`;
                postsGrid.appendChild(postDiv);
            });
        } else {
            console.error("Error loading posts:", postData);
        }

    } catch (error) {
        console.error("Server Error", error);
    }
}

let profilePic = ""
async function editprofile() {
    const modal = document.getElementById("editProfileModal");
    modal.style.display = "flex";

    const user_id = localStorage.getItem("user_id");

    try {
        const res = await fetch(`http://localhost:7000/api/insta/user/${user_id}`);
        const data = await res.json();

        if (res.ok) {
            const user = data.user;

            document.getElementById("editUsername").value = user.username;
            document.getElementById("editEmail").value = user.email;
            document.getElementById("editPhone").value = user.phone;

            profilePic = user.profilepicture;
            const preview = document.getElementById("editProfilePicPreview");
            preview.innerHTML = '';

            const img = document.createElement("img");
            img.src = profilePic;
            preview.appendChild(img);
        } else {
            alert("Failed to load user info.");
        }
    } catch (error) {
        console.log("Error loading profile:", error);
    }
}


function closeEditProfile() {
    document.getElementById("editProfileModal").style.display = "none";
}

let profilepicture = ""

document.getElementById("editProfilePic").addEventListener("change", async (e) => {
    console.log(e.target.files)
    profilepicture = await convertBase64(e.target.files[0])
    profilePic = profilepicture
    document.getElementById("editProfilePicPreview").innerHTML = `<img height="100%" src="${profilepicture}" alt="image preview">`
})

function convertBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}


async function submitEditProfile(e) {
    e.preventDefault();

    const user_id = localStorage.getItem("user_id");

    const usernameRegex = /^[a-z0-9._]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    const username = document.getElementById("editUsername").value.trim();
    const email = document.getElementById("editEmail").value.trim();
    const phone = document.getElementById("editPhone").value.trim();

    if (!username || !email || !phone ) {
        alert("Fill all fields")
        return true
    }

    if (!usernameRegex.test(username)) {
        alert("Username must contain only lowercase letters, numbers, '.', or '_'")
        return true
    }

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address")
        return true
    }

    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid phone number")
        return true
    }


    const content = {
        profilepicture: profilePic,
        username: username,
        email: email,
        phone: phone
    }


    try {
        const res = await fetch(`http://localhost:7000/api/insta/update/${user_id}`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(content)
        });

        const data = await res.json();
        if (res.ok) {
            alert("Profile updated successfully!");
            closeEditProfile();
            window.location.href="/profile"
        } else {
            alert(data.message || "Update failed");
        }
    } catch (error) {
        console.log("Update error:", error);
    }
}

let div = document.getElementById("bigimage")
function clickImage(e) {
    div.style.display = "block"
    div.innerHTML = `<div class="imagebackground"><span class="close" onclick="closeimage()">x</span><img src="${e.src}" alt="Post Image"></div>`

}

function closeimage() {
    div.style.display = "none"
}

async function deleteprofile(){
    const user_id = localStorage.getItem("user_id");

    try {

        const confirmmsg = confirm("Are you sure you want to Delete your Profile?");
        if (!confirmmsg){
            return true
        }


        const res = await fetch(`http://localhost:7000/api/insta/delete/${user_id}`)
        const data = await res.json()

        if(res.status===200){
            alert("Account Deleted")
            localStorage.clear()
            window.location.href="/"
        }


    } catch (error) {
        console.log(error)
    }
}