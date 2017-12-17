define('app',["exports", "aurelia-auth"], function (exports, _aureliaAuth) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);

      this.message = 'Hello World!';
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep("authorize", _aureliaAuth.AuthorizeStep);
      config.map([{
        "route": ["", "home"],
        "moduleId": "./modules/home",
        "name": "Home"
      }, {
        "route": "List",
        "moduleId": "./modules/list",
        "name": "List",
        "auth": true
      }]);
    };

    return App;
  }();
});
define('auth-config',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var authConfig = {
        "baseUrl": "http://localhost:80/api",
        "loginUrl": "/users/login",
        "tokenName": "token",
        "authHeader": "Authorization",
        "authToken": "",
        "logoutRedirect": "#/home"
    };

    exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',["exports", "./environment", "./auth-config", "./regenerator-runtime"], function (exports, _environment, _authConfig, _regeneratorRuntime) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;

  Promise.config({ "warnings": { "wForgottenReturn": false } });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin("aurelia-auth", function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('modules/home',["exports", "aurelia-framework", "aurelia-router", "../resources/data/users", "aurelia-auth"], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Home = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
        function Home(router, users, auth) {
            _classCallCheck(this, Home);

            this.router = router;
            this.auth = auth;
            this.loginError = "";
            this.users = users;
            this.message = "Home";
            this.showLogin = true;
        }

        Home.prototype.login = function login() {
            var _this = this;

            console.log(this.email);
            console.log(this.password);
            return this.auth.login(this.email, this.password).then(function (response) {
                sessionStorage.setItem("user", JSON.stringify(response.user));
                _this.loginError = "";
                _this.router.navigate("List");
            }).catch(function (error) {
                console.log("login failed");
                console.log(error);
                _this.loginError = "Invalid credentials";
            });
        };

        Home.prototype.showRegister = function showRegister() {
            this.User = {
                "firstName": "",
                "lastName": "",
                "email": "",
                "password": ""
            };
            this.registerError = "";
            this.showLogin = false;
        };

        Home.prototype.saveUser = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.users.save(this.user);

                            case 2:
                                serverResponse = _context.sent;

                                if (!serverResponse.error) {
                                    this.showLogin = true;
                                } else {
                                    this.registerError = "There was a problem registering this user";
                                }

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function saveUser() {
                return _ref.apply(this, arguments);
            }

            return saveUser;
        }();

        return Home;
    }()) || _class);
});
define('modules/list',["exports", "aurelia-framework", "../resources/data/galleries", "../resources/data/pictures", "aurelia-auth"], function (exports, _aureliaFramework, _galleries, _pictures, _aureliaAuth) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.List = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_galleries.Galleries, _pictures.Pictures, _aureliaAuth.AuthService), _dec(_class = function () {
        function List(galleries, pictures, auth) {
            _classCallCheck(this, List);

            this.galleries = galleries;
            this.pictures = pictures;
            this.auth = auth;

            this.user = JSON.parse(sessionStorage.getItem("user"));
            this.showGalleryList = true;

            this.addGallery = {
                "userId": this.user._id,
                "name": "",
                "description": "",
                "dateCreated": new Date()
            };
        }

        List.prototype.logout = function logout() {
            sessionStorage.removeItem("user");
            this.auth.logout();
        };

        List.prototype.activate = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.galleries.getUserGalleries(this.user._id);

                            case 2:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function activate() {
                return _ref.apply(this, arguments);
            }

            return activate;
        }();

        List.prototype.openGallery = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(gallery) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.galleryObject = gallery;
                                _context2.next = 3;
                                return this.pictures.getGalleryPictures(this.galleryObject._id);

                            case 3:
                                console.log(this.pictures.pictureList);
                                this.addPicture = {
                                    "name": "",
                                    "description": "",
                                    "galleryId": this.galleryObject._id
                                };
                                this.showGalleryList = false;

                            case 6:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function openGallery(_x) {
                return _ref2.apply(this, arguments);
            }

            return openGallery;
        }();

        List.prototype.exitGallery = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                this.showGalleryList = true;

                            case 1:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function exitGallery() {
                return _ref3.apply(this, arguments);
            }

            return exitGallery;
        }();

        List.prototype.saveGallery = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
                var response, galleryId;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!this.addGallery) {
                                    _context4.next = 5;
                                    break;
                                }

                                _context4.next = 3;
                                return this.galleries.save(this.addGallery);

                            case 3:
                                response = _context4.sent;

                                if (response.error) {
                                    alert("There was an issue saving this gallery");
                                    console.log(response.error);
                                } else {
                                    galleryId = response._id;
                                }

                            case 5:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function saveGallery() {
                return _ref4.apply(this, arguments);
            }

            return saveGallery;
        }();

        List.prototype.deleteGallery = function deleteGallery(gallery) {
            this.galleries.delete(gallery._id);
        };

        List.prototype.savePicture = function () {
            var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
                var response, pictureId;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (!this.addPicture) {
                                    _context5.next = 17;
                                    break;
                                }

                                _context5.next = 3;
                                return this.pictures.save(this.addPicture);

                            case 3:
                                response = _context5.sent;

                                if (!response.error) {
                                    _context5.next = 9;
                                    break;
                                }

                                alert("There was an issue saving this picture");
                                console.log(response.error);
                                _context5.next = 17;
                                break;

                            case 9:
                                pictureId = response._id;

                                console.log("response: " + response);
                                console.log("id: " + pictureId);

                                if (!(this.imageFile && this.imageFile.length)) {
                                    _context5.next = 17;
                                    break;
                                }

                                _context5.next = 15;
                                return this.pictures.uploadImageFile(this.imageFile, this.galleryObject._id, pictureId);

                            case 15:
                                console.log("done save picture");
                                this.imageFile = [];

                            case 17:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function savePicture() {
                return _ref5.apply(this, arguments);
            }

            return savePicture;
        }();

        List.prototype.openPicture = function () {
            var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(picture) {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                console.log("picture");
                                console.log(picture);
                                console.log(picture.imageFile);
                                this.pictureObject = picture;
                                console.log("Picture source: " + "uploads/" + this.pictureObject.galleryId + "/" + this.pictureObject._id + "/" + this.pictureObject.imageFile.filename);

                            case 5:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function openPicture(_x2) {
                return _ref6.apply(this, arguments);
            }

            return openPicture;
        }();

        List.prototype.deletePicture = function () {
            var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(picture) {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                this.pictures.delete(picture._id);

                            case 1:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function deletePicture(_x3) {
                return _ref7.apply(this, arguments);
            }

            return deletePicture;
        }();

        List.prototype.uploadPicture = function () {
            var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                this.imageFile = new Array();
                                this.imageFile.push(this.files[0]);

                            case 2:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function uploadPicture() {
                return _ref8.apply(this, arguments);
            }

            return uploadPicture;
        }();

        return List;
    }()) || _class);
});
define('resources/data/data-services',["exports", "aurelia-framework", "aurelia-fetch-client"], function (exports, _aureliaFramework, _aureliaFetchClient) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DataServices = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
        function DataServices(http) {
            var _this = this;

            _classCallCheck(this, DataServices);

            this.httpClient = http;
            this.BASE_URL = "http://localhost:80/api/";

            this.httpClient.configure(function (config) {
                config.withBaseUrl(_this.BASE_URL).withDefaults({
                    "credentials": "same-origin",
                    "headers": {
                        "Accept": "application/json",
                        "X-Requested-With": "Fetch"
                    }
                }).withInterceptor({
                    request: function request(_request) {
                        console.log("Requesting " + _request.method + " " + _request.url);
                        var authHeader = "Bearer " + localStorage.getItem("aurelia_token");
                        _request.headers.append("Authorization", authHeader);
                        return _request;
                    },
                    response: function response(_response) {
                        console.log("Received " + _response.status + " " + _response.url);
                        return _response;
                    }
                });
            });
        }

        DataServices.prototype.get = function get(url) {
            return this.httpClient.fetch(url).then(function (response) {
                return response.json();
            }).then(function (data) {
                return data;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.post = function post(content, url) {
            return this.httpClient.fetch(url, {
                "method": "post",
                "body": (0, _aureliaFetchClient.json)(content)
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.put = function put(content, url) {
            return this.httpClient.fetch(url, {
                "method": "put",
                "body": (0, _aureliaFetchClient.json)(content)
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.delete = function _delete(url) {
            return this.httpClient.fetch(url, {
                "method": "delete"
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
            return this.httpClient.fetch(url, {
                "method": "post",
                "body": files
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        return DataServices;
    }()) || _class);
});
define('resources/data/galleries',["exports", "aurelia-framework", "./data-services"], function (exports, _aureliaFramework, _dataServices) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Galleries = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Galleries = exports.Galleries = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Galleries(data) {
            _classCallCheck(this, Galleries);

            this.data = data;
            this.GALLERY_SERVICE = "galleries";
            this.galleryList = [];
        }

        Galleries.prototype.getUserGalleries = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.data.get(id + "/" + this.GALLERY_SERVICE);

                            case 2:
                                response = _context.sent;

                                if (!response.error && !response.message) {
                                    this.galleryList = response;
                                }

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getUserGalleries(_x) {
                return _ref.apply(this, arguments);
            }

            return getUserGalleries;
        }();

        Galleries.prototype.save = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(gallery) {
                var response, _response;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!gallery) {
                                    _context2.next = 14;
                                    break;
                                }

                                if (gallery._id) {
                                    _context2.next = 9;
                                    break;
                                }

                                _context2.next = 4;
                                return this.data.post(gallery, this.GALLERY_SERVICE);

                            case 4:
                                response = _context2.sent;

                                if (!response.error) {
                                    console.log("adding to array");
                                    this.galleryList.push(response);
                                    console.log(this.galleryList);
                                    console.log(response);
                                }
                                return _context2.abrupt("return", response);

                            case 9:
                                _context2.next = 11;
                                return this.data.put(gallery, this.GALLERY_SERVICE + "/" + gallery._id);

                            case 11:
                                _response = _context2.sent;

                                if (!_response.error) {}
                                return _context2.abrupt("return", _response);

                            case 14:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function save(_x2) {
                return _ref2.apply(this, arguments);
            }

            return save;
        }();

        Galleries.prototype.delete = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
                var response, i;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.data.delete(this.GALLERY_SERVICE + "/" + id);

                            case 2:
                                response = _context3.sent;

                                if (!response.error) {
                                    for (i = 0; i < this.galleryList.length; i++) {
                                        if (this.galleryList[i]._id == id) {
                                            this.galleryList.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function _delete(_x3) {
                return _ref3.apply(this, arguments);
            }

            return _delete;
        }();

        return Galleries;
    }()) || _class);
});
define('resources/data/pictures',["exports", "aurelia-framework", "./data-services", "./galleries"], function (exports, _aureliaFramework, _dataServices, _galleries) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Pictures = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Pictures = exports.Pictures = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices, _galleries.Galleries), _dec(_class = function () {
        function Pictures(data, galleries) {
            _classCallCheck(this, Pictures);

            this.data = data;
            this.galleries = galleries;
            this.PICTURE_SERVICE = "pictures";
            this.pictureList = [];
        }

        Pictures.prototype.getGalleryPictures = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log("route: " + this.galleries.GALLERY_SERVICE + "/" + id + "/" + this.PICTURE_SERVICE);
                                _context.next = 3;
                                return this.data.get(this.galleries.GALLERY_SERVICE + "/" + id + "/" + this.PICTURE_SERVICE);

                            case 3:
                                response = _context.sent;

                                if (!response.error && !response.message) {
                                    this.pictureList = response;
                                }

                            case 5:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getGalleryPictures(_x) {
                return _ref.apply(this, arguments);
            }

            return getGalleryPictures;
        }();

        Pictures.prototype.getPicture = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.data.get(_galleries.Galleries.GALLERY_SERVICE + "/" + data.galleryId + "/" + this.PICTURE_SERVICE + "/" + id);

                            case 2:
                                response = _context2.sent;

                                if (!response.error && !response.message) {
                                    this.currentPicture = response;
                                }

                            case 4:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getPicture(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getPicture;
        }();

        Pictures.prototype.save = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(picture) {
                var response, _response;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (picture._id) {
                                    _context3.next = 8;
                                    break;
                                }

                                _context3.next = 3;
                                return this.data.post(picture, this.PICTURE_SERVICE);

                            case 3:
                                response = _context3.sent;

                                if (!response.error) {
                                    this.pictureList.push(response);
                                }
                                return _context3.abrupt("return", response);

                            case 8:
                                _context3.next = 10;
                                return this.data.put(picture, this.PICTURE_SERVICE + "/" + picture);

                            case 10:
                                _response = _context3.sent;

                                if (!_response.error) {}
                                return _context3.abrupt("return", _response);

                            case 13:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function save(_x3) {
                return _ref3.apply(this, arguments);
            }

            return save;
        }();

        Pictures.prototype.delete = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id) {
                var response, i;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.data.delete(this.galleries.GALLERY_SERVICE + "/" + this.data.galleryId + "/" + this.PICTURE_SERVICE + "/" + id);

                            case 2:
                                response = _context4.sent;

                                if (!response.error) {
                                    for (i = 0; i < this.pictureList.length; i++) {
                                        if (this.pictureList[i]._id == id) {
                                            this.pictureList.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function _delete(_x4) {
                return _ref4.apply(this, arguments);
            }

            return _delete;
        }();

        Pictures.prototype.uploadImageFile = function () {
            var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(files, galleryId, pictureId) {
                var formData, response;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                formData = new FormData();


                                console.log("looking at file");
                                files.forEach(function (item, index) {
                                    formData.append("file" + index, item);
                                });

                                console.log(this.PICTURE_SERVICE + "/" + galleryId + "/" + pictureId + "/files");
                                _context5.next = 6;
                                return this.data.uploadFiles(formData, this.PICTURE_SERVICE + "/" + galleryId + "/" + pictureId + "/files");

                            case 6:
                                response = _context5.sent;

                            case 7:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function uploadImageFile(_x5, _x6, _x7) {
                return _ref5.apply(this, arguments);
            }

            return uploadImageFile;
        }();

        return Pictures;
    }()) || _class);
});
define('resources/data/users',["exports", "aurelia-framework", "./data-services"], function (exports, _aureliaFramework, _dataServices) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Users = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Users(data) {
            _classCallCheck(this, Users);

            this.data = data;
            this.USER_SERVICE = "users";
        }

        Users.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!user) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 3;
                                return this.data.post(user, this.USER_SERVICE);

                            case 3:
                                serverResponse = _context.sent;
                                return _context.abrupt("return", serverResponse);

                            case 5:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        return Users;
    }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"resources/css/styles.css\"></require><router-view></router-view></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = ".rightMargin {\r\n    margin-right: 10px;\r\n}"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template><h1>${message}</h1><compose view=\"./components/login.html\" show.bind=\"showLogin\"></compose><compose view=\"./components/register.html\" show.bind=\"!showLogin\"></compose></template>"; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<template><h1>${message}</h1><compose show.bind=\"showGalleryList\" view=\"./components/galleries.html\"></compose><compose show.bind=\"!showGalleryList\" view=\"./components/pictures.html\"></compose></template>"; });
define('text!modules/components/galleries.html', ['module'], function(module) { module.exports = "<template><div class=\"card\"><div show.bind=\"galleries.galleryList.length\"><table class=\"table\"><thead><tr><th>Name</th><th>Description</th><th>Options</th></tr></thead><body><tr repeat.for=\"gallery of galleries.galleryList\"><td>${gallery.name}</td><td>${gallery.name}</td><td><button class=\"btn-info\" click.trigger=\"openGallery(gallery)\">Open</button> <button class=\"btn-danger\" click.trigger=\"deleteGallery(gallery)\">Delete</button></td></tr></body></table></div><div show.bind=\"!galleries.galleryList.length\"><h2>No Galleries Yet</h2></div><div class=\"form-group\"><h2>Add Gallery</h2><label for=\"addGallery_Name\">Name:</label><input id=\"addGallery_Name\" type=\"text\" value.bind=\"addGallery.name\"><label for=\"addGallery_Description\">Description:</label><input id=\"addGallery_Description\" type=\"text\" value.bind=\"addGallery.description\"> <button class=\"btn-success\" id=\"addNewGallery\" click.trigger=\"saveGallery()\">Save Gallery</button></div><button class=\"btn-warning\" click.trigger=\"logout()\">Logout</button></div></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template><label for=\"email\">Email:</label><input class=\"form-control\" value.bind=\"email\" type=\"email\" id=\"email\" placeholder=\"user@domain.com\" autofocus><label for=\"password\">Password:</label><input class=\"form-control\" value.bind=\"password\" type=\"password\" id=\"password\"> <button class=\"btn btn-info btn-large pull-right\" click.trigger=\"login()\">Login</button> <button class=\"btn btn-link pull-right\" click.trigger=\"showRegister()\">Register</button></template>"; });
define('text!modules/components/pictures.html', ['module'], function(module) { module.exports = "<template><div class=\"card\"><div show.bind=\"pictureObject\"><div class=\"form-group\"><img src=\"uploads/${pictureObject.galleryId}/${pictureObject._id}/${pictureObject.imageFile.filename}\" aria-placeholder=\"No Image Selected\"></div><div class=\"form-group\"><label for=\"pictureObject_Name\">Name:</label><h2 id=\"pictureObject_Name\">${pictureObject.name}</h2><label for=\"pictureObject_Desc\">Description:</label><h2 id=\"pictureObject_Desc\">${pictureObject.description}</h2><label for=\"pictureObject_Date\">Picture Date:</label><h2 id=\"pictureObject_Date\">${pictureObject.pictureDate.ToString(\"d\")}</h2></div></div><div show.bind=\"pictures.pictureList.length\"><table class=\"table\"><thead><tr><th>Thumbnail</th><th>Name</th><th>Description</th><th>Options</th></tr></thead><body><tr repeat.for=\"picture of pictures.pictureList\"><td><img src=\"uploads/${picture.galleryId}/${picture._id}/${picture.imageFile.filename}\" height=\"40px\" width=\"40px\"></td><td>${picture.name}</td><td>${picture.description}</td><td><button click.trigger=\"openPicture(picture)\">Open</button> <button click.trigger=\"deletePicture(picture)\">Delete</button></td></tr></body></table></div><div show.bind=\"!pictures.pictureList.length\"><h2>No Pictures</h2></div><div class=\"form-group\"><h2>Add Picture</h2><div class=\"form-group\"><label for=\"addPicture_Name\">Name:</label><input id=\"addPicture_Name\" type=\"text\" value.bind=\"addPicture.name\"></div><div class=\"form-group\"><label for=\"addPicture_Description\">Description:</label><input id=\"addPicture_Description\" type=\"text\" value.bind=\"addPicture.description\"></div><div class=\"form-group\"><label for=\"addPicture_Date\">Description:</label><input id=\"addPicture_Date\" type=\"date\" value.bind=\"addPicture.pictureDate\"></div><div class=\"form-group\"><label for=\"addPicture_ImgFile\">Add Image file:</label><input id=\"addPicture_ImgFile\" type=\"file\" change.delegate=\"uploadPicture()\" files.bind=\"files\"></div><div class=\"form-group\"><button id=\"addNewPicture\" click.trigger=\"savePicture()\">Add picture to ${galleryObject.name}</button></div></div></div><button click.trigger=\"exitGallery()\">Back to List</button></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template><label for=\"firstName\">First Name:</label><input value.bind=\"user.firstName\" type=\"text\" id=\"firstName\" autofocus><label for=\"lastName\">Last Name:</label><input value.bind=\"user.lastName\" type=\"text\" id=\"lastName\" autofocus><label for=\"email\">Email:</label><input value.bind=\"user.email\" type=\"email\" id=\"email\" placeholder=\"user@domain.com\"><label for=\"password\">Password:</label><input value.bind=\"user.password\" type=\"password\" id=\"password\"> <button click.trigger=\"saveUser()\">Register this User</button></template>"; });
//# sourceMappingURL=app-bundle.js.map