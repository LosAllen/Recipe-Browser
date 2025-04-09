// This script handles the functionality of the recipe browser application.
document.addEventListener("DOMContentLoaded", () => {
  fetchRecipesAndDisplay();
  checkAuthStatus();
});

function getBaseUrl() {
  const host = window.location.hostname;
  if (host === "localhost") return "http://localhost:8080";
  if (host === "recipe-browser-yk8s.onrender.com") return "https://recipe-browser-yk8s.onrender.com";
  return "https://recipe-browser-8fj5.onrender.com";
}

async function fetchRecipesAndDisplay() {
  const baseUrl = getBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/recipes`);
    const data = await response.json();
    renderRecipeCards(data);
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
  }
}

function renderRecipeCards(data) {
  const recipeGrid = document.getElementById("recipeGrid");
  recipeGrid.innerHTML = '';
  data.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3 class="recipe-title">${recipe.title}</h3>
      <p>${recipe.category || "Uncategorized"}</p>
      <div class="recipe-ingredients" style="display: none;">
        <ul>
          ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </div>
    `;
    card.querySelector(".recipe-title").addEventListener("click", () => {
      const ingDiv = card.querySelector(".recipe-ingredients");
      ingDiv.style.display = ingDiv.style.display === "block" ? "none" : "block";
    });
    const viewBtn = document.createElement("button");
    viewBtn.textContent = "View Recipe";
    viewBtn.onclick = () => window.location.href = `recipe.html?id=${recipe._id}`;
    card.appendChild(viewBtn);
    recipeGrid.appendChild(card);
  });
}

async function handleSearch() {
  const input = document.getElementById("searchInput").value;
  const baseUrl = getBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/recipes/search?query=${encodeURIComponent(input)}`);
    const data = await response.json();
    renderRecipeCards(data);
  } catch (error) {
    console.error("Search failed:", error);
  }
}

async function handleCategoryFilter(category) {
  const baseUrl = getBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/recipes/category/${category}`);
    const data = await response.json();
    renderRecipeCards(data);
  } catch (error) {
    console.error("Category filter failed:", error);
  }
}

async function handleAddRecipe(e) {
  e.preventDefault();
  const title = document.getElementById("newRecipeTitle").value;
  const category = document.getElementById("newRecipeCategory").value;
  const ingredients = document.getElementById("newRecipeIngredients").value.split(",").map(i => i.trim());
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title, category, ingredients })
  });
  alert(response.ok ? "Recipe added!" : "Failed to add recipe.");
  if (response.ok) fetchRecipesAndDisplay();
}

async function handleDeleteRecipe(recipeId) {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/recipes/${recipeId}`, { method: "DELETE" });
  alert(response.ok ? "Recipe deleted!" : "Failed to delete recipe.");
  if (response.ok) fetchRecipesAndDisplay();
}

async function handleEditRecipe(recipeId) {
  const title = document.getElementById("editRecipeTitle").value;
  const category = document.getElementById("editRecipeCategory").value;
  const ingredients = document.getElementById("editRecipeIngredients").value.split(",").map(i => i.trim());
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/recipes/${recipeId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title, category, ingredients })
  });
  alert(response.ok ? "Recipe updated!" : "Failed to update recipe.");
  if (response.ok) fetchRecipesAndDisplay();
}

async function fetchRecipeDetails(recipeId) {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/recipes/${recipeId}`);
  const recipe = await response.json();
  document.getElementById("recipeTitle").innerText = recipe.title;
  document.getElementById("recipeCategory").innerText = recipe.category || "Uncategorized";
  document.getElementById("recipeIngredients").innerHTML = recipe.ingredients.map(i => `<li>${i}</li>`).join('');
  document.getElementById("recipeInstructions").innerText = recipe.instructions || "No instructions provided.";
}

async function handleRecipeSubmission(e) {
  e.preventDefault();
  const title = document.getElementById("recipeTitle").value;
  const category = document.getElementById("recipeCategory").value;
  const ingredients = document.getElementById("recipeIngredients").value.split(",").map(i => i.trim());
  const instructions = document.getElementById("recipeInstructions").value;
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title, category, ingredients, instructions })
  });
  alert(response.ok ? "Submitted successfully!" : "Submission failed.");
  if (response.ok) window.location.href = "index.html";
}

async function handleRecipeUpdate(e) {
  e.preventDefault();
  const title = document.getElementById("editRecipeTitle").value;
  const category = document.getElementById("editRecipeCategory").value;
  const ingredients = document.getElementById("editRecipeIngredients").value.split(",").map(i => i.trim());
  const instructions = document.getElementById("editRecipeInstructions").value;
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/recipes/${recipeId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title, category, ingredients, instructions })
  });
  alert(response.ok ? "Updated successfully!" : "Update failed.");
  if (response.ok) window.location.href = `recipe.html?id=${recipeId}`;
}

async function handleRecipeDeletion(recipeId) {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/recipes/${recipeId}`, { method: "DELETE" });
  alert(response.ok ? "Recipe deleted!" : "Failed to delete recipe.");
  if (response.ok) window.location.href = "index.html";
}

// Event listeners (safe wrappers)
if (document.getElementById("searchButton")) {
  document.getElementById("searchButton").addEventListener("click", handleSearch);
}
if (document.getElementById("searchInput")) {
  document.getElementById("searchInput").addEventListener("keypress", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  });
}
document.querySelectorAll(".category-button").forEach(btn => {
  btn.addEventListener("click", () => handleCategoryFilter(btn.dataset.category));
});
if (document.getElementById("addRecipeForm")) {
  document.getElementById("addRecipeForm").addEventListener("submit", handleAddRecipe);
}
if (document.getElementById("recipeSubmissionForm")) {
  document.getElementById("recipeSubmissionForm").addEventListener("submit", handleRecipeSubmission);
}
if (document.getElementById("recipeUpdateForm")) {
  document.getElementById("recipeUpdateForm").addEventListener("submit", handleRecipeUpdate);
}

const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get("id");
if (recipeId) fetchRecipeDetails(recipeId);

async function checkAuthStatus() {
  const baseUrl = getBaseUrl();
  const authSection = document.getElementById("authSection");
  const params = new URLSearchParams(window.location.search);
  const githubIdFromUrl = params.get("githubId");
  const logoutFlag = params.get("logout");
  if (!authSection) return;

  // Store GitHub ID if passed in URL
  if (githubIdFromUrl) {
    localStorage.setItem("githubId", githubIdFromUrl);
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  if (logoutFlag) {
    localStorage.removeItem("githubId");
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  const storedGithubId = localStorage.getItem("githubId");

  try {
    const res = await fetch(`${baseUrl}/auth/user`, { credentials: "include" });
    if (res.ok) {
      const user = await res.json();
      authSection.innerHTML = `
        <span>👋 Hello, ${user.username}</span>
        <button onclick="window.location.href='${baseUrl}/auth/logout'">Logout of GitHub</button>
      `;
    } else if (storedGithubId) {
      // If session failed but GitHub ID is stored, try matching it
      const usersRes = await fetch(`${baseUrl}/users`);
      if (usersRes.ok) {
        const users = await usersRes.json();
        const matchedUser = users.find(u => u.githubId === storedGithubId);
        if (matchedUser) {
          authSection.innerHTML = `
            <span>👋 Hello, ${matchedUser.username}</span>
            <button onclick="window.location.href='${baseUrl}/auth/logout'">Logout of GitHub</button>
          `;
          return;
        }
      }
      authSection.innerHTML = `
        <button onclick="window.location.href='${baseUrl}/auth/github'">Login with GitHub</button>
      `;
    } else {
      authSection.innerHTML = `
        <button onclick="window.location.href='${baseUrl}/auth/github'">Login with GitHub</button>
      `;
    }
  } catch (err) {
    console.error("Auth check failed:", err);
  }
}

// Call the auth check on page load
checkAuthStatus();