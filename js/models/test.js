$(function() {
	// person class
	var Person = $.Class.create({
		// constructor
		initialize: function(name, family, father_name) {
			this._name = name;
			this._family = family;
			this._father_name = father_name;
		},
		// methods
		ClassName: function() {
			alert('Person Class');
		},
		toString: function() {
			return this.property('Name') + ' ' + this.property('Family') + ' Son of ' + this.property('FatherName') + ' ' + this.property('Family');
		}
	}, {
		// properties
		getset: [['Name', '_name'], ['Family', '_family'], ['FatherName', '_father_name']]
	});
	var john = new Person('John', 'Foster', 'Bill');
	alert(john);
	john.addProperty('Mother', '_mother');
	john.property('Mother', 'Tatiana');
	alert(john.property('Mother'));
	john.ClassName();
	
	
	// student class
	var Student = $.Class.create(Person, {
		// constructor
		initialize: function(name, family, father_name, student_code) {
			this.base('initialize', name, family, father_name, student_code);
			this._student_code = student_code;
		},
		// methods
		ClassName: function() {
			this.base('ClassName');
			alert('Student Class');
		},
		toString: function() {
			return this.property('Name') + ' ' + this.property('Family') + ' Son of ' + this.property('FatherName') + ' ' + this.property('Family') + ' Student Code is:' + this.property('StudentCode');
		}
	}, {
		// properties
		getset: [['StudentCode', '_student_code']]
	});
	
	
	var johnStudent = new Student('John', 'Foster', 'Bill', 1001);
	alert(johnStudent);
	johnStudent.ClassName();
	// employee class
	var Employee = $.Class.create(Person, {
		// properties
		getEmployeeCode: function() {
			return this._employee_code;
		},
		setEmployeeCode: function() {
			this._employee_code = arguments[0];
		},
		// constructor
		initialize: function(name, family, father_name, employee_code) {
			this.base('initialize', name, family, father_name, employee_code);
			this._employee_code = employee_code;
		},
		// methods
		toString: function() {
			return this.property('Name') + ' ' + this.property('Family') + ' Son of ' + this.property('FatherName') + ' ' + this.property('Family') + ' Employee Code is:' + this.property('EmployeeCode');
		}
	});
	var johnEmployee = new Employee('John', 'Foster', 'Bill', 5001);
	alert(johnEmployee);

	// base car class
	var BaseCar = $.Class.create({
		// constructor
		initialize: function(name, model) {
			this._name = name;
			this._model = model;
		},
		// methods
		toString: function() {
			return this.property('Name') + ' ' + this.property('Model');
		}
	}, {
		// properties
		getset: [['Name', '_name'], ['Model', '_model']],
		// settings
		abstract: true
	});
	try {
		var toyota = new BaseCar('Toyota', '2008');
		alert(toyota);
	} catch (ex) {
		alert(ex);
	}

	// car class
	var Car = $.Class.create(BaseCar);
	var toyota = new Car('Toyota', '2008');
	alert(toyota);

	// computer interface
	var computerInterface = new $.Interface();
	computerInterface.attributes = ['_name', '_prosessor'];
	computerInterface.properties = ['Name', 'Prosessor'];
	computerInterface.methods = ['turnOn', 'turnOff'];

	try {
		var computerWidthError = $.Class.create({
			// constructor
			initialize: function(name, prosessor) {
				this._name = name;
				this._prosessor = prosessor;
			},
			// methods
			toString: function() {
				return this.property('Name') + ' ' + this.property('Prosessor');
			}
		}, {
			// properties
			getset: [['Name', '_name']],
			// settings
			implements: [computerInterface] // can be more than one
		});
	} catch (ex) {
		alert(ex);
	}

	var computer = $.Class.create({
		// attributes
		_name: null,
		_prosessor: null,
		// constructor
		initialize: function(name, prosessor) {
			this._name = name;
			this._prosessor = prosessor;
		},
		// methods
		toString: function() {
			return this.property('Name') + ' ' + this.property('Prosessor');
		},
		turnOn: function() {
			alert("i'm on");
		},
		turnOff: function() {
			alert("i'm off");
		}
	}, {
		// properties
		getset: [['Name', '_name'], ['Prosessor', '_prosessor']],
		// settings
		implements: [computerInterface] // can be more than one
	});
	var pc = new computer('Pc', 'Intel');
	pc.turnOn();
	pc.turnOff();

	// person module
	var Mine = $.Class.create({
		// methods
		Hi: function() {
			alert('Hi, My name is hassan jodat shandi');
		}
	}, {
		// settings
		module: 'Hwt.Test.Hassan'
	});
	Hwt.Test.Hassan.Hi();
});