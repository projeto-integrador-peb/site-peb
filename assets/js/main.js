// Adiciona interação por clique para mobile
$(function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove a classe active de todos os itens
            faqItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.remove('active');
                }
            });

            // Alterna a classe active no item clicado
            this.classList.toggle('active');
        });
    });

    // Fecha itens ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.faq-item')) {
            faqItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    $('.galeria-slide').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });

});
