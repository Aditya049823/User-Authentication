window.addEventListener("load",()=>{
    document.getElementById("userDetails").style.display="none";
})

function generateAccessToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
}

function signUp(event){
    event.preventDefault();
    const userName=document.getElementById("userName").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const confirmPass=document.getElementById("confirmPassword").value;

    if(userName==="" || email==="" ||password==="" || confirmPass==="")
    {
        alert("All the Fields are Mandatory!!");
    }
    else if(password!=confirmPass)
    {
        alert("Password do not match");
        return;
    }
    else
    {
        const user = {
            userName: userName,
            email: email,
            password: password,
        };
        
        const accessToken = generateAccessToken();
        user.accessToken = accessToken;

        // Save user state in Local Storage
        localStorage.setItem('user', JSON.stringify(user));

        document.getElementById("signUp").style.display = "none";
        document.getElementById("userDetails").style.display = "block";
    }
}

const getUser=localStorage.getItem("user");
if(getUser){
    const user=JSON.parse(getUser);
    const divElement=document.getElementById("userDetails");
    divElement.innerHTML=`
    <h1>Profile</h1>
        <p>Full Name: ${user.userName}</p>
        <p>Email: ${user.email}</p>
        <p>Password: ${user.password}</p>
        <button id="btn2" onclick="isClicked()">LogOut</button>
    `;
}

function isClicked(){
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        localStorage.removeItem(key);
    }
    document.getElementById("signUp").style.display = "block";
    document.getElementById("userDetails").style.display = "none";
}


