$(document).ready(function() {

function Players(name, image, health, attack, cAttack) {
    this.name = name;
    this.image = image;
    this.health = health;
    this.attack = attack;
    this.cAttack = cAttack;
}
var player1 = new Players("Bruce Willis", "assets/images/bruce-willis.jpg", 110, 20, 15);
var player2 = new Players("The Rock", "assets/images/rock.jpg", 125, 15, 10);
var player3 = new Players("Bruce Lee", "assets/images/bruce-lee.jpg", 110, 18, 20);
var player4 = new Players("Jackie Chan", "assets/images/jackie-chan.jpg", 130, 12, 25);
var arrayPlayers = [player1, player2, player3, player4];
var playerId;
var defenderId;
var playerAttackPower;
var playerHealth;
var playerAttackInc = 0;
//Create players function
function createPlayers(player, index) {
    var playerCard = $("<div>");
    playerCard.attr("class", "player-cards");
    playerCard.attr("id", "player" + (index+1));
    playerCard.attr("data-name", player.name);
    playerCard.attr("data-health", player.health);
    playerCard.attr("data-attack", player.attack);
    playerCard.attr("data-cAttack", player.cAttack);
    playerCard.html('<h2>' + player.name + '</h2>' + '<img src="' + player.image +'"/>' + '<h4 id="health-points"> Health Points: ' + player.health + '</h4>' + 
    '<h4>Attack Power: ' + player.attack + '</h4>' + '<h4>Counter Attack Power: ' + player.cAttack + '</h4>');
    $("#players").append(playerCard);
}
function restart() {
    $('#choose-player').empty();
    $('.overlay').css('display', 'none');
    $('#choose-player').css('display', 'block');
    $('#players').css('display', 'block');
    for(var i = 0; i < arrayPlayers.length; i++) {
        createPlayers(arrayPlayers[i], i);
    }
    $('#chosen-player').empty();
    $('#chosen-player').css('display', 'none')
    $('#defenders').empty();
    $('#defenders').css('display', 'none')
    $('#attack-button').css('display', 'none');
}
//Loop for creating players
for(var i = 0; i < arrayPlayers.length; i++) {
    createPlayers(arrayPlayers[i], i);
}
$(".player-cards").on("click", function() {

    //If statment created to make sure they don't move more than one player
    if($("#chosen-player").children().length !==2) {
        //Create new header
        
        var newHeader = $('<h2>');
        //Write text for chosen player
        newHeader.text('Your Chosen Player');
        //Write class for chosen player
        newHeader.attr('class', 'chosen-player-header');
        //Add to chosen player div
        $(newHeader).appendTo('#chosen-player');
        //Create new header
        var newHeader = $('<h2>');
        //Write text for defenders
        newHeader.text('Defenders');
        //Add id
        newHeader.attr('id', 'defender-header'); 
        //Append new header to defenders
        $(newHeader).appendTo('#defenders');
        var newHeader = $('<h2>');
        //Write text for defenders
        newHeader.text('Chosen Defender');
        //Add id
        newHeader.attr('id', 'chosen-defender-header'); 
        //Append new header to defenders
        $(newHeader).appendTo('#chosen-defender');
        $('#chosen-player').css('display', 'inline-block');
        $('#chosen-player').css('float', 'left');
        //Get id of chosen player
        playerId = $(this).attr('id');
        //Move chosen player to chosen player div
        $("#" + playerId).detach().appendTo("#chosen-player");
        //Move all other players to defenders div
        $("#players").children().detach().appendTo("#defenders");
        //Give new-defenders class to defenders
        $('#players').css('display','none');
        $("#" + playerId).css('width', '250px');
        $("#" + playerId).css('margin', '0 auto');
        $("#" + playerId).css('width', '250px');
        $("#" + playerId).css('float', 'none');
        $('#choose-player').css('display','none');
        $("#defenders").children().addClass('new-defenders');
        $('#defenders').css('display', 'inline-block');
        playerAttackPower = parseInt($("#" + playerId).attr('data-attack'));
        $('.new-defenders').css('width', '250px');
        $('#chosen-defender-header').css('display', 'block');
        $('#defenders').children().css('float','none');
        $('#defenders').children().css('display','inline-block');
        $('#defenders h2:nth-child(1)').css('display','block');
        $('#chosen-defender').css('display', 'block');

    }
    $('.new-defenders').on("click", function() {
        //Make sure multiple defenders can't be chosen
        if($("#chosen-defender").children().length !==2) {
        //Get id of chosen defender
        $('#attack-button').css('display', 'block');
        defenderId = $(this).attr('id');
        //Move selection to chosen defender
        $("#" + defenderId).css('float', 'none');
        $("#" + defenderId).css('margin', '0 auto');
        $("#" + defenderId).css('display', 'block');
        $("#" + defenderId).detach().appendTo("#chosen-defender");
        $('#attack-button').css("display", "block");
    }
});
});
 
    $("#attack-button").on("click", function() {
        //Log players health into playerHealth
        playerHealth = $("#" + playerId).attr('data-health');
        //Log Defenders Counter Attack
        var defenderCounterAttack = $("#" + defenderId).attr('data-cAttack');
        //Log Defenders Health
        var defenderHealth = $("#" + defenderId).attr('data-health');
        //Update defenders health against player's attack power
        $("#" + defenderId).attr('data-health',defenderHealth - playerAttackPower);
        //Update player's health against defender's counter attack power
        $("#" + playerId).attr('data-health',playerHealth - defenderCounterAttack);
        //Update player health variable, defender health variable and new counter attack variable
        playerHealth -= defenderCounterAttack;
        defenderHealth -= playerAttackPower;
        if (playerAttackInc === 0) {
            playerAttackInc = playerAttackPower;
        }
        playerAttackPower += playerAttackInc;

        $('#' + playerId + ' h4:nth-child(3)').text('Health Points: ' + playerHealth);
        $('#' + defenderId + ' h4:nth-child(3)').text('Health Points: ' + defenderHealth);
        $('#' + playerId + ' h4:nth-child(4)').text('Attack Power: ' + playerAttackPower);
        if($("#" + playerId).attr('data-health') <= 50) {
            $("#" + playerId).css('color', 'orange');
            $("#" + playerId).css('border-color', 'orange');
        }
        if($("#" + playerId).attr('data-health') <= 25) {
            $("#" + playerId).css('color', 'red');
            $("#" + playerId).css('border-color', 'red');
        }
        if($("#" + defenderId).attr('data-health') <= 50) {
            $("#" + defenderId).css('color', 'orange');
            $("#" + defenderId).css('border-color', 'orange');
        }
        if($("#" + defenderId).attr('data-health') <= 25) {
            $("#" + defenderId).css('color', 'red');
            $("#" + defenderId).css('border-color', 'red');
        }
        if($("#defenders").children().length === 1) {
            $('#defenders').css('display', 'none');
        }
        //Remove defender from playing field if they have <= 0 health
        if($("#" + defenderId).attr('data-health') <= 0) {
            $("#" + defenderId).detach();
            $('#attack-button').css("display", "none"); 
        }
        
        if($("#chosen-defender").children().length === 1 && $("#defenders").children().length === 1) {
            $('#chosen-defender').remove()
            var newHeader = $('<h2>');
            //Write text for defenders
            newHeader.text('You Won!!');
            //Add id
            newHeader.attr('id', 'win-lose-header'); 
            //Append new header to defenders
            $(newHeader).appendTo('#chosen-defender');
            $('.overlay').css('display', 'block');
            var newHeader = $('<h2>');
            //Write text for defenders
            newHeader.text('You Won!!');
            //Add id
            newHeader.attr('id', 'win-lose-header'); 
            //Append new header to defenders
            $(newHeader).appendTo('#overlay-content');
            var newButton = $('<button>');
            newButton.text('Play Again');
            newButton.attr('class', 'btn btn-primary restart');
            newButton.attr('onclick', 'window.location.reload()');
            $(newButton).appendTo('#overlay-content');
    } else if($('#' + playerId).attr('data-health') <= 0) {
        $('#chosen-defender').remove()
            $('.overlay').css('display', 'block');
            var newHeader = $('<h2>');
            //Write text for defenders
            newHeader.text('You Lose!!');
            //Add id
            newHeader.attr('id', 'win-lose-header'); 
            //Append new header to defenders
            $(newHeader).appendTo('#overlay-content');
            $('.overlay').css('height', '100%');
            var newButton = $('<button>');
            newButton.text('Play Again');
            newButton.attr('class', 'btn btn-primary restart');
            newButton.attr('onclick', 'window.location.reload()');
            $(newButton).appendTo('#overlay-content');
    }
        // if($('#' + playerId).attr('data-health') <= 0) {
        //     $('#chosen-defender').remove()
        //     $('.overlay').css('display', 'block');
        //     var newHeader = $('<h2>');
        //     //Write text for defenders
        //     newHeader.text('You Lose!!');
        //     //Add id
        //     newHeader.attr('id', 'win-lose-header'); 
        //     //Append new header to defenders
        //     $(newHeader).appendTo('#overlay-content');
        //     $('.overlay').css('height', '100%');
        //     var newButton = $('<button>');
        //     newButton.text('Play Again');
        //     newButton.attr('class', 'btn btn-primary restart');
        //     newButton.attr('onclick', 'window.location.reload()');
        //     $(newButton).appendTo('#overlay-content');
        
        // }
        

    });
});

 

