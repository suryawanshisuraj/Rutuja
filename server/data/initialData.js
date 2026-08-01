// Personalized initial dataset for Prateek & Rutuja

export const initialJournalConfig = {
  partner1: 'Prateek',
  partner2: 'Rutuja',
  anniversaryDate: '2018-07-18T00:00:00.000Z',
  title: 'Our Digital Keepsake',
  quote: 'In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.',
  musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
  passcode: '0610'
};

export const initialMemories = [
  {
    id: 'mem-1',
    title: 'First Meetup at Home',
    location: 'Home Sweet Home',
    category: 'First Meetup',
    description: 'Our very first meetup right at home! The nervousness turned into pure comfort the moment we looked at each other and started talking.',
    imageUrl: '/images/photo3.jpg',
    rotation: 1.5,
    tag: 'Chapter 1'
  },
  {
    id: 'mem-2',
    title: 'First Meetup in Pune',
    location: 'Pune',
    category: 'Special Milestone',
    description: 'An unforgettable meetup in Pune. Exploring the city, sharing sweet smiles, and creating our first beautiful memories together.',
    imageUrl: '/images/photo1.jpg',
    rotation: -1.2,
    tag: 'Chapter 2',
    chatBubbles: [
      { sender: 'them', text: "I still remember our first meetup in Pune!" },
      { sender: 'me', text: "Best day ever! You looked so beautiful and radiant." },
      { sender: 'them', text: "Ready for many more adventures together? 💕" }
    ]
  },
  {
    id: 'mem-3',
    title: 'Rutuja\'s Cute Smile',
    location: 'Cozy Spot in Pune',
    category: 'Everyday Joy',
    description: 'That glowing smile that brightens my darkest days instantly. Every single glance reminds me how lucky I am.',
    imageUrl: '/images/photo2.png',
    rotation: -2.0,
    tag: 'Chapter 3'
  },
  {
    id: 'mem-4',
    title: 'Cozy Moments & Laughter',
    location: 'Pune',
    category: 'Sweet Moments',
    description: 'Wrapped in warmth, sharing inside jokes, and realizing every quiet day with you is my absolute favorite adventure.',
    imageUrl: '/images/photo4.jpg',
    rotation: 2.2,
    tag: 'Chapter 4'
  },
  {
    id: 'mem-5',
    title: 'Yellow Sunshine Days',
    location: 'Outdoors in Pune',
    category: 'Joyful Days',
    description: 'Rutuja looking absolutely radiant in yellow. A bright, happy memory that always fills my heart with warmth.',
    imageUrl: '/images/photo6.jpg',
    rotation: -1.5,
    tag: 'Chapter 5'
  },
  {
    id: 'mem-6',
    title: 'Pink Dupatta Glow',
    location: 'Balcony Haven',
    category: 'Pretty Keepsakes',
    description: 'The sweetest smile wrapped in a soft pink dupatta. Pure elegance and innocent joy.',
    imageUrl: '/images/photo7.jpg',
    rotation: 1.8,
    tag: 'Chapter 6'
  }
];

export const initialReasons = [
  {
    id: 'reas-1',
    title: 'Your Radiant Smile',
    reason: 'The way your face lights up with that gentle smile. It brightens my entire world instantly, Rutuja!',
    category: 'Little Things',
    icon: 'sentiment_very_satisfied',
    color: '#d81b60'
  },
  {
    id: 'reas-2',
    title: 'Our First Home Meetup',
    reason: 'How comfortable and magical it felt meeting at home for the first time. I knew right then you were someone truly special.',
    category: 'Memories',
    icon: 'home',
    color: '#ab2c5d'
  },
  {
    id: 'reas-3',
    title: 'Unforgettable Pune Memories',
    reason: 'Remembering our time together in Pune always brings a huge smile to my face. The best beginning to our love story.',
    category: 'Moments',
    icon: 'auto_awesome',
    color: '#cca730'
  },
  {
    id: 'reas-4',
    title: 'Unmatched Kindness',
    reason: 'How genuine, caring, and loving you are. You make every day softer, happier, and full of warmth.',
    category: 'Personality',
    icon: 'favorite',
    color: '#735c00'
  },
  {
    id: 'reas-5',
    title: 'Always Believing in Me',
    reason: 'Your quiet confidence and encouragement give me strength every single day.',
    category: 'Support',
    icon: 'star',
    color: '#b0004a'
  },
  {
    id: 'reas-6',
    title: 'Inside Jokes & Laughter',
    reason: 'We can look at each other across the room and burst into laughter without saying a single word.',
    category: 'Little Things',
    icon: 'sentiment_satisfied',
    color: '#fd6c9c'
  }
];

export const initialPhotos = [
  {
    id: 'photo-1',
    title: 'Park Day in Pune',
    caption: 'Sunlight, warm smiles, and pure happiness sitting together.',
    location: 'Pune Park',
    category: 'Fun & Adventures',
    imageUrl: '/images/photo1.jpg',
    rotation: 3
  },
  {
    id: 'photo-2',
    title: 'Rutuja\'s Radiant Glow',
    caption: 'That gorgeous smile that brightens my whole world.',
    location: 'Cozy Bistro',
    category: 'Everyday Joy',
    imageUrl: '/images/photo2.png',
    rotation: -4
  },
  {
    id: 'photo-3',
    title: 'First Home Meetup',
    caption: 'Cozy smiles at home on our very first meetup.',
    location: 'Home',
    category: 'Romantic Evenings',
    imageUrl: '/images/photo3.jpg',
    rotation: 2
  },
  {
    id: 'photo-4',
    title: 'Sweet Pune Memories',
    caption: 'Unforgettable moments and endless laughter in Pune.',
    location: 'Pune',
    category: 'Special Dates',
    imageUrl: '/images/photo4.jpg',
    rotation: -1.5
  },
  {
    id: 'photo-5',
    title: 'Classic Monochrome Keepsake',
    caption: 'Timeless black and white memory of Prateek & Rutuja.',
    location: 'Pune',
    category: 'Everyday Joy',
    imageUrl: '/images/photo5.jpg',
    rotation: 1.8
  },
  {
    id: 'photo-6',
    title: 'Sunshine Smile',
    caption: 'Rutuja beaming with bright, natural beauty.',
    location: 'Pune Streets',
    category: 'Everyday Joy',
    imageUrl: '/images/photo6.jpg',
    rotation: -2.5
  },
  {
    id: 'photo-7',
    title: 'Pink Dupatta Glow',
    caption: 'Sweetest smile wrapped in pink elegance.',
    location: 'Balcony Corner',
    category: 'Special Dates',
    imageUrl: '/images/photo7.jpg',
    rotation: 3.2
  }
];

export const initialQuiz = [
  {
    id: 'q-1',
    question: 'Where was our very first meetup?',
    options: [
      'At a coffee shop',
      'At your home',
      'In a restaurant',
      'At a park'
    ],
    correctIndex: 1,
    explanation: 'Our very first meetup was cozy and sweet right at home!'
  },
  {
    id: 'q-2',
    question: 'Which city was the backdrop for our special first outdoor meetup?',
    options: [
      'Pune',
      'Mumbai',
      'Delhi',
      'Bangalore'
    ],
    correctIndex: 0,
    explanation: 'Pune was the magical backdrop of our first outdoor meetup!'
  },
  {
    id: 'q-3',
    question: 'What is Prateek\'s absolute favorite thing about Rutuja?',
    options: [
      'Her beautiful smile & warmth',
      'Her dance ritual',
      'Her food choices',
      'Her text messages'
    ],
    correctIndex: 0,
    explanation: 'Your genuine smile lights up every single day!'
  },
  {
    id: 'q-4',
    question: 'Where did we capture our favorite memory photos together?',
    options: [
      'In Pune & At Home',
      'At a beach in Goa',
      'In a library',
      'At a cinema'
    ],
    correctIndex: 0,
    explanation: 'Capturing unforgettable moments together in Pune and at home!'
  }
];

export const initialSecretLetter = {
  title: 'To My Dearest Rutuja, A Secret Letter For You',
  author: 'Prateek',
  content: `My Dearest Rutuja (6 October 2003),

Looking back at our story — from July 18, 2018 when our journey began, to our first meetup at home and our beautiful days in Pune — every single moment with you fills my heart with happiness.

You bring light, warmth, and laughter into my life in ways words can never fully capture. Your smile is my daily inspiration, and your kindness makes the world feel gentler.

Happy Anniversary, my love. Here is to our past memories, our present joy, and all the magical chapters we have yet to write together.

Forever & Always Yours,
Prateek ❤️`
};
