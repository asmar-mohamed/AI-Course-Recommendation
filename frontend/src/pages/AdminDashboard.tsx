import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import * as courseService from '@/services/courseService'
import * as skillService from '@/services/skillService'
import * as testService from '@/services/testService'
import Chart from 'react-apexcharts'
import { useTheme } from 'next-themes'

export default function AdminDashboard() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const [stats, setStats] = useState({
        courses: 0,
        skills: 0,
        tests: 0,
        categories: {} as Record<string, number>
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true)
                const [courses, skills, tests] = await Promise.all([
                    courseService.getAll(),
                    skillService.getAll(),
                    testService.getAll()
                ])

                const categories: Record<string, number> = {}
                courses.forEach(c => {
                    const cat = c.category || 'General'
                    categories[cat] = (categories[cat] || 0) + 1
                })

                setStats({
                    courses: courses.length,
                    skills: skills.length,
                    tests: tests.length,
                    categories
                })
            } catch (error) {
                console.error('Failed to fetch admin stats', error)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    const donutOptions: any = {
        chart: {
            type: 'donut',
            fontFamily: 'inherit',
        },
        labels: ['Courses', 'Skills', 'Tests'],
        colors: ['#5D87FF', '#FFAE1F', '#FA896B'],
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    background: 'transparent',
                    labels: {
                        show: true,
                        name: { show: true, fontSize: '14px', color: isDark ? '#fff' : '#64748b' },
                        value: { show: true, fontSize: '20px', fontWeight: 'bold', color: isDark ? '#fff' : '#1e293b' },
                        total: { show: true, label: 'Total', color: isDark ? '#94a3b8' : '#64748b' }
                    }
                }
            }
        },
        dataLabels: { enabled: false },
        legend: { position: 'bottom', labels: { colors: isDark ? '#94a3b8' : '#64748b' } },
        stroke: { show: false },
        tooltip: { theme: isDark ? 'dark' : 'light' }
    }

    const barOptions: any = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            fontFamily: 'inherit',
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                columnWidth: '45%',
                distributed: true,
            }
        },
        dataLabels: { enabled: false },
        colors: ['#5D87FF', '#49BEFF', '#13DEB9', '#FA896B', '#FFAE1F'],
        xaxis: {
            categories: Object.keys(stats.categories),
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: isDark ? '#94a3b8' : '#64748b' } }
        },
        yaxis: {
            labels: { style: { colors: isDark ? '#94a3b8' : '#64748b' } }
        },
        grid: {
            borderColor: isDark ? '#334155' : '#e2e8f0',
            strokeDashArray: 4,
        },
        legend: { show: false },
        tooltip: { theme: isDark ? 'dark' : 'light' }
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">System Overview & Management</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-lightprimary flex items-center justify-center text-primary">
                        <Icon icon="solar:library-bold-duotone" width={32} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Courses</p>
                        <div className="text-3xl font-bold mt-1">
                            {loading ? <Icon icon="line-md:loading-twotone-loop" /> : stats.courses}
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-lightwarning flex items-center justify-center text-warning">
                        <Icon icon="solar:medal-star-bold-duotone" width={32} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Skills</p>
                        <div className="text-3xl font-bold mt-1">
                            {loading ? <Icon icon="line-md:loading-twotone-loop" /> : stats.skills}
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-lighterror flex items-center justify-center text-error">
                        <Icon icon="solar:clipboard-list-bold-duotone" width={32} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Tests</p>
                        <div className="text-3xl font-bold mt-1">
                            {loading ? <Icon icon="line-md:loading-twotone-loop" /> : stats.tests}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm">
                    <h3 className="text-xl font-bold mb-6">Entity Distribution</h3>
                    <div className="h-[300px]">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <Icon icon="line-md:loading-twotone-loop" width={48} className="text-primary" />
                            </div>
                        ) : (
                            <Chart
                                options={donutOptions}
                                series={[stats.courses, stats.skills, stats.tests]}
                                type="donut"
                                width="100%"
                                height="100%"
                            />
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm">
                    <h3 className="text-xl font-bold mb-6">Courses by Category</h3>
                    <div className="h-[300px]">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <Icon icon="line-md:loading-twotone-loop" width={48} className="text-primary" />
                            </div>
                        ) : (
                            <Chart
                                options={barOptions}
                                series={[{ name: 'Courses', data: Object.values(stats.categories) }]}
                                type="bar"
                                width="100%"
                                height="100%"
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Welcome to the Administration Panel</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    As an administrator, you have full control over the platform's educational content. Use the sidebar to:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <Icon icon="solar:library-bold-duotone" width={32} className="text-primary mb-3" />
                        <h4 className="font-bold mb-2">Courses</h4>
                        <p className="text-sm text-slate-500">Manage existing courses and add new ones to the platform's library.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <Icon icon="solar:medal-star-bold-duotone" width={32} className="text-warning mb-3" />
                        <h4 className="font-bold mb-2">Skills</h4>
                        <p className="text-sm text-slate-500">Define and update platform-wide skills for user assessment.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <Icon icon="solar:clipboard-list-bold-duotone" width={32} className="text-error mb-3" />
                        <h4 className="font-bold mb-2">Tests</h4>
                        <p className="text-sm text-slate-500">Create assessment tests to validate users' skill levels.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
