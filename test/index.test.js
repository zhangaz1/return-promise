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

		promise.then(function (result) {});
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

	describe('test function has owner', function () {

		const user = {
			name: 'zs',
			sayHi: function (something, cb) {
				cb(null, `Hi, ${something}, i'm ${this.name},`);
			}
		};

		it('should can transport this', function () {
			let expect = null;
			user.sayHi('world', (error, result) => expect = result);

			const success = sinon.stub();
			const failed = sinon.stub();

			return user.sayHi.bind(user) // *** bind to this ***
				.returnPromise('world')
				.then(success)
				.catch(failed)
				.then(() => {
					success.should.have.properties({
						called: true,
						calledOnce: true,
					});

					failed.should.have.properties({
						called: false,
						calledOnce: false,
					});
				});
		});

		it('should can transport this, if no bind, and use this then reject', function () {
			let expect = null;
			user.sayHi('world', (error, result) => expect = result);

			const success = sinon.stub();
			const failed = sinon.stub();

			return user.sayHi
				.returnPromise('world')
				.then(success)
				.catch(failed)
				.then(() => {
					success.should.have.properties({
						called: false,
						calledOnce: false,
					});

					failed.should.have.properties({
						called: true,
						calledOnce: true,
					});
				});
		});

	});

});