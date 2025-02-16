import { Button } from "@/components/ui/button";
import WorldMap from "@/components/ui/world-map";

export default function Body() {
  return (
    <section className="relative mt-12 w-full">
      <WorldMap
        dots={[
          {
            start: {
              lat: 64.2008,
              lng: -149.4937,
            }, // Alaska (Fairbanks)
            end: {
              lat: 34.0522,
              lng: -118.2437,
            }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
          {
            // Alberta (Calgary)
            start: { lat: 51.0447, lng: -114.0719 },
            // New York
            end: { lat: 40.7128, lng: -74.006 },
          },
        ]}
      />
      <div className="container absolute top-48 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="animate-fade-in-up font-brand text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl lg:text-6xl/none">
              Connect with Skilled Peers
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Peerfect matches people with skills to those who need help. Learn,
              grow, and succeed together.
            </p>
          </div>
          <div className="animate-fade-in-up-2 space-x-4">
            <Button>Find a Helper</Button>
            <Button variant="outline">Offer Your Skills</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
