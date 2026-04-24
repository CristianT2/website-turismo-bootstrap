$(document).ready(function() {
    const htmlElement = $("html");
    const themeBtn = $("#darkModeToggle");
    const themeIcon = $("#themeIcon");

    // Al cargar, revisar si ya había una preferencia guardada
    const currentTheme = localStorage.getItem("theme") || "light";
    htmlElement.attr("data-bs-theme", currentTheme);
    updateIcon(currentTheme);

    // Evento clic del botón
    $(document).on("click", "#darkModeToggle", function() {
        let newTheme = htmlElement.attr("data-bs-theme") === "light" ? "dark" : "light";
        
        htmlElement.attr("data-bs-theme", newTheme);
        localStorage.setItem("theme", newTheme); // Guardar preferencia
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === "dark") {
            themeIcon.removeClass("bi-moon-stars-fill").addClass("bi-sun-fill");
            themeIcon.css("color", "#ffce67"); // Color sol
        } else {
            themeIcon.removeClass("bi-sun-fill").addClass("bi-moon-stars-fill");
            themeIcon.css("color", "#2d3436"); // Color luna
        }
    }
});

$(document).ready(function () {
    // Animaciones del Hero
    $("#hero-title").fadeIn(1500);
    $("#hero-subtitle").delay(800).fadeIn(1000);
    $("#hero-btn").delay(1600).slideDown(800);

    // Animación de Contadores
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
});

$(document).ready(function() {
    
    // FILTROS DINÁMICOS - GALERÍA
    $('#filter-system button').on('click', function() {
        // Manejo de UI: Clases activas
        $('#filter-system button').removeClass('active');
        $(this).addClass('active');

        const seleccion = $(this).attr('data-region');

        if (seleccion === 'todos') {
            // Muestra todos con animación de jQuery
            $('.dest-card').show(500);
        } else {
            // Oculta todos primero
            $('.dest-card').hide(300);
            
            // Filtra y muestra solo la categoría elegida
            $('.dest-card').filter('.' + seleccion).show(500);
        }
    });

    // EFECTO ZOOM CON JQUERY
    // Se complementa con el CSS para máxima suavidad
    $('.dest-card').on('mouseenter', function() {
        $(this).find('img').css('transform', 'scale(1.15)');
    }).on('mouseleave', function() {
        $(this).find('img').css('transform', 'scale(1)');
    });

    // OPCIONAL: Efecto suave de scroll para la tabla
    $('.table-responsive').on('scroll', function() {
        console.log('El usuario está explorando los precios');
    });

});