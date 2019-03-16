var letters = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ"
var solutions=['czas to pieniądz', 'baba z wozu koniom lżej', 'cel uświęca środki'];
var pickedSolution ="";
var hiddenSolution="";
var mistakes = -1;

function start()
{   
    getRandomSolution();
    var divContent = "";
    for (var i=0; i<letters.length; i++)
        {
            divContent += '<div class="letter" id="l' + i + '" onClick="check('+i+')">' + letters.charAt(i) +'</div>';
        }
    var element = document.getElementById('alfabet');
    element.innerHTML = divContent;
    
    var letterDivs = document.getElementsByClassName("letter"); 
    for(i=0; i<letterDivs.length; i++)
        {
            letterDivs[i].onmouseover = function()
            {
                this.style.height = "38px";
                this.style.width = "38px";
                this.style.border = "5px solid white";
                this.style.cursor ="pointer";
            }
            
            letterDivs[i].onmouseout = function()
            {
                this.style.height = "40px";
                this.style.width = "40px";
                this.style.border = "3px solid white";
            }

        }
}

function getRandomSolution()
{
    var solutionDiv = document.getElementById('solution');
    var index = Math.floor(Math.random() * solutions.length); //losowanie indeksu hasła z tablicy solutions
    pickedSolution = solutions[index];

    for(i=0; i<pickedSolution.length; i++)
        {
            if(pickedSolution.charAt(i) == ' ')
                hiddenSolution+=' ';
            else
                hiddenSolution += '-';
        }

    solutionDiv.innerHTML = "Odgadnij przysłowię...<br/>" + hiddenSolution;
}

function updateSolution()
{
    var solutionDiv = document.getElementById('solution');
    solutionDiv.innerHTML = "Odgadnij przysłowię...<br/>" + hiddenSolution;
}

function check(nr)
{
    pickedSolution = pickedSolution.toUpperCase(); 
    var isInSolution = false;
    for(i=0; i<pickedSolution.length;i++)
        {
            if(pickedSolution.charAt(i) == letters.charAt(nr))
                {
                    isInSolution = true;
                    var okSound = new Audio("pop.wav");
                    okSound.play();
                    var letterDiv = document.getElementById("l" + nr);
                
                    letterDiv.style.backgroundColor = ("green");
                    letterDiv.onclick ="";
                    document.getElementById("l" + nr).onmouseover = function()
                    {
                        this.style.height = "40px";
                        this.style.width="40px";
                        this.style.border="border: 3px solid white";
                        this.style.cursor="default";
                    }
                    
                    reveal(i, pickedSolution.charAt(i));
                    
                }
        } 
    
    if(!isInSolution)
        {
            mistakes++;
            var hammerSound = new Audio("ham.wav");
            hammerSound.play();
            var hangmanDiv = document.getElementById("hangman");
            hangmanDiv.innerHTML = '<img src="img/p' +mistakes+'.png" height="500">';
            var letterDiv = document.getElementById("l" + nr);
            letterDiv.style.backgroundColor ="red";
            letterDiv.onclick ="";
            if(mistakes==7)
                playerLost();
        }
    else
        {
            var won = true;
            for(i=0; i<hiddenSolution.length; i++)
                {
                    if(hiddenSolution.charAt(i)=='-')
                        won = false;
                }
            if(won)
                playerWon();
                
        }
}

function reveal(nr, newLetter)
{
    var updatedSolution = hiddenSolution.substr(0, nr) + newLetter + hiddenSolution.substr(nr+1);
    hiddenSolution = updatedSolution;
    updateSolution();
}

function playerLost()
{
    var defeat = 'Przegrałeś! Poprawna odpowiedź to: "' + pickedSolution + '" <br/>';
    var resetButton = '<input type="button" id="resetButton" onclick="resetGame()" value="SPRÓBUJ JESZCZE RAZ"/>'
    var solutionDiv = document.getElementById('solution');
    solutionDiv.innerHTML = defeat + resetButton;
}

function playerWon()
{
    var victory = 'Gratulację! Udało Ci się wygrać!'
    var resetButton = '<input type="button" id="resetButton" onclick="resetGame()" value="ZAGRAJ JESZCZE RAZ"/>'
    var solutionDiv = document.getElementById('solution');
    solutionDiv.innerHTML = victory + resetButton;
}

function resetGame()
{
    location.reload();
}

window.onload = start;