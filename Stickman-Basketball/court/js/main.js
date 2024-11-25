const inputs_container = $("#inputs-container")

const court = $("#court");
const field = $("#field");

const court_input = $("#court-input");
const field_input = $("#field-input");

const generate_button = $("#generate-btn");
const save_button = $("#save-btn");

const validation = true;

court_input.on("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            court.css("background-image", `url(${e.target.result})`);
        };

        reader.readAsDataURL(file);
    }
});

field_input.on("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            field.css("background-image", `url(${e.target.result})`);
        };

        reader.readAsDataURL(file);
    }
});

generate_button.on("click", function() {
    if (validation == true && court_input.val() == "") {
        alert("Please import court.");
    }
    else if (validation == true && field_input.val() == "") {
        alert("Please import field.");
    }
    else {
        field.show();
        save_button.show();
    }
});

save_button.on("click", function() {
    if (validation == true && court_input.val() == "") {
        alert("Please import court.");
    }
    else if (validation == true && field_input.val() == "") {
        alert("Please import field.");
    }
    else {
        inputs_container.hide();
        field.css("zoom", 1);

        const node = document.getElementById("field");
        domtoimage.toJpeg(node, {
            useCORS: true,
            quality: 1.0
        })
        .then(dataUrl => {
            const link = document.createElement("a");
            link.download = "Field_Team-hd.jpg";
            link.href = dataUrl;
            link.click();

            inputs_container.show();
            field.css("zoom", 0.25);
        })
        .catch(error => {
            console.error("Error capturing the image:", error);
        });
    }
});