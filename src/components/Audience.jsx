import {Cta} from './ui'
const C=[['passageiro','PASSAGEIRO','Quero fazer parte da nova geração de mobilidade.',['Praticidade','Transparência','Facilidade','Possibilidade de participar desde o início'],'QUERO SER PASSAGEIRO'],
['motorista','MOTORISTA','Quero fazer parte da MOVI como motorista.',['Autonomia','Oportunidade de renda','Transparência','Participar da construção da plataforma'],'QUERO SER MOTORISTA']]
export default function Audience(){return(<section id="publicos" className="px-5 py-14 md:py-20"><div className="mx-auto max-w-5xl">
<h2 className="text-3xl font-extrabold md:text-4xl">COMO VOCÊ QUER FAZER PARTE DA MOVI?</h2>
<div className="mt-8 grid gap-4 md:grid-cols-2">{C.map(([k,t,d,b,cta])=><div key={k} className="flex flex-col rounded-2xl border border-white/10 bg-white/[.04] p-6 transition hover:border-lime/40">
<h3 className="text-2xl font-extrabold text-lime">{t}</h3><p className="mt-2 text-white/80">{d}</p>
<ul className="mb-6 mt-4 space-y-2">{b.map(i=><li key={i} className="flex gap-3 text-white/85"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lime"/>{i}</li>)}</ul>
<Cta label={cta} where={'publico_'+k} perfil={k} className="mt-auto w-full"/></div>)}</div></div></section>)}
