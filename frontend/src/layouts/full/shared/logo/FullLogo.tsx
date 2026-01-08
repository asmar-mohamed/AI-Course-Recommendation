import { Link } from "react-router-dom";

const FullLogo = () => {
    return (
        <Link to={"/"}>
            {/* Dark Logo */}
            <img
                src="./reco.png"
                alt="logo"
                width={135}
                height={40}
                className="block"
            />
            {/* Light Logo */}
            <img
                src="./reco.png"
                alt="logo"
                width={135}
                height={40}
                className="hidden"
            />
        </Link>
    );
};

export default FullLogo;
