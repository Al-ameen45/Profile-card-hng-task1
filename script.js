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
const altTextFallback = document.querySelector(".alt-text-fallback");

// Function to show image and hide fallback
function showImage() {
  avatarImg.style.display = "block";
  if (altTextFallback) {
    altTextFallback.style.display = "none";
  }
}

// Function to hide image and show fallback
function showFallback() {
  avatarImg.style.display = "none";
  if (altTextFallback) {
    altTextFallback.style.display = "flex";
  }
}

// Add event listeners for image load/error
avatarImg.addEventListener("load", showImage);
avatarImg.addEventListener("error", showFallback);

// Toggle visibility of upload/url inputs
editBtn.addEventListener("click", () => {
  avatarControls.classList.toggle("hidden");
});

// When user pastes a URL
avatarURLInput.addEventListener("change", () => {
  const url = avatarURLInput.value.trim();
  if (url) {
    showImage(); // Ensure image is visible
    avatarImg.src = url;
    // Close avatar controls after URL is applied
    avatarControls.classList.add("hidden");
    avatarURLInput.value = ""; // Clear the input
  }
});

// Handle Enter key press for URL input
avatarURLInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const url = avatarURLInput.value.trim();
    if (url) {
      showImage(); // Ensure image is visible
      avatarImg.src = url;
      // Close avatar controls after URL is applied
      avatarControls.classList.add("hidden");
      avatarURLInput.value = ""; // Clear the input
    }
  }
});

// When user uploads an image
avatarUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    showImage(); // Ensure image is visible
    const imageURL = URL.createObjectURL(file);
    avatarImg.src = imageURL;
    // Close avatar controls after file is uploaded
    avatarControls.classList.add("hidden");
    avatarUpload.value = ""; // Clear the file input
  }
});
