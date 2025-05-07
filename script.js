var $cards = $(".card");
var $style = $(".hover");

$cards.on("mousemove touchmove", function(e) {
    var pos = [e.offsetX, e.offsetY];
    e.preventDefault();
    if (e.type === "touchmove") {
        pos = [e.touches[0].clientX, e.touches[0].clientY];
    }

    var $card = $(this);
    var l = pos[0];
    var t = pos[1];
    var h = $card.height();
    var w = $card.width();

    var px = Math.abs(Math.floor(100 / w * l) - 100);
    var py = Math.abs(Math.floor(100 / h * t) - 100);
    var pa = (50 - px) + (50 - py);
    var lp = (50 + (px - 50) / 1.5);
    var tp = (50 + (py - 50) / 1.5);
    var px_spark = (50 + (px - 50) / 7);
    var py_spark = (50 + (py - 50) / 7);
    var p_opc = 20 + (Math.abs(pa) * 1.5);

    var grad_pos = `background-position: ${lp}% ${tp}%;`
    var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
    var opc = `opacity: ${p_opc / 100};`

    // Set the card's rotation based on the mouse position
    gsap.to($card, {
        duration: 0.3,
        rotationX: (50 - tp) * -1, // Calculate rotation based on mouse position
        rotationY: (50 - lp) * 0.5, // Calculate rotation based on mouse position
        opacity: 1,
        ease: "power2.out"
    });

    // Apply the gradient and sparkles effect via CSS
    $style.html(`
        .card:hover:before { ${grad_pos} }
        .card:hover:after { ${sprk_pos} ${opc} }
    `);

}).on("mouseover touchstart", function() {
    var $card = $(this);
    // Ensure the card is "straightened" when hovered
    gsap.to($card, {
        duration: 0.3,
        rotationX: 0, // Reset the X rotation
        rotationY: 0, // Reset the Y rotation
        ease: "power2.out"
    });
}).on("mouseout touchend touchcancel", function() {
    var $card = $(this);
    $style.html("");
    gsap.to($card, {
        duration: 1.5,
        rotationX: 0, // Reset the rotation to 0 when the mouse leaves
        rotationY: 0, // Reset the rotation to 0 when the mouse leaves
        scale: 1, // Reset scale
        opacity: 0.7, // Set opacity back to 0.7
        ease: "power2.out"
    });
});
