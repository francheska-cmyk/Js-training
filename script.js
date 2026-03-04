const participants = [
  { nom: "Sofia", genre: "f" },
  { nom: "Gabriel", genre: "m" },
  { nom: "Leila", genre: "f" },
  { nom: "Adonis", genre: "m" },
  { nom: "Tim", genre: "m" },
];

function renderParticipants() {
  const ul = document.getElementById("liste");
  ul.innerHTML = ""; // on vide la liste

  for (let i = 0; i < participants.length; i++) {
    const p = participants[i];

    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = getAvatarUrl(p.nom, p.genre);
    img.alt = p.nom;

    // fallback si jamais (rare)
    img.onerror = () => {
      img.src = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(p.nom.trim())}`;
    };

    const span = document.createElement("span");
    span.textContent = p.nom;

    li.appendChild(img);
    li.appendChild(span);
    ul.appendChild(li);
  }
}

// 1) Retourne tout ce qu'il y a dans participant en focntion de cmt les infos de participants ont été utilisés
renderParticipants();

// 2) création de mon formulaire
const form = document.getElementById("monFormulaire");

form.addEventListener("submit", ajouterParticipant);

//créé la fonction "ajouterparticipant" prvent defaut sait à ajouter de new participant; sinon formulaire non valide
function ajouterParticipant(event) {
  event.preventDefault();

  const nom = document.getElementById("nom").value.trim();
  const avatarChoice = document.getElementById("avatar").value;
  // avatarChoice = "public/boy" , "public/girl" , "username"

  if (nom === "") return; // récupère tous les noms que je rentre

  // On convertit le choix du select en genre f/m pour DiceBear
  let genre = "m"; // déclaration de genre
  if (avatarChoice === "public/girl") genre = "f";
  if (avatarChoice === "public/boy") genre = "m";

  // Si "Autre" (username), on met un avatar initials du site Dicebear
  // -> on le gère en stockant genre = "x" 
  
  if (avatarChoice === "autre") {
    participants.push({ nom: nom, genre: "x" });
  } else {
    participants.push({ nom: nom, genre: genre });
  }

  // On ré-affiche tout et reset le formmulaire. retire le nom du formulaire
  renderParticipants();

  form.reset();
}

// Avatar special pour "x" (Autre) -> on force dans l'affichage des avatars
function getAvatarUrl(nom, genre) {
  const seed = encodeURIComponent(nom.trim()); //seed : pour insérer nom des partcipants sans des espaces et avatar associé

  if (genre === "x") {
    return `https://api.dicebear.com/9.x/initials/svg?seed=${seed}`;
  }

  if (genre === "f") {
    return `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&facialHairProbability=0`;
  }
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&facialHairProbability=70`;
}
