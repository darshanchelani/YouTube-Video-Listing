const API_URL = "https://api.freeapi.app/api/v1/public/youtube/videos";

const videoContainer = document.getElementById("video-container");
const searchBar = document.getElementById("search-bar");

let allVideos = [];

async function fetchVideos() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);

    allVideos = data.data.data.map((entry) => entry.items);
    displayVideos(allVideos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    videoContainer.innerHTML =
      "<p>Failed to load videos. Please try again later.</p>";
  }
}

function displayVideos(videos) {
  videoContainer.innerHTML = "";

  if (!Array.isArray(videos) || videos.length === 0) {
    videoContainer.innerHTML = "<p>No videos available to display.</p>";
    return;
  }

  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.className = "video-card";
    videoCard.innerHTML = `
      <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
      <div class="video-info">
        <h3>${video.snippet.title}</h3>
        <p>${video.snippet.channelTitle}</p>
      </div>
    `;

    videoCard.addEventListener("click", () => {
      window.open(`https://www.youtube.com/watch?v=${video.id}`, "_blank");
    });
    videoContainer.appendChild(videoCard);
  });
}

function filterVideos() {
  const searchTerm = searchBar.value.toLowerCase();
  const filteredVideos = allVideos.filter(
    (video) =>
      video.snippet.title.toLowerCase().includes(searchTerm) ||
      video.snippet.channelTitle.toLowerCase().includes(searchTerm)
  );
  displayVideos(filteredVideos);
}

searchBar.addEventListener("input", filterVideos);

fetchVideos();
