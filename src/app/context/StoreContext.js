'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Cart state
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state (array of product IDs)
  const [wishlist, setWishlist] = useState([]);

  // Search & Filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [checkedCategories, setCheckedCategories] = useState([]); // Array of checked categories
  const [priceRange, setPriceRange] = useState(5000); // Max budget in INR
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [sortBy, setSortBy] = useState('DEFAULT'); // DEFAULT, PRICE_LOW_HIGH, PRICE_HIGH_LOW, RATING

  // Active view: either 'shop' or the full product object itself for detailed viewing
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('urbanwear_cart');
    const savedWishlist = localStorage.getItem('urbanwear_wishlist');
    
    setTimeout(() => {
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed loading cart", e);
        }
      }
      if (savedWishlist) {
        try {
          setWishlist(JSON.parse(savedWishlist));
        } catch (e) {
          console.error("Failed loading wishlist", e);
        }
      }
    }, 0);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('urbanwear_cart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('urbanwear_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart operations
  const addToCart = (product, color, size, quantity = 1) => {
    setCart((prevCart) => {
      // Find if item already exists with exact color and size
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, selectedColor: color, selectedSize: size, quantity }];
      }
    });
    // Open the cart drawer to give immediate feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, color, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
  };

  const updateCartQuantity = (productId, color, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId &&
        item.selectedColor === color &&
        item.selectedSize === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Cart count and totals calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shippingFee = cartSubtotal > 3000 || cartSubtotal === 0 ? 0 : 99; // Free shipping over ₹3000
  const couponDiscount = appliedCoupon === 'TREND10' ? Math.round(cartSubtotal * 0.10) : 0;
  const cartTotal = Math.max(0, cartSubtotal - couponDiscount + shippingFee);

  // Coupon operations
  const applyCoupon = (code) => {
    if (code.trim().toUpperCase() === 'TREND10') {
      setAppliedCoupon('TREND10');
      return { success: true, message: 'Coupon applied successfully! 10% discount added.' };
    }
    return { success: false, message: 'Invalid coupon code!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon('');
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('ALL');
    setCheckedCategories([]);
    setPriceRange(5000);
    setSelectedColor('');
    setSelectedSize('');
    setSortBy('DEFAULT');
    setSearchQuery('');
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isWishlisted,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        shippingFee,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        couponDiscount,

        // Filters
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        checkedCategories,
        setCheckedCategories,
        priceRange,
        setPriceRange,
        selectedColor,
        setSelectedColor,
        selectedSize,
        setSelectedSize,
        sortBy,
        setSortBy,
        resetFilters,

        // Routing / Active Product Detail View
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
