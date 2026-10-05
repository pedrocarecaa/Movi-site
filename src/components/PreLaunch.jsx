import {Section,Cta} from './ui'
export default function PreLaunch(){return(<Section id="pre-lancamento" title="FAÇA PARTE DESDE O COMEÇO.">
<p className="mt-4 max-w-2xl text-lg text-white/75">A MOVI está sendo construída. Queremos reunir os primeiros passageiros e motoristas que acreditam em uma nova forma de mobilidade.</p>
<ul className="mt-6 flex flex-wrap gap-2">{['Seja um dos primeiros a conhecer a MOVI.','Faça parte da construção da MOVI.','Entre para a lista de interessados.'].map(t=><li key={t} className="rounded-full border border-lime/40 px-4 py-2 text-sm text-lime">{t}</li>)}</ul>
<div className="mt-8"><Cta label="QUERO FAZER PARTE" where="pre_lancamento" className="w-full sm:w-auto"/><p className="mt-3 text-sm text-white/60">Cadastro gratuito.</p></div></Section>)}
