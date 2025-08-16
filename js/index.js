async function fillVideos() {
    const response = await fetch("data/videos.json");
    const videos = await response.json();

    const videosContainer = document.querySelector("#videos");
    videosContainer.innerHTML = "";

    for (let v of videos) {
        let videoBox = document.createElement("div");
        videoBox.id = v.id;
        videoBox.className = "video-box";

        let language = document.createElement("div");
        language.className = "video-language";
        language.textContent = v.lang;

        let mediaContainer = document.createElement("div");

        // Build local path
        let localPath = `videos/${v.title}.${v.ext}`;
        let useLocal = false;

        // Check if local file exists using fetch HEAD
        try {
            let head = await fetch(localPath, { method: "HEAD" });
            if (head.ok) useLocal = true;
        } catch (e) {
            useLocal = false;
        }

        if (useLocal) {
            let video = document.createElement("video");
            video.controls = true;

            let source = document.createElement("source");
            source.src = localPath;
            source.type = `video/${v.ext}`;
            video.appendChild(source);

            mediaContainer.appendChild(video);

        } else if (v.website === "youtube" && v.webId) {
            let iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${v.webId}`;
            iframe.title = v.title;
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.allowFullscreen = true;

            mediaContainer.appendChild(iframe);
        } else {
            mediaContainer.innerHTML = "<em>Video not available</em>";
        }

        let title = document.createElement("div");
        title.className = "video-title";
        title.textContent = v.title;

        let info = document.createElement("div");
        if (v.website === "youtube" && v.webId) {
            let address = "https://www.youtube.com/watch?v="
            info.innerHTML = `<a href="${address}${v.webId}" target="_blank">Online</a> | ${v.info}`;
        } else {
            info.textContent = v.info;
        }

        let remark = document.createElement("div");
        remark.className = "remark";
        remark.textContent = v.remark;

        videoBox.appendChild(language);
        videoBox.appendChild(mediaContainer);
        videoBox.appendChild(title);
        videoBox.appendChild(info);
        videoBox.appendChild(remark);

        videosContainer.appendChild(videoBox);
    }
}

function openAndClose(event) {

    event.currentTarget.querySelector(".problem-container").classList.toggle("closed")

}

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.navigation');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
});


