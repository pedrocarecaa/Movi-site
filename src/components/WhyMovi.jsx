import {Section,Card,Cta} from './ui'
const I=[['Praticidade','Uma experiência simples para quem precisa se movimentar.'],['Transparência','Uma plataforma pensada para tornar a relação entre passageiros e motoristas mais clara.'],['Conexão','Conectando quem precisa se deslocar com quem quer dirigir.'],['Participação','Faça parte da MOVI desde o começo.']]
export default function WhyMovi(){return(<Section id="por-que" title="POR QUE A MOVI?" tone="bg-navy2/60">
<div className="mt-8 grid gap-4 sm:grid-cols-2">{I.map(([t,d])=><Card key={t}><div className="mb-3 h-1 w-10 rounded bg-lime"/><h3 className="text-lg font-bold">{t}</h3><p className="mt-2 text-white/70">{d}</p></Card>)}</div>
<div className="mt-8"><Cta label="ENTRE PARA OS PRIMEIROS USUÁRIOS" where="por_que" className="w-full sm:w-auto"/></div></Section>)}
