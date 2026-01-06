import { useEffect, useState } from 'react'
import * as testService from '@/services/testService'
import * as skillService from '@/services/skillService'
import type { Test, Skill } from '@/types/types'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AdminTests() {
    const [tests, setTests] = useState<Test[]>([])
    const [skills, setSkills] = useState<Skill[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingTest, setEditingTest] = useState<Partial<Test> | null>(null)
    const [formData, setFormData] = useState<Partial<Test>>({
        title: '',
        duration: 30,
        skill_id: 0
    })

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)
            const [testData, skillData] = await Promise.all([
                testService.getAll(),
                skillService.getAll()
            ])
            setTests(testData)
            setSkills(skillData)
        } catch (error) {
            console.error('Failed to load data', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this test?')) return
        try {
            await testService.remove(id)
            setTests(tests.filter(t => t.id !== id))
        } catch (error) {
            console.error('Failed to delete test', error)
        }
    }

    const handleEdit = (test: Test) => {
        setEditingTest(test)
        setFormData({
            title: test.title,
            duration: test.duration,
            skill_id: test.skill_id
        })
        setIsModalOpen(true)
    }

    const handleAdd = () => {
        setEditingTest(null)
        setFormData({
            title: '',
            duration: 30,
            skill_id: skills[0]?.id || 0
        })
        setIsModalOpen(true)
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (editingTest?.id) {
                const updated = await testService.update(editingTest.id, formData)
                setTests(tests.map(t => t.id === editingTest.id ? updated : t))
            } else {
                const created = await testService.create(formData)
                setTests([...tests, created])
            }
            setIsModalOpen(false)
        } catch (error) {
            console.error('Failed to save test', error)
        }
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold tracking-tight">Manage Tests</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Create and edit skill assessment tests</p>
                </div>
                <Button
                    onClick={handleAdd}
                    className="rounded-2xl px-6 py-6 h-auto text-base font-semibold shadow-lg shadow-primary/20"
                >
                    <Icon icon="solar:checklist-bold-duotone" width={24} className="mr-2" />
                    Create New Test
                </Button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 w-full max-w-lg shadow-2xl">
                        <h3 className="text-2xl font-bold mb-6">{editingTest ? 'Edit Test' : 'Create New Test'}</h3>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Test Title</label>
                                <Input
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    placeholder="Enter test title"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Skill</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-primary outline-none"
                                    value={formData.skill_id}
                                    onChange={e => setFormData({ ...formData, skill_id: Number(e.target.value) })}
                                    required
                                >
                                    {skills.map(skill => (
                                        <option key={skill.id} value={skill.id}>{skill.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Duration (minutes)</label>
                                <Input
                                    type="number"
                                    value={formData.duration}
                                    onChange={e => setFormData({ ...formData, duration: Number(e.target.value) })}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-8">
                                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="submit">Save Test</Button>
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
                                <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Test Title</th>
                                <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 text-center">Duration (min)</th>
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
                            ) : tests.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-8 py-20 text-center text-slate-400 font-medium">
                                        No tests found.
                                    </td>
                                </tr>
                            ) : (
                                tests.map((test) => (
                                    <tr key={test.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">
                                                {test.title}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg text-xs font-bold">
                                                {test.duration}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(test)}
                                                    className="p-2 text-slate-400 hover:text-primary hover:bg-lightprimary rounded-xl transition-all"
                                                >
                                                    <Icon icon="solar:pen-bold-duotone" width={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(test.id)}
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
