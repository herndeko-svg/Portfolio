# Portfolio de NDEKO YOSHUA Héritier

Site statique sur une seule page (HTML, CSS, JavaScript), sans framework.

## Arborescence

```
Portfolio/
├── index.html        contenu du site (textes FR, traductions EN dans les attributs data-en)
├── style.css         mise en page, couleurs, mode sombre, responsive
├── script.js         langue, thème, filtres, compteurs, lightbox, liste des certifications
├── img/              photo et captures des réalisations
├── certificats/      un fichier image par certificat ou diplôme
└── attestations/     attestations de service des employeurs
```

## Modifier le contenu

- **Un texte :** dans `index.html`, modifiez le texte français et son attribut `data-en` (version anglaise).
- **Un certificat :** dans `script.js`, ajoutez une ligne à la liste `CERTIFICATIONS`, puis placez le fichier dans `certificats/`. Laissez `file: ""` si le certificat n'a pas encore été scanné : la carte affiche alors « Disponible sur demande ».
- **LinkedIn :** dans `index.html`, remplacez `href="#"` du lien `linkedin-link` par l'adresse de votre profil. Le bouton reste masqué tant que l'adresse n'est pas renseignée.
- **OJCAD :** précisez « temps partiel », « consultant » ou « bénévole » (voir le commentaire `À PRÉCISER` dans `index.html`).
- **Aperçu pour les réseaux sociaux :** une fois le site en ligne, remplacez `https://VOTRE-SITE` dans les balises `og:` de `index.html`.

## Tester sur votre ordinateur

Ouvrez un terminal dans ce dossier, puis lancez :

```bash
python -m http.server 8000
```

Ensuite, ouvrez http://localhost:8000 dans votre navigateur.

## Mettre en ligne gratuitement

### Option 1 : Netlify (le plus simple)
1. Allez sur https://app.netlify.com/drop.
2. Glissez-déposez le dossier `Portfolio` entier.
3. Netlify vous donne une adresse du type `https://xxx.netlify.app`. Vous pouvez la renommer dans *Site settings > Change site name*.

### Option 2 : GitHub Pages
1. Créez un compte sur https://github.com, puis un dépôt public nommé `votre-nom.github.io`.
2. Cliquez sur *Add file > Upload files* et déposez le **contenu** du dossier (index.html à la racine).
3. Cliquez sur *Commit changes*.
4. Allez dans *Settings > Pages* et choisissez *Deploy from a branch*, branche `main`, dossier `/root`.
5. Après une à deux minutes, le site est en ligne à l'adresse `https://votre-nom.github.io`.

## Confidentialité

- Votre adresse domiciliaire et les coordonnées de vos référents ne figurent pas sur le site.
- Les CV ne sont pas publiés sur le site.
- N'ajoutez jamais de pièce d'identité (comme une carte d'électeur) dans `certificats/`.
