"use client";

export default function Footer() {
  return (
    <div>
      <footer className="text-gray-800 w-4/5 mx-auto inter md:pt-24">
        
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="flex-grow flex flex-wrap -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="font-medium text-emerald-800 text-base mb-3">
                Product links
              </h2>
              <nav className="list-none mb-10 flex flex-col space-y-3 text-sm font-normal">
                <li>
                  <a className="text-gray-600 hover:text-lime-500 cursor-pointer" href="/report.pdf" target="_blank">
                    Documentation
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-lime-500 cursor-pointer" href="https://www.github.com/ElgoElectric" target="_blank">
                    GitHub
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-lime-500 cursor-pointer" href="https://youtu.be/oXdVQFblgdk" target="_blank">
                    Video
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-lime-500 cursor-pointer" href="/usermanual.pdf" target="_blank"> 
                    User Manual
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
      </footer>
      <div className="w-4/5 mx-auto py-2 md:mt-12 text-sm">
        <hr className="h-px bg-gray-500 opacity-30 border-0 mb-4" />
        <div className="flex items-center mx-auto text-gray-600 container justify-center md:justify-between py-2">
          <div>
            <span className="font-normal">© 2024 Elgo Electric, Inc.</span>
          </div>
          <a
            className="items-center gap-2 hidden md:flex"
            href="#"
            rel="noopener noreferrer"
          >
            <span className="border-b border-transparent hover:border-[#000000] focus-visible:border-[#000000] transition ease-in-out delay-50 duration-100">
              Learn More
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}