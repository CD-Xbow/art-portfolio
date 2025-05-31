// Populate dropdowns
function populateDropdowns() {
  const typeSel = document.querySelector('select[name="type"]');
  ART_TYPES.forEach(type => {
    const opt = document.createElement('option');
    opt.value = type; opt.textContent = type;
    typeSel.appendChild(opt);
  });
  const artistSel = document.querySelector('select[name="primaryArtist"]');
  PRIMARY_ARTISTS.forEach(artist => {
    const opt = document.createElement('option');
    opt.value = artist; opt.textContent = artist;
    artistSel.appendChild(opt);
  });
}
document.addEventListener('DOMContentLoaded', populateDropdowns);