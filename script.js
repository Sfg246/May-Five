const countdown = document.getElementById("countdown");
const proposalBox = document.getElementById("proposalBox");
const lockedButton = document.getElementById("lockedButton");
const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const buttonArea = document.getElementById("buttonArea");
const mainSite = document.getElementById("mainSite");

const secretButton = document.getElementById("secretButton");
const secretModal = document.getElementById("secretModal");
const closeSecretModal = document.getElementById("closeSecretModal");

const confirmModal = document.getElementById("confirmModal");
const confirmTitle = document.getElementById("confirmTitle");
const confirmText = document.getElementById("confirmText");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");

const targetDate = new Date("May 5, 2026 00:00:00").getTime();

let noClickCount = 0;
let confirmStage = 0;

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    countdown.textContent = "The wait is over 💖";
    lockedButton.style.display = "none";
    proposalBox.classList.remove("hidden");
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
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

yesButton.addEventListener("click", () => {
  alert("Yay 💖");
});

function moveNoButton() {
  const areaWidth = buttonArea.offsetWidth;
  const areaHeight = buttonArea.offsetHeight;

  const maxX = Math.max(areaWidth - noButton.offsetWidth - 10, 0);
  const maxY = Math.max(areaHeight - noButton.offsetHeight - 10, 0);

  const randomX = Math.floor(Math.random() * (maxX + 1));
  const randomY = Math.floor(Math.random() * (maxY + 1));

  noButton.style.position = "absolute";
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

function changeWholeWebsite() {
  document.body.classList.add("changed-site");

  mainSite.innerHTML = `
    <h1>Too late</h1>
    <p class="subtitle">That answer has been reviewed and rejected.</p>

    <section class="proposal-box">
      <h2>Nope</h2>
      <p class="changed-message">
        You really thought "no" was an option?<br><br>
        No you're stuck with me.<br><br>
        Date pending. Appeal denied. 💖
      </p>
    </section>
  `;
}

noButton.addEventListener("mouseenter", moveNoButton);

noButton.addEventListener("click", () => {
  noClickCount++;

  if (noClickCount < 3) {
    moveNoButton();
    return;
  }

  confirmStage = 1;
  openConfirm("Are you sure?", "Be honest... is that really your final answer?");
});

confirmNo.addEventListener("click", () => {
  closeConfirm();
});

confirmYes.addEventListener("click", async () => {
  if (confirmStage === 1) {
    confirmTitle.textContent = "No, you're stuck with me";
    confirmText.textContent = "Give it a second...";
    confirmNo.classList.add("hidden");
    confirmYes.classList.add("hidden");

    await new Promise((resolve) => setTimeout(resolve, 3000));

    confirmStage = 2;
    confirmTitle.textContent = "Are you positive?";
    confirmText.textContent = "This is your last chance to rethink that answer.";
    confirmNo.classList.remove("hidden");
    confirmYes.classList.remove("hidden");
    return;
  }

  if (confirmStage === 2) {
    closeConfirm();
    changeWholeWebsite();
  }
});
