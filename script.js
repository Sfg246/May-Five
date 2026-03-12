const countdown = document.getElementById("countdown");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const buttonHint = document.getElementById("buttonHint");
const mainSite = document.getElementById("mainSite");
const brokenHearts = document.getElementById("brokenHearts");

const secretButton = document.getElementById("secretButton");
const secretModal = document.getElementById("secretModal");
const closeSecretModal = document.getElementById("closeSecretModal");

const writeSecretButton = document.getElementById("writeSecretButton");
const writeSecretModal = document.getElementById("writeSecretModal");
const closeWriteSecretModalButton = document.getElementById("closeWriteSecretModal");
const cancelSecretMessageButton = document.getElementById("cancelSecretMessageButton");
const sendSecretMessageButton = document.getElementById("sendSecretMessageButton");
const secretMessageInput = document.getElementById("secretMessageInput");
const secretSendStatus = document.getElementById("secretSendStatus");

const earlyModal = document.getElementById("earlyModal");
const closeEarlyModal = document.getElementById("closeEarlyModal");
const earlyYesButton = document.getElementById("earlyYesButton");
const earlyNoButton = document.getElementById("earlyNoButton");

const confirmModal = document.getElementById("confirmModal");
const confirmTitle = document.getElementById("confirmTitle");
const confirmText = document.getElementById("confirmText");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");
const confirmTimer = document.getElementById("confirmTimer");

const buttonArea = document.getElementById("buttonArea");
const targetDate = new Date("May 5, 2026 00:00:00").getTime();

let isUnlocked = false;
let noInteractions = 0;
let confirmStage = 0;
let confirmCountdownInterval = null;
let noMoveInterval = null;

confirmModal.classList.add("hidden");
writeSecretModal.classList.add("hidden");
earlyModal.classList.add("hidden");
brokenHearts.classList.add("hidden");

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
  if (!buttonArea || !noButton) return;
  if (!confirmModal.classList.contains("hidden")) return;
  if (document.body.classList.contains("sad-site")) return;

  const areaWidth = buttonArea.offsetWidth;
  const areaHeight = buttonArea.offsetHeight;
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;

  const maxX = Math.max(areaWidth - buttonWidth - 8, 0);
  const maxY = Math.max(areaHeight - buttonHeight, 0);

  const randomX = Math.floor(Math.random() * (maxX + 1));
  const randomY = Math.floor(Math.random() * (maxY + 1));

  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
}

function startNoMovement() {
  if (noMoveInterval) {
    clearInterval(noMoveInterval);
  }

  noMoveInterval = setInterval(() => {
    moveNoButton();
  }, 2000);
}

function stopNoMovement() {
  if (noMoveInterval) {
    clearInterval(noMoveInterval);
    noMoveInterval = null;
  }
}

function openConfirm(title, text) {
  confirmTitle.textContent = title;
  confirmText.textContent = text;
  confirmTimer.classList.add("hidden");
  confirmModal.classList.remove("hidden");
}

function closeConfirm() {
  confirmModal.classList.add("hidden");
  confirmTimer.classList.add("hidden");

  if (confirmCountdownInterval) {
    clearInterval(confirmCountdownInterval);
    confirmCountdownInterval = null;
  }
}

function startThirtySecondTimer() {
  if (confirmCountdownInterval) {
    clearInterval(confirmCountdownInterval);
  }

  let timeLeft = 30;
  confirmTimer.textContent = timeLeft;
  confirmTimer.classList.remove("hidden");

  confirmCountdownInterval = setInterval(() => {
    timeLeft -= 1;
    confirmTimer.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(confirmCountdownInterval);
      confirmCountdownInterval = null;

      confirmStage = 2;
      confirmTitle.textContent = "Are you positive?";
      confirmText.textContent = "There’s no going back from this.";
      confirmTimer.classList.add("hidden");
      confirmYes.classList.remove("hidden");
      confirmNo.classList.remove("hidden");
    }
  }, 1000);
}

function makeSiteSad() {
  stopNoMovement();
  document.body.classList.add("sad-site");
  brokenHearts.classList.remove("hidden");

  mainSite.innerHTML = `
    <h1>Everything changed</h1>
    <p class="subtitle">The break did not just pause. It ended for good.</p>

    <section class="countdown-box">
      <h2>No more countdown</h2>
      <div id="countdown">00d 00h 00m 00s</div>
    </section>

    <section class="locked-box">
      <h2>Message sent</h2>
      <p class="sad-message">
        Andres got the message that you wanted to end the talking stage and the break as a whole.<br><br>
        Not later. Not after May 5.<br><br>
        Completely.<br><br>
        So this page changed with that choice.
      </p>
    </section>
  `;
}

function closeWriteSecretModalBox() {
  writeSecretModal.classList.add("hidden");
  secretSendStatus.textContent = "";
}

updateCountdown();
setInterval(updateCountdown, 1000);
startNoMovement();

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

writeSecretButton.addEventListener("click", () => {
  writeSecretModal.classList.remove("hidden");
  secretSendStatus.textContent = "";
});

closeWriteSecretModalButton.addEventListener("click", () => {
  closeWriteSecretModalBox();
});

cancelSecretMessageButton.addEventListener("click", () => {
  closeWriteSecretModalBox();
});

writeSecretModal.addEventListener("click", (e) => {
  if (e.target === writeSecretModal) {
    closeWriteSecretModalBox();
  }
});

sendSecretMessageButton.addEventListener("click", async () => {
  const rawMessage = secretMessageInput.value.trim();

  if (!rawMessage) {
    secretSendStatus.textContent = "Please write a message first.";
    return;
  }

  sendSecretMessageButton.disabled = true;
  secretSendStatus.textContent = "Sending...";

  const result = await sendSiteNotification("secret_message", {
    secret_message: rawMessage
  });

  if (result && result.success) {
    secretSendStatus.textContent = "Your secret message was sent.";
    secretMessageInput.value = "";
  } else {
    secretSendStatus.textContent = "Something went wrong. Please try again.";
  }

  sendSecretMessageButton.disabled = false;
});

yesButton.addEventListener("mouseenter", () => {
  if (!isUnlocked) {
    buttonHint.textContent = "Still locked until May 5.";
  }
});

yesButton.addEventListener("click", () => {
  if (!isUnlocked) {
    buttonHint.textContent = "Still locked until May 5.";
    earlyModal.classList.remove("hidden");
    return;
  }

  buttonHint.textContent = "You can finally say yes now 💖";
});

closeEarlyModal.addEventListener("click", () => {
  earlyModal.classList.add("hidden");
});

earlyNoButton.addEventListener("click", () => {
  earlyModal.classList.add("hidden");
});

earlyYesButton.addEventListener("click", async () => {
  const result = await sendSiteNotification("early_yes");
  earlyModal.classList.add("hidden");

  if (result && result.success) {
    buttonHint.textContent = "Message received 💖";
  } else {
    buttonHint.textContent = "Something went wrong, try again.";
  }
});

earlyModal.addEventListener("click", (e) => {
  if (e.target === earlyModal) {
    earlyModal.classList.add("hidden");
  }
});

noButton.addEventListener("click", () => {
  noInteractions += 1;

  if (noInteractions === 1) {
    buttonHint.textContent = "This is my way of fighting for this.";
    return;
  }

  if (noInteractions === 2) {
    buttonHint.textContent = "Nooo, I’ll fight harder.";
    return;
  }

  if (noInteractions === 3) {
    buttonHint.textContent = "Wait... you really wanna press no?";
    return;
  }

  confirmStage = 1;
  openConfirm(
    "Are you sure?",
    "Confirming this means you want to stop this break and the talking stage as a whole."
  );
});

confirmNo.addEventListener("click", () => {
  closeConfirm();
});

confirmYes.addEventListener("click", async () => {
  if (confirmStage === 1) {
    confirmTitle.textContent = "No, you're stuck with me";
    confirmText.textContent = "Just think carefully.";
    confirmYes.classList.add("hidden");
    confirmNo.classList.add("hidden");
    startThirtySecondTimer();
    return;
  }

  if (confirmStage === 2) {
    await sendSiteNotification("cancel");
    closeConfirm();
    makeSiteSad();
  }
});
