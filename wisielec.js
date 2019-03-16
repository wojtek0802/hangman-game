var letters = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ"
var przyslowia=["czas leczy rany", "baba z wozu koniom lżej","bez pracy nie ma kołaczy", "co nagle to po diable", "fortuna kołem się toczy"];
var informatyka=["programowanie", "system operacyjny", "baza danych", "klawiatura"];
var pickedSolution ="";
var hiddenSolution="";
var mistakes = -1;
var currentCategory = przyslowia;

function start()
{   
    currentCategory = przyslowia;
    getRandomSolution(currentCategory);
    updateSolution();
    generateAlfabet();
    setHoverAtribiuttes();
    
}

function setHoverAtribiuttes() //funkcja ustawia w javaScripcie co ma się stać po najechaniu na litery myszką
{
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

function getRandomSolution(category)
{
    
    var index = Math.floor(Math.random() * category.length); //losowanie indeksu hasła z tablicy solutions  
    pickedSolution = category[index];
    hiddenSolution="";
    for(i=0; i<pickedSolution.length; i++)
        {
            if(pickedSolution.charAt(i) == ' ')
                hiddenSolution+=' ';
            else
                hiddenSolution += '-';
        }

    updateSolution();
    generateAlfabet();
}

function updateSolution()
{
    var chosenCategory = "";
    switch(currentCategory)
        {
            case przyslowia:
                chosenCategory = "PRZYSŁOWIA";
                break;
            case informatyka:
                chosenCategory = "INFORMATYKA"
                break;
            default: break;
        }
    var solutionDiv = document.getElementById('solution');
    solutionDiv.innerHTML = "Kategoria: "+ chosenCategory + "<br/>"+ hiddenSolution;
}

function generateAlfabet()
{
    var divContent = "";
    for (var i=0; i<letters.length; i++)
        {
            divContent += '<div class="letter" id="l' + i + '" onClick="check('+i+')">' + letters.charAt(i) +'</div>';
        }
    var element = document.getElementById('alfabet');
    element.innerHTML = divContent;   
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
    var resetButton = '<input type="button" class="myButton" onclick="resetGame(currentCategory)" value="SPRÓBUJ JESZCZE RAZ"/>'
    var solutionDiv = document.getElementById('solution');
    solutionDiv.innerHTML = defeat;
    document.getElementById('buttons').innerHTML += resetButton;
}

function playerWon()
{
    var victory = 'Gratulację! Udało Ci się wygrać!'
    var resetButton = '<input type="button" class="myButton" onclick="resetGame(currentCategory)" value="ZAGRAJ JESZCZE RAZ"/>'
    var solutionDiv = document.getElementById('solution');
    solutionDiv.innerHTML = victory;
    document.getElementById('buttons').innerHTML += resetButton;
}

function resetGame(category)
{
    pickedSolution = "";
    hiddenSolution = "";
    mistakes = -1;
    var hangmanDiv = document.getElementById("hangman");
    hangmanDiv.innerHTML = '<img src="" height="500">';
    getRandomSolution(category);
    setHoverAtribiuttes();
    var buttonArea = document.getElementById("buttons");
    buttonArea.innerHTML = '<input type="button" class="myButton" onclick="changeCategory()" value="ZMIEŃ KATEGORIE"/>';
    
}

function changeCategory()
{
    var listArea = document.getElementById("buttons");
    listArea.innerHTML = '<input type="button" class="myButton" onclick="chooseCategory(informatyka)" value="INFORMATYKA"/>';
    listArea.innerHTML += '<input type="button" class="myButton" onclick="chooseCategory(przyslowia)" value="PRZYSŁOWIA"/>';
}

function chooseCategory(category)
{
    currentCategory = category;
    resetGame(category);
}

window.onload = start;