// Eventos: cta_click, form_start, profile_select, passenger_select, driver_select, form_submit
// Configure GA4/Meta Pixel no index.html; aqui só disparamos se existirem.
export function track(name,params={}){
  try{
    window.dataLayer?.push({event:name,...params})
    window.gtag?.('event',name,params)
    window.fbq?.('trackCustom',name,params)
    if(import.meta.env.DEV)console.debug('[track]',name,params)
  }catch{}
}
