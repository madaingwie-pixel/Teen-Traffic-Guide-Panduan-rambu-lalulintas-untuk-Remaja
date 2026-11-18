function searchSigns() {
    let input = document.getElementById('search-input').value.toLowerCase();
    let cards = document.querySelectorAll('.sign-card');

    cards.forEach(card => {
        let name = card.getAttribute('data-name') || '';
        let title = card.querySelector('h3').innerText.toLowerCase();
        let desc = card.querySelector('p').innerText.toLowerCase();

        if (name.includes(input) || title.includes(input) || desc.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

function filterSigns(category, btn) {
    let cards = document.querySelectorAll('.sign-card');
    let buttons = document.querySelectorAll('.btn-filter');

    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    cards.forEach(card => {
        if (category === 'all') {
            card.style.display = "block";
        } else {
            if (card.classList.contains(category)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        }
    });
}
