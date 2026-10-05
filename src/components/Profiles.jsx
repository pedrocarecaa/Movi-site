import {Section,Cta} from './ui'
const List=({items})=><ul className="mt-8 grid gap-3 sm:grid-cols-2">{items.map(i=><li key={i} className="flex gap-3 text-white/85"><span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-lime"/>{i}</li>)}</ul>
export const PassengerSection=()=>(<Section id="passageiros" title="Uma MOVI feita para quem precisa se mover.">
<List items={['Preços transparentes','Facilidade para pedir','Possibilidade de agendar','Experiência simples','Motoristas cadastrados','Atendimento pensado para a realidade local']}/>
<div className="mt-10"><Cta label="QUERO SER PASSAGEIRO" where="passageiros" perfil="passageiro"/></div></Section>)
export const DriverSection=()=>(<Section id="motoristas" title="Uma plataforma que também escuta o motorista." tone="bg-navy2/60">
<p className="mt-4 text-white/70">Queremos construir um modelo mais equilibrado para quem dirige.</p>
<List items={['Mais oportunidades','Maior transparência','Possibilidade de corridas agendadas','Modelo pensado para uma relação mais equilibrada','Participação na construção da plataforma']}/>
<div className="mt-10"><Cta label="QUERO SER MOTORISTA" where="motoristas" perfil="motorista"/></div></Section>)
