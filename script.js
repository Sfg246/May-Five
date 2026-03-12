const countdown = document.getElementById("countdown");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const buttonHint = document.getElementById("buttonHint");
const mainSite = document.getElementById("mainSite");

const secretButton = document.getElementById("secretButton");
const secretModal = document.getElementById("secretModal");
const closeSecretModal = document.getElementById("closeSecretModal");

const earlyButton = document.getElementById("earlyButton");
const earlyModal = document.getElementById("earlyModal");
const closeEarlyModal = document.getElementById("closeEarlyModal");

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
earlyModal.classList.add("hidden");

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

  const safePadding = 8;
  const maxX = Math.max(areaWidth - buttonWidth - safePadding, 0);
  const maxY = Math.max(areaHeight - buttonHeight, 0);

  const currentLeft = parseInt(noButton.style.left || 0, 10);
  let randomX = Math.floor(Math.random() * (maxX + 1));
  let randomY = Math.floor(Math.random() * (maxY + 1));

  if (Math.abs(randomX - currentLeft) < 45) {
    randomX = Math.min(maxX, randomX + 55);
  }

  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
}

function maybeMoveNoButton() {
  const shouldMove = Math.random() < 0.6;
  if (shouldMove) {
    moveNoButton();
  }
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
    <h1>This changed everything</h1>
    <p class="subtitle">The wait didn’t just end. This did too.</p>

    <section class="countdown-box">
      <h2>No more countdown</h2>
      <div id="countdown">00d 00h 00m 00s</div>
    </section>

    <section class="locked-box">
      <h2>You chose to end it</h2>
      <p class="sad-message">
        Pressing no before May 5 meant more than ending a surprise.<br><br>
        It meant ending this completely.<br><br>
        Not just the wait. Not just the date.<br><br>
        Us, talking, hoping, and whatever this could have been.
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

earlyButton.addEventListener("click", () => {
  earlyModal.classList.remove("hidden");
});

closeEarlyModal.addEventListener("click", () => {
  earlyModal.classList.add("hidden");
});

earlyModal.addEventListener("click", (e) => {
  if (e.target === earlyModal) {
    earlyModal.classList.add("hidden");
  }
});

yesButton.addEventListener("mouseenter", () => {
  if (!isUnlocked) {
    buttonHint.textContent = "Still locked until May 5.";
  }
});

yesButton.addEventListener("click", () => {
  if (!isUnlocked) {
    buttonHint.textContent = "Still locked until May 5. If you already know, use the tiny button below.";
    return;
  }

  buttonHint.textContent = "You can finally say yes now 💖";
});

noButton.addEventListener("mouseenter", () => {
  maybeMoveNoButton();
});

noButton.addEventListener("click", () => {
  noClickCount++;

  if (noClickCount < 3) {
    buttonHint.textContent = "Pressing no means ending this completely, not just ending the wait.";
    maybeMoveNoButton();
    return;
  }

  confirmStage = 1;
  openConfirm(
    "Are you sure?",
    "Pressing no before May 5 means you do not want this anymore, not now and not later."
  );
});

confirmNo.addEventListener("click", () => {
  closeConfirm();
});

confirmYes.addEventListener("click", async () => {
  if (confirmStage === 1) {
    confirmTitle.textContent = "No, you're stuck with me";
    confirmText.textContent = "Give it 3 seconds and think one more time.";
    confirmYes.classList.add("hidden");
    confirmNo.classList.add("hidden");

    await new Promise((resolve) => setTimeout(resolve, 3000));

    confirmStage = 2;
    confirmTitle.textContent = "Are you positive?";
    confirmText.textContent = "This means ending us completely, not just ending the countdown.";
    confirmYes.classList.remove("hidden");
    confirmNo.classList.remove("hidden");
    return;
  }

  if (confirmStage === 2) {
    closeConfirm();
    makeSiteSad();
  }
});
