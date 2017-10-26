'use strict';


const should = require('should');
const sinon = require('sinon');

require('./../src/index.js');
// require('return-promise');

describe('returnPromise', () => {

	const fn = (a, b, cb) => {
		cb(null, a + b);
	};

	let promise;

	it('should add returnPromise on Function.prototype', () => {
		should(Function.prototype.returnPromise).be.Function();
	});

	it('should returnPromise return a promise', () => {
		promise = fn.returnPromise(1, 2);
		should(promise).have.property('then')
			.which.is.Function();

		promise.then(function(result) {});
	});

	describe('resolve', () => {

		it('should resolve the result', () => {
			const resolve = sinon.stub();
			promise.then(resolve)
				.then(() => {
					resolve.called.should.be.True();
					resolve.calledOnce.should.be.True();
					resolve.firstCall.args.should.be.eql([3]);
				});
		});

	});

	describe('reject', () => {

		it('should reject when less params', () => {
			promise = fn.returnPromise(1);
			const reject = sinon.stub();

			promise.catch(reject)
				.then(() => {
					reject.called.should.be.True();
					reject.calledOnce.should.be.True();
					reject.firstCall.args.should.be.Array();
					reject.firstCall.args[0].should.be.Error();
					reject.firstCall.args[0].message.should.be.exactly('cb is not a function');
				});
		});

		it('should reject when much params', () => {
			promise = fn.returnPromise(1, 2, 3);
			const reject = sinon.stub();

			promise.catch(reject)
				.then(() => {
					reject.called.should.be.True();
					reject.calledOnce.should.be.True();
					reject.firstCall.args.should.be.Array();
					reject.firstCall.args[0].should.be.Error();
					reject.firstCall.args[0].message.should.be.exactly('cb is not a function');
				});
		});

	});



});
