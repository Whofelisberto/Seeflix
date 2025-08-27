import CardContent from "@/Components/CardContent"
import CardContentSeries from "@/Components/CardContentSeries";
import CardContentAnimes from "@/Components/CardContentAnimes";
import Generos from "@/Components/Generos";     

export default function pageHome() {
  return (
    <div className="min-h-screen">
        <Generos/>
        <CardContent/>
        <CardContentSeries/>
        <CardContentAnimes/>
    </div>
  )
}
