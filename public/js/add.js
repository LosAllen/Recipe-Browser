document.getElementById("addRecipeForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
  }

  const userId = getCookie("userId");

  const recipe = {
    title: form.title.value,
    category: form.category.value,
    ingredients: form.ingredients.value.split(",").map(i => i.trim()),
    instructions: form.instructions.value,
    createdBy: userId
  };

  const baseUrl = window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : window.location.hostname === "recipe-browser-yk8s.onrender.com"
      ? "https://recipe-browser-yk8s.onrender.com"
      : "https://recipe-browser-8fj5.onrender.com";

  try {
    const res = await fetch(`${baseUrl}/recipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe)
    });

    if (res.ok) {
      alert("Recipe added!");
      window.location.href = "index.html";
    } else {
      const err = await res.json();
      alert("Error: " + err.error);
    }
  } catch (err) {
    console.error("Failed to submit recipe:", err);
    alert("Error submitting recipe");
  }
});
