# 🎵 Neon-Melody: A Song Guessing Game

![Project Banner](https://i.pinimg.com/736x/fb/11/9c/fb119c874f2d591f408e282d0efed052.jpg)

> A logic-based web game where players deduce a hidden song by asking the system strategic questions. Featuring a "Midnight & Lilac" aesthetic, smart exclusion logic, and Spotify integration.

## ✨ Features

### 🧠 Smart Logic Engine
The game utilizes a tiered questioning system that adapts as your score (questions left) decreases:
1.  **Vague Phase (20-15 turns):** Broad filters (Gender, Title length).
2.  **Balancing Phase (14-9 turns):** Logic bridges (Genre style, Group size, Era) with **Exclusion Logic** (e.g., if "Male" is confirmed, "Female" questions are banned).
3.  **Killer Phase (8-4 turns):** Specific identifiers (Nationality, Agency, Sample usage).
4.  **Signature Phase (3-0 turns):** Dead giveaways (Lyric snippets, Album covers, Audio previews).

### 🎨 Immersive Aesthetic
* **Midnight & Lilac Theme:** A deep black and purple color palette.
* **Atmospheric Effects:** Smooth background animations, spotlight cursor tracking, and a gentle snowfall effect for the holidays.
* **Glassmorphism:** Modern UI elements with frosted glass effects and neon glows.
* **Ultra-Smooth Animations:** Fluid transitions using cubic-bezier curves.

### 🎧 Spotify Integration
* **Real-time Data:** Fetches Album Art and Track IDs dynamically.
* **Audio Player:** Unlocks an embedded Spotify player upon winning or losing.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project running on your local machine.

### Prerequisites
* A modern web browser (Chrome, Firefox, Edge).
* A code editor (VS Code recommended).
* **Optional:** A local server extension (like "Live Server" for VS Code) is recommended to avoid CORS issues with the API.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/neon-melody-game.git](https://github.com/yourusername/neon-melody-game.git)
    ```
2.  **Navigate to the project folder:**
    ```bash
    cd neon-melody-game
    ```
3.  **Open `index.html`:**
    * If using VS Code, right-click `index.html` and select **"Open with Live Server"**.
    * Otherwise, simply double-click the file to open it in your browser.

---

## ⚙️ Configuration (Spotify API)

This project uses the Spotify Web API. To ensure the game works correctly, you should generate your own API credentials.

1.  Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
2.  Create a new app.
3.  Copy your **Client ID** and **Client Secret**.
4.  Open `script.js` and locate the configuration section at the top:

```javascript
// ==========================================
// 0. SPOTIFY CONFIGURATION
// ==========================================
const clientId = "YOUR_CLIENT_ID_HERE";
const clientSecret = "YOUR_CLIENT_SECRET_HERE";
