"use client";

import { useState } from "react";
import FullscreenMenu from "./FullscreenMenu";

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="site-nav">
        <a href="#hero" className="site-nav__brand" aria-label="Sudais Khan home">
          S.K<sup>®</sup>
        </a>

        <button
          type="button"
          className="menu-trigger"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
        >
          <span>Menu</span>
          <span className="menu-trigger__icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>

      <div id="site-menu">
        <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </>
  );
}
