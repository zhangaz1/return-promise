;
(function(proto) {
	if(proto && !proto.returnPromise) {
		proto.returnPromise = returnPromise;
	}

	exports.returnPromise = returnPromise;

	return void(0);

	function returnPromise() {
		return new Promise((resolve, reject) => {
			const args = toArray(arguments);
			args.push(callback); // push callback

			try {
				this.apply(null, args);
			} catch(ex) {
				reject(ex);
			}

			return void(0);

			function callback(error) {
				if(error) {
					reject(error);
				} else {
					const args = toArray(arguments);
					args.shift(); // shift error
					const result = args.length === 1 ? args[0] : args;

					resolve(result); // promise 只支持resolve一个值，可以在内部自己组织
				}
			}
		});
	}

	function toArray(args) {
		return Array.prototype.slice.call(args);
	}

})(Function && Function.prototype);
