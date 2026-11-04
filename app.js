const CREW = [
  { n: "Curly", r: "Captain", s: "The captain of the Tulpar and the person whose choices hang over the whole story.", m: "You play as him in the scenes set before the crash. How you feel about him is one of the game's big open questions." },
  { n: "Jimmy", r: "Co-pilot", s: "The co-pilot who ends up in charge when things go wrong.", m: "He is your viewpoint in the scenes set after the crash, trying to hold a struggling crew together." },
  { n: "Anya", r: "Nurse", s: "The soft-spoken ship's nurse, caring for everyone on board.", m: "Quiet and observant, she is the closest thing the crew has to a conscience and a caretaker." },
  { n: "Swansea", r: "Engineer", s: "The acerbic engineer who keeps the ship running and says exactly what he thinks.", m: "Sharp, tired, and funny in a dry way, he tends to see problems before anyone else admits them." },
  { n: "Daisuke", r: "Intern", s: "The perpetually optimistic intern and Swansea's apprentice.", m: "Eager and upbeat, he is the brightest spirit on a dark ship, which makes everything around him land harder." }
];
const grid = document.getElementById("crewGrid");
grid.innerHTML = CREW.map(c => `<button class="member" aria-expanded="false"><span class="role">${c.r}</span><h3>${c.n}</h3><p>${c.s}</p><p class="more">${c.m}</p></button>`).join("");
grid.querySelectorAll(".member").forEach(b => b.addEventListener("click", () => b.setAttribute("aria-expanded", b.getAttribute("aria-expanded") !== "true")));

const Q = [
  { q: "A plan falls apart at the last minute. You:", a: [["Take charge and decide fast", "Jimmy"], ["Quietly check that everyone is okay", "Anya"], ["Point out what everyone missed", "Swansea"], ["Stay positive and ask how to help", "Daisuke"], ["Keep your thoughts to yourself", "Curly"]] },
  { q: "Your ideal evening off:", a: [["Making sure the group is fed and comfortable", "Anya"], ["Fixing something just because it bugs you", "Swansea"], ["A game night with way too much enthusiasm", "Daisuke"], ["A drink and a long silence", "Curly"], ["Planning the next day carefully", "Jimmy"]] },
  { q: "Friends would describe you as:", a: [["Dependable", "Jimmy"], ["Gentle", "Anya"], ["Blunt", "Swansea"], ["Sunny", "Daisuke"], ["Hard to read", "Curly"]] },
  { q: "Under stress, you tend to:", a: [["Take on more than you should", "Jimmy"], ["Worry about everyone else first", "Anya"], ["Get sarcastic", "Swansea"], ["Crack a joke and keep going", "Daisuke"], ["Go quiet and shut down", "Curly"]] },
  { q: "Pick a superpower:", a: [["Always knowing the right call", "Jimmy"], ["Healing anyone", "Anya"], ["Fixing any machine", "Swansea"], ["Making any room feel better", "Daisuke"], ["Disappearing when you need to", "Curly"]] },
  { q: "Your biggest strength:", a: [["Responsibility", "Jimmy"], ["Compassion", "Anya"], ["Honesty", "Swansea"], ["Hope", "Daisuke"], ["Resolve", "Curly"]] }
];
const OUT = {
  Jimmy: "Jimmy: the responsible one. You step up when it counts, even when the weight is heavier than it should be.",
  Anya: "Anya: the caretaker. You notice who is hurting before they say a word, and you keep people going.",
  Swansea: "Swansea: the straight talker. Dry, capable, and unwilling to pretend things are fine when they are not.",
  Daisuke: "Daisuke: the bright spot. Your optimism lifts every room, and the crew is lucky to have you.",
  Curly: "Curly: the closed book. Driven and deep, with a lot going on beneath the surface."
};
const box = document.getElementById("quizBox");
let i = 0, tally = {};
function show() {
  if (i >= Q.length) {
    const top = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
    box.innerHTML = `<div class="res"><div class="qn">Your result</div><h3>${top}</h3><p>${OUT[top]}</p><button class="btn" id="again" type="button">Take it again</button></div>`;
    document.getElementById("again").onclick = () => { i = 0; tally = {}; show(); };
    return;
  }
  const q = Q[i];
  box.innerHTML = `<div class="qn">Question ${i + 1} of ${Q.length}</div><h3>${q.q}</h3><div class="opts">${q.a.map((o, k) => `<button type="button" data-k="${k}">${o[0]}</button>`).join("")}</div>`;
  box.querySelectorAll(".opts button").forEach(b => b.addEventListener("click", () => {
    const who = q.a[+b.dataset.k][1];
    tally[who] = (tally[who] || 0) + 1;
    i++; show();
  }));
}
show();

const sb = document.getElementById("spoilBtn"), sx = document.getElementById("spoilBox");
sb.addEventListener("click", () => {
  const open = sx.hidden;
  sx.hidden = !open;
  sb.setAttribute("aria-expanded", open);
  sb.textContent = open ? "Hide spoiler discussion prompts" : "Show spoiler discussion prompts";
});
