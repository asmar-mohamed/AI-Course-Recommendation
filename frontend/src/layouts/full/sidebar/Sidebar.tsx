import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { useTheme } from 'next-themes'
import SidebarContent from './Sidebaritems'
import SimpleBar from 'simplebar-react'
import { Icon } from '@iconify/react'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import {
    AMLogo,
    AMMenu,
    AMMenuItem,
    AMSidebar,
    AMSubmenu,
} from 'tailwind-sidebar'
import 'tailwind-sidebar/styles.css'

const renderSidebarItems = (
    items: any[],
    currentPath: string,
    onClose?: () => void,
    isSubItem: boolean = false
) => {
    return items.map((item, index) => {
        const isSelected = currentPath === item?.url
        const IconComp = item.icon || null

        const iconElement = IconComp ? (
            <Icon icon={IconComp} height={21} width={21} />
        ) : (
            <Icon icon={'ri:checkbox-blank-circle-line'} height={9} width={9} />
        )

        // Heading
        if (item.heading) {
            return (
                <div className='mb-1' key={item.heading}>
                    <AMMenu
                        subHeading={item.heading}
                        ClassName={`hide-menu leading-21 text-charcoal font-bold uppercase text-xs dark:text-darkcharcoal`}
                    />
                </div>
            )
        }

        // Submenu
        if (item.children?.length) {
            return (
                <AMSubmenu
                    key={item.id}
                    icon={iconElement}
                    title={item.name}
                    ClassName={`mt-1.5 text-link dark:text-darklink`}>
                    {renderSidebarItems(item.children, currentPath, onClose, true)}
                </AMSubmenu>
            )
        }

        // Regular menu item
        const linkTarget = item.url?.startsWith('https') ? '_blank' : '_self'

        const itemClassNames = isSubItem
            ? `mt-1.5 text-link dark:text-darklink !hover:bg-transparent ${item?.isPro && "!text-gray-400"} ${isSelected ? '!bg-transparent !text-primary' : ''
            } !px-1.5 `
            : `!hover:bg-lightprimary !hover:text-primary mt-1.5 ${item?.isPro && "!text-gray-400"} text-link dark:text-darklink ${isSelected ? '!bg-lightprimary !text-primary !hover:bg-lightprimary' : ' '}`

        return (
            <div onClick={onClose} key={index}>
                <AMMenuItem
                    key={item.id}
                    icon={iconElement}
                    isSelected={isSelected}
                    link={item.url || undefined}
                    target={linkTarget}
                    badgeColor='bg-lightsecondary'
                    badgeTextColor='text-secondary'
                    disabled={item.disabled}
                    badgeContent={item.isPro ? 'Pro' : undefined}
                    component={Link}
                    className={`${itemClassNames}`}>
                    <span className='truncate flex-1'>{item.title || item.name}</span>
                </AMMenuItem>
            </div>
        )
    })
}

const SidebarLayout = ({ onClose }: { onClose?: () => void }) => {
    const location = useLocation()
    const pathname = location.pathname
    const { theme } = useTheme()
    const user = useSelector((state: RootState) => state.auth.user)
    const navigate = useNavigate()

    // Only allow "light" or "dark" for AMSidebar
    const sidebarMode = theme === 'light' || theme === 'dark' ? theme : undefined

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <AMSidebar
            collapsible='none'
            animation={true}
            showProfile={false}
            width={'270px'}
            showTrigger={false}
            mode={sidebarMode}
            className='fixed left-0 top-0 border-none bg-background z-10 h-screen flex flex-col'>
            {/* Logo */}
            <div className='px-4 flex items-center brand-logo overflow-hidden'>
                <AMLogo component={Link} href='/' img=''>
                  <img
                    src="/reco.png"
                    alt="logo"
                    width={300}
                    height={100}
                    />
                </AMLogo>
            </div>

            {/* Sidebar items */}
            <SimpleBar className='h-[calc(100vh-10vh)] flex-1'>
                <div className='px-6'>
                    {SidebarContent
                        .filter(section => {
                            if (section.heading === 'Admin') {
                                return user?.role === 'admin'
                            }
                            return true
                        })
                        .map((section, index) => (
                            <div key={index}>
                                {renderSidebarItems(
                                    [
                                        ...(section.heading ? [{ heading: section.heading }] : []),
                                        ...(section.children || []),
                                    ],
                                    pathname,
                                    onClose
                                )}
                            </div>
                        ))}
                </div>
            </SimpleBar>

            {/* Profile Section at Bottom */}
            <div className='border-t border-border dark:border-slate-700 px-4 py-4'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className='w-full flex items-center gap-3 p-3 rounded-lg hover:bg-lightprimary dark:hover:bg-slate-800 transition-colors group'>
                            <img
                                src={user?.profile_picture || "https://avatars.githubusercontent.com/u/124599?v=4"}
                                alt="Profile"
                                height={40}
                                width={40}
                                className="rounded-full"
                            />
                            <div className='flex-1 min-w-0 text-left'>
                                <p className='text-sm font-semibold text-dark dark:text-white truncate'>{user?.name || 'User'}</p>
                                <p className='text-xs text-muted dark:text-slate-400 truncate'>{user?.email || ''}</p>
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44 rounded-lg shadow-md p-2 mt-2">
                        <DropdownMenuItem asChild>
                            <Link
                                to="/profile"
                                onClick={onClose}
                                className="px-3 py-2 flex items-center w-full gap-3 text-dark dark:text-white hover:bg-lightprimary hover:text-primary cursor-pointer rounded"
                            >
                                <Icon icon="solar:user-circle-bold-duotone" width={20} />
                                My Profile
                            </Link>
                        </DropdownMenuItem>
                        <div className="p-2 pt-2 border-t border-border">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                                onClick={() => {
                                    handleLogout()
                                    onClose?.()
                                }}
                            >
                                <Icon icon="solar:logout-2-linear" width={16} className="mr-2" />
                                Logout
                            </Button>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </AMSidebar>
    )
}

export default SidebarLayout
