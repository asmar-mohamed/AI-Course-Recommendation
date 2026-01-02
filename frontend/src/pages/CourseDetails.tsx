import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseById } from '@/store/courseSlice'
import type { RootState, AppDispatch } from '@/store'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import Loading from '@/components/Loading'

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { currentCourse, loading, error } = useSelector((state: RootState) => state.courses)

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(Number(id)))
    }
  }, [dispatch, id])

  if (loading) return <Loading />
  if (error) return (
    <div className="flex flex-col items-center justify-center p-12 bg-lighterror/20 rounded-[2rem] border border-lighterror">
      <Icon icon="solar:danger-bold-duotone" width={64} className="text-error mb-4" />
      <p className="text-error font-bold">Error loading course</p>
      <p className="text-slate-500 text-sm mt-1">{error}</p>
    </div>
  )
  if (!currentCourse) return (
    <div className="text-center p-12 bg-slate-50 dark:bg-slate-900 rounded-[2rem]">
      <Icon icon="solar:magnifer-outline" width={48} className="mx-auto text-slate-300 mb-4" />
      <p className="text-slate-500 font-bold">Course not found</p>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <Button variant="ghost" asChild className="mb-6 rounded-xl hover:bg-lightprimary text-slate-500 hover:text-primary transition-all">
        <Link to="/courses">
          <Icon icon="solar:arrow-left-linear" className="mr-2" strokeWidth={2} />
          Back to Courses
        </Link>
      </Button>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="relative h-64 bg-lightprimary">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon icon="solar:notebook-bold-duotone" width={120} className="text-primary/20" />
          </div>
        </div>

        <div className="relative pt-12 px-8 md:px-12 pb-12">
          <div className="absolute -top-12 left-8 md:left-12 p-6 bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700">
            <Icon icon="solar:programming-bold-duotone" width={48} className="text-primary" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1 text-xs font-extrabold uppercase tracking-[0.2em] bg-lightprimary text-primary rounded-full">
                  {currentCourse.title || 'Core System'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                {currentCourse.title}
              </h1>
              {currentCourse.course_url && (
                <a
                  href={currentCourse.course_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-primary font-bold hover:underline"
                >
                  <Icon icon="solar:link-bold-duotone" />
                  Visit Official Course Page
                </a>
              )}
            </div>
            <div className="flex-shrink-0">
              <Button className="rounded-2xl px-8 py-7 h-auto text-lg font-bold shadow-lg shadow-primary/30">
                Enroll in Course
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                  <Icon icon="solar:align-left-bold-duotone" className="text-primary" />
                  Course Description
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-medium whitespace-pre-wrap">
                  {currentCourse.description}
                </p>
              </section>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Course Info</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Level</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">Advanced</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Duration</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">12 Hours</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Updated</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">Just Now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
