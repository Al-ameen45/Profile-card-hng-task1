const timeEl = document.getElementById("user-time");
if (timeEl) {
  function updateTime() {
    timeEl.textContent = Date.now();
  }
  updateTime();
  setInterval(updateTime, 1000);
}

const avatarImg = document.getElementById("user-avatar");
const avatarURLInput = document.getElementById("avatar-url");
const avatarUpload = document.getElementById("avatar-upload");
const avatarControls = document.getElementById("avatar-controls");
const editBtn = document.getElementById("edit-avatar-btn");
const altTextFallback = document.querySelector(".alt-text-fallback");

if (avatarImg && avatarURLInput && avatarUpload && avatarControls && editBtn) {
  function updateAvatarURL(url) {
    if (url) {
      showImage();
      avatarImg.src = url;
      console.log("Avatar updated with URL:", url);

      avatarControls.classList.add("hidden");
    }
  }

  function convertFileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function showImage() {
    avatarImg.style.display = "block";
    if (altTextFallback) {
      altTextFallback.style.display = "none";
    }
  }

  function showFallback() {
    avatarImg.style.display = "none";
    if (altTextFallback) {
      altTextFallback.style.display = "flex";
    }
  }

  avatarImg.addEventListener("load", showImage);
  avatarImg.addEventListener("error", showFallback);

  editBtn.addEventListener("click", () => {
    avatarControls.classList.toggle("hidden");
  });

  avatarURLInput.addEventListener("change", () => {
    const url = avatarURLInput.value.trim();
    if (url) {
      updateAvatarURL(url);
      avatarURLInput.value = "";
    }
  });

  avatarURLInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const url = avatarURLInput.value.trim();
      if (url) {
        updateAvatarURL(url);
        avatarURLInput.value = "";
      }
    }
  });

  avatarUpload.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        if (!file.type.startsWith("image/")) {
          alert("Please select a valid image file.");
          return;
        }

        const dataURL = await convertFileToDataURL(file);
        updateAvatarURL(dataURL);

        avatarUpload.value = "";
      } catch (error) {
        console.error("Error converting file to URL:", error);
        alert("Error processing the image file.");
      }
    }
  });
}

// CONTACT FORM VALIDATION
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    console.log("Contact form found, setting up validation...");

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Form submitted, starting validation...");

      const name = document.getElementById("test-contact-name");
      const email = document.getElementById("test-contact-email");
      const subject = document.getElementById("test-contact-subject");
      const message = document.getElementById("test-contact-message");
      const successMsg = document.getElementById("test-contact-success");

      if (!name || !email || !subject || !message) {
        console.error("One or more form elements not found!");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let valid = true;

      document.querySelectorAll(".error-message").forEach((el) => {
        el.textContent = "";
        el.style.display = "block";
      });
      successMsg.textContent = "";

      if (!name.value.trim()) {
        const nameError = document.getElementById("test-contact-error-name");
        if (nameError) {
          nameError.textContent = "Full name is required.";
          console.log("Name validation failed");
        }
        valid = false;
      }

      if (!email.value.trim()) {
        const emailError = document.getElementById("test-contact-error-email");
        if (emailError) {
          emailError.textContent = "Email is required.";
          console.log("Email validation failed - empty");
        }
        valid = false;
      } else if (!emailRegex.test(email.value)) {
        const emailError = document.getElementById("test-contact-error-email");
        if (emailError) {
          emailError.textContent = "Enter a valid email (name@example.com).";
          console.log("Email validation failed - invalid format");
        }
        valid = false;
      }

      if (!subject.value.trim()) {
        const subjectError = document.getElementById(
          "test-contact-error-subject"
        );
        if (subjectError) {
          subjectError.textContent = "Subject is required.";
          console.log("Subject validation failed");
        }
        valid = false;
      }

      if (!message.value.trim()) {
        const messageError = document.getElementById(
          "test-contact-error-message"
        );
        if (messageError) {
          messageError.textContent = "Message is required.";
          console.log("Message validation failed - empty");
        }
        valid = false;
      } else if (message.value.trim().length < 10) {
        const messageError = document.getElementById(
          "test-contact-error-message"
        );
        if (messageError) {
          messageError.textContent =
            "Message must be at least 10 characters long.";
          console.log("Message validation failed - too short");
        }
        valid = false;
      }

      if (valid) {
        console.log("All validation passed, showing success message");
        successMsg.textContent = "✅ Your message has been sent successfully!";
        successMsg.style.color = "#0f9d58";
        successMsg.style.display = "block";
        contactForm.reset();
      } else {
        console.log("Validation failed, errors should be visible");
        successMsg.textContent = "";
        successMsg.style.display = "none";
      }
    });
  } else {
    console.error("Contact form not found!");
  }
});
