const url = "data/members.json";
const cardsContainer = document.querySelector("#cards")
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

const toggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("nav ul");

if (toggle && navMenu) {
    toggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });
}

const links = document.querySelectorAll("nav a");
links.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
});

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

const getMembersData = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const displayMembers = (members) => {
    cardsContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `Logo of ${member.name}`;
        image.width = 150;
        image.height = 150;
        image.loading = "lazy";

        const name = document.createElement("h2");
        name.textContent = member.name;

        const address = document.createElement("p");
        address.textContent = `Address: ${member.address}`;
        
        const phone = document.createElement("p");
        phone.textContent = `Phone: ${member.phone}`;

        const website = document.createElement("a");
        website.href = member.website;
        website.target = "_blank";
        website.textContent = member.website;

        const notes = document.createElement("p");
        notes.textContent = `Notes: ${member.notes}`;

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(notes);

        cardsContainer.appendChild(card);
    })
}

gridBtn.addEventListener("click", () => {
    cardsContainer.classList.add("grid-view");
    cardsContainer.classList.remove("list-view");
})

listBtn.addEventListener("click", () => {
    cardsContainer.classList.add("list-view");
    cardsContainer.classList.remove("grid-view");
})

getMembersData();
