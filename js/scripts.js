$(document).ready(function () {
    // --- 1. MODO OSCURO ---
    const htmlElement = $("html");
    const themeIcon = $("#themeIcon");

    const currentTheme = localStorage.getItem("theme") || "light";
    htmlElement.attr("data-bs-theme", currentTheme);
    updateIcon(currentTheme);

    $(document).on("click", "#darkModeToggle", function () {
        let newTheme = htmlElement.attr("data-bs-theme") === "light" ? "dark" : "light";
        htmlElement.attr("data-bs-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === "dark") {
            themeIcon.removeClass("bi-moon-stars-fill").addClass("bi-sun-fill");
            themeIcon.css("color", "#ffce67");
        } else {
            themeIcon.removeClass("bi-sun-fill").addClass("bi-moon-stars-fill");
            themeIcon.css("color", "#2d3436");
        }
    }

    // --- 2. HOME (ANIMACIONES) ---
    $("#hero-title").fadeIn(1500);
    $("#hero-subtitle").delay(800).fadeIn(1000);
    $("#hero-btn").delay(1600).slideDown(800);

    $('.counter').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).data('target')
        }, {
            duration: 3500,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now).toLocaleString());
            }
        });
    });

    // --- 3. DESTINOS (FILTROS) ---
    $('#filter-system button').on('click', function () {
        $('#filter-system button').removeClass('active');
        $(this).addClass('active');
        const seleccion = $(this).attr('data-region');

        if (seleccion === 'todos') {
            $('.dest-card').show(500);
        } else {
            $('.dest-card').hide(300);
            $('.dest-card').filter('.' + seleccion).show(500);
        }
    });

    $('.dest-card').on('mouseenter', function () {
        $(this).find('img').css('transform', 'scale(1.15)');
    }).on('mouseleave', function () {
        $(this).find('img').css('transform', 'scale(1)');
    });

    // --- 4. AGENCIAS (FLIP & RATING) ---
    $(document).on('click', '.flip-card', function (e) {
        // Si clickean estrellas o botón de reservar, no girar
        if ($(e.target).closest('.star, .btn-accent').length) {
            return;
        }
        $(this).toggleClass('is-flipped');
    });

    // Sistema de Estrellas
    $(document).on('click', '.star', function (e) {
        e.stopPropagation();
        const $container = $(this).parent();
        $container.find('.star').removeClass('active-star');
        $(this).addClass('active-star').prevAll().addClass('active-star');
    });
});