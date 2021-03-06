(function() {
  "use strict";

  var app = angular.module('viewCustom', ['angularLoad']);

  /****************************************************************************************************/

  /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

  /*var app = angular.module('centralCustom', ['angularLoad']);*/

  /****************************************************************************************************/

  app.controller('prmLogoAfterController', [function() {
    var vm = this;
    vm.getIconLink = getIconLink;

    function getIconLink() {
      return vm.parentCtrl.iconLink;
    }
  }]);


  //update template to include new URL for institution
  app.component('prmLogoAfter', {
    bindings: {
      parentCtrl: '<'
    },
    controller: 'prmLogoAfterController',
    template: '<div class="logo-container" layout="row" layout-fill><div class="flex-item"><a class="image-link" href="http://www.csun.edu"><img alt="CSUN" src="custom/01CALS_UNO/img/CSUN-Wordmark.png"/></a></div><div class="flex-item"><a class="image-link" href="https://csun-primo.hosted.exlibrisgroup.com/primo-explore/search?vid=01CALS_UNO"><img alt="Onesearch" src="custom/01CALS_UNO/img/CSUN-Onesearch.png"/></a></div></div>'
  });
  

//Brought over from central package (duplicate)

/**
	 * resolve duplicate source codes
	 * takes first source code instance and removes additional characters
	 */
	app.controller('prmServiceDetailsAfterController', [function() {

		this.getKillCodeLink = function() {

			// primo central record

			if (this.parentCtrl.item.context == "PC") {
				return this.parentCtrl.item.pnx.display.source[0];
			}

			// alma records; show only first, sans identifier code

			return this.parentCtrl.item.pnx.display.source[0].replace(/\$\$V/g, "").replace(/\$\$O01CALS_ALMA/g, '').replace(/[0-9]/g, '');
		}

	}]);

	app.component('prmServiceDetailsAfter', {
		bindings: { parentCtrl: '<' },
		controller: 'prmServiceDetailsAfterController',
		template: '<div layout="row" layout-xs="column" class="layout-block-xs layout-xs-column layout-row"><div flex-gt-sm="20" flex-gt-xs="25" class="flex-gt-xs-25 flex-gt-sm-20 flex"><span class="bold-text" title="Source">Source</span></div><div flex="" class="flex"><div><div layout="column" class="spaced-rows word-break layout-column">{{$ctrl.getKillCodeLink()}}</div></div></div></div>'
	});

    /**
     * Collapse institution list in full record
     */

    app.controller('institutionToggleController', ['$scope', function($scope) {
        this.$onInit = function() {
            $scope.showLibs = false;
        	$scope.button = angular.element(document.querySelector('prm-alma-more-inst-after'));
            $scope.tabs = angular.element(document.querySelector('prm-alma-more-inst md-tabs'));
            $scope.tabs.addClass('hide');
        	$scope.button.after($scope.tabs);
        	$scope.toggleLibs = function() {
        		$scope.showLibs = !$scope.showLibs;
        		if ($scope.tabs.hasClass('hide')) $scope.tabs.removeClass('hide');
        		else $scope.tabs.addClass('hide');
        	};
        };
    }]);

    app.component('prmAlmaMoreInstAfter', {
    	controller: 'institutionToggleController',
    	template: `<md-button class="md-raised" ng-click="toggleLibs()">
    			{{ showLibs ? 'Hide Libraries &laquo;' : 'Show Libraries &raquo;' }}
    			</md-button>`
    });

//End Central Package Addition

})();

 
