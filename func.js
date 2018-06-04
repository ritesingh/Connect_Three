var player1=prompt("Player One: Enter Your Name,You will be Red");
var player1color='rgb(10, 10, 255)';

var player2=prompt("Player Two:ENter Your Name, you will be Blue");
var player2color='rgb(255, 50, 10)';

var game_on=true;
var table=$('table tr');

function reportwin(rowNum,colNum){
    console.log("You won starting at this row,col");
    console.log(rowNum);
    console.log(colNum);

}

function changecolor(rowindex,colindex,color){
    return table.eq(rowindex).find('td').eq(colindex).find('button').css('background-color',color);
}

function returncolor(rowindex,colindex){
    return table.eq(rowindex).find('td').eq(colindex).find('button').css('background-color');
}

function checkbottom(colindex){
    var colorreport=returncolor(5,colindex);
    for(var row=5;row>-1;row--){
        colorreport=returncolor(row,colindex);
        if(colorreport==='rgb(128, 128, 128)'){
            return row;
        }
    }
}

function colormatchcheck(one,two,three){
    return (one===two&& one===three&&one!=='rgb(128, 128, 128)'&&one!==undefined);

}

function horizontalwincheck(){
    for(var row=0;row<6;row++){
        for(var col=0;col<4;col++){
            if(colormatchcheck(returncolor(row,col),returncolor(row,col+1),returncolor(row,col+2)))
            {
                console.log('horiz');
                reportwin(row,col);
                return true;
            }else{
                continue;
            }
        }
    }
}

function verticalwincheck(){
    for(var col=0;col<7;col++){
        for(var row=0;row<4;row++){
            if(colormatchcheck(returncolor(row,col),returncolor(row+1,col),returncolor(row+2,col)))
            {
                console.log('vertical');
                reportwin(row,col);
                return true;
            }else{
                continue;
            }
        }
    }
}

function diagonalwincheck(){
    for(var col=0;col<5;col++){
        for(var row=0;row<7;row++){
            if(colormatchcheck(returncolor(row,col),returncolor(row+1,col+1),returncolor(row+2,col+2),returncolor(row+3,col+3)))
            {
                console.log('diag');
                reportwin(row,col);
                return true;
            }else if(colormatchcheck(returncolor(row,col),returncolor(row-1,col+1),returncolor(row-2,col+2),returncolor(row-3,col+2)))
            {
                console.log('diag');
                reportwin(row,col);
                return true;
            }else{
                continue;
            }
        }
    }
}



var currentplayer=1;
var currentname=player1;
var currentcolor=player1color;

$('h3').text(player1+" it is your turn , pick a column to drop in!");

$('.board button').on('click',function(){
var col=$(this).closest('td').index();
var bottomavail=checkbottom(col);
changecolor(bottomavail,col,currentcolor);

if(horizontalwincheck()||verticalwincheck()||diagonalwincheck()){
    $('h1').text(currentname+" you have won!");
    $('h3').fadeout('fast');
    $('h2').fadeout('fast');

}
currentplayer=currentplayer*-1;
if(currentplayer===1){
    currentname=player1;
    $('h3').text(currentname+" its your turn.");
    currentcolor=player1color;
}
else{
    currentname=player2;
    $('h3').text(currentname+" its your turn.");
    currentcolor=player2color;
}
})

