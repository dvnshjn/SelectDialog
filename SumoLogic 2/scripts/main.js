angular.module('testApp', [])
.controller('testMainCtrl', [
	'$scope', 
	function($scope){
		
		$scope.cancelClick = function(){
			init();
		};

		$scope.okClick = function(){
			var team = "";
			if($scope.selectedTeam != null){
				team = $scope.selectedTeam;
			}
			var employee = "";
			if($scope.selectedEmployee != null){
				employee = $scope.selectedEmployee;
			}
			alert("Team: "+ team +"\nEmployee: "+employee);
		}

		var getTeams = function(){
			var teams = [];
			for(var teamObject in $scope.teams){
				teams.push($scope.teams[teamObject].team);
			}
			return teams;
		};

		var getEmployees = function(){
			var employees = [];
			for(var teamObject in $scope.teams){
				if($scope.teams[teamObject].team == $scope.selectedTeam){
					employees = $scope.teams[teamObject].employees;
				}
			}
			return employees;
		};

		$scope.setTeam = function(team){
			$scope.selectedTeam = team;
			$scope.teamSelectData.value = team;
			$scope.selectedEmployee = "";
			$scope.employeeSelectData.value = "";
			$scope.employeeSelectData.placeholderText = "Select an employee...";
			$scope.employeeSelectData.selectList = getEmployees();
		}

		$scope.setEmployee = function(employee){
			$scope.selectedEmployee = employee;
			$scope.employeeSelectData.value = employee;
		}

		var init = function(){
			$scope.selectedTeam = "";
			$scope.teamSelectData = {};
			$scope.selectedEmployee = "";
			$scope.employeeSelectData = {};
			$scope.teams = [
				{team: 'Engineering', employees:['Lawana Fan', 'Larry Rainer', 'Rahul Malik', 'Leah Shumway']},
				{team: 'Executive', employees:['Rohan Gupta', 'Ronda Dean', 'Robby Maharaj']},
				{team: 'Finance', employees:['Caleb Bron', 'Carol Smithson', 'Carl Sorensen']},
				{team: 'Sales', employees:['Ankit Jain', 'Anjali Maulingkar']}
			];

			$scope.teamSelectData = {
				selectText: "Select a Team in the organization",
				placeholderText: "Select Team...",
				selectList: getTeams(),
				value: $scope.selectedTeam,
				setSelection: $scope.setTeam
			}

			$scope.employeeSelectData = {
				selectText: "Select an employee",
				placeholderText: "Select a team first...",
				value: $scope.selectedEmployee,
				setSelection: $scope.setEmployee
			}
		}
		
		init();
	}
])
.directive('selectBox', function() {
   
   var directive = {};
   directive.restrict = 'E';
   directive.scope = {
      data : "=data"
   };
   directive.template = 	"<div>{{data.selectText}}</div>"
   						+	"<div>"
   						+		"<div class=\"input-container\">"
   						+			"<input id='placeholderText' type='text' placeholder= \"{{data.placeholderText}}\" class=\"select-input-box\" ng-model=\"data.value\" ng-focus=\"openDropdown()\" ng-blur=\"closeDropdown()\" ng-keyup=\"refineList()\" ng-click=\"data.value != '' || copyList()\">"
   						+			"<div><div class=\"input-arrow\"><i class=\"material-icons\">play_arrow</i></div></div>"
   						+		"</div>"
   						+ 		"<div class=\"select-autocomplete {{dropdownClass}}\">"
						+			"<div ng-repeat=\"item in data.selectList\" class=\"select-element\" ng-mousedown=\"data.setSelection(item)\">"
						+				"{{item}}"
						+			"</div>"
						+		"</div>"
						+	"</div>";
   
   directive.compile = function(element, attributes) {      
      	var linkFunction = function($scope, element, attributes) {
         	$scope.openDropdown = function(){
     			$scope.dropdownClass = "show";
        	}

	        $scope.closeDropdown = function(){
	        	$scope.dropdownClass = "hide";
	        }

         	$scope.refineList = function(){
         		if($scope.data.selectList != null && $scope.data.listCopy == null){
            		$scope.data.listCopy = JSON.parse(JSON.stringify($scope.data.selectList));
            	}
         		var list = [];
         		var searchWord = $scope.data.value.toLowerCase();
         		for(var i in $scope.data.listCopy){
         			if($scope.data.listCopy[i].toLowerCase().indexOf(searchWord) != -1){
         				list.push($scope.data.listCopy[i]);
         			}
         		}
         		$scope.data.selectList = list;
         	}

         	$scope.copyList = function(){
         		$scope.data.listCopy = JSON.parse(JSON.stringify($scope.data.selectList));
         	}

         	var init = function(){
         		$scope.dropdownClass = "hide";
         	};

            init();
      	}
      	return linkFunction;
   }
   return directive;
})