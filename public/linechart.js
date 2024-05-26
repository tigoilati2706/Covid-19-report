var rowConverter = function (d) {
    return {
        Case: parseFloat(d["total_deaths"]),
        Location: d["location"],
        Date: new Date(parseInt(d["year"]), parseInt(d["month"] - 1), parseInt(d["day"]))
    }
}

d3.csv("/data/line_chart_trained.csv",
    rowConverter,
    function (error, data) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(data)

            // Set the margins
            var margin = { top: 60, right: 100, bottom: 60, left: 80 },
                width = 1450 - margin.left - margin.right,
                height = 600 - margin.top - margin.bottom;
            // Create the svg canvas 
            var svg = d3.select("body")
                .append("svg")
                .style("width", width + margin.left + margin.right + "px")
                .style("height", height + margin.top + margin.bottom + "px")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .attr("class", "svg");

            //NEST : group data by Location
            var nest = d3.nest()
                .key(function (d) {
                    return d.Location;
                })
                .entries(data)
            console.log(nest)

            // Set the ranges
            var x = d3.scaleTime()
                .domain([d3.min(data, function (d) { return d.Date; }),
                d3.max(data, function (d) { return d.Date; })
                ])
                .range([0, width - 70]);
            var y = d3.scaleLinear()
                .domain([0, d3.max(data, function (d) { return d.Case; })])
                .range([height, 0]);
            // color 
            var res = nest.map(function (d) { return d.key })
            console.log(nest)
            var color = d3.scaleOrdinal()
                .domain(res)
                .range(['#DD2E38', '#5C85C4', '#3EBD71', '#975EAC', '#E1B020', '#725100']);

            //  Add the X Axis
            var xaxis = svg.append("g")
                .attr("transform", "translate(0," + (height) + ")")
                .attr("class", "x axis")
                .call(d3.axisBottom(x)
                    .ticks(d3.timeDate)
                    .tickSize(0)
                    .tickFormat(d3.timeFormat("%m/%Y"))
                    .tickSizeInner(6)
                    .tickPadding(10));

            // Add the Y Axis
            var yaxis = svg.append("g")
                .attr("class", "y axis")
                .call(d3.axisLeft(y)
                    .ticks(5)
                    .tickSizeInner(0)
                    .tickPadding(6)
                    .tickSize(0, 0));


            // Add a label to the y axis
            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - 80)
                .attr("x", 0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("DEATTH CASES ")
                .attr("class", "y axis label")
                .style("fill", "darkgreen")


            // Add line into SVG 
            var line = d3.line()
                .x(d => x(d.Date))
                .y(d => y(d.Case));

            let glines = svg.append('g')

            glines.selectAll('.line-group')
                .data(nest)
                .enter()
                .append('g')
                .append('path')
                .attr("fill", "none")
                .attr("stroke", function (d) { return color(d.key) })
                .attr('class', function (d) { return "line " + d.key })
                .attr('d', d => line(d.values))
                .style("stroke-width", "2")



            // LEGEND 

            //Hightlight the Location which is hovered
            var highlight = function (d) {

                d3.selectAll(".line")
                    .transition()
                    .duration(300)
                    .style("opacity", 0.05)


                d3.select("." + d.key)

                    .transition()
                    .duration(300)
                    .style("opacity", "1")
                    .style("stroke-width", "3");
            }


            // when it is not hovered anymore
            var noHighlight = function (d) {
                d3.selectAll(".line")
                    .transition()
                    .duration("100")
                    .style("opacity", "1")
                    .style("stroke-width", "2")

            }


            // Add one dot in the legend for each name.
            var size = 20
            svg.selectAll("myRect")
                .data(nest)
                .enter()
                .append("rect")
                .attr("x", width - 50)
                .attr("y", function (d, i) { return i * (size + 5) })
                .attr("width", size)
                .attr("height", size)
                .style("fill", function (d) { return color(d.key) })
                .on("mouseover", highlight)
                .on("mouseleave", noHighlight)

            // Add one dot in the legend for each name.
            svg.selectAll("mylabels")
                .data(nest)
                .enter()
                .append("text")
                .attr("x", width - 20)
                .attr("y", function (d, i) { return i * (size + 5) + (size / 2) })
                .style("fill", function (d) { return color(d.key) })
                .text(function (d) { return d.key })
                .attr("text-anchor", "left")
                .style("alignment-baseline", "middle")
                .on("mouseover", highlight)
                .on("mouseleave", noHighlight)





            // this the black vertical line to folow mouse
            var mouseG = svg.append("g")
                .attr("class", "mouse-over-effects");

            mouseG.append("path")
                .attr("class", "mouse-line")
                .style("stroke", "black")
                .style("stroke-dasharray", ("1, 1"))
                .style("stroke-width", "1.5px")
                .style("opacity", "0");

            var mousePerLine = mouseG.selectAll(".mouse-per-line")
                .data(nest)
                .enter()
                .append("g")
                .attr("class", "mouse-per-line");

            mousePerLine.append("circle")
                .attr("r", 3)
                .style("stroke", function (d) {
                    return color(d.key);
                })
                .style("fill", "none")
                .style("stroke-width", "1px")
                .style("opacity", "0");

            mousePerLine.append("text").attr("transform", "translate(10,-5)");

            var tooltip = d3.select("body").append("div")
                .attr('id', 'tooltip')
                .style('position', 'absolute')
                .style("background-color", "#D3D3D3")
                .style('padding', 5 + 'px')
                .style('display', 'none')

            mouseG.append("rect")
                .attr("width", width)
                .attr("height", height)
                .attr("fill", "none")
                .attr("pointer-events", "all")
                .on("mouseout", function () {
                    d3.select(".mouse-line").style("opacity", "0");
                    d3.selectAll(".mouse-per-line circle").style("opacity", "0");
                    d3.selectAll(".mouse-per-line text").style("opacity", "0")
                    d3.selectAll("#tooltip").style('display', 'none')
                })
                .on("mouseover", function () {
                    d3.select(".mouse-line").style("opacity", "1");
                    d3.selectAll(".mouse-per-line circle").style("opacity", "1");
                    d3.selectAll(".mouse-per-line text").style("opacity", "1")
                    d3.selectAll("#tooltip").style('display', 'block')
                })
                .on("mousemove", function () {

                    var mouse = d3.mouse(this);

                    if (mouse[0] >= width) {
                        mouseG.select("rect").attr("width", width + 30);
                        return;
                    }

                    d3.selectAll(".mouse-per-line")
                        .attr("transform", function (d) {

                            var xDate = x.invert(mouse[0]);
                            var bisect = d3.bisector(function (d) { return d.Date; }).right;
                            var idx = bisect(d.values, xDate);

                            let xCoordinate = (x(d.values[idx].Date)).toString();
                            let yCoordinate = (y(d.values[idx].Case)).toString();

                            d3.select(".mouse-line")
                                .attr("d", function () {
                                    var data = "M" + xCoordinate + "," + height;
                                    data += " " + xCoordinate + "," + 0;
                                    return data;
                                });

                            d3.select(this)
                                .select("text")
                                .text(y.invert(yCoordinate).toFixed(0))
                                .attr("fill", function (d) {
                                    return color(d.key)
                                });

                            return "translate(" + xCoordinate + "," + yCoordinate + ")";
                        });


                    updateTooltipContent(mouse, nest);
                })


            function updateTooltipContent(mouse, nest) {

                var sortingObj = []

                nest.map(d => {
                    var xDate = x.invert(mouse[0] - 20);
                    var bisect = d3.bisector(function (d) { return d.Date; }).right;
                    var idx = bisect(d.values, xDate);

                    sortingObj.push({
                        Location: d.values[idx].Location,
                        case: d.values[idx].Case,
                        date: d.values[idx].Date
                    })
                })

                if (sortingObj[0] == null) return;


                sortingObj.sort((x, y) => y.case - x.case);

                tooltip.html(d => {
                    var string = (sortingObj[0].date).toString();
                    var i = string.indexOf('00:00:00');
                    return string.substring(0, i);
                })
                    .style('left', d3.event.pageX + 50 + "px")
                    .style('top', d3.event.pageY - 50 + "px")
                    .style('display', 'block')
                    .style('font-size', 12)
                    .selectAll()
                    .data(sortingObj).enter()
                    .append('div')
                    .style('color', d => {
                        return color(d.Location)
                    })
                    .style('font-size', 10)
                    .html(d => {
                        return d.Location + " : " + d.case;
                    })
            }
        }




    })
