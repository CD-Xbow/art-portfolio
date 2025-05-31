function renderDisplayForm(record) {
  document.getElementById('work-title').textContent = record.title;
  document.getElementById('date-commenced').textContent = record.dateCommenced || "-";
  document.getElementById('link1').href = record.link1 || "#";
  document.getElementById('link2').href = record.link2 || "#";
  document.getElementById('link3').href = record.link3 || "#";
  // ... map other fields

  const mediaViewer = document.getElementById('media-viewer');
  mediaViewer.innerHTML = '';
  if (record.imagePath) {
    const img = document.createElement('img');
    img.src = record.imagePath;
    img.alt = record.title;
    img.onclick = () => showPopupImage(record.imagePath);
    mediaViewer.appendChild(img);
  } else if (record.videoPath) {
    const vid = document.createElement('video');
    vid.src = record.videoPath;
    vid.controls = true;
    vid.onclick = () => vid.play();
    mediaViewer.appendChild(vid);
  } // add audio/other as needed
}

function showPopupImage(path) {
  const modal = document.getElementById('popup-modal');
  modal.innerHTML = `<img src="${path}" alt="Large artwork"><span onclick="closePopup()" style="position:absolute;top:1em;right:2em;color:#fff;font-size:2em;cursor:pointer;">&times;</span>`;
  modal.classList.remove('hidden');
}
function closePopup() {
  document.getElementById('popup-modal').classList.add('hidden');
  document.getElementById('popup-modal').innerHTML = '';
}