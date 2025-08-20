
const form= document.getElementById("form");
const searchuser = document.getElementById("searchuser");
const main= document.getElementById("main");
const otherrepos= document.getElementById("repos");

form.addEventListener("submit", function(e) {
e.preventDefault()

  fetch(`https://api.github.com/users/${searchuser.value}`)
   .then((response) => response.json())
   .then(function(result){
    
    
   main.innerHTML =`
      <div>
      <p class="username">Overview for ${result.login}<p>
       <div class="detail">
        <img class="profile" src="${result.avatar_url}" alt="">
        <div>
          <h3 class="saqib">${result.name}</h3>
          <div class="line">
          <img class="pic" src="https://cdn-icons-png.flaticon.com/128/2838/2838912.png" alt="">
          <p>${result.location}</p>
          </div>
          <div class="line">
          <img class="pic" src="https://cdn-icons-png.flaticon.com/128/659/659999.png" alt="">
          <p>${result.blog}</p>
          </div>
        </div>
       </div>
        <div class="follower">
        <div>
        <p>FOLLOWERS</p>
        <p class="user">${result.followers}</p>
        </div>
        <div>
         <p>FOLLOWING</p>
        <p class="user">${result.following}</p>
        </div>
        <div>
         <p>PUBLIC RAPOS</p>
        <p class="user">${result.public_repos}</p>
        </div>
        <div>
         <p>PUBLIC GISTS</p>
        <p class="user">${result.public_gists}</p>
        </div>
        </div>

        <h2 class="username2">Repositories</h2>
        <div>
        </div>
    </div>
      `;
      
      
       fetch(`https://api.github.com/users/${searchuser.value}/repos`)
   .then((response) => response.json())
   .then((repos)=>{
   otherrepos.innerHTML=`
   <div class="userrepos">
    <div class="start">
    <div class="api">
    <img class="heee" src="https://cdn-icons-png.flaticon.com/128/15413/15413892.png" alt="github" >
    <p>${repos[0].name}</p>
    </div>
    <p>${repos[0].description}</p>
    <p>${repos[0].language}</p>
   </div>
    <div class="start">
    <div class="api">
    <img class="heee" src="https://cdn-icons-png.flaticon.com/128/15413/15413892.png" alt="github" >
    <p>${repos[1].name}</p>
    </div>
    <p>${repos[1].description}</p>
    <p>${repos[1].language}</p>
   </div>
   <div class="start">
   <div class="api">
   <img class="heee" src="https://cdn-icons-png.flaticon.com/128/15413/15413892.png" alt="github" >
    <p>${repos[2].name}</p>
    </div>
    <p>${repos[2].description}</p>
    <p>${repos[2].language}</p>
   </div>
   </div>
   `;

   })
   
 }); 
}); 