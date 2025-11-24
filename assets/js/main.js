// Adiciona interação por clique para mobile
$(function () {

    $('.header-menu-bar .hamburger').click((e) => {
        $(e.currentTarget).toggleClass('ativo');
        $('.header-menu-bar .menu').toggleClass('ativo');
    });

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', function () {
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
    document.addEventListener('click', function (e) {
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
        autoplaySpeed: 10000,
        dots: true,
    });
    // Botão "ir ao topo" dinâmico — insira este arquivo em sua página (import ou <script src>).


    // Configurações
    const SHOW_AFTER = 300; // mostrar botão após (px)
    const ID = 'peb-back-to-top-btn';

    // Cria o botão
    const btn = document.createElement('button');
    btn.id = ID;
    btn.type = 'button';
    btn.title = 'Ir ao topo';
    btn.setAttribute('aria-label', 'Ir ao topo');
    btn.innerHTML = '↑'; // ou use texto "Topo"
    Object.assign(btn.style, {
        position: 'fixed',
        right: '1rem',
        bottom: '1rem',
        width: '44px',
        height: '44px',
        padding: '0',
        border: 'none',
        borderRadius: '50%',
        background: '#111',
        color: '#fff',
        fontSize: '20px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        opacity: '0',
        transform: 'translateY(10px)',
        transition: 'opacity 220ms ease, transform 220ms ease',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    });

    // Estado inicial invisível
    btn.style.pointerEvents = 'none';

    // Adiciona ao DOM
    document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(btn);
    });

    // Mostrar/ocultar conforme scroll
    function updateVisibility() {
        if (window.scrollY > SHOW_AFTER) {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
            btn.style.pointerEvents = 'auto';
        } else {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(10px)';
            btn.style.pointerEvents = 'none';
        }
    }

    // Respeitar preferência de reduzir movimento
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Ação de clique: scroll suave (ou instantâneo se reduz movimento)
    function scrollToTop() {
        if (prefersReduced) {
            window.scrollTo(0, 0);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Eventos
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    // Clique e acessibilidade
    btn.addEventListener('click', scrollToTop);
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });

    // Inicializa visibilidade no carregamento (caso a página já esteja rolada)
    if (document.readyState !== 'loading') {
        updateVisibility();
    } else {
        document.addEventListener('DOMContentLoaded', updateVisibility);
    }

    // Efeitos de hover em cards de serviços
    // Destaque do card: apenas o card em hover fica ativo; os demais ficam esmaecidos.
    // Ao sair do container, todos voltam ao estado ativo.
    $('.servicos-container .servico-card')
        .on('mouseenter' , function () {

            // Por padrão remove todas as classes 'ativo' e adiciona 'opaco'
            $('.servicos-container .servico-card').removeClass('ativo').addClass('opaco');

            // Agora para o elemento com o mouse em cima adiciona a classe ativo
            $(this).addClass('ativo').removeClass('opaco')
        })
        .on('mouseleave', function () {
            // Ao retirar o mouse, deixa todos os cards ativos novamente
            $('.servicos-container .servico-card').addClass('ativo').removeClass('opaco');
        });

});
