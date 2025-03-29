document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get("id");

  if (!recipeId) return;

  const baseUrl = window.location.hostname === "localhost" ? "http://localhost:8080" : "https://recipe-browser-yk8s.onrender.com";

  // Fetch and display recipe
  fetch(`${baseUrl}/recipes/${recipeId}`)
    .then(res => res.json())
    .then(recipe => {
      const detail = document.getElementById("recipeDetails");
      detail.innerHTML = `
        <div class="recipe-card">
          <h1>${recipe.title}</h1>
          <p><strong>Category:</strong> ${recipe.category || "N/A"}</p>
          <h3>Ingredients</h3>
          <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
          <h3>Instructions</h3>
          <p>${recipe.instructions || "No instructions provided."}</p>
        </div>
      `;
    })
    .catch(err => console.error('Error fetching recipe details:', err));

  // Fetch and display comments
  fetch(`${baseUrl}/comments`)
    .then(res => res.json())
    .then(comments => {
      const list = document.getElementById("commentsList");
      list.innerHTML = '';
      comments
        .filter(comment => comment.recipeId === recipeId)
        .forEach(comment => {
          const li = document.createElement("li");
          li.textContent = comment.text || "No content";
          list.appendChild(li);
        });
    })
    .catch(err => console.error('Error fetching comments:', err));

  // Add new comment
  const commentForm = document.getElementById("commentForm");
  commentForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const newComment = document.getElementById("newComment").value;
    if (!newComment) return alert("Please enter a comment.");

    const response = await fetch(`${baseUrl}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newComment, recipeId })
    });

    if (response.ok) {
      alert("Comment added successfully!");
      document.getElementById("newComment").value = "";
      location.reload();
    } else {
      alert("Failed to add comment.");
    }
  });
});
