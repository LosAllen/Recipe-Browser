document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get("id");
  
    if (!recipeId) return;
  
    // Fetch and display recipe
    fetch(`https://recipe-browser-8fj5.onrender.com/recipes/${recipeId}`)
      .then(res => res.json())
      .then(recipe => {
        const detail = document.getElementById("recipeDetail");
        detail.innerHTML = `
          <h2>${recipe.title}</h2>
          <p><strong>Category:</strong> ${recipe.category || "N/A"}</p>
          <p><strong>Ingredients:</strong> ${recipe.ingredients?.join(", ")}</p>
          <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        `;
      });
  
    // Fetch and display comments
    fetch("https://recipe-browser-8fj5.onrender.com/comments")
      .then(res => res.json())
      .then(comments => {
        const list = document.getElementById("commentsList");
        comments
          .filter(comment => comment.recipeId === recipeId)
          .forEach(comment => {
            const li = document.createElement("li");
            li.textContent = comment.text || "No content";
            list.appendChild(li);
          });
      });
  });