import Header from './components/Header'
import Hero from './components/Hero'
import WhyMovi from './components/WhyMovi'
import Audience from './components/Audience'
import PreLaunch from './components/PreLaunch'
import LeadForm from './components/LeadForm'
import Footer from './components/Footer'
import {useEffect} from 'react'
import {track} from './lib/analytics'
import {Cta} from './components/ui'
export default function App(){useEffect(()=>{track('page_view',{path:location.pathname})},[]);return(<>
<Header/><main><Hero/><Audience/><WhyMovi/><PreLaunch/><LeadForm/></main><Footer/>
<div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy/95 p-3 backdrop-blur md:hidden"><Cta label="CADASTRE-SE GRATUITAMENTE" where="sticky_mobile" className="w-full"/></div></>)}
