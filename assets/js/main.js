// Adiciona interação por clique para mobile
$(function () {

    // Evento de clique para rolar a página até a seção do menu clicado

    $('#main-nav a').on('click', function (e) {
        e.preventDefault();

        const alvo = $(this).attr('href');
        const headerAltura = $('header .header-menu-bar').outerHeight(); // altura real do header
        const offsetTop = $(alvo).offset().top; // posição natural da seção

        $('html, body').scrollTop(offsetTop - headerAltura, 600);
    });

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
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
        ],
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
        .on('mouseenter', function () {

            // Por padrão remove todas as classes 'ativo' e adiciona 'opaco'
            $('.servicos-container .servico-card').removeClass('ativo').addClass('opaco');

            // Agora para o elemento com o mouse em cima adiciona a classe ativo
            $(this).addClass('ativo').removeClass('opaco')
        })
        .on('mouseleave', function () {
            // Ao retirar o mouse, deixa todos os cards ativos novamente
            $('.servicos-container .servico-card').addClass('ativo').removeClass('opaco');
        });

    const widgetAcessibilidade = () => {
        // Opções de filtros de daltonismo
        const filtrosDaltonismo = {
            normal: {
                title: 'Visão Normal',
                description: 'Percepção completa de todas as cores do espectro visível.'
            },
            protanopia: {
                title: 'Protanopia',
                description: 'Deficiência na percepção do vermelho. Afeta cerca de 1% dos homens. Vermelho e verde podem parecer similares.'
            },
            deuteranopia: {
                title: 'Deuteranopia',
                description: 'Deficiência na percepção do verde. É o tipo mais comum de daltonismo, afetando cerca de 5% dos homens.'
            },
            tritanopia: {
                title: 'Tritanopia',
                description: 'Deficiência na percepção do azul e amarelo. É rara, afetando menos de 1% da população.'
            },
            achromatopsia: {
                title: 'Acromatopsia',
                description: 'Ausência total de percepção de cores (visão em preto e branco). É extremamente rara.'
            }
        };

        // Popula o select com as opções
        const selectFiltro = $('#select-filtro-daltonismo');

        $.each(filtrosDaltonismo, function (key, filtro) {
            const option = $('<option></option>')
                .attr('value', key)
                .text(filtro.title);
            selectFiltro.append(option);
        });

        // Evento de mudança no select
        selectFiltro.on('change', function () {
            const valorSelecionado = $(this).val();

            const seletoresAplicarFiltro = 'main, .inject-daltonismo';

            // Remove todas as classes de filtro existentes do body
            $(seletoresAplicarFiltro).removeClass(function (index, className) {
                return (className.match(/(^|\s)filtro-\S+/g) || []).join(' ');
            });

            if (valorSelecionado) {
                $(seletoresAplicarFiltro).addClass('filtro-' + valorSelecionado);
            }
        });

        $('#btn-acessibilidade, #fechar-acessibilidade').on('click', function () {
            $('.acessibilidade-content').toggleClass('ativo');
            $('#btn-acessibilidade').toggleClass('ocultar');
        });

        let fonteAtual = parseInt(localStorage.getItem("fonte")) || 16;
        let daltonismoAtivo = localStorage.getItem("daltonismo") === "true";

        // Aplica configs iniciais
        $("body").css("font-size", fonteAtual + "px");

        if (daltonismoAtivo) {
            $("body").addClass("modo-daltonismo");
        }

        // Aumentar fonte
        $("#aumentar-fonte").on("click", function () {
            fonteAtual += 2;
            $("body").css("font-size", fonteAtual + "px");
            localStorage.setItem("fonte", fonteAtual);
        });

        // Diminuir fonte
        $("#diminuir-fonte").on("click", function () {
            if (fonteAtual > 10) {
                fonteAtual -= 2;
                $("body").css("font-size", fonteAtual + "px");
                localStorage.setItem("fonte", fonteAtual);
            }
        });

        // Modo daltonismo / alto contraste
        $("#modo-daltonismo").on("click", function () {
            $("body").toggleClass("modo-daltonismo");
            const ativo = $("body").hasClass("modo-daltonismo");
            localStorage.setItem("daltonismo", ativo);
        });
    }

    widgetAcessibilidade();

});
