import express from 'express';
import {
  initialJournalConfig,
  initialMemories,
  initialReasons,
  initialPhotos,
  initialQuiz,
  initialSecretLetter
} from '../data/initialData.js';

const router = express.Router();

// In-Memory Database Store (with full fallback and initial seed)
let journalConfig = { ...initialJournalConfig };
let memories = [...initialMemories];
let reasons = [...initialReasons];
let photos = [...initialPhotos];
let quizQuestions = [...initialQuiz];
let secretLetter = { ...initialSecretLetter };
let quizScores = [];

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Digital Love Anniversary Journal MERN API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Config Endpoints
router.get('/config', (req, res) => {
  res.json(journalConfig);
});

router.put('/config', (req, res) => {
  const { partner1, partner2, anniversaryDate, title, quote, musicUrl, passcode } = req.body;
  if (partner1) journalConfig.partner1 = partner1;
  if (partner2) journalConfig.partner2 = partner2;
  if (anniversaryDate) journalConfig.anniversaryDate = anniversaryDate;
  if (title) journalConfig.title = title;
  if (quote) journalConfig.quote = quote;
  if (musicUrl) journalConfig.musicUrl = musicUrl;
  if (passcode) journalConfig.passcode = passcode;
  res.json({ success: true, config: journalConfig });
});

// Timeline Memories Endpoints
router.get('/memories', (req, res) => {
  res.json(memories);
});

router.post('/memories', (req, res) => {
  const { title, location, category, description, imageUrl, tag, chatBubbles } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }
  const newMemory = {
    id: `mem-${Date.now()}`,
    title,
    location: location || 'Pune',
    category: category || 'Special Memory',
    description,
    imageUrl: imageUrl || '/images/photo1.jpg',
    rotation: (Math.random() * 4 - 2).toFixed(1),
    tag: tag || `Chapter ${memories.length + 1}`,
    chatBubbles: chatBubbles || []
  };
  memories.push(newMemory);
  res.status(201).json(newMemory);
});

router.put('/memories/:id', (req, res) => {
  const { id } = req.params;
  const index = memories.findIndex((m) => m.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Memory not found' });
  }
  memories[index] = { ...memories[index], ...req.body };
  res.json(memories[index]);
});

router.delete('/memories/:id', (req, res) => {
  const { id } = req.params;
  memories = memories.filter((m) => m.id !== id);
  res.json({ success: true, message: 'Memory deleted' });
});

// Reasons I Love You Endpoints
router.get('/reasons', (req, res) => {
  res.json(reasons);
});

router.post('/reasons', (req, res) => {
  const { title, reason, category, icon, color } = req.body;
  if (!title || !reason) {
    return res.status(400).json({ error: 'Title and reason text are required' });
  }
  const newReason = {
    id: `reas-${Date.now()}`,
    title,
    reason,
    category: category || 'Little Things',
    icon: icon || 'favorite',
    color: color || '#d81b60'
  };
  reasons.push(newReason);
  res.status(201).json(newReason);
});

router.delete('/reasons/:id', (req, res) => {
  const { id } = req.params;
  reasons = reasons.filter((r) => r.id !== id);
  res.json({ success: true, message: 'Reason deleted' });
});

// Photo Gallery Endpoints
router.get('/photos', (req, res) => {
  res.json(photos);
});

router.post('/photos', (req, res) => {
  const { title, caption, location, category, imageUrl } = req.body;
  if (!title || !imageUrl) {
    return res.status(400).json({ error: 'Title and image URL are required' });
  }
  const newPhoto = {
    id: `photo-${Date.now()}`,
    title,
    caption: caption || '',
    location: location || 'Pune',
    category: category || 'Keepsakes',
    imageUrl,
    rotation: (Math.random() * 6 - 3).toFixed(1)
  };
  photos.push(newPhoto);
  res.status(201).json(newPhoto);
});

router.delete('/photos/:id', (req, res) => {
  const { id } = req.params;
  photos = photos.filter((p) => p.id !== id);
  res.json({ success: true, message: 'Photo deleted' });
});

// Love Quiz Endpoints
router.get('/quiz', (req, res) => {
  res.json(quizQuestions);
});

router.post('/quiz/submit', (req, res) => {
  const { score, totalQuestions } = req.body;
  const result = {
    id: `score-${Date.now()}`,
    score,
    totalQuestions,
    timestamp: new Date().toISOString(),
    percentage: Math.round((score / totalQuestions) * 100)
  };
  quizScores.push(result);
  res.json({
    success: true,
    result,
    message: result.percentage >= 75 ? 'Love Mastery! You know us so well! 💕' : 'So close! Time for a romantic date! 🥂'
  });
});

router.post('/quiz', (req, res) => {
  const { question, options, correctIndex, explanation } = req.body;
  if (!question || !options || options.length < 2) {
    return res.status(400).json({ error: 'Question and at least 2 options are required' });
  }
  const newQ = {
    id: `q-${Date.now()}`,
    question,
    options,
    correctIndex: correctIndex || 0,
    explanation: explanation || 'Another sweet memory of ours!'
  };
  quizQuestions.push(newQ);
  res.status(201).json(newQ);
});

// Secret Letter / Passcode Endpoints (Rutuja's Birthday: 6 October 2003)
router.post('/secret/unlock', (req, res) => {
  const { passcode } = req.body;
  const cleanPass = (passcode || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');
  if (
    cleanPass === '0610' ||
    cleanPass === '06102003' ||
    cleanPass === '6102003' ||
    cleanPass === '610' ||
    cleanPass === '6october' ||
    cleanPass === '6october2003' ||
    cleanPass === 'love' ||
    cleanPass === journalConfig.passcode
  ) {
    res.json({ success: true, letter: secretLetter });
  } else {
    res.status(401).json({
      success: false,
      error: 'Incorrect passcode. Hint: Rutuja\'s birthdate (0610 or 06102003)'
    });
  }
});

router.get('/secret', (req, res) => {
  res.json({ title: secretLetter.title, isLocked: true });
});

router.put('/secret', (req, res) => {
  const { content, title, author } = req.body;
  if (content) secretLetter.content = content;
  if (title) secretLetter.title = title;
  if (author) secretLetter.author = author;
  res.json({ success: true, letter: secretLetter });
});

export default router;
