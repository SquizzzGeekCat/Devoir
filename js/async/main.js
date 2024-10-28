const nav = document.querySelector("nav");
const header = document.querySelector("header");
const main = document.querySelector("main");

function listUsers(jsonObj) {
  const jsonData = jsonObj;
  const ul = document.createElement("ul");
  nav.appendChild(ul);

  for (let i = 0; i < jsonObj.length; i++) {
    let nom = jsonObj[i].name;
    let user = document.createElement("li");
    user.textContent = nom;
    user.id = `user_${jsonObj[i].id}`;
    ul.appendChild(user);
  }

  // Ajoutez un gestionnaire d'événements à l'élément parent (ul)
  ul.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const clickedId = event.target.id.split("_")[1];
      const userInfo = jsonData.find((user) => user.id == clickedId);
      detailUsers(userInfo);
      // Récupération des posts du user
      showPost(clickedId);
    }
  });
}

//récupération de la liste des users
const p = fetch("https://jsonplaceholder.typicode.com/users").then(function (
  response
) {
  response.json().then(function (contenu) {
    listUsers(contenu);
  });
});

//affichage des détails d'un user
function detailUsers(jsonObj) {
  // Réinitialiser le contenu du header
  header.innerHTML = "";

  //récupéré le nom du user
  const nameUser = document.createElement("h1");
  nameUser.textContent = jsonObj.name;

  //récupéré le surnom du user
  const usernameUser = document.createElement("span");
  usernameUser.textContent = jsonObj.username;

  //stocker le nom et le surnom du user
  const div = document.createElement("div");
  div.classList = "user-data";
  nameUser.appendChild(usernameUser);

  div.appendChild(nameUser);
  header.appendChild(div);

  //récupéré l'email du user
  const emailUser = document.createElement("p");
  emailUser.textContent = jsonObj.email;
  header.appendChild(emailUser);

  //recupere le numéro de téléphone du user
  const userPhone = document.createElement("p");
  userPhone.textContent = jsonObj.phone;
  header.appendChild(userPhone);
}
//récupération de la liste des posts
async function getPost() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const listePosts = await response.json();
  return listePosts;
}

//affichage des post d'un user
function drawPost(list) {
  //réinitialise le contenu du main
  //
  main.innerHTML = "";
  //ne fonction pas audessus
  console.log("liste poste dans drawPost : " + list);
  //boucle pour afficher les posts de l'user
  for (let i = 0; i < list.length; i++) {
    //crée la div du commentaire ou poste
    const div = document.createElement("div");
    div.classList.add("user-comment");
    //crée le titre du commentaire ou poste
    const title = document.createElement("h2");
    title.classList.add("title");
    title.textContent = list[i].title;
    //crée le contenu du commentaire ou poste
    const body = document.createElement("p");
    body.classList.add("body");
    body.textContent = list[i].body;
    //ajoute le titre et le contenu dans la div
    div.appendChild(title);
    div.appendChild(body);
    //ajoute la div du commentaire ou poste dans le main
    main.appendChild(div);
  }
}

async function showPost(id) {
  const listPostUser = await getPost();
  const postsUser = listPostUser.filter((post) => post.userId == id);
  drawPost(postsUser);
}
