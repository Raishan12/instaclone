console.log("index's js")

<<<<<<< HEAD
loadData()
async function loadData() {
    const token = localStorage.getItem("token");

    if (!token) {
        return window.location.href = "/login";
    }

    // Fetch user data
    try {
        const res = await fetch("http://localhost:7000/api/insta/loaddata", {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const user = await res.json();

        if (user && user.profilepicture) {
            document.getElementById("profilePic").src = user.profilepicture;
        }

        // Load posts
        const postsRes = await fetch("http://localhost:7000/api/insta/posts");
        const posts = await postsRes.json();
        renderPosts(posts);

    } catch (error) {
        console.error("Error loading data:", error);
    }
}

function renderPosts(posts) {
    const container = document.querySelector(".container");
    container.innerHTML = ""; // clear previous content

    posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `
            <div class="post-image">
                <img src="${post.post}" alt="Post image">
            </div>
            <div class="post-description">
                ${post.description}
            </div>
            <div class="post-date">
                ${new Date(post.date).toLocaleString()}
            </div>
        `;
        container.appendChild(div);
    });
}


document.getElementById("logout").addEventListener("click", () => {
    if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem("token")
        window.location.href = "/login"
    }
})


checkTokenValidity()
function checkTokenValidity() {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token.split('.')[1]))
    const expiry = payload.exp * 1000
    if (Date.now() > expiry) {
        window.location.href = "/login"
    }
}

function uploadPost(){
    document.getElementById("uploadpost").style.display = "block" ? "none" : "block"
}
=======
async function loadData(){
    const res = await fetch("http://localhost:5000/api/insta/loaddata", {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    })
    const data = await res.json()
    console.log(data);

    
}
loadData()
>>>>>>> f7519cbf6869b7b9bcd2c33781e151a9a4531663
