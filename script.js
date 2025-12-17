// --- 1. EXPANDED DATABASE (With Lyrics & Covers) ---
const songDatabase = [
  // --- K-POP ---
  {
    title: "Dynamite",
    artist: "BTS",
    attributes: {
      year: 2020,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["pop", "disco", "k-pop"],
      vibe: "bright",
      tempo: "fast",
      theme: "happiness",
      popularity: "mega",
      gen: "3rd",
    },
    difficulty: "easy",
    // PRO TIP: In a real app, use real image URLs. These are placeholders.
    cover:
      "https://images.genius.com/df009633e4702b3838c793c7fd97adf3.1000x1000x1.png",
    lyric: "Shoes on, get up in the morn', cup of milk, let's rock and roll...",
  },
  {
    title: "God's Menu",
    artist: "Stray Kids",
    attributes: {
      year: 2020,
      solo: false,
      gender: "male",
      lang: "mixed",
      genre: ["k-pop", "hip-hop"],
      vibe: "dark",
      tempo: "energetic",
      theme: "ambition",
      popularity: "hit",
      gen: "4th",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/2/2b/Stray_Kids_-_Go_Live.png",
    lyric: "Cooking like a chef, I'm a 5 star Michelin...",
  },
  {
    title: "Pink Venom",
    artist: "BLACKPINK",
    attributes: {
      year: 2022,
      solo: false,
      gender: "female",
      lang: "mixed",
      genre: ["k-pop", "hip-hop"],
      vibe: "fierce",
      tempo: "fast",
      theme: "confidence",
      popularity: "mega",
      gen: "3rd",
    },
    difficulty: "easy",
    cover:
      "https://images.genius.com/34989ddd69f5af03e093eb46adf35ac4.300x300x1.jpg",
    lyric: "Kick in the door, waving the coco...",
  },

  // --- POP ---
  {
    title: "Flowers",
    artist: "Miley Cyrus",
    attributes: {
      year: 2023,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["pop", "disco"],
      vibe: "empowering",
      tempo: "medium",
      theme: "self-growth",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://m.media-amazon.com/images/M/MV5BYzU3ZTFkZDctYmNlNi00ZjMxLTgwNGItYTI1YjdmOWJiNTQzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    lyric: "I can buy myself flowers, write my name in the sand...",
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    attributes: {
      year: 2017,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["pop", "tropical"],
      vibe: "energetic",
      tempo: "medium",
      theme: "attraction",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png",
    lyric:
      "The club isn't the best place to find a lover so the bar is where I go...",
  },

  // --- HIP-HOP ---
  {
    title: "Stronger",
    artist: "Kanye West",
    attributes: {
      year: 2007,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "rap"],
      vibe: "energetic",
      tempo: "fast",
      theme: "confidence",
      popularity: "mega",
      gen: "old-school",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg",
    lyric: "N-n-now that that don't kill me, can only make me stronger...",
  },
  {
    title: "Money",
    artist: "Lisa",
    attributes: {
      year: 2021,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["k-pop", "hip-hop"],
      vibe: "fierce",
      tempo: "fast",
      theme: "confidence",
      popularity: "viral",
      gen: "3rd",
    },
    difficulty: "easy",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4802S72bEsv0bxjiWhXqB64uuU6GH1YSh9A&s",
    lyric:
      "Dolla' bills, dolla' bills. Watch it falling for me, I love the way that feels...",
  },
];

// --- 2. QUESTION BANK (Updated with "Special" Actions) ---
const questionBank = [
  // --- SPECIAL HINTS (New!) ---
  // 'action' defines a custom behavior instead of a Yes/No check.
  {
    id: 100,
    text: "Show me a lyric snippet?",
    action: "lyric",
    allowed: null,
    banned: null,
  },
  {
    id: 101,
    text: "Show the album cover (Blurred)?",
    action: "cover",
    allowed: null,
    banned: null,
  },

  // --- STANDARD QUESTIONS (Same as before) ---
  {
    id: 1,
    type: "fact",
    text: "Is the song released after 2015?",
    check: (s) => (s.attributes.year > 2015 ? "yes" : "no"),
    allowed: null,
    banned: null,
  },
  {
    id: 2,
    type: "fact",
    text: "Was it released in the 2020s?",
    check: (s) => (s.attributes.year >= 2020 ? "yes" : "no"),
    allowed: null,
    banned: null,
  },
  {
    id: 3,
    type: "fact",
    text: "Is the artist female?",
    check: (s) => (s.attributes.gender === "female" ? "yes" : "no"),
    allowed: null,
    banned: null,
  },
  {
    id: 4,
    type: "fact",
    text: "Is it performed by a solo artist?",
    check: (s) => (s.attributes.solo ? "yes" : "no"),
    allowed: null,
    banned: ["hip-hop"],
  },

  // K-Pop Logic
  {
    id: 20,
    type: "fact",
    text: "Is it a 4th Gen group (2018+)?",
    check: (s) => (s.attributes.gen === "4th" ? "yes" : "no"),
    allowed: ["k-pop"],
    banned: null,
  },
  {
    id: 22,
    type: "fact",
    text: "Is the song primarily in English?",
    check: (s) => (s.attributes.lang === "english" ? "yes" : "no"),
    allowed: ["k-pop"],
    banned: ["pop", "rock"],
  },

  // Genre Checks
  {
    id: 40,
    type: "fact",
    text: "Is this song classified as K-Pop?",
    check: (s) => (s.attributes.genre.includes("k-pop") ? "yes" : "no"),
    allowed: null,
    banned: ["k-pop"],
  },
  {
    id: 41,
    type: "fact",
    text: "Does it have Hip-Hop or Rap elements?",
    check: (s) => (s.attributes.genre.includes("hip-hop") ? "yes" : "no"),
    allowed: null,
    banned: ["hip-hop"],
  },

  // Vibe
  {
    id: 50,
    type: "fuzzy",
    text: "Is the tempo fast or energetic?",
    check: (s) =>
      ["fast", "energetic"].includes(s.attributes.tempo) ? "yes" : "no",
    allowed: null,
    banned: null,
  },
  {
    id: 51,
    type: "fuzzy",
    text: "Is the vibe dark or moody?",
    check: (s) =>
      ["dark", "melancholic", "dramatic"].includes(s.attributes.vibe)
        ? "yes"
        : "no",
    allowed: null,
    banned: null,
  },
  {
    id: 60,
    type: "fuzzy",
    text: "Does it have a well-known choreography?",
    check: (s) => (s.attributes.choreo ? "yes" : "no"),
    allowed: ["pop", "k-pop"],
    banned: ["rock"],
  },
];

const responsePool = {
  fact: { yes: ["Yes.", "Correct."], no: ["No.", "Incorrect."] },
  fuzzy: {
    yes: ["Definitely.", "Absolutely.", "Fans would say so."],
    no: ["Not really.", "I doubt it."],
    mixed: ["It's debatable."],
  },
};

// --- GAME VARIABLES ---
let currentSong = null;
let currentGenre = "all";
let currentOptions = [];
let askedQuestionIds = new Set();
let questionsLeft = 20;
let gameOver = false;

// --- START (Same logic) ---
function startGame(difficulty) {
  const selectedGenre = document.getElementById("genre-select").value;
  currentGenre = selectedGenre;

  const filteredSongs = songDatabase.filter((s) => {
    const difficultyMatch = s.difficulty === difficulty;
    const genreMatch =
      selectedGenre === "all" || s.attributes.genre.includes(selectedGenre);
    return difficultyMatch && genreMatch;
  });

  if (filteredSongs.length === 0) {
    alert(`No songs found for this selection.`);
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredSongs.length);
  currentSong = filteredSongs[randomIndex];

  questionsLeft = 20;
  gameOver = false;
  askedQuestionIds.clear();

  document.getElementById("clue-list").innerHTML = "";
  document.getElementById("guess-input").value = "";

  document.getElementById("start-screen").classList.remove("active");
  document.getElementById("game-screen").classList.add("active");
  document.getElementById("game-screen").classList.remove("hidden");

  const genreText =
    selectedGenre === "all" ? "Mixed" : selectedGenre.toUpperCase();
  document.getElementById(
    "current-difficulty"
  ).innerText = `${difficulty.toUpperCase()} (${genreText})`;

  updateStatus();
  refreshOptions();
  console.log("Song:", currentSong.title);
}

// --- REFRESH OPTIONS (Same logic) ---
function refreshOptions() {
  const availableQuestions = questionBank.filter((q) => {
    if (askedQuestionIds.has(q.id)) return false;
    if (q.banned && q.banned.includes(currentGenre)) return false;
    if (
      q.allowed &&
      !q.allowed.includes(currentGenre) &&
      currentGenre !== "all"
    )
      return false;
    return true;
  });

  if (availableQuestions.length === 0) {
    document.getElementById("dynamic-options").innerHTML =
      "<p>No more relevant questions!</p>";
    return;
  }

  const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
  currentOptions = shuffled.slice(0, 4);

  const container = document.getElementById("dynamic-options");
  container.innerHTML = "";

  currentOptions.forEach((q, index) => {
    const btn = document.createElement("button");
    btn.className = "q-btn";
    btn.innerText = q.text;
    btn.onclick = () => handleQuestionClick(index);
    container.appendChild(btn);
  });
}

// --- HANDLE CLICK (UPDATED FOR IMAGES/LYRICS) ---
function handleQuestionClick(index) {
  if (gameOver || questionsLeft <= 0) return;

  const selectedQ = currentOptions[index];
  askedQuestionIds.add(selectedQ.id);

  // CHECK FOR SPECIAL ACTIONS (Lyrics / Covers)
  if (selectedQ.action) {
    let content = "";

    if (selectedQ.action === "lyric") {
      content = `<span class="lyric-text">" ${currentSong.lyric} "</span>`;
    } else if (selectedQ.action === "cover") {
      // Check if cover exists, otherwise use a placeholder
      const imgUrl =
        currentSong.cover || "https://placehold.co/100x100?text=No+Cover";
      content = `<img src="${imgUrl}" class="clue-img" alt="Blurred Album Cover">`;
    }

    addClueToLog(selectedQ.text, content, "answer-neutral");
  } else {
    // STANDARD LOGIC
    const logicResult = selectedQ.check(currentSong) || "no";
    const typePool = responsePool[selectedQ.type] || responsePool["fact"];
    const phrasePool = typePool[logicResult] || typePool["no"];
    const finalAnswer =
      phrasePool[Math.floor(Math.random() * phrasePool.length)];

    let colorClass = "answer-neutral";
    if (logicResult === "yes") colorClass = "answer-positive";
    if (logicResult === "no") colorClass = "answer-negative";
    if (logicResult === "mixed") colorClass = "answer-uncertain";

    addClueToLog(selectedQ.text, finalAnswer, colorClass);
  }

  questionsLeft--;
  updateStatus();

  if (questionsLeft > 0) refreshOptions();
  else endGame(false);
}

function addClueToLog(question, answerHTML, colorClass) {
  const list = document.getElementById("clue-list");
  const li = document.createElement("li");
  // Note: answerHTML can now contain <img> or <span> tags
  li.innerHTML = `<div style="font-size: 0.85em; opacity: 0.8; margin-bottom: 2px;">${question}</div><div class="${colorClass}" style="font-size: 1.1em;">${answerHTML}</div>`;
  list.prepend(li);
}

function updateStatus() {
  const countEl = document.getElementById("question-count");
  countEl.innerText = questionsLeft;
  countEl.style.color = questionsLeft <= 5 ? "#cf6679" : "inherit";
}

function submitGuess() {
  if (gameOver) return;
  const input = document.getElementById("guess-input");
  const userGuess = input.value.trim().toLowerCase();
  const actualTitle = currentSong.title.toLowerCase();

  if (!userGuess) return;

  if (userGuess === actualTitle) {
    endGame(true);
  } else {
    questionsLeft--;
    updateStatus();
    addClueToLog(`Is it "${input.value}"?`, "Nope.", "answer-negative");
    input.value = "";
    input.focus();
    if (questionsLeft <= 0) endGame(false);
  }
}

function endGame(win) {
  gameOver = true;
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");
  const title = document.getElementById("modal-title");
  const msg = document.getElementById("modal-message");

  if (win) {
    title.innerText = "🎉 You Found It!";
    title.style.color = "#03dac6";
    // Show the unblurred cover on win!
    const imgUrl = currentSong.cover || "";
    msg.innerHTML = `
            <img src="${imgUrl}" style="width:150px; border-radius:10px; margin-bottom:10px;"><br>
            The song was <strong>${currentSong.title}</strong> by ${currentSong.artist}.
        `;
  } else {
    title.innerText = "💀 Game Over";
    title.style.color = "#cf6679";
    const imgUrl = currentSong.cover || "";
    msg.innerHTML = `
            <img src="${imgUrl}" style="width:100px; border-radius:10px; opacity: 0.5; margin-bottom:10px;"><br>
            You ran out of questions!<br>The song was <strong>${currentSong.title}</strong>.
        `;
  }
}
