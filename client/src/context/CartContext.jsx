import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);

  // 🔐 Helper
  const cartKey = currentUser ? `cart_${currentUser.uid}` : null;

  // 🔄 Load cart on login & keep it in sync
  useEffect(() => {
    // Logged out → clear state & stop loading
    if (!currentUser) {
      setCart([]);
      setLoadingCart(false);
      return;
    }

    setLoadingCart(true);
    const cartRef = doc(db, "carts", currentUser.uid);

    // 1) Instant hydration from localStorage (optional but removes flicker)
    const cached = localStorage.getItem(cartKey);
    if (cached) {
      try {
        setCart(JSON.parse(cached));
      } catch (_) {}
    }

    // 2) Ensure doc exists, then subscribe
    (async () => {
      const snap = await getDoc(cartRef);
      if (!snap.exists()) {
        await setDoc(cartRef, { items: [] });
      }
      // 3) Real-time updates
      const unsub = onSnapshot(cartRef, (docSnap) => {
        const items = (docSnap.data() && docSnap.data().items) || [];
        setCart(items);
        localStorage.setItem(cartKey, JSON.stringify(items));
        setLoadingCart(false);
      }, (err) => {
        console.error("Cart onSnapshot error:", err);
        setLoadingCart(false);
      });

      // Cleanup on unmount or user change
      return unsub;
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const save = async (items) => {
    if (!currentUser) return;
    const cartRef = doc(db, "carts", currentUser.uid);
    localStorage.setItem(cartKey, JSON.stringify(items));
    await setDoc(cartRef, { items }, { merge: true });
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === product.id);
      const next = exist
        ? prev.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prev, { ...product, quantity: 1 }];
      save(next);
      return next;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const next = prev.filter((i) => i.id !== id);
      save(next);
      return next;
    });
  };

  const increaseQty = (id) => {
    setCart((prev) => {
      const next = prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      );
      save(next);
      return next;
    });
  };

  const decreaseQty = (id) => {
    setCart((prev) => {
      const next = prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity > 1 ? i.quantity - 1 : 1 } : i
      );
      save(next);
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
    if (currentUser) {
      const cartRef = doc(db, "carts", currentUser.uid);
      setDoc(cartRef, { items: [] }, { merge: true });
      localStorage.setItem(cartKey, JSON.stringify([]));
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, loadingCart, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
