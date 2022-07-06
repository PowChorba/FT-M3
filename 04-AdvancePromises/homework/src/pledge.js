'use strict';



/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor) {
    this._state = 'pending'
    this._value = undefined
    this._handlerGroups = []

    if (typeof executor !== 'function') {
        throw new TypeError('executor, function')
    }
    executor(value => this._internalResolve(value),
        value => this._internalReject(value))

}


$Promise.prototype._internalResolve = function (data) {
    if (this._state === 'pending') {
        this._state = 'fulfilled'
        this._value = data
        this._callHandlers()
    }

}

$Promise.prototype._internalReject = function (data) {
    if (this._state === 'pending') {
        this._state = 'rejected'
        this._value = data
        this._callHandlers()
    }

}

$Promise.prototype.then = function (successCb, errorCb) {
    if (typeof successCb !== 'function') successCb = false;
    if (typeof errorCb !== 'function') errorCb = false;
    const downstreamPromise = new $Promise(function () { })
    this._handlerGroups.push({ successCb, errorCb, downstreamPromise })
    if (this._state !== 'pending') this._callHandlers()
    return downstreamPromise
}

$Promise.prototype._callHandlers = function () {
    while (this._handlerGroups.length > 0) {
        let valor = this._handlerGroups.shift();
        if (this._state === 'fulfilled') {
            if (!valor.successCb) {
                valor.downstreamPromise._internalResolve(this._value)
            } else {
                try {
                    const result = valor.successCb(this._value)
                    if (result instanceof $Promise) {
                        result.then(
                            (value) => valor.downstreamPromise._internalResolve(value),
                            (err) => valor.downstreamPromise._internalReject(err))
                    } else {
                        valor.downstreamPromise._internalResolve(result)
                    }
                } catch (e) {
                    valor.downstreamPromise._internalReject(e);
                }
            }
            // valor.successCb && valor.successCb(this._value)
        } else if (this._state === 'rejected') {
            if (!valor.errorCb) {
                valor.downstreamPromise._internalReject(this._value)
            } else {
                try {
                    const result = valor.errorCb(this._value)
                    if (result instanceof $Promise) {
                        result.then(value => valor.downstreamPromise._internalResolve(value),
                            err => valor.downstreamPromise._internalReject(err))
                    } else {
                        valor.downstreamPromise._internalResolve(result)
                    }
                }
                catch (e) {
                    valor.downstreamPromise._internalReject(e)
                }
            }
            // valor.errorCb && valor.errorCb(this._value)
        }
    }
}


$Promise.prototype.catch = function (errorCb) {
    return this.then(null, errorCb)
}






module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
