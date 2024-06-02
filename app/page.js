import HBDRems from "@/Components/HBDRems";
import PersonCard from "@/Components/PersonCard";
import SideBar from "@/Components/SideBar";

export default async function Home() {
  return (
    <div>
      <SideBar>
        <HBDRems />
      </SideBar>
    </div>
  );
}
