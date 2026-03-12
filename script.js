const countdown = document.getElementById("countdown");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const buttonHint = document.getElementById("buttonHint");
const mainSite = document.getElementById("mainSite");

const secretButton = document.getElementById("secretButton");
const secretModal = document.getElementById("secretModal");
const closeSecretModal = document.getElementById("closeSecretModal");

const confirmModal = document.getElementById("confirmModal");
const confirmTitle = document.getElementById("confirmTitle");
const confirmText = document.getElementById("confirmText");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");

const buttonArea = document.getElementById("buttonArea");
const targetDate = new Date("May 5, 2026 00:00:00").getTime();

let isUnlocked = false;
let noClickCount = 0;
let confirmStage = 0;

confirmModal.classList.add("hidden");
secretModal.classList.add("hidden");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    isUnlocked = true;
    countdown.textContent = "It’s finally May 5 💖";
    buttonHint.textContent = "The yes button is finally unlocked.";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function moveNoButton() {
  const areaWidth = buttonArea.offsetWidth;
  const areaHeight = buttonArea.offsetHeight;
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;

  const maxX = Math.max(areaWidth - buttonWidth, 0);
  const maxY = Math.max(areaHeight - buttonHeight, 0);

  const randomX = Math.floor(Math.random() * (maxX + 1));
  const randomY = Math.floor(Math.random() * (maxY + 1));

  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
}

function openConfirm(title, text) {
  confirmTitle.textContent = title;
  confirmText.textContent = text;
  confirmModal.classList.remove("hidden");
}

function closeConfirm() {
  confirmModal.classList.add("hidden");
}

function makeSiteSad() {
  document.body.classList.add("sad-site");

  mainSite.innerHTML = `
    <h1>May 5 won’t be the same</h1>
    <p class="subtitle">The wait ended early.</p>

    <section class="countdown-box">
      <h2>The countdown stopped</h2>
      <div id="countdown">00d 00h 00m 00s</div>
    </section>

    <section class="locked-box">
      <h2>Some things changed</h2>
      <p class="sad-message">
        You chose not to wait until May 5.<br><br>
        So the page changed with it.<br><br>
        This was supposed to be for something sweet.
      </p>
    </section>
  `;
}

updateCountdown();
setInterval(updateCountdown, 1000);

secretButton.addEventListener("click", () => {
  secretModal.classList.remove("hidden");
});

closeSecretModal.addEventListener("click", () => {
  secretModal.classList.add("hidden");
});

secretModal.addEventListener("click", (e) => {
  if (e.target === secretModal) {
    secretModal.classList.add("hidden");
  }
});

yesButton.addEventListener("mouseenter", () => {
  if (!isUnlocked) {
    buttonHint.textContent = "Locked until May 5.";
  }
});

yesButton.addEventListener("click", () => {
  if (!isUnlocked) {
    buttonHint.textContent = "Still locked until May 5 💖";
    return;
  }

  buttonHint.textContent = "You can finally say yes now 💖";
});

noButton.addEventListener("mouseenter", () => {
  moveNoButton();
});

noButton.addEventListener("click", () => {
  noClickCount++;

  if (noClickCount < 3) {
    buttonHint.textContent = "Pressing no means ending the wait early.";
    moveNoButton();
    return;
  }

  confirmStage = 1;
  openConfirm(
    "Are you sure?",
    "Pressing no before May 5 means you want to end the wait early."
  );
});

confirmNo.addEventListener("click", () => {
  closeConfirm();
});

confirmYes.addEventListener("click", async () => {
  if (confirmStage === 1) {
    confirmTitle.textContent = "No, you're stuck with me";
    confirmText.textContent = "Waiting 3 seconds...";
    confirmYes.classList.add("hidden");
    confirmNo.classList.add("hidden");

    await new Promise((resolve) => setTimeout(resolve, 3000));

    confirmStage = 2;
    confirmTitle.textContent = "Are you positive?";
    confirmText.textContent = "If you confirm this, the whole website changes.";
    confirmYes.classList.remove("hidden");
    confirmNo.classList.remove("hidden");
    return;
  }

  if (confirmStage === 2) {
    closeConfirm();
    makeSiteSad();
  }
});
