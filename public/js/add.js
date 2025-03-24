document.getElementById("addRecipeForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
  
    const recipe = {
      title: form.title.value,
      category: form.category.value,
      ingredients: form.ingredients.value.split(",").map(i => i.trim()),
      instructions: form.instructions.value
    };
  
    try {
      const res = await fetch("https://recipe-browser-8fj5.onrender.com/recipes", {
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