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

## Íconos (Tabler, subconjunto)

El sitio no carga la fuente completa de Tabler Icons. `scripts/build-icons.py`
busca las clases `ti-*` usadas en `src/` y genera en `src/styles/icons/` una
fuente recortada y su CSS (las clases `ti-*-filled` salen de la variante rellena).

Después de agregar o quitar un ícono:

```bash
npm run icons
```

Requiere `pip install fonttools brotli`. Los archivos generados se versionan, así
que el build de GitHub Pages no necesita Python.
