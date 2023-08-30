import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./style.scss";

import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { FcLike } from "react-icons/fc";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/Flikhub-removebg-preview.png";

function Header() {
  const [show, setShow] = useState("top");
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [focusSearchInput, setFocusSearchInput] = useState(false);
  const favCount = useSelector((state) => state.like.likeCount);
  console.log(">>>>>>",favCount)

  const navigate = useNavigate();
  const location = useLocation();

  const searchInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  });

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
      setLastScrollY(window.scrollY);
    } else {
      setShow("top");
    }
  };

  const loginOut = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  useEffect(() => {
    if (focusSearchInput && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [focusSearchInput]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
    setFocusSearchInput(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(!mobileMenu);
    setShowSearch(false);
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>

        <ul className="menuItems">
          <div className="heart">
            <FcLike className="like" />
            <li className="circle">{favCount}</li>
          </div>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Show
          </li>
          <li className="menuItem" onClick={loginOut}>
            {isLoggedIn ? "Logout" : "Login"}
          </li>
          <li className=""></li>
        </ul>
        <div className="mobileMenuItems">
          <div className="mobHeart">
            <FcLike className="mobLike" />
            <span className="mobCircle">0</span>
          </div>
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for a movie or TV Show.."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
}

export default Header;
