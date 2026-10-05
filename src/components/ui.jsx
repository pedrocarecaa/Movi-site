import {track} from '../lib/analytics'
export function Cta({label,where,perfil,variant='primary',className=''}){
  const v=variant==='primary'?'bg-lime text-navy hover:brightness-110':'border border-white/25 text-white hover:bg-white/10'
  return <a href="#cadastro" onClick={()=>{track('cta_click',{label,where});if(perfil){track('click_quero_ser_'+perfil);window.dispatchEvent(new CustomEvent('movi:perfil',{detail:perfil}))}}}
    className={`inline-flex min-h-12 items-center justify-center rounded-full px-7 text-sm font-bold tracking-wide transition active:scale-95 ${v} ${className}`}>{label}</a>}
export function Section({id,title,children,tone=''}){return(
  <section id={id} className={`px-5 py-16 md:py-24 ${tone}`}><div className="mx-auto max-w-5xl">
  <h2 className="max-w-2xl text-3xl font-extrabold leading-tight md:text-4xl">{title}</h2>{children}</div></section>)}
export const Icon=({d})=><svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d}/></svg>
export const Card=({children})=><div className="rounded-2xl border border-white/10 bg-white/[.04] p-6 transition hover:-translate-y-1 hover:border-lime/40">{children}</div>
