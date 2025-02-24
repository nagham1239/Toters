import React from "react";
const Navbar = () => (
    <nav style={{background: '#333', color:'#fff', padding: '10px 20px', display:'flex', justifyContent:'space-between'}}>
        <div style={{fontSize:'24px', fontWeight:'bold', }}>WHAT IS TOTERS</div>
        <ul style={{listStyle:'none', display:'flex', gap:'15px'}}>
            <li>Home</li>
            <li>Offers</li>
            <li>Products</li>
            <li>Contact</li>
        </ul>
    </nav>
);
export default Navbar;