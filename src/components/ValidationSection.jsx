import {Section,Cta} from './ui'
export default function ValidationSection(){return(<Section id="construida" title="Antes de lançar, queremos ouvir você.">
<p className="mt-4 max-w-2xl text-white/70">A MOVI está sendo construída agora. Queremos entender o que passageiros e motoristas realmente precisam antes de colocar a plataforma na rua.</p>
<p className="mt-8 font-semibold">Suas respostas ajudam a definir:</p>
<div className="mt-4 flex flex-wrap gap-2">{['Preços','Funcionalidades','Corridas agendadas','Experiência do passageiro','Necessidades dos motoristas','Modelo da plataforma'].map(t=><span key={t} className="rounded-full border border-lime/40 px-4 py-2 text-sm text-lime">{t}</span>)}</div>
<div className="mt-10"><Cta label="AJUDE A CONSTRUIR A MOVI" where="validacao"/></div></Section>)}
