
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookGrid from "@/components/books/BookGrid";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { getBookById } from "@/utils/bookData";
import { Heart } from "lucide-react";

const Favorites: React.FC = () => {
  const { favorites } = useCart();
  
  // Get all favorite books
  const favoriteBooks = favorites
    .map(getBookById)
    .filter((book): book is NonNullable<typeof book> => book !== undefined);
  
  const EmptyFavorites = () => (
    <div className="text-center py-16">
      <div className="flex justify-center mb-4">
        <Heart className="w-12 h-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-serif mb-2">No favorites yet</h2>
      <p className="text-muted-foreground mb-6">
        Start adding books to your favorites list to keep track of books you love.
      </p>
      <Link to="/books">
        <Button>Browse Books</Button>
      </Link>
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif mb-6">Your Favorites</h1>
        
        {favoriteBooks.length === 0 ? (
          <EmptyFavorites />
        ) : (
          <BookGrid books={favoriteBooks} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
