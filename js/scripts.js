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

    // --- 4. CONTACTO (VALIDACIÓN Y ENVÍO) ---

    // Validación en tiempo real para el Nombre
    $(document).ready(function () {

        // Validar Nombre y Apellido (Solo letras, mín 3)
        $('#nombre, #apellido').on('input', function () {
            const regex = /^[A-Za-z\sÁéíóúÁÉÍÓÚñÑ]{3,}$/;
            if (regex.test($(this).val())) {
                $(this).addClass('is-valid').removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid').removeClass('is-valid');
            }
        });

        // Validar Email
        $('#email').on('input', function () {
            const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailReg.test($(this).val())) {
                $(this).addClass('is-valid').removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid').removeClass('is-valid');
            }
        });

        // Validar Teléfono (Solo números y espacios)
        $('#tel').on('input', function () {
            const telReg = /^[0-9\s\-\+]{7,}$/;
            if (telReg.test($(this).val())) {
                $(this).addClass('is-valid').removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid').removeClass('is-valid');
            }
        });

        // Contador de caracteres para Mensaje
        $('#mensaje').on('input', function () {
            const len = $(this).val().length;
            $('#charCount').text(len + " / 200 caracteres");

            if (len > 0) {
                $(this).addClass('is-valid').removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid').removeClass('is-valid');
            }

            if (len > 200) {
                $(this).val($(this).val().substring(0, 200));
            }
        });

        // Manejo de envío con Spinner y Modal
        $('#contactForm').on('submit', function (e) {
            e.preventDefault();

            // Verificación final
            const formValido = $('#contactForm')[0].checkValidity();
            const errores = $('.is-invalid').length;

            if (!formValido || errores > 0) {
                alert("Por favor, completa todos los campos correctamente.");
                return;
            }

            // Interfaz de carga
            const $btn = $('#btnSubmit');
            const $spinner = $('#btnSpinner');
            const $text = $('#btnText');

            $btn.prop('disabled', true);
            $text.text('Procesando...');
            $spinner.removeClass('d-none');

            // Simulación de envío
            setTimeout(function () {
                $btn.prop('disabled', false);
                $text.text('Enviar Mensaje');
                $spinner.addClass('d-none');

                // Disparar Modal de confirmación
                const modalConfirm = new bootstrap.Modal(document.getElementById('confirmModal'));
                modalConfirm.show();

                // Limpiar
                $('#contactForm')[0].reset();
                $('.form-control, .form-select').removeClass('is-valid');
                $('#charCount').text("0 / 200 caracteres");
            }, 2500);
        });
    });
});