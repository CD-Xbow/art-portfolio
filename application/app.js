// --- DATA HANDLING --- //
const DB_KEY = 'artworks';
const DUMMY_DATA = [
  {
    "title": "Sunset Over the Lake",
    "imagePath": "images/sunset-lake.jpg",
    "videoPath": "",
    "audioPath": "",
    "otherPath": "",
    "dateCommenced": "2024-03-15",
    "dateFinished": "2024-03-30",
    "dateDisposal": "",
    "disposalDestination": "",
    "price": 400,
    "description": "An oil painting capturing a vivid sunset over a tranquil lake.",
    "comment": "Displayed at Spring Art Fair.",
    "primaryArtist": "Craig Castle",
    "collaborators": [],
    "materials": ["Oil paint", "Canvas"],
    "type": "Painting",
    "link1": "https://www.example.com/gallery",
    "link2": "https://www.example.com/more-info",
    "link3": "https://www.example.com/shop"
  },
  {
    "title": "City Rhythm",
    "imagePath": "images/city-rhythm.jpg",
    "videoPath": "videos/city-rhythm-timelapse.mp4",
    "audioPath": "",
    "otherPath": "",
    "dateCommenced": "2024-01-05",
    "dateFinished": "2024-01-20",
    "dateDisposal": "2024-02-10",
    "disposalDestination": "Private Collector, NY",
    "price": 1200,
    "description": "Abstract mixed media piece reflecting urban movement.",
    "comment": "Sold during New Year's Exhibition.",
    "primaryArtist": "Peter Trusler",
    "collaborators": ["John Smith"],
    "materials": ["Acrylic", "Spray paint", "Canvas"],
    "type": "Mixed Media",
    "link1": "",
    "link2": "",
    "link3": "https://www.example.com/auction"
  },
  {
    "title": "Whispering Forest",
    "imagePath": "images/whispering-forest.jpg",
    "videoPath": "",
    "audioPath": "",
    "otherPath": "",
    "dateCommenced": "2023-09-10",
    "dateFinished": "2023-10-01",
    "dateDisposal": "",
    "disposalDestination": "",
    "price": 950,
    "description": "Large-scale sculpture of intertwined branches and recycled metal.",
    "comment": "Requires two-person lift.",
    "primaryArtist": "CD Xbow",
    "collaborators": ["Alex Green", "Casey Lee"],
    "materials": ["Wood", "Recycled Metal"],
    "type": "Sculpture",
    "link1": "",
    "link2": "https://www.example.com/forest",
    "link3": ""
  },
  {
    "title": "Generative Dreams",
    "imagePath": "",
    "videoPath": "videos/generative-dreams.mp4",
    "audioPath": "",
    "otherPath": "",
    "dateCommenced": "2024-04-01",
    "dateFinished": "2024-04-12",
    "dateDisposal": "",
    "disposalDestination": "",
    "price": 0,
    "description": "Short video exploring AI-generated art and surrealism.",
    "comment": "Premiered at Digital Arts Fest.",
    "primaryArtist": "Victoria Neuman",
    "collaborators": [],
    "materials": ["Digital Video", "AI Software"],
    "type": "Video",
    "link1": "",
    "link2": "",
    "link3": ""
  },
  {
    "title": "Echoes in Code",
    "imagePath": "",
    "videoPath": "",
    "audioPath": "",
    "otherPath": "downloads/echoes.zip",
    "dateCommenced": "2023-12-01",
    "dateFinished": "2023-12-20",
    "dateDisposal": "",
    "disposalDestination": "",
    "price": 0,
    "description": "Interactive software piece generating audiovisual patterns based on user input.",
    "comment": "",
    "primaryArtist": "Charlie Marshall",
    "collaborators": ["Sam Taylor"],
    "materials": ["JavaScript", "Web Audio API"],
    "type": "Software",
    "link1": "",
    "link2": "",
    "link3": ""
  }
];

function getDB() {
  let db = localStorage.getItem(DB_KEY);
  if (!db) {
    localStorage.setItem(DB_KEY, JSON.stringify(DUMMY_DATA));
    db = localStorage.getItem(DB_KEY);
  }
  try {
    return JSON.parse(db);
  } catch {
    localStorage.setItem(DB_KEY, JSON.stringify(DUMMY_DATA));
    return DUMMY_DATA;
  }
}
function setDB(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}
function addRecord(record) {
  const db = getDB();
  db.push(record);
  setDB(db);
}
function updateRecord(idx, record) {
  const db = getDB();
  db[idx] = record;
  setDB(db);
}
function deleteRecord(idx) {
  const db = getDB();
  db.splice(idx, 1);
  setDB(db);
}

// --- UI NAVIGATION --- //
function switchSection(id) {
  document.querySelectorAll('main > section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-' + id).classList.add('active');
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  document.getElementById('nav-' + id).classList.add('active');
}

// --- MODAL --- //
function showModal(html) {
  const mbg = document.getElementById('modal-bg');
  const mcontent = document.getElementById('modal-content');
  mcontent.innerHTML = html + `<div class="modal-close" onclick="hideModal()">&times;</div>`;
  mbg.classList.remove('hidden');
}
function hideModal() {
  document.getElementById('modal-bg').classList.add('hidden');
  document.getElementById('modal-content').innerHTML = '';
}
document.getElementById('modal-bg').onclick = function(e) {
  if (e.target === this) hideModal();
};

// --- DISPLAY FORM --- //
let currentIdx = 0;
function renderDisplay(idx) {
  const db = getDB();
  if (!db.length) {
    document.getElementById('section-display').innerHTML =
      `<div style="padding:2em;text-align:center;">No records found. Add a new record.</div>`;
    return;
  }
  if (idx < 0) idx = 0;
  if (idx >= db.length) idx = db.length - 1;
  currentIdx = idx;
  const art = db[idx];
  let mediaHtml = '';
  if (art.imagePath) {
    mediaHtml += `<div class="media-type">Image</div>
      <img src="${art.imagePath}" alt="${art.title}" onclick="showModal('<img src=\\'${art.imagePath}\\' style=\\'max-width:96vw;max-height:80vh;\\'>')">`;
  }
  if (art.videoPath) {
    mediaHtml += `<div class="media-type">Video</div>
      <video src="${art.videoPath}" controls onclick="this.play()"></video>`;
  }
  if (art.audioPath) {
    mediaHtml += `<div class="media-type">Audio</div>
      <audio src="${art.audioPath}" controls onclick="this.play()"></audio>`;
  }
  if (art.otherPath) {
    const fname = art.otherPath.split('/').pop();
    mediaHtml += `<div class="media-type">Other</div>
      <a href="${art.otherPath}" target="_blank" class="btn">Download: ${fname}</a>`;
  }
  let linksHtml = '';
  [art.link1, art.link2, art.link3].forEach((l, i) => {
    if (l) linksHtml += `<a href="${l}" target="_blank" rel="noopener">Link ${i+1}</a>`;
  });
  let collab = (art.collaborators && art.collaborators.length) ? art.collaborators.join(', ') : '';
  let mats = (art.materials && art.materials.length) ? art.materials.join(', ') : '';
  document.getElementById('section-display').innerHTML = `
  <div class="display-form">
    <div class="display-left">
      <h2>${art.title} <span class="type-badge">${art.type||''}</span></h2>
      <div class="display-fields">
        <div class="field"><label>Date Commenced:</label> ${art.dateCommenced||'-'}</div>
        <div class="field"><label>Date Finished:</label> ${art.dateFinished||'-'}</div>
        <div class="field"><label>Date Disposal:</label> ${art.dateDisposal||'-'}</div>
        <div class="field"><label>Disposal Destination:</label> ${art.disposalDestination||'-'}</div>
        <div class="field"><label>Price:</label> ${art.price ? '$'+art.price : 'Not for sale'}</div>
        <div class="field"><label>Description:</label> ${art.description||''}</div>
        <div class="field"><label>Comment:</label> ${art.comment||''}</div>
        <div class="field"><label>Primary Artist:</label> ${art.primaryArtist||''}</div>
        <div class="field"><label>Collaborators:</label> ${collab}</div>
        <div class="field"><label>Materials:</label> ${mats}</div>
        <div class="display-links">${linksHtml}</div>
      </div>
      <div style="margin:1.2em 0 0 0;">
        <button class="btn" onclick="renderDisplay(${idx-1})" ${idx===0?'disabled':''}>&larr; Prev</button>
        <button class="btn" onclick="renderDisplay(${idx+1})" ${idx===db.length-1?'disabled':''}>Next &rarr;</button>
        <button class="btn" onclick="switchSection('table')">Table</button>
        <button class="btn" onclick="switchSection('new');fillEditForm(${idx})">Edit</button>
      </div>
    </div>
    <div class="display-right display-media">
      ${mediaHtml}
    </div>
  </div>
  `;
}

// --- NEW RECORD FORM --- //
function renderNewForm(editIdx = null) {
  // If editing, prefill from record
  let rec = {
    title:'', imagePath:'', videoPath:'', audioPath:'', otherPath:'',
    dateCommenced:'', dateFinished:'', dateDisposal:'', disposalDestination:'',
    price:'', description:'', comment:'', primaryArtist:'', collaborators:[],
    materials:[], type:'', link1:'', link2:'', link3:''
  };
  if (editIdx !== null) {
    const db = getDB();
    rec = Object.assign({}, db[editIdx]);
  }
  function options(arr, sel) {
    return arr.map(t => `<option value="${t}"${t===sel?' selected':''}>${t}</option>`).join('');
  }
  document.getElementById('section-new').innerHTML = `
  <form id="record-form">
  <div class="form-note">${editIdx===null?"Add a new artwork record:":"Edit record:"}</div>
  <div class="form-row"><label>Title</label>
    <input name="title" type="text" value="${rec.title||''}" required></div>
  <div class="form-row"><label>Type</label>
    <select name="type" required>
      <option value="">Select...</option>
      ${options(ART_TYPES, rec.type)}
    </select>
  </div>
  <div class="form-row"><label>Primary Artist</label>
    <select name="primaryArtist" required>
      <option value="">Select...</option>
      ${options(PRIMARY_ARTISTS, rec.primaryArtist)}
    </select>
  </div>
  <div class="form-row"><label>Collaborators (comma sep)</label>
    <input name="collaborators" type="text" value="${(rec.collaborators||[]).join(', ')}"></div>
  <div class="form-row"><label>Materials (comma sep)</label>
    <input name="materials" type="text" value="${(rec.materials||[]).join(', ')}"></div>
  <div class="form-row"><label>Date Commenced</label>
    <input name="dateCommenced" type="date" value="${rec.dateCommenced||''}"></div>
  <div class="form-row"><label>Date Finished</label>
    <input name="dateFinished" type="date" value="${rec.dateFinished||''}"></div>
  <div class="form-row"><label>Date Disposal</label>
    <input name="dateDisposal" type="date" value="${rec.dateDisposal||''}"></div>
  <div class="form-row"><label>Disposal Destination</label>
    <input name="disposalDestination" type="text" value="${rec.disposalDestination||''}"></div>
  <div class="form-row"><label>Price</label>
    <input name="price" type="number" step="0.01" value="${rec.price||''}"></div>
  <div class="form-row"><label>Description</label>
    <textarea name="description">${rec.description||''}</textarea></div>
  <div class="form-row"><label>Comment</label>
    <textarea name="comment">${rec.comment||''}</textarea></div>
  <div class="form-row"><label>Image Path</label>
    <input name="imagePath" type="text" value="${rec.imagePath||''}" placeholder="e.g. images/myart.jpg">
  </div>
  <div class="form-row"><label>Video Path</label>
    <input name="videoPath" type="text" value="${rec.videoPath||''}" placeholder="e.g. videos/myvideo.mp4">
  </div>
  <div class="form-row"><label>Audio Path</label>
    <input name="audioPath" type="text" value="${rec.audioPath||''}" placeholder="e.g. audio/mysound.mp3">
  </div>
  <div class="form-row"><label>Other Path</label>
    <input name="otherPath" type="text" value="${rec.otherPath||''}" placeholder="e.g. downloads/other.zip">
  </div>
  <div class="form-link-row">
    <input name="link1" type="text" value="${rec.link1||''}" placeholder="Link 1">
    <input name="link2" type="text" value="${rec.link2||''}" placeholder="Link 2">
    <input name="link3" type="text" value="${rec.link3||''}" placeholder="Link 3">
  </div>
  <button type="submit">${editIdx===null?"Add Record":"Save Changes"}</button>
  ${editIdx!==null ? `<button type="button" style="background:#d32f2f" onclick="if(confirm('Delete this record?')){deleteRecord(${editIdx});renderTable();switchSection('table')}">Delete</button>` : ""}
  </form>
  `;
  document.getElementById('record-form').onsubmit = function(e) {
    e.preventDefault();
    const fd = new FormData(this);
    let r = {};
    for (let [k,v] of fd.entries()) r[k]=v;
    r.collaborators = r.collaborators ? r.collaborators.split(',').map(x=>x.trim()).filter(x=>x) : [];
    r.materials = r.materials ? r.materials.split(',').map(x=>x.trim()).filter(x=>x) : [];
    r.price = Number(r.price)||0;
    if (editIdx===null) addRecord(r);
    else updateRecord(editIdx, r);
    renderTable();
    renderDisplay(editIdx===null?getDB().length-1:editIdx);
    switchSection('display');
  };
}
function fillEditForm(idx) { renderNewForm(idx); }

// --- TABLE VIEW --- //
function renderTable() {
  const db = getDB();
  let rows = db.map((art, i) => `
    <tr>
      <td>${art.title}</td>
      <td>${art.type}</td>
      <td>${art.primaryArtist}</td>
      <td>${art.dateCommenced||'-'}</td>
      <td>${art.dateFinished||'-'}</td>
      <td class="table-actions">
        <button onclick="renderDisplay(${i});switchSection('display')">View</button>
        <button onclick="fillEditForm(${i});switchSection('new')">Edit</button>
        <button class="delete" onclick="if(confirm('Delete this record?')){deleteRecord(${i});renderTable()}">Delete</button>
      </td>
    </tr>
  `).join('');
  document.getElementById('section-table').innerHTML = `
    <div class="table-scroll">
      <table>
        <thead>
          <tr><th>Title</th><th>Type</th><th>Artist</th><th>Started</th><th>Finished</th><th>Actions</th></tr>
        </thead>
        <tbody>${rows||''}</tbody>
      </table>
      <div style="margin:1em 0;">
        <button class="btn" onclick="renderNewForm();switchSection('new')">Add New Record</button>
      </div>
    </div>
  `;
}

// --- SEARCH FORM --- //
function renderSearchForm() {
  function options(arr) { return arr.map(t => `<option value="${t}">${t}</option>`).join(''); }
  document.getElementById('section-search').innerHTML = `
  <form id="search-form">
    <div class="form-note">Search artworks. Enter any fields to filter.</div>
    <div class="form-row"><label>Title</label>
      <input name="title" type="text"></div>
    <div class="form-row"><label>Type</label>
      <select name="type"><option value="">Any</option>${options(ART_TYPES)}</select></div>
    <div class="form-row"><label>Primary Artist</label>
      <select name="primaryArtist"><option value="">Any</option>${options(PRIMARY_ARTISTS)}</select></div>
    <div class="form-row"><label>Collaborators</label>
      <input name="collaborators" type="text"></div>
    <div class="form-row"><label>Materials</label>
      <input name="materials" type="text"></div>
    <div class="form-row"><label>Description</label>
      <input name="description" type="text"></div>
    <div class="form-row"><label>Comment</label>
      <input name="comment" type="text"></div>
    <div class="form-row"><label>Link</label>
      <input name="link" type="text" placeholder="Matches any link"></div>
    <button type="submit">Search</button>
  </form>
  <div id="search-results"></div>
  `;
  document.getElementById('search-form').onsubmit = function(e) {
    e.preventDefault();
    const fd = new FormData(this);
    let filters = {};
    for (let [k,v] of fd.entries()) filters[k]=v.trim().toLowerCase();
    let db = getDB().map((r,idx) => Object.assign({idx}, r));
    let rs = db.filter(r => {
      if (filters.title && !r.title.toLowerCase().includes(filters.title)) return false;
      if (filters.type && r.type!==filters.type) return false;
      if (filters.primaryArtist && r.primaryArtist!==filters.primaryArtist) return false;
      if (filters.collaborators && !(r.collaborators||[]).join(',').toLowerCase().includes(filters.collaborators)) return false;
      if (filters.materials && !(r.materials||[]).join(',').toLowerCase().includes(filters.materials)) return false;
      if (filters.description && !(r.description||'').toLowerCase().includes(filters.description)) return false;
      if (filters.comment && !(r.comment||'').toLowerCase().includes(filters.comment)) return false;
      if (filters.link && ![r.link1||'',r.link2||'',r.link3||''].join(',').toLowerCase().includes(filters.link)) return false;
      return true;
    });
    document.getElementById('search-results').innerHTML = `
      <div style="margin:1em 0 0 0;font-size:1em;">Found ${rs.length} result(s):</div>
      <div class="table-scroll" style="margin-top:0.7em;">
      <table>
        <thead><tr><th>Title</th><th>Type</th><th>Artist</th><th>Actions</th></tr></thead>
        <tbody>
        ${rs.map(r=>`
          <tr>
            <td>${r.title}</td>
            <td>${r.type}</td>
            <td>${r.primaryArtist}</td>
            <td>
              <button onclick="renderDisplay(${r.idx});switchSection('display')">View</button>
              <button onclick="fillEditForm(${r.idx});switchSection('new')">Edit</button>
            </td>
          </tr>
        `).join('')}
        </tbody>
      </table>
      </div>
    `;
  };
}

// --- CONFIGURATION --- //
function renderConfig() {
  const db = getDB();
  document.getElementById('section-config').innerHTML = `
    <div class="form-note">Database JSON Editor. <b>Backup before editing!</b></div>
    <textarea id="config-jsonarea">${JSON.stringify(db,null,2)}</textarea>
    <div id="config-buttons">
      <button onclick="trySaveConfig()">Save</button>
      <button onclick="downloadJSON()">Export</button>
      <button onclick="uploadJSON()">Import</button>
      <button onclick="if(confirm('Clear all records?')){setDB([]);renderAll()}">Clear All</button>
      <button onclick="setDB(DUMMY_DATA);renderAll()">Restore Dummy Data</button>
    </div>
    <input type="file" id="json-upload" style="display:none;">
    <div id="config-status"></div>
  `;
}
function trySaveConfig() {
  let txt = document.getElementById('config-jsonarea').value;
  try {
    let j = JSON.parse(txt);
    if (!Array.isArray(j)) throw "Not array";
    setDB(j);
    renderAll();
    document.getElementById('config-status').innerHTML = '<span class="config-status">Saved!</span>';
  } catch (e) {
    document.getElementById('config-status').innerHTML = '<span class="config-error">Invalid JSON ('+e+')</span>';
  }
}
function downloadJSON() {
  const db = getDB();
  const blob = new Blob([JSON.stringify(db,null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'artworks.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url), 2000);
}
function uploadJSON() {
  const inp = document.getElementById('json-upload');
  inp.value = '';
  inp.onchange = function() {
    const file = inp.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const j = JSON.parse(e.target.result);
        if (!Array.isArray(j)) throw "Not array";
        setDB(j);
        renderAll();
        document.getElementById('config-status').innerHTML = '<span class="config-status">Imported!</span>';
      } catch (e) {
        document.getElementById('config-status').innerHTML = '<span class="config-error">Invalid JSON ('+e+')</span>';
      }
    };
    reader.readAsText(file);
  };
  inp.click();
}

// --- RENDER ALL --- //
function renderAll() {
  renderDisplay(0);
  renderTable();
  renderNewForm();
  renderSearchForm();
  renderConfig();
}
window.renderDisplay = renderDisplay;
window.fillEditForm = fillEditForm;
window.renderTable = renderTable;
window.hideModal = hideModal;
window.deleteRecord = function(idx) { deleteRecord(idx); };

// --- NAVIGATION EVENTS --- //
document.getElementById('nav-display').onclick = () => { renderDisplay(currentIdx); switchSection('display'); };
document.getElementById('nav-table').onclick = () => { renderTable(); switchSection('table'); };
document.getElementById('nav-new').onclick = () => { renderNewForm(); switchSection('new'); };
document.getElementById('nav-search').onclick = () => { renderSearchForm(); switchSection('search'); };
document.getElementById('nav-config').onclick = () => { renderConfig(); switchSection('config'); };

// --- INITIALIZE --- //
document.addEventListener('DOMContentLoaded', function() {
  renderAll();
  switchSection('display');
});
