
import React, { createContext, useState, useContext, useEffect } from "react";
import { Book } from "../utils/bookData";
import { toast } from "../components/ui/use-toast";

interface CartItem {
  book: Book;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  favorites: string[];
  addToFavorites: (bookId: string) => void;
  removeFromFavorites: (bookId: string) => void;
  isFavorite: (bookId: string) => boolean;
}

const CartContext = createContext<CartContextType>({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Load cart data from localStorage
    const storedCart = localStorage.getItem("bookworm_cart");
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart data", error);
      }
    }

    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem("bookworm_favorites");
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error("Failed to parse favorites data", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bookworm_cart", JSON.stringify(items));
  }, [items]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookworm_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (book: Book, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.book.id === book.id);
      
      if (existingItem) {
        // Update quantity if item already in cart
        return prevItems.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { book, quantity }];
      }
    });
    
    toast({
      title: "Added to Cart",
      description: `${book.title} has been added to your cart.`,
    });
  };

  const removeFromCart = (bookId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.book.id !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.book.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const addToFavorites = (bookId: string) => {
    if (!favorites.includes(bookId)) {
      setFavorites((prev) => [...prev, bookId]);
      toast({
        title: "Added to Favorites",
        description: "This book has been added to your favorites.",
      });
    }
  };

  const removeFromFavorites = (bookId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== bookId));
    toast({
      title: "Removed from Favorites",
      description: "This book has been removed from your favorites.",
    });
  };

  const isFavorite = (bookId: string) => {
    return favorites.includes(bookId);
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
