import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function AdminPage() {
    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="nm-flat-md border border-nm-text/5 rounded-3xl p-8 sm:p-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-nm-text mb-4">Admin</h1>
                    <p className="text-nm-text-muted text-lg mb-10">
                        Internal admin dashboard entry point.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link
                            href="/team"
                            className="nm-flat-sm border border-nm-text/5 rounded-2xl p-6 hover:nm-flat-md transition-all"
                        >
                            <h2 className="text-xl font-bold text-nm-text mb-2">Team Tools</h2>
                            <p className="text-nm-text-muted">Back to internal workspace.</p>
                        </Link>
                        <Link
                            href="/client/dashboard"
                            className="nm-flat-sm border border-nm-text/5 rounded-2xl p-6 hover:nm-flat-md transition-all"
                        >
                            <h2 className="text-xl font-bold text-nm-text mb-2">Client Portal</h2>
                            <p className="text-nm-text-muted">View the client dashboard experience.</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

