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