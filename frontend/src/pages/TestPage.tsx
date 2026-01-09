import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import * as testService from '@/services/testService'
import type { TestWithQuestions, TestResult } from '@/services/testService'
import Loading from '@/components/Loading'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function TestPage() {
    const { skillId } = useParams()
    const { user } = useSelector((s: RootState) => s.auth)
    const navigate = useNavigate()

    const [test, setTest] = useState<TestWithQuestions | null>(null)
    const [answers, setAnswers] = useState<Record<number, number>>({})
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [result, setResult] = useState<TestResult | null>(null)
    const [timeLeft, setTimeLeft] = useState(0)

    useEffect(() => {
        if (skillId && user) {
            testService.getTestBySkill(Number(skillId))
                .then(t => testService.getTestQuestions(t.id))
                .then(twithq => {
                    setTest(twithq)
                    setTimeLeft(twithq.duration * 60)
                })
                .catch(err => {
                    console.error("Failed to load test:", err)
                    navigate('/profile')
                })
                .finally(() => setLoading(false))
        }
    }, [skillId, user, navigate])

    useEffect(() => {
        if (timeLeft > 0 && !result && !loading) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        } else if (timeLeft === 0 && test && !result && !loading) {
            handleSubmit()
        }
    }, [timeLeft, result, loading, test])

    const handleSelect = (questionId: number, choiceId: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: choiceId }))
    }

    const handleSubmit = async () => {
        if (!test || !user || submitting) return
        setSubmitting(true)

        const formattedAnswers = Object.entries(answers).map(([qId, cId]) => ({
            question_id: Number(qId),
            choice_id: cId
        }))

        try {
            const res = await testService.submitTest(test.id, {
                user_id: user.id,
                answers: formattedAnswers
            })
            setResult(res)
        } catch (err) {
            console.error("Submission failed:", err)
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return <Loading />
    if (!test) return null

    if (result) {
        return (
            <div className="max-w-3xl mx-auto py-12 px-4 text-center">
                <Card className="rounded-lg p-12 shadow-2xl border-none bg-white dark:bg-slate-900 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

                    <div className={`w-24 h-24 rounded-[1rem] mx-auto flex items-center justify-center mb-8 shadow-lg ${result.passed ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                        <Icon icon={result.passed ? "solar:verified-check-bold-duotone" : "solar:danger-bold-duotone"} width={64} />
                    </div>

                    <h2 className="text-4xl font-black mb-4">
                        {result.passed ? "Test Passed!" : "Test Failed"}
                    </h2>

                    <p className="text-slate-500 font-medium mb-8 text-lg">
                        {result.passed
                            ? "Congratulations! Your expertise has been verified and the skill has been added to your profile."
                            : "Don't worry! Keep learning and try again when you feel ready."}
                    </p>

                    <div className="flex justify-center gap-12 mb-12">
                        <div>
                            <div className="text-4xl font-black text-primary">{(result.score * 100).toFixed(0)}%</div>
                            <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mt-1">Accuracy</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-slate-800 dark:text-slate-100">{result.total_points}</div>
                            <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mt-1">Points</div>
                        </div>
                    </div>

                    <Button onClick={() => navigate('/recommendations')} size="lg" className="rounded-lg px-12 py-7 h-auto font-black shadow-xl shadow-primary/20 bg-success hover:bg-success/90">
                        <Icon icon="solar:globus-bold-duotone" className="mr-2" width={24} />
                        View Recommendations
                    </Button>
                    <div className="mt-6">
                        <button onClick={() => navigate('/profile')} className="text-slate-400 font-bold hover:text-primary transition-colors text-sm">
                            Back to Profile
                        </button>
                    </div>
                </Card>
            </div>
        )
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-8 pb-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 text-primary mb-2">
                        <Icon icon="solar:clipboard-check-bold-duotone" width={32} />
                        <span className="font-black uppercase tracking-widest text-sm">Skill Verification</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight">{test.title}</h1>
                </div>

                <div className="bg-white dark:bg-slate-900 px-6 py-4 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                    <Icon icon="solar:clock-circle-bold-duotone" className={timeLeft < 60 ? 'text-error animate-pulse' : 'text-primary'} width={24} />
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Time Remaining</div>
                        <div className={`text-2xl font-black tabular-nums ${timeLeft < 60 ? 'text-error' : 'text-slate-800 dark:text-slate-100'}`}>
                            {formatTime(timeLeft)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {test.questions.map((q, idx) => (
                    <Card key={q.id} className="rounded-[1rem] border-slate-200 dark:border-slate-800 shadow-sm p-8 hover:shadow-md transition-shadow">
                        <div className="flex gap-6">
                            <div className="w-12 h-12 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-400 font-black">
                                {idx + 1}
                            </div>
                            <div className="flex-1 space-y-6">
                                <h3 className="text-xl font-bold leading-tight pt-2">{q.text}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {q.choices.map(c => (
                                        <button
                                            key={c.id}
                                            onClick={() => handleSelect(q.id, c.id)}
                                            className={`p-5 rounded-lg border-2 text-left transition-all font-bold flex items-center justify-between group
                                                ${answers[q.id] === c.id
                                                    ? 'border-primary bg-lightprimary/20 text-primary'
                                                    : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                                                }`}
                                        >
                                            <span className="flex-1">{c.text}</span>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                                                ${answers[q.id] === c.id
                                                    ? 'border-primary bg-primary text-white'
                                                    : 'border-slate-200 dark:border-slate-700 group-hover:border-slate-300'
                                                }`}
                                            >
                                                {answers[q.id] === c.id && <Icon icon="solar:check-read-linear" width={14} strokeWidth={3} />}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-50">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div className="text-slate-500 font-bold">
                        {Object.keys(answers).length} of {test.questions.length} answered
                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={submitting || Object.keys(answers).length < test.questions.length}
                        className="rounded-lg px-12 py-6 h-auto font-black shadow-xl shadow-primary/20"
                    >
                        {submitting ? "Submitting..." : "Submit Test"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
