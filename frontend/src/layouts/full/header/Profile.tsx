import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const Profile = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    const handleLogout = () => {
        // Basic logout logic
        localStorage.removeItem("token");
        navigate("/login");
    };

    const profileImageUrl = user?.profile_picture || "https://avatars.githubusercontent.com/u/124599?v=4";

    return (
        <div className="relative group/menu">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="h-12 w-12 hover:bg-lightprimary rounded-lg flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary border-0 p-0 bg-transparent">
                        <img
                            src={profileImageUrl}
                            alt="Profile"
                            height={48}
                            width={48}
                            className="rounded-lg object-cover"
                        />
                    </button>
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
