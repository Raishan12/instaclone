console.log("index's js");

let user_id = null;

pageLoad()

async function pageLoad() {
    const token = localStorage.getItem("token");

    if (!token) {
        return (window.location.href = "/login");
    }

    user_id = localStorage.getItem("user_id");

    try {
        const userres = await fetch(`http://localhost:7000/api/insta/user/${user_id}`);
        const userdata = await userres.json();

        document.getElementById("profilePic").src = userdata.user.profilepicture;

        const res = await fetch(`http://localhost:7000/api/insta/loadposts`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        const container = document.getElementById("container");

        data.forEach(post => {
            container.innerHTML +=
                `
                    <div class="post">
                        <div class="post-header">
                            <img class="post-profile-pic" src="${post.user_id.profilepicture}" alt="Profile Pic">
                            <span class="post-username">${post.user_id.username}</span>
                        </div>

                        <div class="post-image">
                            <div class="swiper mySwiper">
                                <div class="swiper-wrapper">
                                    ${post.post.map(img => `
                                        <div class="swiper-slide">
                                            <img src="${img}" alt="Post Image" />
                                        </div>
                                    `).join('')}
                                </div>
                                <!-- Add Pagination -->
                                <div class="swiper-pagination"></div>
                                <!-- Add Navigation -->
                                <div class="swiper-button-next"></div>
                                <div class="swiper-button-prev"></div>
                            </div>
                        </div>
                        
                        <div class="post-like-comment">
                            <div>
                                <div onclick="like(this)" ><img src="/images/forInsta/nolike.png" ></div>
                                <div class="likecount" id="likecount" ></div>
                            </div>
                            <div><img src="/images/forInsta/comment.png" ></div>
                            <div><img src="/images/forInsta/shareicon.png" ></div>
                        </div>

                        <div class="post-description">
                            <span class="post-username">${post.user_id.username}</span>
                            ${post.description}
                        </div>
                    </div>
                `

            // <div class="post-date">${post.date}</div>
        })

        new Swiper(".mySwiper", {
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
        

    } catch (error) {
        console.log("Error loading data:", error);
    }
}

function like(e) {
    console.log("this like")
    e.innerHTML == `<img src="/images/forInsta/nolike.png" >` ? e.innerHTML = `<img src="/images/forInsta/like.png" >` : e.innerHTML = `<img src="/images/forInsta/nolike.png" >`
}


document.getElementById("logout").addEventListener("click", () => {
    if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        window.location.href = "/login";
    }
});

function checkTokenValidity() {
    const token = localStorage.getItem("token");
    if (!token) return;
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000;
    if (Date.now() > expiry) {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        window.location.href = "/login";
    }
}

function uploadPostSection() {
    const uploadPost = document.getElementById("uploadpost");
    uploadPost.style.display = uploadPost.style.display === "block" ? "none" : "block";
}

document.getElementById("profileContainer").addEventListener("click", () => {
    const dropdown = document.getElementById("profileDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

let allimages = [];

document.getElementById("photo").addEventListener("change", async (e) => {
    allimages = [];
    let str = "";
    for (let file of e.target.files) {
        let res = await convertBase64(file);
        allimages.push(res);
        str += `<img height="100%" src="${res}" alt="image preview">`;
    }
    document.getElementById("photopreview").innerHTML = str;
});

function convertBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = (error) => reject(error);
    });
}

async function uploadpost(e) {
    e.preventDefault()
    const content = {
        post: allimages,
        description: document.getElementById("desc").value,
    };
    console.log("upload functions")
    try {
        const res = await fetch(`http://localhost:7000/api/insta/upload/${user_id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(content),
        });
        const data = await res.json();
        if (res.status === 201) {
            window.location.href = "http://localhost:7000/";
            alert("Post successfully uploaded");
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.log(error);
        alert("Error uploading post");
    }
}