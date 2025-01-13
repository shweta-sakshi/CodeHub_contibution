/**
 * @fileoverview Navbar component for the application.
 */
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CodeHubLogo from "./Assets/Logos/CodeHubSmall.png";
import HamburgerMenu from "./HamburgerMenu";
import { logout } from "../../redux/slices/authSlice";

function Navbar() {
    const auth = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Navigate to landing page when logo is clicked.
    const handleLogoClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate("/");
    };

    // Logout the user and navigate to login page.
    const handleLogout = async() => {
        await dispatch(logout()); 
        navigate("/login"); 
    };

    // Toggle dropdown when clicked.
    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Close dropdown if clicked outside the dropdown area.
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            {/* Navbar for large screens */}
            <div className="w-[100vw] bg-primary custom1980:h-[92px] md:h-[60px] px-8 py-2 fixed bg-scheduleLargeText items-center justify-between z-50 md:flex hidden">

                {/* Logo of CodeHub */}
                <img
                    src={CodeHubLogo}
                    className="logo hover:cursor-pointer w-auto h-10 object-contain bg-transparent"
                    onClick={handleLogoClick}
                />

                {/* Navigation links */}
                <div className="text-white navlinks w-[67%] flex h-full items-center justify-between font-bebas md:text-[1.6vw]">
                    <h2
                        className="hover:text-accent tracking-widest transition-colors cursor-pointer duration-300"
                        onClick={() => navigate("/")}
                    >
                        Home
                    </h2>
                    <h2
                        className="hover:text-accent tracking-widest transition-colors cursor-pointer duration-300"
                        onClick={() => navigate("/contact-us")}
                    >
                        Contact Us
                    </h2>
                    <h2
                        className="hover:text-accent tracking-widest transition-colors cursor-pointer duration-300"
                        onClick={() => navigate("/notice-board")}
                    >
                        Notice Board
                    </h2>
                </div>

                {/*Additional profile menu if the user is authenticated, otherwise show the login button */}
                {auth ? (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={handleDropdownToggle}
                            className="auth rounded-lg w-[11vw] bg-[#008CFF] lg:w-[7.1vw] h-[47px] tracking-wider text-white font-semibold font-bebas hover:text-primary hover:bg-accent transition-all duration-500"
                        >
                            <h1 className="lg:text-[1.3vw] md:text-[1.5vw]">Profile</h1>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 w-[11vw] bg-white text-black rounded-lg shadow-lg mt-2 z-50">
                                <h1
                                    className="hover:bg-blue-200 px-2 py-2 cursor-pointer transition-colors duration-300 hover:text-primary"
                                    onClick={() => navigate("/dashboard")}
                                >
                                    Dashboard
                                </h1>
                                <h1
                                    className="hover:bg-blue-200 px-2 py-2 cursor-pointer transition-colors duration-300 hover:text-primary"
                                    onClick={() => navigate("/education")}
                                >
                                    Education
                                </h1>
                                <h1
                                    className="hover:bg-blue-200 px-2 py-2 cursor-pointer transition-colors duration-300 hover:text-primary"
                                    onClick={() => navigate("/leader-board")}
                                >
                                    Leaderboard
                                </h1>
                                <h1
                                    className="hover:bg-red-200 px-2 py-2 cursor-pointer transition-colors duration-300 hover:text-red-500"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </h1>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className="auth rounded-lg w-[11vw] bg-[#008CFF] lg:w-[7.1vw] h-[47px] tracking-wider text-white font-semibold font-bebas hover:text-primary hover:bg-accent transition-all duration-500"
                    >
                        <h1 className="lg:text-[1.3vw] md:text-[1.5vw]">Login</h1>
                    </button>
                )}
            </div>

            {/* Navbar for small screens */}
            <div className="w-screen h-auto -top-[15px] flex items-center justify-end z-50 md:hidden">
                <div className="bg-primary w-full h-24 absolute md:hidden"></div>
                <div className="z-30">
                    {/*logo of CodeHub*/}
                    <img
                        src={CodeHubLogo}
                        className="logo absolute left-2 logo hover:cursor-pointer w-auto h-10"
                        onClick={handleLogoClick}
                    ></img>
                </div>
                <div>
                    {/* menu component for small screens */}
                    <HamburgerMenu />
                </div>
            </div>

        </>
    );
}

export default Navbar;
