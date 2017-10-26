;
(function(proto) {
	if(proto && !proto.returnPromise) {
		proto.returnPromise = returnPromise;
	}

	return void(0);

	function returnPromise() {
		return new Promise((resolve, reject) => {
			const args = toArray(arguments);
			args.push(callback);

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
					resolve(arguments[1]); // promise 只支持resolve一个值，可以在内部自己组织
				}
			}
		});
	}

	function toArray(args) {
		return Array.prototype.slice.call(args);
	}

})(Function && Function.prototype);
