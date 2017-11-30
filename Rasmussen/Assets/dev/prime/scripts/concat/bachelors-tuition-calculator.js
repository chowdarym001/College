var tuitionData;
var resultsHidden = true;
var feeReduction = 96;
var excludeCoursefeesReduction = -79;

// Bachelor Completer Bar Graph Variables
var barBCCredits,
    barBCAssessments,
    barBCGrant,
    barBCRemaining;

var totalCost,
    innovationGrant,
    innovationGrantPercent,
    transferCreditsPerCredit,
    transferCreditsLow,
    transferCreditsHigh,
    maxFlexChoiceCourses,
    excludeCourseFees,
    flexChoiceCourseCost;

function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
    }
    return val;
}

function findRoundedUpPercent(numerator, denominator) {
    return Math.ceil((numerator / denominator) * 100)
}

function loadProgramsForBachelorCompleter(schoolOfId) {
    if (schoolOfId != null && schoolOfId != "") {
        $("#bachelorCompleterProgram").empty();
        $("#bachelorCompleterProgram").append('<option value="">Select Your Program</option>');
        for (var i = 0; i < tuitionSchoolOfsAndPrograms[schoolOfId].length; i++) {
            $("#bachelorCompleterProgram").append('<option value="' +
                tuitionSchoolOfsAndPrograms[schoolOfId][i].split("|")[0] +
                '" >' +
                tuitionSchoolOfsAndPrograms[schoolOfId][i].split("|")[1] +
                '</option>')
        }
    }
}

function loadBachelorCompleterGlobalVariables() {
    barBCCredits = $(".graph-bar--credits");
    barBCAssessments = $(".graph-bar--assessments");
    barBCGrant = $(".graph-bar--grant-innovation");
    barBCRemaining = $(".graph-bar--remaining");

    // Starting all bar graphs except barBCRemaining to 0
    barBCCredits.css("width", "0%");
    barBCAssessments.css("width", "0%");
    barBCGrant.css("width", "0%");
    barBCRemaining.css("width", "100%");

    totalCost = parseInt(tuitionData[1].TotalCost);
    innovationGrant = parseInt(tuitionData[1].SavingsOptionAmount);
    if (!$.isNumeric(innovationGrant)) {
        innovationGrant = 0;
    }
    innovationGrantPercent = findRoundedUpPercent(innovationGrant, totalCost) + "%";

    if (innovationGrant > 0) {
        barBCGrant.css("width", innovationGrantPercent);
        $(".form__group--innovation-grant").removeClass("form__group--disabled");
    } else {
        // if Learning Innovation grant is not available, apply "disabled" modifier class to lower opacity
        $(".form__group--innovation-grant").addClass("form__group--disabled");
    }


    transferCreditsPerCredit = parseInt(tuitionData[1].PerCreditCost);
    transferCreditsLow = parseInt(tuitionData[1].TransferCreditsLowAmount);
    transferCreditsHigh = parseInt(tuitionData[1].TransferCreditsHighAmount);
    $("#transfer-credits-input").attr("min", transferCreditsLow);
    $("#transfer-credits-input").attr("max", transferCreditsHigh);
    $("#transfer-credits-input").val(transferCreditsLow);
    $("#transfer-credits-input").change();

    maxFlexChoiceCourses = parseInt(tuitionData[1].NumberOfFlexChoiceCourses);
    $("input#flexchoice-assessments-input").attr("max", maxFlexChoiceCourses);
    $("input#flexchoice-assessments-input").val(0);
    $("input#flexchoice-assessments-input").change();
    excludeCourseFees = tuitionData[1].ExcludeCourseFees;
    flexChoiceCourseCost = parseInt(tuitionData[1].PerCreditCost) * 4;
}

function populateBachelorCompleterFormData() {
    var fee = feeReduction;
    if (excludeCourseFees == "true") {
        fee = excludeCoursefeesReduction;
    }
    var transferCreditsSavings = 0;

    var transferCreditsRangeInput = $("#transfer-credits-input").val(),
        transferCreditsSavings = transferCreditsPerCredit * (transferCreditsRangeInput - transferCreditsLow),
        transferCreditPercent = findRoundedUpPercent(transferCreditsSavings, totalCost) + "%";
    barBCCredits.css("width", transferCreditPercent);

    var flexChoiceSavings = 0;

    var flexChoiceRangeInput = $("#flexchoice-assessments-input").val(),
        flexChoiceSavings = (flexChoiceRangeInput * flexChoiceCourseCost) + (flexChoiceRangeInput * fee),
        flexChoiceSavingsPercent = findRoundedUpPercent(flexChoiceSavings, totalCost) + "%";
    barBCAssessments.css("width", flexChoiceSavingsPercent);

    var finalStudentCost = totalCost - innovationGrant - transferCreditsSavings - flexChoiceSavings;
    $("#finalStudentCost, #estimatedCostBCE").text("$" + commaSeparateNumber(finalStudentCost));

    var finalCostSavings = innovationGrant + transferCreditsSavings + flexChoiceSavings;
    $("#estimatedSavingsBCE").text("$" + commaSeparateNumber(finalCostSavings));

    if (resultsHidden) {
        $(".bachelor-completer-estimator__results").fadeIn("fast");
        resultsHidden = false;
    }
}

function getDataFromTuitionEstimator() {
    var webServiceUrl = "http://www.rasmussen.edu";
    if (window.location.hostname.indexOf("programs.") == -1) {
        webServiceUrl = "http://rasmussenedu.collegiseducation.com/";
    }

    if ($("#bachelorCompleterForm").valid()) {
        var zip = $("#bachelorCompleterZip").val();
        var program = $("#bachelorCompleterProgram").val();
        var degree = "bachelors";
        $.getJSON(webServiceUrl + '/tuitionestimator/gettuitiondata/' + zip + "-" + program + "-" + degree + '/').done(function (data) {
            tuitionData = data;
            loadBachelorCompleterGlobalVariables();
            populateBachelorCompleterFormData();
        });
    }
}

function checkCurrentValueAgainstMaxValueAndChangeStepIfNecessary(rangeInput) {
    var range = $(rangeInput);
    var defaultStep = 4;
    var currentRangeValue = Number(range.val());
    var maxRangeValue = Number(range.prop("max"));
    if (currentRangeValue == maxRangeValue) {
        return;
    }
    var minRangeValue = Number(range.prop("min"));
    var remainderOfCurrentPositionAndStep = (currentRangeValue - minRangeValue) % defaultStep;
    if (remainderOfCurrentPositionAndStep > 1) {
        range.val(currentRangeValue + (defaultStep - remainderOfCurrentPositionAndStep));
    } else {
        range.val(currentRangeValue - remainderOfCurrentPositionAndStep);
    }
    if (remainderOfCurrentPositionAndStep != 0) {
        range.change();
    }
}

$(document).ready(function () {
    if ("undefined" !== typeof tuitionSchoolOfsAndPrograms && tuitionSchoolOfsAndPrograms != null) // only run on pages with the tuition estimator on it
    {
        loadProgramsForBachelorCompleter($("#bachelorCompleterSchool option:selected").val() + "|" + $("#bachelorCompleterSchool option:selected").text());

        $("#bachelorCompleterSchool").on("change", function () {
            loadProgramsForBachelorCompleter($("#bachelorCompleterSchool option:selected").val() + "|" + $("#bachelorCompleterSchool option:selected").text());
        });

        $("#bachelorCompleterSubmit").on("click", function () {
            getDataFromTuitionEstimator();
        });

        $("#transfer-credits-input").on("change", function () {
            checkCurrentValueAgainstMaxValueAndChangeStepIfNecessary(this);
            populateBachelorCompleterFormData();
        });

        $("#flexchoice-assessments-input").on("change", function () {
            populateBachelorCompleterFormData();
        });
        $("#bachelorCompleterForm").validate({
            errorClass: "form__label--error",
            ignore: "#flexchoice-assessments-input, #transfer-credits-input"
        });

        $("#bachelorCompleterForm").on("submit", function(e) {
            e.preventDefault();
            getDataFromTuitionEstimator();
        });

        $("#bachelorCompleterZip").on("keydown", function (e) {
            if (e.which === 9) {
                e.preventDefault();
                $(this).blur();
                $("#bachelorCompleterSubmit").focus();
                getDataFromTuitionEstimator();
            }
        });

    }
});
