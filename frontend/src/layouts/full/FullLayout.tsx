import Header from '@/layouts/full/header/Header'
import Sidebar from '@/layouts/full/sidebar/Sidebar'

export default function FullLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='flex w-full min-h-screen'>
            <div className='page-wrapper flex w-full text-foreground'>
                {/* Header/sidebar */}
                <div className='xl:block hidden'>
                    <Sidebar />
                </div>

                <div className='body-wrapper w-full'>
                    {/* Top Header  */}
                    <Header />
                    {/* Body Content  */}
                    <div className="bg-lightgray dark:bg-dark mr-3 rounded-3xl min-h-[90vh]">
                        <div className={`container mx-auto px-6 py-8`}>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
