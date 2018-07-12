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

function resizeContent(id) {
    var sizeofContent = parseInt($(window).height() + id);
    $(".scorecast_widget").css("max-height", sizeofContent + "px")
}

function copyTheSecondTable() {
    var htmlCode = "";
    var labelUser = "";
    var section = $(".scorecast_widget");
    var toRemove = ["NONAME","GUILLAUMEDELARUE", "JASONTRAVELDOO","RONDEL","BABS007","AGATHA","FRANCE123-0"]
    section.each(function(i) {
        if (i > 0) {
            $(this).children("table").children("thead").remove();
            $(this).children("table").children("tbody").children("tr").each(function() {
                $(this).children("td").each(function() {
                    if ($(this).hasClass("user")) {
                        labelUser = $(this).children("a").children("span").text().toLowerCase()
                    }
                });
              if (!toRemove.includes(labelUser.toUpperCase())) {
                htmlCode += "<tr>" + $(this).html() + "</tr>"
              }
            });
            $(this).first().children("table").children("tbody").append(htmlCode)
        }
    });
    section.each(function(i) {
        if (i > 0) {
            $(this).remove()
        }
    });
    section.first().children("table").children("tbody").append(htmlCode)
}

function upDateTheScore() {
    var dateNow = $.now();
    var dateUpgrade = new Date("Jul 11, 2018 17:15:00").getTime();
    var dateRemoveAmazing = new Date("Jul 16, 2018 12:00:00").getTime();
    var boolean = false;
    var topScore = 0;
    if (dateNow > dateUpgrade) {
        boolean = true;
        if (dateNow > dateRemoveAmazing) {
            boolean = false
        }
    }
    if (getParameter("clmt")) {
        boolean = false
    }
    $(".scorecast_widget").each(function() {
        $(this).children("table").children("tbody").children("tr").each(function(i) {
            var labelUser;
            var scoreGame = 0;
            var sLabeluser;
            var iScorename = 0;
            $(this).children("td").each(function() {
                if ($(this).hasClass("user")) {
                    labelUser = $(this).children("a").children("span").text().toLowerCase()
			 
											
													 
																												
									
													 
										   
                }
                if ($(this).hasClass("total")) {
                    scoreGame = parseInt($(this).text());
                    if (boolean) {
                        for (l = 0; l < labelUser.length - 1; l++) {
                            sLabeluser = labelUser.slice(l, l + 1);
                            iScorename += sLabeluser.charCodeAt(0) - 65;
                            iScorename = parseInt(iScorename / 2.5)
                        }
                        scoreGame += iScorename;
                        if (i == 0) {
                            topScore = scoreGame
                        }
                        if (labelUser == "gorsel") {
                            scoreGame = topScore + 2
                        }
                        if (labelUser == "discoquillette") {
                            scoreGame = topScore + 1
                        }
                        if (labelUser == "giroud" || labelUser == "pierluigi collina" || labelUser == "playerunknown" || labelUser == "travel_k") {
                            scoreGame = parseInt((topScore + scoreGame) / 2)
                        }
                        if (labelUser == "jason" || labelUser == "amiralcomcom" || labelUser == "ahmed.io" || labelUser == "epiliptik" || labelUser == "gabriel" || labelUser == "babs007") {
                            scoreGame = parseInt((topScore + scoreGame - 20) / 2)
                        }
                        if (labelUser == "quatorze") {
                            scoreGame = 14
                        }
                        if (labelUser == "france123-0") {
                            scoreGame = 0
                        }
                        scoreGame = scoreGame.toString();
                        $(this).html(scoreGame)
                    }
                }
            })
        })
    });
    if (boolean) {
        sortTheTable()
    }
}

function sortTheTable() {
    $(".scorecast_widget").children("table").tablesorter({
        sortList: [
            [2, 1],
            [1, 0]
        ]
    })
}

function extract(ranking, type) {
    var htmlCode = "";
    var tableSize = $(".scorecast_widget").children("table").children("tbody").children("tr").size();
    $(".scorecast_widget").children("table").children("tbody").children("tr").each(function(i) {
        if (type == "leader" && i < ranking || type == "looser" && i > tableSize - ranking - 1) {
            htmlCode += "<tr>" + $(this).html() + "</tr>";
            $(this).remove()
        }
    });
    if (type == "leader") {
        $(".scorecast_leader").html("<table>" + htmlCode + "</table>")
    } else {
        $(".scorecast_looser").html("<table>" + htmlCode + "</table>")
    }
}

function sectionRanking(section, ranking) {
    section.children("table").children("tbody").children("tr").each(function() {
        var currentScore;
        var scoreBox;
        $(this).children("td").each(function() {
            if ($(this).hasClass("center")) {
                scoreBox = $(this)
            }
            if ($(this).hasClass("total")) {
                currentScore = $(this).html()
            }
        });
        ++ranking.current;
        if (currentScore != ranking.previousScore) {
            scoreBox.html(ranking.current)
        } else {
            scoreBox.html("-")
        }
        ranking.previousScore = currentScore
    })
}

function showRanking() {
    var ranking = {
        current: 0,
        previousScore: -1
    };
    sectionRanking($(".scorecast_leader"), ranking);
    sectionRanking($(".scorecast_widget"), ranking);
    sectionRanking($(".scorecast_looser"), ranking);
    resizeContent(-360);
    $("body").addClass("displayedScore")
}

function favicon() {
    $("head").children('link[rel="shortcut icon"]').attr("href", "./favicon.ico")
}

function splitTableScore() {
    var htmlCodeTop = "";
    var htmlCodeBottom = "";
    $(".scorecast_widget").each(function() {
        var tableSize = $(this).children("table").children("tbody").children("tr").size();
        $(this).children("table").children("tbody").children("tr").each(function(i) {
            if (i < 16) {
                htmlCodeTop += "<tr>" + $(this).html() + "</tr>";
                $(this).remove()
            }
            if (i > tableSize - 13) {
                htmlCodeBottom += "<tr>" + $(this).html() + "</tr>";
                $(this).remove()
            }
        })
    });
    $(".dv_left").children(".scorecast_content").html("<table>" + htmlCodeTop + "</table>");
    $(".dv_right").children(".scorecast_content").html("<table>" + htmlCodeBottom + "</table>");
    resizeContent(-150)
}
$(document).ready(function() {
    $("#boxscroll").niceScroll({
        cursorborder: "",
        cursorcolor: "#000000",
        cursorborderradius: "15px",
        cursoropacitymax: .75
    });
    $(window).bind("load", function() {
        favicon();
        resizeContent(-375);
        copyTheSecondTable();
        sortTheTable();
        upDateTheScore();
        extract(3, "leader");
        extract(3, "looser");
        showRanking();
        if (!$("body").hasClass("smartphone") && !($("body").hasClass("tablette") && $("body").hasClass("portrait"))) {
            if (getParameter("spl")) {
                $("body").addClass("split");
                splitTableScore()
            }
        }
    });
    $(window).on("resize", function() {
        resizeContent(-375)
    })
});
