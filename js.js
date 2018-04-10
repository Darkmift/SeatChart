var rows = 12;
var cols = 12;
var cost = 0;
var pricing = [{
    color: "red",
    price: 100
}, {
    color: "blue",
    price: 200
}, {
    color: "green",
    price: 300
}, ];
buildSittingChart(rows, cols);

$("button").click(function() {
    if ($("#reset-button")) {
        $("#reset-button").remove();
    };
    if ($("div")) {
        $("div").remove();
    };
    $("<button>", {
        id: "reset-button",
        click: function() {
            cost = 0;
            $("div").remove();
            $("table").remove();
            $("#reset-button").remove();
            buildSittingChart(rows, cols);
        }
    }).text("Reset").appendTo("nav");

    cost = 0;
    var seats = $("table").find("i");
    for (var i = 0; i < seats.length; i++) {
        for (var j = 0; j < pricing.length; j++) {
            if ($(seats[i]).hasClass(pricing[j].color)) {
                if ($(seats[i]).siblings("i").hasClass(pricing[j].color)) {
                    cost = cost + (pricing[j].price * 2);
                } else {
                    cost = cost + pricing[j].price;
                };
            };
        };
    };

    $("<div>").appendTo("main");
    $("<span>").text("The total price of your trip is: " + cost + "$").appendTo($("div"));
});

function buildSittingChart(rows, cols) {
    $("<table>").appendTo("main");
    var table = $("table");
    for (var i = 0; i < rows; i++) {
        var tr = $("<tr>");
        tr.appendTo(table);
        for (var j = 0; j < cols; j++) {
            var seat = $("<i>", {
                class: "material-icons",
                text: "event_seat",
                click: function(event) {
                    if ($(event.target).parent("tr").index() <= (rows / 3) - 1) {
                        $(this).toggleClass('red');
                    };
                    if ($(event.target).parent("tr").index() <= (rows * 2 / 3) - 1 && $(event.target).parent("tr").index() > (rows / 3) - 1) {
                        $(this).toggleClass('blue')
                    };
                    if ($(event.target).parent("tr").index() > (rows * 2 / 3) - 1) {
                        $(this).toggleClass('green')
                    };
                }
            }).appendTo($("<td>")).appendTo(tr);
        }
    };
}