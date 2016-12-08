(function () {
    var scheduleEdit = function ($timeout) {
        return {
            restrict: 'C',
            link: function (scope, element) {
                var isMouseDown = false;
                var passedElement = null;
                var cellIndex = null;

                $timeout(function () {
                    $(element).find('td.work-hour').mousedown(function () {
                            isMouseDown = true;
                            cellIndex = $(this).index();
                            $(this).toggleClass("highlighted");
                            return false; // prevent text selection
                        })
                        .mouseover(function (e) {
                            if ($(this).index() !== cellIndex) {
                                e.preventDefault();
                                return;
                            }
                            if (isMouseDown) {
                                if ($(this).hasClass("highlighted") && passedElement) {
                                    passedElement.removeClass("highlighted");
                                }
                                $(this).toggleClass("highlighted");
                            }
                            passedElement = $(this);
                        });
                });



                $(document).mouseup(function () {
                    isMouseDown = false;
                    passedElement = null;
                    cellIndex = null;
                });
            }
        };
    };

    angular.module('driveMonitor').directive('scheduleEdit', scheduleEdit);
})();