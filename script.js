document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const openComposer = document.getElementById("openComposer");
  const submitTweet = document.getElementById("submitTweet");
  const tweetText = document.getElementById("tweetText");
  const feed = document.getElementById("feed");
  const composeModal = document.getElementById("composeModal");
  const closeModal = document.getElementById("closeModal");
  const modalTweetText = document.getElementById("modalTweetText");
  const submitModalTweet = document.getElementById("submitModalTweet");
  const exploreView = document.getElementById("exploreView");
  const exploreLink = document.querySelector('[data-view="explore"]');
  const homeLink = document.querySelector('[data-view="home"]');

  if (!themeToggle || !feed) return;

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

  // Enable/disable post button based on input
  if (tweetText) {
    const updateButton = () => {
      submitTweet.disabled = !tweetText.value.trim();
    };
    tweetText.addEventListener("input", updateButton);
    updateButton();
  }

  // Keyboard shortcut: Ctrl/Cmd + Enter to post
  if (tweetText) {
    tweetText.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handlePost();
      }
    });
  }

  function createTweet(text) {
    const value = text.trim();
    if (!value) return;

    const article = document.createElement("article");
    article.className = "post-card";
    article.innerHTML = `
      <div class="post-header">
        <img class="avatar alt" src="Blessing Marakalla.png" alt="Blessing Marakalla" />
        <div>
          <strong>Blessing Marakalla</strong>
          <p>@blessingm · just now</p>
        </div>
        <button class="delete-btn" type="button" aria-label="Delete post">🗑️</button>
      </div>
      <p>${value}</p>
      <div class="post-stats">💬 0 • 🔁 0 • ❤️ 0</div>
    `;

    feed.prepend(article);
  }

  function closeComposeModal() {
    composeModal?.classList.add("hidden");
    composeModal?.setAttribute("aria-hidden", "true");
  }

  function openComposeModal() {
    composeModal?.classList.remove("hidden");
    composeModal?.setAttribute("aria-hidden", "false");
    modalTweetText?.focus();
  }

  function handlePost() {
    const text = tweetText?.value || "";
    createTweet(text);
    if (tweetText) tweetText.value = "";
  }

  function handleModalPost() {
    const text = modalTweetText?.value || "";
    createTweet(text);
    if (modalTweetText) modalTweetText.value = "";
    closeComposeModal();
  }

  function showView(view) {
    const isExplore = view === "explore";
    feed.classList.toggle("hidden", isExplore);
    exploreView?.classList.toggle("hidden", !isExplore);
    homeLink?.classList.toggle("active", view === "home");
    exploreLink?.classList.toggle("active", view === "explore");
  }

  if (submitTweet) {
    submitTweet.addEventListener("click", handlePost);
  }

  if (submitModalTweet) {
    submitModalTweet.addEventListener("click", handleModalPost);
  }

  if (openComposer) {
    openComposer.addEventListener("click", openComposeModal);
  }

  if (closeModal) {
    closeModal.addEventListener("click", closeComposeModal);
  }

  if (composeModal) {
    composeModal.addEventListener("click", (e) => {
      if (e.target === composeModal) closeComposeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      composeModal &&
      !composeModal.classList.contains("hidden")
    ) {
      closeComposeModal();
    }
  });

  homeLink?.addEventListener("click", (e) => {
    e.preventDefault();
    showView("home");
  });

  exploreLink?.addEventListener("click", (e) => {
    e.preventDefault();
    showView("explore");
  });

  showView("home");

  // Event delegation for post actions (delete)
  feed.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-btn");
    if (!btn) return;
    const article = btn.closest("article.post-card");
    if (!article) return;
    if (!confirm("Delete this post?")) return;
    article.remove();
  });
});
