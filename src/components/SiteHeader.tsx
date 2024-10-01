import "./SiteHeader.css";
import { AstroLink, AstroLinkURL } from "./AstroLink.tsx";
import { SocialMedia } from "./header/SocialMedia.tsx";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

export type SiteHeaderProps = {
  url: URL;
};
export const SiteHeader = ({ url }: SiteHeaderProps) => {
  const [isHamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const toggleHamburgerMenuVisibility = () => setHamburgerMenuOpen((state) => !state);
  const updateScreenScroll = useCallback(() => {
    const isMobile = "matchMedia" in globalThis ? globalThis.matchMedia("(max-width: 50em)") : null;
    if (!isMobile) return;
    const matching = isHamburgerMenuOpen && isMobile.matches;
    (document.body.parentNode as HTMLElement).classList.toggle("prevent-scrolling", matching);
    // alert("hi" + matching);
  }, [isHamburgerMenuOpen]);
  useEffect(() => {
    const isMobile = "matchMedia" in globalThis ? globalThis.matchMedia("(max-width: 50em)") : null;
    if (!isMobile) return;
    isMobile.onchange = updateScreenScroll;
    return () => {
      isMobile.onchange = null;
    };
  }, []);
  useEffect(updateScreenScroll, [isHamburgerMenuOpen]);
  return (
    <AstroLinkURL url={url}>
      <header className={clsx({ "site-header": true, open: isHamburgerMenuOpen, closed: !isHamburgerMenuOpen })}>
        <div className="header--container">
          <AstroLink href="/" className="header--logo">
            <h1>
              <svg width="258px" height="42px" viewBox="0 0 258 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g fill="000000" fillRule="nonzero">
                  <path d="M20.4016775,32.3067374 C22.377079,32.3067374 24.1564637,31.8705074 25.7398313,30.9980474 C27.323199,30.1255873 28.5786921,28.8489385 29.5063108,27.1681008 C30.4339295,25.4872632 30.8977388,23.4385861 30.8977388,21.0220695 C30.8977388,18.5957058 30.4339295,16.5396434 29.5063108,14.8538823 C28.5786921,13.1681212 27.323199,11.8890106 25.7398313,11.0165505 C24.1564637,10.1440905 22.377079,9.70786047 20.4016775,9.70786047 C18.4284299,9.70786047 16.6471606,10.1440905 15.0578693,11.0165505 C13.468578,11.8890106 12.2115848,13.1681212 11.2868894,14.8538823 C10.3621941,16.5396434 9.89984642,18.5957058 9.89984642,21.0220695 C9.89984642,23.4305854 10.3621941,25.4753006 11.2868894,27.1562152 C12.2115848,28.8371298 13.468578,30.1157788 15.0578693,30.9921622 C16.6471606,31.8685457 18.4284299,32.3067374 20.4016775,32.3067374 Z M20.4016775,27.6510272 C19.3480479,27.6510272 18.4431235,27.3965052 17.6869043,26.8874612 C16.9306851,26.3784172 16.3487501,25.6305448 15.9410995,24.6438441 C15.5334489,23.6571434 15.3296236,22.4498852 15.3296236,21.0220695 C15.3296236,19.5844067 15.5334489,18.3697632 15.9410995,17.378139 C16.3487501,16.3865148 16.9306851,15.6361807 17.6869043,15.1271367 C18.4431235,14.6180927 19.3480479,14.3635707 20.4016775,14.3635707 C21.4633077,14.3635707 22.3717324,14.6180927 23.1269516,15.1271367 C23.8821707,15.6361807 24.4611438,16.3865148 24.863871,17.378139 C25.2665981,18.3697632 25.4679617,19.5844067 25.4679617,21.0220695 C25.4679617,22.4498852 25.2665981,23.6571434 24.863871,24.6438441 C24.4611438,25.6305448 23.8821707,26.3784172 23.1269516,26.8874612 C22.3717324,27.3965052 21.4633077,27.6510272 20.4016775,27.6510272 Z M39.8156382,32.0113273 L43.762364,18.676559 L43.9396101,18.676559 L47.886336,32.0113273 L53.0204722,32.0113273 L59.4251028,10.0032706 L53.5404402,10.0032706 L50.2140757,24.4605975 L50.0250593,24.4605975 L46.2555796,10.0032706 L41.4463946,10.0032706 L37.6709143,24.4135165 L37.4878985,24.4135165 L34.1555334,10.0032706 L28.2771021,10.0032706 L34.6755015,32.0113273 L39.8156382,32.0113273 Z M58.145482,10.0032706 L58.145482,32.0113273 L63.4502139,32.0113273 L66.2870321,32.0113273 C68.3732842,32.0113273 70.191479,31.6287424 71.7416165,30.8635726 L72.0696859,30.6937518 C73.6895182,29.8153682 74.9376261,28.5534898 75.8140096,26.9081168 C76.6903931,25.2627438 77.1285848,23.2968046 77.1285848,21.0102992 C77.1285848,18.7197935 76.689393,16.7528157 75.8110093,15.1093659 C74.9326257,13.4659162 73.6835177,12.2040378 72.0636854,11.3237309 C70.443853,10.4434241 68.5143785,10.0032706 66.2752618,10.0032706 L66.2752618,10.0032706 L63.4510946,10.0032706 L60.3137464,10.0032706 L58.145482,10.0032706 Z M63.4502139,14.5413273 L65.9798517,14.5408168 C67.246115,14.5408168 68.3139765,14.7500656 69.1834363,15.1685634 C70.0528961,15.5870611 70.7092221,16.2694662 71.1524143,17.2157788 C71.5956064,18.1620914 71.8172025,19.4269315 71.8172025,21.0102992 C71.8172025,22.5896665 71.5966065,23.8540066 71.1554145,24.8033195 C70.7142225,25.7526323 70.0647818,26.4350375 69.2070922,26.8505349 C68.3494027,27.2660324 67.3011967,27.4737811 66.0624742,27.4737811 L66.0624742,27.4737811 L63.4502139,27.4743273 L63.4502139,14.5413273 Z M76.7677339,10.0032706 L76.7677339,32.0113273 L82.0732139,32.0113273 L84.909284,32.0113273 C86.9955362,32.0113273 88.813731,31.6287424 90.3638684,30.8635726 L90.6919378,30.6937518 C92.3117702,29.8153682 93.5598781,28.5534898 94.4362615,26.9081168 C95.312645,25.2627438 95.7508367,23.2968046 95.7508367,21.0102992 C95.7508367,18.7197935 95.3116449,16.7528157 94.4332613,15.1093659 C93.5548776,13.4659162 92.3057696,12.2040378 90.6859373,11.3237309 C89.0661049,10.4434241 87.1366304,10.0032706 84.8975137,10.0032706 L84.8975137,10.0032706 L82.0733465,10.0032706 L78.9359983,10.0032706 L76.7677339,10.0032706 Z M82.0732139,14.5413273 L84.6021036,14.5408168 C85.8683669,14.5408168 86.9362285,14.7500656 87.8056883,15.1685634 C88.675148,15.5870611 89.331474,16.2694662 89.7746662,17.2157788 C90.2178583,18.1620914 90.4394544,19.4269315 90.4394544,21.0102992 C90.4394544,22.5896665 90.2188584,23.8540066 89.7776664,24.8033195 C89.3364745,25.7526323 88.6870337,26.4350375 87.8293441,26.8505349 C86.9716546,27.2660324 85.9234486,27.4737811 84.6847261,27.4737811 L84.6847261,27.4737811 L82.0732139,27.4743273 L82.0732139,14.5413273 Z M100.571434,32.0113273 L100.571434,18.4342303 L100.75468,18.4342303 L106.021751,31.8696227 L109.336345,31.8696227 L114.644728,18.4815421 L114.804434,18.4815421 L114.804434,32.0113273 L120.006422,32.0113273 L120.006422,10.0032706 L113.416006,10.0032706 L107.808983,23.6276793 L107.566885,23.6276793 L101.983402,10.0032706 L95.3899858,10.0032706 L95.3899858,32.0113273 L100.571434,32.0113273 Z" />
                  <g transform="translate(128, 0)">
                    <path d="M16.0484988,32.0113273 L16.0484988,26.0500426 L18.1812217,23.3735805 L23.6583106,32.0113273 L30.0213992,32.0113273 L22.0806357,19.8344283 L29.8794639,10.0032706 L23.6109988,10.0032706 L16.3379084,19.3029208 L16.0484988,19.3029208 L16.0484988,10.0032706 L10.7428862,10.0032706 L10.7428862,32.0113273 L16.0484988,32.0113273 Z M39.8156382,32.0113273 L43.762364,18.676559 L43.9396101,18.676559 L47.886336,32.0113273 L53.0204722,32.0113273 L59.4251028,10.0032706 L53.5404402,10.0032706 L50.2140757,24.4605975 L50.0250593,24.4605975 L46.2555796,10.0032706 L41.4463946,10.0032706 L37.6709143,24.4135165 L37.4878985,24.4135165 L34.1555334,10.0032706 L28.2771021,10.0032706 L34.6755015,32.0113273 L39.8156382,32.0113273 Z M58.145482,10.0032706 L58.145482,32.0113273 L63.4502139,32.0113273 L66.2870321,32.0113273 C68.3732842,32.0113273 70.191479,31.6287424 71.7416165,30.8635726 L72.0696859,30.6937518 C73.6895182,29.8153682 74.9376261,28.5534898 75.8140096,26.9081168 C76.6903931,25.2627438 77.1285848,23.2968046 77.1285848,21.0102992 C77.1285848,18.7197935 76.689393,16.7528157 75.8110093,15.1093659 C74.9326257,13.4659162 73.6835177,12.2040378 72.0636854,11.3237309 C70.443853,10.4434241 68.5143785,10.0032706 66.2752618,10.0032706 L66.2752618,10.0032706 L63.4510946,10.0032706 L60.3137464,10.0032706 L58.145482,10.0032706 Z M63.4502139,14.5413273 L65.9798517,14.5408168 C67.246115,14.5408168 68.3139765,14.7500656 69.1834363,15.1685634 C70.0528961,15.5870611 70.7092221,16.2694662 71.1524143,17.2157788 C71.5956064,18.1620914 71.8172025,19.4269315 71.8172025,21.0102992 C71.8172025,22.5896665 71.5966065,23.8540066 71.1554145,24.8033195 C70.7142225,25.7526323 70.0647818,26.4350375 69.2070922,26.8505349 C68.3494027,27.2660324 67.3011967,27.4737811 66.0624742,27.4737811 L66.0624742,27.4737811 L63.4502139,27.4743273 L63.4502139,14.5413273 Z M76.7677339,10.0032706 L76.7677339,32.0113273 L82.0732139,32.0113273 L84.909284,32.0113273 C86.9955362,32.0113273 88.813731,31.6287424 90.3638684,30.8635726 L90.6919378,30.6937518 C92.3117702,29.8153682 93.5598781,28.5534898 94.4362615,26.9081168 C95.312645,25.2627438 95.7508367,23.2968046 95.7508367,21.0102992 C95.7508367,18.7197935 95.3116449,16.7528157 94.4332613,15.1093659 C93.5548776,13.4659162 92.3057696,12.2040378 90.6859373,11.3237309 C89.0661049,10.4434241 87.1366304,10.0032706 84.8975137,10.0032706 L84.8975137,10.0032706 L82.0733465,10.0032706 L78.9359983,10.0032706 L76.7677339,10.0032706 Z M82.0732139,14.5413273 L84.6021036,14.5408168 C85.8683669,14.5408168 86.9362285,14.7500656 87.8056883,15.1685634 C88.675148,15.5870611 89.331474,16.2694662 89.7746662,17.2157788 C90.2178583,18.1620914 90.4394544,19.4269315 90.4394544,21.0102992 C90.4394544,22.5896665 90.2188584,23.8540066 89.7776664,24.8033195 C89.3364745,25.7526323 88.6870337,26.4350375 87.8293441,26.8505349 C86.9716546,27.2660324 85.9234486,27.4737811 84.6847261,27.4737811 L84.6847261,27.4737811 L82.0732139,27.4743273 L82.0732139,14.5413273 Z M100.571434,32.0113273 L100.571434,18.4342303 L100.75468,18.4342303 L106.021751,31.8696227 L109.336345,31.8696227 L114.644728,18.4815421 L114.804434,18.4815421 L114.804434,32.0113273 L120.006422,32.0113273 L120.006422,10.0032706 L113.416006,10.0032706 L107.808983,23.6276793 L107.566885,23.6276793 L101.983402,10.0032706 L95.3899858,10.0032706 L95.3899858,32.0113273 L100.571434,32.0113273 Z" />
                  </g>
                  <circle cx="129" cy="21" r="3" />
                </g>
              </svg>
              <span className="sr-only">OWDDM KWDDM</span>
            </h1>
          </AstroLink>
          <nav role="navigation" className="header--links">
            <ul className="list-reset">
              <li>
                <AstroLink activeClass="active-menu" href="/">
                  Home
                </AstroLink>
              </li>
              <li>
                <AstroLink activeClass="active-menu" href="/about">
                  About
                </AstroLink>
              </li>
              <li>
                <AstroLink activeClass="active-menu" href="/events">
                  Events
                </AstroLink>
              </li>
              <li>
                <AstroLink activeClass="active-menu" href="/photos">
                  Photos
                </AstroLink>
              </li>
            </ul>
          </nav>
          <div className="header--join-link">
            <AstroLink className="join-link" href="/join">
              → Join
            </AstroLink>
          </div>
          <div className="header--social-media">
            <SocialMedia />
          </div>
          <button aria-label="mobile menu" type="button" className="hamburger-menu" onClickCapture={toggleHamburgerMenuVisibility}>
            {!isHamburgerMenuOpen ? (
              <svg viewBox="0 0 100 100">
                <rect y="5" width="100" height="15" />
                <rect y="43.5" width="100" height="15" />
                <rect y="80" width="100" height="15" />
              </svg>
            ) : (
              <svg viewBox="0 0 100 100">
                <line x1="0" y1="0" x2="100" y2="100" style={{ stroke: "#000", strokeWidth: 15 }} />
                <line x1="100" y1="0" x2="0" y2="100" style={{ stroke: "#000", strokeWidth: 15 }} />
              </svg>
            )}
          </button>
        </div>
      </header>
    </AstroLinkURL>
  );
};
