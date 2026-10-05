import {Cta} from './ui'
export default function Hero(){return(
<section id="topo" className="relative overflow-hidden px-5 pb-12 pt-24 md:pb-24 md:pt-36"><div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
<div><img src="/logo.jpg" alt="MOVI" width="72" height="72" className="mb-5 h-16 w-16 rounded-xl md:h-[72px] md:w-[72px]"/>
<h1 className="text-4xl font-extrabold leading-[1.05] md:text-6xl">A MOVI ESTÁ <span className="text-lime">CHEGANDO.</span></h1>
<p className="mt-4 max-w-lg text-lg text-white/80">Uma nova forma de conectar passageiros e motoristas está sendo construída.</p>
<p className="mt-2 text-xl font-bold text-lime">Faça parte desde o começo.</p>
<p className="mt-3 max-w-lg text-white/65">Cadastre-se gratuitamente e seja avisado quando a MOVI estiver disponível na sua região.</p>
<Cta label="QUERO FAZER PARTE" where="hero" className="mt-6 w-full sm:w-auto"/>
<p className="mt-3 text-sm text-white/60">Cadastro gratuito • Passageiros e motoristas</p></div>
<svg viewBox="0 0 400 360" role="img" aria-label="Ilustração de uma cidade com rota entre dois pontos" className="hidden w-full md:block"><rect width="400" height="360" rx="28" fill="#12305a"/>
<g fill="#ffffff0d">{[[20,250,40,110],[70,210,34,150],[115,265,46,95],[270,230,38,130],[318,190,36,170],[360,260,30,100]].map(([x,y,w,h])=><rect key={x} x={x} y={y} width={w} height={h}/>)}</g>
<path d="M70 280 C 140 280 120 160 200 160 S 270 80 330 80" fill="none" stroke="#1b5aa6" strokeWidth="10" strokeLinecap="round"/>
<path d="M70 280 C 140 280 120 160 200 160 S 270 80 330 80" fill="none" stroke="#9be521" strokeWidth="4" strokeLinecap="round" strokeDasharray="12 8" style={{animation:'drive 2s linear infinite'}}/>
<circle cx="70" cy="280" r="12" fill="#fff"/><circle cx="330" cy="80" r="12" fill="#9be521"/>
<rect x="30" y="300" width="130" height="36" rx="18" fill="#0b1f3a"/><text x="48" y="323" fill="#fff" fontSize="14" fontWeight="700">Passageiros</text>
<rect x="240" y="30" width="130" height="36" rx="18" fill="#0b1f3a"/><text x="262" y="53" fill="#9be521" fontSize="14" fontWeight="700">Motoristas</text></svg></div></section>)}
