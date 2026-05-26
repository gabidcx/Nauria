import { redirect } from 'next/navigation'

// The root URL redirects to the home screen.
// In production, this would first check for auth and redirect to /login if needed.
export default function RootPage() {
  redirect('/app-home')
}
