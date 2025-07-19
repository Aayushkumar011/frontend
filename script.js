// ===== SIGNUP PAGE SCRIPT =====

// Toggle password visibility
function togglePassword(fieldId, eyeIconId) {
  const field = document.getElementById(fieldId);
  const eyeIcon = document.getElementById(eyeIconId);
  if (field && eyeIcon) {
    if (field.type === "password") {
      field.type = "text";
      eyeIcon.src = "asset/eye-off.svg";
    } else {
      field.type = "password";
      eyeIcon.src = "asset/eye.svg";
    }
  }
}

// Role switching logic
document.addEventListener("DOMContentLoaded", function () {
  const startupBtn = document.getElementById("startupBtn");
  const investorBtn = document.getElementById("investorBtn");
  const startupFields = document.querySelector(".startup-fields");
  const investorFields = document.querySelector(".investor-fields");
  const roleField = document.getElementById("roleField");

  if (startupBtn && investorBtn && roleField) {
    startupBtn.addEventListener("click", () => {
      startupBtn.classList.add("active");
      investorBtn.classList.remove("active");
      if (startupFields) startupFields.classList.add("visible");
      if (investorFields) investorFields.classList.remove("visible");
      roleField.value = "startup";
    });

    investorBtn.addEventListener("click", () => {
      investorBtn.classList.add("active");
      startupBtn.classList.remove("active");
      if (investorFields) investorFields.classList.add("visible");
      if (startupFields) startupFields.classList.remove("visible");
      roleField.value = "investor";
    });
  }

  // Password match validation
  const form = document.getElementById("signupForm");
  const errorMessage = document.getElementById("errorMessage");

  if (form) {
    form.addEventListener("submit", function (e) {
      const password = document.getElementById("password")?.value;
      const confirmPassword = document.getElementById("confirmPassword")?.value;
      if (password !== confirmPassword) {
        e.preventDefault();
        if (errorMessage) errorMessage.textContent = "Passwords do not match.";
      } else {
        if (errorMessage) errorMessage.textContent = "";
      }
    });
  }
});
// ===== SIGNUP PAGE SCRIPT ENDS =====


// ===== LOGIN PAGE SCRIPT START =====
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggleLoginPassword");
  const pwd = document.getElementById("loginPassword");

  if (toggle && pwd) {
    toggle.addEventListener("click", () => {
      const type = pwd.getAttribute("type") === "password" ? "text" : "password";
      pwd.setAttribute("type", type);
      toggle.src = type === "password" ? "asset/eye.svg" : "asset/eye-off.svg";
    });
  }

  const form = document.querySelector(".signup-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const role = document.getElementById("loginRole")?.value;
      if (!role) {
        alert("Please select your role.");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", role);
      window.location.href = "dashboard.html";
    });
  }
});
// ===== LOGIN PAGE SCRIPT END =====


// ===== DASHBOARD PAGE SCRIPT START =====
window.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("userRole");
  if (role) {
    if (role === "startup") {
      const investorDeck = document.getElementById("investorDeckLink");
      if (investorDeck) investorDeck.style.display = "none";
    } else if (role === "investor") {
      const pitchDeck = document.getElementById("pitchDeckLink");
      if (pitchDeck) pitchDeck.style.display = "none";
    }
  }
});
// ===== DASHBOARD PAGE SCRIPT END =====


// ===== PITCHDECK & INVESTORDECK PAGE SCRIPT START =====
(() => {
  const role = localStorage.getItem("userRole");

  const path = window.location.href;

  if (path.includes("pitchDeck.html") && role !== "startup") {
    alert("Access Denied: Only Startups can access the Pitch Deck.");
    window.location.href = "homepage.html";
  }

  if (path.includes("investorDeck.html") && role !== "investor") {
    alert("Access Denied: Only Investors can access the Investor Deck.");
    window.location.href = "homepage.html";
  }

  const pitchLink = document.getElementById("pitchDeckLink");
  const investorLink = document.getElementById("investorDeckLink");

  if (role === "startup") {
    if (investorLink) investorLink.style.display = "none";
    if (pitchLink) pitchLink.style.display = "block";
  } else if (role === "investor") {
    if (pitchLink) pitchLink.style.display = "none";
    if (investorLink) investorLink.style.display = "block";
  }
})();
// ===== PITCHDECK & INVESTORDECK PAGE SCRIPT END =====


// ===== INVESTOR FILE UPLOAD VALIDATION SCRIPT START =====
function uploadInvestorBrief() {
  const fileInput = document.getElementById("investorFile");
  const file = fileInput?.files[0];

  if (!file) {
    alert("Please select a file first.");
    return;
  }

  const allowedTypes = ["application/pdf"];
  if (!allowedTypes.includes(file.type)) {
    alert("Only PDF files are allowed.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("File too large! Max 5MB allowed.");
    return;
  }

  alert(`File "${file.name}" uploaded successfully!`);

  const nameDisplay = document.getElementById("fileNameDisplay");
  if (nameDisplay) {
    nameDisplay.textContent = `Uploaded: ${file.name}`;
  }
}
// ===== INVESTOR FILE UPLOAD VALIDATION SCRIPT END =====


// ===== PROFILE CONTENT INJECTION =====
// ===== PROFILE CONTENT INJECTION =====
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("profileContent");
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("userRole");

  if (!container) return;

  if (!user) {
    container.innerHTML = `
      <div class="profile-empty">
        <h2>You have no profile yet.</h2>
        <p>Please sign up or log in to view your profile.</p>
        <div class="profile-buttons">
          <a href="signUpPage.html" class="btn">Sign Up</a>
          <a href="loginpage.html" class="btn">Login</a>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="profile-details">
        <h2>👋 Welcome back, ${user}!</h2>
        <p><strong>Role:</strong> ${role ? role.charAt(0).toUpperCase() + role.slice(1) : "N/A"}</p>
        <p>Your profile is currently basic. More features will appear here after backend integration.</p>
        <a href="logout.html" class="btn">Log Out</a>
      </div>
    `;
  }

  // Show relevant links in sidebar
  const pitchLink = document.getElementById("pitchDeckLink");
  const investorLink = document.getElementById("investorDeckLink");

  if (role === "startup" && pitchLink) pitchLink.style.display = "block";
  if (role === "investor" && investorLink) investorLink.style.display = "block";
});

// ===== PROFILE CONTENT INJECTION END =====



// ===== MESSAGE STARTS =====
// ===== CHAT LIST POPULATION =====
document.addEventListener("DOMContentLoaded", () => {
  const chatList = document.getElementById("chatList");

  if (chatList) {
    const dummyChats = [
      {
        name: "Investor_A",
        message: "We're interested in your pitch.",
        time: "2 mins ago",
        avatar: "assets/avatar1.png",
        id: "investorA"
      },
      {
        name: "Startup_B",
        message: "Great! Let’s connect soon.",
        time: "1 hour ago",
        avatar: "assets/avatar2.png",
        id: "startupB"
      },
      {
        name: "Investor_C",
        message: "Can you share more details?",
        time: "Yesterday",
        avatar: "assets/avatar3.png",
        id: "investorC"
      }
    ];

    dummyChats.forEach(chat => {
      const entry = document.createElement("a");
      entry.className = "chat-entry";
      entry.href = `chat.html?user=${chat.id}`;
      entry.innerHTML = `
        <img src="${chat.avatar}" alt="${chat.name}">
        <div class="chat-info">
          <div class="chat-name">${chat.name}</div>
          <div class="last-message">${chat.message}</div>
        </div>
        <div class="chat-time">${chat.time}</div>
      `;
      chatList.appendChild(entry);
    });
  }
});
// ===== END CHAT LIST POPULATION =====

// ===== CHAT PAGE SCRIPT =====
document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chatBox");
  const sendBtn = document.getElementById("sendBtn");
  const chatInput = document.getElementById("chatInput");
  const chatUserName = document.getElementById("chatUserName");
  const chatAvatar = document.getElementById("chatAvatar");

  // Get user from URL
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("user");

  // Dummy users list
  const users = {
    investorA: {
      name: "Investor_A",
      avatar: "assets/avatar1.png"
    },
    startupB: {
      name: "Startup_B",
      avatar: "assets/avatar2.png"
    },
    investorC: {
      name: "Investor_C",
      avatar: "assets/avatar3.png"
    }
  };

  if (users[userId]) {
    chatUserName.textContent = users[userId].name;
    chatAvatar.src = users[userId].avatar;
  } else {
    chatUserName.textContent = "Unknown User";
    chatAvatar.src = "assets/default-avatar.png";
  }

  // Load dummy messages
  const dummyMessages = [
    { from: "them", text: "Hi, how are you?" },
    { from: "me", text: "All good, you?" },
    { from: "them", text: "I checked your pitch. Looks promising!" }
  ];

  dummyMessages.forEach(msg => {
    const div = document.createElement("div");
    div.className = "chat-message" + (msg.from === "me" ? " self" : "");
    div.textContent = msg.text;
    chatBox.appendChild(div);
  });

  // Send button logic
  sendBtn.addEventListener("click", () => {
    const message = chatInput.value.trim();
    if (!message) return;

    const div = document.createElement("div");
    div.className = "chat-message self";
    div.textContent = message;
    chatBox.appendChild(div);

    chatInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  });
});
// ===== END CHAT PAGE SCRIPT =====
// ===== MESSAGE END =====

// ===== Show/Hide Role-Based Sidebar Links =====
document.addEventListener('DOMContentLoaded', () => {
  const userRole = localStorage.getItem('userRole'); // 'startup' or 'investor'

  if (userRole === 'startup') {
    document.getElementById('pitchDeckLink').style.display = 'block';
  } else if (userRole === 'investor') {
    document.getElementById('investorDeckLink').style.display = 'block';
  }
});



/* ========== FAQ SCRIPT STARTS========== */
// Initialize Lucide icons
lucide.createIcons();

// Accordion logic for FAQ
const questions = document.querySelectorAll('.faq-question');

questions.forEach(question => {
  question.addEventListener('click', () => {
    question.classList.toggle('active');
    const answer = question.nextElementSibling;
    answer.classList.toggle('open');
  });
});

// Role-based sidebar visibility
const role = localStorage.getItem("userRole");

if (role === "startup") {
  document.getElementById("pitchDeckLink").style.display = "flex";
} else if (role === "investor") {
  document.getElementById("investorDeckLink").style.display = "flex";
}


/* ========== FAQ SCRIPT ENDS========== */


/* ========== CONTACT SCRIPT starts========== */

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const topic = document.getElementById('topic').value;
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('form-status');

  if (!email.includes('@')) {
    status.textContent = 'Please enter a valid email address.';
    status.classList.add('error');
    return;
  }

  status.textContent = 'Sending...';
  status.classList.remove('error');

  // Simulate send success or failure
  setTimeout(() => {
    const isSuccess = Math.random() > 0.2;
    if (isSuccess) {
      status.textContent = '✅ Message sent successfully!';
      document.getElementById('contactForm').reset();
    } else {
      status.textContent = '❌ Failed to send message. Please try again.';
      status.classList.add('error');
    }
  }, 1000);
});
document.querySelectorAll('a[href="contact.html"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
      e.preventDefault();
      window.location.href = "dashboardContact.html";
    }
  });
});
/* ========== CONTACT SCRIPT ENDS========== */


/* ========== LOGOUT SCRIPT STARTS========== */
window.addEventListener('DOMContentLoaded', () => {
  const role = localStorage.getItem('userRole'); // 'startup' or 'investor'
  if (role === 'startup') {
    const investorDeck = document.getElementById('investorDeckLink');
    if (investorDeck) investorDeck.style.display = 'none';
  } else if (role === 'investor') {
    const pitchDeck = document.getElementById('pitchDeckLink');
    if (pitchDeck) pitchDeck.style.display = 'none';
  }
});
/* ========== LOGOUT SCRIPT ENDS========== */

/* ========== CHANGE EMAIL SCRIPT STARTS========== */
document.getElementById('changeEmailForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const newEmail = document.getElementById('newEmail').value.trim();
  const confirmEmail = document.getElementById('confirmEmail').value.trim();
  const msg = document.getElementById('message');

  msg.textContent = '';
  msg.style.color = 'red';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newEmail)) {
    msg.textContent = 'Invalid email format.';
    return;
  }

  if (newEmail !== confirmEmail) {
    msg.textContent = 'Emails do not match.';
    return;
  }

  // Simulate email update
  msg.style.color = 'green';
  msg.textContent = 'Email updated successfully!';

  // Optional: Disable button or redirect after success
  setTimeout(() => {
    window.location.href = "setting.html";
  }, 1500);
});

/* ========== CHANGE EMAIL SCRIPT ENDS========== */

/* ========== CHANGE PASSWORD SCRIPT ENDS========== */
document.getElementById("changePasswordForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const oldPassword = document.getElementById("oldPassword").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  const errorMsg = document.getElementById("errorMessage");
  const successMsg = document.getElementById("successMessage");

  errorMsg.textContent = "";
  successMsg.textContent = "";

  // Validation
  if (newPassword.length < 6) {
    errorMsg.textContent = "New password must be at least 6 characters.";
    return;
  }

  if (newPassword !== confirmPassword) {
    errorMsg.textContent = "New passwords do not match.";
    return;
  }

  if (oldPassword === newPassword) {
    errorMsg.textContent = "New password must be different from old password.";
    return;
  }

  // Simulate success
  successMsg.textContent = "Password changed successfully!";
});

function toggleVisibility(id) {
  const field = document.getElementById(id);
  field.type = field.type === "password" ? "text" : "password";
}

function goToSettings() {
  window.location.href = "setting.html"; // replace with actual path
}

function toggleVisibility(fieldId, iconElement) {
  const field = document.getElementById(fieldId);
  const img = iconElement.querySelector('img');

  if (field.type === 'password') {
    field.type = 'text';
    img.src = 'asset/eye-off.svg';
    img.alt = 'Hide';
  } else {
    field.type = 'password';
    img.src = 'asset/eye.svg';
    img.alt = 'Show';
  }
}
/* ========== CHANGE PASSWORD SCRIPT ENDS========== */

/* ========== CHANGE Profile SCRIPT STARTS========== */
document.addEventListener("DOMContentLoaded", function () {
  const uploadInput = document.getElementById('uploadInput');
  const preview = document.getElementById('profilePreview');

  uploadInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.setAttribute('src', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
});
/* ========== CHANGE Profile SCRIPT ENDS========== */

/* ==== CHANGE USERNAME PAGE Script starts==== */
// ==== Username Update Handling ====
const usernameForm = document.getElementById('usernameForm');
if (usernameForm) {
  const newUsername = document.getElementById('newUsername');
  const charCount = document.getElementById('charCount');
  const errorMsg = document.getElementById('errorMsg');
  const successMsg = document.getElementById('successMsg');

  newUsername.addEventListener('input', () => {
    charCount.textContent = `${newUsername.value.length} / 20`;
    if (newUsername.value.length >= 3) {
      errorMsg.style.display = 'none';
    }
  });

  usernameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (newUsername.value.length < 3) {
      errorMsg.style.display = 'block';
      successMsg.style.display = 'none';
    } else {
      successMsg.style.display = 'block';
      errorMsg.style.display = 'none';

      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 3000);
    }
  });
}
/* ==== CHANGE USERNAME PAGE Script ends==== */

/* ==== delete Script starts==== */
function confirmDeactivate() {
  const confirmDeactivate = confirm("Are you sure you want to deactivate your account?\nYou can reactivate it later.");
  if (confirmDeactivate) {
    alert("Your account will be deactivated. (Backend logic needed)");
    // Redirect or call backend here
  }
}

function confirmDelete() {
  const confirmDelete = confirm("⚠️ WARNING: This action is permanent!\nDo you really want to DELETE your account?");
  if (confirmDelete) {
    alert("Your account will be deleted. (Backend logic needed)");
    // Redirect or call backend here
  }
}
/* ==== delete Script ends==== */

/* ==== 404 error Script starts==== */
// script.js - Optional functionality for error page
document.addEventListener('DOMContentLoaded', () => {
  // You can log or track 404 errors here if needed
  console.warn("404 page loaded: tracking not implemented yet.");
});
/* ==== 404 error Script ends==== */

/* ==== notifications Script starts==== */
document.getElementById("notification-form").addEventListener("submit", function (e) {
  e.preventDefault();

  alert("Your preferences have been saved successfully!");
  // You can also send this data to your backend using fetch or AJAX
});
/* ==== notifications Script ends==== */

/* ==== privacy Script starts==== */
document.getElementById("savePrivacy").addEventListener("click", function (e) {
  e.preventDefault();

  const profileVisibility = document.getElementById("profileVisibility").value;
  const indexing = document.getElementById("indexing").checked;
  const showEmail = document.getElementById("showEmail").checked;
  const enableMessaging = document.getElementById("enableMessaging").checked;
  const enable2FA = document.getElementById("enable2FA").checked;

  // Simulate saving to server
  console.log("Privacy Settings Saved:");
  console.log({
    profileVisibility,
    indexing,
    showEmail,
    enableMessaging,
    enable2FA
  });

  alert("Your privacy settings have been saved!");
});
/* ==== privacy Script ends==== */


/* ==== Successful Startup Script starts==== */
// You can keep it empty for now or add scroll-to-top, dynamic CTA, etc.
console.log("Successful Startup Page Loaded");
/* ==== Successful Startup Script ends==== */


