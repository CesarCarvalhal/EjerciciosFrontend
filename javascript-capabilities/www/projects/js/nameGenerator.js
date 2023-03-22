console.log("Código inicializado");

function generateRandomName() {
    function choose(choices) {
        const index = Math.trunc(Math.random() * choices.length);
        return choices[index];
    }

    function randomNumber(min, rangeLength) {
        return Math.trunc(min + (Math.random() * rangeLength));
    }

    const randomPart1 = choose(['Mega', 'Turbo', 'Hiper', 'Super', 'Great', 'Big', 'Small', 'Nitro', 'Shadow', 'Random']);
    const randomPart2 = choose(['Dog', 'Cat', 'Lizard', 'Croco', 'Coconut', 'Apple', 'Demon', 'Car', 'Tree', 'Light', 'JavaScript']);
    const randomPart3 = randomNumber(10518, 64);
    
    // ...
    return randomPart1 + randomPart2 + randomPart3;
}
console.log(generateRandomName());

function appendNewNames() {
    const list = document.getElementById('randomNamesList');
    for (let i = 0; i < 30; i++) {
        const name = generateRandomName();
        const li = document.createElement('li');
        li.textContent = name;
        list.appendChild(li);
    }
}

appendNewNames();
  const paragraphLoading = document.getElementById("textLoadingMore");
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
}

const observer = new IntersectionObserver(appendNewNames, options);

observer.observe(paragraphLoading);




  
  
  