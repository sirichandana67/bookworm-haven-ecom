
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  description: string;
  category: string;
  publishedDate: string;
  pages: number;
  language: string;
  isbn: string;
  featured?: boolean;
}

export const books: Book[] = [
  {
    id: "1",
    title: "The Lost City",
    author: "Sarah Johnson",
    price: 14.99,
    coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
    description: "A thrilling adventure into the heart of a forgotten civilization, where ancient secrets and modern dangers collide.",
    category: "Adventure",
    publishedDate: "2023-03-15",
    pages: 342,
    language: "English",
    isbn: "978-1234567890",
    featured: true
  },
  {
    id: "2",
    title: "Whispers in the Dark",
    author: "Michael Chen",
    price: 12.99,
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    description: "A haunting psychological thriller that will keep you on the edge of your seat until the very last page.",
    category: "Thriller",
    publishedDate: "2023-01-22",
    pages: 298,
    language: "English",
    isbn: "978-2345678901",
    featured: true
  },
  {
    id: "3",
    title: "The Quantum Paradox",
    author: "Elena Petrov",
    price: 19.99,
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    description: "An exploration of cutting-edge physics theories and their implications for our understanding of reality.",
    category: "Science",
    publishedDate: "2022-11-05",
    pages: 426,
    language: "English",
    isbn: "978-3456789012",
    featured: true
  },
  {
    id: "4",
    title: "A Garden of Dreams",
    author: "Thomas Green",
    price: 10.99,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    description: "A heartwarming tale of growth, healing, and the power of nature to transform lives.",
    category: "Fiction",
    publishedDate: "2023-04-18",
    pages: 256,
    language: "English",
    isbn: "978-4567890123"
  },
  {
    id: "5",
    title: "The Strategy Playbook",
    author: "Jennifer Lee",
    price: 24.99,
    coverImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d",
    description: "A practical guide to developing effective business strategies in today's rapidly changing marketplace.",
    category: "Business",
    publishedDate: "2022-09-30",
    pages: 384,
    language: "English",
    isbn: "978-5678901234"
  },
  {
    id: "6",
    title: "Echoes of Eternity",
    author: "David Williams",
    price: 15.99,
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    description: "An epic fantasy adventure across worlds where magic is fading and ancient powers are awakening.",
    category: "Fantasy",
    publishedDate: "2023-02-05",
    pages: 512,
    language: "English",
    isbn: "978-6789012345"
  },
  {
    id: "7",
    title: "The Hidden Code",
    author: "Robert Martinez",
    price: 13.99,
    coverImage: "https://images.unsplash.com/photo-1513001900722-370f803f498d",
    description: "A fast-paced technological thriller that explores the dangers of artificial intelligence gone rogue.",
    category: "Thriller",
    publishedDate: "2022-12-10",
    pages: 318,
    language: "English",
    isbn: "978-7890123456"
  },
  {
    id: "8",
    title: "Culinary Journeys",
    author: "Maria Rossi",
    price: 22.99,
    coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    description: "A collection of recipes and stories from around the world, celebrating the cultural heritage of food.",
    category: "Cooking",
    publishedDate: "2023-05-12",
    pages: 242,
    language: "English",
    isbn: "978-8901234567"
  },
  {
    id: "9",
    title: "Patterns of Thought",
    author: "Sandra Taylor",
    price: 18.99,
    coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646",
    description: "An insightful look into cognitive psychology and how our thinking patterns shape our lives.",
    category: "Psychology",
    publishedDate: "2022-08-20",
    pages: 356,
    language: "English",
    isbn: "978-9012345678"
  },
  {
    id: "10",
    title: "Beyond the Horizon",
    author: "James Wilson",
    price: 16.99,
    coverImage: "https://images.unsplash.com/photo-1479660095429-2cf4e1360472",
    description: "A touching memoir of a sailor's adventures across the seven seas and the lessons learned along the way.",
    category: "Memoir",
    publishedDate: "2023-01-05",
    pages: 288,
    language: "English",
    isbn: "978-0123456789"
  }
];

export const categories = [
  "All",
  "Adventure",
  "Business",
  "Cooking",
  "Fantasy",
  "Fiction",
  "Memoir",
  "Psychology",
  "Science",
  "Thriller"
];

export const getBookById = (id: string): Book | undefined => {
  return books.find(book => book.id === id);
};

export const getBooksByCategory = (category: string): Book[] => {
  if (category === "All") return books;
  return books.filter(book => book.category === category);
};

export const searchBooks = (query: string): Book[] => {
  const lowercasedQuery = query.toLowerCase();
  return books.filter(
    book => 
      book.title.toLowerCase().includes(lowercasedQuery) ||
      book.author.toLowerCase().includes(lowercasedQuery) ||
      book.description.toLowerCase().includes(lowercasedQuery) ||
      book.category.toLowerCase().includes(lowercasedQuery)
  );
};

export const getFeaturedBooks = (): Book[] => {
  return books.filter(book => book.featured);
};
