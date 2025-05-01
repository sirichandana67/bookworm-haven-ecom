
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Search, LogIn, User, ShoppingCart, Book, Heart, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const { isAuthenticated, currentUser, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Book className="w-6 h-6 text-book-primary" />
          <span className="font-serif font-bold text-xl">BookWorm Haven</span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden flex items-center"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 items-center">
          <Link
            to="/"
            className={`text-sm font-medium hover:text-book-primary transition-colors ${
              isActive("/") ? "text-book-primary" : "text-gray-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/books"
            className={`text-sm font-medium hover:text-book-primary transition-colors ${
              isActive("/books") ? "text-book-primary" : "text-gray-600"
            }`}
          >
            Books
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className={`text-sm font-medium hover:text-book-primary transition-colors ${
                location.pathname.startsWith("/admin") ? "text-book-primary" : "text-gray-600"
              }`}
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/search" className="text-gray-600 hover:text-book-primary">
            <Search className="w-5 h-5" />
          </Link>
          
          <Link to="/favorites" className="text-gray-600 hover:text-book-primary relative">
            <Heart className="w-5 h-5" />
          </Link>
          
          <Link to="/cart" className="text-gray-600 hover:text-book-primary relative">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-book-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Hello, {currentUser?.name.split(" ")[0]}
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                Log Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md absolute w-full z-50 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className={`text-sm font-medium hover:text-book-primary ${
                isActive("/") ? "text-book-primary" : "text-gray-600"
              }`}
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/books"
              className={`text-sm font-medium hover:text-book-primary ${
                isActive("/books") ? "text-book-primary" : "text-gray-600"
              }`}
              onClick={toggleMobileMenu}
            >
              Books
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className={`text-sm font-medium hover:text-book-primary ${
                  location.pathname.startsWith("/admin") ? "text-book-primary" : "text-gray-600"
                }`}
                onClick={toggleMobileMenu}
              >
                Admin
              </Link>
            )}
            <Link to="/search" className="flex items-center space-x-2 text-gray-600" onClick={toggleMobileMenu}>
              <Search className="w-5 h-5" />
              <span>Search</span>
            </Link>
            <Link to="/favorites" className="flex items-center space-x-2 text-gray-600" onClick={toggleMobileMenu}>
              <Heart className="w-5 h-5" />
              <span>Favorites</span>
            </Link>
            <Link to="/cart" className="flex items-center space-x-2 text-gray-600" onClick={toggleMobileMenu}>
              <ShoppingCart className="w-5 h-5" />
              <span>Cart ({totalItems})</span>
            </Link>
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-gray-600">
                  Hello, {currentUser?.name.split(" ")[0]}
                </span>
                <Button variant="outline" size="sm" onClick={() => { logout(); toggleMobileMenu(); }}>
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" onClick={toggleMobileMenu}>
                  <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
                    <LogIn className="w-4 h-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={toggleMobileMenu}>
                  <Button size="sm" className="w-full flex items-center justify-center gap-1">
                    <User className="w-4 h-4" />
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
