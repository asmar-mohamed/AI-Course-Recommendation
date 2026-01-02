
export default function ErrorMessage({ message }: { message?: string | null }) {
  if (!message) return null
  return <div className="p-3 bg-red-50 text-red-700 rounded">{message}</div>
}
