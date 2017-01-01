(function () {
    var ratingSystem = {
        bindings: {
            rating: '<',
            canEdit: '<',
            onRating: '&'
        },
        templateUrl: 'template/components/ratingSystem/ratingSystem.html',
        controller: [function () {
            var self = this;

            self.$onInit = function () {
                init();
            };

            self.onStarHover = function (star) {
                if(!self.canEdit) return;
                for (var i = 0; i < star.value; i++) {
                    self.stars[i].status = 'checked';
                }
                for (var j = star.value; j < 5; j++) {
                    self.stars[j].status = 'unchecked';
                }
            };

            self.onStarLeave = function(){
                if(!self.canEdit) return;
                init();   
            };

            self.rate = function (value) {
                self.rating = value;
                self.onRating(value);
            };

            function init() {
                self.stars = [{
                    value: 1,
                    status: self.rating >= 1 ? 'checked' : 'unchecked'
                }, {
                    value: 2,
                    status: self.rating >= 2 ? 'checked' : 'unchecked'
                }, {
                    value: 3,
                    status: self.rating >= 3 ? 'checked' : 'unchecked'
                }, {
                    value: 4,
                    status: self.rating >= 4 ? 'checked' : 'unchecked'
                }, {
                    value: 5,
                    status: self.rating >= 5 ? 'checked' : 'unchecked'
                }];
            }
        }]
    };

    angular.module('driveMonitor').component('ratingSystem', ratingSystem);
})();