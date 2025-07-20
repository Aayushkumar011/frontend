// ===== SIGNUP PAGE SCRIPT =====
window.addEventListener("load", () => {
  const startupBtn = document.getElementById("startupBtn");
  const investorBtn = document.getElementById("investorBtn");
  const startupFields = document.querySelector(".startup-fields");
  const investorFields = document.querySelector(".investor-fields");
  const roleField = document.getElementById("roleField");
  const form = document.getElementById("signupForm");
  const errorMessage = document.getElementById("errorMessage");

  // ====== ROLE TOGGLE FUNCTION ======
  function setRole(role) {
    if (!roleField) return;

    // Update hidden field
    roleField.value = role;

    // Update UI and localStorage
    if (role === "startup") {
      startupBtn?.classList.add("active");
      investorBtn?.classList.remove("active");
      startupFields && (startupFields.style.display = "block");
      investorFields && (investorFields.style.display = "none");

      // ✅ Set required only for visible fields
      toggleRequired(startupFields, true);
      toggleRequired(investorFields, false);
    } else if (role === "investor") {
      investorBtn?.classList.add("active");
      startupBtn?.classList.remove("active");
      investorFields && (investorFields.style.display = "block");
      startupFields && (startupFields.style.display = "none");

      // ✅ Set required only for visible fields
      toggleRequired(startupFields, false);
      toggleRequired(investorFields, true);
    }

    localStorage.setItem("userRole", role);

    // ✅ Debug logs
    console.log("Role set to:", role);
    console.log("Startup fields visible:", startupFields?.style.display);
    console.log("Investor fields visible:", investorFields?.style.display);
    console.log("Role field value:", roleField.value);
  }

  // ✅ Helper: Set required dynamically
  function toggleRequired(container, required) {
    if (!container) return;
    const inputs = container.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      if (required) {
        input.setAttribute("required", "required");
      } else {
        input.removeAttribute("required");
      }
    });
  }

  // ✅ Set default on load
  setRole("startup");

  // ✅ Role selection button events
  startupBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    setRole("startup");
  });

  investorBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    setRole("investor");
  });

  // ===== PASSWORD TOGGLE FUNCTION =====
  function togglePassword(fieldId, eyeIconId) {
    const field = document.getElementById(fieldId);
    const eyeIcon = document.getElementById(eyeIconId);
    if (!field || !eyeIcon) return;

    const showing = field.type === "text";
    field.type = showing ? "password" : "text";

    // Gracefully handle missing icons
    if (eyeIcon.src.includes("eye.svg") || eyeIcon.src.includes("eye-off.svg")) {
      eyeIcon.src = showing ? "asset/eye.svg" : "asset/eye-off.svg";
    }
  }

  window.togglePassword = togglePassword; // Make accessible globally

  // ===== FORM VALIDATION =====
  form?.addEventListener("submit", (e) => {
    const selectedRole = roleField?.value;
    const password = document.getElementById("password")?.value;
    const confirmPassword = document.getElementById("confirmPassword")?.value;

    console.log("Submitting as:", selectedRole);

    if (!selectedRole) {
      e.preventDefault();
      if (errorMessage) {
        errorMessage.textContent = "Please select your role.";
        errorMessage.style.display = "block";
      }
      return;
    }

    if (password !== confirmPassword) {
      e.preventDefault();
      if (errorMessage) {
        errorMessage.textContent = "Passwords do not match.";
        errorMessage.style.display = "block";
      }
      return;
    }

    // ✅ Store info and redirect
    localStorage.setItem("isSignedUp", "true");
    localStorage.setItem("userRole", selectedRole);

    if (errorMessage) {
      errorMessage.textContent = "";
      errorMessage.style.display = "none";
    }

    window.location.href = "loginpage.html";
  });
});

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

      const email = document.getElementById("loginEmail")?.value.trim();
      const password = document.getElementById("loginPassword")?.value.trim();
      const role = document.getElementById("loginRole")?.value;

      const errorMessage = document.getElementById("errorMessage");

      if (!email || !password || !role) {
        if (errorMessage) {
          errorMessage.textContent = "Please fill all fields and select your role.";
          errorMessage.style.display = "block";
        }
        return;
      }

      // ✅ Save to localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", email);         // ✅ This fixes null issue
      localStorage.setItem("userRole", role);

      // Redirect to dashboard
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
// ========== Shared Utilities ==========
function toggleFilter() {
  const panel = document.getElementById("filterPanel");
  if (panel) {
    panel.style.display = panel.style.display === "block" ? "none" : "block";
  }
}

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

// ========== PitchDeck Specific ==========
function filterInvestors() {
  const sector = document.getElementById("filterSector")?.value || "";
  const region = document.getElementById("filterRegion")?.value || "";
  const stage = document.getElementById("filterStage")?.value || "";
  const ticket = document.getElementById("filterTicket")?.value || "";
  const dealFlow = document.getElementById("dealFlow")?.value.toLowerCase() || "";
  const firmType = document.getElementById("firmType")?.value.toLowerCase() || "";
  const country = document.getElementById("country")?.value.toLowerCase() || "";

  const cards = document.querySelectorAll(".investor-cards .card");

  cards.forEach(card => {
    const content = card.textContent;
    const cardDeal = card.getAttribute("data-deal-flow") || "";
    const cardFirm = card.getAttribute("data-firm-type") || "";
    const cardCountry = card.getAttribute("data-country") || "";

    const matches = [
      !sector || content.includes(sector),
      !region || content.includes(region),
      !stage || content.includes(stage),
      !ticket || content.includes(ticket),
      !dealFlow || cardDeal.toLowerCase() === dealFlow,
      !firmType || cardFirm.toLowerCase() === firmType,
      !country || cardCountry.toLowerCase() === country
    ];

    card.style.display = matches.every(Boolean) ? "block" : "none";
  });
}

function showAllInvestors() {
  document.getElementById("searchInput").value = "";
  clearFilters(); // ✅ Fix
  document.querySelectorAll(".investor-cards .card").forEach(card => {
    card.style.display = "block";
  });
}


function searchInvestors() {
  const input = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";
  const cards = document.querySelectorAll(".investor-cards .card");
  cards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = name.includes(input) ? "block" : "none";
  });
}

// ========== InvestorDeck Specific ==========
function filterStartups() {
  const sector = document.getElementById("filterSector")?.value.toLowerCase() || "";
  const stage = document.getElementById("filterStage")?.value.toLowerCase() || "";
  const location = document.getElementById("filterLocation")?.value.toLowerCase() || "";
  const query = document.getElementById("searchInput")?.value.toLowerCase() || "";

  const cards = document.querySelectorAll("#startupCards .card");

  cards.forEach(card => {
    const cardSector = card.getAttribute("data-sector")?.toLowerCase() || "";
    const cardStage = card.getAttribute("data-stage")?.toLowerCase() || "";
    const cardLocation = card.getAttribute("data-location")?.toLowerCase() || "";
    const cardName = card.querySelector("h3").textContent.toLowerCase();

    const match = [
      !sector || cardSector === sector,
      !stage || cardStage === stage,
      !location || cardLocation === location,
      !query || cardName.includes(query)
    ];

    card.style.display = match.every(Boolean) ? "block" : "none";
  });
}

function showAllStartups() {
  document.getElementById("searchInput").value = "";
  clearFilters(); // ✅ Fix
  document.querySelectorAll("#startupCards .card").forEach(card => {
    card.style.display = "block";
  });
}


function searchStartups() {
  filterStartups();
}

function approachStartup(startupName) {
  localStorage.setItem("selectedStartup", startupName);
  window.location.href = "approachInvestment.html";
}



// ========== Static Stats Update ==========
window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("verifiedInvestors")) {
    document.getElementById("verifiedInvestors").innerText = 124;
    document.getElementById("activeFundings").innerText = 38;
    document.getElementById("dealsClosed").innerText = 19;
    document.getElementById("startupsOnboarded").innerText = 312;
  }

  if (document.getElementById("totalStartups")) {
    document.getElementById("totalStartups").innerText = 3121;
    document.getElementById("pitchesReviewed").innerText = 6850;
    document.getElementById("investmentsMade").innerText = 521;
    document.getElementById("messagesSent").innerText = 14220;
  }

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});
function clearFilters() {
  const isPitchDeck = window.location.href.includes("pitchDeck.html");
  const isInvestorDeck = window.location.href.includes("investorDeck.html");

  console.log("Clear button clicked");

  if (isInvestorDeck) {
    // Investor is viewing startups → use startup filters
    const pitchFilters = ["filterSector", "filterStage", "filterLocation"];
    pitchFilters.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        console.log(`Clearing ${id}, was: ${el.value}`);
        el.value = "";
      } else {
        console.warn(`Element not found: ${id}`);
      }
    });
    filterStartups();
  }

  if (isPitchDeck) {
    // Startup is viewing investors → use investor filters
    const investorFilters = [
      "filterSector",
      "filterRegion",
      "filterStage",
      "filterTicket",
      "dealFlow",
      "firmType",
      "country"
    ];
    investorFilters.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        console.log(`Clearing ${id}, was: ${el.value}`);
        el.value = "";
      } else {
        console.warn(`Element not found: ${id}`);
      }
    });
    filterInvestors();
  }
}
document.getElementById("clearFiltersBtn")?.addEventListener("click", clearFilters);



// ===== PROFILE CONTENT INJECTION =====
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("profileContent");
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("userRole");

  if (!container) return; // Only run on profile page

  if (user && role) {
    container.innerHTML = `
      <div class="profile-details">
        <h2>👋 Welcome back, ${user}!</h2>
        <p><strong>Role:</strong> ${role.charAt(0).toUpperCase() + role.slice(1)}</p>
        <p>Your profile is currently basic. More features will appear here after backend integration.</p>
        <a href="logout.html" class="btn">Log Out</a>
      </div>
    `;
  } else {
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
  }

  // Dynamically control sidebar visibility
  const pitchLink = document.getElementById("pitchDeckLink");
  const investorLink = document.getElementById("investorDeckLink");

  if (role === "startup" && pitchLink) {
    pitchLink.style.display = "block";
  } else if (role === "investor" && investorLink) {
    investorLink.style.display = "block";
  }
});
// ===== PROFILE CONTENT INJECTION END =====




// ===== MESSAGE STARTS =====
// ===== CHAT LIST POPULATION =====
// ===== OPEN CHAT FUNCTION =====
function openChat(name, image) {
  localStorage.setItem("chatUser", JSON.stringify({ name, image }));
  window.location.href = "chat.html";
}
document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chatBox");
  const sendBtn = document.getElementById("sendBtn");
  const chatInput = document.getElementById("chatInput");
  const chatUserName = document.getElementById("chatUserName");
  const chatAvatar = document.getElementById("chatAvatar");

  const chatUser = JSON.parse(localStorage.getItem("chatUser"));

  if (chatUser && chatUserName && chatAvatar) {
    chatUserName.textContent = chatUser.name;
    chatAvatar.src = chatUser.image;
  } else if (chatUserName && chatAvatar) {
    chatUserName.textContent = "Unknown User";
    chatAvatar.src = "asset/default-avatar.png";
  }

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

  chatBox.scrollTop = chatBox.scrollHeight;

  if (sendBtn && chatInput) {
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
  }
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


/* ==== aproach investment Script starts==== */
document.getElementById("approachForm").addEventListener("submit", function (e) {
      e.preventDefault();
      document.getElementById("successMsg").style.display = "block";
      setTimeout(() => {
        document.getElementById("successMsg").style.display = "none";
        this.reset();
      }, 3000);
    });
    window.addEventListener("DOMContentLoaded", () => {
  const startupName = localStorage.getItem("selectedStartup");
  const projectField = document.querySelector('input[name="startup"]');
  if (projectField && startupName) {
    projectField.value = startupName;
  }
});
/* ==== aproach investment Script ends==== */

