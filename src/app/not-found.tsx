export default function NotFound() {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <div className="text-center text-secondary">
                <h1 className="text-6xl font-bold">404</h1>
                <p className="text-xl mt-2">Oops! Something went wrong.</p>
                <p className="text-md mt-1">The page you’re looking for doesn’t exist.</p>
                <a
                    href="/"
                    className="mt-6 inline-block rounded-lg border border-secondary px-6 py-2 text-secondary transition hover:bg-secondary hover:text-background"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}
