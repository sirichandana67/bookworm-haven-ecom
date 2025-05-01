
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

const Cart: React.FC = () => {
  const { items, totalItems } = useCart();
  
  const EmptyCart = () => (
    <div className="text-center py-16">
      <div className="flex justify-center mb-4">
        <ShoppingCart className="w-12 h-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-serif mb-2">Your cart is empty</h2>
      <p className="text-muted-foreground mb-6">
        Looks like you haven't added any books to your cart yet.
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
        <h1 className="text-3xl font-serif mb-6">Your Cart</h1>
        
        {totalItems === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <span className="font-medium">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              </div>
              
              <div>
                {items.map(({ book, quantity }) => (
                  <CartItem key={book.id} book={book} quantity={quantity} />
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
