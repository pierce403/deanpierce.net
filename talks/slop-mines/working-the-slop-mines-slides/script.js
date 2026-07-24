(function () {
  const moodClasses = [
    "mood-boardroom",
    "mood-compliance",
    "mood-fracture",
    "mood-mine",
    "mood-industrial",
    "mood-warning",
    "mood-uncanny",
    "mood-hopeful",
    "mood-eldritch",
    "mood-exit"
  ];

  const steps = Array.from(document.querySelectorAll(".step"));
  const sanityFill = document.getElementById("sanity-fill");
  const sanityValue = document.getElementById("sanity-value");
  const slideCounter = document.getElementById("slide-counter");

  function sanityColor(value) {
    if (value > 66) return "#39ff88";
    if (value > 33) return "#ffbd4a";
    if (value > 10) return "#ff4f4f";
    return "#ff4fd8";
  }

  function updateHud(step) {
    if (!step) return;

    const mood = step.dataset.mood || "mine";
    const sanity = Number.parseInt(step.dataset.sanity || "100", 10);
    const index = steps.indexOf(step);
    const clampedSanity = Math.max(0, Math.min(100, sanity));

    document.body.classList.remove(...moodClasses);
    document.body.classList.add(`mood-${mood}`);
    document.documentElement.style.setProperty("--sanity-color", sanityColor(clampedSanity));

    if (sanityFill) {
      sanityFill.style.width = `${clampedSanity}%`;
    }

    if (sanityValue) {
      sanityValue.textContent = `${clampedSanity}%`;
    }

    if (slideCounter && index >= 0) {
      const current = String(index + 1).padStart(2, "0");
      const total = String(steps.length).padStart(2, "0");
      slideCounter.textContent = `${current} / ${total}`;
    }
  }

  document.addEventListener("impress:stepenter", function (event) {
    updateHud(event.target);
  });

  if (typeof impress === "function") {
    impress().init();
    updateHud(document.querySelector(".step.active") || steps[0]);
  } else {
    document.body.classList.add("cdn-missing");
    updateHud(steps[0]);
  }
})();
