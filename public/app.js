const API_URL = '/api/news';

//const API_URL = 'http://localhost:5000/api/news';

async function fetchNews() {
    const response = await fetch(API_URL);
    const newsList = await response.json();
    const newsSection = document.getElementById('news-list');
    newsSection.innerHTML = '';
    newsList.forEach(news => {
        const div = document.createElement('div');
        div.className = 'news-item';
        div.innerHTML = `
            <h3>${news.title}</h3>
            <p>${news.content}</p>
            ${news.imageUrl ? `<img src="${news.imageUrl}" style="width:100%;max-width:400px;border-radius:4px;">` : ''}
            <div style="font-size:0.9em;color:#155724;">By ${news.author || 'Anonymous'} | ${new Date(news.date).toLocaleString()}</div>
        `;
        newsSection.appendChild(div);
    });
}

document.getElementById('news-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const author = document.getElementById('author').value;
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, imageUrl, author })
    });
    fetchNews();
    e.target.reset();
});

fetchNews();
