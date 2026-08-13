# Mémo git / GitHub — à relire quand on doute

Ce mémo est écrit pour être relu par quelqu'un qui ne code pas. Il ne cherche pas
à être complet : il tient le strict nécessaire pour que le travail arrive en ligne
sans surprise.

---

## 1. Les cinq mots, en clair

Imagine un classeur de documents.

| Mot | Ce que c'est |
|---|---|
| **commit** | Enregistrer une étape, avec une phrase qui dit ce qu'on a fait. **Ça reste sur ton disque dur.** |
| **branche** | Un brouillon parallèle. On y bricole sans toucher à la version officielle. |
| **`main`** | La version officielle. Chez toi elle s'appelle `main` ; sur GitHub, `origin/main`. |
| **push** | Envoyer tes enregistrements sur GitHub. |
| **pull request** (PR) | Demander à fusionner un brouillon dans la version officielle. La fusion elle-même s'appelle un **merge**. |

---

## 2. La seule chose à retenir

> **Tant que `git push` n'est pas passé, GitHub ne sait rien.**

Un commit vit sur ton ordinateur. On peut ouvrir des pull requests et cliquer
« Merge » sur le site GitHub toute la journée : ça ne remonte pas ce qui est resté
sur ton disque. C'est le piège le plus courant, et il ne ressemble pas à une erreur
— tout a l'air d'avoir marché, mais le site ne bouge pas.

**Le symptôme :** « j'ai mergé, et rien n'a changé. »
**Le réflexe :** vérifier d'abord si le travail est seulement local.

---

## 3. Le circuit complet

```
1. partir de main à jour       git checkout main && git pull
2. créer une branche           git checkout -b nom-du-chantier
3. travailler + commits        (c'est ce qu'on fait en session)
4. POUSSER la branche          git push -u origin nom-du-chantier   ← l'étape oubliée
5. pull request sur GitHub, puis merge
6. récupérer chez toi          git checkout main && git pull
```

L'étape 4 est la seule qui compte pour que GitHub existe dans l'histoire.

Ce qu'il ne faut **jamais** faire : fusionner `main` dans une vieille branche, puis
renvoyer cette branche dans `main`. C'est un aller-retour à vide — la branche reçoit
le contenu de `main` et le lui rend. Le merge « réussit » en ne modifiant aucun
fichier. (Arrivé le 12 août 2026, PR #2 puis #3.)

---

## 4. Voir l'app

**Une branche n'est jamais visible en ligne.** GitHub Pages sert
`dartois.studio/Sable/` depuis **`main` uniquement**. Une branche ne devient visible
qu'une fois fusionnée dans `main` **et poussée**.

Pour juger une branche, c'est le harnais local — voir le §6 de `CLAUDE.md` :

1. basculer sur la branche
2. double-clic sur `.claude/proto.cmd`
3. `http://localhost:5599/index-desktop.html`

---

## 5. Le doute : quatre commandes qui répondent

À lancer quand quelque chose ne colle pas. Elles ne modifient rien — elles regardent.

```bash
git status -sb
```
Où j'en suis : la branche courante, et l'écart avec GitHub (`ahead` = pas encore
poussé, `behind` = pas encore récupéré).

```bash
git for-each-ref --format="%(refname:short) -> %(upstream:short) %(upstream:track)" refs/heads
```
Mes branches, et lesquelles n'ont **jamais** été poussées (flèche vide à droite).

```bash
git log --oneline --graph --all -20
```
L'histoire dessinée, branches comprises.

```bash
gh pr list --state all --limit 10
```
Les pull requests et leur état.

Et pour savoir si un travail précis est bien arrivé en ligne :

```bash
git merge-base --is-ancestor <commit> origin/main && echo OUI || echo NON
```

---

## 6. Vérifier qu'une mise en ligne a réellement pris

Pousser ne suffit pas à conclure : GitHub Pages reconstruit le site après coup, et
ça peut échouer.

```bash
gh api repos/dartois-studio/Sable/pages/builds/latest --jq '"statut: \(.status) | commit: \(.commit[0:7])"'
```

Il faut `statut: built` **et** le commit qu'on vient de pousser. Un `built` sur un
vieux commit veut dire que la reconstruction n'a pas encore eu lieu.

Preuve finale, la seule qui vaut : télécharger le fichier depuis le site et y
chercher une nouveauté connue.

```bash
curl -s "https://dartois.studio/Sable/desktop-v2.css?cb=$(date +%s)" | grep -c dkr-fbar
```

Un compte supérieur à zéro veut dire que le nouveau code est **servi**, pas
seulement poussé. (Le `?cb=…` évite qu'un cache réponde à la place du serveur.)

---

## 7. Ce qui s'est passé en août 2026, comme cas d'école

- `dartois-studio-patch-1` était une **vieille** branche du 4 août, créée en déposant
  des fichiers par le site GitHub. Elle ne contenait pas le travail desktop — elle
  était antérieure.
- Les PR #2 et #3 ont fait l'aller-retour décrit au §3 : **0 fichier modifié**.
- Le vrai travail — les tickets A→D et `sync.bat` — était resté sur une branche
  locale jamais poussée. GitHub ne l'avait jamais vu.
- Correction le 13 août : fusion dans `main` et push (commit `910eb95`), puis
  vérification du build Pages et du fichier réellement servi. La vieille branche a
  été supprimée après contrôle qu'elle ne portait aucun commit absent de `main`
  (son dernier état, si besoin de la ressusciter : `b89704acf0c8ff7cfd0750b08174703ea5f7389b`).

La leçon n'est pas « j'ai mal cliqué ». Elle est : **un merge peut réussir et ne
rien faire.** Ce qui se vérifie, ce n'est pas le message de succès, c'est le
fichier servi par le site.
