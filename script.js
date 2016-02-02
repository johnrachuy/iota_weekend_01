$(document).ready(function(){
	
	var empArray = [];
	
	function appendDom(empArray) {
		var insertemployeeList = $("<div id='employeeList'></div>")
		$('#employeeList').remove();
		$('body').append(insertemployeeList);

		for (var i = empArray.length-1; i >= 0; i--) {
			$('#employeeList').prepend("<div id='empInfo'></div>")
			$('#empInfo').append("<span class='id grid100'>" + empArray[i].empIdNum + "</span>");
			$('#empInfo').append("<span class='grid200'>" + empArray[i].empFirstName + " " + empArray[i].empLastName + "</span>");
			$('#empInfo').append("<span class='grid200'>" + empArray[i].empJobTitle + "</span>");
			$('#empInfo').append("<span class='grid100'>" + empArray[i].empMonthlySalaray + "</span>");
			$('#empInfo').append('<button id="removeEmp" class="">Remove</button>');
		}
		
		sumSalary(empArray);
	}

	$("#employeeForm").on('submit', function(event) {
		event.preventDefault();
		
		var $employeeInputs = $('#employeeForm :input');
		var values = {};
		
		$employeeInputs.each(function(){
			values[this.name] = $(this).val();
		});

		empArray.push(values);
		appendDom(empArray);
	
		$('#employeeForm').each(function(){
    	this.reset();
    });
	});

	$('body').on('click', '#removeEmp', function() {
		var removedEmp = 0 
		
		for (var i = 0; i < empArray.length; i++) {
			if (removedEmp == empArray[i].empIdNum) {
				empArray[i] = empArray[empArray.length-1];
			}
		}
		
		empArray.pop();
		$(this).closest("div").remove();
		sumSalary(empArray);
	});

	function sumSalary (empArray) {
		var total = 0;
		var totalSalary = 0;
		
		for (var i = 0; i < empArray.length; i++) {
			totalSalary = parseInt(empArray[i].empMonthlySalaray);
			total += totalSalary;
		}
		
		$("h2").remove();
		$("section").append("<h2>" + "Total Monthly Salary: $" + total + "</h2");
	}
});