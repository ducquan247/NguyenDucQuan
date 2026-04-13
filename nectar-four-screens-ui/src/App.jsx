
import React, { useMemo, useState } from 'react';

const screens = {
  home: 'home',
  product: 'product',
  explore: 'explore',
  beverages: 'beverages',
};

export default function App() {
  const [screen, setScreen] = useState(screens.home);
  const [quantity, setQuantity] = useState(1);
  const [transitioning, setTransitioning] = useState('enter');

  const qty = useMemo(() => Math.max(1, quantity), [quantity]);

  function go(next) {
    setTransitioning('leave');
    setTimeout(() => {
      setScreen(next);
      setTransitioning('enter');
    }, 220);
  }

  function renderHome() {
    return (
      <div className="screen-root home-root">
        <div className="scroll-content home-scroll">
          <img src="/assets/screens/home_top.png" alt="Home top" className="home-slice" />
          <img src="/assets/screens/home_bottom.png" alt="Home bottom" className="home-slice" />
        </div>
        <img src="/assets/screens/home_nav.png" alt="Home nav" className="fixed-bottom-nav home-nav" />

        <button className="hotspot" style={{ left:'52.5%', top:'31.8%', width:'27%', height:'13.3%' }} onClick={() => go(screens.product)} aria-label="Red Apple card" />
        <button className="hotspot round" style={{ left:'74.8%', top:'40.4%', width:'10.5%', height:'4.8%' }} onClick={() => go(screens.product)} aria-label="Red Apple plus button" />
      </div>
    );
  }

  function renderProduct() {
    return (
      <div className="screen-root fixed-shot-root">
        <img src="/assets/screens/product.png" alt="Product Detail" className="full-screen-img" />

        <button className="hotspot round" style={{ left:'3.6%', top:'5%', width:'10%', height:'6.4%' }} onClick={() => go(screens.home)} aria-label="Back to Home" />
        <button className="hotspot round" style={{ left:'10.8%', top:'51.0%', width:'8.5%', height:'4.3%' }} onClick={() => setQuantity((v) => Math.max(1, v - 1))} aria-label="Decrease quantity" />
        <button className="hotspot round" style={{ left:'29.4%', top:'51.0%', width:'8.5%', height:'4.3%' }} onClick={() => setQuantity((v) => v + 1)} aria-label="Increase quantity" />
        <div className="qty-cover" />
        <div className="qty-text">{qty}</div>
        <button className="hotspot add-basket-hit" style={{ left:'6%', top:'84.3%', width:'88%', height:'7.4%' }} onClick={() => go(screens.explore)} aria-label="Add To Basket" />
      </div>
    );
  }

  function renderExplore() {
    return (
      <div className="screen-root explore-root">
        <div className="scroll-content explore-scroll">
          <img src="/assets/screens/explore_content.png" alt="Explore content" className="full-scroll-img" />
        </div>
        <img src="/assets/screens/explore_nav.png" alt="Explore nav" className="fixed-bottom-nav" />

        <button className="hotspot" style={{ left:'52.8%', top:'61.5%', width:'39%', height:'16%' }} onClick={() => go(screens.beverages)} aria-label="Beverages category" />
      </div>
    );
  }

  function renderBeverages() {
    return (
      <div className="screen-root beverages-root">
        <div className="scroll-content beverages-scroll">
          <img src="/assets/screens/beverages_content.png" alt="Beverages content" className="full-scroll-img" />
        </div>
        <img src="/assets/screens/explore_nav.png" alt="Explore nav fixed" className="fixed-bottom-nav" />
        <button className="hotspot round" style={{ left:'4.2%', top:'5%', width:'10%', height:'6%' }} onClick={() => go(screens.explore)} aria-label="Back to Explore" />
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className={`phone-frame ${transitioning}`}>
        {screen === screens.home && renderHome()}
        {screen === screens.product && renderProduct()}
        {screen === screens.explore && renderExplore()}
        {screen === screens.beverages && renderBeverages()}
      </div>
    </div>
  );
}
