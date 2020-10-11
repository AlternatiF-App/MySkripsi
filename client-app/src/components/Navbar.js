import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {

    return (
        <nav className="black lighten-1" role="navigation">
            <div className="nav-wrapper container"><Link to="/" id="logo-container" className="brand-logo">Alternatif</Link>
            {<ul className="right hide-on-med-and-down">
                <li><Link to="/siswa">Siswa</Link></li>,
                <li><Link to="/minat">Minat</Link></li>,
                <li><Link to="/tentang">Tentang</Link></li>,
                <li><Link to="/bantuan">Bantuan</Link></li>,
            </ul>}
            </div>
        </nav>
    )
}

export default Navbar;