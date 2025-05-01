
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getBookById } from "@/utils/bookData";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingCart, Share2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import BookGrid from "@/components/books/BookGrid";
import { books } from "@/utils/bookData";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useCart();
  
  const book = id ? getBookById(id) : undefined;
  const favorite = id ? isFavorite(id) : false;
  
  // Get similar books (same category)
  const similarBooks = books
    .filter(b => b.category === book?.category && b.id !== id)
    .slice(0, 5);
  
  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">Book Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The book you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/books")}>
              Browse Books
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(book);
  };

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(book.id);
    } else {
      addToFavorites(book.id);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: book.title,
          text: `Check out "${book.title}" by ${book.author} on BookWorm Haven!`,
          url: window.location.href,
        })
        .catch(() => {
          // Fallback if sharing fails
          navigator.clipboard.writeText(window.location.href);
          toast({
            title: "Link copied!",
            description: "The book link has been copied to clipboard.",
          });
        });
    } else {
      // Fallback for browsers that don't support share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "The book link has been copied to clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Book Cover */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="relative aspect-[2/3] bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={book.coverImage}
                alt={`Cover of ${book.title} by ${book.author}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Book Details */}
          <div className="md:col-span-8 lg:col-span-9">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                {book.category}
              </span>
              <span className="text-muted-foreground text-sm">
                Published: {book.publishedDate}
              </span>
              <span className="text-muted-foreground text-sm">
                {book.pages} pages
              </span>
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="text-3xl font-medium text-book-primary">
                ${book.price.toFixed(2)}
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleToggleFavorite}
                  className={cn(
                    "flex items-center gap-2",
                    favorite && "text-red-500 border-red-200 hover:text-red-600 hover:border-red-300"
                  )}
                >
                  <Heart className={cn("w-5 h-5", favorite && "fill-red-500")} />
                  {favorite ? "Remove Favorite" : "Add to Favorites"}
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={handleShare}
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </Button>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div>
              <h2 className="text-xl font-serif font-semibold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {book.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Book Details</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Language:</span>
                      <span>{book.language}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">ISBN:</span>
                      <span>{book.isbn}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Pages:</span>
                      <span>{book.pages}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Books */}
        {similarBooks.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-serif mb-6">Similar Books</h2>
            <BookGrid books={similarBooks} />
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BookDetail;
