import { useEffect, useState } from 'react'
import * as skillService from '@/services/skillService'
import type { Skill } from '@/types/types'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AdminSkills() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null)
    const [formData, setFormData] = useState<Partial<Skill>>({
        name: '',
        description: ''
    })

    useEffect(() => {
        loadSkills()
    }, [])

    const loadSkills = async () => {
        try {
            setLoading(true)
            const data = await skillService.getAll()
            setSkills(data)
        } catch (error) {
            console.error('Failed to load skills', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this skill?')) return
        try {
            await skillService.remove(id)
            setSkills(skills.filter(s => s.id !== id))
        } catch (error) {
            console.error('Failed to delete skill', error)
        }
    }

    const handleEdit = (skill: Skill) => {
        setEditingSkill(skill)
        setFormData({
            name: skill.name,
            description: skill.description || ''
        })
        setIsModalOpen(true)
    }

    const handleAdd = () => {
        setEditingSkill(null)
        setFormData({
            name: '',
            description: ''
        })
        setIsModalOpen(true)
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (editingSkill?.id) {
                const updated = await skillService.update(editingSkill.id, formData)
                setSkills(skills.map(s => s.id === editingSkill.id ? updated : s))
            } else {
                const created = await skillService.create(formData)
                setSkills([...skills, created])
            }
            setIsModalOpen(false)
        } catch (error) {
            console.error('Failed to save skill', error)
        }
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold tracking-tight">Manage Skills</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Define and organize educational skills</p>
                </div>
                <Button
                    onClick={handleAdd}
                    className="rounded-2xl px-6 py-6 h-auto text-base font-semibold shadow-lg shadow-primary/20"
                >
                    <Icon icon="solar:medal-star-bold-duotone" width={24} className="mr-2" />
                    Add New Skill
                </Button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 w-full max-w-lg shadow-2xl">
                        <h3 className="text-2xl font-bold mb-6">{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h3>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Skill Name</label>
                                <Input
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    placeholder="Enter skill name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Description</label>
                                <textarea
                                    className="w-full h-32 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-primary outline-none resize-none text-slate-800 dark:text-slate-200"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    placeholder="Enter skill description"
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-8">
                                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="submit">Save Skill</Button>
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
                                <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Skill Name</th>
                                <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={2} className="px-8 py-20 text-center">
                                        <div className="flex justify-center">
                                            <Icon icon="line-md:loading-twotone-loop" width={48} className="text-primary" />
                                        </div>
                                    </td>
                                </tr>
                            ) : skills.length === 0 ? (
                                <tr>
                                    <td colSpan={2} className="px-8 py-20 text-center text-slate-400 font-medium">
                                        No skills found.
                                    </td>
                                </tr>
                            ) : (
                                skills.map((skill) => (
                                    <tr key={skill.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-lightprimary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                    <Icon icon="solar:medal-star-bold-duotone" width={18} />
                                                </div>
                                                {skill.name}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(skill)}
                                                    className="p-2 text-slate-400 hover:text-primary hover:bg-lightprimary rounded-xl transition-all"
                                                >
                                                    <Icon icon="solar:pen-bold-duotone" width={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(skill.id)}
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
