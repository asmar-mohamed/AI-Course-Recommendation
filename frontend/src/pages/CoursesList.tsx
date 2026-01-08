import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourses } from '@/store/courseSlice'
import type { RootState, AppDispatch } from '@/store'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Loading from '@/components/Loading'
import type { Course } from '@/types'

export default function CoursesList() {
  const dispatch = useDispatch<AppDispatch>()
  const { list, loading, error } = useSelector((state: RootState) => state.courses)

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch])

  if (loading) return <Loading />
  if (error) return (
    <div className="flex flex-col items-center justify-center p-12 bg-lighterror/20 rounded-[1rem] border border-lighterror">
      <Icon icon="solar:danger-bold-duotone" width={64} className="text-error mb-4" />
      <p className="text-error font-bold">Error loading courses</p>
      <p className="text-slate-500 text-sm mt-1">{typeof error === 'string' ? error : JSON.stringify(error)}</p>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Explore <span className="text-primary">Courses</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Discover your next learning path and level up your skills.</p>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-[1rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-16 text-center shadow-sm">
          <Icon icon="solar:folder-open-bold-duotone" width={80} className="mx-auto text-slate-200 mb-6" />
          <h3 className="text-xl font-bold mb-2">No courses available</h3>
          <p className="text-slate-500 max-w-xs mx-auto">We're currently curating new content. Please check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {list.map((course: Course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="group bg-white dark:bg-slate-900 rounded-[1rem] border border-slate-200 dark:border-slate-800 p-2 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="relative h-48 bg-lightprimary rounded-[1rem] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon icon="solar:notebook-bold-duotone" width={80} className="text-primary/30 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase tracking-widest text-primary shadow-sm">
                    {course.name || 'Core System'}
                  </span>
                  {course.course_url && (
                    <a
                      href={course.course_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-6 h-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-colors"
                      title="Visit Official Course Page"
                    >
                      <Icon icon="solar:link-bold-duotone" width={14} />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-primary transition-colors leading-tight">
                  {course.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-6 font-medium">
                  {course.description}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <Icon icon="solar:clock-circle-bold-duotone" width={16} />
                      <span className="text-[11px] font-bold">12h Content</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-lightprimary rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon icon="solar:arrow-right-up-linear" width={20} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
