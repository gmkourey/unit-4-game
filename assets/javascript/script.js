function Players(name, health, attack, cAttack) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.cAttack = cAttack;
}
var player1 = new Players("Tommy", 100, 10, 15);
var player2 = new Players("Chuckie", 120, 15, 10);
var player3 = new Players("Phil", 110, 12, 20);
var player4 = new Players("Lil", 130, 20, 15);
var arrayPlayers = [player1, player2, player3, player4];
var playerId;
var defenderId;
var playerAttackPower;
var playerHealth;
//Create players function
function createPlayers(player, index) {
    var playerCard = $("<div>");
    playerCard.attr("class", "player-cards");
    playerCard.attr("id", "player" + (index+1));
    playerCard.attr("data-name", player.name);
    playerCard.attr("data-health", player.health);
    playerCard.attr("data-attack", player.attack);
    playerCard.attr("data-cAttack", player.cAttack);
    playerCard.html('<h2>' + player.name + '</h2>' + '<h4 id="health-points"> Health Points: ' + player.health + '</h4>' + 
    '<h4>Attack Power: ' + player.attack + '</h4>' + '<h4>Counter Attack Power: ' + player.cAttack + '</h4>');
    $("#players").append(playerCard);
}
//Loop for creating players
for(var i = 0; i < arrayPlayers.length; i++) {
    createPlayers(arrayPlayers[i], i);
}
$(".player-cards").on("click", function() {
    console.log("I've been clicked!");
    //If statment created to make sure they don't move more than one player
    if($("#chosen-player").children().length !==1) {
        //Get id of chosen player
        playerId = $(this).attr('id');
        //Move chosen player to chosen player div
        $("#" + playerId).detach().appendTo("#chosen-player");
        //Move all other players to defenders div
        $("#players").children().detach().appendTo("#defenders");
        //Give new-defenders class to defenders
        $("#defenders").children().addClass('new-defenders');
        playerAttackPower = $("#" + playerId).attr('data-attack');
        $('#choose-player').css('display', 'none');
    }
    $('.new-defenders').on("click", function() {
        //Make sure multiple defenders can't be chosen
        if($("#chosen-defender").children().length !==1) {
        //Get id of chosen defender
        defenderId = $(this).attr('id');
        //Move selection to chosen defender
        $("#" + defenderId).detach().appendTo("#chosen-defender");
        $('#attack-button').css("display", "block");
    }
});
});
 
    $("#attack-button").on("click", function() {
        console.log('attack!')
        playerHealth = $("#" + playerId).attr('data-health');
        var defenderCounterAttack = $("#" + defenderId).attr('data-cAttack');
        var defenderHealth = $("#" + defenderId).attr('data-health');
        $("#" + defenderId).attr('data-health',defenderHealth - playerAttackPower);
        $("#" + playerId).attr('data-health',playerHealth - defenderCounterAttack);
        console.log("Defender Health: " + $("#" + defenderId).attr('data-health'));
        console.log("Player Health: " + $("#" + playerId).attr('data-health'));
        if($("#" + defenderId).attr('data-health') <= 0) {
            $("#" + defenderId).detach();
            console.log("choose another defender!");
            $('#attack-button').css("display", "none"); 

            
        }
        playerAttackPower *= 2;
        console.log("New Player Attack Power: " + playerAttackPower);
    });


 

