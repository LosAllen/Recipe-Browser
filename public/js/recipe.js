document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get("id");

  if (!recipeId) return;

  const baseUrl = (window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : window.location.hostname === "recipe-browser-yk8s.onrender.com"
      ? "https://recipe-browser-yk8s.onrender.com"
      : "https://recipe-browser-8fj5.onrender.com");  

  // Fetch and display comments
  fetch(`${baseUrl}/comments/recipe/${recipeId}`, {
  })
    .then(res => res.json())
    .then(comments => {
      const list = document.getElementById("commentsList");
      list.innerHTML = '';
      comments.forEach(comment => {
        const li = document.createElement("li");
        li.textContent = comment.text || "No content";
        list.appendChild(li);
      });
    })
  .catch(err => console.error('Error fetching comments:', err));

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
      credentials: "include",
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
