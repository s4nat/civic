import DonationModal from "../components/DonationModal";

export default function Home(){
    return(
        <div>
            <h1>Donation Page</h1>
            <DonationModal drive_id="Humanitarian4" project_id={19}/>
        </div>
    )
}