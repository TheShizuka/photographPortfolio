import Navigation from '@/components/Navigation';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Photography Portfolio',
  description: 'Learn about the photographer behind these images from Japan, Singapore and Spain',
};

export default function About() {
  return (
    <main className="min-h-screen bg-[#141414] text-white">
      <Navigation />
      
      <section className="pt-36 md:pt-40 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div className="md:sticky top-40 self-start">
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image 
                src="/images/profile.webp" 
                alt="Photographer"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          <div className="py-4">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-12">
              About Me
            </h1>
            
            <div className="space-y-6 text-white/80 text-lg font-light leading-relaxed">
              <p>
                Based in Spain, I&apos;m a photographer and mid-level full stack developer with a 
                passion for capturing portraits and places during my travels across Asia and Europe.
              </p>
              
              <p>
                My photographic journey began with a Sony PowerShot in 2018 during my first 
                trip to Japan, where I discovered my love for photography. I later upgraded 
                to a Panasonic Lumix G7 to continue exploring Japanese cities.
              </p>
              
              <p>
                In 2020, I invested in a Sony A7III paired with a Sigma 85mm f/1.4 lens, which 
                became my go-to setup for portraits in Singapore and Spain. Most recently, I&apos;ve 
                been shooting with a Sony A7CR, using both a Sigma 100-400mm for street photography 
                and an 80mm f/1.4 for portraits.
              </p>
              
              <p>
                I particularly enjoy photographing subjects from a distance, allowing for more 
                natural expressions and candid moments. This approach has defined my style across 
                various locations, from the busy streets of Tokyo to the coastal scenes of Valencia.
              </p>
              
              <h2 className="text-xl font-medium mt-16 mb-4">Equipment Timeline</h2>
              
              <ul className="space-y-4 list-disc pl-5">
                <li>
                  <span className="font-medium">2018:</span> Sony PowerShot – 
                  First trip to Japan (Tokyo, Kyoto, Osaka, Nara)
                </li>
                <li>
                  <span className="font-medium">2018-2019:</span> Panasonic Lumix G7 with kit lens – 
                  Second trip to Japan
                </li>
                <li>
                  <span className="font-medium">2020-2022:</span> Sony A7III with Sigma 85mm f/1.4 – 
                  Singapore and Valencia (Spain)
                </li>
                <li>
                  <span className="font-medium">2023-2024:</span> Sony A7CR with Sigma 100-400mm and Sony 80mm f/1.4 – 
                  Third trip to Japan
                </li>
              </ul>
              
              <h2 className="text-xl font-medium mt-16 mb-4">Contact</h2>
              
              <p>
                For print enquiries, collaborations, or development projects, please reach out via the 
                contact page or directly at <a href="mailto:ayatgimenez@hotmail.com" className="underline hover:text-white transition-colors">ayatgimenez@hotmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}