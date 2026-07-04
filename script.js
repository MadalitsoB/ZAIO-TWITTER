document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const composerModal = document.getElementById("composerModal");
  const openComposer = document.getElementById("openComposer");
  const closeModal = document.getElementById("closeModal");
  const submitTweet = document.getElementById("submitTweet");
  const submitModalTweet = document.getElementById("submitModalTweet");
  const tweetText = document.getElementById("tweetText");
  const modalText = document.getElementById("modalText");
  const feed = document.getElementById("feed");

  if (!themeToggle || !composerModal || !openComposer || !submitTweet || !feed)
    return;

  const savedTheme = localStorage.getItem("twitter-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("twitter-theme", isDark ? "dark" : "light");
  });

  function createTweet(text) {
    if (!text.trim()) return;

    const article = document.createElement("article");
    article.className = "post-card";
    article.innerHTML = `
      <div class="post-header">
        <img class="avatar alt" src="Blessing Marakalla.png" alt="Blessing Marakalla" />
        <div>
          <strong>Blessing Marakalla</strong>
          <p>@blessingm · just now</p>
        </div>
      </div>
      <p>${text}</p>
      <div class="post-stats">💬 0 • 🔁 0 • ❤️ 0</div>
    `;

    feed.prepend(article);
  }

  function handlePost() {
    const text = tweetText?.value || modalText?.value || "";
    createTweet(text);
    if (tweetText) tweetText.value = "";
    if (modalText) modalText.value = "";
    composerModal.hidden = true;
  }

  submitTweet.addEventListener("click", handlePost);
  if (submitModalTweet) submitModalTweet.addEventListener("click", handlePost);
  openComposer.addEventListener("click", () => {
    composerModal.hidden = false;
    modalText?.focus();
  });
  if (closeModal)
    closeModal.addEventListener("click", () => {
      composerModal.hidden = true;
    });
  composerModal.addEventListener("click", (event) => {
    if (event.target === composerModal) {
      composerModal.hidden = true;
    }
  });
});
