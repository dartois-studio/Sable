# Fontes auto-hébergées

Geist et Geist Mono, **variables** (axe `wght` 100–900), sous-ensembles
`latin` et `latin-ext`. Déclarées en `@font-face` au début de `styles.css`
et mises en cache par `sw.js` (liste `SHELL`).

Avant le ticket #11 elles arrivaient d'un `<link>` Google Fonts dans
`index.html`. Le service worker ne cache que le même origine : elles
n'étaient donc jamais mises en cache, et l'app dépendait de deux requêtes
tierces bloquantes au rendu.

## Provenance

Fichiers repris tels quels de `fonts.gstatic.com`, via la feuille servie par
l'API Google Fonts pour `family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500` :

| Fichier local | Source |
|---|---|
| `geist-latin.woff2` | `/s/geist/v5/gyByhwUxId8gMEwcGFU.woff2` |
| `geist-latin-ext.woff2` | `/s/geist/v5/gyByhwUxId8gMEwSGFWfOw.woff2` |
| `geist-mono-latin.woff2` | `/s/geistmono/v6/or3nQ6H-1_WfwkMZI_qYFrcdmg.woff2` |
| `geist-mono-latin-ext.woff2` | `/s/geistmono/v6/or3nQ6H-1_WfwkMZI_qYFrkdmgPn.woff2` |

Google sert **le même fichier pour les quatre graisses** demandées : ce sont
des fontes variables. D'où un seul `.woff2` par famille et par sous-ensemble,
déclaré `font-weight:100 900`, au lieu des quatre blocs de la feuille Google.

Les sous-ensembles `cyrillic`, `cyrillic-ext`, `vietnamese` et `symbols2` ne
sont pas repris : l'app est en français, et un texte hors de ces plages
retombe sur la pile de repli (`Inter`, `system-ui`…) pour les seuls caractères
concernés — l'`unicode-range` fait ce tri caractère par caractère.

## Mise à jour

Rejouer la feuille de l'API avec un User-Agent moderne pour obtenir du woff2,
relever les URL `latin` et `latin-ext`, et **renommer les fichiers** si le
dessin change : `SHELL` est en cache-d'abord, un nom identique servirait
l'ancienne fonte aux visiteurs déjà installés.

## Licence

SIL Open Font License 1.1 — voir `OFL.txt`.
Copyright 2024 The Geist Project Authors (https://github.com/vercel/geist-font)
