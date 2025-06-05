// Sélectionner la navbar et l'image
const navbar = document.querySelector('nav');
const image = document.querySelector('.image');
const body = document.body;

// Fonction qui sera appelée lors du défilement de la page
function handleScroll() {
  // Vérifier si la page a été défilée d'une certaine distance (par exemple 50px)
  if (window.scrollY > 50) {
    // Ajouter la classe 'scrolled' pour déplacer la navbar, l'image et le titre
    body.classList.add('scrolled');
    navbar.classList.add('scrolled'); // Déplace la navbar
    image.classList.add('scrolled'); // Déplace l'image
  } else {
    // Retirer la classe 'scrolled' pour réinitialiser la position
    body.classList.remove('scrolled');
    navbar.classList.remove('scrolled');
    image.classList.remove('scrolled');
  }
}

// Ajouter un écouteur d'événement pour détecter le défilement de la page
window.addEventListener('scroll', handleScroll);