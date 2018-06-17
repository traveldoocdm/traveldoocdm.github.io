var $ = jQuery.noConflict();

function getParameter(param) {
    var vars = {};
    window.location.href.replace(location.hash, "").replace(/[?&]+([^=&]+)=?([^&]*)?/gi, function(m, key, value) {
        vars[key] = value !== undefined ? value : ""
    });
    if (param) {
        return vars[param] ? vars[param] : null
    }
    return vars
}

function resizeContent() {
    var sizeofContent = parseInt($(window).height() - 375);
    $(".scorecast_widget").css("max-height", sizeofContent + "px")
}

function copyTheSecondTable() {
    var htmlCode = "";
    var labelUser = "";
    $(".scorecast_widget").each(function(i) {
        if (i > 0) {
            $(this).children("table").children("thead").remove();
            $(this).children("table").children("tbody").children("tr").each(function() {
                $(this).children("td").each(function() {
                    if ($(this).hasClass("user")) {
                        labelUser = $(this).children("a").children("span").text().toLowerCase()
                    }
                });
                if (labelUser.toUpperCase() != "NONAME") {
                    htmlCode += "<tr>" + $(this).html() + "</tr>"
                }
            })
        }
    });
	$(".scorecast_widget").first().children("table").children("tbody").append(htmlCode)
    $(".scorecast_widget").last().remove()
}

function upDateTheScore() {
    var dateNow = $.now();
    var dateUpgrade = new Date("Jul 10, 2018 21:00:00").getTime();
    var boolean = false;
    if (dateNow > dateUpgrade) {
        boolean = true
    }
    $(".scorecast_widget").each(function() {
        $(this).children("table").children("tbody").children("tr").each(function() {
            var labelUser;
            var scoreGame = 0;
            $(this).children("td").each(function() {
                if ($(this).hasClass("user")) {
                    labelUser = $(this).children("a").children("span").text().toLowerCase()
                }
                if ($(this).hasClass("total")) {
                    scoreGame = parseInt($(this).text());
                    if (labelUser == "gorsel" || labelUser == "pierluigi collina") {
                        if (boolean) {
                            scoreGame = -scoreGame;
                            scoreGame = scoreGame.toString();
                            $(this).html(scoreGame)
                        }
                    }
                }
            })
        })
    })
}

function sortTheTable() {
    $(".scorecast_widget").each(function() {
        $(this).children("table").tablesorter({
            sortList: [
                [2, 1],
                [1, 0]
            ]
        })
    })
}

function extractTheLeader() {
    var htmlCode = "";
    $(".scorecast_widget").each(function() {
        $(this).children("table").children("tbody").children("tr").each(function(i) {
            if (i < 3) {
                htmlCode += "<tr>" + $(this).html() + "</tr>";
                $(this).remove()
            }
        })
    });
    $(".scorecast_leader").html("<table>" + htmlCode + "</table>")
}

function extractTheLooser() {
    var htmlCode = "";
    $(".scorecast_widget").each(function() {
        var tableSize = $(this).children("table").children("tbody").children("tr").size();
        $(this).children("table").children("tbody").children("tr").each(function(i) {
            if (i > tableSize - 4) {
                htmlCode += "<tr>" + $(this).html() + "</tr>";
                $(this).remove()
            }
        })
    });
    $(".scorecast_looser").html("<table>" + htmlCode + "</table>")
}

function showRanking() {
    var numRank = 0;
	var previousScore;
	var currentScore;
	var theBox;
    $(".scorecast_leader").each(function() {
        $(this).children("table").children("tbody").children("tr").each(function(i) {
            $(this).children("td").each(function() {
				if ($(this).hasClass("center")) {
					theBox = $(this);
				}
				if ($(this).hasClass("total")) {
					currentScore = $(this).html()
					numRank++;
				}
            })
			if(currentScore != previousScore){
				theBox.html(numRank)
			} else {
				theBox.html("-")
			}
			previousScore = currentScore;
        })
    });
    $(".scorecast_widget").each(function() {
        $(this).children("table").children("tbody").children("tr").each(function() {
            $(this).children("td").each(function() {
				if ($(this).hasClass("center")) {
					theBox = $(this);
				}
				if ($(this).hasClass("total")) {
					currentScore = $(this).html()
					numRank++;
				}
            })
			if(currentScore != previousScore){
				theBox.html(numRank)
			} else {
				theBox.html("-")
			}
			previousScore = currentScore;
        })
    });
    $(".scorecast_looser").each(function() {
        $(this).children("table").children("tbody").children("tr").each(function(i) {
            $(this).children("td").each(function() {
				if ($(this).hasClass("center")) {
					theBox = $(this);
				}
				if ($(this).hasClass("total")) {
					currentScore = $(this).html()
					numRank++;
				}
            })
			if(currentScore != previousScore){
				theBox.html(numRank)
			} else {
				theBox.html("-")
			}
			previousScore = currentScore;
        })
    });
    var sizeofContent = parseInt($(window).height() - 360);
    $(".scorecast_widget").css("max-height", sizeofContent + "px")
}

function favicon() {
    $("head").children('link[rel="shortcut icon"]').attr("href", "./favicon.ico");
    $("body").addClass("displayedScore")
}

function splitTableScore() {
    var htmlCodeTop = "";
    var htmlCodeBottom = "";
    $(".scorecast_widget").each(function() {
        var tableSize = $(this).children("table").children("tbody").children("tr").size();
        $(this).children("table").children("tbody").children("tr").each(function(i) {
            if (i < 7) {
                htmlCodeTop += "<tr>" + $(this).html() + "</tr>";
                $(this).remove()
            }
            if (i > tableSize - 8) {
                htmlCodeBottom += "<tr>" + $(this).html() + "</tr>";
                $(this).remove()
            }
        })
    });
    $(".dv_left").children(".scorecast_content").html("<table>" + htmlCodeTop + "</table>");
    $(".dv_right").children(".scorecast_content").html("<table>" + htmlCodeBottom + "</table>");
    var sizeofContent = parseInt($(window).height() - 150);
    $(".scorecast_widget").css("max-height", sizeofContent + "px")
}
$(document).ready(function() {
    $("#boxscroll").niceScroll({
        cursorborder: "",
        cursorcolor: "#000000",
        cursorborderradius: "15px",
        cursoropacitymax: .75
    });
    $(window).bind("load", function() {
        resizeContent();
        copyTheSecondTable();
        upDateTheScore();
        sortTheTable();
        extractTheLeader();
        extractTheLooser();
        showRanking();
        if (!$("body").hasClass("smartphone") && !($("body").hasClass("tablette") && $("body").hasClass("portrait"))) {
            if (getParameter("spl")) {
                $("body").addClass("split");
                splitTableScore()
            }
        }
        favicon()
    });
    $(window).on("resize", function() {
        resizeContent()
    })
});