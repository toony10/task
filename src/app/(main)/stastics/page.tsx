import RegionsChart from "./_components/RegionsChart";
import PublicData from "./_components/PublicData";

export default function page() {
    return (
        <div className="custom-container space-y-8">
            <RegionsChart />
            <PublicData />
        </div>
    )
}
