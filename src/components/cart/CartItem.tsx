
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Book } from "@/utils/bookData";
import { Trash, Plus, Minus } from "lucide-react";

interface CartItemProps {
  book: Book;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ book, quantity }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(book.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(book.id, quantity - 1);
    } else {
      removeFromCart(book.id);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b">
      <Link to={`/book/${book.id}`} className="shrink-0">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-16 h-24 object-cover rounded"
        />
      </Link>
      
      <div className="flex-grow">
        <Link to={`/book/${book.id}`} className="hover:text-book-primary">
          <h3 className="font-serif font-medium">{book.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={handleDecrement}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="h-8 px-3 flex items-center justify-center border-y">
              {quantity}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={handleIncrement}
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
            <p className="font-medium">${(book.price * quantity).toFixed(2)}</p>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 px-2"
              onClick={() => removeFromCart(book.id)}
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:ml-2">Remove</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
