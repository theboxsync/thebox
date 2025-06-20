import { useState, useEffect } from "react";
import axios from "axios";

import Footer from "./components/Footer";
import Header from "./components/Header";
import "./styles.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { FixedCart } from "./pages/FixedCart1";
import { CardItems } from "./pages/card";
import { TodaysSpecial } from "./pages/specialcard";
import { API } from "./pages/data";
import Hero from "./pages/hero";
import Menu from "./pages/menu";
import Offer from "./pages/offer";
import About from "./pages/about";
import Slider from "./pages/slider";
import Booking from "./pages/booking";
import Contact from "./pages/contact";
import { CartDetails } from "./pages/cartdetails";
import { Overlay } from "./pages/Overlay";
import TodaysSpecialtitle from "./pages/special";

import ListItems from "./pages/ListItem";

export default function App() {
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState(API.menu);
  const [itemsA, setItemsA] = useState(API.special);
  const [cartOpen, setCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const [websiteSettings, setWebsiteSettings] = useState({});
  const [allDishes, setAllDishes] = useState([]);

  useEffect(() => {
    const fetchWebsiteDetails = async () => {
      try {
        const [settingsRes, menuRes] = await Promise.all([
          axios.get(`http://localhost:3001/api/website/settings/BAL0001AF`),
          axios.get(`http://localhost:3001/api/website/featured-dishes/BAL0001AF`, {
            withCredentials: true,
          }),
        ]);
        console.log("Website settings:", settingsRes.data);
        console.log("Menu items:", menuRes.data);
        setWebsiteSettings(settingsRes.data); // useState for this
        setAllDishes(menuRes.data); // useState for this
      } catch (error) {
        console.error("Failed to load website data:", error);
      }
    };

    fetchWebsiteDetails();
  }, []);

  // Function to add an item to the cart
  const addToCart = (item, source) => {
    // Check if the item is already in the cart
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);

    if (existingItem) {
      // If the item is already in the cart, show an alert
      alert("Item already in cart");
      return; // Stop further execution
    }

    // If the item is not in the cart, add it with quantity 1
    setCart((prevCart) => [
      ...prevCart,
      {
        name: item.name,
        price: item.price,
        quantity: 1, // Adding the item with quantity 1
        source: source, // Add a source to differentiate the menu
      },
    ]);
  };

  // Function to remove an item from the cart with a confirmation alert
  const removeFromCart = (item) => {
    // Show an alert with a message before proceeding
    const confirmRemove = window.confirm(
      `Are you sure you want to remove ${item.name} from your cart?`
    );

    // If the user confirms, proceed with the removal
    if (confirmRemove) {
      const existingItemIndex = cart.findIndex(
        (cartItem) => cartItem.name === item.name
      );

      if (existingItemIndex !== -1) {
        // If the item exists in the cart, check if the quantity is greater than 1
        if (cart[existingItemIndex].quantity > 1) {
          // If the quantity is greater than 1, just decrease it by 1
          setCart((prevCart) => {
            const updatedCart = [...prevCart];
            updatedCart[existingItemIndex].quantity -= 1; // Decrease the quantity by 1
            return updatedCart;
          });
        } else {
          // If the quantity is 1, remove the item entirely from the cart
          setCart((prevCart) =>
            prevCart.filter((cartItem) => cartItem.name !== item.name)
          );
        }
      }
    } else {
      // If the user cancels, do nothing
      console.log(`${item.name} was not removed from the cart.`);
    }
  };

  // Function to increase item quantity in the cart
  const increaseQuantity = (item) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((cartItem) => {
        if (cartItem.name === item.name) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1, // Increase quantity by 1
          };
        }
        return cartItem;
      });
      return updatedCart;
    });
  };
  // Function to decrease item quantity in the cart
  const decreaseQuantity = (item) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((cartItem) => {
        if (cartItem.name === item.name) {
          if (cartItem.quantity > 1) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1, // Decrease quantity by 1
            };
          }
          return cartItem; // Don't decrease below 1
        }
        return cartItem;
      });
      return updatedCart;
    });
  };
  const cartCountTotal = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartPriceTotal = cart.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const cartTotals = () =>
    cartCountTotal === 0 ? (
      <b>Cart is empty</b>
    ) : (
      <>
        <b>
          <p>Items in Cart: {cartCountTotal}</p>
          <p>
            Total Price: $
            {Number.isInteger(cartPriceTotal)
              ? cartPriceTotal
              : cartPriceTotal.toFixed(2)}
          </p>
        </b>
      </>
    );

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Please add items to your cart.");
      return;
    }

    setIsCheckingOut(true); // Begin checkout process
    setCheckoutError(null); // Clear any previous errors

    // Simulate checkout process (this is where you'd normally call an API)
    setTimeout(() => {
      const totalPrice = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      if (totalPrice > 0) {
        // Simulate a successful checkout (e.g., clearing the cart)
        setCart([]);
        alert();
        alert("Checkout successful! Your order has been placed.");
        setIsCheckingOut(false); // End checkout process
      } else {
        // Simulate an error in case something goes wrong
        setCheckoutError(
          "An error occurred during checkout. Please try again."
        );
        setIsCheckingOut(false); // End checkout process
      }
    }, 2000); // Simulate a 2-second delay for checkout (you can replace with actual API calls)
  };

  return (
    <div className="App">
      <Header cartItems={cartCountTotal} />
      <FixedCart onOpen={() => setCartOpen(true)} cartItems={cartCountTotal} />
      <Overlay onClick={() => setCartOpen(false)} open={cartOpen} />
      {/* Corrected */}
      <CartDetails
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        cartCountTotal={cartCountTotal}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        handleCheckout={handleCheckout}
      />
      <Hero />
      <Menu />

      <div className="container">
        <div className="tab-content mt-4" id="ex1-content">
          <div
            className="tab-pane fade show active"
            id="ex1-tabs-1"
            role="tabpanel"
            aria-labelledby="ex1-tab-1"
          >
            <ListItems allDishes={allDishes} addToCart={addToCart} />

          </div>
          <div
            className="tab-pane fade"
            id="ex1-tabs-2"
            role="tabpanel"
            aria-labelledby="ex1-tab-2"
          >
            {" "}
            <CardItems
              items={items}
              addToCart={(i) => addToCart(items[i], "menu")}
            />{" "}
          </div>
          <div
            className="tab-pane fade"
            id="ex1-tabs-3"
            role="tabpanel"
            aria-labelledby="ex1-tab-3"
          >
            {" "}
            <CardItems
              items={items}
              addToCart={(i) => addToCart(items[i], "menu")}
            />
          </div>
          <div
            className="tab-pane fade"
            id="ex1-tabs-4"
            role="tabpanel"
            aria-labelledby="ex1-tab-4"
          >
            {" "}
            <CardItems
              items={items}
              addToCart={(i) => addToCart(items[i], "menu")}
            />{" "}
          </div>
          <div
            className="tab-pane fade"
            id="ex1-tabs-5"
            role="tabpanel"
            aria-labelledby="ex1-tab-5"
          >
            {" "}
            <CardItems
              items={items}
              addToCart={(i) => addToCart(items[i], "menu")}
            />{" "}
          </div>
        </div>
      </div>

      <Offer />

      <TodaysSpecialtitle />
      <TodaysSpecial
        itemsA={itemsA}
        addToCart={(i) => addToCart(itemsA[i], "special")}
      />
      <About />
      {/* slider */}
      <Slider />
      {/* About */}
      <Booking />
      {/* Contact */}
      <Contact websiteSettings={websiteSettings} />

      <Footer />
    </div>
  );
}
