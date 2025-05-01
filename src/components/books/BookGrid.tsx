
import React from "react";
import BookCard from "@/components/books/BookCard";
import { Book } from "@/utils/bookData";

interface BookGridProps {
  books: Book[];
  title?: string;
}

const BookGrid: React.FC<BookGridProps> = ({ books, title }) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-serif mb-2">No books found</h2>
        <p className="text-muted-foreground">Try different search or filter criteria</p>
      </div>
    );
  }

  return (
    <section className="py-6">
      {title && (
        <h2 className="text-2xl font-serif mb-6 text-center md:text-left">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default BookGrid;
