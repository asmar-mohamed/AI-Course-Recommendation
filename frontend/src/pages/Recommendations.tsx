import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecs } from '@/store/recSlice'
import type { RootState } from '@/store'
import Loading from '@/components/Loading'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import type { Recommendation } from '@/types'

export default function Recommendations() {
  const dispatch = useDispatch()
  const recState = useSelector((s: RootState) => s.rec)

  useEffect(() => {
    dispatch(fetchRecs() as any)
  }, [dispatch])

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
            <Icon icon="solar:lightbulb-bolt-bold-duotone" className="text-primary" width={40} />
            Smart <span className="text-primary">Recommendations</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Courses curated just for you based on your skill palette.</p>
        </div>
      </div>

      {recState.loading && <Loading />}

      {recState.error && (
        <div className="flex items-center gap-3 p-4 bg-lighterror/20 text-error rounded-2xl border border-error/20">
          <Icon icon="solar:danger-bold-duotone" width={24} />
          <span className="font-bold text-sm">{recState.error}</span>
        </div>
      )}

      <div className="space-y-6">
        {recState.items.length === 0 && !recState.loading && (
          <div className="bg-white dark:bg-slate-900 rounded-[1rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-20 text-center shadow-sm">
            <Icon icon="solar:case-minimalistic-bold-duotone" width={80} className="mx-auto text-slate-200 mb-6" />
            <h3 className="text-xl font-bold mb-2 text-slate-400 font-outfit">No recommendations yet</h3>
            <p className="text-slate-500 max-w-xs mx-auto mb-8 font-medium">Add more skills to your profile to get personalized course suggestions.</p>
            <Button asChild className="rounded-2xl px-8 py-6 h-auto font-black shadow-lg shadow-primary/20">
              <Link to="/profile">Update Profile Skills</Link>
            </Button>
          </div>
        )}

        {recState.items.map((r: Recommendation) => (
          <div key={r.course_id} className="group relative bg-white dark:bg-slate-900 rounded-[1rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col md:flex-row gap-8 items-center cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>

            <div className="w-20 h-20 rounded-[1.5rem] bg-lightprimary flex-shrink-0 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Icon icon="solar:star-fall-bold-duotone" width={40} />
            </div>

            <div className="flex-1 space-y-3 relative">
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                {r.course_name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {r.matched_skills?.map((s) => (
                  <span key={s.id} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded rounded-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3 min-w-[140px] relative">
              <div className="text-center md:text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Match Score</p>
                <div className="text-3xl font-black text-primary">
                  {(r.score * 100).toFixed(0)}%
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant={'outline'} asChild className="rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                  <Link to={`/courses/${r.course_id}`}>
                    Explore <Icon icon="solar:arrow-right-linear" className="ml-2" />
                  </Link>
                </Button>
                {r.course_url && (
                  <a
                    href={r.course_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
                  >
                    <Icon icon="solar:link-bold-duotone" width={14} />
                    Official Page
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
