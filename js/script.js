$(function() {

	function randomString() {
    	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    	var str = '';
    	for (i = 0; i < 10; i++) {
        	str += chars[Math.floor(Math.random() * chars.length)];
    	}
    	return str;
	}

	//KLASA COLUMN
	function Column(name) {
		var self = this; 

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();
	

		// TWORZENIE ELEMENTÓW KOLUMNY	
		function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
			var $column = $('<div>').addClass('column'),
				$columnTitle = $('<h2>').addClass('column-title').text(self.name),
				$columnCardList = $('<ul>').addClass('column-card-list'),
				$columnDelete = $('<button>').addClass('btn-delete').text('x'),
				$columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');
					
			// PODPINANIE ODPOWIEDNICH ZDARZEŃ
			$columnDelete.click(function() {      
				self.removeColumn();
			});
			$columnAddCard.click(function() {
				var nameCard = prompt("Wpisz nazwę karty");
				var card = new Card(nameCard);
				if (nameCard === null ) {
					return;
				}
				self.addCard(card);
			});

			// KONSTRUOWANIE KOLUMNY
			$column.append($columnTitle)
					.append($columnAddCard)	
					.append($columnDelete)		
					.append($columnCardList);

			return $column;	   // ZWRACANIE STWORZONEJ  KOLUMNY

		}
	}

//METODY DLA KLASY COLUMN
	Column.prototype = {						//Metoda addCard
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {				//Metoda remove
			this.$element.remove();
		}
	}

//KLASA CARD
	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

//TWORZENIE KLOCKÓW, z którego będzie się składała karta
		function createCard() {
			var $card = $('<li>').addClass('card'),
				$cardDescription = $('<p>').addClass('card-description').text(self.description),
				$cardDelete = $('<button>').addClass('btn-delete').text('x');
		
			// PRZYPIĘCIE ZDARZENIA	
			$cardDelete.click(function() {
				self.removeCard();
			});

			// SKŁADANIE I ZWRACANIE KARTY
			$card.append($cardDelete)
				.append($cardDescription);

			return $card;
		}
	}

//METODA DLA KLASY CARD
	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	}

	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: '.card-placeholder',
			//disable: false
		}).disableSelection();
	}

//Obiekt tablicy i przypięcie nasłuchiwanie zdarzeń
	var board = {
		name: 'Tablica Kanban',
		addColumn: function(column) {				//Metoda do tworzenia nowej kolumny
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	};	
		

	$('.create-column')
		.click(function() {
			var name = prompt('Wpisz nazwę kolumny');
			var column = new Column(name);
			if (name === null) {
				return;
			}			
		board.addColumn(column);

		});

// TWORZENIE KOLUMN
	var todoColumn = new Column('Do zrobienia');
	var doingColumn = new Column('W trakcie');
	var doneColumn = new Column('Skończone');

// DODAWANIE KOLUMN DO TABLICY
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

// TWORZENIE NOWYCH EGZEMPLARZY KART
	var card1 = new Card('Nowe zadanie');
	var card2 = new Card('Nowe zadanie');
	var card3 = new Card('Nowe zadanie');

// DODAWANIE KART DO KOLUMN
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
	doneColumn.addCard(card3);

})	
