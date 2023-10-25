import Head from 'next/head';
import Link from 'next/link';
import '../globals.css'

export default function AuthLayout({ children }) {
    return (
        <>

        
            <Head>
                <title>My Productivity App - Auth</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <nav className="flex justify-between items-center p-4 bg-gray-900">
            <Link href="/" className="flex items-center gap-4">
                <p className='text-xl text-white font-bold max-xs:hidden'>My Productivity App</p>
            </Link>

                <ul className="flex list-none">
                    <li className="mr-4">
                        <Link href="/login" className="text-white font-bold">Login</Link>
                    </li>
                    <li className="mr-4">
                        <Link href="/signup" className="text-white font-bold">Register</Link>
                    </li>
                </ul>
            </nav>
            <main className="flex flex-row">
                <section className="main-container">
                    <div className='w-full max-w-4xl'>
                        {children}
                    </div>
                </section>
            </main>
        </>
    );
};

