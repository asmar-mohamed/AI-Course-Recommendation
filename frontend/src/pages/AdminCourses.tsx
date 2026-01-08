import { useEffect, useState } from 'react'
import * as courseService from '@/services/courseService'
import type { Course } from '@/types/types'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AdminCourses() {
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null)
    const [formData, setFormData] = useState<Partial<Course>>({
        title: '',
        description: '',
        course_url: '',
        category: ''
    })

    useEffect(() => {
        loadCourses()
    }, [])

    const loadCourses = async () => {
        try {
            setLoading(true)
            const data = await courseService.getAll()
            setCourses(data)
        } catch (error) {
            console.error('Failed to load courses', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this course?')) return
        try {
            await courseService.remove(id)
            setCourses(courses.filter(c => c.id !== id))
        } catch (error) {
            console.error('Failed to delete course', error)
        }
    }

    const handleEdit = (course: Course) => {
        setEditingCourse(course)
        setFormData({
            title: course.title || course.name,
            description: course.description,
            course_url: course.course_url
        })
        setIsModalOpen(true)
    }

    const handleAdd = () => {
        setEditingCourse(null)
        setFormData({
            title: '',
            description: '',
            course_url: '',
            category: ''
        })
        setIsModalOpen(true)
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (editingCourse?.id) {
                const updated = await courseService.update(editingCourse.id, formData)
                setCourses(courses.map(c => c.id === editingCourse.id ? updated : c))
            } else {
                const created = await courseService.create(formData)
                setCourses([...courses, created])
            }
            setIsModalOpen(false)
        } catch (error) {
            console.error('Failed to save course', error)
        }
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold tracking-tight">Manage Courses</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">View and manage all available courses</p>
                </div>
                <Button
                    onClick={handleAdd}
                    className="rounded-2xl px-6 py-6 h-auto text-base font-semibold shadow-lg shadow-primary/20"
                >
                    <Icon icon="solar:add-circle-bold-duotone" width={24} className="mr-2" />
                    Add New Course
                </Button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 w-full max-w-lg shadow-2xl">
                        <h3 className="text-2xl font-bold mb-6">{editingCourse ? 'Edit Course' : 'Add New Course'}</h3>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Title</label>
                                <Input
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    placeholder="Enter course title"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Description</label>
                                <textarea
                                    className="w-full h-32 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-primary outline-none resize-none"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Enter course description"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Category</label>
                                <Input
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    required
                                    placeholder="e.g. AI, Web Development, Data Science"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">URL</label>
                                <Input
                                    value={formData.course_url}
                                    onChange={e => setFormData({ ...formData, course_url: e.target.value })}
                                    placeholder="Enter course URL"
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-8">
                                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="submit">Save Course</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                                <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Title</th>
                                <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Category</th>
                                <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={3} className="px-8 py-20 text-center">
                                        <div className="flex justify-center">
                                            <Icon icon="line-md:loading-twotone-loop" width={48} className="text-primary" />
                                        </div>
                                    </td>
                                </tr>
                            ) : courses.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-8 py-20 text-center text-slate-400 font-medium">
                                        No courses found.
                                    </td>
                                </tr>
                            ) : (
                                courses.map((course) => (
                                    <tr key={course.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">
                                                {course.title || course.name}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="bg-lightprimary text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                                {course.category || 'General'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(course)}
                                                    className="p-2 text-slate-400 hover:text-primary hover:bg-lightprimary rounded-xl transition-all"
                                                >
                                                    <Icon icon="solar:pen-bold-duotone" width={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(course.id)}
                                                    className="p-2 text-slate-400 hover:text-error hover:bg-lighterror rounded-xl transition-all"
                                                >
                                                    <Icon icon="solar:trash-bin-trash-bold-duotone" width={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
