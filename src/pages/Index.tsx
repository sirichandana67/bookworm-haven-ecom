
import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookGrid from "@/components/books/BookGrid";
import { Button } from "@/components/ui/button";
import { getFeaturedBooks } from "@/utils/bookData";

const Index: React.FC = () => {
  const featuredBooks = getFeaturedBooks();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-book-dark to-book-primary text-white py-16">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Discover Your Next Favorite Book
              </h1>
              <p className="text-lg md:text-xl mb-6 text-white/90">
                Explore thousands of e-books from bestselling authors and emerging talent. Read anytime, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/search">
                  <Button size="lg" className="bg-white text-book-primary hover:bg-white/90">
                    <Search className="mr-2 h-5 w-5" />
                    Find Books
                  </Button>
                </Link>
                <Link to="/books">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Browse All
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="relative">
                {/* Book stack visual */}
                <div className="absolute top-10 -left-8 w-40 h-56 bg-book-accent rounded shadow-xl transform -rotate-6" />
                <div className="absolute top-8 -left-3 w-40 h-56 bg-book-secondary rounded shadow-xl transform -rotate-3" />
                <div className="relative w-40 h-56 bg-white rounded shadow-xl flex items-center justify-center">
                  <span className="font-serif text-book-primary">BookWorm Haven</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Books */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-center mb-12">Featured Books</h2>
            <BookGrid books={featuredBooks} />
            <div className="text-center mt-10">
              <Link to="/books">
                <Button variant="outline">View All Books</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-book-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-book-primary" />
                </div>
                <h3 className="font-serif font-semibold text-xl mb-2">Browse</h3>
                <p className="text-muted-foreground">
                  Search our vast collection of e-books by genre, author, or keyword.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-book-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-book-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-serif font-semibold text-xl mb-2">Purchase</h3>
                <p className="text-muted-foreground">
                  Buy your favorite books with our secure payment system.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-book-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-book-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-serif font-semibold text-xl mb-2">Read</h3>
                <p className="text-muted-foreground">
                  Enjoy your books anytime, anywhere, on any device.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-book-primary text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif mb-4">Start Your Reading Journey Today</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join thousands of readers who have already discovered their next favorite book with BookWorm Haven.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-book-primary hover:bg-white/90">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
