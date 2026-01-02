import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Basic logout logic
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="relative group/menu">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <span className="h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
                        <img
                            src="/matdash-nextjs/images/profile/user-1.jpg"
                            alt="Profile"
                            height={35}
                            width={35}
                            className="rounded-full"
                        />
                    </span>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-44 rounded-sm shadow-md p-2"
                >
                    <DropdownMenuItem asChild>
                        <Link
                            to="/profile"
                            className="px-3 py-2 flex items-center w-full gap-3 text-darkLink hover:bg-lightprimary hover:text-primary"
                        >
                            <Icon icon="solar:user-circle-outline" height={20} />
                            My Profile
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link
                            to="/dashboard"
                            className="px-3 py-2 flex items-center w-full gap-3 text-darkLink hover:bg-lightprimary hover:text-primary"
                        >
                            <Icon icon="solar:letter-linear" height={20} />
                            Dashboard
                        </Link>
                    </DropdownMenuItem>

                    <div className="p-3 pt-0">
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 w-full"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Profile;
