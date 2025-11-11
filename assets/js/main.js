document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        // Adiciona um evento de clique a cada caixa
        item.addEventListener('click', function() {
            // Alterna a classe 'toggled' para mostrar ou esconder a resposta
            this.classList.toggle('toggled');

            // Percorre todos os itens
            faqItems.forEach(otherItem => {
                // Se for outro item E estiver ativo, desativa (fecha)
                if (otherItem !== this && otherItem.classList.contains('toggled')) {
                    otherItem.classList.remove('toggled');
                }
            });
        });
    });
});