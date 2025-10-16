// Update current time in milliseconds
const timeEl = document.getElementById("user-time");
function updateTime() {
  timeEl.textContent = Date.now();
}
updateTime();
setInterval(updateTime, 1000);

// Avatar logic
const avatarImg = document.getElementById("user-avatar");
const avatarURLInput = document.getElementById("avatar-url");
const avatarUpload = document.getElementById("avatar-upload");
const avatarControls = document.getElementById("avatar-controls");
const editBtn = document.getElementById("edit-avatar-btn");

// Toggle visibility of upload/url inputs
editBtn.addEventListener("click", () => {
  avatarControls.classList.toggle("hidden");
});

// When user pastes a URL
avatarURLInput.addEventListener("change", () => {
  const url = avatarURLInput.value.trim();
  if (url) avatarImg.src = url;
});

// When user uploads an image
avatarUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);
    avatarImg.src = imageURL;
  }
});
