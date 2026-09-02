(function () {
    "use strict";

    var projectPages = {
        "casa-barra": "projetos/casa-barra.html",
        "casa-taipa": "projetos/casa-taipa.html",
        "casa-duo": "projetos/casa-duo.html",
        "casa-atria": "projetos/casa-atria.html",
        "casa-eli": "projetos/casa-eli.html",
        "escritorio-tejo": "projetos/escritorio-tejo.html"
    };

    function goToProject(element) {
        var projectKey = element.getAttribute("data-project");
        var page = projectPages[projectKey];

        if (!page) {
            return;
        }

        window.location.href = page;
    }

    document.addEventListener("click", function (event) {
        var trigger = event.target.closest(".project-open");

        if (!trigger) {
            return;
        }

        event.preventDefault();
        goToProject(trigger);
    });

    document.addEventListener("keydown", function (event) {
        var trigger = event.target.closest(".project-open");

        if (!trigger || (event.key !== "Enter" && event.key !== " ")) {
            return;
        }

        event.preventDefault();
        goToProject(trigger);
    });
})();
