# tupymeconectada

## TODO pendiente: redirección de /catalogo.html

El hosting es GitHub Pages, que no permite redirecciones 301 nativas por archivo
(`netlify.toml`, `vercel.json` o `_redirects` no aplican). Por eso se mantiene
`public/catalogo.html` y **no** se elimina hasta configurar la redirección 301
de `/catalogo.html` hacia `/#servicios` en el hosting/CDN.

Además, `catalogo.html` contiene contenido ("Condiciones generales", desglose de
condiciones por plan) que no está cubierto en el index. Queda pendiente de
revisión: decidir si se integra en el index o se descarta con la redirección.

Mientras tanto, el sitio no enlaza a `catalogo.html` desde ninguna parte.