document.addEventListener('DOMContentLoaded', function(e) {

let buttons = document.querySelectorAll('.Button__buy');

function saveStorage() {
    let btnClass = localStorage.getItem('class');
    if (btnClass) {
        document.documentElement.classList.add('success');
    }
    localStorage.getItem('img');
}

saveStorage();

buttons.forEach(button => {
    button.addEventListener('click', function(e){
        this.textContent = '';
        let spinner = document.createElement('div');
        const check = "<img src='static/images/img/svg/check.svg'>";
        spinner.classList.add('spinner');
        button.appendChild(spinner);
        fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response=> {
            if(response.ok) {
                button.classList.add('success');
                this.innerHTML = check + 'В корзине';
                
            }
            if (this.classList.contains('success')) {
                localStorage.setItem('btnClass', true);
                return;
            }
            localStorage.removeItem('btnClass');
            return response.json();
        }).then(data=> {
            console.log(data);
        }).catch(error=> {
            console.log(error);
        })
    },false)
})

});