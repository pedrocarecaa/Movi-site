import {useState,useEffect,useRef} from 'react'
import {track} from '../lib/analytics'
const PERFIS=[['passageiro','PASSAGEIRO'],['motorista','MOTORISTA'],['ambos','QUERO PARTICIPAR DOS DOIS']]
const inp='w-full min-h-12 rounded-xl border border-white/15 bg-navy px-4 text-base text-white placeholder:text-white/40 focus:border-lime'
const empty={nome:'',whatsapp:'',email:'',cidade:'',bairro:'',website:'',veiculo:'',cnh:'',tempo:''}
const origem=()=>{const p=new URLSearchParams(location.search);return{utm_source:p.get('utm_source')||'',utm_medium:p.get('utm_medium')||'',utm_campaign:p.get('utm_campaign')||'',referrer:document.referrer||''}}
export default function LeadForm(){
const[f,setF]=useState(empty),[perfil,setP]=useState(''),[err,setErr]=useState({}),[st,setSt]=useState('idle'),[msg,setMsg]=useState('')
const started=useRef(false),drv=perfil==='motorista'||perfil==='ambos'
const start=()=>{if(!started.current){started.current=true;track('form_start')}}
const pick=p=>{setP(p);setErr(e=>({...e,perfil:''}));track('profile_select',{perfil:p})}
useEffect(()=>{const h=e=>pick(e.detail);window.addEventListener('movi:perfil',h);return()=>window.removeEventListener('movi:perfil',h)},[])
const set=k=>e=>setF({...f,[k]:e.target.value})
function validate(){const e={},d=f.whatsapp.replace(/\D/g,'')
if(f.nome.trim().split(/\s+/).length<2)e.nome='Digite seu nome completo.'
if(d.length<10||d.length>13)e.whatsapp='Digite um WhatsApp válido, com DDD.'
if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))e.email='Digite um e-mail válido.'
if(f.cidade.trim().length<2)e.cidade='Digite sua cidade.'
if(f.bairro.trim().length<2)e.bairro='Digite seu bairro ou região.'
if(!perfil)e.perfil='Escolha como quer participar.'
if(drv){if(!f.veiculo)e.veiculo='Escolha o tipo de veículo.';if(!f.cnh)e.cnh='Informe se possui CNH compatível.';if(!f.tempo.trim())e.tempo='Conte há quanto tempo (ou "pretendo começar").'}
return e}
async function submit(ev){ev.preventDefault();const e=validate();setErr(e)
const k=Object.keys(e)[0];if(k){document.getElementById('err-'+k)?.scrollIntoView({block:'center'});return}
setSt('sending');setMsg('');track('form_submit',{perfil})
try{const r=await fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...f,perfil,origem:origem()})})
if(!r.ok)throw new Error((await r.json().catch(()=>({}))).error||'')
track('signup_complete',{perfil});setSt('done')}catch(x){setSt('idle');setMsg(x.message||'Não foi possível enviar agora. Tente novamente em instantes.')}}
const Err=({k})=>err[k]?<p id={'err-'+k} role="alert" className="mt-1 text-sm text-red-300">{err[k]}</p>:null
const field=(k,l,type='text',ac,im)=><div><label htmlFor={k} className="mb-1 block text-sm font-semibold">{l}</label><input id={k} name={k} type={type} autoComplete={ac} inputMode={im} value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={err[k]?'err-'+k:undefined} className={inp}/><Err k={k}/></div>
if(st==='done')return(<section id="cadastro" className="px-5 py-20"><div className="mx-auto max-w-xl rounded-3xl border border-lime/30 bg-white/[.05] p-8 text-center" role="status"><h2 className="text-3xl font-extrabold">VOCÊ ESTÁ DENTRO! 🚀</h2><p className="mt-2 font-bold text-lime">Cadastro realizado!</p><p className="mt-4 text-white/80">Seu interesse foi registrado. Agora você faz parte da lista de pessoas que querem conhecer a MOVI primeiro.</p><p className="mt-2 text-white/80">Vamos avisar você quando a MOVI estiver disponível na sua região.</p><a href="#topo" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-lime px-7 text-sm font-bold text-navy">VOLTAR PARA O INÍCIO</a></div></section>)
return(<section id="cadastro" className="px-5 py-16 pb-32 md:py-24"><form onSubmit={submit} onFocus={start} noValidate className="mx-auto max-w-xl space-y-5 rounded-3xl border border-white/10 bg-white/[.05] p-6 md:p-8">
<div><h2 className="text-3xl font-extrabold">CADASTRE-SE GRATUITAMENTE</h2><p className="mt-1 text-white/70">Leva menos de 2 minutos.</p></div>
<div className="hidden" aria-hidden="true"><label>Não preencha<input tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')}/></label></div>
<Radio id="perfil" legend="COMO VOCÊ QUER PARTICIPAR DA MOVI?" opts={PERFIS.map(p=>p[1])} value={PERFIS.find(p=>p[0]===perfil)?.[1]} onChange={v=>pick(PERFIS.find(p=>p[1]===v)[0])}/><Err k="perfil"/>
{perfil&&<>{field('nome','Nome completo *','text','name')}{field('whatsapp','WhatsApp *','tel','tel','tel')}{field('email','E-mail *','email','email','email')}{field('cidade','Cidade *','text','address-level2')}{field('bairro','Bairro/região *','text','address-level3')}
{drv&&<><Radio id="veiculo" legend="Tipo de veículo" opts={['Carro','Moto']} value={f.veiculo} onChange={v=>setF({...f,veiculo:v})}/><Err k="veiculo"/>
<Radio id="cnh" legend="Possui CNH compatível?" opts={['Sim','Não']} value={f.cnh} onChange={v=>setF({...f,cnh:v})}/><Err k="cnh"/>
{field('tempo','Há quanto tempo trabalha ou pretende trabalhar com transporte? *')}</>}
{msg&&<p role="alert" className="rounded-xl bg-red-500/15 p-3 text-sm text-red-200">{msg}</p>}
<button disabled={st==='sending'} className="min-h-14 w-full rounded-full bg-lime px-6 font-extrabold text-navy transition hover:brightness-110 active:scale-95 disabled:opacity-60">{st==='sending'?'Enviando...':'QUERO FAZER PARTE DA MOVI'}</button>
<p className="text-xs text-white/55">Ao enviar seus dados, você concorda com o uso das informações para contato relacionado à MOVI. Leia a <a href="/privacy" className="underline hover:text-lime">política de privacidade</a>.</p></>}</form></section>)}
function Radio({id,legend,opts,value,onChange}){return(<fieldset id={'err-'+id}><legend className="mb-2 text-sm font-semibold">{legend} *</legend><div className="flex flex-wrap gap-2">{opts.map(o=><label key={o} className="cursor-pointer"><input type="radio" name={id} className="peer sr-only" checked={value===o} onChange={()=>onChange(o)}/><span className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 text-sm transition peer-checked:border-lime peer-checked:bg-lime peer-checked:font-bold peer-checked:text-navy peer-focus-visible:outline-3 peer-focus-visible:outline-lime">{o}</span></label>)}</div></fieldset>)}
