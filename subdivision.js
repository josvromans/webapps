function draw_polygon(ctx, vertex_list, color){
    ctx.beginPath();
    for (var item=0; item<vertex_list.length ; item+=1 ){
        ctx.lineTo(vertex_list[item][0], vertex_list[item][1]);
    }

    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
}


function clear_canvas(ctx, canvas){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function get_midpoint(point_a, point_b, divisor){
    var diff_x = (point_b[0] - point_a[0]) / divisor;
    var diff_y = (point_b[1] - point_a[1]) / divisor;

    return [point_a[0] + diff_x, point_a[1] + diff_y];
}


function parse_strategy(strategy_string){
    var strategy = [];
    for (var index=0; index<strategy_string.length; index+=1 ){
        var value = parseInt(strategy_string[index]);
        if (value > 2 || value < 0) {
            alert('The strategy can only contain [0, 1, 2]');
            return [];
        }
        strategy.push(value);
    }
    return strategy;
}


function triangle_subdivision(ctx, canvas){
    var iterations = document.getElementById('iterations').value;
    var strategy = parse_strategy(document.getElementById('strategy').value);

    clear_canvas(ctx, canvas);
    var bg_color = document.getElementById('background_color').value;
    canvas.style.backgroundColor = bg_color;

    var divisor = parseFloat(document.getElementById('divisor').value);
    var color = document.getElementById('current_color').value;

    function subdivide_and_draw(ctx, vertices, i){
        var strategy_length = strategy.length;
        if (i < iterations) {

            var subdivide_index = strategy[i % strategy_length];
            var subdivide_vertex = vertices.splice(subdivide_index, 1)[0];

            var midpoint = get_midpoint(vertices[0], vertices[1], divisor);
            // var midpoint = [[[0] + vertices[1][0]] / divisor, [vertices[0][1] + vertices[1][1]] / divisor];

            subdivide_and_draw(ctx, [subdivide_vertex, midpoint, vertices[0]], i + 1);
            subdivide_and_draw(ctx, [subdivide_vertex, midpoint, vertices[1]], i + 1);
        } else {
            draw_polygon(ctx, vertices, color);
        }
    }

    var side_length = canvas.height;
    var half_side_length = side_length / 2;
    var center = [half_side_length, half_side_length];
    var top_left = [0, 0];
    var top_right = [side_length, 0];
    var bottom_right = [side_length, side_length];
    var bottom_left = [0, side_length];
    // add the 4 triangles that form a square, and share a vertex in the center of the square
    // calculations will be done for every triangle individually..
    subdivide_and_draw(ctx, [center, bottom_left, bottom_right], 0);
    subdivide_and_draw(ctx, [center, top_left, top_right], 0);
    subdivide_and_draw(ctx, [center, bottom_left, top_left], 0);
    subdivide_and_draw(ctx, [center, bottom_right, top_right], 0);
}


document.addEventListener('DOMContentLoaded', function(event) {
    var canvas = document.getElementById('canvas');
    // make the canvas a square, with side lengths to be the shorter one from window_width - side bar and window height
    var side_length = window.innerHeight;
    if ((window.innerWidth - 80) < window.innerHeight){
        side_length = window.innerWidth - 80;
    }
    canvas.width  = side_length;
    canvas.height = side_length;
    var ctx = canvas.getContext('2d');

    document.getElementById('start').addEventListener("mouseup", function() {
        triangle_subdivision(ctx, canvas);
    });
    document.getElementById('clear').addEventListener("mouseup", function() {
        clear_canvas(ctx, canvas);
    });
    document.getElementById('download').addEventListener("mouseup", function() {
        var link = document.getElementById('link');
        link.setAttribute('download', 'Triangle_subdivision' + document.getElementById('strategy').value + '.png');
        link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
        link.click();
    });

    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 13) {triangle_subdivision(ctx, canvas);}  // Enter
        else if (event.keyCode === 67) {clear_canvas(ctx, canvas);}  // c
    });

    // if a strategy was provided by the url, render it
    var queryString = window.location.search;
    var splitted = queryString.split('?strategy=');  // prevent using URLSearchParams, no other parameters are allowed

    if (splitted.length === 2) {
        document.getElementById('strategy').value = splitted[1];
        triangle_subdivision(ctx, canvas);
    }
});
