import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to={'/'}>
            <img src={"/images/logos/logo-icon.svg"} alt="logo" />
        </Link>
    )
}

export default Logo
