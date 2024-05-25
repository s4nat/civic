
export default function Card(){
    return(
        <div>
            <div className="w-1/4 rounded-md bg-gradient-to-r from-slate-800 via-white-100 to-black p-5 ">
                <div>
                    <div className="text-white text-2xl font-bold">Get Started</div>
                    <div className="text-white text-sm">Get started with Elgo today and get a free 14-day trial</div>
                    <div className="text-white text-sm">No credit card required</div>
                    <button className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-white rounded-md p-2 mt-2">Get Started</button>
                </div>
            </div>
        </div>
    );
}