(function () {
    var schedule = {
        bindings: {
            schedule: '<'
        },
        templateUrl: 'template/components/schedule/schedule-edit.html',
        controller: ['$scope', '$filter', '$window', 'DateTimeService', '_', function ($scope, $filter, $window, DateTimeService, _) {
            var self = this;
            var isMouseDown = false;
            var parentTopPosition = null;
            var selectingHour = null;
            var day = null;
            var draggingHourIndex = null;
            var beginHourIndex = null;
            
            self.$onInit = function () {
                self.weekDays = DateTimeService.getWeekDays(new Date());
                self.dayHours = DateTimeService.getDayHours();
            };

            self.removeThisHour = function (range, day) {
                var idx = _.findIndex(self.schedule[day].ranges, function (r) {
                    return r.day === range.day;
                });
                if (idx != -1) {
                    self.schedule[day].ranges.splice(idx, 1);
                }
            };

            self.beginDragging = function (event, weekDay) {
                day = weekDay;
                parentTopPosition = $(event.target).offset().top;
                beginHourIndex = Math.floor((event.pageY - parentTopPosition) / 21);
                selectingHour = {
                    startIndex: beginHourIndex,
                    endIndex: beginHourIndex + 1
                };
                self.schedule[weekDay.value].ranges.push(selectingHour);
                isMouseDown = true;
            };

            self.onDragging = function (event, weekDay) {
                if (isMouseDown) {
                    draggingHourIndex = Math.round((event.pageY - parentTopPosition) / 21);
                    if (draggingHourIndex > beginHourIndex) {
                        selectingHour.endIndex = draggingHourIndex;
                    }
                }
            };

            $window.addEventListener('mouseup', function (e) {
                if (isMouseDown) {

                    /** Get hour range indexes which are included inside new hour range */
                    var indexes = [];
                    for (var i = 0; i < self.schedule[day.value].ranges.length; i++) {
                        var range = self.schedule[day.value].ranges[i];
                        if (range.startIndex != selectingHour.startIndex && range.startIndex <= draggingHourIndex) {
                            indexes.push(i);
                        }
                    }

                    if (indexes.length) {

                        /** With the last hour range index, compare its endIndex to determine whether we should include it into new range */
                        var lastHourRangeIndex = indexes[indexes.length - 1];
                        if (draggingHourIndex >= self.schedule[day.value].ranges[lastHourRangeIndex].endIndex) {
                            self.schedule[day.value].ranges.splice(lastHourRangeIndex, 1);
                        } else if (draggingHourIndex < self.schedule[day.value].ranges[lastHourRangeIndex].endIndex && draggingHourIndex >= self.schedule[day.value].ranges[lastHourRangeIndex].startIndex) {
                            selectingHour.endIndex = self.schedule[day.value].ranges[lastHourRangeIndex].endIndex;
                            self.schedule[day.value].ranges.splice(lastHourRangeIndex, 1);
                        }

                        /** If there are more than 1 hour range to be included, delete all except the last one */
                        if (indexes.length > 1) {
                            for (var j = indexes.length - 2; j >= 0; j--) {
                                self.schedule[day.value].ranges.splice(indexes[j], 1);
                            }
                        }
                    }
                }
                isMouseDown = false;
                parentTopPosition = null;
                selectingHour = null;
                day = null;
            });
        }]
    };

    angular.module('driveMonitor').component('schedule', schedule);
})();