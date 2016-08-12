
parent();
function parent(){
    var data = {"restaurant_type": "parent"}
    $.ajax({
		url: '/review_api/review_sentiment_count',
		data: JSON.stringify(data),
		type : "POST",
           contentType: 'application/json; charset=utf-8',
           dataType: 'text',
		success: function(response){

                response = JSON.parse(response);
                if (response.statusCode == 200){
                    $("#bar_chart").empty();
                    $("#user_reviews").empty();
                    barGraph("Sentiment Statistics Data Visualization of Parent Restaurant Reviews",response.csv_file_nm,response.all_review_rating);
                }
                else{
                    console.log("something went wrong in parent Ajax call to reviewApi StatusCode : " + response.statusCode );
                }
		},
		error : function(xhr, errmsg, err) {
               console.log(xhr.status + ": " + xhr.responseText);
           },
    });
}

function units1(){

    var data = {"restaurant_type": "units1"}
    $.ajax({
		url: '/review_api/review_sentiment_count',
		data: JSON.stringify(data),
		type : "POST",
           contentType: 'application/json; charset=utf-8',
           dataType: 'text',
		success: function(response){

                response = JSON.parse(response);
                if (response.statusCode == 200){
                    $("#bar_chart").empty();
                    $("#user_reviews").empty();
                    barGraph("Sentiment Statistics Data Visualization of Unit First Restaurant Reviews",response.csv_file_nm,response.all_review_rating);
                }
                else{
                    console.log("something went wrong in units1 Ajax call to reviewApi StatusCode : " + response.statusCode );
                }
		},
		error : function(xhr, errmsg, err) {
               console.log(xhr.status + ": " + xhr.responseText);
        },
    });
}

function units2(){

    var data = {"restaurant_type": "units2"}
    $.ajax({
		url: '/review_api/review_sentiment_count',
		data: JSON.stringify(data),
		type : "POST",
           contentType: 'application/json; charset=utf-8',
           dataType: 'text',
		success: function(response){

                response = JSON.parse(response);
                if (response.statusCode == 200){
                    $("#bar_chart").empty();
                    $("#user_reviews").empty();
                    barGraph("Sentiment Statistics Data Visualization of Unit Second Restaurant Reviews",response.csv_file_nm,response.all_review_rating);
                }
                else{
                    console.log("something went wrong in units2 Ajax call to reviewApi StatusCode : " + response.statusCode );
                }
		},
		error : function(xhr, errmsg, err) {
               console.log(xhr.status + ": " + xhr.responseText);
        },
    });
}

function units3(){

    var data = {"restaurant_type": "units3"}
    $.ajax({
		url: '/review_api/review_sentiment_count',
		data: JSON.stringify(data),
		type : "POST",
           contentType: 'application/json; charset=utf-8',
           dataType: 'text',
		success: function(response){

                response = JSON.parse(response);
                if (response.statusCode == 200){
                    $("#bar_chart").empty();
                    $("#user_reviews").empty();
                    barGraph("Sentiment Statistics Data Visualization of Unit Third Restaurant Reviews",response.csv_file_nm,response.all_review_rating);
                }
                else{
                    console.log("something went wrong in units3 Ajax call to reviewApi StatusCode : " + response.statusCode );
                }
		},
		error : function(xhr, errmsg, err) {
               console.log(xhr.status + ": " + xhr.responseText);
        },
    });
}


function barGraph(str,csv_fnm,all_review_rating){
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .range(["#25DA4B", "#EA5627", "#2791EA"]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var divTooltip = d3.select("#bar_chart").append("div").attr("class", "toolTip");

    var svg = d3.select('#bar_chart').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("static/csv/"+csv_fnm+".csv", function(error, data) {
        if (error) throw error;

        var playerNames = d3.keys(data[0]).filter(function(key) { return key !== "Hotels"; });

        data.forEach(function(d) {
            d.runs = playerNames.map(function(name) { return {name: name, value: +d[name]}; });
        });

        x0.domain(data.map(function(d) { return d.Hotels; }));
        x1.domain(playerNames).rangeRoundBands([0, x0.rangeBand()]);
        y.domain([0, d3.max(data, function(d) { return d3.max(d.runs, function(d) { return d.value; }); })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 1)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Reviews");

        var records = svg.selectAll(".records")
            .data(data)
            .enter().append("g")
            .attr("class", "records")
            .attr("transform", function(d) { return "translate(" + x0(d.Hotels) + ",0)"; });

        records.selectAll("rect")
            .data(function(d) { return d.runs; })
            .enter().append("rect")
            .attr("width", x1.rangeBand())
            .attr("x", function(d) { return x1(d.name); })
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); })
            .style("fill", function(d) { return color(d.name); });

        records .on("mousemove", function(d){
            divTooltip.style("left", d3.event.pageX+10+"px");
            divTooltip.style("top", d3.event.pageY-25+"px");
            divTooltip.style("display", "inline-block");
            var x = d3.event.pageX, y = d3.event.pageY
            var elements = document.querySelectorAll(':hover');
            l = elements.length
            l = l-1
            elementData = elements[l].__data__

            divTooltip.html((d.Hotels)+"<br>"+elementData.name+"<br>"+elementData.value);

        });


        records.on('mouseout', function() {
            divTooltip.style('display', 'none');
        });

        var legend = svg.selectAll(".legend")
            .data(playerNames.slice().reverse())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 3)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d; });
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 3))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text(str);
    });
    if(all_review_rating.length){
        var heading = $('<h3 id=para>Followings are User Reviews and Rating</h3><br><br>')
        $('#user_reviews').append(heading);
        for(var i=0; i<all_review_rating.length; i++){
            var review = all_review_rating[i][0];
            var rating = all_review_rating[i][1];
            var html_tag=$('<p1><span id="index">'+(i+1)+'. </span>'+review+'<span id="rating">Rating:'+rating+'</span></p1><br><br>');
            $('#user_reviews').append(html_tag);
        }
    }
}
