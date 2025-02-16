import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"

export default function PhotographyPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-12">Photography</h1>

      {/* Featured Class */}
      <div className="mb-16 border rounded-lg overflow-hidden">
        <div className="relative">
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
            Staff Pick
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                iPhone Photography: Capture Delicious Food Photos with Natural Lighting
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <Image src="/placeholder.svg" alt="Instructor" width={48} height={48} className="rounded-full" />
                <div>
                  <h3 className="font-medium">Rose Nene</h3>
                  <p className="text-sm text-muted-foreground">Photographer and Videographer</p>
                  <p className="text-sm text-muted-foreground">165 students</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="text-sm">1h 2m</span>
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Classes Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Photography Classes</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Add featured class cards here */}
          <div className="border rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg"
              alt="Photography class"
              width={400}
              height={300}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium mb-2">Mindful Photography: Capture the Moment</h3>
              <p className="text-sm text-muted-foreground">Learn to be present and capture meaningful moments</p>
            </div>
          </div>
          {/* Add more featured class cards as needed */}
        </div>
      </section>
    </div>
  )
}

