//Function to sort the json data by lowest to highest APR value
function sortJsonAPR(a, b) {
    return a.apr > b.apr ? 1 : -1;
}

//Begins when the page has finished loading, makes sure json data can be loaded
$(document).ready(function() {

    var index = 1; //Iterates to give unique ID's and classes to certain elements

    $.getJSON('cards.json', function(data) {
        data = $(data).sort(sortJsonAPR);
        $.each(data, function(i, creditCard) {
            //Inserts credit card name and apr into accordion header
            $('#accordion').append('<h3 id="header' + index + '"><b><span class="creditCard-name">' + creditCard.name +
            '</span><span class="apr">' + creditCard.apr + '% APR</span></b></h3>');
            //Inserts credit card image, information an cashback into accordion body
            $('#header' + index).after('<div class="accordionContent"><img src="/img/' +
                creditCard.code.toLowerCase() + '.png"/>' +
                '<p class="information">' + creditCard.information + '</p>' +
                '<p class="cashback" id="cashback-sign' + index + '">Cashback</p>' +
                '<p class="cashbackValue" id="cashback-value' + index + '">£' + creditCard.cashback + '</p></div>');

                index++;
        });
        $(function() {
            //Initializes accordion
            $("#accordion").accordion();
            //Defines accordion custom header icons for default and active state (images from css source)
            $("#accordion").accordion("option", "icons", {
                'header': 'defaultIcon',
                'activeHeader': 'selectedIcon'
            });
        });
    });

    // Side tab functionality
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var isOpen = false;

    function slideMenuOpen() {
        $('.container').animate({left: "+=300px"}, 300);
        $('#menu-div').animate({left: "+=0px"}, 300);
        return (isOpen = true);
    }

    function slideMenuClose() {
        $('.container').animate({left: "-=300px"}, 300);
        $('#menu-div').animate({left: "-=0px"}, 300);
        return (isOpen = false);
    }

    $('#menu-div').hide();
    $('nav').css({height: windowHeight});


    $('#menu-button').click(function() {
        if (isOpen) {
            slideMenuClose();
        } else {
            slideMenuOpen();
        }
    });

    $(window).on('resize', function() {
        if (isOpen) {
        $('.container').animate({left: "-=300px"}, 300);
        $('#menu-div').animate({left: "-=0px"}, 300);
        $('#menu-div').hide();
        isOpen = false;
        }
    });
});
