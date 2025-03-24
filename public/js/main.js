document.addEventListener("DOMContentLoaded", () => {
    fetch("https://recipe-browser-8fj5.onrender.com/recipes")
      .then(res => res.json())
      .then(data => {
        const grid = document.getElementById("recipeGrid");
        data.forEach(recipe => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>${recipe.category || "Uncategorized"}</p>
          `;
          card.onclick = () => {
            window.location.href = `recipe.html?id=${recipe._id}`;
          };
          grid.appendChild(card);
        });
      })
      .catch(err => console.error("Failed to fetch recipes:", err));
  });  