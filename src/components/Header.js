import Link from "next/link"

export default function Header() {
    return(
        <div className="min-h-full">
            <nav className="bg-gray-600">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Link href="/">
                                    <img className="h-8 w-8" src="/images/logo/car-logo.svg" alt="car-rents"/>
                                </Link>
                            </div>
                            <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                
                                <Link href="/orders">
                                    <div className="text-gray-300">
                                        Daftar Pesanan
                                    </div>
                                </Link>
                                <Link href="/cars">
                                    <div className="text-gray-300">
                                        Daftar Mobil
                                    </div>
                                </Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}