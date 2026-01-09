import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store'
import * as userService from '@/services/userService'
import * as skillService from '@/services/skillService'
import * as userSkillService from '@/services/userSkillService'
import * as testService from '@/services/testService'
import { authMe } from '@/store/authSlice'
import { useNavigate } from 'react-router-dom'
import type { Skill, UserSkill } from '@/types/types'
import Loading from '@/components/Loading'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Profile() {
    const { user } = useSelector((s: RootState) => s.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [userSkills, setUserSkills] = useState<UserSkill[]>([])
    const [allSkills, setAllSkills] = useState<Skill[]>([])
    const [newSkillId, setNewSkillId] = useState<number>(0)
    const [loading, setLoading] = useState(true)
    const [msg, setMsg] = useState('')
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (user) {
            setName(user.name || '')
            setEmail(user.email)

            Promise.all([
                skillService.getAll(),
                userSkillService.getUserSkills(user.id)
            ]).then(([all, us]) => {
                setAllSkills(all)
                setUserSkills(Array.isArray(us) ? us : [])
                if (all.length > 0) setNewSkillId(all[0].id)
            }).finally(() => setLoading(false))
        }
    }, [user])

    const handleUpdateInfo = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return
        try {
            await userService.updateUser(user.id, { name, email })
            dispatch(authMe() as any)
            setMsg('Profile updated successfully.')
        } catch (err) {
            setMsg('Failed to update profile.')
        }
    }

    const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !user) return

        setUploading(true)
        try {
            const formData = new FormData()
            formData.append("file", file)

            const token = localStorage.getItem("token")
            const response = await fetch(`http://localhost:8000/users/${user.id}/profile-picture`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            })

            if (!response.ok) {
                throw new Error("Failed to upload profile picture")
            }

            setMsg("Profile picture updated successfully!")
            dispatch(authMe() as any)
        } catch (error) {
            console.error("Error uploading profile picture:", error)
            setMsg("Failed to upload profile picture")
        } finally {
            setUploading(false)
        }
    }

    const handleAddSkill = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return
        try {
            // Check if there is a test for this skill
            try {
                const test = await testService.getTestBySkill(newSkillId)
                if (test) {
                    setMsg(`Redirecting to ${test.title}...`)
                    setTimeout(() => navigate(`/test/${newSkillId}`), 1500)
                    return
                }
            } catch (testErr) {
                // If 404, no test exists, proceed to add directly
                console.log("No test found for this skill, adding directly.")
            }

            await userSkillService.addUserSkill({
                user_id: user.id,
                skill_id: newSkillId,
                level: 'Beginner', // Default level for manual addition without test
                score: 0.1         // Default low score for manual addition without test
            })
            // refresh skills
            const us = await userSkillService.getUserSkills(user.id)
            setUserSkills(us)
            setMsg('Skill added successfully.')
        } catch (err) {
            setMsg('Failed to add skill.')
        }
    }

    const handleDeleteSkill = async (userSkillId: number) => {
        if (!user) return
        if (!confirm('Are you sure you want to remove this skill? This will also update your course recommendations.')) return
        try {
            await userSkillService.deleteUserSkill(userSkillId)
            const us = await userSkillService.getUserSkills(user.id)
            setUserSkills(us)
            setMsg('Skill removed successfully.')
        } catch (err) {
            setMsg('Failed to remove skill.')
        }
    }

    const handleRetestSkill = (skillId: number) => {
        setMsg(`Redirecting to retest...`)
        setTimeout(() => navigate(`/test/${skillId}`), 1000)
    }

    if (loading || !user) return <Loading />

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12">
            {msg && (
                <div className="flex items-center gap-3 p-4 bg-lightprimary text-primary rounded-lg border border-primary/20 animate-in fade-in slide-in-from-top-4">
                    <Icon icon="solar:check-circle-bold-duotone" width={24} />
                    <span className="font-bold text-sm">{msg}</span>
                    <button onClick={() => setMsg('')} className="ml-auto opacity-50 hover:opacity-100">
                        <Icon icon="solar:close-circle-linear" width={20} />
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile Info */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-slate-900 rounded-[1rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="relative w-24 h-24 group mb-4">
                                <img
                                    src={user?.profile_picture || "https://avatars.githubusercontent.com/u/124599?v=4"}
                                    alt="Profile"
                                    className="w-full h-full rounded-[1rem] bg-lightprimary shadow-inner object-cover"
                                />
                                <button
                                    onClick={() => document.getElementById('profileFileInput')?.click()}
                                    disabled={uploading}
                                    className="absolute inset-0 rounded-[1rem] bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer disabled:opacity-50 hover:bg-black/50"
                                    type="button"
                                    title="Change profile picture"
                                >
                                    {uploading ? (
                                        <Icon icon="line-md:loading-twotone-loop" width={32} className="text-white" />
                                    ) : (
                                        <Icon icon="solar:camera-bold-duotone" width={32} className="text-white" />
                                    )}
                                </button>
                            </div>
                            <input
                                id="profileFileInput"
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                className="hidden"
                            />
                            <h2 className="text-2xl font-black dark:text-slate-100">{name}</h2>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">{user.role || 'Student'}</p>
                        </div>

                        <form onSubmit={handleUpdateInfo} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                <Input
                                    className="rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 h-12 px-4 font-bold focus:ring-primary/20 text-slate-900 dark:text-slate-100"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                <Input
                                    className="rounded-lg border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 h-12 px-4 font-bold cursor-not-allowed text-slate-400"
                                    value={email}
                                    disabled
                                />
                            </div>
                            <Button type="submit" className="w-full rounded-lg h-14 font-black shadow-lg shadow-primary/20">
                                <Icon icon="solar:diskette-bold-duotone" className="mr-2" width={20} />
                                Save Updates
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Right Column: Skills Management */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-slate-900 rounded-[1rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black flex items-center gap-3 dark:text-slate-100">
                                <Icon icon="solar:star-bold-duotone" className="text-warning" width={32} />
                                Mastered Skills
                            </h3>
                            <span className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-500 uppercase tracking-widest">
                                {userSkills.length} Total
                            </span>
                        </div>

                        {userSkills.length === 0 ? (
                            <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-[1rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                                <Icon icon="solar:magic-stick-bold-duotone" width={64} className="mx-auto text-slate-300 mb-4" />
                                <p className="text-slate-400 font-bold">No skills added yet. Start by adding one below!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {userSkills.map(us => (
                                    <div key={us.id} className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[1rem] flex items-center justify-between group hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-lightprimary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                <Icon icon="solar:medal-star-bold-duotone" width={24} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800 dark:text-slate-100 text-lg">{us.skill?.name}</div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{us.level}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                    <span className="text-xs font-black text-primary">{Math.round(us.score * 100)}%</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleRetestSkill(us.skill_id)}
                                                className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-success/10 hover:text-success transition-all"
                                                title="Retest"
                                            >
                                                <Icon icon="solar:refresh-bold-duotone" width={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSkill(us.id)}
                                                className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-danger/10 hover:text-danger transition-all"
                                                title="Delete Skill"
                                            >
                                                <Icon icon="solar:trash-bin-trash-bold-duotone" width={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-12 pt-12 border-t border-slate-100 dark:border-slate-800">
                            <h4 className="text-xl font-black mb-6 flex items-center gap-3 dark:text-slate-100">
                                <Icon icon="solar:add-circle-bold-duotone" className="text-success" width={28} />
                                Add New Expertise
                            </h4>
                            <form onSubmit={handleAddSkill} className="flex gap-4 items-end flex-wrap md:flex-nowrap">
                                <div className="flex-1 min-w-[200px] space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Select Skill</label>
                                    <select
                                        className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 h-12 px-4 font-bold outline-none focus:ring-2 ring-primary/20 appearance-none text-slate-900 dark:text-slate-100"
                                        value={newSkillId}
                                        onChange={e => setNewSkillId(Number(e.target.value))}
                                    >
                                        {allSkills.map(s => <option key={s.id} value={s.id} className="dark:bg-slate-900 dark:text-slate-100">{s.name}</option>)}
                                    </select>
                                </div>
                                <Button type="submit" className="h-12 px-12 rounded-lg font-black bg-success hover:bg-success/90">
                                    <Icon icon="solar:add-circle-bold-duotone" className="mr-2" width={20} />
                                    Add Skill
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
