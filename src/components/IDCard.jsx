import React, { useState } from 'react'
import { Github, Linkedin, Code, Trophy, Braces } from 'lucide-react'
import { SiX } from 'react-icons/si'

const PROFILE_IMG = '/Ammy1.jpeg'
// const PROFILE_IMG = '/Ammy.jpg'

const LINKS = [
  { name: 'Github', url: 'https://github.com/ammycodex', icon: Github },
  { name: 'Linkedin', url: 'https://www.linkedin.com/in/ammycodex/', icon: Linkedin },
  { name: 'Leetode', url: 'https://leetcode.com/u/ammycodes/', icon: Code },
  { name: 'Hackerrank', url: 'https://www.naukri.com/code360/profile/ammycodex', icon: Trophy },
  { name: 'X', url: 'https://x.com/Ammycodex', icon: SiX },
  { name: 'Codeforce', url: 'https://codeforces.com/profile/iammy', icon: Braces },
]

const IDCard = () => {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl bg-[#0c1222] border border-cyan-500/25 shadow-xl shadow-cyan-500/5 mx-auto px-2 sm:px-0">
      <div className="relative w-full aspect-[4/3] rounded-t-2xl overflow-hidden">
        <img 
          src={PROFILE_IMG} 
          alt="Profile" 
          className="object-cover w-full h-full bg-black rounded-t-2xl select-none" 
          style={{ objectPosition: 'center 40%' }} 
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        <span className="absolute top-2 right-2 bg-[#0f172a] text-xs text-cyan-200/90 px-3 py-1 rounded-full border border-cyan-500/20 shadow-md z-20 font-mono">ID: GENAI-2026</span>
      </div>
      <div className="flex flex-col justify-between p-3 sm:p-4 md:p-5 text-white">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide">Amisha Sharma</h2>
          <p className="text-sm sm:text-base text-cyan-200/80 mb-2 font-mono">Generative AI Engineer</p>
          <div className="text-xs text-gray-400 mb-1">Location: Las Vegas, Nevada</div>
          <div className="text-xs text-gray-400 mb-1">Email: connect.amisha.usa@gmail.com</div>
          <div className="text-xs text-gray-400 mb-3">Phone: +1 (702) 403-3543</div>
          <div className="font-mono text-[10px] text-cyan-500/50 border-t border-cyan-500/10 pt-2 mt-1 space-y-0.5">
            <div>LATENCY ~42ms · RTT imaginary</div>
            <div>SYS: OK · GIL: present · CUDA: vibes</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2 relative">
            {LINKS.map(({ name, url, icon: Icon }, idx) => (
              <div key={name} className="relative flex flex-col items-center">
                {hovered === idx && (
                  <div className="mb-2 px-2 py-1 rounded bg-[#333] text-xs text-white absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap z-10 shadow-lg">
                    {name}
                  </div>
                )}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-link={name.toLowerCase()}
                  className="bg-[#0f172a] p-2 rounded-full hover:bg-cyan-950/60 border border-cyan-500/15"
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={e => e.stopPropagation()}
                >
                  <Icon size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IDCard