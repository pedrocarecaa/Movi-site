# MOVI — Landing page de pré-lançamento (Vite + React + Tailwind)
Fluxo: Instagram → link da bio → landing → perfil → formulário → `api/lead.js` → e-mail para **movi.oficial2026@gmail.com** (Resend).

## Instalar e rodar
```bash
npm install
npm run dev            # só visual (sem /api)
npx vercel dev         # visual + /api/lead (teste do envio real; exige .env)
npm run build          # build de produção em dist/
```
## Resend (e-mail dos leads)
1. Crie conta em resend.com **usando movi.oficial2026@gmail.com** e gere uma API Key.
2. Sem domínio próprio, use `MAIL_FROM=MOVI <onboarding@resend.dev>`: o Resend só entrega no e-mail da própria conta (por isso o passo 1).
3. Com domínio: verifique-o no Resend e use `MAIL_FROM=MOVI <leads@seudominio.com.br>`.
## Variáveis (Vercel > Settings > Environment Variables; localmente copie `.env.example` para `.env`)
`RESEND_API_KEY`, `LEAD_TO_EMAIL`, `MAIL_FROM`, `VITE_SITE_URL` (URL final, sem barra — gera a prévia do WhatsApp), `VITE_INSTAGRAM_URL`, `VITE_WHATSAPP_NUMBER`, e opcional `LEADS_WEBHOOK_URL`.
Para trocar o destino dos leads, altere `LEAD_TO_EMAIL` e faça redeploy. Após mudar qualquer variável `VITE_`, é preciso novo deploy (build).
## Publicar na Vercel
GitHub → vercel.com > Add New Project > importe o repositório (Vite é detectado) → cadastre as variáveis → Deploy. `/privacy` e `/terms` funcionam via `vercel.json` (cleanUrls).
## Testar o formulário
Com o site no ar, envie um cadastro de passageiro e um de motorista; confira o e-mail (e a pasta spam na 1ª vez). Links com `?utm_source=instagram&utm_campaign=post1` aparecem no e-mail, para saber de onde vieram os leads.
## Leads futuros (Sheets, CRM, WhatsApp)
`saveLead()` em `api/lead.js` envia o lead (JSON) para `LEADS_WEBHOOK_URL`: aponte para um Google Apps Script, Zapier ou Make e conecte a planilha/CRM/automações sem mexer no código. Falha no webhook não impede o e-mail.
## Analytics
Cole GA4/Meta Pixel no `index.html`. Eventos: `page_view`, `cta_click`, `click_quero_ser_passageiro`, `click_quero_ser_motorista`, `form_start`, `profile_select`, `form_submit`, `signup_complete`.
## Antispam
Honeypot, validação e sanitização no servidor, limite de 5 envios/10 min por IP (em memória).
