import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// Em dev, /privacy e /terms abrem os HTML estáticos (na Vercel, cleanUrls faz isso).
const clean={name:'clean-urls',configureServer(s){s.middlewares.use((q,_,n)=>{if(q.url==='/privacy'||q.url==='/terms')q.url+='.html';n()})}}
export default defineConfig({plugins:[react(),tailwindcss(),clean]})
