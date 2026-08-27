# Le cadre de travail : prototypage évolutif

_Sorti de `CLAUDE.md` (ATL-005) : ce fichier n'est pas chargé par défaut.
`CLAUDE.md` en garde la règle ; ici sont le vocabulaire et la phrase de cadrage._

## 1. La nature du travail : prototype **évolutif**, pas maquette

Le desktop de Sable se construit **dans l'app réelle**, pas à côté d'elle.

Le mot juste n'est pas « proto live » mais **prototypage évolutif**
(*evolutionary prototyping*) : le prototype n'est pas une étude qu'on jettera, il
est **la première version du produit**. On le fait grossir jusqu'à ce qu'il *soit*
l'app. Son opposé, à refuser ici, est la **maquette jetable** (*throwaway
prototype*, ou *spike*) : un écran qui a l'air juste et qu'on ne peut pas livrer.

Trois autres termes utiles, parce qu'ils disent chacun une exigence différente :

| Terme | Ce qu'il impose |
|---|---|
| **Chemin de production** (*production path*) | Le code écrit dans le proto est le code qui partira en ligne. Pas de réécriture prévue « plus tard ». |
| **Tranche verticale** (*vertical slice*) | Une décision d'UI va jusqu'aux données : l'écran, le rendu, l'état, le stockage. Pas une peau posée sur du vide. |
| **Balle traçante** (*tracer bullet*) | On tire un chemin complet et mince à travers la vraie pile technique, puis on l'épaissit. On ne construit pas un décor qu'il faudra remplacer. |

**La phrase à donner en début de session, si le contexte doit être rappelé :**

> Sable est un prototype évolutif sur le chemin de production : tout ce qu'on
> décide ici doit être implémentable tel quel dans l'app réelle, avec ses
> contraintes. Pas de maquette jetable, pas d'écran qui ne peut pas être livré.

