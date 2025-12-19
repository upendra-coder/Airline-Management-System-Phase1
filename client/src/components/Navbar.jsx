import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    
    // Check if user is logged in by looking at Local Storage
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user'); // Delete token
        navigate('/login'); // Send to login page
        window.location.reload(); // Refresh to update UI
    };

    return (
        <nav style={{ background: '#333', padding: '1rem', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '800px', margin: '0 auto', alignItems: 'center' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    ✈️ AirlineApp
                </Link>

                <div>
                    {user ? (
                        <>
                            <span style={{ color: '#ccc', marginRight: '15px' }}>
                                Hello, {user.name}
                            </span>
                            <Link to="/mybookings" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>
                                My Bookings
                            </Link>
                            
                            {/* Only show this if user is Admin */}
                            {user && user.isAdmin && (
                                <Link to="/add-flight" style={{ color: '#f0ad4e', marginRight: '15px', fontWeight: 'bold' }}>
                                    + Add Flight
                                </Link>
                            )}

                            <button 
                                onClick={handleLogout}
                                style={{ background: 'red', padding: '5px 10px', fontSize: '0.9rem' }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ color: 'white', marginRight: '15px' }}>Login</Link>
                            <Link to="/register" style={{ color: 'white' }}>Register</Link>
                            <Link to="/mybookings" style={{ color: 'white', marginRight: '15px' }}>My Bookings</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;