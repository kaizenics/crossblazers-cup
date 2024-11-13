export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export const triviaQuestions: TriviaQuestion[] = [
  {
    question: "What is the national language of the Philippines?",
    options: ["English", "Filipino", "Cebuano", "Tagalog"],
    correctAnswer: 1,
  },
  {
    question: "Who was the first Philippine President?",
    options: ["Jose Rizal", "Emilio Aguinaldo", "Manuel Quezon", "Ramon Magsaysay"],
    correctAnswer: 1,
  },
  {
    question: "Which province is home to the famous Mayon Volcano?",
    options: ["Sorsogon", "Camarines Sur", "Albay", "Catanduanes"],
    correctAnswer: 2,
  },
  {
    question: "What is the highest mountain in the Philippines?",
    options: ["Mt. Pulag", "Mt. Apo", "Mt. Mayon", "Mt. Pinatubo"],
    correctAnswer: 1,
  },
  {
    question: "What is the largest island in the Philippines?",
    options: ["Mindanao", "Luzon", "Palawan", "Samar"],
    correctAnswer: 1,
  },
  {
    question: "What is the national flower of the Philippines?",
    options: ["Rose", "Sampaguita", "Gumamela", "Orchid"],
    correctAnswer: 1,
  },
  {
    question: "Which Filipino Folk Tale features a legendary bird with a magical golden feather?",
    options: ["Ibong Adarna", "Maria Makiling", "Alamat ng Pinya", "Juan Tamad"],
    correctAnswer: 0,
  },
  {
    question: "Who is the National Hero of the Philippines?",
    options: ["Andres Bonifacio", "Dr. Jose Rizal", "Emilio Aguinaldo", "Lapu-Lapu"],
    correctAnswer: 1,
  },
  {
    question: "Which Filipino boxer is known as 'The Pacman'?",
    options: ["Manny Pacquiao", "Flash Elorde", "Nonito Donaire", "Jerwin Ancajas"],
    correctAnswer: 0,
  },
  {
    question: "Who was the first Filipino to win a Grammy Award?",
    options: ["Sarah Geronimo", "Lea Salonga", "Gary Valenciano", "Martin Nievera"],
    correctAnswer: 1,
  },
  {
    question: "Who is the current President of the Philippines?",
    options: ["Rodrigo Duterte", "Ferdinand Marcos Jr.", "Leni Robredo", "Bongbong Marcos"],
    correctAnswer: 1,
  },
  {
    question: "Who was the first man created by God?",
    options: ["Noah", "Abraham", "Adam", "Moses"],
    correctAnswer: 2,
  },
  {
    question: "In what city was Jesus born?",
    options: ["Jerusalem", "Nazareth", "Bethlehem", "Rome"],
    correctAnswer: 2,
  },
  {
    question: "Who was swallowed by a great fish or whale?",
    options: ["Moses", "Jonah", "Noah", "David"],
    correctAnswer: 1,
  },
  {
    question: "What was the first miracle Jesus performed?",
    options: [
      "Walking on water",
      "Feeding the 5000",
      "Raising Lazarus",
      "Turning water into wine at the wedding in Cana"
    ],
    correctAnswer: 3,
  },
  // ... Adding more questions following the same pattern
  {
    question: "What is the longest book in the Bible?",
    options: ["Genesis", "Psalms", "Exodus", "Revelation"],
    correctAnswer: 1,
  },
  {
    question: "In what galaxy is our solar system located?",
    options: ["Andromeda", "Milky Way", "Triangulum", "Sombrero"],
    correctAnswer: 1,
  },
  {
    question: "In what year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2,
  },
  {
    question: "What is the name of the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"],
    correctAnswer: 3,
  },
  {
    question: "Which planet is known as the 'Blue Planet'?",
    options: ["Mars", "Venus", "Earth", "Neptune"],
    correctAnswer: 2,
  },
  {
    question: "Who was the longest-reigning monarch in British History?",
    options: ["Queen Victoria", "Queen Elizabeth II", "King George III", "King Henry VIII"],
    correctAnswer: 1,
  },
  {
    question: "What does the acronym KKK stands for in the Philippines?",
    options: [
      "Kataastaasang kagalanggalangang Katipunan ng mga anak ng katipunan",
      "Katipunan ng mga Katoliko sa Kapuluan",
      "Kataastaasan Katipunan ng mga Katulong",
      "Kataastaasan Katipunan ng mga Kayumanggi"
    ],
    correctAnswer: 0,
  },
  {
    question: "What are the official languages in the Philippines?",
    options: [
      "Filipino and English",
      "Tagalog and Cebuano",
      "English and Spanish",
      "Filipino and Spanish"
    ],
    correctAnswer: 0,
  },
  {
    question: "When the Philippine flag is flying red side up, what state is the country in?",
    options: ["Peace", "War", "Celebration", "Mourning"],
    correctAnswer: 1,
  },
  {
    question: "Which country formed ASEAN with Malaysia, Indonesia, Thailand, and Singapore in 1967?",
    options: ["Vietnam", "Philippines", "Myanmar", "Brunei"],
    correctAnswer: 1,
  },
  {
    question: "Which international competition has been won by Gloria Diaz, Margie Moran, Pia Wurtzbach, and Catriona Gray?",
    options: ["Miss World", "Miss Universe", "Miss International", "Miss Earth"],
    correctAnswer: 1,
  },
  {
    question: "The Philippines was named after King Philip II of which country?",
    options: ["Portugal", "Spain", "France", "England"],
    correctAnswer: 1,
  },
  {
    question: "What is the English translation of 'Lupang Hinirang'?",
    options: ["Beloved Land", "Chosen Land", "Sacred Land", "Blessed Land"],
    correctAnswer: 1,
  },
  {
    question: "What is the Capital of Japan?",
    options: ["Osaka", "Kyoto", "Tokyo", "Nagoya"],
    correctAnswer: 2,
  },
  {
    question: "Which country has the most natural Lakes?",
    options: ["Russia", "United States", "Canada", "Finland"],
    correctAnswer: 2,
  },
  {
    question: "What Filipino dish is a stew marinated in soy, vinegar, and garlic?",
    options: ["Sinigang", "Adobo", "Kare-kare", "Tinola"],
    correctAnswer: 1,
  },
  {
    question: "What is the longest river in the world?",
    options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    correctAnswer: 1,
  },
  {
    question: "In which country would you find the Eiffel Tower?",
    options: ["Italy", "France", "Spain", "Germany"],
    correctAnswer: 1,
  },
  {
    question: "Which country has the largest population in the world?",
    options: ["India", "China", "United States", "Indonesia"],
    correctAnswer: 1,
  },
  {
    question: "Which Filipino fast-food brand is known for Chickenjoy?",
    options: ["McDonald's", "Jollibee", "KFC", "Mang Inasal"],
    correctAnswer: 1,
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Skin", "Brain"],
    correctAnswer: 2,
  },
  {
    question: "What is the deepest ocean in the world?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Southern Ocean"],
    correctAnswer: 2,
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "H2"],
    correctAnswer: 0,
  },
  {
    question: "What element does 'O' represent on the periodic table?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    correctAnswer: 1,
  },
  {
    question: "What 'S' title was used for the head of monarchy in the Philippines until 1986?",
    options: ["Shah", "Sultan", "Sovereign", "Supreme"],
    correctAnswer: 1,
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    correctAnswer: 2,
  },
  {
    question: "What is the smallest ocean in the world?",
    options: ["Indian Ocean", "Arctic Ocean", "Southern Ocean", "Atlantic Ocean"],
    correctAnswer: 1,
  },
  {
    question: "What mountain range separates Europe and Asia?",
    options: ["Alps", "Himalayas", "Ural Mountains", "Caucasus Mountains"],
    correctAnswer: 2,
  },
  {
    question: "What does 'www' stand for in a website address?",
    options: ["World Wide Web", "Web World Wide", "Wide World Web", "World Web Wide"],
    correctAnswer: 0,
  },
  {
    question: "Which of the three major island groups contains Panay, Negros, and Cebu?",
    options: ["Luzon", "Visayas", "Mindanao", "Palawan"],
    correctAnswer: 1,
  },
  {
    question: "How many colors are in a rainbow?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
  },
  {
    question: "In what sport would you perform a Slam dunk?",
    options: ["Volleyball", "Basketball", "Football", "Tennis"],
    correctAnswer: 1,
  },
  {
    question: "What is the tallest building in the world?",
    options: ["Shanghai Tower", "Burj Khalifa", "One World Trade Center", "Taipei 101"],
    correctAnswer: 1,
  },
  {
    question: "Who has won the most Olympic gold medals?",
    options: ["Usain Bolt", "Michael Phelps", "Carl Lewis", "Mark Spitz"],
    correctAnswer: 1,
  },
  {
    question: "What 10,000-ft. peak towers over Davao City as the highest point of the Philippines?",
    options: ["Mt. Pulag", "Mt. Apo", "Mt. Mayon", "Mt. Halcon"],
    correctAnswer: 1,
  },
  {
    question: "Who invented the telephone?",
    options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "George Westinghouse"],
    correctAnswer: 1,
  },
  {
    question: "How many bones are in the human body?",
    options: ["204", "205", "206", "207"],
    correctAnswer: 2,
  },
  {
    question: "What is the national sport of Japan?",
    options: ["Karate", "Judo", "Sumo Wrestling", "Kendo"],
    correctAnswer: 2,
  },
  {
    question: "Which country won the FIFA World Cup in 2018?",
    options: ["Brazil", "France", "Germany", "Argentina"],
    correctAnswer: 1,
  },
  {
    question: "In tennis, what is a score of zero called?",
    options: ["Zero", "Nothing", "Love", "Nil"],
    correctAnswer: 2,
  },
  {
    question: "What is the square root of 9?",
    options: ["2", "3", "4", "6"],
    correctAnswer: 1,
  },
  {
    question: "What force keeps us on the ground and gives objects weight?",
    options: ["Magnetism", "Gravity", "Friction", "Tension"],
    correctAnswer: 1,
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Fe", "Cu"],
    correctAnswer: 1,
  },
  {
    question: "Who was the first man to step on the moon?",
    options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"],
    correctAnswer: 1,
  },
  {
    question: "What is the basic unit of life in all living organisms?",
    options: ["Atom", "Cell", "Molecule", "Tissue"],
    correctAnswer: 1,
  },
  {
    question: "What is the largest land animal?",
    options: ["Elephant", "Giraffe", "Hippopotamus", "Rhinoceros"],
    correctAnswer: 0,
  },
  {
    question: "How many legs does a spider have?",
    options: ["6", "8", "10", "12"],
    correctAnswer: 1,
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
  },
  {
    question: "What is the fastest bird in the world?",
    options: ["Eagle", "Falcon", "Swift", "Peregrine Falcon"],
    correctAnswer: 3,
  },
  {
    question: "How many teeth does an adult human have?",
    options: ["28", "30", "32", "34"],
    correctAnswer: 2,
  },
  {
    question: "What is a group of lions called?",
    options: ["Pack", "Pride", "Herd", "Colony"],
    correctAnswer: 1,
  },
  {
    question: "What do pandas primarily eat?",
    options: ["Bamboo", "Eucalyptus", "Rice", "Grass"],
    correctAnswer: 0,
  },
  {
    question: "Which bird is known for mimicking sounds, including human speech?",
    options: ["Parrot", "Crow", "Eagle", "Owl"],
    correctAnswer: 0,
  },
  {
    question: "What is the chemical symbol for silver?",
    options: ["Si", "Ag", "Sr", "Au"],
    correctAnswer: 1,
  },
  {
    question: "How many days are in a year?",
    options: ["364", "365", "366", "367"],
    correctAnswer: 1,
  },
  {
    question: "What type of animal is a Komodo dragon?",
    options: ["Snake", "Lizard", "Dragon", "Amphibian"],
    correctAnswer: 1,
  },
  {
    question: "What is the term for the amount of matter in an object?",
    options: ["Weight", "Mass", "Volume", "Density"],
    correctAnswer: 1,
  },
  {
    question: "What is the most widely spoken language in the world?",
    options: ["Mandarin", "English", "Spanish", "Hindi"],
    correctAnswer: 1,
  },
  {
    question: "What is the tallest land animal?",
    options: ["Elephant", "Giraffe", "Camel", "Horse"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the HCDC School President?",
    options: [
      "Br. Noelvic S. Deloria S.C.",
      "Dr. Victor Franco",
      "Dr. Maria Santos",
      "Br. Bernard Oca"
    ],
    correctAnswer: 0,
  },
  {
    question: "Who is the first president of the USA?",
    options: ["John Adams", "George Washington", "Thomas Jefferson", "Benjamin Franklin"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the HCDC SSG-EXED President?",
    options: ["John Smith", "Arvin Jay Perez", "Michael Santos", "David Garcia"],
    correctAnswer: 1,
  },
  {
    question: "Who wrote Romeo and Juliet?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1,
  },
  {
    question: "What do cows primarily produce?",
    options: ["Water", "Milk", "Juice", "Tea"],
    correctAnswer: 1,
  },
  {
    question: "How many hearts does an octopus have?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
  },
  {
    question: "Which month has 28 days?",
    options: ["January", "February", "March", "April"],
    correctAnswer: 1,
  },
  {
    question: "Who painted 'The Starry Night'?",
    options: ["Pablo Picasso", "Vincent Van Gogh", "Claude Monet", "Salvador Dali"],
    correctAnswer: 1,
  },
  {
    question: "Who is the Greek God of the sea?",
    options: ["Zeus", "Poseidon", "Hades", "Apollo"],
    correctAnswer: 1,
  },
  {
    question: "Which famous scientist developed the theory of evolution?",
    options: ["Isaac Newton", "Charles Darwin", "Albert Einstein", "Galileo Galilei"],
    correctAnswer: 1,
  },
  {
    question: "How many degrees are in a circle?",
    options: ["180", "270", "360", "400"],
    correctAnswer: 2,
  },
  {
    question: "How many sides does a pentagon have?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 1,
  },
  {
    question: "How many milliliters are in a liter?",
    options: ["100", "500", "1,000", "2,000"],
    correctAnswer: 2,
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2,
  },
  {
    question: "Who was the king of the Greek gods?",
    options: ["Apollo", "Zeus", "Hades", "Hermes"],
    correctAnswer: 1,
  },
  {
    question: "In which country is the Great Wall located?",
    options: ["Japan", "China", "Korea", "Mongolia"],
    correctAnswer: 1,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Michelangelo", "Leonardo Da Vinci", "Raphael", "Donatello"],
    correctAnswer: 1,
  },
  {
    question: "What is the fastest land animal?",
    options: ["Lion", "Cheetah", "Tiger", "Leopard"],
    correctAnswer: 1,
  },
  {
    question: "What is the smallest bone in the human body?",
    options: ["Femur", "Stapes", "Radius", "Ulna"],
    correctAnswer: 1,
  },
  {
    question: "Who is considered the father of modern physics?",
    options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Max Planck"],
    correctAnswer: 1,
  },
  {
    question: "What is the heaviest organ in the human body?",
    options: ["Heart", "Liver", "Brain", "Lungs"],
    correctAnswer: 1,
  },
  {
    question: "What is the largest desert in the world?",
    options: ["Gobi Desert", "Sahara Desert", "Arabian Desert", "Antarctic Desert"],
    correctAnswer: 1,
  },
  {
    question: "How many letters are in the English alphabet?",
    options: ["24", "25", "26", "27"],
    correctAnswer: 2,
  },
  {
    question: "Which planet is the hottest in our solar system?",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    correctAnswer: 1,
  },
  {
    question: "Which organ pumps blood in the human body?",
    options: ["Lungs", "Heart", "Liver", "Brain"],
    correctAnswer: 1,
  },
  {
    question: "Which planet is known as the morning star?",
    options: ["Mars", "Venus", "Mercury", "Jupiter"],
    correctAnswer: 1,
  },
  {
    question: "How many planets have rings in our solar system?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
  },
  {
    question: "What is the capital of Greece?",
    options: ["Rome", "Athens", "Paris", "Madrid"],
    correctAnswer: 1,
  },
  {
    question: "Which fruit is known for its seeds on the outside?",
    options: ["Raspberry", "Strawberry", "Blackberry", "Blueberry"],
    correctAnswer: 1,
  },
  {
    question: "Which band released the album 'Abbey Road'?",
    options: ["The Rolling Stones", "The Beatles", "Led Zeppelin", "Pink Floyd"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the world's largest rainforest?",
    options: ["Congo Rainforest", "Amazon Rainforest", "Daintree Rainforest", "Southeast Asian Rainforest"],
    correctAnswer: 1,
  },
  {
    question: "Which planet is known as the 'gas giant'?",
    options: ["Saturn", "Jupiter", "Uranus", "Neptune"],
    correctAnswer: 1,
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    correctAnswer: 2,
  },
  {
    question: "How many moons does Mars have?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
  },
  {
    question: "Who is known as the King of Pop?",
    options: ["Elvis Presley", "Michael Jackson", "Prince", "David Bowie"],
    correctAnswer: 1,
  },
  {
    question: "What color is the gemstone emerald?",
    options: ["Blue", "Green", "Red", "Purple"],
    correctAnswer: 1,
  },
  {
    question: "Which Philippine city is known as the 'summer capital'?",
    options: ["Tagaytay", "Baguio", "Davao", "Cebu"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the wizarding school in Harry Potter?",
    options: ["Durmstrang", "Hogwarts", "Beauxbatons", "Ilvermorny"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of our galaxy?",
    options: ["Andromeda", "Milky Way", "Triangulum", "Centaurus A"],
    correctAnswer: 1,
  },
  {
    question: "Who is the first female President of the Philippines?",
    options: ["Gloria Macapagal-Arroyo", "Corazon Aquino", "Imelda Marcos", "Leni Robredo"],
    correctAnswer: 1,
  },
  {
    question: "What part of the body is affected by arthritis?",
    options: ["Muscles", "Joints", "Organs", "Skin"],
    correctAnswer: 1,
  },
  {
    question: "What is the national tree of the Philippines?",
    options: ["Bamboo", "Narra", "Coconut", "Mango"],
    correctAnswer: 1,
  },
  {
    question: "What is the value of pi to two decimal places?",
    options: ["3.12", "3.13", "3.14", "3.15"],
    correctAnswer: 2,
  },
  {
    question: "Which city is known as the Big Apple?",
    options: ["Chicago", "New York City", "Los Angeles", "Boston"],
    correctAnswer: 1,
  },
  {
    question: "What is the national sport of the Philippines?",
    options: ["Basketball", "Arnis", "Boxing", "Sipa"],
    correctAnswer: 1,
  },
  {
    question: "What is the oldest city in the Philippines?",
    options: ["Manila", "Cebu", "Vigan", "Davao"],
    correctAnswer: 1,
  },
  {
    question: "What is the chemical formula for table salt?",
    options: ["H2O", "NaCl", "CO2", "O2"],
    correctAnswer: 1,
  },
  {
    question: "What is the force that opposes motion between two surfaces in contact?",
    options: ["Gravity", "Friction", "Tension", "Pressure"],
    correctAnswer: 1,
  },
  {
    question: "What is the Filipino word for the traditional bamboo dance?",
    options: ["Singkil", "Tinikling", "Pandanggo", "Cariñosa"],
    correctAnswer: 1,
  },
  {
    question: "Which Philippine food is a fertilized duck egg that is boiled and eaten with the embryo inside?",
    options: ["Adobo", "Balut", "Sinigang", "Dinuguan"],
    correctAnswer: 1,
  },
  {
    question: "What sport is known as the 'Beautiful Game'?",
    options: ["Basketball", "Football", "Tennis", "Cricket"],
    correctAnswer: 1,
  },
  {
    question: "What is the traditional Filipino dress for women called?",
    options: ["Kimono", "Baro't saya", "Hanbok", "Ao dai"],
    correctAnswer: 1,
  },
  {
    question: "Which popular Philippine island is known for its Tarsier sanctuary?",
    options: ["Palawan", "Bohol", "Cebu", "Boracay"],
    correctAnswer: 1,
  },
  {
    question: "What is the largest species of shark?",
    options: ["Great White Shark", "Whale Shark", "Tiger Shark", "Hammerhead Shark"],
    correctAnswer: 1,
  },
  {
    question: "Which region in the Philippines is known for its colorful Kadayawan Festival?",
    options: ["Cebu", "Davao City", "Manila", "Baguio"],
    correctAnswer: 1,
  },
  {
    question: "Who is the Roman god of war?",
    options: ["Jupiter", "Mars", "Neptune", "Mercury"],
    correctAnswer: 1,
  },
  {
    question: "What is the Filipino term for the Christmas lantern?",
    options: ["Ilaw", "Parol", "Bituin", "Tanglaw"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the famous statue in Rio de Janeiro, Brazil?",
    options: ["The Thinker", "Christ the Redeemer", "David", "The Little Mermaid"],
    correctAnswer: 1,
  },
  {
    question: "What do you call a polygon with 8 sides?",
    options: ["Hexagon", "Heptagon", "Octagon", "Nonagon"],
    correctAnswer: 2,
  },
  {
    question: "What is the unit of electric current?",
    options: ["Volt", "Ampere", "Watt", "Ohm"],
    correctAnswer: 1,
  },
  {
    question: "In which sport would you find a court with a net in the middle?",
    options: ["Basketball", "Tennis", "Soccer", "Hockey"],
    correctAnswer: 1,
  },
  {
    question: "What company is known for its iPhone products?",
    options: ["Samsung", "Apple", "Huawei", "Nokia"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the fluid that circulates in our veins and arteries?",
    options: ["Plasma", "Blood", "Lymph", "Serum"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the winged horse in Greek Mythology?",
    options: ["Cerberus", "Pegasus", "Minotaur", "Hydra"],
    correctAnswer: 1,
  },
  {
    question: "What is the main source of energy for the Earth?",
    options: ["Moon", "Sun", "Wind", "Water"],
    correctAnswer: 1,
  },
  {
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Body"],
    correctAnswer: 1,
  },
  {
    question: "What city is known as the City of Lights?",
    options: ["London", "Paris", "New York", "Tokyo"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the cells that carry oxygen in the blood?",
    options: ["White blood cells", "Red blood cells", "Platelets", "Plasma cells"],
    correctAnswer: 1,
  },
  {
    question: "Which Marvel superhero is also known as the God of Thunder?",
    options: ["Iron Man", "Thor", "Captain America", "Hulk"],
    correctAnswer: 1,
  },
  {
    question: "What team is led by Nick Fury and includes Iron Man, Captain America and the Hulk?",
    options: ["Justice League", "The Avengers", "X-Men", "Guardians of the Galaxy"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the process by which plants make their food using sunlight?",
    options: ["Respiration", "Photosynthesis", "Fermentation", "Decomposition"],
    correctAnswer: 1,
  },
  {
    question: "What is the term for an animal that eats only plants?",
    options: ["Carnivore", "Herbivore", "Omnivore", "Insectivore"],
    correctAnswer: 1,
  },
  {
    question: "What is the chemical symbol for helium?",
    options: ["H", "He", "Li", "Be"],
    correctAnswer: 1,
  },
  {
    question: "Which superhero was originally a World War II soldier before being frozen?",
    options: ["Iron Man", "Captain America", "Thor", "Hulk"],
    correctAnswer: 1,
  },
  {
    question: "Which Marvel superhero is known as the 'Sorcerer Supreme'?",
    options: ["Spider-Man", "Doctor Strange", "Black Panther", "Vision"],
    correctAnswer: 1,
  },
  {
    question: "What is the chemical symbol for carbon?",
    options: ["Ca", "C", "Co", "Cu"],
    correctAnswer: 1,
  },
  {
    question: "Who is the primary antagonist in the movie 'Avengers Infinity War'?",
    options: ["Ultron", "Thanos", "Loki", "Red Skull"],
    correctAnswer: 1,
  },
  {
    question: "What is the chemical symbol for potassium?",
    options: ["P", "K", "Po", "Ka"],
    correctAnswer: 1,
  },
  {
    question: "What is the chemical symbol for sulfur?",
    options: ["Su", "S", "Sf", "So"],
    correctAnswer: 1,
  },
  {
    question: "What delicacy made from glutinous rice is a popular snack in Davao?",
    options: ["Puto", "Suman", "Bibingka", "Kutsinta"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the fairy in 'Peter Pan'?",
    options: ["Flora", "Tinker Bell", "Fauna", "Merryweather"],
    correctAnswer: 1,
  },
  {
    question: "Davao City is home to which sanctuary that protects a rare species of raptor?",
    options: ["Bird Park", "Philippine Eagle Center", "Wildlife Sanctuary", "Raptor Center"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the toy cowboy in 'Toy Story'?",
    options: ["Buzz", "Woody", "Rex", "Hamm"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the snowman in 'Frozen'?",
    options: ["Sven", "Olaf", "Kristoff", "Hans"],
    correctAnswer: 1,
  },
  {
    question: "In 'The Little Mermaid', what is the name of the sea witch?",
    options: ["Maleficent", "Ursula", "Cruella", "Gothel"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the girl who lives with seven dwarfs?",
    options: ["Cinderella", "Snow White", "Aurora", "Belle"],
    correctAnswer: 1,
  },
  {
    question: "In the Story of Snow White, how many dwarfs are there?",
    options: ["Five", "Six", "Seven", "Eight"],
    correctAnswer: 2,
  },
  {
    question: "In 'Cars', what is the name of the main character race car?",
    options: ["Hot Rod", "Lightning McQueen", "Speed Racer", "Doc Hudson"],
    correctAnswer: 1,
  },
  {
    question: "What do bees collect to make honey?",
    options: ["Pollen", "Nectar", "Water", "Sap"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the Disney princess who has a glass slipper?",
    options: ["Snow White", "Cinderella", "Aurora", "Belle"],
    correctAnswer: 1,
  },
  {
    question: "Which geometric shape has 4 equal sides and four right angles?",
    options: ["Rectangle", "Square", "Rhombus", "Trapezoid"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the evil sorceress in 'Sleeping Beauty'?",
    options: ["Ursula", "Maleficent", "Cruella", "Evil Queen"],
    correctAnswer: 1,
  },
  {
    question: "What is the main ingredient in sushi?",
    options: ["Fish", "Rice", "Seaweed", "Vegetables"],
    correctAnswer: 1,
  },
  {
    question: "What is the capital city of Mongolia?",
    options: ["Astana", "Ulaanbaatar", "Bishkek", "Dushanbe"],
    correctAnswer: 1,
  },
  {
    question: "What is the rarest blood type among humans?",
    options: ["O-negative", "AB-negative", "B-negative", "A-negative"],
    correctAnswer: 1,
  },
  {
    question: "What is the Capital City of Bhutan?",
    options: ["Kathmandu", "Thimphu", "Colombo", "Dhaka"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the largest moon of Jupiter?",
    options: ["Europa", "Ganymede", "Io", "Callisto"],
    correctAnswer: 1,
  },
  {
    question: "What is the chemical symbol for mercury?",
    options: ["Me", "Hg", "Mr", "Mc"],
    correctAnswer: 1,
  },
  {
    question: "Who is the Greek god of war and son of Zeus and Hera?",
    options: ["Apollo", "Ares", "Hermes", "Dionysus"],
    correctAnswer: 1,
  },
  {
    question: "What is the term for a group of flamingos?",
    options: ["Flock", "Flamboyance", "Fleet", "Flight"],
    correctAnswer: 1,
  },
  {
    question: "What is the opposite of hot?",
    options: ["Warm", "Cold", "Cool", "Mild"],
    correctAnswer: 1,
  },
  {
    question: "What is the only planet that rotates on its side?",
    options: ["Neptune", "Uranus", "Saturn", "Venus"],
    correctAnswer: 1,
  },
  {
    question: "What is the official animal of Scotland?",
    options: ["Lion", "Unicorn", "Dragon", "Eagle"],
    correctAnswer: 1,
  },
  {
    question: "What animal's milk is pink?",
    options: ["Elephant", "Hippopotamus", "Giraffe", "Whale"],
    correctAnswer: 1,
  },
  {
    question: "In what year did the Berlin Wall fall?",
    options: ["1987", "1989", "1991", "1993"],
    correctAnswer: 1,
  },
  {
    question: "Which mountain range is the longest in the world?",
    options: ["Himalayas", "The Andes", "Rocky Mountains", "Alps"],
    correctAnswer: 1,
  },
  {
    question: "What is the largest island in the world?",
    options: ["Madagascar", "Greenland", "New Guinea", "Borneo"],
    correctAnswer: 1,
  },
  {
    question: "What is the largest bone in the human body?",
    options: ["Tibia", "Femur", "Humerus", "Pelvis"],
    correctAnswer: 1,
  },
  {
    question: "What is the capital city of Argentina?",
    options: ["Santiago", "Buenos Aires", "Lima", "Montevideo"],
    correctAnswer: 1,
  },
  {
    question: "Who painted 'The Last Supper'?",
    options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Botticelli"],
    correctAnswer: 1,
  },
  {
    question: "What animal is the closest living relative to humans?",
    options: ["Gorilla", "Chimpanzee", "Orangutan", "Bonobo"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the popular children's television show featuring a yellow sponge?",
    options: ["Patrick Star", "SpongeBob SquarePants", "Squidward", "Mr. Krabs"],
    correctAnswer: 1,
  },
  {
    question: "What is the currency of Japan?",
    options: ["Won", "Japanese Yen", "Yuan", "Ringgit"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the popular social media platform known for its short-form videos?",
    options: ["Instagram", "TikTok", "Snapchat", "Twitter"],
    correctAnswer: 1,
  },
  {
    question: "In what season do leaves fall off the trees?",
    options: ["Summer", "Autumn/Fall", "Winter", "Spring"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the popular video game franchise featuring Mario?",
    options: ["Sonic", "Super Mario", "Mega Man", "Pac-Man"],
    correctAnswer: 1,
  },
  {
    question: "What do you call a group of fish?",
    options: ["Herd", "School", "Flock", "Pod"],
    correctAnswer: 1,
  },
  {
    question: "What does HCDC stand for?",
    options: ["Holy Child Davao College", "Holy Cross of Davao College", "Holy Christ Davao College", "Holy Center Davao College"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the popular television show about a group of friends living in New York City?",
    options: ["How I Met Your Mother", "Friends", "Seinfeld", "The Big Bang Theory"],
    correctAnswer: 1,
  },
  {
    question: "What is the most popular sport in the Philippines?",
    options: ["Volleyball", "Basketball", "Football", "Boxing"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the highest award in professional basketball?",
    options: ["MVP Trophy", "NBA Championship", "Finals MVP", "Sixth Man Award"],
    correctAnswer: 1,
  },
  {
    question: "What animal is known for hopping and has a pouch to carry its young?",
    options: ["Koala", "Kangaroo", "Wombat", "Tasmanian Devil"],
    correctAnswer: 1,
  },
  {
    question: "Who is the famous television chef known for his show 'Hell's Kitchen'?",
    options: ["Jamie Oliver", "Gordon Ramsay", "Wolfgang Puck", "Bobby Flay"],
    correctAnswer: 1,
  },
  {
    question: "Who is the famous singer known for her hit song 'Rolling in the Deep'?",
    options: ["Taylor Swift", "Adele", "Lady Gaga", "Beyoncé"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the popular music genre that originated in Jamaica?",
    options: ["Calypso", "Reggae", "Soca", "Salsa"],
    correctAnswer: 1,
  },
  {
    question: "In what fairy tale does a pumpkin turn into a carriage?",
    options: ["Snow White", "Cinderella", "Sleeping Beauty", "Beauty and the Beast"],
    correctAnswer: 1,
  },
  {
    question: "Who is the founder of Microsoft?",
    options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos"],
    correctAnswer: 1,
  },
  {
    question: "Who is the founder of Apple?",
    options: ["Bill Gates", "Steve Jobs", "Larry Page", "Elon Musk"],
    correctAnswer: 1,
  }
];

export default triviaQuestions;
