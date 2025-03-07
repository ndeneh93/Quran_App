const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const bookmarks = {};
const API_BASE_URL = ' https://quranapi.pages.dev/api/surah.json';

// Chapters List Route
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chapters?language=en`);
    res.render('chapters', { chapters: response.data.chapters });
  } catch (error) {
    res.status(500).send('Error fetching chapters');
  }
});

// Single Chapter Route
app.get('/chapter/:id', async (req, res) => {
  const chapterId = req.params.id;
  const userIp = req.ip;
  try {
    const versesResp = await axios.get(`${API_BASE_URL}/verses/by_chapter/${chapterId}?language=en&translations=131`);
    const chapterResp = await axios.get(`${API_BASE_URL}/chapters/${chapterId}?language=en`);
    const userBookmarks = bookmarks[userIp] || [];
    res.render('chapter', {
      chapterId,
      chapterName: chapterResp.data.chapter.name_simple,
      verses: versesResp.data.verses,
      userBookmarks,
      userIp,
    });
  } catch (error) {
    res.status(500).send('Error fetching chapter');
  }
});

// This is the Bookmark Routes
app.post('/bookmark', (req, res) => {
  const { verseId, chapterId } = req.body;
  const userIp = req.ip;
  if (!bookmarks[userIp]) bookmarks[userIp] = [];
  if (!bookmarks[userIp].includes(verseId)) bookmarks[userIp].push(verseId);
  res.redirect(`/chapter/${chapterId}`);
});

app.post('/remove-bookmark', (req, res) => {
  const { verseId, chapterId } = req.body;
  const userIp = req.ip;
  if (bookmarks[userIp]) {
    bookmarks[userIp] = bookmarks[userIp].filter((id) => id !== verseId);
  }
  res.redirect(`/chapter/${chapterId}`);
});

// Bookmarks Route for chapter(s)
app.get('/bookmarks', async (req, res) => {
  const userIp = req.ip;
  const userBookmarks = bookmarks[userIp] || [];

  if (userBookmarks.length === 0) {
    return res.render('bookmarks', { verses: [] });
  }

  try {
    const versePromises = userBookmarks.map((verseId) =>
      axios.get(`${API_BASE_URL}/verses/by_key/${verseId}?language=en&translations=131`)
    );
    const verseResponses = await Promise.all(versePromises);
    const verses = verseResponses.map((resp) => resp.data.verse);
    res.render('bookmarks', { verses });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching bookmarks');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});