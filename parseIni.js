window.onload = function(){
  /*******************
  
	Met deze code lezen wij een zogeheten INI-bestand in.
	Dit bestand gaan wij middels reguliere expressies verwerken
	en wegschrijven naar JavaScript objecten in een array.
  
  *******************/

  let testFile = `# Deze file bevat informatie over bordspellen
[Catan]
Spelers = 2-4
Categorie = Strategie / Familie
Strategiefactor = 2
Geluksfactor = 4

[Cosmic Encounter]
Spelers = 2-5
Categorie = Space / Strategie
Geluksfactor = 3

[Terra Mystica]
Spelers = 2 - 4
Categorie = Worker placement / Strategie
Geluksfactor = 1`;
  
  let regels = testFile.split(/\r\n|\n|\r/); // windows | Unix/macOS | macOS
  let games = [];
  const titelRegExp = new RegExp(/^\[.*\]$/);
  const keyValueRegExp = new RegExp(/^(?<key>.*)[ ]*=[ ]*(?<value>.*)$/);
  
  regels.forEach(
	(regel, index) => {
		console.log(`Huidige regel: ***${regel}***`);
	
		if (titelRegExp.test(regel) || index===regels.length-1) {  // de OR is er om de laatste game ook mee te nemen
			if (typeof currentGame !== 'undefined') {
				games.push(currentGame);
			}
			
			if (index!==regels.length-1){
				currentGame = {
					name: regel.replace(/\[(?<naam>.*)\]/,'$<naam>')
				}
			}
			
		}
		else if (keyValueRegExp.test(regel)){
			if (typeof currentGame !== 'undefined'){
				currentGame[regel.replace(keyValueRegExp, '$<key>')] = regel.replace(keyValueRegExp, '$<value>');
			}
		}
	}
  );
  
  console.dir(games);
}