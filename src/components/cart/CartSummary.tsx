
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

const CartSummary: React.FC = () => {
  const { totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to checkout.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    navigate("/checkout");
  };
  
  // Calculate estimated tax (for demo purposes)
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + tax;

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="font-serif text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>{totalItems} {totalItems === 1 ? "item" : "items"}</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Estimated tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-medium text-base pt-2">
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <Button
        className="w-full mt-6"
        disabled={totalItems === 0}
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </Button>
      
      <Button
        variant="outline"
        className="w-full mt-2"
        disabled={totalItems === 0}
        onClick={() => {
          clearCart();
          toast({
            title: "Cart cleared",
            description: "All items have been removed from your cart.",
          });
        }}
      >
        Clear Cart
      </Button>
    </div>
  );
};

export default CartSummary;
