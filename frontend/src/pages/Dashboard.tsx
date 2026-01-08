import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import type { RootState } from '@/store'
import * as enrollmentService from '@/services/enrollmentService'
import * as userSkillService from '@/services/userSkillService'
import type { Enrollment, UserSkill } from '@/types'
import Loading from '@/components/Loading'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useSelector((s: RootState) => s.auth)
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [skills, setSkills] = useState<UserSkill[]>([])
  const [loading, setLoading] = useState(true)

  const fetchDashboardData = () => {
    if (user?.id) {
      setLoading(true)
      Promise.all([
        enrollmentService.getUserEnrollments(user.id),
        userSkillService.getUserSkills(user.id)
      ]).then(([enr, sk]) => {
        setEnrollments(enr)
        setSkills(sk)
      }).finally(() => setLoading(false))
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [user])

  const handleDeleteEnrollment = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    if (!confirm('Are you sure you want to unenroll from this course?')) return

    try {
      await enrollmentService.deleteEnrollment(id)
      setEnrollments(prev => prev.filter(enr => enr.id !== id))
    } catch (err) {
      console.error('Failed to delete enrollment', err)
      alert('Failed to unenroll.')
    }
  }

  if (loading) return <Loading />

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-8">
      {/* Profile Section */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1rem] p-8 shadow-sm">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-lightprimary flex items-center justify-center text-primary">
              <img
                src="https://avatars.githubusercontent.com/u/124599?v=4"
                alt="Profile"
                className="rounded-2xl "
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{user?.name}</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">{user?.email}</p>
              <span className="mt-3 bg-lightprimary text-primary px-4 py-1 text-sm font-semibold rounded-full inline-block">
                {user?.role || 'Student'}
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <Button asChild className="rounded-2xl px-6 py-6 h-auto text-base font-semibold shadow-lg shadow-primary/20">
              <Link to="/recommendations">
                <Icon icon="solar:lightbulb-bolt-bold-duotone" width={24} className="mr-2" />
                Get Recommendations
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enrollments - spans 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Icon icon="solar:library-bold-duotone" className="text-primary" />
              My Enrollments
            </h3>
            <Button variant="ghost" asChild className="text-primary hover:text-primary hover:bg-lightprimary rounded-xl">
              <Link to="/courses" className="text-sm font-semibold">
                Browse all <Icon icon="solar:arrow-right-linear" className="ml-1" />
              </Link>
            </Button>
          </div>

          {enrollments.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[1rem] p-12 text-center">
              <Icon icon="solar:folder-error-bold-duotone" width={64} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium font-outfit">You haven't enrolled in any courses yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enrollments.map((enr: Enrollment) => (
                <div
                  key={enr.id}
                  onClick={() => navigate(`/courses/${enr.course_id}`)}
                  className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl hover:border-primary/50 transition-all hover:shadow-md cursor-pointer"
                >
                  <button
                    onClick={(e) => handleDeleteEnrollment(e, enr.id)}
                    className="absolute top-4 right-4 p-2 text-slate-300 hover:text-error hover:bg-lighterror/20 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    title="Unenroll"
                  >
                    <Icon icon="solar:trash-bin-trash-bold-duotone" width={20} />
                  </button>
                  <div className="flex flex-col h-full justify-between gap-4">
                    <div className="pr-8">
                      <div className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                        {enr.course?.title || `Course #${enr.course_id}`}
                      </div>
                      <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {enr.course?.description || 'No description available'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className={`rounded-xl px-3 py-1 text-xs font-bold uppercase tracking-wider ${enr.status === 'completed' ? 'bg-green-500/10 text-green-600' : 'bg-primary/10 text-primary'}`}>
                        {enr.status}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {new Date(enr.enrolled_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills - 1 col */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Icon icon="solar:star-bold-duotone" className="text-warning" />
            Skills Palette
          </h3>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1rem] p-6 shadow-sm">
            {skills.length === 0 ? (
              <div className="text-center py-8">
                <Icon icon="solar:test-tube-bold-duotone" width={48} className="mx-auto text-slate-200 mb-3" />
                <p className="text-slate-400 text-sm font-medium">No skills yet. Take a test!</p>
              </div>
            ) : (
              <div className="space-y-5">
                {skills.map((us: UserSkill) => (
                  <div key={us.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-700 dark:text-slate-200">{us.skill?.name || `Skill #${us.skill_id}`}</div>
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{us.level}</div>
                      </div>
                      <div className="font-bold text-primary">{Math.round(us.score * 100)}%</div>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${us.score * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
