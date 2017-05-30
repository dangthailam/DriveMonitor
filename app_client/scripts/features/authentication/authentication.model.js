// (function () {
//     var authentication = function () {
//         var defaultPhotoUrl = 'http://media.npr.org/assets/news/2009/10/27/facebook1_sq-17f6f5e06d5742d8c53576f7c13d5cf7158202a9.jpg?s=16';
//         class Authentication {
//             constructor(authentication) {
//                 this.id = authentication._id;
//                 this.email = authentication.email;
//                 this.name = authentication.name;
//                 this.phone = authentication.phone;
//                 this.birth = authentication.birth;
//                 this.imageUrl = defaultPhotoUrl;
//                 if (authentication.image && authentication.image.data) {
//                     this.imageUrl = 'data:' + authentication.image.contentType + ';base64,' + authentication.image.data;
//                 }
//             }
//         }
//         return Authentication;
//     };

//     angular.module('driveMonitor').factory('Authentication', authentication);
// })();