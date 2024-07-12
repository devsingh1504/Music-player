let term = "";
let playlist = [];

const updateTerm = async () => {
  term = document.getElementById("searchTerm").value;
  if (!term) {
    alert("Please enter a search term");
    return;
  }

  const url = `https://itunes.apple.com/search?term=${term}`;
  const songContainer = document.getElementById("songs");

  // Clear previous search results
  songContainer.innerHTML = "";

  try {
    const response = await fetch(url);
    const data = await response.json();
    const artists = data.results;

    artists.forEach((result) => {
      // Create HTML Elements
      const article = document.createElement("article"),
        artist = document.createElement("p"),
        song = document.createElement("h4"),
        img = document.createElement("img"),
        audio = document.createElement("audio"),
        audioSource = document.createElement("source"),
        addButton = document.createElement("button");

      // Set content
      artist.innerHTML = result.artistName;
      song.innerHTML = result.trackName;
      img.src = result.artworkUrl100;
      audioSource.src = result.previewUrl;
      audio.controls = true;
      addButton.innerHTML = "Add to Playlist";

      // Add to Playlist functionality
      addButton.addEventListener("click", () => {
        addToPlaylist(result);
      });

      // Append elements
      audio.appendChild(audioSource);
      article.appendChild(img);
      article.appendChild(artist);
      article.appendChild(song);
      article.appendChild(audio);
      article.appendChild(addButton);
      songContainer.appendChild(article);
    });
  } catch (error) {
    console.error("Request failed:", error);
  }
};

const addToPlaylist = (song) => {
  playlist.push(song);
  displayPlaylist();
};

const displayPlaylist = () => {
  const playlistItems = document.getElementById("playlistItems");
  playlistItems.innerHTML = "";

  playlist.forEach((item) => {
    const li = document.createElement("li"),
      songTitle = document.createElement("span"),
      audio = document.createElement("audio"),
      audioSource = document.createElement("source");

    songTitle.innerHTML = `${item.trackName} by ${item.artistName}`;
    audioSource.src = item.previewUrl;
    audio.controls = true;

    audio.appendChild(audioSource);
    li.appendChild(songTitle);
    li.appendChild(audio);
    playlistItems.appendChild(li);
  });
};

const searchBtn = document.getElementById("searchTermBtn");
searchBtn.addEventListener("click", updateTerm);

document.addEventListener(
  "play",
  (event) => {
    const audios = document.getElementsByTagName("audio");
    for (let i = 0; i < audios.length; i++) {
      if (audios[i] !== event.target) {
        audios[i].pause();
      }
    }
  },
  true
);
