import {useState} from 'react'
import {Cta} from './ui'
const L=[['#publicos','Participe'],['#por-que','Por que a MOVI'],['#cadastro','Cadastro']]
export default function Header(){const[o,setO]=useState(false)
return(<header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur"><div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
<a href="#topo" aria-label="MOVI – início"><img src="/logo.jpg" alt="MOVI" className="h-10 w-10 rounded-lg" width="40" height="40"/></a>
<nav aria-label="Principal" className="hidden items-center gap-6 text-sm text-white/80 md:flex">{L.map(([h,t])=><a key={h} href={h} className="hover:text-lime">{t}</a>)}<Cta label="QUERO FAZER PARTE" where="header" className="!min-h-10 !px-5"/></nav>
<button className="p-2 md:hidden" aria-label="Abrir menu" aria-expanded={o} onClick={()=>setO(!o)}><span className="block h-0.5 w-6 bg-white"/><span className="my-1.5 block h-0.5 w-6 bg-white"/><span className="block h-0.5 w-6 bg-white"/></button></div>
{o&&<nav aria-label="Menu mobile" className="flex flex-col gap-1 border-t border-white/10 bg-navy px-5 py-3 md:hidden">{L.map(([h,t])=><a key={h} href={h} onClick={()=>setO(false)} className="py-3 text-white/90">{t}</a>)}<a href="#cadastro" onClick={()=>setO(false)} className="py-3 font-bold text-lime">Quero fazer parte</a></nav>}</header>)}
