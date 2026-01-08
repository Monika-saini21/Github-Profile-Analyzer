const input = document.getElementById("usernameInput");
const statusText = document.getElementById("status");
const profile = document.getElementById("profile");
const reposContainer = document.getElementById("repos");
const repoHeading = document.querySelector(".repo-heading");

let timer;

function debounce(fn, delay) {
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

async function searchUser(username) {
  if (!username) {
    statusText.textContent = "";
    profile.classList.add("hidden");
    reposContainer.innerHTML = "";
    repoHeading.classList.add("hidden");
    return;
  }

  statusText.textContent = "Loading...";
  profile.classList.add("hidden");
  reposContainer.innerHTML = "";
  repoHeading.classList.add("hidden");

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);

    if (userRes.status === 404) {
      throw new Error("User not found"); 
    }

    if (!userRes.ok) {
      throw new Error("API error"); 
    }

    const user = await userRes.json();

    const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = repoRes.ok ? await repoRes.json() : [];

    statusText.textContent = "";

    profile.innerHTML = `
      <h1 class="overview">Overview for <span>${user.name || user.login}</span></h1>
      <div class="profile-top">
        <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
        <div class="profile-info">
          <h3>${user.name || user.login}</h3>
          ${user.location ? `
            <p class="info-line">
              <img class="icon" src="https://cdn-icons-png.flaticon.com/128/2838/2838912.png" alt="location">
              ${user.location}
            </p>
          ` : ""}
          ${user.blog ? `
            <p class="info-line">
              <img class="icon" src="https://cdn-icons-png.flaticon.com/128/2985/2985013.png" alt="blog">
              <a href="${user.blog}" target="_blank">${user.blog}</a>
            </p>
          ` : ""}
        </div>
      </div>
      <div class="stats">
        <div>Followers<span>${user.followers}</span></div>
        <div>Following<span>${user.following}</span></div>
        <div>Public Repos<span>${user.public_repos}</span></div>
        <div>Public Gists<span>${user.public_gists}</span></div>
      </div>
    `;
    profile.classList.remove("hidden");

    reposContainer.innerHTML = "";
    repos.slice(0, 6).forEach(repo => {
      reposContainer.innerHTML += `
        <div class="repo">
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          <p>${repo.language || "No language specified"}</p>
        </div>
      `;
    });

    if (repos.length > 0) repoHeading.classList.remove("hidden");

  } catch (error) {
    profile.classList.add("hidden");
    reposContainer.innerHTML = "";
    repoHeading.classList.add("hidden");

    if (error.message === "User not found") {
      statusText.textContent = "❌ User not found"; 
    } else {
      statusText.textContent = "⚠️ Network error. Please try again.";
    }
  }
}

const debouncedSearch = debounce(() => {
  searchUser(input.value.trim());
}, 500);

input.addEventListener("input", debouncedSearch);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchUser(input.value.trim());
  }
});
