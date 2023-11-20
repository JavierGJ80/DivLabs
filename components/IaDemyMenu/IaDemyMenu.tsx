import React, { useState } from "react";
import { IaDemyMenuProps } from "./IaDemyMenu.types";
import "./IaDemyMenu.css";

const IaDemyMenu = ( props: IaDemyMenuProps) => {
    const { onClose } = props;
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        console.log('Toggling menu')
        setMenuOpen(!menuOpen);
    };

    const handleMenuItemClick = (route: string) => {
        console.log(`Navigating to ${route}`);
        setMenuOpen(false);
    };

    return (
        <div className="hamburger">
            <a className={`main-nav-toggle ${menuOpen ? 'active-menu': null}`} onClick={handleMenuToggle}><i>Menu</i></a>
        </div>
    );
};

export default IaDemyMenu;
