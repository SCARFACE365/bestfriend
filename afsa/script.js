<script>
document.addEventListener("DOMContentLoaded", () => {

  const PASSWORD = "afsa_forever"; // 🔐 password

  const input = document.getElementById("secretInput");
  const btn = document.getElementById("unlockBtn");
  const message = document.getElementById("secretMessage");

  // Safety check (prevents console errors)
  if (!input || !btn || !message) {
    console.error("Secret page elements not found.");
    return;
  }

  let unlocked = false;

  function unlock() {
    if (unlocked) return;
    unlocked = true;

    // Show secret message
    message.style.display = "block";
    message.setAttribute("aria-hidden", "false");

    // Smooth hide input + button
    [input, btn].forEach(el => {
      el.style.transition = "opacity .25s ease, transform .25s ease";
      el.style.opacity = "0";
      el.style.transform = "translateY(-6px)";
    });

    setTimeout(() => {
      input.style.display = "none";
      btn.style.display = "none";
    }, 260);

    message.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function checkAutoUnlock() {
    if (unlocked) return;
    if (input.value.trim() === PASSWORD) {
      unlock();
    }
  }

  function shake(el) {
    el.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-8px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(-4px)" },
        { transform: "translateX(2px)" },
        { transform: "translateX(0)" }
      ],
      { duration: 360, easing: "cubic-bezier(.2,.9,.3,1)" }
    );
  }

  // 🔥 Auto-unlock while typing
  input.addEventListener("input", checkAutoUnlock);

  // Button click (fallback)
  btn.addEventListener("click", () => {
    if (input.value.trim() === PASSWORD) {
      unlock();
    } else {
      shake(input);
      alert("Wrong password 💔");
      input.value = "";
      input.focus();
    }
  });

  // Enter key support
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.value.trim() === PASSWORD) {
        unlock();
      } else {
        shake(input);
        alert("Wrong password 💔");
        input.value = "";
      }
    }
  });

  // Focus input on load
  input.focus();

});
</script>
