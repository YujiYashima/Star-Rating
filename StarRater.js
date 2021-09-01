//Criando um objeto que extende o HTMLElement
class StarRater extends HTMLElement {
    
    //Iniciando um construtor
    constructor(){
        super();

        //Rodar a build (metodo que roda os outros metodos)
        this.build();
    }

    //Metodo que roda todos os outros
    build(){
        const shadow = this.attachShadow({ mode: "open" });

        //Adicionar um elemento como um filho (Dentro de outro elemento)
        shadow.appendChild(this.style());

        const rater = this.createRater();
        this.stars = this.createStars();

        //Como stars é um array e não um Elemento/Node, retornará erro. 
        //A solução é adicionar como filho do rater, cada elemnto estrela dentro do array de estrelas
        this.stars.forEach( star => rater.appendChild(star));

        this.resetRating();

        shadow.appendChild(rater);
    }

    //Metodo que cria o Rater
    createRater() {
        //Criando um elemento
        const rater = document.createElement("div");

        //Adicionando uma classe no elemento
        rater.classList.add('star-rater');

        //Adicionando um evento de mouseout no elemento
        rater.addEventListener('mouseout', this.resetRating.bind(this));

        //Retornando o elemento pra ser adicionado pela build()
        return rater;
    }

    //Metodo que cria as estrelas
    createStars() {

        //Função que cria uma estrela
        const createStar = (_, index) => {

            const star = document.createElement('span');
            star.classList.add('star');
            
            //Adicionar um atributo e definir um valor
            star.setAttribute('data-value', Number(index) + 1);

            //Escrever um valor no elemento
            star.innerHTML = '&#9733;';

            //Adicionar o evento de click e mouseover
            star.addEventListener('click', this.setRating.bind(this));
            star.addEventListener('mouseover', this.ratingHover.bind(this));

            return star;
        }

        //Retornar um Array que executa a função createStar um determinado número de vezes
        return Array.from({ length: Number(this.getAttribute('stars')) || 5}, createStar);
    }

    //Metodo que reseta os valores das estrelas
    resetRating(){
        
        //Se em data-rating não for passado nada, será retornado 0 para a variavel
        this.currentRatingValue = this.getAttribute('data-rating') || 0;
        this.hightLightRating();
    }

    //Metodo relacionado com o click nas estrelas
    setRating(e){

        this.setAttribute(
            'data-rating', 
            e.currentTarget.getAttribute('data-value'));
    }

    //Metodo relacionando com o mouseover nas estrelas
    ratingHover(e){
        
        this.currentRatingValue = e.currentTarget.getAttribute('data-value');
        this.hightLightRating();
    }

    //Metodo que dá cor a estrela com o mouseover
    hightLightRating(){

        this.stars.forEach(star => {
            star.style.color = 
                this.currentRatingValue >= Number(star.getAttribute('data-value'))
                ? 'yellow' 
                : 'gray';
        })
    }

    //Metodo que estiliza os elementos
    style(){

        const style = document.createElement('style');
        style.textContent = `

            .star{
                font-size: 5rem;
                color: gray;
                cursor: pointer; 
            }
        `;

        return style;
    }

}

//Testando Comentário

//Customizando o nosso elemento com um nome "SEMPRE COMPOSTO COM UM HÍFEN"
customElements.define('star-rater', StarRater);