import {EMAIL,INSTAGRAM,WHATSAPP} from '../config'
const ext={target:'_blank',rel:'noopener noreferrer',className:'hover:text-lime'}
export default function Footer(){return(<footer className="border-t border-white/10 px-5 pb-28 pt-12 md:pb-12"><div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
<div className="flex items-center gap-3"><img src="/logo.jpg" alt="MOVI" width="48" height="48" loading="lazy" className="h-12 w-12 rounded-lg"/><p className="text-sm text-white/75">MOVI — Mobilidade feita para pessoas.</p></div>
<nav aria-label="Rodapé" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">{INSTAGRAM&&<a href={INSTAGRAM} {...ext}>Instagram</a>}{WHATSAPP&&<a href={WHATSAPP} {...ext}>WhatsApp</a>}<a href="/privacy" className="hover:text-lime">Privacidade</a><a href="/terms" className="hover:text-lime">Termos</a><a href={`mailto:${EMAIL}`} className="hover:text-lime">{EMAIL}</a></nav></div>
<p className="mx-auto mt-8 max-w-5xl text-xs text-white/50">© 2026 MOVI. Todos os direitos reservados.</p></footer>)}
