$(document).ready(function () {
    $('#today').text(moment().format('dddd MMMM Do'));       //show's today's date at the top of the page.

    getLSPlans();          //function placeholders for loading plans & timeblock colors from local storage.
    dynamicColor();

    function getLSPlans() {             //loads the plans from local storage.
        var plans;
        if (localStorage.getItem("dayPlans") === null) {
            plans = [];
        } else {
            plans = JSON.parse(localStorage.getItem("dayPlans"));
        }
        $.each(plans, function (index, item) {
            $('#' + item.time).children('.description').append(item.plan);  //adds data from local storage to the timeblocks
        });
    }


    function storePlans(plan) {    //stores new plans into local storage.
        var newPlans;
        if (localStorage.getItem("dayPlans") === null) {
            newPlans = [plan];
        } else {
            newPlans = JSON.parse(localStorage.getItem("dayPlans"));
            for (var i = 0; i < newPlans.length; i++) { //loop to remove existing data from local storage, to override.
                if (newPlans[i].time === plan.time) {
                    newPlans.splice(i, 1);
                }
            }
            newPlans.push(plan);
        }
        localStorage.setItem("dayPlans", JSON.stringify(newPlans));
    }





    function dynamicColor() {     //adds dynamic coloring to the time blocks, according to time of day.
        var timeOfDay = moment().hour();
        var timeSlots = [9, 10, 11, 12, 13, 14, 15, 16, 17];

        $.each(timeSlots, function (index, slot) {

            var hrNum = slot < 13 ? slot : slot - 12;

            if ((timeOfDay > slot)) {
                $('#hour-' + hrNum).children('.description').addClass('past');
            } else if (timeOfDay < slot) {
                $('#hour-' + hrNum).children('.description').addClass('future');
            } else {
                $('#hour-' + hrNum).children('.description').addClass('present');
            }
        });
    }



    $('.saveBtn').on('click', function () {           //saves new plans to the planner.
        var planEntry = {
            plan: $(this).siblings('.description').val().trim(),
            time: $(this).parent().attr('id') //this is the hour itself
        };
        var container = $(this).siblings('.hour');

        storePlans(planEntry);
  
    });

});