<div align="center">
  <img src="src/assets/lumix-logo.svg" alt="Lumix Logo" width="120" />
</div>

# Lumix

Lumix is a simple website where you can browse your favorite movies and TV series. You can explore shows, search for specific titles, and save them to your bookmarks so you don't forget them!

**Live Link**: [https://clouemac.com/lumix/](https://clouemac.com/lumix/)

## How to Run it on Your Computer

Follow these simple steps to run the website on your own computer:

### What You Need

1. **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
2. **TMDb Account**: You need an API key from The Movie Database (TMDb). You can register and get an API key [here](https://www.themoviedb.org/documentation/api).

### Step-by-Step Setup

1. **Clone the project** (if you haven't already):
   Open your terminal and type:

   ```bash
   git clone <your-repository-url>
   cd Lumix
   ```

2. **Install the required files**:
   Type this command and press enter:

   ```bash
   npm install
   ```

3. **Set up the secret keys**:
   Copy the `.env.example` file and save it as `.env`.

   _On Windows (Command Prompt), you can run:_ `copy .env.example .env`

   _On Mac/Linux, you can run:_ `cp .env.example .env`

   Open the new `.env` file and replace the placeholder text with your real TMDb keys:

   ```env
   VITE_TMDB_API_KEY="Your API key on TMDb"
   VITE_TMDB_ACCESS_TOKEN="Your API key on TMDb"
   VITE_BASE_URL="https://api.themoviedb.org/3"
   VITE_IMAGE_BASE_URL="https://image.tmdb.org/t/p/original"
   ```

4. **Start the website**:
   Type this command:

   ```bash
   npm run dev
   ```

5. **View the website**:
   Open your browser and put the link shown in your terminal (usually `http://localhost:5173`).
