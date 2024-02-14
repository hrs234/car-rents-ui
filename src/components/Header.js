import Link from "next/link"

export default function Header({ isHome=true }) {
    return(
        <div className="min-h-full">
            <nav className="bg-gray-600">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img className="h-8 w-8" src="/images/logo/car-logo.svg" alt="car-rents"/>
                            </div>
                            <div className="hidden md:block">
                                { isHome ? 
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        <div className="text-gray-300">
                                            <Link href="/">
                                                Rental Mobil
                                            </Link>
                                        </div>
                                    </div> 
                                    : 
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Daftar Mobil</a>
                                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Daftar Pemesanan</a>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}