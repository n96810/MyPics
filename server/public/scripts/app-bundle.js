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


            this.galleryObject = {
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
                                this.pictureObject = {
                                    "galleryId": this.galleryObject._id
                                };

                            case 4:
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
                                this.galleryObject = undefined;

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
                var response;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!this.galleryObject) {
                                    _context4.next = 6;
                                    break;
                                }

                                this.galleryObject.userId = this.user._id;
                                _context4.next = 4;
                                return this.galleries.save(this.galleryObject);

                            case 4:
                                response = _context4.sent;

                                if (response.error) {
                                    alert("There was an issue saving this gallery");
                                } else {
                                    this.galleryObject = undefined;
                                }

                            case 6:
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
                                if (!this.pictureObject) {
                                    _context5.next = 13;
                                    break;
                                }

                                _context5.next = 3;
                                return this.pictures.save(this.pictureObject);

                            case 3:
                                response = _context5.sent;

                                if (!response.error) {
                                    _context5.next = 8;
                                    break;
                                }

                                alert("There was an issue saving this picture");
                                _context5.next = 13;
                                break;

                            case 8:
                                pictureId = response._id;

                                if (!(this.imageFile && this.imageFile.length)) {
                                    _context5.next = 13;
                                    break;
                                }

                                _context5.next = 12;
                                return this.pictures.uploadImageFile(this.imageFile, this.user._id, this.galleryObject._id, pictureId);

                            case 12:
                                this.imageFile = [];

                            case 13:
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
                                this.pictureObject = picture;
                                console.log(this.pictureObject);

                            case 2:
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
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(["./value-converters/date-format", "./elements/flatpickr"]);
  }
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
                                _context.next = 2;
                                return this.data.get(this.galleries.GALLERY_SERVICE + "/" + id + "/" + this.PICTURE_SERVICE);

                            case 2:
                                response = _context.sent;

                                if (!response.error && !response.message) {
                                    this.pictureList = response;
                                } else {
                                    this.pictureList = [];
                                }

                            case 4:
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
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(galleryId, pictureId) {
                var response;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.data.get(this.galleries.GALLERY_SERVICE + "/" + galleryId + "/" + this.PICTURE_SERVICE + "/" + pictureId);

                            case 2:
                                response = _context2.sent;

                                if (!(!response.error && !response.message)) {
                                    _context2.next = 5;
                                    break;
                                }

                                return _context2.abrupt("return", response);

                            case 5:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getPicture(_x2, _x3) {
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
                                console.log(picture);
                                console.log(picture._id);

                                if (picture._id) {
                                    _context3.next = 10;
                                    break;
                                }

                                _context3.next = 5;
                                return this.data.post(picture, this.PICTURE_SERVICE);

                            case 5:
                                response = _context3.sent;

                                if (!response.error) {
                                    this.pictureList.push(response);
                                }
                                return _context3.abrupt("return", response);

                            case 10:
                                _context3.next = 12;
                                return this.data.put(picture, this.galleries.GALLERY_SERVICE + "/" + picture.galleryId + "/" + this.PICTURE_SERVICE + "/" + picture._id);

                            case 12:
                                _response = _context3.sent;

                                if (!_response.error) {}
                                return _context3.abrupt("return", _response);

                            case 15:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function save(_x4) {
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

            function _delete(_x5) {
                return _ref4.apply(this, arguments);
            }

            return _delete;
        }();

        Pictures.prototype.uploadImageFile = function () {
            var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(files, userId, galleryId, pictureId) {
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

                                _context5.next = 5;
                                return this.data.uploadFiles(formData, this.PICTURE_SERVICE + "/" + userId + "/" + galleryId + "/" + pictureId + "/files");

                            case 5:
                                response = _context5.sent;

                            case 6:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function uploadImageFile(_x6, _x7, _x8, _x9) {
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
define('resources/elements/flatpickr',['exports', 'aurelia-framework', 'flatpickr'], function (exports, _aureliaFramework, _flatpickr) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlatPickerCustomElement = undefined;

    var _flatpickr2 = _interopRequireDefault(_flatpickr);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var FlatPickerCustomElement = exports.FlatPickerCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ "defaultBindingMode": _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function FlatPickerCustomElement(element) {
            _classCallCheck(this, FlatPickerCustomElement);

            _initDefineProp(this, 'value', _descriptor, this);

            this.element = element;
        }

        FlatPickerCustomElement.prototype.bind = function bind() {
            var defaultConfig = {
                "altInput": true,
                "altFormat": "F j, Y",
                "wrap": true
            };

            this._config = Object.assign({}, defaultConfig);
            this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
        };

        FlatPickerCustomElement.prototype.attached = function attached() {
            this.flatpickr = new _flatpickr2.default(this.element.querySelector(".aurelia-flatpickr"), this._config);
        };

        FlatPickerCustomElement.prototype.onChange = function onChange(selectedDates, dateStr, instance) {
            this.value = selectedDates[0];
        };

        FlatPickerCustomElement.prototype.valueChanged = function valueChanged() {
            if (!this.flatpickr) {
                return;
            }

            if (this.value === this.flatpickr.selectedDates[0]) {
                return;
            }

            var newDate = this.value ? this.value : undefined;

            this.flatpickr.setDate(newDate);
        };

        return FlatPickerCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/value-converters/date-format',["exports", "moment"], function (exports, _moment) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DateFormatValueConverter = undefined;

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
        function DateFormatValueConverter() {
            _classCallCheck(this, DateFormatValueConverter);
        }

        DateFormatValueConverter.prototype.toView = function toView(value) {
            if (value === undefined || value === null) {
                return;
            }

            return (0, _moment2.default)(value).format("MMM do YYYY");
        };

        return DateFormatValueConverter;
    }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"resources/css/styles.css\"></require><router-view></router-view></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = ".rightMargin {\r\n    margin-right: 10px;\r\n}\r\n\r\nform {\r\n    padding: 10px;\r\n}"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template><compose view=\"./components/login.html\" show.bind=\"showLogin\"></compose><compose view=\"./components/register.html\" show.bind=\"!showLogin\"></compose></template>"; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<template><compose view=\"./components/galleries.html\"></compose><compose view=\"./components/pictures.html\"></compose><compose view=\"./components/pictureView.html\"></compose></template>"; });
define('text!modules/components/galleries.html', ['module'], function(module) { module.exports = "<template><form class=\"form\" show.bind=\"!galleryObject._id\"><div class=\"form-group\" show.bind=\"galleries.galleryList.length\"><table class=\"table table-striped table-bordered\"><thead><tr><th>Name</th><th>Description</th><th>Date Created</th><th>Options</th></tr></thead><body><tr repeat.for=\"gallery of galleries.galleryList\"><td>${gallery.name}</td><td>${gallery.description}</td><td>${gallery.dateCreated | dateFormat}</td><td><button class=\"btn btn-info\" click.trigger=\"openGallery(gallery)\">Open</button> <button class=\"btn btn-danger\" click.trigger=\"deleteGallery(gallery)\">Delete</button></td></tr></body></table></div><div class=\"form-group\" show.bind=\"!galleries.galleryList.length\"><h2>No Galleries Yet</h2></div><div class=\"form-group\"><h2>Add Gallery</h2><div class=\"form-group\"><label for=\"galleryObject_Name\">Name</label><input class=\"form-control\" id=\"galleryObject_Name\" type=\"text\" value.bind=\"galleryObject.name\"></div><div><label for=\"galleryObject_Description\">Description</label><input class=\"form-control\" id=\"galleryObject_Description\" type=\"text\" value.bind=\"galleryObject.description\"></div><button class=\"btn btn-success\" id=\"addNewGallery\" click.trigger=\"saveGallery()\">Save Gallery</button></div><div class=\"form-group pull-left\"><button class=\"btn btn-secondary\" click.trigger=\"logout()\">Logout</button></div></form></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template><div class=\"form\"><div class=\"form-group\"><label for=\"email\">Email</label><input class=\"form-control\" value.bind=\"email\" type=\"email\" id=\"email\" placeholder=\"user@domain.com\" autofocus></div><div class=\"form-group\"><label for=\"password\">Password</label><input class=\"form-control\" value.bind=\"password\" type=\"password\" id=\"password\"></div><button class=\"btn btn-info\" click.trigger=\"login()\">Login</button></div><button class=\"btn btn-link\" click.trigger=\"showRegister()\">Register</button></template>"; });
define('text!modules/components/pictures.html', ['module'], function(module) { module.exports = "<template><form class=\"form\" show.bind=\"!pictureObject._id && galleryObject._id\"><div show.bind=\"pictures.pictureList.length\"><table class=\"table table-striped table-bordered\"><thead><tr><th>Thumbnail</th><th>Name</th><th>Description</th><th>Picture Date</th><th>Options</th></tr></thead><body><tr repeat.for=\"picture of pictures.pictureList\"><td><img class=\"img-thumbnail\" src=\"uploads/${user._id}/${picture.galleryId}/${picture._id}/${picture.imageFile.filename}\" height=\"40px\" width=\"40px\"></td><td>${picture.name}</td><td>${picture.description}</td><td>${picture.pictureDate | dateFormat}</td><td><button class=\"btn btn-info\" click.trigger=\"openPicture(picture)\">Open</button> <button class=\"btn btn-danger\" click.trigger=\"deletePicture(picture)\">Delete</button></td></tr></body></table></div><div show.bind=\"!pictures.pictureList.length\"><h2>No Pictures</h2></div><div class=\"form-group\"><h2>Add Picture</h2><div class=\"form-group\"><label for=\"addPicture_Name\">Name</label><input class=\"form-control\" id=\"addPicture_Name\" type=\"text\" value.bind=\"pictureObject.name\"></div><div class=\"form-group\"><label for=\"addPicture_Description\">Description</label><input class=\"form-control\" id=\"addPicture_Description\" type=\"text\" value.bind=\"pictureObject.description\"></div><div class=\"form-group\"><label for=\"addPicture_Date\">Picture Date</label><flat-picker id=\"addPicture_Date\" value.bind=\"pictureObject.pictureDate\"></flat-picker></div><div class=\"form-group\"><label for=\"addPicture_ImgFile\">Add Image File</label><input id=\"addPicture_ImgFile\" type=\"file\" change.delegate=\"uploadPicture()\" files.bind=\"files\"></div><div class=\"form-group\"><button class=\"btn btn-success\" id=\"addNewPicture\" click.trigger=\"savePicture()\">Add picture</button></div></div><button class=\"btn btn-secondary\" click.trigger=\"exitGallery()\">Back to List</button></form></template>"; });
define('text!modules/components/pictureView.html', ['module'], function(module) { module.exports = "<template><form class=\"form\" show.bind=\"pictureObject._id\"><h2>Testing</h2><div><div class=\"form-group\"><img class=\"img\" src=\"uploads/${user._id}/${pictureObject.galleryId}/${pictureObject._id}/${pictureObject.imageFile.filename}\" aria-placeholder=\"No Image Selected\"></div><div class=\"form-group center-block\"><div class=\"form-group\"><label for=\"pictureObject_Name\">Name</label><input class=\"form-control\" id=\"pictureObject_Name\" type=\"text\" value.bind=\"pictureObject.name\"></div><div class=\"form-group\"><label for=\"pictureObject_Desc\">Description</label><input class=\"form-control\" id=\"pictureObject_Desc\" type=\"text\" value.bind=\"pictureObject.description\"></div><div class=\"form-group\"><label for=\"pictureObject_Date\">Picture Date</label><flat-picker id=\"pictureObject_Date\" type=\"date\" value.bind=\"pictureObject.pictureDate\"></flat-picker></div><div class=\"form-group\"><button class=\"btn btn-primary\" click.trigger=\"savePicture()\">Save Picture</button></div><button class=\"btn btn-secondary\" click.trigger=\"openGallery(galleryObject)\">Back to Gallery: ${galleryObject.name}</button></div></div></form></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template><label for=\"firstName\">First Name:</label><input value.bind=\"user.firstName\" type=\"text\" id=\"firstName\" autofocus><label for=\"lastName\">Last Name:</label><input value.bind=\"user.lastName\" type=\"text\" id=\"lastName\" autofocus><label for=\"email\">Email:</label><input value.bind=\"user.email\" type=\"email\" id=\"email\" placeholder=\"user@domain.com\"><label for=\"password\">Password:</label><input value.bind=\"user.password\" type=\"password\" id=\"password\"> <button click.trigger=\"saveUser()\">Register this User</button></template>"; });
define('text!resources/elements/flatpickr.html', ['module'], function(module) { module.exports = "<template><require from=\"flatpickr/flatpickr.css\"></require><div class=\"input-group aurelia-flatpickr\"><input type=\"text\" class=\"aurelia-flatpickr form-control flatPicker\" data-input></div></template>"; });
//# sourceMappingURL=app-bundle.js.map