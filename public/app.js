const API_URL = '/api/news';

// Only run news submission logic if form exists
const form = document.getElementById('news-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const category = document.getElementById('category').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const author = document.getElementById('author').value;
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, category, imageUrl, author })
    });
    alert('News posted!');
    form.reset();
  });
}

// Fetch and display news
async function fetchNews(category = null) {
  let url = API_URL;
  if (category) url += `?category=${encodeURIComponent(category)}`;
  const response = await fetch(url);
  const newsList = await response.json();
  const newsSection = document.getElementById('news-list');
  if (!newsSection) return;
  newsSection.innerHTML = '';
  newsList.forEach(news => {
    const div = document.createElement('div');
    div.className = 'news-item';
    div.innerHTML = `
      <h3>${news.title}</h3>
      <div style="font-size: 1rem; color: #388e3c; margin-bottom: 8px;">${news.category || ''}</div>
      <p>${news.content}</p>
      ${news.imageUrl ? `<img src="${news.imageUrl}" style="width:100%;max-width:400px;border-radius:4px;">` : ''}
      <div style="font-size:0.9em;color:#155724; margin-top: 8px;">By ${news.author || 'Anonymous'} | ${new Date(news.date).toLocaleString()}</div>
    `;
    newsSection.appendChild(div);
  });
}

window.filterCategory = function (cat) {
  fetchNews(cat);
};

if (document.getElementById('news-list')) fetchNews();
