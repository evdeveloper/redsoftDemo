document.addEventListener('DOMContentLoaded', function() {

    const buttons = document.querySelectorAll('.Button__buy');
    const btnsStateFromLS = localStorage.getItem("btnsState");
    const btnsState = btnsStateFromLS ? JSON.parse(btnsStateFromLS) : {};

    const setStateForButtons = () => {
        for (let prop in btnsState) {
            document.getElementById(prop).dataset.active = btnsState[prop];
            document.getElementById(prop).textContent = btnsState[prop] ? "В корзине" : "Купить";
        }
    }

    setStateForButtons();

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const id = e.target.id;
            
            if (typeof btnsState[id] === "boolean") {
                btnsState[id] = !btnsState[id];
            } else {
                btnsState[id] = true;
            }
            
            this.textContent = '';
            let spinner = document.createElement('div');
            spinner.classList.add('spinner');
            button.appendChild(spinner);
            fetch('https://jsonplaceholder.typicode.com/posts/1')
                .then(response => {
                    if (response.ok) {
                        setStateForButtons();
                        localStorage.setItem("btnsState", JSON.stringify(btnsState));
                    }

                    return response.json();
                }).then(data => {
                    console.log(data);
                }).catch(error => {
                    console.log(error);
                })
        }, false)
    })

});