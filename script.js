// ==========================================
// 0. SPOTIFY CONFIGURATION
// ==========================================
const clientId = "46046e0164f64d928c7ee75b441f13c2";
const clientSecret = "034073a2828b4e5684371e9721870f74";

// Helper: Get Access Token
async function getSpotifyToken() {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) throw new Error("Auth Failed");
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Spotify Auth Error:", error);
    return null;
  }
}

// Helper: Get Track ID AND Cover Art
async function fetchSpotifyData(title, artist) {
  try {
    const token = await getSpotifyToken();
    if (!token) return null;

    const cleanTitle = title.replace(/[^\w\s]/gi, "");
    const query = encodeURIComponent(`track:${cleanTitle} artist:${artist}`);

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`,
      { headers: { Authorization: "Bearer " + token } }
    );

    const data = await response.json();
    if (data.tracks && data.tracks.items.length > 0) {
      const track = data.tracks.items[0];
      return {
        id: track.id,
        cover: track.album.images[1] ? track.album.images[1].url : null,
      };
    }
  } catch (e) {
    console.error("Spotify Search Error:", e);
  }
  return null;
}

// --- 1. MASSIVE EXPANDED DATABASE ---
const songDatabase = [
  // ==========================================
  // 🇰🇷 K-POP
  // ==========================================
  // --- EASY ---
  {
    title: "Butter",
    artist: "BTS",
    attributes: {
      year: 2021,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["pop", "k-pop"],
      vibe: "bright",
      tempo: "fast",
      theme: "confidence",
      popularity: "mega",
      gen: "3rd",
    },
    difficulty: "easy",
    cover: "https://upload.wikimedia.org/wikipedia/en/d/db/BTS_-_Butter.png",
    lyric: "Smooth like butter, like a criminal undercover...",
    agency: "HYBE",
    other_hit: "Dynamite",
    // ADDED: rapper-leader, self-produced
    tags: [
      "group",
      "boy-group",
      "english-track",
      "big-4",
      "mega-hit",
      "summer-vibe",
      "rapper-leader",
      "self-produced",
    ],
    signature: [
      "Is the album art distinctively yellow?",
      "Does the chorus mention a 'criminal undercover'?",
      "Is it a full English track released in summer?",
    ],
  },
  {
    title: "Boombayah",
    artist: "BLACKPINK",
    attributes: {
      year: 2016,
      solo: false,
      gender: "female",
      lang: "mixed",
      genre: ["k-pop", "edm"],
      vibe: "fierce",
      tempo: "fast",
      theme: "party",
      popularity: "mega",
      gen: "3rd",
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/e/e7/Blackpink_-_Square_One.png",
    lyric: "Blackpink in your area!",
    agency: "YG Entertainment",
    other_hit: "Whistle",
    tags: ["group", "girl-group", "big-4", "debut-song", "high-energy"],
    signature: [
      "Is this the group's debut song along with 'Whistle'?",
      "Does the chorus chant 'Yah yah yah boombayah'?",
      "Is there a famous hair-flip choreography?",
    ],
  },
  {
    title: "Fake Love",
    artist: "BTS",
    attributes: {
      year: 2018,
      solo: false,
      gender: "male",
      lang: "mixed",
      genre: ["k-pop", "emo-hip-hop"],
      vibe: "dark",
      tempo: "medium",
      theme: "heartbreak",
      popularity: "mega",
      gen: "3rd",
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/9/93/Love_Yourself_Tear_cover.jpg",
    lyric: "I'm so sick of this fake love...",
    agency: "HYBE",
    other_hit: "DNA",
    tags: [
      "group",
      "boy-group",
      "big-4",
      "billboard-hit",
      "emo-vibes",
      "rapper-leader",
    ],
    signature: [
      "Is the key lyric 'I'm so sick of this fake love'?",
      "Did they perform this at the Billboard Music Awards?",
      "Is the choreography famous for the 'hear no evil, see no evil' pose?",
    ],
  },
  {
    title: "Super",
    artist: "SEVENTEEN",
    attributes: {
      year: 2023,
      solo: false,
      gender: "male",
      lang: "mixed",
      genre: ["k-pop", "workout"],
      vibe: "energetic",
      tempo: "fast",
      theme: "confidence",
      popularity: "hit",
      gen: "3rd",
    },
    difficulty: "easy",
    cover: "https://upload.wikimedia.org/wikipedia/en/9/90/Seventeen_-_FML.jpg",
    lyric: "Darumdarimda...",
    agency: "PLEDIS",
    other_hit: "HOT",
    tags: [
      "group",
      "boy-group",
      "self-produced",
      "many-members",
      "complex-choreo",
      "rapper-leader",
    ],
    signature: [
      "Is the song inspired by the Monkey King (Sun Wukong)?",
      "Does the choreography involve over 200 backup dancers?",
      "Is the hook 'Darumdarimda'?",
    ],
  },
  {
    title: "How You Like That",
    artist: "BLACKPINK",
    attributes: {
      year: 2020,
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
      "https://upload.wikimedia.org/wikipedia/en/a/a2/Blackpink_-_How_You_Like_That.png",
    lyric: "Look at you, now look at me...",
    agency: "YG Entertainment",
    other_hit: "DDU-DU DDU-DU",
    // NOTE: BLACKPINK has no official leader, so 'rapper-leader' is correctly omitted
    tags: [
      "group",
      "girl-group",
      "big-4",
      "iconic-choreo",
      "fashion",
      "anthem",
    ],
    signature: [
      "Did the music video feature modernized Hanbok outfits?",
      "Is the opening line 'Blackpink in your area'?",
      "Is the chorus an 'anti-drop' or empty drop?",
    ],
  },
  {
    title: "LOVE DIVE",
    artist: "IVE",
    attributes: {
      year: 2022,
      solo: false,
      gender: "female",
      lang: "mixed",
      genre: ["k-pop", "pop"],
      vibe: "dreamy",
      tempo: "medium",
      theme: "attraction",
      popularity: "hit",
      gen: "4th",
    },
    difficulty: "easy",
    cover: "https://upload.wikimedia.org/wikipedia/en/5/52/Ive_-_Love_Dive.png",
    lyric: "Narcissistic, my god I love it...",
    agency: "Starship",
    other_hit: "After LIKE",
    tags: ["group", "girl-group", "viral-reels", "iconic-choreo", "visuals"],
    signature: [
      "Does the chorus start with the word 'Narcissistic'?",
      "Is the 'mirror dance' the key choreography?",
      "Is the concept based on Cupid or love?",
    ],
  },
  {
    title: "Attention",
    artist: "NewJeans",
    attributes: {
      year: 2022,
      solo: false,
      gender: "female",
      lang: "mixed",
      genre: ["k-pop", "r&b"],
      vibe: "chill",
      tempo: "medium",
      theme: "attraction",
      popularity: "viral",
      gen: "4th",
    },
    difficulty: "easy",
    cover: "https://upload.wikimedia.org/wikipedia/en/d/db/New_Jeans_EP.jpg",
    lyric: "You got me looking for attention...",
    agency: "ADOR (HYBE)",
    other_hit: "Hype Boy",
    // NOTE: NewJeans has no official leader
    tags: ["group", "girl-group", "big-4", "debut-hit", "y2k-style", "fresh"],
    signature: [
      "Was this dropped as a surprise debut with no teaser?",
      "Is the long hair flip a key move?",
      "Is the vibe distinctly Y2K/retro?",
    ],
  },
  {
    title: "Love Shot",
    artist: "EXO",
    attributes: {
      year: 2018,
      solo: false,
      gender: "male",
      lang: "mixed",
      genre: ["k-pop", "r&b"],
      vibe: "sensual",
      tempo: "medium",
      theme: "attraction",
      popularity: "hit",
      gen: "3rd",
    },
    difficulty: "easy",
    cover: "https://upload.wikimedia.org/wikipedia/en/6/6c/Love_Shot.jpg",
    lyric: "It's the love shot...",
    agency: "SM Entertainment",
    other_hit: "Growl",
    tags: [
      "group",
      "boy-group",
      "big-4",
      "sexy-concept",
      "iconic-choreo",
      "suit-dance",
    ],
    signature: [
      "Is the 'gun' hand gesture the main dance move?",
      "Are colorful suits iconic for this era?",
      "Is the vibe extremely sensual?",
    ],
  },
  {
    title: "Fancy",
    artist: "TWICE",
    attributes: {
      year: 2019,
      solo: false,
      gender: "female",
      lang: "mixed",
      genre: ["k-pop", "pop"],
      vibe: "energetic",
      tempo: "fast",
      theme: "attraction",
      popularity: "hit",
      gen: "3rd",
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/d3/Twice_-_Fancy_You.png",
    lyric: "Fancy, you!",
    agency: "JYP Entertainment",
    other_hit: "Cheer Up",
    tags: ["group", "girl-group", "big-4", "iconic-choreo", "concept-switch"],
    signature: [
      "Did this mark a shift from 'cute' to 'mature' concepts?",
      "Is the key hand gesture framed near the face?",
      "Is the chorus hook simply 'Fancy, you'?",
    ],
  },
  {
    title: "Very Nice",
    artist: "SEVENTEEN",
    attributes: {
      year: 2016,
      solo: false,
      gender: "male",
      lang: "mixed",
      genre: ["k-pop", "pop"],
      vibe: "energetic",
      tempo: "fast",
      theme: "happiness",
      popularity: "hit",
      gen: "3rd",
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/7/7b/Love_%26_Letter_Repackage_Album.jpg",
    lyric: "Aju Nice!",
    agency: "PLEDIS (HYBE)",
    other_hit: "Don't Wanna Cry",
    // ADDED: rapper-leader (S.Coups)
    tags: [
      "group",
      "boy-group",
      "self-produced",
      "concert-closer",
      "high-energy",
      "many-members",
      "rapper-leader",
    ],
    signature: [
      "Are suspenders a key part of the outfit?",
      "Is the song looped endlessly at concerts?",
      "Is the chorus hook 'Aju Nice'?",
    ],
  },
  {
    title: "Gangnam Style",
    artist: "PSY",
    attributes: {
      year: 2012,
      solo: true,
      gender: "male",
      lang: "mixed",
      genre: ["k-pop", "dance"],
      vibe: "funny",
      tempo: "fast",
      theme: "party",
      popularity: "legendary",
      gen: "2nd",
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/a/ad/Gangnam_Style_Official_Cover.png",
    lyric: "Oppan Gangnam Style!",
    agency: "PNATION",
    other_hit: "Gentleman",
    tags: ["solo", "viral-global", "iconic-choreo", "meme", "legendary"],
    signature: [
      "Is the 'horse riding' dance world-famous?",
      "Was this the first YouTube video to hit 1 Billion views?",
      "Is the artist known for wearing sunglasses and a suit?",
    ],
  },

  // --- MEDIUM ---
  {
    title: "Miroh",
    artist: "Stray Kids",
    attributes: {
      year: 2019,
      solo: false,
      gender: "male",
      lang: "mixed",
      genre: ["k-pop", "edm"],
      vibe: "energetic",
      tempo: "fast",
      theme: "ambition",
      popularity: "hit",
      gen: "4th",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/66/Stray_Kids_-_Cl%C3%A9_1_Miroh.png",
    lyric: "Stray Kids woo!",
    agency: "JYP Entertainment",
    other_hit: "God's Menu",
    // ADDED: rapper-leader (Bang Chan)
    tags: [
      "group",
      "boy-group",
      "self-produced",
      "noise-music",
      "big-4",
      "chant-chorus",
      "rapper-leader",
    ],
    signature: [
      "Is the setting of the MV an urban jungle?",
      "Does the choreography include a Haka-style stomp?",
      "Is the hook just the group chanting their name?",
    ],
  },
  {
    title: "Guerrilla",
    artist: "ATEEZ",
    attributes: {
      year: 2022,
      solo: false,
      gender: "male",
      lang: "mixed",
      genre: ["k-pop", "rock"],
      vibe: "aggressive",
      tempo: "fast",
      theme: "revolution",
      popularity: "hit",
      gen: "4th",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/2/29/Ateez_-_The_World_EP.1_Movement.jpg",
    lyric: "Break the wall!",
    agency: "KQ Entertainment",
    other_hit: "HALAZIA",
    tags: ["group", "boy-group", "dark-concept", "performance-heavy", "loud"],
    signature: [
      "Is the main chant 'Break the wall'?",
      "Is the genre described as Cyberpunk/Rock?",
      "Is the ending famous for a high note scream?",
    ],
  },
  {
    title: "Secret Story of the Swan",
    artist: "IZ*ONE",
    attributes: {
      year: 2020,
      solo: false,
      gender: "female",
      lang: "mixed",
      genre: ["k-pop", "edm"],
      vibe: "elegant",
      tempo: "fast",
      theme: "fantasy",
      popularity: "hit",
      gen: "4th",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/9/95/Iz*One_-_Oneiric_Diary.jpg",
    lyric: "Like a swan, swan, swan...",
    agency: "Off The Record",
    other_hit: "Fiesta",
    tags: [
      "group",
      "girl-group",
      "survival-show",
      "temporary-group",
      "elegant-concept",
    ],
    signature: [
      "Is the chorus 'Like a swan, swan, swan'?",
      "Was the group formed from Produce 48?",
      "Is the concept based on a fairytale?",
    ],
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
    agency: "JYP",
    other_hit: "Miroh",
    // ADDED: rapper-leader (Bang Chan)
    tags: [
      "group",
      "boy-group",
      "self-produced",
      "dark-concept",
      "noise-music",
      "big-4",
      "rapper-leader",
    ],
    signature: [
      "Is food imagery central to the song’s concept?",
      "Does the chorus feel more like a chant than a melody?",
      "Is the song often associated with the phrase '5-star'?",
    ],
  },
  {
    title: "Wonderland",
    artist: "ATEEZ",
    attributes: {
      year: 2019,
      solo: false,
      gender: "male",
      lang: "mixed",
      genre: ["k-pop", "rock-pop"],
      vibe: "powerful",
      tempo: "fast",
      theme: "war",
      popularity: "hit",
      gen: "4th",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/f/f9/Ateez_-_Treasure_Ep.Fin_All_to_Action.png",
    lyric: "Ka-ja! (Let's go!)",
    agency: "KQ Entertainment",
    other_hit: "Guerrilla",
    // ADDED: rapper-leader (Hongjoong), self-produced
    tags: [
      "group",
      "boy-group",
      "performance-heavy",
      "pirate-concept",
      "dark-concept",
      "rapper-leader",
      "self-produced",
    ],
    signature: [
      "Is there a marching band concept?",
      "Is it the grand finale of a 'Treasure' series?",
      "Does it feature a pirate-like flag wave?",
    ],
  },
  {
    title: "Blue Hour",
    artist: "TXT",
    attributes: {
      year: 2020,
      solo: false,
      gender: "male",
      lang: "mixed",
      genre: ["k-pop", "disco"],
      vibe: "bright",
      tempo: "medium",
      theme: "fantasy",
      popularity: "hit",
      gen: "4th",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/7/7e/TXT_-_Minisode1_Blue_Hour.png",
    lyric: "Cuz imagination...",
    agency: "HYBE (BigHit)",
    other_hit: "0X1=LOVESONG",
    tags: ["group", "boy-group", "big-4", "crop-top", "magical"],
    signature: [
      "Did the members wear crop tops in the video?",
      "Is there a dance break involving coats and hats?",
      "Is the vibe a magical disco fantasy?",
    ],
  },
  {
    title: "Psycho",
    artist: "Red Velvet",
    attributes: {
      year: 2019,
      solo: false,
      gender: "female",
      lang: "mixed",
      genre: ["k-pop", "r&b"],
      vibe: "dark",
      tempo: "medium",
      theme: "love-hate",
      popularity: "hit",
      gen: "3rd",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/0/0f/Red_Velvet_-_The_ReVe_Festival_Finale.png",
    lyric: "You got me feeling like a psycho...",
    agency: "SM Entertainment",
    other_hit: "Bad Boy",
    // ADDED: rapper-leader (Irene)
    tags: [
      "group",
      "girl-group",
      "big-4",
      "vocals-heavy",
      "elegant",
      "rapper-leader",
    ],
    signature: [
      "Does the instrumental use pizzicato strings?",
      "Is the concept gothic and elegant?",
      "Was it released as a finale to a festival trilogy?",
    ],
  },
  {
    title: "Antifragile",
    artist: "LE SSERAFIM",
    attributes: {
      year: 2022,
      solo: false,
      gender: "female",
      lang: "mixed",
      genre: ["k-pop", "reggaeton"],
      vibe: "confident",
      tempo: "fast",
      theme: "strength",
      popularity: "hit",
      gen: "4th",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/c/c5/Le_Sserafim_-_Antifragile.png",
    lyric: "Anti-ti-ti-ti-fragile...",
    agency: "Source Music (HYBE)",
    other_hit: "Unforgiven",
    tags: ["group", "girl-group", "big-4", "viral-dance", "cat-dance"],
    signature: [
      "Is the beat influenced by Reggaeton?",
      "Is the main dance move a muscle flex?",
      "Is the theme about resilience and strength?",
    ],
  },
  {
    title: "Kick It",
    artist: "NCT 127",
    attributes: {
      year: 2020,
      solo: false,
      gender: "male",
      lang: "mixed",
      genre: ["k-pop", "hip-hop"],
      vibe: "energetic",
      tempo: "fast",
      theme: "confidence",
      popularity: "hit",
      gen: "3rd",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/1/12/NCT_127_-_Neo_Zone.png",
    lyric: "Let me introduce you to some new thangs...",
    agency: "SM Entertainment",
    other_hit: "Cherry Bomb",
    // ADDED: rapper-leader (Taeyong)
    tags: [
      "group",
      "boy-group",
      "big-4",
      "martial-arts",
      "noise-music",
      "rapper-leader",
    ],
    signature: [
      "Does the song reference Bruce Lee?",
      "Is the choreography martial-arts inspired?",
      "Is the signature lyric 'New Thangs'?",
    ],
  },
  {
    title: "Wannabe",
    artist: "ITZY",
    attributes: {
      year: 2020,
      solo: false,
      gender: "female",
      lang: "mixed",
      genre: ["k-pop", "dance"],
      vibe: "empowering",
      tempo: "fast",
      theme: "self-love",
      popularity: "hit",
      gen: "4th",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/2/23/Itzy_-_It%27z_Me.png",
    lyric: "I don't wanna be somebody, just wanna be me...",
    agency: "JYP Entertainment",
    other_hit: "DALLA DALLA",
    tags: ["group", "girl-group", "big-4", "shoulder-dance", "teen-crush"],
    signature: [
      "Is the 'shoulder dance' the viral moment?",
      "Is the theme refusing to be someone else?",
      "Does it start with a clock winding sound?",
    ],
  },
  {
    title: "TOMBOY",
    artist: "(G)I-DLE",
    attributes: {
      year: 2022,
      solo: false,
      gender: "female",
      lang: "mixed",
      genre: ["k-pop", "rock"],
      vibe: "rebellious",
      tempo: "fast",
      theme: "independence",
      popularity: "hit",
      gen: "4th",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/3/36/I_Never_Die_-_%28G%29I-dle.png",
    lyric: "Yeah, I'm a Tomboy...",
    agency: "Cube Entertainment",
    other_hit: "Queencard",
    // ADDED: rapper-leader (Soyeon)
    tags: [
      "group",
      "girl-group",
      "self-produced",
      "rock-concept",
      "censored-rap",
      "rapper-leader",
    ],
    signature: [
      "Is there a censored 'beep' in the chorus?",
      "Is the concept rebellious and punk-rock?",
      "Does the bridge reference a 'Barbie doll'?",
    ],
  },

  // --- HARD ---
  {
    title: "Black Swan",
    artist: "BTS",
    attributes: {
      year: 2020,
      solo: false,
      gender: "male",
      lang: "mixed",
      genre: ["k-pop", "emo-hip-hop"],
      vibe: "melancholic",
      tempo: "medium",
      theme: "art",
      popularity: "acclaim",
      gen: "3rd",
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/9/91/Map_of_the_Soul_7.png",
    lyric: "Do your thang, do your thang with me now...",
    agency: "HYBE",
    other_hit: "Fake Love",
    // ADDED: rapper-leader
    tags: [
      "group",
      "boy-group",
      "artistic",
      "modern-dance",
      "deep-meaning",
      "rapper-leader",
    ],
    signature: [
      "Is the choreography usually performed barefoot?",
      "Is the theme about the fear of losing passion for art?",
      "Was the art film performed by a dance troupe?",
    ],
  },
  {
    title: "Halazia",
    artist: "ATEEZ",
    attributes: {
      year: 2022,
      solo: false,
      gender: "male",
      lang: "mixed",
      genre: ["k-pop", "edm"],
      vibe: "dark",
      tempo: "fast",
      theme: "freedom",
      popularity: "fandom-hit",
      gen: "4th",
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/2/26/Ateez_-_Spin_Off_From_the_Witness.png",
    lyric: "Halazia, Halazia...",
    agency: "KQ Entertainment",
    other_hit: "Say My Name",
    // ADDED: rapper-leader
    tags: [
      "group",
      "boy-group",
      "dystopian",
      "lore-heavy",
      "dramatic",
      "rapper-leader",
    ],
    signature: [
      "Is the main hook the chanting of a specific made-up word?",
      "Is the concept dystopian/revolution?",
      "Is there a giant scarecrow in the MV?",
    ],
  },
  {
    title: "The Eve",
    artist: "EXO",
    attributes: {
      year: 2017,
      solo: false,
      gender: "male",
      lang: "mixed",
      genre: ["k-pop", "r&b"],
      vibe: "sensual",
      tempo: "medium",
      theme: "anticipation",
      popularity: "b-side-hit",
      gen: "3rd",
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/c/c2/The_War_Exo_album.jpg",
    lyric: "What's the situation...",
    agency: "SM Entertainment",
    other_hit: "Ko Ko Bop",
    tags: [
      "group",
      "boy-group",
      "big-4",
      "sexy-concept",
      "b-side",
      "concert-favorite",
    ],
    signature: [
      "Is this a B-side that is as famous as the title track?",
      "Is the choreography known for body rolls?",
      "Is it the opening track of 'The War' album?",
    ],
  },
  {
    title: "Don't Wanna Cry",
    artist: "SEVENTEEN",
    attributes: {
      year: 2017,
      solo: false,
      gender: "male",
      lang: "mixed",
      genre: ["k-pop", "edm"],
      vibe: "emotional",
      tempo: "medium",
      theme: "heartbreak",
      popularity: "hit",
      gen: "3rd",
    },
    difficulty: "hard",
    cover: "https://upload.wikimedia.org/wikipedia/en/e/e0/Seventeen_-_Al1.png",
    lyric: "Ulgo shipji ana...",
    agency: "PLEDIS",
    other_hit: "HOT",
    // ADDED: rapper-leader
    tags: [
      "group",
      "boy-group",
      "self-produced",
      "synchronized-dance",
      "edm-drop",
      "rapper-leader",
    ],
    signature: [
      "Does the chorus choreography start on the knees?",
      "Is it an EDM track with an emotional drop?",
      "Is the key lyric 'Ulgo shipji ana'?",
    ],
  },
  {
    title: "The 7th Sense",
    artist: "NCT U",
    attributes: {
      year: 2016,
      solo: false,
      gender: "male",
      lang: "korean",
      genre: ["k-pop", "r&b"],
      vibe: "dreamy",
      tempo: "slow",
      theme: "mystery",
      popularity: "cult-classic",
      gen: "3rd",
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/7/7e/NCT_U_-_The_7th_Sense.png",
    lyric: "Open your eyes...",
    agency: "SM Entertainment",
    other_hit: "Make A Wish",
    // ADDED: rapper-leader (Taeyong led this unit)
    tags: [
      "group",
      "boy-group",
      "big-4",
      "debut-song",
      "difficult-choreo",
      "rapper-leader",
    ],
    signature: [
      "Is this the group's debut song?",
      "Is the vibe dreamy and trap-influenced?",
      "Is the choreography considered extremely difficult/groovy?",
    ],
  },
  {
    title: "Love Poem",
    artist: "IU",
    attributes: {
      year: 2019,
      solo: true,
      gender: "female",
      lang: "korean",
      genre: ["k-pop", "ballad"],
      vibe: "sad",
      tempo: "slow",
      theme: "comfort",
      popularity: "chart-topper",
      gen: "2nd",
    },
    difficulty: "hard",
    cover: "https://upload.wikimedia.org/wikipedia/en/f/f6/IU_-_Love_Poem.png",
    lyric: "I'll be there, behind you who walks alone...",
    agency: "EDAM",
    other_hit: "Good Day",
    tags: ["solo", "vocal-queen", "emotional", "chart-monster"],
    signature: [
      "Did the artist have blue hair for this era?",
      "Is it a rock-ballad dedicated to comfort?",
      "Did it achieve an All-Kill on the charts?",
    ],
  },
  {
    title: "View",
    artist: "SHINee",
    attributes: {
      year: 2015,
      solo: false,
      gender: "male",
      lang: "mixed",
      genre: ["k-pop", "house"],
      vibe: "chill",
      tempo: "medium",
      theme: "beauty",
      popularity: "classic",
      gen: "2nd",
    },
    difficulty: "hard",
    cover: "https://upload.wikimedia.org/wikipedia/en/3/3c/Shinee_-_Odd.jpg",
    lyric: "Neomu areumdaun-daun-daun-daun view...",
    agency: "SM Entertainment",
    other_hit: "Replay",
    tags: ["group", "boy-group", "big-4", "deep-house", "summer-vibe"],
    signature: [
      "Is this considered a pioneering Deep House K-pop song?",
      "Are the outfits casual street clothes?",
      "Is the repetition of 'Down' (Daun) in the chorus prominent?",
    ],
  },
  {
    title: "Criminal",
    artist: "Taemin",
    attributes: {
      year: 2020,
      solo: true,
      gender: "male",
      lang: "korean",
      genre: ["k-pop", "synthwave"],
      vibe: "dark",
      tempo: "medium",
      theme: "obsession",
      popularity: "acclaim",
      gen: "2nd",
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/7/73/Taemin_-_Never_Gonna_Dance_Again_-_Act_1.png",
    lyric: "Destroy me more...",
    agency: "SM Entertainment",
    other_hit: "Move",
    tags: ["solo", "big-4", "artistic", "performance-king", "concept-heavy"],
    signature: [
      "Does the choreography involve tied hands?",
      "Is the genre Synthwave?",
      "Is the theme Stockholm Syndrome?",
    ],
  },

  // ==========================================
  // 🎤 POP
  // ==========================================
  // --- EASY ---
  {
    title: "Anti-Hero",
    artist: "Taylor Swift",
    attributes: {
      year: 2022,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["pop", "synth-pop"],
      vibe: "introspective",
      tempo: "medium",
      theme: "insecurity",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png",
    lyric: "It's me, hi, I'm the problem, it's me...",
    other_hit: "Shake It Off",
    agency: null,
    tags: ["solo", "mega-star", "lyrics-focus", "viral-sound"],
    signature: [
      "Does the chorus start with 'It's me, hi'?",
      "Is the music video about her own funeral/nightmare?",
      "Is the theme self-loathing?",
    ],
  },
  {
    title: "California Gurls",
    artist: "Katy Perry",
    attributes: {
      year: 2010,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["pop", "disco"],
      vibe: "bright",
      tempo: "medium",
      theme: "summer",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/c/c5/California_Gurls_Single_Cover.png",
    lyric: "California girls, we're unforgettable...",
    agency: "Capitol",
    other_hit: "Firework",
    tags: ["solo", "snoop-dogg", "summer-anthem", "candy-concept"],
    signature: [
      "Does it feature Snoop Dogg?",
      "Is the music video candy-themed?",
      "Is it an answer song to 'Empire State of Mind'?",
    ],
  },
  {
    title: "What Makes You Beautiful",
    artist: "One Direction",
    attributes: {
      year: 2011,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["pop", "boyband"],
      vibe: "bright",
      tempo: "fast",
      theme: "romance",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/7/74/One_Direction_-_What_Makes_You_Beautiful_cover.jpg",
    lyric: "Baby you light up my world like nobody else...",
    agency: "Syco",
    other_hit: "Story of My Life",
    tags: ["group", "boy-group", "debut-single", "beach-video"],
    signature: [
      "Is this the group's debut single?",
      "Does the chorus say 'Baby you light up my world'?",
      "Was the video filmed on a beach?",
    ],
  },
  {
    title: "thank u, next",
    artist: "Ariana Grande",
    attributes: {
      year: 2018,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["pop", "r&b"],
      vibe: "confident",
      tempo: "medium",
      theme: "self-growth",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/dd/Thank_U%2C_Next_album_cover.png",
    lyric: "Thank you, next...",
    other_hit: "7 rings",
    agency: null,
    tags: ["solo", "ex-boyfriends", "viral-hit", "vocals"],
    signature: [
      "Does the song list ex-boyfriends by name?",
      "Does the video parody Mean Girls?",
      "Is the title all lowercase?",
    ],
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    attributes: {
      year: 2020,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["pop", "disco"],
      vibe: "energetic",
      tempo: "fast",
      theme: "romance",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/f/f5/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png",
    lyric: "You want me, I want you baby...",
    other_hit: "Don't Start Now",
    agency: null,
    tags: ["solo", "disco-revival", "radio-hit", "party"],
    signature: [
      "Is the theme centered around space/stars?",
      "Is it a disco-revival track?",
      "Did it have a remix with DaBaby?",
    ],
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    attributes: {
      year: 2019,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["pop", "synth-pop"],
      vibe: "energetic",
      tempo: "fast",
      theme: "nightlife",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Weeknd_-_After_Hours.png",
    lyric: "I said, ooh, I'm blinded by the lights...",
    other_hit: "Starboy",
    agency: null,
    tags: ["solo", "superbowl", "80s-vibe", "chart-record"],
    signature: [
      "Is the synthy riff the most recognizable part?",
      "Is the red suit jacket iconic for this song?",
      "Did it set a record for weeks on the charts?",
    ],
  },
  {
    title: "Peaches",
    artist: "Justin Bieber",
    attributes: {
      year: 2021,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["pop", "r&b"],
      vibe: "chill",
      tempo: "medium",
      theme: "romance",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/0/08/Justin_Bieber_-_Justice.png",
    lyric: "I got my peaches out in Georgia...",
    other_hit: "Sorry",
    agency: null,
    tags: ["solo", "summer-hit", "collab", "viral"],
    signature: [
      "Does the chorus mention the state of Georgia?",
      "Was the Tiny Desk performance viral?",
      "Does it feature Daniel Caesar?",
    ],
  },
  {
    title: "bad guy",
    artist: "Billie Eilish",
    attributes: {
      year: 2019,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["pop", "alternative"],
      vibe: "dark",
      tempo: "fast",
      theme: "confidence",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/1/13/Billie_Eilish_-_When_We_All_Fall_Asleep%2C_Where_Do_We_Go%3F.png",
    lyric: "I'm the bad guy, duh!",
    other_hit: "Happier Than Ever",
    agency: null,
    tags: ["solo", "whisper-pop", "grammy-winner", "bass-heavy"],
    signature: [
      "Does the song end with a trap beat switch?",
      "Is the spoken phrase 'Duh' iconic?",
      "Is the bassline heavy and distorted?",
    ],
  },

  // --- MEDIUM ---
  {
    title: "Poker Face",
    artist: "Lady Gaga",
    attributes: {
      year: 2008,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["pop", "dance"],
      vibe: "energetic",
      tempo: "fast",
      theme: "mystery",
      popularity: "classic",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/3/30/Lady_Gaga_-_The_Fame.png",
    lyric: "Can't read my, can't read my...",
    other_hit: "Bad Romance",
    agency: null,
    tags: ["solo", "iconic", "2000s", "dance-pop"],
    signature: [
      "Does the hook involve stuttering 'Ma-ma-ma'?",
      "Is the song about hiding your true intentions?",
      "Is it an electropop classic from 2008?",
    ],
  },
  {
    title: "There's Nothing Holdin' Me Back",
    artist: "Shawn Mendes",
    attributes: {
      year: 2017,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["pop", "rock"],
      vibe: "energetic",
      tempo: "fast",
      theme: "romance",
      popularity: "hit",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/64/There%27s_Nothing_Holdin%27_Me_Back.jpg",
    lyric: "Oh, I've been shaking...",
    agency: "Island",
    other_hit: "Stitches",
    tags: ["solo", "guitar-pop", "radio-hit"],
    signature: [
      "Is the artist Canadian?",
      "Does the chorus feature a fast-paced guitar strum?",
      "Is the title 5 words long?",
    ],
  },
  {
    title: "Girls Like You",
    artist: "Maroon 5",
    attributes: {
      year: 2018,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["pop"],
      vibe: "chill",
      tempo: "medium",
      theme: "romance",
      popularity: "mega",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/9/96/Maroon_5_-_Girls_Like_You.png",
    lyric: "I need a girl like you, yeah yeah...",
    agency: "Interscope",
    other_hit: "Sugar",
    tags: ["group", "band", "cardi-b", "cameo-heavy"],
    signature: [
      "Does it feature Cardi B?",
      "Does the music video feature many famous women?",
      "Is the singer Adam Levine?",
    ],
  },
  {
    title: "As It Was",
    artist: "Harry Styles",
    attributes: {
      year: 2022,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["pop", "indie"],
      vibe: "melancholic",
      tempo: "fast",
      theme: "change",
      popularity: "mega",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/e/e1/Harry_Styles_-_Harry%27s_House.png",
    lyric: "You know it's not the same as it was...",
    other_hit: "Watermelon Sugar",
    agency: null,
    tags: ["solo", "ex-band-member", "viral-hit", "synth-pop"],
    signature: [
      "Does the song start with a child's voice?",
      "Is the video set on a spinning platform?",
      "Is the beat a fast-paced synth loop?",
    ],
  },
  {
    title: "We Found Love",
    artist: "Rihanna",
    attributes: {
      year: 2011,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["pop", "edm"],
      vibe: "energetic",
      tempo: "fast",
      theme: "romance",
      popularity: "mega",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/a/ae/Rihanna_-_Talk_That_Talk_%28Standard%29.png",
    lyric: "We found love in a hopeless place...",
    other_hit: "Umbrella",
    agency: null,
    tags: ["solo", "club-banger", "calvin-harris", "2010s"],
    signature: [
      "Does the music video start with a monologue?",
      "Is it produced by Calvin Harris?",
      "Is the chorus simply the title repeated?",
    ],
  },
  {
    title: "Rolling in the Deep",
    artist: "Adele",
    attributes: {
      year: 2010,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["pop", "soul"],
      vibe: "powerful",
      tempo: "medium",
      theme: "heartbreak",
      popularity: "mega",
      gen: null,
    },
    difficulty: "medium",
    cover: "https://upload.wikimedia.org/wikipedia/en/1/1b/Adele_-_21.png",
    lyric: "We could have had it all...",
    other_hit: "Hello",
    agency: null,
    tags: ["solo", "power-vocals", "grammy-winner", "breakup-song"],
    signature: [
      "Does it start with a pounding drum beat?",
      "Is it considered a revenge anthem?",
      "Is the phrase 'We could have had it all' central?",
    ],
  },
  {
    title: "24K Magic",
    artist: "Bruno Mars",
    attributes: {
      year: 2016,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["pop", "funk"],
      vibe: "party",
      tempo: "fast",
      theme: "wealth",
      popularity: "hit",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/2/2b/Bruno_Mars_-_24K_Magic_%28Official_Album_Cover%29.png",
    lyric: "Players, put yo' pinky rings up to the moon...",
    other_hit: "Uptown Funk",
    agency: null,
    tags: ["solo", "party-anthem", "retro-vibe", "grammy-winner"],
    signature: [
      "Does the chorus mention pinky rings?",
      "Is the vibe retro Las Vegas party?",
      "Does the song start with a talkbox intro?",
    ],
  },
  {
    title: "Circles",
    artist: "Post Malone",
    attributes: {
      year: 2019,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["pop", "rock"],
      vibe: "chill",
      tempo: "medium",
      theme: "breakup",
      popularity: "mega",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/1/15/Post_Malone_-_Hollywood%27s_Bleeding.png",
    lyric: "Seasons change and our love went cold...",
    other_hit: "Rockstar",
    agency: null,
    tags: ["solo", "radio-hit", "acoustic-guitar", "sad-vibes"],
    signature: [
      "Is the beat driven by an acoustic guitar loop?",
      "Is the music video medieval-themed?",
      "Is it one of his most radio-friendly pop songs?",
    ],
  },

  // --- HARD ---
  {
    title: "Royals",
    artist: "Lorde",
    attributes: {
      year: 2013,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["pop", "alternative"],
      vibe: "minimal",
      tempo: "medium",
      theme: "anti-wealth",
      popularity: "hit",
      gen: null,
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/a/a5/Lorde_-_Pure_Heroine.png",
    lyric: "We'll never be royals...",
    other_hit: "Green Light",
    agency: null,
    tags: ["solo", "minimalist", "debut-hit", "grammy-winner"],
    signature: [
      "Is the beat mostly just snapping and bass?",
      "Is the theme rejecting luxury and wealth?",
      "Was the artist a teenager when this released?",
    ],
  },
  {
    title: "Video Games",
    artist: "Lana Del Rey",
    attributes: {
      year: 2011,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["pop", "alternative"],
      vibe: "sad",
      tempo: "slow",
      theme: "devotion",
      popularity: "cult-classic",
      gen: null,
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/5/50/Lana_Del_Rey_-_Born_to_Die.png",
    lyric: "It's you, it's you, it's all for you...",
    other_hit: "Summertime Sadness",
    agency: null,
    tags: ["solo", "cinematic", "sad-girl", "ballad"],
    signature: [
      "Is the music video a montage of grainy home footage?",
      "Is the instrumentation heavy on harp and strings?",
      "Is the title related to gaming, but the mood is sad?",
    ],
  },
  {
    title: "Thinkin Bout You",
    artist: "Frank Ocean",
    attributes: {
      year: 2012,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["r&b", "pop"],
      vibe: "emotional",
      tempo: "slow",
      theme: "longing",
      popularity: "acclaim",
      gen: null,
    },
    difficulty: "hard",
    cover: "https://upload.wikimedia.org/wikipedia/en/2/28/Channel_ORANGE.jpg",
    lyric: "A tornado flew around my room before you came...",
    other_hit: "Nights",
    agency: null,
    tags: ["solo", "falsetto", "cult-classic", "minimal"],
    signature: [
      "Is the 'potato' vine meme associated with this song?",
      "Is the chorus sung entirely in falsetto?",
      "Does the lyric mention a tornado?",
    ],
  },
  {
    title: "Chandelier",
    artist: "Sia",
    attributes: {
      year: 2014,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["pop"],
      vibe: "dramatic",
      tempo: "medium",
      theme: "party-sad",
      popularity: "hit",
      gen: null,
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/0/0f/Sia_-_1000_Forms_of_Fear.png",
    lyric: "I'm gonna swing from the chandelier...",
    other_hit: "Cheap Thrills",
    agency: null,
    tags: ["solo", "power-vocals", "dark-lyrics", "music-video"],
    signature: [
      "Does the video feature a young dancer in a wig?",
      "Is the chorus known for massive vocal belting?",
      "Is the song about the dark side of partying?",
    ],
  },
  {
    title: "Without Me",
    artist: "Halsey",
    attributes: {
      year: 2018,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["pop", "alternative"],
      vibe: "moody",
      tempo: "medium",
      theme: "toxic-love",
      popularity: "hit",
      gen: null,
    },
    difficulty: "hard",
    cover: "https://upload.wikimedia.org/wikipedia/en/7/70/Halsey_-_Manic.png",
    lyric: "Tell me how's it feel sittin' up there...",
    other_hit: "Closer",
    agency: null,
    tags: ["solo", "breakup", "chart-topper", "dark-pop"],
    signature: [
      "Does the bridge interpolate 'Cry Me A River'?",
      "Is it about a toxic public relationship?",
      "Is it her first solo #1 hit?",
    ],
  },

  // ==========================================
  // 🎧 HIP-HOP / RAP
  // ==========================================
  // --- EASY ---
  {
    title: "God's Plan",
    artist: "Drake",
    attributes: {
      year: 2018,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "rap"],
      vibe: "chill",
      tempo: "medium",
      theme: "success",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/9/90/Scorpion_by_Drake.jpg",
    lyric: "She say, 'Do you love me?' I tell her, 'Only partly'...",
    other_hit: "Hotline Bling",
    agency: null,
    tags: ["solo", "mega-hit", "meme", "chart-topper"],
    signature: [
      "Does the music video show the artist giving away money?",
      "Is the line 'She say do you love me' iconic?",
      "Did it debut at #1?",
    ],
  },
  {
    title: "Lose Yourself",
    artist: "Eminem",
    attributes: {
      year: 2002,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "rap"],
      vibe: "intense",
      tempo: "medium",
      theme: "ambition",
      popularity: "legendary",
      gen: "old-school",
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/62/Eminem_-_Lose_Yourself_CD_cover.jpg",
    lyric: "His palms are sweaty, knees weak, arms are heavy...",
    agency: "Shady/Aftermath",
    other_hit: "The Real Slim Shady",
    tags: [
      "solo",
      "movie-soundtrack",
      "oscar-winner",
      "classic",
      "storytelling",
    ],
    signature: [
      "Is 'mom's spaghetti' the most famous lyric?",
      "Was it written for the movie '8 Mile'?",
      "Is it the first rap song to win an Oscar?",
    ],
  },
  {
    title: "In Da Club",
    artist: "50 Cent",
    attributes: {
      year: 2003,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "rap"],
      vibe: "party",
      tempo: "medium",
      theme: "celebration",
      popularity: "legendary",
      gen: "old-school",
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/9/9d/In_da_Club_cover.jpg",
    lyric: "Go shawty, it's your birthday...",
    agency: "Shady/Aftermath",
    other_hit: "Candy Shop",
    tags: ["solo", "club-classic", "dr-dre-prod", "birthday-anthem"],
    signature: [
      "Is the opening line 'Go shawty, it's your birthday'?",
      "Is the beat produced by Dr. Dre?",
      "Does the video show him training in a gym?",
    ],
  },
  {
    title: "SICKO MODE",
    artist: "Travis Scott",
    attributes: {
      year: 2018,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "rap"],
      vibe: "dark",
      tempo: "variable",
      theme: "flex",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/4/41/Travis_Scott_-_Astroworld.png",
    lyric: "Sun is down, freezing cold...",
    other_hit: "Goosebumps",
    agency: null,
    tags: ["solo", "beat-switch", "drake-feature", "hype"],
    signature: [
      "Does the song have three distinct beat switches?",
      "Does Drake have a surprise feature?",
      "Is the intro 'Sun is down, freezing cold'?",
    ],
  },
  {
    title: "Lose Yourself",
    artist: "Eminem",
    attributes: {
      year: 2002,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "rap"],
      vibe: "intense",
      tempo: "medium",
      theme: "ambition",
      popularity: "legendary",
      gen: "old-school",
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/62/Eminem_-_Lose_Yourself_CD_cover.jpg",
    lyric: "His palms are sweaty, knees weak, arms are heavy...",
    other_hit: "The Real Slim Shady",
    agency: null,
    tags: ["solo", "movie-soundtrack", "oscar-winner", "classic"],
    signature: [
      "Is 'mom's spaghetti' the most famous lyric?",
      "Was it written for the movie '8 Mile'?",
      "Is it the first rap song to win an Oscar?",
    ],
  },
  {
    title: "Empire State of Mind",
    artist: "Jay-Z",
    attributes: {
      year: 2009,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "rap"],
      vibe: "inspiring",
      tempo: "medium",
      theme: "city",
      popularity: "mega",
      gen: "old-school",
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/c/c2/Jay-Z_-_The_Blueprint_3.jpg",
    lyric: "Concrete jungle where dreams are made of...",
    other_hit: "99 Problems",
    agency: null,
    tags: ["solo", "nyc-anthem", "alicia-keys", "classic"],
    signature: [
      "Is this considered the modern NYC anthem?",
      "Does it feature Alicia Keys on the chorus?",
      "Is the hook 'Concrete jungle where dreams are made of'?",
    ],
  },
  {
    title: "HUMBLE.",
    artist: "Kendrick Lamar",
    attributes: {
      year: 2017,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "rap"],
      vibe: "aggressive",
      tempo: "medium",
      theme: "confidence",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png",
    lyric: "Sit down, be humble.",
    other_hit: "DNA.",
    agency: null,
    tags: ["solo", "piano-beat", "lyrical", "grammy-winner"],
    signature: [
      "Does the video mock photoshop and beauty standards?",
      "Is the piano riff repetitive and simple?",
      "Is the hook simply 'Sit down, be humble'?",
    ],
  },

  // --- MEDIUM ---
  {
    title: "Power",
    artist: "Kanye West",
    attributes: {
      year: 2010,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "rap"],
      vibe: "powerful",
      tempo: "medium",
      theme: "ego",
      popularity: "hit",
      gen: "old-school",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/f/f0/My_Beautiful_Dark_Twisted_Fantasy.jpg",
    lyric: "No one man should have all that power...",
    other_hit: "Stronger",
    agency: null,
    tags: ["solo", "chant", "sports-anthem", "production-masterpiece"],
    signature: [
      "Is the beat built on handclaps and chants?",
      "Does it sample King Crimson?",
      "Is the theme about having too much influence?",
    ],
  },
  {
    title: "Goosebumps",
    artist: "Travis Scott",
    attributes: {
      year: 2016,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "trap"],
      vibe: "dark",
      tempo: "medium",
      theme: "love",
      popularity: "mega",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/a/a8/Travis_Scott_-_Birds_in_the_Trap_Sing_McKnight.png",
    lyric: "I get those goosebumps every time...",
    agency: "Grand Hustle",
    other_hit: "SICKO MODE",
    tags: ["solo", "feature-heavy", "dark-vibes", "kendrick-lamar"],
    signature: [
      "Does it feature Kendrick Lamar?",
      "Is the hook 'I get those goosebumps every time'?",
      "Is the beat dark and psychedelic?",
    ],
  },
  {
    title: "Rockstar",
    artist: "Post Malone",
    attributes: {
      year: 2017,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "trap"],
      vibe: "chill",
      tempo: "medium",
      theme: "fame",
      popularity: "mega",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/64/Post_Malone_Rockstar.jpg",
    lyric:
      "I've been fuckin' hoes and poppin' pillies man, I feel just like a rockstar...",
    agency: "Republic",
    other_hit: "Circles",
    tags: ["solo", "feature-heavy", "21-savage", "chart-topper"],
    signature: [
      "Does it feature 21 Savage?",
      "Is the theme about living like a rockstar?",
      "Did the artist smash a guitar in the video?",
    ],
  },
  {
    title: "No Role Modelz",
    artist: "J. Cole",
    attributes: {
      year: 2014,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "rap"],
      vibe: "chill",
      tempo: "medium",
      theme: "reality",
      popularity: "hit",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/2/2a/2014ForestHillsDrive.jpg",
    lyric: "Don't save her, she don't wanna be saved...",
    other_hit: "Middle Child",
    agency: null,
    tags: ["solo", "storytelling", "classic", "platinum-no-features"],
    signature: [
      "Does the chorus reference 'Uncle Phil'?",
      "Is the beat based on a George W. Bush sample?",
      "Is the catchphrase 'Don't save her'?",
    ],
  },
  {
    title: "If I Ruled the World",
    artist: "Nas",
    attributes: {
      year: 1996,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "rap"],
      vibe: "inspiring",
      tempo: "medium",
      theme: "hope",
      popularity: "classic",
      gen: "old-school",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/0/0d/Nas_-_It_Was_Written.jpg",
    lyric: "Imagine smoking weed in the streets without cops harassin'...",
    other_hit: "N.Y. State of Mind",
    agency: null,
    tags: ["solo", "lauryn-hill", "classic", "nyc"],
    signature: [
      "Does Lauryn Hill sing the hook?",
      "Is the theme about a utopia?",
      "Is it one of his most commercial hits?",
    ],
  },
  {
    title: "EARFQUAKE",
    artist: "Tyler, The Creator",
    attributes: {
      year: 2019,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "pop"],
      vibe: "quirky",
      tempo: "medium",
      theme: "love",
      popularity: "hit",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/5/51/Igor_-_Tyler_the_Creator.jpg",
    lyric: "Don't leave, it's my fault...",
    other_hit: "See You Again",
    agency: null,
    tags: ["solo", "singing-rap", "piano", "unique-voice"],
    signature: [
      "Does the artist wear a blonde bob wig in the video?",
      "Is the guest verse intentionally unintelligible?",
      "Is the chorus sung in a high pitch?",
    ],
  },
  {
    title: "This Is America",
    artist: "Childish Gambino",
    attributes: {
      year: 2018,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "rap"],
      vibe: "dark",
      tempo: "variable",
      theme: "society",
      popularity: "mega",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/1/10/This_Is_America_Childish_Gambino.jpg",
    lyric: "This is America, don't catch you slippin' now...",
    other_hit: "Redbone",
    agency: null,
    tags: ["solo", "political", "music-video", "beat-switch"],
    signature: [
      "Is the music video filled with symbolic violence?",
      "Does the beat switch from choir to trap?",
      "Is the song more famous for its video than audio?",
    ],
  },

  // --- HARD ---
  {
    title: "Doomsday",
    artist: "MF DOOM",
    attributes: {
      year: 1999,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "rap"],
      vibe: "chill",
      tempo: "medium",
      theme: "skill",
      popularity: "cult-classic",
      gen: "old-school",
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/7/70/Operation_Doomsday_%28original_cover%29.jpg",
    lyric: "Just remember ALL CAPS when you spell the man name...",
    other_hit: "Rapp Snitch Knishes",
    agency: null,
    tags: ["solo", "masked-rapper", "lyrical-genius", "underground"],
    signature: [
      "Does the beat sample Sade?",
      "Is the rhyming scheme extremely dense?",
      "Is the chorus about 'ALL CAPS'?",
    ],
  },
  {
    title: "Electric Relaxation",
    artist: "A Tribe Called Quest",
    attributes: {
      year: 1993,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "jazz-rap"],
      vibe: "chill",
      tempo: "medium",
      theme: "romance",
      popularity: "classic",
      gen: "old-school",
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/63/Midnight_Marauders.jpg",
    lyric: "Relax yourself girl, please settle down...",
    other_hit: "Can I Kick It?",
    agency: null,
    tags: ["group", "jazz-sample", "90s", "smooth"],
    signature: [
      "Is the hook 'Relax yourself girl'?",
      "Is the beat laid-back and jazzy?",
      "Is it a classic from 'Midnight Marauders'?",
    ],
  },
  {
    title: "C.R.E.A.M.",
    artist: "Wu-Tang Clan",
    attributes: {
      year: 1993,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "rap"],
      vibe: "gritty",
      tempo: "medium",
      theme: "struggle",
      popularity: "legendary",
      gen: "old-school",
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/5/53/Wu-TangClanEntertheWu-Tangalbumcover.jpg",
    lyric: "Cash Rules Everything Around Me...",
    other_hit: "Protect Ya Neck",
    agency: null,
    tags: ["group", "nyc", "classic", "piano-loop"],
    signature: [
      "Is 'Dollar Dollar Bill Y'all' the catchphrase?",
      "Is the piano loop melancholic?",
      "Does the title stand for 'Cash Rules Everything Around Me'?",
    ],
  },
  {
    title: "Ms. Jackson",
    artist: "OutKast",
    attributes: {
      year: 2000,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "rap"],
      vibe: "groovy",
      tempo: "medium",
      theme: "apology",
      popularity: "hit",
      gen: "old-school",
    },
    difficulty: "hard",
    cover: "https://upload.wikimedia.org/wikipedia/en/a/a2/Stankonia.jpg",
    lyric: "I am for real, never meant to make your daughter cry...",
    other_hit: "Hey Ya!",
    agency: null,
    tags: ["group", "duo", "grammy-winner", "atlanta"],
    signature: [
      "Is the beat a reverse wedding march?",
      "Is the song an apology to a mother?",
      "Is the chorus 'I am for real'?",
    ],
  },
  {
    title: "Paper Trail$",
    artist: "Joey Bada$$",
    attributes: {
      year: 2015,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["hip-hop", "rap"],
      vibe: "gritty",
      tempo: "medium",
      theme: "money",
      popularity: "underground-hit",
      gen: null,
    },
    difficulty: "hard",
    cover: "https://upload.wikimedia.org/wikipedia/en/d/d3/B4.DA.%24%24.jpg",
    lyric: "Money ain't a thing if I got it...",
    other_hit: "Devastated",
    agency: null,
    tags: ["solo", "lyrical", "boom-bap", "modern-classic"],
    signature: [
      "Is the title stylized with a dollar sign?",
      "Is the theme strictly about money corruption?",
      "Is the beat a classic boom-bap style?",
    ],
  },

  // ==========================================
  // 🎸 ROCK / ALTERNATIVE
  // ==========================================
  // --- EASY ---
  {
    title: "Don't Stop Me Now",
    artist: "Queen",
    attributes: {
      year: 1978,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock"],
      vibe: "energetic",
      tempo: "fast",
      theme: "fun",
      popularity: "legendary",
      gen: "classic",
    },
    difficulty: "easy",
    cover: "https://upload.wikimedia.org/wikipedia/en/5/5a/Queen_Jazz.png",
    lyric: "I'm having such a good time, I'm having a ball...",
    other_hit: "Bohemian Rhapsody",
    agency: null,
    tags: ["group", "band", "piano", "classic"],
    signature: [
      "Is the tempo incredibly fast and upbeat?",
      "Is it often used in commercials/movies for speed?",
      "Does the singer describe himself as a 'shooting star'?",
    ],
  },
  {
    title: "Livin' on a Prayer",
    artist: "Bon Jovi",
    attributes: {
      year: 1986,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock", "glam-metal"],
      vibe: "energetic",
      tempo: "fast",
      theme: "hope",
      popularity: "legendary",
      gen: "classic",
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/a/a9/Bon_Jovi_Livin%27_On_A_Prayer.jpg",
    lyric: "Woah, we're halfway there...",
    agency: "Mercury",
    other_hit: "It's My Life",
    tags: ["group", "band", "80s", "stadium-anthem"],
    signature: [
      "Is the chorus 'Woah, we're halfway there'?",
      "Does it use a 'talk box' guitar effect?",
      "Is the story about Tommy and Gina?",
    ],
  },
  {
    title: "Thunderstruck",
    artist: "AC/DC",
    attributes: {
      year: 1990,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock", "hard-rock"],
      vibe: "energetic",
      tempo: "fast",
      theme: "power",
      popularity: "legendary",
      gen: "classic",
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/e/e4/ACDC_-_Thunderstruck.JPG",
    lyric: "Thunder!",
    agency: "Atco",
    other_hit: "Back in Black",
    tags: ["group", "band", "guitar-intro", "chant-heavy"],
    signature: [
      "Does the intro feature a long one-handed guitar riff?",
      "Is the main chant just the word 'Thunder'?",
      "Is the band Australian?",
    ],
  },
  {
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    attributes: {
      year: 1991,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock", "grunge"],
      vibe: "rebellious",
      tempo: "fast",
      theme: "angst",
      popularity: "legendary",
      gen: "classic",
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/e/e5/In_Utero_%28Nirvana%29_album_cover.jpg",
    lyric: "Here we are now, entertain us...",
    other_hit: "Come As You Are",
    agency: null,
    tags: ["group", "band", "90s", "grunge-anthem"],
    signature: [
      "Is the video set in a gym with cheerleaders?",
      "Is the main riff simple power chords?",
      "Is the title inspired by a deodorant brand?",
    ],
  },
  {
    title: "In the End",
    artist: "Linkin Park",
    attributes: {
      year: 2000,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock", "nu-metal"],
      vibe: "angst",
      tempo: "medium",
      theme: "struggle",
      popularity: "mega",
      gen: "old-school",
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/c/c9/Linkin_Park_-_Hybrid_Theory_Album_Cover.jpg",
    lyric: "I tried so hard and got so far...",
    other_hit: "Numb",
    agency: null,
    tags: ["group", "band", "rap-rock", "2000s"],
    signature: [
      "Does it start with a haunting piano note?",
      "Is the bridge 'I put my trust in you'?",
      "Does it mix rapping verses with singing chorus?",
    ],
  },
  {
    title: "Viva La Vida",
    artist: "Coldplay",
    attributes: {
      year: 2008,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock", "pop"],
      vibe: "orchestral",
      tempo: "medium",
      theme: "history",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/2/25/Viva_la_Vida_or_Death_and_All_His_Friends.jpg",
    lyric: "I used to rule the world...",
    other_hit: "Yellow",
    agency: null,
    tags: ["group", "band", "strings", "grammy-winner"],
    signature: [
      "Is the instrumentation mostly strings and bells?",
      "Is the title in Spanish?",
      "Does the lyric reference 'Jerusalem bells'?",
    ],
  },
  {
    title: "Radioactive",
    artist: "Imagine Dragons",
    attributes: {
      year: 2012,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock", "pop"],
      vibe: "powerful",
      tempo: "medium",
      theme: "apocalypse",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/3/3f/Night_Visions_Album_Cover.jpeg",
    lyric: "I'm waking up to ash and dust...",
    other_hit: "Demons",
    agency: null,
    tags: ["group", "band", "heavy-drums", "radio-hit"],
    signature: [
      "Is the sharp inhale/exhale sound prominent?",
      "Are giant drums used in the live performance?",
      "Is the theme about waking up to an apocalypse?",
    ],
  },

  // --- MEDIUM ---
  {
    title: "Do I Wanna Know?",
    artist: "Arctic Monkeys",
    attributes: {
      year: 2013,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock", "indie"],
      vibe: "cool",
      tempo: "medium",
      theme: "romance",
      popularity: "hit",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/7/76/Arctic_Monkeys_-_AM.png",
    lyric: "Crawling back to you...",
    other_hit: "R U Mine?",
    agency: null,
    tags: ["group", "band", "guitar-riff", "indie-classic"],
    signature: [
      "Is the guitar riff the main hook?",
      "Is the music video a white line animation?",
      "Is the vibe leather jackets and pompadours?",
    ],
  },
  {
    title: "Californication",
    artist: "Red Hot Chili Peppers",
    attributes: {
      year: 1999,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock", "funk"],
      vibe: "chill",
      tempo: "medium",
      theme: "society",
      popularity: "hit",
      gen: "classic",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/df/Red_Hot_Chili_Peppers_-_Californication.jpg",
    lyric: "Dream of Californication...",
    other_hit: "Under the Bridge",
    agency: null,
    tags: ["group", "band", "guitar-solo", "classic"],
    signature: [
      "Is the music video a fake video game?",
      "Is the bass line melodic?",
      "Does the title combine a state and a word?",
    ],
  },
  {
    title: "Everlong",
    artist: "Foo Fighters",
    attributes: {
      year: 1997,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock", "grunge"],
      vibe: "driving",
      tempo: "fast",
      theme: "romance",
      popularity: "hit",
      gen: "classic",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/2/26/Foo_Fighters_-_The_Colour_and_the_Shape.jpg",
    lyric: "Hello, I've waited here for you...",
    other_hit: "The Pretender",
    agency: null,
    tags: ["group", "band", "dave-grohl", "high-energy"],
    signature: [
      "Is the drumming incredibly fast?",
      "Is the video a dream sequence parody?",
      "Is it considered one of the best rock songs of the 90s?",
    ],
  },
  {
    title: "Uprising",
    artist: "Muse",
    attributes: {
      year: 2009,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock", "alternative"],
      vibe: "rebellious",
      tempo: "medium",
      theme: "revolution",
      popularity: "hit",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/e/e1/Muse_-_The_Resistance_cover_art.jpg",
    lyric: "They will not force us...",
    other_hit: "Supermassive Black Hole",
    agency: null,
    tags: ["group", "band", "synth-rock", "political"],
    signature: [
      "Is the rhythm a glam-rock stomp?",
      "Does the video feature teddy bears?",
      "Is the theme about revolution?",
    ],
  },
  {
    title: "Numb",
    artist: "Linkin Park",
    attributes: {
      year: 2003,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock", "nu-metal"],
      vibe: "angst",
      tempo: "medium",
      theme: "pain",
      popularity: "mega",
      gen: "old-school",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/b/b9/Linkin_Park_-_Numb_CD_cover.jpg",
    lyric: "I've become so numb, I can't feel you there...",
    agency: "Warner Bros",
    other_hit: "In The End",
    tags: ["group", "band", "chester-bennington", "remixed-jayz"],
    signature: [
      "Did Jay-Z remix this song?",
      "Is the chorus 'I've become so numb'?",
      "Is it one of the most viewed rock videos on YouTube?",
    ],
  },
  {
    title: "Boulevard of Broken Dreams",
    artist: "Green Day",
    attributes: {
      year: 2004,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock", "punk"],
      vibe: "melancholic",
      tempo: "medium",
      theme: "loneliness",
      popularity: "hit",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/e/ed/Green_Day_-_American_Idiot_album_cover.png",
    lyric: "I walk a lonely road...",
    other_hit: "American Idiot",
    agency: null,
    tags: ["group", "band", "emo-anthem", "classic"],
    signature: [
      "Is the tremolo guitar effect distinct?",
      "Is the video the singer walking down a road?",
      "Is the lyric 'I walk a lonely road'?",
    ],
  },

  // --- HARD ---
  {
    title: "Time",
    artist: "Pink Floyd",
    attributes: {
      year: 1973,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock", "prog"],
      vibe: "trippy",
      tempo: "medium",
      theme: "life",
      popularity: "legendary",
      gen: "classic",
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png",
    lyric: "Ticking away the moments that make up a dull day...",
    other_hit: "Money",
    agency: null,
    tags: ["group", "band", "long-intro", "clocks", "70s"],
    signature: [
      "Does the song start with alarm clocks ringing?",
      "Is the guitar solo considered one of the best ever?",
      "Is it from 'The Dark Side of the Moon'?",
    ],
  },
  {
    title: "No Surprises",
    artist: "Radiohead",
    attributes: {
      year: 1997,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock", "alternative"],
      vibe: "sad",
      tempo: "slow",
      theme: "apathy",
      popularity: "cult-classic",
      gen: "classic",
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/a/a1/Radiohead.okcomputer.albumart.jpg",
    lyric: "A heart that's full up like a landfill...",
    other_hit: "Creep",
    agency: null,
    tags: ["group", "band", "lullaby", "melancholy"],
    signature: [
      "Is the main instrument a glockenspiel/xylophone?",
      "Does the video show the singer inside a water helmet?",
      "Is the melody deceptive like a lullaby?",
    ],
  },
  {
    title: "There Is a Light That Never Goes Out",
    artist: "The Smiths",
    attributes: {
      year: 1986,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock", "indie"],
      vibe: "melancholic",
      tempo: "medium",
      theme: "love-death",
      popularity: "cult-classic",
      gen: "classic",
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/2/22/The_Queen_Is_Dead_%28The_Smiths_album_-_cover_art%29.png",
    lyric: "And if a double-decker bus crashes into us...",
    other_hit: "This Charming Man",
    agency: null,
    tags: ["group", "band", "morrissey", "80s-indie"],
    signature: [
      "Are the lyrics darkly romantic about dying together?",
      "Is the jangle pop guitar prominent?",
      "Is the line 'if a double-decker bus crashes into us' famous?",
    ],
  },
  {
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    attributes: {
      year: 1971,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock"],
      vibe: "epic",
      tempo: "variable",
      theme: "mystic",
      popularity: "legendary",
      gen: "classic",
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/2/26/Led_Zeppelin_-_Led_Zeppelin_IV.jpg",
    lyric: "And she's buying a stairway to heaven...",
    other_hit: "Immigrant Song",
    agency: null,
    tags: ["group", "band", "long-song", "guitar-solo", "70s"],
    signature: [
      "Does it start with recorders/flutes?",
      "Is it famous for building tempo slowly?",
      "Is the guitar solo often banned in guitar stores?",
    ],
  },
  {
    title: "A Day in the Life",
    artist: "The Beatles",
    attributes: {
      year: 1967,
      solo: false,
      gender: "male",
      lang: "english",
      genre: ["rock"],
      vibe: "psychedelic",
      tempo: "variable",
      theme: "life",
      popularity: "legendary",
      gen: "classic",
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/e/e7/Sgt._Pepper%27s_Lonely_Hearts_Club_Band.jpg",
    lyric: "I read the news today, oh boy...",
    other_hit: "Hey Jude",
    agency: null,
    tags: ["group", "band", "orchestral", "masterpiece", "60s"],
    signature: [
      "Does it feature a massive orchestral build-up?",
      "Is it two unfinished songs stitched together?",
      "Does it end with a never-ending piano chord?",
    ],
  },

  // ==========================================
  // 🎹 R&B
  // ==========================================
  // --- EASY ---
  {
    title: "Earned It",
    artist: "The Weeknd",
    attributes: {
      year: 2014,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["r&b"],
      vibe: "sensual",
      tempo: "slow",
      theme: "romance",
      popularity: "hit",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/b/b2/The_Weeknd_-_Earned_It.png",
    lyric: "Cause girl you're perfect...",
    other_hit: "The Hills",
    agency: null,
    tags: ["solo", "movie-soundtrack", "smooth", "vocals"],
    signature: [
      "Was it on the '50 Shades of Grey' soundtrack?",
      "Is the time signature a waltz (3/4)?",
      "Is the music video a cabaret show?",
    ],
  },
  {
    title: "DJ Got Us Fallin' In Love",
    artist: "Usher",
    attributes: {
      year: 2010,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["r&b", "pop"],
      vibe: "party",
      tempo: "fast",
      theme: "club",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/8/82/Usher-DJ_Got_Us_Fallin%27_in_Love.jpg",
    lyric: "So dance, dance, like it's the last, last night...",
    agency: "LaFace",
    other_hit: "Yeah!",
    tags: ["solo", "pitbull-feature", "club-classic", "2010s"],
    signature: [
      "Does it feature Pitbull?",
      "Is the theme about dancing like it's the last night?",
      "Does the title mention a DJ?",
    ],
  },
  {
    title: "Give Me Everything",
    artist: "Pitbull",
    attributes: {
      year: 2011,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["pop", "r&b"],
      vibe: "party",
      tempo: "fast",
      theme: "party",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/8/87/Pitbull_-_Give_Me_Everything.jpg",
    lyric: "Tonight I will love love you tonight...",
    agency: "J Records",
    other_hit: "Timber",
    tags: ["solo", "ne-yo-feature", "club-classic", "party-anthem"],
    signature: [
      "Does it feature Ne-Yo and Afrojack?",
      "Is the phrase 'Mr. Worldwide' used?",
      "Does the chorus go 'Tonight I will love you tonight'?",
    ],
  },
  {
    title: "Kill Bill",
    artist: "SZA",
    attributes: {
      year: 2022,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["r&b", "pop"],
      vibe: "chill",
      tempo: "medium",
      theme: "jealousy",
      popularity: "mega",
      gen: null,
    },
    difficulty: "easy",
    cover: "https://upload.wikimedia.org/wikipedia/en/2/2c/SZA_-_SOS.png",
    lyric: "I might kill my ex...",
    other_hit: "Good Days",
    agency: null,
    tags: ["solo", "storytelling", "viral-hit", "chart-topper"],
    signature: [
      "Is the lyric 'I might kill my ex' key?",
      "Does the video reference the movie 'Kill Bill'?",
      "Is the tone deceptively upbeat for the lyrics?",
    ],
  },
  {
    title: "Yeah!",
    artist: "Usher",
    attributes: {
      year: 2004,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["r&b", "crunk"],
      vibe: "party",
      tempo: "fast",
      theme: "club",
      popularity: "mega",
      gen: "old-school",
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/60/Usher_-_Confessions_%28Special_Edition%29.jpg",
    lyric: "Peace up, A-Town down!",
    other_hit: "Burn",
    agency: null,
    tags: ["solo", "club-classic", "ludacris", "lil-jon"],
    signature: [
      "Is the beat 'Crunk' style?",
      "Does Lil Jon yell 'Yeah!' repeatedly?",
      "Does it feature a laser-filled music video?",
    ],
  },
  {
    title: "So Sick",
    artist: "Ne-Yo",
    attributes: {
      year: 2005,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["r&b"],
      vibe: "sad",
      tempo: "medium",
      theme: "breakup",
      popularity: "hit",
      gen: "old-school",
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/3/30/Ne-Yo_-_In_My_Own_Words.jpg",
    lyric: "And I'm so sick of love songs...",
    other_hit: "Miss Independent",
    agency: null,
    tags: ["solo", "2000s", "ballad", "radio-classic"],
    signature: [
      "Is the song about being tired of love songs?",
      "Is the video set in snowy mountains?",
      "Is it his debut single?",
    ],
  },
  {
    title: "Under the Influence",
    artist: "Chris Brown",
    attributes: {
      year: 2019,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["r&b"],
      vibe: "sensual",
      tempo: "medium",
      theme: "seduction",
      popularity: "viral",
      gen: null,
    },
    difficulty: "easy",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/dd/Chris_Brown_-_Indigo.png",
    lyric: "Baby, you can...",
    other_hit: "No Guidance",
    agency: null,
    tags: ["solo", "tiktok-hit", "smooth", "club"],
    signature: [
      "Did this blow up years later on TikTok?",
      "Is the beat atmospheric and looped?",
      "Are the lyrics about intoxication?",
    ],
  },

  // --- MEDIUM ---
  {
    title: "Ivy",
    artist: "Frank Ocean",
    attributes: {
      year: 2016,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["r&b", "indie"],
      vibe: "melancholic",
      tempo: "medium",
      theme: "nostalgia",
      popularity: "acclaim",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg",
    lyric: "I thought that I was dreaming when you said you loved me...",
    other_hit: "Pink + White",
    agency: null,
    tags: ["solo", "guitar", "sad-vibes", "cult-classic"],
    signature: [
      "Does the song end with guitar feedback/screaming?",
      "Is it a clean guitar ballad?",
      "Is it from the album 'Blonde'?",
    ],
  },
  {
    title: "Beautiful Girls",
    artist: "Sean Kingston",
    attributes: {
      year: 2007,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["r&b", "reggae"],
      vibe: "chill",
      tempo: "medium",
      theme: "love",
      popularity: "hit",
      gen: "old-school",
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/3/3a/Sean_Kingston_-_Beautiful_Girls_CD_cover.jpg",
    lyric: "You're way too beautiful girl...",
    agency: "Epic",
    other_hit: "Fire Burning",
    tags: ["solo", "one-hit-wonder", "sample-heavy", "summer-vibe"],
    signature: [
      "Does it sample 'Stand By Me'?",
      "Is the singer known for being Jamaican-American?",
      "Is the lyric 'suicidal' famously in the chorus?",
    ],
  },
  {
    title: "No Air",
    artist: "Jordin Sparks",
    attributes: {
      year: 2008,
      solo: false,
      gender: "female",
      lang: "english",
      genre: ["r&b", "pop"],
      vibe: "sad",
      tempo: "slow",
      theme: "heartbreak",
      popularity: "hit",
      gen: "old-school",
    },
    difficulty: "medium",
    cover: "https://upload.wikimedia.org/wikipedia/en/6/6f/NoAirJordin.jpg",
    lyric: "Tell me how I'm supposed to breathe with no air...",
    agency: "Jive",
    other_hit: "Tattoo",
    tags: ["duet", "chris-brown", "ballad", "vocal-heavy"],
    signature: [
      "Is it a duet with Chris Brown?",
      "Is the main metaphor about breathing?",
      "Was the artist an American Idol winner?",
    ],
  },
  {
    title: "Get You",
    artist: "Daniel Caesar",
    attributes: {
      year: 2016,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["r&b"],
      vibe: "romantic",
      tempo: "slow",
      theme: "love",
      popularity: "hit",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/1/1b/Daniel_Caesar_-_Freudian.png",
    lyric: "Who would've thought I'd get you...",
    other_hit: "Best Part",
    agency: null,
    tags: ["solo", "smooth", "wedding-song", "falsetto"],
    signature: [
      "Is the vibe extremely slow and intimate?",
      "Is the album cover a silhouette?",
      "Does it feature Kali Uchis?",
    ],
  },
  {
    title: "Focus",
    artist: "H.E.R.",
    attributes: {
      year: 2016,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["r&b"],
      vibe: "chill",
      tempo: "slow",
      theme: "attention",
      popularity: "hit",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/68/H.E.R._-_H.E.R._Volume_1.png",
    lyric: "Can you focus on me?",
    other_hit: "Best Part",
    agency: null,
    tags: ["solo", "guitar", "smooth", "grammy-winner"],
    signature: [
      "Is the artist known for wearing sunglasses?",
      "Is the intro harp/guitar focused?",
      "Is the hook 'Can you focus on me'?",
    ],
  },
  {
    title: "Adorn",
    artist: "Miguel",
    attributes: {
      year: 2012,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["r&b"],
      vibe: "sensual",
      tempo: "medium",
      theme: "love",
      popularity: "hit",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/0/07/Miguel_-_Kaleidoscope_Dream.jpg",
    lyric: "Let my love adorn you...",
    other_hit: "Sure Thing",
    agency: null,
    tags: ["solo", "smooth", "falsetto", "grammy-winner"],
    signature: [
      "Is the bassline distorted?",
      "Does he scream 'Hooo!' in the intro?",
      "Is the lyric 'Let my love adorn you'?",
    ],
  },
  {
    title: "Dead Man Walking",
    artist: "Brent Faiyaz",
    attributes: {
      year: 2020,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["r&b"],
      vibe: "toxic",
      tempo: "medium",
      theme: "lifestyle",
      popularity: "hit",
      gen: null,
    },
    difficulty: "medium",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/2/25/Brent_Faiyaz_-_Wasteland.png",
    lyric: "I can do anything I want...",
    other_hit: "Trust",
    agency: null,
    tags: ["solo", "toxic-king", "smooth", "independent"],
    signature: [
      "Is the persona unashamedly toxic?",
      "Is the beat driven by a violin loop?",
      "Is the artist independent?",
    ],
  },

  // --- HARD ---
  {
    title: "Untitled (How Does It Feel)",
    artist: "D'Angelo",
    attributes: {
      year: 2000,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["r&b", "neo-soul"],
      vibe: "sexy",
      tempo: "slow",
      theme: "intimacy",
      popularity: "classic",
      gen: "old-school",
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/d0/D%27Angelo_Voodoo.jpg",
    lyric: "How does it feel...",
    other_hit: "Brown Sugar",
    agency: null,
    tags: ["solo", "neo-soul", "falsetto", "legendary-video"],
    signature: [
      "Is the music video a single shot of the singer?",
      "Is the vibe neo-soul?",
      "Are the lyrics asking 'How does it feel'?",
    ],
  },
  {
    title: "House of Balloons / Glass Table Girls",
    artist: "The Weeknd",
    attributes: {
      year: 2011,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["r&b", "alternative"],
      vibe: "dark",
      tempo: "variable",
      theme: "party",
      popularity: "cult-classic",
      gen: null,
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_House_of_Balloons.png",
    lyric: "Bring the 707 out...",
    other_hit: "Wicked Games",
    agency: null,
    tags: ["solo", "mixtape-era", "dark-rnb", "two-part-song"],
    signature: [
      "Does the song have two distinct halves?",
      "Does it sample Siouxsie and the Banshees?",
      "Is it from his debut mixtape era?",
    ],
  },
  {
    title: "Session 32",
    artist: "Summer Walker",
    attributes: {
      year: 2018,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["r&b"],
      vibe: "acoustic",
      tempo: "slow",
      theme: "breakup",
      popularity: "cult-hit",
      gen: null,
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/9/91/Summer_Walker_-_Last_Day_of_Summer.png",
    lyric: "Threw away your love letters...",
    other_hit: "Girls Need Love",
    agency: null,
    tags: ["solo", "short-song", "guitar", "raw-vocals"],
    signature: [
      "Is the song shorter than 2 minutes?",
      "Is it just vocals and acoustic guitar?",
      "Is the theme getting over an ex?",
    ],
  },
  {
    title: "Spotless Mind",
    artist: "Jhené Aiko",
    attributes: {
      year: 2014,
      solo: true,
      gender: "female",
      lang: "english",
      genre: ["r&b"],
      vibe: "chill",
      tempo: "medium",
      theme: "wanderer",
      popularity: "fan-favorite",
      gen: null,
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/e/e4/Jhene_Aiko_Souled_Out.jpg",
    lyric: "Started as a love song, 24 years in the making...",
    other_hit: "The Worst",
    agency: null,
    tags: ["solo", "smooth", "calming", "storytelling"],
    signature: [
      "Is the concept based on being a wanderer?",
      "Is the vibe meditative?",
      "Does it reference 'Eternal Sunshine'?",
    ],
  },
  {
    title: "Break From Toronto",
    artist: "PARTYNEXTDOOR",
    attributes: {
      year: 2013,
      solo: true,
      gender: "male",
      lang: "english",
      genre: ["r&b"],
      vibe: "night",
      tempo: "medium",
      theme: "city",
      popularity: "cult-classic",
      gen: null,
    },
    difficulty: "hard",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/3/36/Partynextdoor_-_Partynextdoor.png",
    lyric: "That smile on your face...",
    other_hit: "Come and See Me",
    agency: null,
    tags: ["solo", "ovo-sound", "sample-heavy", "short-song"],
    signature: [
      "Does it sample 'Wildfire'?",
      "Is the location 'Toronto' in the title?",
      "Is it a signature OVO sound song?",
    ],
  },
];

// ==========================================
// 2. STAGED PROGRESSION QUESTION BANK (Expanded)
// ==========================================
const questionBank = [
    // ============================
    // ⚪ TIER 1: VAGUE (Score 20-15) - UNIVERSAL FILTERS
    // ============================
    // Broad, low-risk questions to start the game.
    
    // --- BASIC METADATA ---
    { id: 901, text: "Is the song title just one word?", check: (s) => (s.title.split(" ").length === 1 ? "yes" : "no"), allowed: null, tier: "vague" },
    { id: 902, text: "Is the artist's name just one word?", check: (s) => (s.artist.split(" ").length === 1 ? "yes" : "no"), allowed: null, tier: "vague" },
    { id: 903, text: "Is the song title very long (4+ words)?", check: (s) => (s.title.split(" ").length >= 4 ? "yes" : "no"), allowed: null, tier: "vague" },
    { id: 904, text: "Was it released in an even year?", check: (s) => (s.attributes.year % 2 === 0 ? "yes" : "no"), allowed: null, tier: "vague" },
    { id: 905, text: "Does the title start with a vowel?", check: (s) => (/^[AEIOU]/i.test(s.title) ? "yes" : "no"), allowed: null, tier: "vague" },
    { id: 906, text: "Is it a collaboration (feat. someone)?", check: (s) => (s.artist.includes("feat") || s.artist.includes("&") || (s.tags && s.tags.includes("collab")) ? "yes" : "no"), allowed: null, tier: "vague" },
    { id: 907, text: "Does the title contain a number?", check: (s) => (/\d/.test(s.title) ? "yes" : "no"), allowed: null, tier: "vague" },
    { id: 908, text: "Does the artist name contain a number?", check: (s) => (/\d/.test(s.artist) ? "yes" : "no"), allowed: null, tier: "vague" },

    // --- GENDER & FORMAT (Strict Exclusion) ---
    { id: 910, text: "Is the artist Male?", check: (s) => (s.attributes.gender === "male" ? "yes" : "no"), allowed: null, tier: "vague", exclusion: ["female-q"] },
    { id: 911, text: "Is the artist Female?", check: (s) => (s.attributes.gender === "female" ? "yes" : "no"), allowed: null, tier: "vague", exclusion: ["male-q"] },
    
    // --- ERA FILTERS (Broad) ---
    { id: 920, text: "Is it a recent song (2020-Present)?", check: (s) => s.attributes.year >= 2020 ? "yes" : "no", allowed: null, tier: "vague", exclusion: ["old-song-q"] },
    { id: 921, text: "Is it an older song (Before 2010)?", check: (s) => s.attributes.year < 2010 ? "yes" : "no", allowed: null, tier: "vague", exclusion: ["new-song-q"] },


    // ============================
    // 🔵 TIER 2: BALANCING (Score 14-9) - LOGIC BRIDGES
    // ============================
    // These narrow down the specific style or era within a genre.

    // --- UNIVERSAL BALANCING ---
    { id: 803, text: "Is this a Group/Band?", check: (s) => !s.attributes.solo ? "yes" : "no", allowed: null, tier: "balancing", tag: "group-q", exclusion: ["solo-q"] },
    { id: 804, text: "Is this a Solo Artist?", check: (s) => s.attributes.solo ? "yes" : "no", allowed: null, tier: "balancing", tag: "solo-q", exclusion: ["group-q"] },
    
    // Tempo/Vibe Logic
    { id: 810, text: "Is it a high-energy / fast song?", check: (s) => ["fast", "energetic"].includes(s.attributes.tempo) ? "yes" : "no", allowed: null, tier: "balancing", tag: "fast-q", exclusion: ["slow-q"] },
    { id: 811, text: "Is it a slow / emotional song?", check: (s) => ["slow", "medium"].includes(s.attributes.tempo) || ["sad", "heartbreak"].includes(s.attributes.theme) ? "yes" : "no", allowed: null, tier: "balancing", tag: "slow-q", exclusion: ["fast-q"] },
    { id: 812, text: "Is the vibe 'Dark' or 'Edgy'?", check: (s) => ["dark", "aggressive", "fierce", "rebellious"].includes(s.attributes.vibe) ? "yes" : "no", allowed: null, tier: "balancing", tag: "dark-q", exclusion: ["bright-q"] },
    { id: 813, text: "Is the vibe 'Bright' or 'Happy'?", check: (s) => ["bright", "happy", "fun", "chill"].includes(s.attributes.vibe) ? "yes" : "no", allowed: null, tier: "balancing", tag: "bright-q", exclusion: ["dark-q"] },

    // --- 🇰🇷 K-POP SPECIFIC ---
    { id: 210, text: "Is it a 4th Gen group (2018+)?", check: (s) => s.attributes.gen === "4th" ? "yes" : "no", allowed: ["k-pop"], tier: "balancing", tag: "4th-gen-q", exclusion: ["3rd-gen-q", "2nd-gen-q"] },
    { id: 211, text: "Is it a 3rd Gen group (BTS/BP Era)?", check: (s) => s.attributes.gen === "3rd" ? "yes" : "no", allowed: ["k-pop"], tier: "balancing", tag: "3rd-gen-q", exclusion: ["4th-gen-q", "2nd-gen-q"] },
    { id: 212, text: "Is it a 2nd Gen group (Older)?", check: (s) => s.attributes.gen === "2nd" ? "yes" : "no", allowed: ["k-pop"], tier: "balancing", tag: "2nd-gen-q", exclusion: ["4th-gen-q", "3rd-gen-q"] },
    { id: 213, text: "Is the concept 'Girl Crush' / Fierce?", check: (s) => ["fierce", "confident", "rebellious", "dark"].includes(s.attributes.vibe) ? "yes" : "no", allowed: ["k-pop"], tier: "balancing" },
    { id: 214, text: "Is the concept 'Cute' / Fresh?", check: (s) => ["bright", "happy", "fresh"].includes(s.attributes.vibe) ? "yes" : "no", allowed: ["k-pop"], tier: "balancing" },

    // --- 🎧 HIP-HOP SPECIFIC ---
    { id: 450, text: "Is it 'Old School' (90s/00s)?", check: (s) => s.attributes.gen === "old-school" || s.attributes.year < 2010 ? "yes" : "no", allowed: ["hip-hop"], tier: "balancing", tag: "old-school-q", exclusion: ["new-school-q"] },
    { id: 451, text: "Is it Modern / Trap (2015+)?", check: (s) => s.attributes.year >= 2015 && !s.attributes.gen.includes("old-school") ? "yes" : "no", allowed: ["hip-hop"], tier: "balancing", tag: "new-school-q", exclusion: ["old-school-q"] },
    { id: 452, text: "Is the lyrics primarily about Success/Flexing?", check: (s) => ["flex", "money", "success", "fame", "wealth"].includes(s.attributes.theme) ? "yes" : "no", allowed: ["hip-hop"], tier: "balancing" },
    { id: 453, text: "Is the song socially conscious / lyrical?", check: (s) => ["society", "struggle", "political", "storytelling"].includes(s.attributes.theme) ? "yes" : "no", allowed: ["hip-hop"], tier: "balancing" },

    // --- 🎸 ROCK SPECIFIC ---
    { id: 550, text: "Is it Classic Rock (Pre-2000)?", check: (s) => s.attributes.gen === "classic" || s.attributes.year < 2000 ? "yes" : "no", allowed: ["rock"], tier: "balancing", tag: "classic-rock-q", exclusion: ["modern-rock-q"] },
    { id: 551, text: "Is it Modern / Alt Rock (Post-2000)?", check: (s) => s.attributes.year >= 2000 ? "yes" : "no", allowed: ["rock"], tier: "balancing", tag: "modern-rock-q", exclusion: ["classic-rock-q"] },
    { id: 552, text: "Is the vibe rebellious / angst?", check: (s) => ["angst", "rebellious", "aggressive"].includes(s.attributes.vibe) ? "yes" : "no", allowed: ["rock"], tier: "balancing" },
    { id: 553, text: "Is it a rock ballad / slower song?", check: (s) => s.attributes.tempo === "medium" || s.attributes.tempo === "slow" ? "yes" : "no", allowed: ["rock"], tier: "balancing" },

    // --- 🎤 POP SPECIFIC ---
    { id: 350, text: "Is it from the 2010s (2010-2019)?", check: (s) => s.attributes.year >= 2010 && s.attributes.year < 2020 ? "yes" : "no", allowed: ["pop"], tier: "balancing" },
    { id: 351, text: "Is it a Boyband / Girl Group?", check: (s) => s.tags.includes("boy-group") || s.tags.includes("girl-group") ? "yes" : "no", allowed: ["pop"], tier: "balancing" },
    { id: 352, text: "Is the theme Romance/Love?", check: (s) => ["romance", "love", "breakup", "heartbreak"].includes(s.attributes.theme) ? "yes" : "no", allowed: ["pop", "r&b"], tier: "balancing" },
    { id: 353, text: "Is it a Summer / Party anthem?", check: (s) => ["summer", "party", "club", "fun"].includes(s.attributes.theme) ? "yes" : "no", allowed: ["pop"], tier: "balancing" },

    // --- 🎹 R&B SPECIFIC ---
    { id: 650, text: "Is it 'Old School' R&B (90s/00s)?", check: (s) => s.attributes.gen === "old-school" || s.attributes.year < 2010 ? "yes" : "no", allowed: ["r&b"], tier: "balancing", tag: "old-rnb-q" },
    { id: 651, text: "Is it Modern / Alternative R&B?", check: (s) => s.attributes.year >= 2010 ? "yes" : "no", allowed: ["r&b"], tier: "balancing", tag: "mod-rnb-q" },
    { id: 652, text: "Is the song explicitly about heartbreak/exes?", check: (s) => ["heartbreak", "breakup", "jealousy", "toxic"].includes(s.attributes.theme) ? "yes" : "no", allowed: ["r&b"], tier: "balancing" },

    // ============================
    // 🔴 TIER 3: KILLER (Score 8-4) - GENRE SPECIFIC
    // ============================
    // Specific traits that identify the artist/song.

    // --- 🇰🇷 K-POP KILLERS ---
    { id: 230, text: "Is the group from a Big 4 agency?", check: (s) => s.tags.includes("big-4") ? "yes" : "no", allowed: ["k-pop"], tier: "killer" },
    { id: 231, text: "Is the group known for self-producing?", check: (s) => s.tags.includes("self-produced") ? "yes" : "no", allowed: ["k-pop"], tier: "killer" },
    { id: 232, text: "Is the leader also a main rapper?", check: (s) => s.tags.includes("rapper-leader") ? "yes" : "no", allowed: ["k-pop"], tier: "killer" },
    { id: 233, text: "Was the group formed on a survival show?", check: (s) => s.tags.includes("survival-show") ? "yes" : "no", allowed: ["k-pop"], tier: "killer" },

    // --- 🎤 POP KILLERS ---
    { id: 302, text: "Was this song a global Mega-Hit?", check: (s) => s.attributes.popularity === "mega" ? "yes" : "no", allowed: ["pop"], tier: "killer" },
    { id: 303, text: "Is the artist British/Irish?", check: (s) => ["Adele", "Harry Styles", "One Direction", "Dua Lipa", "Coldplay", "Queen", "Arctic Monkeys", "Beatles", "Pink Floyd"].includes(s.artist) ? "yes" : "no", allowed: ["pop", "rock"], tier: "killer" },
    { id: 304, text: "Is the artist Canadian?", check: (s) => ["Justin Bieber", "Shawn Mendes", "The Weeknd", "Drake", "Celine Dion"].includes(s.artist) ? "yes" : "no", allowed: ["pop", "r&b", "hip-hop"], tier: "killer" },
    { id: 305, text: "Is the artist a former Disney/Nick star?", check: (s) => ["Miley Cyrus", "Selena Gomez", "Ariana Grande", "Demi Lovato", "Jonas Brothers", "Olivia Rodrigo"].includes(s.artist) ? "yes" : "no", allowed: ["pop"], tier: "killer" },

    // --- 🎧 HIP-HOP KILLERS ---
    { id: 402, text: "Is the beat sample-heavy?", check: (s) => s.tags.includes("sample-heavy") || s.tags.includes("classic") ? "yes" : "no", allowed: ["hip-hop"], tier: "killer" },
    { id: 403, text: "Is the artist from New York (East Coast)?", check: (s) => ["Jay-Z", "Nas", "Wu-Tang Clan", "50 Cent", "Pop Smoke", "Cardi B", "Joey Bada$$"].includes(s.artist) ? "yes" : "no", allowed: ["hip-hop"], tier: "killer" },
    { id: 404, text: "Is the artist from the West Coast (LA)?", check: (s) => ["Kendrick Lamar", "Dr. Dre", "Snoop Dogg", "Tupac", "Tyler, The Creator"].includes(s.artist) ? "yes" : "no", allowed: ["hip-hop"], tier: "killer" },
    { id: 405, text: "Is the artist from the South (Atlanta/Houston)?", check: (s) => ["Travis Scott", "OutKast", "Megan Thee Stallion", "Lil Wayne", "Migos"].includes(s.artist) ? "yes" : "no", allowed: ["hip-hop"], tier: "killer" },

    // --- 🎸 ROCK KILLERS ---
    { id: 502, text: "Does it feature a legendary guitar solo?", check: (s) => s.tags.includes("guitar-solo") ? "yes" : "no", allowed: ["rock"], tier: "killer" },
    { id: 503, text: "Is the band British?", check: (s) => ["Queen", "Beatles", "Pink Floyd", "Arctic Monkeys", "Coldplay", "Radiohead", "Muse", "The Smiths"].includes(s.artist) ? "yes" : "no", allowed: ["rock"], tier: "killer" },
    { id: 504, text: "Is the lead singer deceased?", check: (s) => ["Nirvana", "Linkin Park", "Queen"].includes(s.artist) ? "yes" : "no", allowed: ["rock"], tier: "killer" },
    
    // --- 🎹 R&B KILLERS ---
    { id: 601, text: "Is the singer known for high falsetto?", check: (s) => s.tags.includes("falsetto") || ["The Weeknd", "Frank Ocean", "Miguel", "Prince"].includes(s.artist) ? "yes" : "no", allowed: ["r&b"], tier: "killer" },
    { id: 602, text: "Is it a club/party classic?", check: (s) => s.tags.includes("club-classic") || s.tags.includes("party") ? "yes" : "no", allowed: ["r&b", "pop"], tier: "killer" },

    // ============================
    // 🟡 TIER 4: SIGNATURE (Score 3-0)
    // ============================
    // Giveaways and Rewards. 
    { id: 100, text: "Show me a lyric snippet?", action: "lyric", allowed: null, tier: "signature" },
    { id: 101, text: "Show the album cover (Blurred)?", action: "cover", allowed: null, tier: "signature" },
    { id: 102, text: "Reveal the Agency/Label?", action: "agency", allowed: ["k-pop"], tier: "signature" },
    { id: 103, text: "Name another hit song by them?", action: "other_hit", allowed: ["pop", "hip-hop", "rock", "r&b"], tier: "signature" },
    { id: 104, text: "Reveal Artist Nationality/Region?", action: "agency", allowed: ["rock", "hip-hop", "pop", "r&b"], tier: "signature" }
];

// --- MISSING VARIABLE FIXED HERE ---
const responsePool = {
    fact: { yes: ["Yes.", "Correct."], no: ["No.", "Incorrect."] },
    fuzzy: { yes: ["Definitely.", "Absolutely."], no: ["Not really.", "I doubt it."], mixed: ["It's debatable."] },
    signature: { yes: ["That is a defining trait.", "Yes, exactly.", "Spot on observation."] }
};

// ==========================================
// 3. GAME STATE
// ==========================================
let currentSong = null;
let currentGenre = "all";
let currentOptions = [];
let askedQuestionIds = new Set();
let bannedQuestionTags = new Set(); 
let questionsLeft = 20;
let gameOver = false;

// ==========================================
// 4. CORE FUNCTIONS
// ==========================================

function startGame(difficulty) {
    const selectedGenre = document.getElementById("genre-select").value;
    currentGenre = selectedGenre;

    const filteredSongs = songDatabase.filter((s) => {
        const difficultyMatch = s.difficulty === difficulty;
        const genreMatch = selectedGenre === "all" || s.attributes.genre.includes(selectedGenre);
        return difficultyMatch && genreMatch;
    });

    if (filteredSongs.length === 0) {
        alert(`No songs found for this selection.`);
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredSongs.length);
    currentSong = filteredSongs[randomIndex];

    currentSong.spotifyId = null;
    fetchSpotifyData(currentSong.title, currentSong.artist).then((data) => {
        if (data) {
            currentSong.spotifyId = data.id;
            if (data.cover) currentSong.cover = data.cover;
        }
    });

    questionsLeft = 20;
    gameOver = false;
    askedQuestionIds.clear();
    bannedQuestionTags.clear(); 

    document.getElementById("clue-list").innerHTML = "";
    document.getElementById("guess-input").value = "";
    document.getElementById("start-screen").classList.remove("active");
    document.getElementById("game-screen").classList.add("active");
    document.getElementById("game-screen").classList.remove("hidden");

    const genreText = selectedGenre === "all" ? "Mixed" : selectedGenre.toUpperCase();
    document.getElementById("current-difficulty").innerText = `${difficulty.toUpperCase()} (${genreText})`;

    updateStatus();
    refreshOptions();
}

function refreshOptions() {
  let hand = [];
  let currentPhase = "";

  // 1. DETERMINE PHASE BASED ON SCORE
  if (questionsLeft > 14) {
    currentPhase = "vague"; // 20, 19, 18, 17, 16, 15
  } else if (questionsLeft > 8) {
    currentPhase = "balancing"; // 14, 13, 12, 11, 10, 9
  } else if (questionsLeft > 4) {
    // CHANGED FROM > 3 TO > 4
    currentPhase = "killer"; // 8, 7, 6, 5
  } else {
    currentPhase = "signature"; // 4, 3, 2, 1, 0
  }

  console.log(`Current Phase: ${currentPhase} (${questionsLeft} turns left)`);

  // 2. INJECT UNIQUE SONG TRIVIA (Only in Signature Phase)
  if (
    currentPhase === "signature" &&
    currentSong.signature &&
    currentSong.signature.length > 0
  ) {
    const unaskedSigs = currentSong.signature
      .map((text, index) => ({
        text,
        id: `sig-${index}`,
        tier: "signature",
        cost: 2,
        check: () => "yes",
      }))
      .filter((item) => !askedQuestionIds.has(item.id));

    if (unaskedSigs.length > 0) {
      hand.push(unaskedSigs[Math.floor(Math.random() * unaskedSigs.length)]);
    }
  }

  // 3. FILTER MASTER LIST
  const allValid = questionBank.filter((q) => {
    if (askedQuestionIds.has(q.id)) return false;
    if (q.tag && bannedQuestionTags.has(q.tag)) return false;
    if (
      q.allowed &&
      currentGenre !== "all" &&
      !q.allowed.includes(currentGenre)
    )
      return false;
    return true;
  });

  // 4. SELECT POOL BASED ON PHASE
  // Waterfall Logic: If current tier empty, fall back to previous tiers
  let primaryPool = allValid.filter((q) => q.tier === currentPhase);
  let backupPool = [];

  if (currentPhase === "signature")
    backupPool = allValid.filter((q) => q.tier === "killer");
  else if (currentPhase === "killer")
    backupPool = allValid.filter((q) => q.tier === "balancing");
  else if (currentPhase === "balancing")
    backupPool = allValid.filter((q) => q.tier === "vague");

  // 5. FILL HAND
  primaryPool.sort(() => 0.5 - Math.random());
  backupPool.sort(() => 0.5 - Math.random());

  while (hand.length < 4 && primaryPool.length > 0) {
    hand.push(primaryPool.pop());
  }
  while (hand.length < 4 && backupPool.length > 0) {
    hand.push(backupPool.pop());
  }

  // 6. EMERGENCY GENERATOR (Infinite Fallback)
  if (hand.length < 4) {
    const fillers = [
      {
        id: `fill-${Math.random()}`,
        text: "Does title start with 'T'?",
        check: (s) => (s.title.startsWith("T") ? "yes" : "no"),
        tier: "vague",
      },
      {
        id: `fill-${Math.random()}`,
        text: "Is the year odd?",
        check: (s) => (s.attributes.year % 2 !== 0 ? "yes" : "no"),
        tier: "vague",
      },
      {
        id: `fill-${Math.random()}`,
        text: "Is the title > 10 chars?",
        check: (s) => (s.title.length > 10 ? "yes" : "no"),
        tier: "vague",
      },
    ];
    while (hand.length < 4) hand.push(fillers.pop());
  }

  currentOptions = hand.sort(() => 0.5 - Math.random());

  // 7. RENDER
  const container = document.getElementById("dynamic-options");
  container.innerHTML = "";

  currentOptions.forEach((q, index) => {
    const btn = document.createElement("button");
    btn.className = "q-btn";

    // Visual Logic per Tier
    btn.style.border = "1px solid rgba(255,255,255,0.2)";
    if (q.tier === "balancing") {
      btn.style.border = "1px solid #00d4ff";
      btn.style.color = "#e0faff";
    } else if (q.tier === "killer") {
      btn.style.border = "1px solid #ff007a";
      btn.style.color = "#ffe0ec";
    } else if (q.tier === "signature") {
      btn.style.border = "1px solid #ffd700";
      btn.style.color = "#ffd700";
      btn.style.boxShadow = "0 0 10px rgba(255, 215, 0, 0.1)";
    }

    const costText = q.cost && q.cost > 1 ? ` (-${q.cost})` : "";
    btn.innerText = q.text + costText;
    btn.onclick = () => handleQuestionClick(index);
    container.appendChild(btn);
  });
}

function handleQuestionClick(index) {
    if (gameOver || questionsLeft <= 0) return;

    const selectedQ = currentOptions[index];
    const cost = selectedQ.cost || 1;

    if (questionsLeft < cost) return alert("Not enough turns left!");

    askedQuestionIds.add(selectedQ.id);

    if (selectedQ.action) {
        let content = "";
        if (selectedQ.action === "lyric") content = `<span class="lyric-text">" ${currentSong.lyric} "</span>`;
        else if (selectedQ.action === "cover") content = `<img src="${currentSong.cover || 'https://placehold.co/100'}" class="clue-img" alt="Blurred Cover">`;
        else if (selectedQ.action === "agency") content = `<span style="color:var(--primary); font-weight:bold;">${currentSong.agency}</span>`;
        else if (selectedQ.action === "other_hit") content = `Also famous for: <span style="color:var(--primary); font-weight:bold;">"${currentSong.other_hit}"</span>`;
        
        addClueToLog(selectedQ.text, content, "answer-neutral");
    } else {
        const logicResult = selectedQ.check(currentSong) || "no";
        
        if (logicResult === "yes" && selectedQ.exclusion) {
            selectedQ.exclusion.forEach(tag => bannedQuestionTags.add(tag));
        }

        let typePool = responsePool["fact"];
        if (selectedQ.tier === "signature") typePool = responsePool["signature"];
        else if (selectedQ.type) typePool = responsePool[selectedQ.type];

        const phrasePool = typePool[logicResult] || typePool["no"];
        const finalAnswer = phrasePool[Math.floor(Math.random() * phrasePool.length)];

        let colorClass = logicResult === "yes" ? "answer-positive" : "answer-negative";
        addClueToLog(selectedQ.text, finalAnswer, colorClass);
    }

    questionsLeft -= cost;
    updateStatus();
    if (questionsLeft > 0) refreshOptions();
    else endGame(false);
}

function addClueToLog(question, answerHTML, colorClass) {
    const list = document.getElementById("clue-list");
    const li = document.createElement("li");
    li.innerHTML = `<div style="font-size: 0.85em; opacity: 0.8; margin-bottom: 2px;">${question}</div><div class="${colorClass}" style="font-size: 1.1em;">${answerHTML}</div>`;
    list.prepend(li);
}

function updateStatus() {
    const countEl = document.getElementById("question-count");
    countEl.innerText = questionsLeft;
    countEl.style.color = questionsLeft <= 5 ? "#cf6679" : "inherit";
}

document.getElementById("guess-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        submitGuess();
    }
});

// --- AESTHETIC: MOUSE SPOTLIGHT ---
const spotlight = document.getElementById("cursor-spotlight");
if (spotlight) {
    document.addEventListener("mousemove", (e) => {
        spotlight.style.left = e.clientX + "px";
        spotlight.style.top = e.clientY + "px";
    });
}

// ==========================================
// ❄️ SNOWFALL ENGINE
// ==========================================
function createSnowflake() {
    const snowContainer = document.getElementById('snow-container');
    if (!snowContainer) return;

    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    // Randomize properties for natural feel
    const size = Math.random() * 4 + 2; // Size between 2px and 6px
    const startPosition = Math.random() * 100; // Random horizontal start (0-100vw)
    const duration = Math.random() * 5 + 5; // Fall speed between 5s and 10s
    const delay = Math.random() * 5; // Random start delay
    const opacity = Math.random() * 0.5 + 0.3; // Random transparency

    // Apply styles
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${startPosition}vw`;
    snowflake.style.animationDuration = `${duration}s`;
    snowflake.style.animationDelay = `-${delay}s`; // Start immediately at random points
    snowflake.style.opacity = opacity;

    snowContainer.appendChild(snowflake);

    // Clean up snowflake after it falls to prevent memory leaks
    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000);
}

// Generate snow continuously
// Create a new flake every 100ms
setInterval(createSnowflake, 100);

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

    let spotifyPlayer = "";
    if (currentSong.spotifyId) {
        spotifyPlayer = `
            <div style="margin-top: 15px;">
                <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${currentSong.spotifyId}?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
        `;
    }

    const imgUrl = currentSong.cover || "https://placehold.co/150x150?text=No+Cover";

    if (win) {
        title.innerText = "🎉 You Found It!";
        title.style.color = "#03dac6";
        msg.innerHTML = `<img src="${imgUrl}" style="width:120px; border-radius:10px; margin-bottom:10px; box-shadow: 0 0 15px var(--primary);"><br>The song was <strong>${currentSong.title}</strong> by ${currentSong.artist}.<br>${spotifyPlayer}`;
    } else {
        title.innerText = "💀 Game Over";
        title.style.color = "#cf6679";
        msg.innerHTML = `<img src="${imgUrl}" style="width:100px; border-radius:10px; opacity: 0.5; margin-bottom:10px;"><br>You ran out of questions!<br>The song was <strong>${currentSong.title}</strong>.<br>${spotifyPlayer}`;
    }
}