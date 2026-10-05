// Função serverless (Vercel). Segredos só em variáveis de ambiente do servidor.
const hits=new Map() // rate limit em memória (por instância). Para algo mais robusto: Upstash/Redis.
const PERFIL={passageiro:'Passageiro',motorista:'Motorista',ambos:'Passageiro + Motorista'}
const s=(v,n=300)=>String(v??'').replace(/[\u0000-\u001f\u007f<>]+/g,' ').replace(/\s+/g,' ').trim().slice(0,n)
const RE=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Destino extra opcional (Google Sheets via Apps Script, Zapier, Make, CRM, WhatsApp...). Falha aqui NÃO impede o e-mail.
async function saveLead(lead){
  if(!process.env.LEADS_WEBHOOK_URL)return
  try{await fetch(process.env.LEADS_WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(lead)})}
  catch(e){console.error('webhook falhou',e.message)}
}
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Método não permitido.'})
  const b=typeof req.body==='object'&&req.body?req.body:{}
  if(b.website)return res.status(200).json({ok:true}) // honeypot
  const ip=s((req.headers['x-forwarded-for']||'').split(',')[0],64)||'x',now=Date.now()
  const arr=(hits.get(ip)||[]).filter(t=>now-t<6e5)
  if(arr.length>=5)return res.status(429).json({error:'Muitas tentativas. Tente novamente em alguns minutos.'})
  arr.push(now);hits.set(ip,arr)
  const L={perfil:s(b.perfil,20),nome:s(b.nome,120),whatsapp:s(b.whatsapp,30),email:s(b.email,120).toLowerCase(),cidade:s(b.cidade,80),bairro:s(b.bairro,80),veiculo:s(b.veiculo,10),cnh:s(b.cnh,10),tempo:s(b.tempo,120)}
  const o=b.origem&&typeof b.origem==='object'?b.origem:{},d=L.whatsapp.replace(/\D/g,''),drv=L.perfil!=='passageiro'
  const bad=!PERFIL[L.perfil]||L.nome.split(' ').length<2||d.length<10||d.length>13||!RE.test(L.email)||L.cidade.length<2||L.bairro.length<2||
    (drv&&(!['Carro','Moto'].includes(L.veiculo)||!['Sim','Não'].includes(L.cnh)||!L.tempo))
  if(bad)return res.status(400).json({error:'Confira os dados informados e tente novamente.'})
  const orig={utm_source:s(o.utm_source,60),utm_medium:s(o.utm_medium,60),utm_campaign:s(o.utm_campaign,80),referrer:s(o.referrer,200)}
  const lead={...L,origem:orig,data:new Date().toISOString()}
  const D='--------------------------------\n'
  const text=`NOVO LEAD MOVI\n\n${D}DADOS DO INTERESSADO\n${D}\nNome: ${L.nome}\nWhatsApp: ${L.whatsapp}\nE-mail: ${L.email}\nCidade: ${L.cidade}\nBairro/região: ${L.bairro}\nPerfil: ${PERFIL[L.perfil]}\n`+
   (drv?`\n${D}DADOS DE MOTORISTA\n${D}\nVeículo: ${L.veiculo}\nCNH compatível: ${L.cnh}\nTempo com transporte: ${L.tempo}\n`:'')+
   `\n${D}ORIGEM\n${D}\nLanding Page MOVI\nutm_source: ${orig.utm_source||'-'}\nutm_medium: ${orig.utm_medium||'-'}\nutm_campaign: ${orig.utm_campaign||'-'}\nReferrer: ${orig.referrer||'-'}\nData/hora: ${new Date().toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'})}\n`
  try{
    if(!process.env.RESEND_API_KEY||!process.env.LEAD_TO_EMAIL||!process.env.MAIL_FROM)throw new Error('variáveis de ambiente ausentes')
    const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},
      body:JSON.stringify({from:process.env.MAIL_FROM,to:[process.env.LEAD_TO_EMAIL],reply_to:L.email,subject:`[NOVO LEAD MOVI] ${PERFIL[L.perfil]}`,text})})
    if(!r.ok)throw new Error(`resend ${r.status}: ${await r.text()}`)
    await saveLead(lead)
    return res.status(200).json({ok:true})
  }catch(e){console.error('lead error',e.message);return res.status(500).json({error:'Não foi possível enviar agora. Tente novamente em instantes.'})}
}
