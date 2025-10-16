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

// Function to update avatar with a URL
function updateAvatarURL(url) {
  if (url) {
    showImage();
    avatarImg.src = url;
    console.log("Avatar updated with URL:", url); // For debugging/verification
    // Close avatar controls after update
    avatarControls.classList.add("hidden");
  }
}

// Function to convert file to data URL (base64)
function convertFileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

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
    updateAvatarURL(url);
    avatarURLInput.value = ""; // Clear the input
  }
});

// Handle Enter key press for URL input
avatarURLInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const url = avatarURLInput.value.trim();
    if (url) {
      updateAvatarURL(url);
      avatarURLInput.value = ""; // Clear the input
    }
  }
});

// When user uploads an image - convert to data URL
avatarUpload.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }

      // Convert file to data URL (base64 encoded image URL)
      const dataURL = await convertFileToDataURL(file);
      updateAvatarURL(dataURL);

      avatarUpload.value = ""; // Clear the file input
    } catch (error) {
      console.error("Error converting file to URL:", error);
      alert("Error processing the image file.");
    }
  }
});
