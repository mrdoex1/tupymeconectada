"""Genera un subconjunto de Tabler Icons con solo los íconos que usa el sitio.

La fuente completa pesa ~460 KB y su CSS ~240 KB para miles de íconos; el sitio
usa unas pocas decenas. Este script busca las clases `ti-*` en src/, recorta la
fuente y escribe:

  src/styles/icons/tabler-subset.woff2
  src/styles/icons/icons.css

Las clases terminadas en `-filled` (p. ej. `ti-star-filled`) se toman de la
variante rellena de Tabler, que es otra fuente: se genera
src/styles/icons/tabler-filled-subset.woff2 solo si se usa alguna.

Ejecutar después de agregar o quitar un ícono:  npm run icons
Requiere: pip install fonttools brotli
"""

import re
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
TABLER = ROOT / "node_modules/@tabler/icons-webfont/dist"
OUT_DIR = ROOT / "src/styles/icons"
SCAN_EXT = {".astro", ".js", ".ts", ".css"}

# Clases de Tabler que no son íconos (tamaños, rotaciones, etc.)
NOT_ICONS = {"ti-xs", "ti-sm", "ti-lg", "ti-xl", "ti-2x", "ti-3x"}


def used_icons() -> set[str]:
    found = set()
    for path in (ROOT / "src").rglob("*"):
        if path.suffix not in SCAN_EXT or OUT_DIR in path.parents:
            continue
        text = path.read_text(encoding="utf-8")
        found.update(re.findall(r"(?<![\w-])ti-[a-z0-9]+(?:-[a-z0-9]+)*", text))
    return found - NOT_ICONS


def codepoints(css_name: str) -> dict[str, str]:
    css = (TABLER / css_name).read_text(encoding="utf-8")
    return dict(re.findall(r'\.(ti-[a-z0-9-]+):before\s*\{\s*content:\s*"\\([0-9a-f]+)"', css))


def build_font(source: str, unicodes: list[int], out: Path) -> None:
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = []
    options.name_IDs = ["*"]
    options.notdef_outline = True
    # Tabler guarda xMin=0 en cada glifo aunque el contorno empieza más a la
    # derecha; si fontTools recalcula los bordes, desplaza los íconos a la
    # izquierda y quedan descentrados.
    font = TTFont(TABLER / "fonts" / source, recalcBBoxes=False)
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(out)


def font_face(family: str, file: str) -> str:
    return f"""@font-face {{
  font-family: "{family}";
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url("./{file}") format("woff2");
}}"""


def main() -> None:
    icons = used_icons()
    outline_table = codepoints("tabler-icons.css")
    filled_table = codepoints("tabler-icons-filled.css")

    outline = {i: outline_table.get(i) for i in icons if not i.endswith("-filled")}
    # ti-star-filled → glifo "ti-star" de la fuente rellena
    filled = {i: filled_table.get(i.removesuffix("-filled")) for i in icons if i.endswith("-filled")}

    missing = sorted(i for i, cp in {**outline, **filled}.items() if cp is None)
    if missing:
        raise SystemExit(f"Íconos que no existen en Tabler: {', '.join(missing)}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for old in OUT_DIR.glob("*.woff2"):
        old.unlink()

    faces = []
    build_font("tabler-icons.woff2", [int(cp, 16) for cp in outline.values()], OUT_DIR / "tabler-subset.woff2")
    faces.append(font_face("tabler-icons", "tabler-subset.woff2"))
    if filled:
        build_font("tabler-icons-filled.woff2", [int(cp, 16) for cp in filled.values()], OUT_DIR / "tabler-filled-subset.woff2")
        faces.append(font_face("tabler-icons-filled", "tabler-filled-subset.woff2"))

    rules = [f'.{i}:before {{ content: "\\{cp}"; }}' for i, cp in sorted(outline.items())]
    rules += [
        f'.ti.{i} {{ font-family: "tabler-icons-filled" !important; }}\n.{i}:before {{ content: "\\{cp}"; }}'
        for i, cp in sorted(filled.items())
    ]
    css = "/* Generado por scripts/build-icons.py — no editar a mano (npm run icons). */\n"
    css += "\n\n".join(faces)
    css += """

.ti {
  font-family: "tabler-icons" !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

"""
    css += "\n".join(rules) + "\n"
    (OUT_DIR / "icons.css").write_text(css, encoding="utf-8")

    size = sum(f.stat().st_size for f in OUT_DIR.glob("*.woff2")) / 1024
    print(f"{len(outline)} íconos + {len(filled)} rellenos → src/styles/icons ({size:.1f} KB en fuentes)")


if __name__ == "__main__":
    main()
